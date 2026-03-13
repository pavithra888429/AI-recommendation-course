import requests
import json

url = "http://localhost:5001/recommend"
payload = {
    "interests": ["Cybersecurity"],
    "level": "Beginner",
    "searchHistory": [],
    "courses": [
        {
            "id": 14,
            "title": "Cybersecurity Essentials",
            "category": "Cybersecurity",
            "level": "Beginner",
            "tags": ["Cybersecurity"],
            "description": "Learn the basics of security."
        },
        {
            "id": 1,
            "title": "AI Fundamentals",
            "category": "Data Science",
            "level": "Beginner",
            "tags": ["AI"],
            "description": "AI basics."
        }
    ]
}

print("Sending request to AI service...")
try:
    response = requests.post(url, json=payload, timeout=30)
    print("Status:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error:", e)
