"""
Announcements & Evacuation Router (Sanitized Academic Implementation)
"""
from fastapi import APIRouter
from app.database import db

router = APIRouter(prefix="/api/v1/announcements", tags=["Announcements"])

@router.get("")
async def list_announcements():
    return db.announcements

@router.get("/evacuation-centers")
async def list_evacuation_centers():
    return db.evacuation_centers

