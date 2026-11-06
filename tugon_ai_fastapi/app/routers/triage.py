"""
AI Triage Router
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.nlp_triage_service import NLPTriageService

router = APIRouter(prefix="/api/v1/ai", tags=["AI Inference"])

class TriageRequest(BaseModel):
    text: str
    latitude: Optional[float] = 14.1287
    longitude: Optional[float] = 121.4385
    audio_transcript: Optional[str] = None

@router.post("/classify")
@router.post("/triage")
async def classify_emergency_report(payload: TriageRequest):
    content = payload.audio_transcript if payload.audio_transcript else payload.text
    result = NLPTriageService.classify_emergency(content)
    return {
        "status": "SUCCESS",
        "input_text": content,
        "inference": result
    }

