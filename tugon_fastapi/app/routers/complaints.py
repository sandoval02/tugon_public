"""
Complaints Router (Sanitized Academic Implementation)
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timezone
import uuid
from app.models.schemas import ComplaintCreate
from app.database import db

router = APIRouter(prefix="/api/v1/complaints", tags=["Complaints"])

@router.get("")
async def list_complaints(
    status: Optional[str] = None,
    barangay: Optional[str] = None,
    limit: int = 50
):
    results = list(db.complaints.values())
    if status:
        results = [c for c in results if c.get("status") == status]
    if barangay:
        results = [c for c in results if c.get("barangay") == barangay]
    return results[:limit]

@router.post("/create")
async def create_complaint(payload: ComplaintCreate):
    cid = f"cmp-{uuid.uuid4().hex[:8]}"
    record = {
        "id": cid,
        "title": payload.title,
        "description": payload.description,
        "category": payload.category,
        "severity": payload.severity,
        "status": "PENDING",
        "latitude": payload.latitude,
        "longitude": payload.longitude,
        "address": payload.address,
        "barangay": payload.barangay,
        "photo_urls": payload.photo_urls,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    db.complaints[cid] = record
    return {"message": "Complaint submitted successfully", "complaint": record}

@router.get("/{complaint_id}")
async def get_complaint(complaint_id: str):
    if complaint_id not in db.complaints:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return db.complaints[complaint_id]

@router.patch("/{complaint_id}/status")
async def update_complaint_status(complaint_id: str, status: str):
    if complaint_id not in db.complaints:
        raise HTTPException(status_code=404, detail="Complaint not found")
    db.complaints[complaint_id]["status"] = status
    return {"message": "Status updated", "complaint": db.complaints[complaint_id]}

