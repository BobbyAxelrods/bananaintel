import requests
import os
import json

BASE_URL = "http://localhost:8000/api"
ADMIN_TOKEN = "changeme_to_secure_token"
ADMIN_EMAIL = "admin_test@banana.intel"
ADMIN_PASSWORD = "securepassword123"

def test_admin_flow():
    # 1. Signup as Admin
    print("1. Signing up as Admin...")
    signup_data = {
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
        "first_name": "Admin",
        "last_name": "User",
        "username": "admin"
    }
    # Append admin_token to query params
    response = requests.post(f"{BASE_URL}/auth/signup?admin_token={ADMIN_TOKEN}", json=signup_data)
    
    if response.status_code == 201:
        print("   Admin created successfully.")
    elif response.status_code == 403 and "exists" in response.text:
        print("   Admin user already exists. Proceeding to login.")
    else:
        print(f"   Failed to create admin: {response.status_code} - {response.text}")
        return

    # 2. Login as Admin
    print("\n2. Logging in as Admin...")
    login_data = {
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    
    if response.status_code != 200:
        print(f"   Login failed: {response.status_code} - {response.text}")
        return
        
    token_data = response.json()
    access_token = token_data['access_token']
    print("   Login successful. Token received.")
    
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    # 3. Create Intel Item
    print("\n3. Creating Intel Item...")
    intel_data = {
        "title": "Test Intel Article",
        "content": "This is a test content for the admin flow verification.",
        "type": "report",
        "source": "internal",
        "url": "https://banana.intel/test",
        "is_premium": False
    }
    
    response = requests.post(f"{BASE_URL}/intel/", json=intel_data, headers=headers)
    
    if response.status_code == 201:
        item_data = response.json()
        item_id = item_data['id']
        print(f"   Intel item created. ID: {item_id}")
    else:
        print(f"   Failed to create intel: {response.status_code} - {response.text}")
        return

    # 4. Verify Item
    print(f"\n4. Verifying Intel Item {item_id}...")
    response = requests.get(f"{BASE_URL}/intel/{item_id}", headers=headers)
    
    if response.status_code == 200:
        fetched_item = response.json()
        print(f"   Item fetched successfully: {fetched_item.get('title')}")
        assert fetched_item.get('title') == intel_data['title']
    else:
        print(f"   Failed to fetch item: {response.status_code} - {response.text}")

if __name__ == "__main__":
    try:
        test_admin_flow()
    except Exception as e:
        print(f"An error occurred: {e}")
