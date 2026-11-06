"""
Authentication Router (Sanitized Academic Implementation)
Handles authentication dynamically without requiring implicit seed data.
"""
from fastapi import APIRouter, HTTPException
from app.models.schemas import UserLogin, UserCreate, Token, UserResponse
from app.database import db
import uuid

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    # Check registered users first
    user = next((u for u in db.users.values() if u["email"] == credentials.username_or_email or u["name"] == credentials.username_or_email), None)
    
    if user:
        if user["password"] != credentials.password:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        role = user["role"]
        uid = user["id"]
        name = user["name"]
    else:
        # Mock academic fallback: allow demo login
        uid = f"usr-{uuid.uuid4().hex[:6]}"
        role = "dispatcher" if "disp" in credentials.username_or_email.lower() else "citizen"
        name = credentials.username_or_email.split("@")[0].title()

    return Token(
        access_token=f"mock-jwt-token-{uid}",
        role=role,
        user_id=uid,
        name=name
    )

@router.post("/register", response_model=UserResponse)
async def register(payload: UserCreate):
    existing = next((u for u in db.users.values() if u["email"] == payload.email), None)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_id = f"usr-{uuid.uuid4().hex[:8]}"
    user_record = {
        "id": new_id,
        "name": payload.name,
        "email": payload.email,
        "password": payload.password,
        "role": payload.role,
        "phone_number": payload.phone_number or "0900-000-0000",
        "barangay": payload.barangay or "Poblacion",
        "is_verified": True
    }
    db.users[new_id] = user_record
    return UserResponse(**user_record)

@router.get("/me", response_model=UserResponse)
async def get_current_user(token: str = "default"):
    if db.users:
        user = list(db.users.values())[0]
        return UserResponse(**user)
    
    return UserResponse(
        id="usr-demo-01",
        name="Demo Operator",
        email="operator@example.com",
        role="dispatcher",
        phone_number="0900-000-0000",
        barangay="Poblacion",
        is_verified=True
    )
