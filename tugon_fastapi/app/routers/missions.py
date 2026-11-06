"""
Missions & Dispatch Router (Sanitized Academic Implementation)
"""
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime, timezone
import uuid
from app.models.schemas import MissionAssign, MissionStatusUpdate
from app.database import db

router = APIRouter(prefix="/api/v1/missions", tags=["Missions & Dispatch"])

@router.get("")
async def list_missions(status: Optional[str] = None):
    results = list(db.missions.values())
    if status:
        results = [m for m in results if m.get("status") == status]
    return results

@router.get("/active")
async def get_active_missions():
    return [m for m in db.missions.values() if m.get("status") in ("DISPATCHED", "ACCEPTED", "EN_ROUTE", "ARRIVED")]

@router.post("/dispatch")
async def dispatch_mission(payload: MissionAssign):
    mid = f"mis-{uuid.uuid4().hex[:6]}"
    record = {
        "id": mid,
        "complaint_id": payload.complaint_id,
        "incident_id": payload.incident_id,
        "responder_id": payload.responder_id,
        "vehicle_id": payload.vehicle_id or "veh-01",
        "status": "DISPATCHED",
        "dispatched_at": datetime.now(timezone.utc).isoformat(),
        "notes": payload.notes or "Unit dispatched to incident location."
    }
    db.missions[mid] = record

    # Mark responder as busy
    if payload.responder_id in db.responders:
        db.responders[payload.responder_id]["status"] = "BUSY"

    # Mark vehicle as dispatched
    if payload.vehicle_id and payload.vehicle_id in db.vehicles:
        db.vehicles[payload.vehicle_id]["status"] = "DISPATCHED"

    return {"message": "Mission dispatched successfully", "mission": record}

@router.patch("/{mission_id}/status")
async def update_mission_status(mission_id: str, payload: MissionStatusUpdate):
    if mission_id not in db.missions:
        raise HTTPException(status_code=404, detail="Mission not found")
    
    mission = db.missions[mission_id]
    mission["status"] = payload.status
    now_iso = datetime.now(timezone.utc).isoformat()

    if payload.status == "ACCEPTED":
        mission["accepted_at"] = now_iso
    elif payload.status == "EN_ROUTE":
        mission["en_route_at"] = now_iso
    elif payload.status == "ARRIVED":
        mission["arrived_at"] = now_iso
    elif payload.status == "RESOLVED":
        mission["resolved_at"] = now_iso
        mission["resolution_photo_url"] = payload.resolution_photo_url
        # Free responder and vehicle
        resp_id = mission.get("responder_id")
        if resp_id and resp_id in db.responders:
            db.responders[resp_id]["status"] = "AVAILABLE"
        veh_id = mission.get("vehicle_id")
        if veh_id and veh_id in db.vehicles:
            db.vehicles[veh_id]["status"] = "AVAILABLE"

    return {"message": f"Mission status updated to {payload.status}", "mission": mission}

