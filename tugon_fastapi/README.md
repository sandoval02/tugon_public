# TUGON - FastAPI Core Backend (Academic Edition)

This repository contains the sanitized, executable REST and WebSocket backend of **TUGON: Emergency Response & Vehicle Dispatch System** for the Municipality of Liliw, Laguna.

Submitted to the **Laguna State Polytechnic University (LSPU) - College of Computer Studies** for academic evaluation (`teamccs-git`).

---

## Features
- **Authentication**: JWT token issuance and multi-role RBAC (`citizen`, `responder`, `dispatcher`, `admin`).
- **Incident & Complaint Ingestion**: Full CRUD with geographic validation and simulated AI triage scoring.
- **Dispatch Board & Missions**: State transitions (`DISPATCHED` -> `ACCEPTED` -> `EN_ROUTE` -> `ARRIVED` -> `RESOLVED`).
- **Real-Time Telemetry**: Persistent WebSocket (`/ws/tracking`) streaming responder GPS coordinates.
- **Geofenced Attendance**: Automated Haversine distance calculations around MAT Headquarters (50m geofence).
- **Zero Configuration**: Comes pre-seeded with in-memory SQLite mock storage and records for Liliw's 33 barangays.

---

## Setup & Execution

### 1. Requirements
- Python 3.10+

### 2. Install Dependencies
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Run the Server
```bash
python run.py
# or
uvicorn app.main:app --port 8000 --reload
```

Interactive OpenAPI Swagger UI is available at:
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

