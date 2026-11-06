# TUGON - Flutter Mobile Application (Academic Showcase)

This repository contains the cross-platform Flutter application for **TUGON: Emergency Response & Vehicle Dispatch System** for the Municipality of Liliw, Laguna.

Submitted to the **Laguna State Polytechnic University (LSPU) - College of Computer Studies** for academic evaluation (`teamccs-git`).

---

## 📱 Features
- **Citizen Portal**:
  - 1-Tap SOS Emergency Report with GPS tagging and category selector (`MEDICAL`, `FIRE`, `TRAFFIC_ACCIDENT`, `FLOOD`).
  - Active incident tracking with simulated responder telemetry & ETA countdown.
  - Emergency Hotlines directory (MAT Liliw, BFP Fire Station, PNP Liliw).
  - Go-Bag disaster preparedness checklist.
- **Responder Portal**:
  - Live mission siren alerts and stage progression (`ACCEPTED` -> `EN_ROUTE` -> `ARRIVED` -> `RESOLVED`).
  - Geofenced biometric Face ID attendance simulation (50-meter Haversine radius around MAT HQ).
- **Self-Contained Mock Services**:
  - Includes `MockApiService` with pre-loaded mock incident data for Liliw, Laguna. Runs out of the box on mobile, emulator, or web without external backend dependencies!

---

## 🚀 How to Run

```bash
# Ensure Flutter SDK is installed (>= 3.3.0)
flutter doctor

# Get dependencies
flutter pub get

# Run on connected device, emulator, or Chrome web
flutter run
```

