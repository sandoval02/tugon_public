# TUGON - AI Decision-Support Microservice (Academic Edition)

This repository contains the cognitive emergency classification and disaster forecasting microservice of **TUGON**.

## Key Capabilities
- **Tagalog NLP Emergency Ingestion**: Extracts intent and critical keywords from distress text and speech transcripts.
- **Dynamic Urgency Scoring**: Assigns priority scores (0-100) and severity categories (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).
- **Resource Recommendations**: Automatically recommends units (e.g. `Ambulance MAT-01`, `BFP Fire Engine 1`) and rescue gear.
- **Offline / Deterministic Fallback**: Pre-loaded with heuristic emergency lexicons so that the microservice runs without paid Gemini API credentials!

## Quick Start
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python run.py
```

Swagger API documentation:
👉 **[http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs)**

