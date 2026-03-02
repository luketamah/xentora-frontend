#!/usr/bin/env python3
import requests
import sys
import json
from datetime import datetime
import uuid

class XentoraAPITester:
    def __init__(self):
        self.base_url = "https://ai-crm-demo.preview.emergentagent.com/api"
        self.token = None
        self.test_results = {
            "passed": [],
            "failed": [],
            "total_tests": 0,
            "passed_tests": 0
        }
        self.test_lead_id = None
        
    def log_result(self, test_name, success, details=""):
        """Log test results"""
        self.test_results["total_tests"] += 1
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        
        if success:
            self.test_results["passed_tests"] += 1
            self.test_results["passed"].append(result)
            print(f"✅ {test_name}: PASSED {details}")
        else:
            self.test_results["failed"].append(result)
            print(f"❌ {test_name}: FAILED - {details}")

    def test_api_health(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_result("API Health Check", True, f"Status: {response.status_code}, Message: {data.get('message', 'No message')}")
                return True
            else:
                self.log_result("API Health Check", False, f"Unexpected status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("API Health Check", False, f"Exception: {str(e)}")
            return False

    def test_admin_login(self):
        """Test admin login with demo credentials"""
        try:
            login_data = {
                "email": "admin@xentora.com",
                "password": "admin123"
            }
            response = requests.post(f"{self.base_url}/auth/login", json=login_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'access_token' in data:
                    self.token = data['access_token']
                    self.log_result("Admin Login", True, f"Token received, Type: {data.get('token_type', 'unknown')}")
                    return True
                else:
                    self.log_result("Admin Login", False, "No access token in response")
                    return False
            else:
                self.log_result("Admin Login", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_result("Admin Login", False, f"Exception: {str(e)}")
            return False

    def test_auth_me(self):
        """Test current user endpoint"""
        if not self.token:
            self.log_result("Auth Me Endpoint", False, "No token available")
            return False
            
        try:
            headers = {'Authorization': f'Bearer {self.token}'}
            response = requests.get(f"{self.base_url}/auth/me", headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.log_result("Auth Me Endpoint", True, f"User info retrieved: {data.get('email', 'Unknown email')}")
                return True
            else:
                self.log_result("Auth Me Endpoint", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Auth Me Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_create_lead(self):
        """Test lead creation endpoint"""
        try:
            test_lead = {
                "name": f"Test Lead {uuid.uuid4().hex[:8]}",
                "email": f"test{uuid.uuid4().hex[:8]}@example.com",
                "phone": "+254123456789",
                "business_type": "retail",
                "message": "This is a test lead created by automated testing."
            }
            
            response = requests.post(f"{self.base_url}/leads", json=test_lead, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'id' in data:
                    self.test_lead_id = data['id']
                    self.log_result("Create Lead", True, f"Lead created with ID: {self.test_lead_id}")
                    return True
                else:
                    self.log_result("Create Lead", False, "No ID in response")
                    return False
            else:
                self.log_result("Create Lead", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_result("Create Lead", False, f"Exception: {str(e)}")
            return False

    def test_get_leads(self):
        """Test get all leads endpoint (requires auth)"""
        if not self.token:
            self.log_result("Get All Leads", False, "No token available")
            return False
            
        try:
            headers = {'Authorization': f'Bearer {self.token}'}
            response = requests.get(f"{self.base_url}/leads", headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get All Leads", True, f"Retrieved {len(data)} leads")
                    return True
                else:
                    self.log_result("Get All Leads", False, "Response is not a list")
                    return False
            else:
                self.log_result("Get All Leads", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Get All Leads", False, f"Exception: {str(e)}")
            return False

    def test_update_lead_status(self):
        """Test lead status update endpoint"""
        if not self.token:
            self.log_result("Update Lead Status", False, "No token available")
            return False
            
        if not self.test_lead_id:
            self.log_result("Update Lead Status", False, "No test lead ID available")
            return False
            
        try:
            headers = {'Authorization': f'Bearer {self.token}'}
            status_update = {"status": "Contacted"}
            
            response = requests.patch(
                f"{self.base_url}/leads/{self.test_lead_id}/status", 
                json=status_update, 
                headers=headers, 
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'Contacted':
                    self.log_result("Update Lead Status", True, f"Status updated to: {data.get('status')}")
                    return True
                else:
                    self.log_result("Update Lead Status", False, f"Unexpected status: {data.get('status')}")
                    return False
            else:
                self.log_result("Update Lead Status", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Update Lead Status", False, f"Exception: {str(e)}")
            return False

    def test_analytics(self):
        """Test analytics endpoint"""
        if not self.token:
            self.log_result("Analytics", False, "No token available")
            return False
            
        try:
            headers = {'Authorization': f'Bearer {self.token}'}
            response = requests.get(f"{self.base_url}/analytics", headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['total_leads', 'new_leads', 'contacted_leads', 'closed_leads', 'conversion_rate', 'weekly_leads']
                
                if all(field in data for field in required_fields):
                    self.log_result("Analytics", True, f"Analytics data: {data['total_leads']} total leads, {data['conversion_rate']}% conversion")
                    return True
                else:
                    missing = [field for field in required_fields if field not in data]
                    self.log_result("Analytics", False, f"Missing fields: {missing}")
                    return False
            else:
                self.log_result("Analytics", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Analytics", False, f"Exception: {str(e)}")
            return False

    def test_chat_ai(self):
        """Test AI chat endpoint"""
        try:
            chat_data = {
                "message": "What services does Xentora offer?",
                "session_id": f"test_session_{uuid.uuid4().hex[:8]}"
            }
            
            response = requests.post(f"{self.base_url}/chat", json=chat_data, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if 'response' in data and 'session_id' in data:
                    self.log_result("AI Chat", True, f"Chat response received (length: {len(data['response'])} chars)")
                    return True
                else:
                    self.log_result("AI Chat", False, "Missing response or session_id in response")
                    return False
            else:
                self.log_result("AI Chat", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_result("AI Chat", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting Xentora Solutions Backend API Testing")
        print(f"📍 Testing against: {self.base_url}")
        print("="*60)
        
        # Test sequence
        tests = [
            ("API Health Check", self.test_api_health),
            ("Admin Login", self.test_admin_login),
            ("Auth Me Endpoint", self.test_auth_me),
            ("Create Lead", self.test_create_lead),
            ("Get All Leads", self.test_get_leads),
            ("Update Lead Status", self.test_update_lead_status),
            ("Analytics Endpoint", self.test_analytics),
            ("AI Chat Integration", self.test_chat_ai),
        ]
        
        for test_name, test_func in tests:
            print(f"\n🔍 Running: {test_name}")
            test_func()
            
        # Print summary
        print("\n" + "="*60)
        print(f"📊 TEST SUMMARY:")
        print(f"✅ Passed: {self.test_results['passed_tests']}/{self.test_results['total_tests']}")
        print(f"❌ Failed: {len(self.test_results['failed'])}")
        
        success_rate = (self.test_results['passed_tests'] / self.test_results['total_tests']) * 100 if self.test_results['total_tests'] > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.test_results['failed']:
            print(f"\n❌ Failed Tests:")
            for fail in self.test_results['failed']:
                print(f"  - {fail['test']}: {fail['details']}")
        
        return self.test_results['passed_tests'] == self.test_results['total_tests']

def main():
    tester = XentoraAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())