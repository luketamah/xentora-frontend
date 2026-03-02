from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import asyncio
import resend
import jwt
from passlib.context import CryptContext
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
JWT_SECRET = os.environ.get('JWT_SECRET', 'fallback_secret_key')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ Models ============

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    business_type: str
    message: str
    status: str = "New"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    business_type: str
    message: str

class LeadStatusUpdate(BaseModel):
    status: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class AnalyticsResponse(BaseModel):
    total_leads: int
    new_leads: int
    contacted_leads: int
    closed_leads: int
    conversion_rate: float
    weekly_leads: List[dict]

# ============ Auth Functions ============

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============ Email Function ============

async def send_lead_notification(lead: Lead):
    """Send email notification to admin about new lead"""
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #00F0FF; border-bottom: 2px solid #00F0FF; padding-bottom: 10px;">New Lead from Xentora Solutions</h2>
            <p><strong>Name:</strong> {lead.name}</p>
            <p><strong>Email:</strong> {lead.email}</p>
            <p><strong>Phone:</strong> {lead.phone}</p>
            <p><strong>Business Type:</strong> {lead.business_type}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #f9f9f9; padding: 15px; border-left: 3px solid #00F0FF;">{lead.message}</p>
            <p style="margin-top: 20px; color: #666;"><em>Received at: {lead.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}</em></p>
        </div>
    </body>
    </html>
    """
    
    params = {
        "from": SENDER_EMAIL,
        "to": ["xentoraai@gmail.com"],
        "subject": f"New Lead: {lead.name} - {lead.business_type}",
        "html": html_content
    }
    
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent for lead: {lead.id}")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")

# ============ Routes ============

@api_router.get("/")
async def root():
    return {"message": "Xentora Solutions API"}

@api_router.post("/leads", response_model=Lead)
async def create_lead(lead_data: LeadCreate):
    """Create a new lead and send notification email"""
    lead = Lead(**lead_data.model_dump())
    
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.leads.insert_one(doc)
    
    # Send email notification asynchronously
    asyncio.create_task(send_lead_notification(lead))
    
    return lead

@api_router.get("/leads", response_model=List[Lead])
async def get_leads(current_user: dict = Depends(verify_token)):
    """Get all leads (protected route)"""
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    
    for lead in leads:
        if isinstance(lead['created_at'], str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    
    return leads

@api_router.patch("/leads/{lead_id}/status", response_model=Lead)
async def update_lead_status(lead_id: str, status_update: LeadStatusUpdate, current_user: dict = Depends(verify_token)):
    """Update lead status"""
    result = await db.leads.find_one_and_update(
        {"id": lead_id},
        {"$set": {"status": status_update.status}},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    result.pop('_id', None)
    if isinstance(result['created_at'], str):
        result['created_at'] = datetime.fromisoformat(result['created_at'])
    
    return Lead(**result)

@api_router.post("/auth/login")
async def login(credentials: AdminLogin):
    """Admin login endpoint"""
    # For demo: admin@xentora.com / admin123
    # In production, store hashed passwords in database
    if credentials.email == "admin@xentora.com" and credentials.password == "admin123":
        token = create_access_token({"email": credentials.email})
        return {"access_token": token, "token_type": "bearer"}
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@api_router.get("/auth/me")
async def get_current_user(current_user: dict = Depends(verify_token)):
    """Get current user info"""
    return current_user

@api_router.post("/chat")
async def chat_with_ai(chat_request: ChatRequest):
    """AI chatbot endpoint using OpenAI GPT-5.2"""
    try:
        session_id = chat_request.session_id or str(uuid.uuid4())
        
        chat = LlmChat(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            session_id=session_id,
            system_message="You are Xentora AI Assistant, an expert in sales automation for small and medium businesses. You help answer questions about our AI-powered platform that automates customer interactions via WhatsApp, Instagram DM, and website chat. Be helpful, concise, and professional."
        ).with_model("openai", "gpt-5.2")
        
        user_message = UserMessage(text=chat_request.message)
        response = await chat.send_message(user_message)
        
        return {
            "response": response,
            "session_id": session_id
        }
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat service error: {str(e)}")

@api_router.get("/analytics", response_model=AnalyticsResponse)
async def get_analytics(current_user: dict = Depends(verify_token)):
    """Get lead analytics"""
    all_leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    
    total = len(all_leads)
    new_count = sum(1 for lead in all_leads if lead.get('status') == 'New')
    contacted_count = sum(1 for lead in all_leads if lead.get('status') == 'Contacted')
    closed_count = sum(1 for lead in all_leads if lead.get('status') == 'Closed')
    
    conversion_rate = (closed_count / total * 100) if total > 0 else 0
    
    # Weekly leads (last 4 weeks)
    now = datetime.now(timezone.utc)
    weekly_data = []
    for i in range(4):
        week_start = now - timedelta(weeks=i+1)
        week_end = now - timedelta(weeks=i)
        week_leads = sum(1 for lead in all_leads 
                        if week_start <= datetime.fromisoformat(lead['created_at']) < week_end)
        weekly_data.append({
            "week": f"Week {4-i}",
            "leads": week_leads
        })
    
    return AnalyticsResponse(
        total_leads=total,
        new_leads=new_count,
        contacted_leads=contacted_count,
        closed_leads=closed_count,
        conversion_rate=round(conversion_rate, 2),
        weekly_leads=list(reversed(weekly_data))
    )

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
