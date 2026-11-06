"""
Attendance and Geofencing Router (Sanitized Academic Implementation)
"""
from fastapi import APIRouter
from datetime import datetime, timezone
import math
from app.models.schemas import AttendanceCheckin
from app.database import db

router = APIRouter(prefix="/api/v1/attendance", tags=["Attendance & Geofencing"])

# MAT Headquarters Coordinates in Liliw, Laguna
MAT_HQ_LAT = 14.1338
MAT_HQ_LON = 121.4342
GEOFENCE_RADIUS_METERS = 100.0

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371000  # meters
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return 2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a))

@router.post("/checkin")
async def checkin(payload: AttendanceCheckin):
    distance = haversine_distance(payload.latitude, payload.longitude, MAT_HQ_LAT, MAT_HQ_LON)
    is_within_geofence = distance <= GEOFENCE_RADIUS_METERS
    
    record = {
        "responder_id": payload.responder_id,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "type": payload.checkin_type,
        "distance_to_hq_meters": round(distance, 1),
        "is_within_geofence": is_within_geofence,
        "verified_face": payload.verified_face,
        "status": "APPROVED" if (is_within_geofence and payload.verified_face) else "FLAGGED"
    }
    db.attendance.append(record)
    return {"message": "Attendance recorded", "record": record}

@router.get("/daily-summary")
async def get_daily_summary():
    return {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "total_rostered": len(db.responders),
        "present_count": len([a for a in db.attendance if a.get("status") == "APPROVED"]),
        "records": db.attendance
    }

