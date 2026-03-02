# Xentora Solutions - Deployment Guide

## Architecture
- **Frontend**: React app → Netlify
- **Backend**: FastAPI → Railway
- **Database**: MongoDB (use existing or MongoDB Atlas)

---

## 1. Backend Deployment (Railway)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"

### Step 2: Configure Railway
1. Select your repository (or upload `/app/backend` folder)
2. Railway will auto-detect Python/FastAPI
3. Add environment variables in Railway dashboard:

```bash
MONGO_URL=mongodb+srv://your-mongodb-url
DB_NAME=xentora_production
CORS_ORIGINS=https://your-netlify-app.netlify.app
EMERGENT_LLM_KEY=sk-emergent-34f455aAb7e52079c6
RESEND_API_KEY=re_LXQTzTeZ_6bYiQUVLcerEtLRi7AfAFUaQ
SENDER_EMAIL=onboarding@resend.dev
JWT_SECRET=xentora_solutions_secret_key_2026_secure_random
```

### Step 3: Deploy
- Railway will automatically build and deploy
- Copy your Railway backend URL (e.g., `https://xentora-backend.railway.app`)

---

## 2. MongoDB Setup (if needed)

### Option A: MongoDB Atlas (Recommended - Free Tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGO_URL` in Railway

### Option B: Use existing MongoDB
- Keep your current `MONGO_URL`

---

## 3. Frontend Deployment (Netlify)

### Step 1: Update Frontend Environment
1. Edit `/app/frontend/.env`:
```bash
REACT_APP_BACKEND_URL=https://your-railway-url.railway.app
```

### Step 2: Deploy to Netlify

#### Method A: Drag & Drop (Easiest)
1. Build locally:
```bash
cd /app/frontend
yarn build
```
2. Go to https://app.netlify.com/drop
3. Drag the `build` folder
4. Done!

#### Method B: GitHub (Recommended)
1. Push code to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import from Git"
4. Select your repo
5. Build settings:
   - **Base directory**: `frontend`
   - **Build command**: `yarn build`
   - **Publish directory**: `frontend/build`
6. Add environment variable:
   - `REACT_APP_BACKEND_URL` = `https://your-railway-url.railway.app`
7. Deploy!

### Step 3: Update CORS
1. Go back to Railway
2. Update `CORS_ORIGINS` with your Netlify URL:
```bash
CORS_ORIGINS=https://your-site.netlify.app
```
3. Redeploy Railway backend

---

## 4. Custom Domain (Optional)

### Netlify:
- Go to Domain settings → Add custom domain
- Follow DNS configuration instructions

### Railway:
- Go to Settings → Generate domain or add custom domain

---

## 5. Post-Deployment Checklist

- [ ] Backend is live and `/api/` returns `{"message": "Xentora Solutions API"}`
- [ ] Frontend loads without errors
- [ ] Contact form submits and sends emails
- [ ] Admin login works (admin@xentora.com / admin123)
- [ ] AI chatbot responds
- [ ] Lead dashboard displays data
- [ ] Analytics page shows charts

---

## 6. Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| **Railway** | $5-10/month | First $5 free, then pay-as-you-go |
| **Netlify** | Free | 100GB bandwidth/month |
| **MongoDB Atlas** | Free | 512MB storage |
| **Resend** | Free | 3,000 emails/month |
| **Emergent LLM** | Pay per use | Monitor balance |

**Total**: ~$5-10/month (or less if staying in free tiers)

---

## 7. Troubleshooting

### Backend not starting on Railway:
- Check logs in Railway dashboard
- Verify all environment variables are set
- Ensure `requirements.txt` is up to date

### Frontend can't connect to backend:
- Verify `REACT_APP_BACKEND_URL` is correct
- Check CORS_ORIGINS in Railway includes your Netlify URL
- Inspect browser console for errors

### Email not sending:
- Verify Resend API key is valid
- Check Railway logs for email errors
- Test endpoint: `POST /api/leads`

---

## 8. Monitoring & Maintenance

- **Railway**: Check logs and metrics in dashboard
- **Netlify**: Monitor build logs and analytics
- **Resend**: Track email delivery in dashboard
- **Emergent LLM**: Monitor API usage and credits

---

## Need Help?

If you run into issues:
1. Check Railway/Netlify logs
2. Verify all environment variables
3. Test backend endpoints directly
4. Check browser console for frontend errors

Your app is production-ready! 🚀
