
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash-lite")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CopyRequest(BaseModel):
    product_name: str
    product_description: str
    target_audience: str

@app.post("/generate")
async def generate_copy(request: CopyRequest):
    prompt = f"""
You are an expert marketing copywriter.
Generate landing page copy for the following product.
Return ONLY a valid JSON object with exactly these 4 keys, no extra text:

{{
  "hero_headline": "A short punchy headline (max 10 words)",
  "subheadline": "A compelling subheadline (max 20 words)",
  "features": "3 key features/benefits as bullet points",
  "cta": "A strong call to action button text (max 6 words)"
}}

Product Name: {request.product_name}
Description: {request.product_description}
Target Audience: {request.target_audience}
"""

    response = model.generate_content(prompt)
    text = response.text.strip()

    # Clean markdown code blocks if Gemini wraps in ```json
    if text.startswith("```"):
        text = text.split("```")
        if text.startswith("json"):
            text = text[4:]
    text = text.strip()

    result = json.loads(text)
    return result
