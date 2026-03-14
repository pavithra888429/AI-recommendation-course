import os
import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

@app.route("/", methods=["GET"])
def root():
    return jsonify({"service": "AI Recommendation Service", "status": "running", "endpoints": ["/health", "/recommend"]})


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
            try:
                course_summaries.append({
                    "id": c.get("id"),
                    "title": c.get("title", "Untitled Course"),
                    "category": c.get("category", "General"),
                    "level": c.get("level", "Beginner"),
                    "description": str(c.get("description", ""))[:100]
                })
            except Exception as e:
                print(f"Skipping malformed course: {e}")
                continue

        prompt = f"""
        User Interests: {', '.join(interests)}
        User Level: {level}
        Search History: {', '.join(search_history)}
        
        Available Courses:
        {json.dumps(course_summaries)}
        
        Task: Return a JSON array of the top 5 course IDs matching the user.
        Return ONLY the array, e.g., [1, 14, 2]. No text.
        """

        url = "https://api.groq.com/openai/v1/chat/completions"
        
        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 100,
            "temperature": 0.5
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GROQ_API_KEY}"
        }

        response = requests.post(url, json=payload, headers=headers, timeout=10)
        
        if response.status_code != 200:
            print(f"API Error {response.status_code}: {response.text}")
            return jsonify([]), 200

        res_data = response.json()
        
        if "choices" not in res_data or not res_data["choices"]:
            print("No choices in response")
            return jsonify([]), 200

        raw_text = res_data["choices"][0]["message"]["content"].strip()
        print(f"Raw response: {raw_text}")

        # Improved cleanup for JSON
        import re
        try:
            # Find something that looks like a JSON array [ ... ]
            match = re.search(r'\[.*\]', raw_text, re.DOTALL)
            if match:
                raw_text = match.group(0)
            else:
                # Fallback to basic cleanup if regex fails
                if "```" in raw_text:
                    raw_text = raw_text.split("```")[1]
                    if raw_text.startswith("json"):
                        raw_text = raw_text[4:]
                raw_text = raw_text.strip()
            
            recommended_ids = json.loads(raw_text)
        except Exception as parse_err:
            print(f"JSON Parse Error: {parse_err}")
            return jsonify([]), 200
        
        # Validate that we got an array
        if not isinstance(recommended_ids, list):
            print(f"Invalid response format: not a list")
            return jsonify([]), 200
        
        # Safe integer conversion
        parsed_ids = []
        for x in recommended_ids:
            try:
                parsed_ids.append(int(x))
            except (ValueError, TypeError):
                continue
        
        print(f"Parsed IDs: {parsed_ids}")

        # Filter and order
        recommended_courses = []
        # Create a map for quick lookup and preservation of order
        course_map = {int(c.get("id")): c for c in courses if c.get("id") is not None}
        
        for cid in parsed_ids:
            if cid in course_map:
                recommended_courses.append(course_map[cid])

        return jsonify(recommended_courses)

    except Exception as e:
        import traceback
        print(f"Error in recommend: {e}")
        print(traceback.format_exc())
        return jsonify([]), 200  # Return empty instead of 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
