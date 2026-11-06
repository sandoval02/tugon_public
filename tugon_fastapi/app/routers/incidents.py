"""
Incidents Router (Sanitized Academic Implementation)
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timezone
import uuid
from app.models.schemas import IncidentCreate
from app.database import db

router = APIRouter(prefix="/api/v1/incidents", tags=["Incidents"])

@router.get("")
async def list_incidents(
    status: Optional[str] = None,
    severity: Optional[str] = None,
    barangay: Optional[str] = None
):
    results = list(db.incidents.values())
    if status:
        results = [i for i in results if i.get("status") == status]
    if severity:
        results = [i for i in results if i.get("severity") == severity]
    if barangay:
        results = [i for i in results if i.get("barangay") == barangay]
    return results

@router.post("/create")
async def create_incident(payload: IncidentCreate):
    iid = f"inc-{datetime.now().year}-{uuid.uuid4().hex[:6]}"
    
    # Calculate mock AI priority score based on severity
    score_map = {"CRITICAL": 95, "HIGH": 85, "MEDIUM": 65, "LOW": 35}
    triage_score = score_map.get(payload.severity.upper(), 70)

    record = {
        "id": iid,
        "category": payload.category,
        "severity": payload.severity,
        "status": "PENDING",
        "description": payload.description,
        "latitude": payload.latitude,
        "longitude": payload.longitude,
        "address": payload.address,
        "barangay": payload.barangay,
        "photo_urls": payload.photo_urls,
        "reporter_phone": payload.reporter_phone,
        "ai_triage_score": triage_score,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    db.incidents[iid] = record
    return {"message": "Emergency incident submitted successfully", "incident": record}

@router.get("/{incident_id}")
async def get_incident(incident_id: str):
    if incident_id not in db.incidents:
        raise HTTPException(status_code=404, detail="Incident not found")
    return db.incidents[incident_id]

