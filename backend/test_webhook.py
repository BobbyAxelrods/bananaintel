import asyncio
import httpx

async def test_webhook():
    url = "https://neuralseas.malaysiawest.cloudapp.azure.com/webhook-test/send_resources"
    print(f"Testing webhook: {url}")
    
    data = {
        "email": "test_script@example.com",
        "source": "manual_test",
        "lead_magnets": ["test"],
        "subscriber_id": "0",
        "confirm_url": "http://localhost"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            print("Sending request...")
            response = await client.post(url, json=data)
            print(f"Status: {response.status_code}")
            print(f"Response: {response.text}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_webhook())
