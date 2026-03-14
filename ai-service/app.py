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

        # Build a simplified course list for the prompt - limit to 15 courses for efficiency
        course_summaries = []
        for c in courses[:15]:
            try:
                cid = c.get("id")
                if cid is not None:
                    course_summaries.append({
                        "id": cid,
                        "title": c.get("title", "Untitled Course")[:50],
                        "category": c.get("category", "General"),
                        "level": c.get("level", "Beginner")
                    })
            except Exception:
                continue

        prompt = f"""
        User Interests: {', '.join(interests)}
        User Level: {level}
        Search History: {', '.join(search_history)}
        
        Available Courses:
        {json.dumps(course_summaries)}
        
        Task: Return a JSON array of the top 5 course IDs matching the user.
        Return ONLY the array, e.g., [1, 14, 2].
        """

        url = "https://api.groq.com/openai/v1/chat/completions"
        
        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 100,
            "temperature": 0.3
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GROQ_API_KEY}"
        }

        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        if response.status_code != 200:
            return jsonify([])

        res_data = response.json()
        raw_text = res_data["choices"][0]["message"]["content"].strip()

        # Improved cleanup for JSON
        import re
        try:
            match = re.search(r'\[.*\]', raw_text, re.DOTALL)
            if match:
                raw_text = match.group(0)
            recommended_ids = json.loads(raw_text)
        except Exception:
            return jsonify([])
        
        if not isinstance(recommended_ids, list):
            return jsonify([])
        
        # Safe ID matching (handle both string and int IDs)
        recommended_courses = []
        str_ids = [str(x) for x in recommended_ids]
        
        for cid_str in str_ids:
            for course in courses:
                if str(course.get("id")) == cid_str:
                    recommended_courses.append(course)
                    break

        return jsonify(recommended_courses[:5])

    except Exception as e:
        import traceback
        print(f"Error in recommend: {e}")
        print(traceback.format_exc())
        return jsonify([]), 200  # Return empty instead of 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
