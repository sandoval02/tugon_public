"""
TUGON AI Inference Microservice (Mock Edition)
Laguna State Polytechnic University (LSPU) - College of Computer Studies
Sanitized Academic Showcase with Anonymized Mock AI Routes
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.triage import router as triage_router
from app.routers.analytics import router as analytics_router

app = FastAPI(
    title="TUGON AI Academic Mock Service",
    description="Sanitized demonstration AI microservice with Tagalog NLP heuristics and dummy prediction outputs.",
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

app.include_router(triage_router, prefix="/api/v1/mock-ai")
app.include_router(analytics_router, prefix="/api/v1/mock-ai")

@app.get("/", tags=["Demonstration"])
async def root():
    return {
        "service": "TUGON AI Mock Service",
        "notice": "All AI inference models use local deterministic heuristics for thesis evaluation.",
        "port": 8001,
        "docs": "/docs"
    }

@app.get("/health", tags=["Demonstration"])
async def health():
    return {"status": "mock_healthy", "model_pipeline": "Tagalog-Emergency-Heuristic-Mock"}
