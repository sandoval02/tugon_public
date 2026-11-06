"""
TUGON - Municipal Emergency Response & Vehicle Dispatch Core API (Mock Edition)
Laguna State Polytechnic University (LSPU) - College of Computer Studies
Sanitized Academic Showcase with Anonymized Mock Route Signatures
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.auth import router as auth_router
from app.routers.complaints import router as complaints_router
from app.routers.incidents import router as incidents_router
from app.routers.missions import router as missions_router
from app.routers.vehicles import router as vehicles_router
from app.routers.tracking import router as tracking_router
from app.routers.attendance import router as attendance_router
from app.routers.analytics import router as analytics_router
from app.routers.reports import router as reports_router
from app.routers.announcements import router as announcements_router
from app.routers.ws_tracking import router as ws_tracking_router

app = FastAPI(
    title="TUGON Academic Mock API",
    description="Sanitized demonstration API with anonymized mock routes and dummy municipal datasets for academic evaluation.",
    version="1.0.3-mock",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register All Sanitized Mock API Routers
app.include_router(auth_router, prefix="/api/v1/mock/auth")
app.include_router(complaints_router, prefix="/api/v1/mock/complaints")
app.include_router(incidents_router, prefix="/api/v1/mock/incidents")
app.include_router(missions_router, prefix="/api/v1/mock/missions")
app.include_router(vehicles_router, prefix="/api/v1/mock/fleet")
app.include_router(tracking_router, prefix="/api/v1/mock/telemetry")
app.include_router(attendance_router, prefix="/api/v1/mock/attendance")
app.include_router(analytics_router, prefix="/api/v1/mock/analytics")
app.include_router(reports_router, prefix="/api/v1/mock/reports")
app.include_router(announcements_router, prefix="/api/v1/mock/announcements")
app.include_router(ws_tracking_router, prefix="/ws/mock")

@app.get("/", tags=["Demonstration"])
async def root():
    return {
        "service": "TUGON Academic Mock API",
        "notice": "All endpoints are dummy mock handlers sanitized for academic evaluation.",
        "version": "1.0.3-mock",
        "docs": "/docs",
        "institution": "LSPU College of Computer Studies"
    }

@app.get("/health", tags=["Demonstration"])
async def health():
    return {"status": "mock_healthy", "mode": "simulation"}
