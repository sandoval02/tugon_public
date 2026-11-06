"""
TUGON API Data Schemas & Transfer Objects (Sanitized Academic Version)
"""
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

# --- Auth Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: str
    name: str

class UserLogin(BaseModel):
    username_or_email: str
    password: str

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    phone_number: Optional[str] = None
    role: str = "citizen"
    barangay: Optional[str] = "Rizal"

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    phone_number: Optional[str] = None
    barangay: Optional[str] = None
    is_verified: bool = True

# --- Complaint & Incident Schemas ---
class ComplaintCreate(BaseModel):
    title: str
    description: str
    category: str
    severity: str = "MEDIUM"
    latitude: Optional[float] = 14.1287
    longitude: Optional[float] = 121.4385
    address: Optional[str] = "Poblacion, Liliw, Laguna"
    barangay: Optional[str] = "Rizal"
    photo_urls: Optional[List[str]] = []

class IncidentCreate(BaseModel):
    category: str
    severity: str = "HIGH"
    description: str
    latitude: float = 14.1287
    longitude: float = 121.4385
    address: Optional[str] = "Brgy. Rizal, Liliw, Laguna"
    barangay: str = "Rizal"
    photo_urls: Optional[List[str]] = []
    reporter_phone: Optional[str] = "0912-345-6789"

# --- Mission Schemas ---
class MissionAssign(BaseModel):
    complaint_id: Optional[str] = None
    incident_id: Optional[str] = None
    responder_id: str
    vehicle_id: Optional[str] = None
    notes: Optional[str] = None

class MissionStatusUpdate(BaseModel):
    status: str  # ACCEPTED, EN_ROUTE, ARRIVED, RESOLVED
    notes: Optional[str] = None
    resolution_photo_url: Optional[str] = None

# --- Attendance Schemas ---
class AttendanceCheckin(BaseModel):
    responder_id: str
    latitude: float
    longitude: float
    verified_face: bool = True
    checkin_type: str = "IN"  # IN or OUT

# --- Vehicle Schemas ---
class VehicleUpdate(BaseModel):
    status: str  # AVAILABLE, DISPATCHED, MAINTENANCE
    latitude: Optional[float] = None
    longitude: Optional[float] = None

