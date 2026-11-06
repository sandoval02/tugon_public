"""
Live Tracking Router (Sanitized Academic Implementation)
"""
from fastapi import APIRouter
from app.database import db

router = APIRouter(prefix="/api/v1/tracking", tags=["Live Tracking"])

@router.get("/responders")
async def get_responder_locations():
    """Returns live GPS telemetry for all active field responders in Liliw."""
    return list(db.responders.values())

@router.get("/fleet")
async def get_fleet_telemetry():
    """Returns vehicle GPS positions and availability."""
    return list(db.vehicles.values())

