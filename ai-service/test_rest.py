import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.environ.get("GEMINI_API_KEY")
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"

payload = {
    "contents": [{
        "parts": [{"text": "Say hello!"}]
    }]
}

print("sending rest request...")
try:
    response = requests.post(url, json=payload, timeout=10)
    print("Status code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("Exception:", e)
