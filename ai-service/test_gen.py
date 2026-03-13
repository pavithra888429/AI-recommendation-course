import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
print("Configuring key...")
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")
print("calling generation...")
try:
    res = model.generate_content("Say hello")
    print("Success:", res.text)
except Exception as e:
    print("Error:", e)
