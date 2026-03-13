import os
import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
# Using gemini-2.0-flash as it's confirmed available
MODEL_NAME = "gemini-2.0-flash" 

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()
        interests = data.get("interests", [])
        level = data.get("level", "Beginner")
        search_history = data.get("searchHistory", [])
        courses = data.get("courses", [])

        if not courses:
            return jsonify([])

        print(f"Generating recommendations for: {interests}")

        # Build a simplified course list for the prompt
        course_summaries = []
        for c in courses:
            course_summaries.append({
                "id": c.get("id"),
                "title": c.get("title"),
                "category": c.get("category"),
                "level": c.get("level"),
                "description": c.get("description", "")[:100]
            })

        prompt = f"""
        User Interests: {', '.join(interests)}
        User Level: {level}
        Search History: {', '.join(search_history)}
        
        Available Courses:
        {json.dumps(course_summaries)}
        
        Task: Return a JSON array of the top 5 course IDs matching the user.
        Return ONLY the array, e.g., [1, 14, 2]. No text.
        """

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={GEMINI_API_KEY}"
        
        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }

        response = requests.post(url, json=payload, timeout=10)
        
        if response.status_code != 200:
            print(f"API Error {response.status_code}: {response.text}")
            return jsonify([]), 500

        res_data = response.json()
        
        if "candidates" not in res_data or not res_data["candidates"]:
            print("No candidates in response")
            return jsonify([]), 200

        raw_text = res_data["candidates"][0]["content"]["parts"][0]["text"].strip()
        print(f"Raw response: {raw_text}")

        # Basic cleanup for JSON
        if "```" in raw_text:
            raw_text = raw_text.split("```")[1]
            if raw_text.startswith("json"):
                raw_text = raw_text[4:]
        raw_text = raw_text.strip()

        recommended_ids = json.loads(raw_text)
        print(f"Parsed IDs: {recommended_ids}")

        # Filter and order
        id_order = {int(cid): idx for idx, cid in enumerate(recommended_ids)}
        recommended_courses = [
            c for c in courses if int(c.get("id")) in id_order
        ]
        recommended_courses.sort(key=lambda c: id_order.get(int(c.get("id")), 999))

        return jsonify(recommended_courses)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify([]), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
