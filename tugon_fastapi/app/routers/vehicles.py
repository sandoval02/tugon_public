"""
Vehicles and Fleet Router (Sanitized Academic Implementation)
"""
from fastapi import APIRouter, HTTPException
from typing import Optional
from app.models.schemas import VehicleUpdate
from app.database import db

router = APIRouter(prefix="/api/v1/vehicles", tags=["Vehicles & Fleet"])

@router.get("")
async def list_vehicles(status: Optional[str] = None):
    results = list(db.vehicles.values())
    if status:
        results = [v for v in results if v.get("status") == status]
    return results

@router.get("/{vehicle_id}")
async def get_vehicle(vehicle_id: str):
    if vehicle_id not in db.vehicles:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db.vehicles[vehicle_id]

@router.patch("/{vehicle_id}/telemetry")
async def update_vehicle_telemetry(vehicle_id: str, payload: VehicleUpdate):
    if vehicle_id not in db.vehicles:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    veh = db.vehicles[vehicle_id]
    if payload.status:
        veh["status"] = payload.status
    if payload.latitude is not None:
        veh["latitude"] = payload.latitude
    if payload.longitude is not None:
        veh["longitude"] = payload.longitude
        
    return {"message": "Vehicle telemetry updated", "vehicle": veh}

