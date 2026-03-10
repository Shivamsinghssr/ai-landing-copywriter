from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="AI Landing Page Copywriter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECTION_PROMPTS = {
    "hero_headline":   "Write a powerful, attention-grabbing hero headline (max 10 words).",
    "subheadline":     "Write a compelling subheadline that expands on the hero (1-2 sentences).",
    "features":        "List 4 key features/benefits as short punchy bullet points (each under 15 words).",
    "cta":             "Write 3 strong call-to-action button texts (e.g. Get Started Free).",
    "about":           "Write a concise About Us / Brand Story paragraph (3-4 sentences).",
    "faq":             "Write 4 frequently asked questions with brief answers relevant to the product.",
    "testimonials":    "Write 3 realistic-sounding customer testimonials with name and role.",
    "footer_tagline":  "Write a short memorable footer tagline (max 8 words).",
}

class CopyRequest(BaseModel):
    product_name: str
    description: str
    target_audience: str
    tone: str
    sections: List[str]

@app.get("/")
def root():
    return {"status": "AI Landing Page Copywriter API is running 🚀"}

@app.post("/generate")
async def generate_copy(req: CopyRequest):
    if not req.sections:
        raise HTTPException(status_code=400, detail="Select at least one section.")

    context = f"""
Product: {req.product_name}
Description: {req.description}
Target Audience: {req.target_audience}
Tone: {req.tone}
"""
    results = {}
    for section in req.sections:
        if section not in SECTION_PROMPTS:
            continue
        prompt = f"{context}\nTask: {SECTION_PROMPTS[section]}\nReturn ONLY the copy text, no explanations."
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt
            )
            results[section] = response.text.strip()
        except Exception as e:
            results[section] = f"Error generating this section: {str(e)}"

    return {"copy": results}
