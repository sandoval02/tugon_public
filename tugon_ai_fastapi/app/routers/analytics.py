"""
AI Analytics & Predictive Router
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.forecasting_service import ForecastingService

router = APIRouter(prefix="/api/v1/ai", tags=["Predictive Analytics"])

class ForecastRequest(BaseModel):
    barangay: Optional[str] = "Rizal"

@router.post("/predict")
@router.post("/generate")
async def generate_predictive_report(payload: ForecastRequest):
    result = ForecastingService.forecast_incidents(payload.barangay)
    return {
        "status": "SUCCESS",
        "forecast": result
    }

