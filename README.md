# TUGON: Intelligent Municipal Emergency Response & Telemetry Framework

> **Undergraduate Thesis Repository - College of Computer Studies**  
> **Laguna State Polytechnic University, Santa Cruz Main Campus**  
> **Submitted for Evaluation to:** `teamccs-git`

[![LSPU CCS](https://img.shields.io/badge/LSPU-College%20of%20Computer%20Studies-blue.svg)](https://lspu.edu.ph/)
[![Thesis](https://img.shields.io/badge/Thesis-Intelligent%20Systems-orange.svg)]()
[![Privacy Notice](https://img.shields.io/badge/Data%20Privacy-Sanitized%20Mock%20Edition-green.svg)]()

---

## 🏛️ Research Context & Project Abstract
**TUGON** is an intelligent, full-stack municipal emergency response, real-time fleet telemetry, and spatial decision-support system built for the **Mayor's Action Team (MAT)** and **MDRRMO** of **Liliw, Laguna**.

### 🔒 Academic Showcase & Data Privacy Notice
In compliance with the **Data Privacy Act of 2012 (RA 10173)**, municipal non-disclosure agreements, and security best practices:
- This public research repository uses **sanitized mock route signatures** and **pre-seeded synthetic dummy data** (Liliw's 33 barangays, sample emergency responders, and simulated incidents).
- Live municipal production databases, private citizen records, internal credentials, and live Supabase secrets have been completely removed.
- All 4 subsystems are structured with clean architecture, mock services, and runnable standalone execution for academic panel review.
- The **`tugon_public_site`** is the **real** GitHub Pages research portal adhering to the official LSPU CCS submission format.

---

## 🏗️ High-Level System Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           TUGON SYSTEM ARCHITECTURE                         │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐   ┌─────────────────┐   ┌──────────────────────────┐   │
│  │  Flutter Mobile  │   │  Next.js 16     │   │  GitHub Pages            │   │
│  │  (Citizen /      │   │  Admin Command  │   │  Research Portal         │   │
│  │   Responder)     │   │  Center         │   │  (tugon_public_site)     │   │
│  │                  │   │                 │   │                          │   │
│  │ • 1-Tap SOS      │   │ • Dispatch Board│   │ • Thesis Documentation   │   │
│  │ • GPS Tracking   │   │ • GIS Fleet Map │   │ • AI Triage Simulator    │   │
│  │ • Voice-to-Text  │   │ • Analytics     │   │ • ISO/IEC 25010 Results  │   │
│  │ • Face ID Attend.│   │ • Reports PDF   │   └──────────────────────────┘   │
│  │ • QR Scanner     │   │ • KYC Verify    │                                  │
│  │ • Family Circle  │   │ • 3D Visuals    │                                  │
│  └────────┬─────────┘   └────────┬────────┘                                  │
│           │  WebSocket + REST     │  REST + SWR                              │
│           └──────────┬────────────┘                                          │
│                      ▼                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐    │
│  │                 TUGON CORE API (FastAPI · :8000)                     │    │
│  │                                                                      │    │
│  │  Routers (34 modules):                                               │    │
│  │  auth · complaints · incidents · missions · vehicles · patrols       │    │
│  │  ws_tracking · live_tracking · schedules · reports · analytics       │    │
│  │  announcements · clusters · evacuation · attendance · messages       │    │
│  │  equipment · circle · notifications · documents · geo · weather      │    │
│  │  sessions · device_tokens · users · combined_reports · ai_proxy      │    │
│  │                                                                      │    │
│  │  Middleware:                                                          │    │
│  │  • CORS (explicit origin allowlist)                                  │    │
│  │  • Global Rate Limiter (per-IP + server-wide cap)                    │    │
│  │  • Security Headers (HSTS, X-Frame-Options, CSP)                     │    │
│  │  • Latency Logger (dev only)                                         │    │
│  │  • Write-through Cache Invalidation                                  │    │
│  │                                                                      │    │
│  │  Background Tasks:                                                   │    │
│  │  • Patrol Status Updater (60s loop)                                  │    │
│  │  • AI Service Stay-Alive Pinger (10 min keep-warm for Render)        │    │
│  │  • Complaint Escalation Sweeper (48h auto-escalation, 15 min loop)   │    │
│  │  • Stale Mission Sweeper (warn → auto-cancel)                        │    │
│  │  • GPS Batch Buffer (flush every 5s from WebSocket pings)            │    │
│  └──────────────────────────┬───────────────────────────────────────────┘    │
│                             │                                                │
│            ┌────────────────┼────────────────────┐                           │
│            ▼                ▼                    ▼                            │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────────────────┐   │
│  │  PostgreSQL   │  │  Redis        │  │  TUGON AI SERVICE                │   │
│  │  (Supabase)   │  │  (Upstash)    │  │  (FastAPI · :8001)               │   │
│  │               │  │               │  │                                  │   │
│  │ • asyncpg     │  │ • SWR Cache   │  │  Multi-Provider AI Router:       │   │
│  │ • SQLAlchemy  │  │   (TTL + stale│  │  • Gemini 3.1 Flash-Lite         │   │
│  │   2.0 Async   │  │    -while-    │  │  • OpenAI (GPT)                  │   │
│  │ • Pool: 10+20 │  │    revalidate)│  │  • Claude (Anthropic)            │   │
│  │ • LIFO reuse  │  │ • OTP store   │  │  • Grok (xAI)                    │   │
│  │ • TLS pinned  │  │ • Rate limits │  │                                  │   │
│  │   (Supabase   │  │ • Session     │  │  Services:                       │   │
│  │    Root CA)    │  │   revocation  │  │  • Emergency Triage Classifier   │   │
│  │ • Connection  │  │ • Fail-open   │  │  • KYC Pipeline (Doc + Face      │   │
│  │   pre-warming │  │   to in-memory│  │    Match + Liveness)             │   │
│  │   (6 parallel │  │   backend     │  │  • Predictive Analytics          │   │
│  │    on startup)│  │               │  │  • Prescriptive Recommendations  │   │
│  └──────────────┘  └───────────────┘  │  • Descriptive Summaries         │   │
│                                        │  • DB-cached report store        │   │
│                                        │  • API Key auth middleware       │   │
│                                        └──────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐    │
│  │                      EXTERNAL SERVICES                               │    │
│  │                                                                      │    │
│  │  Firebase FCM ─── Push Notifications (data-only for background wake) │    │
│  │  Cloudinary ───── Image CDN (mission photos, KYC documents, selfies) │    │
│  │  Supabase Storage  Object storage buckets (attendance selfies)       │    │
│  │  OpenWeather ───── Weather proxy (10 min server-side cache)          │    │
│  │  OSRM ──────────── Route geometry (driving directions for tracking)  │    │
│  │  Google Maps ───── Directions + Places (server key, not in app)      │    │
│  │  Google Sign-In ── OAuth (Android + Web client IDs)                  │    │
│  │  Resend ────────── Transactional email (OTP password reset)          │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐    │
│  │                      DEPLOYMENT                                      │    │
│  │                                                                      │    │
│  │  Core API ──────── Render (Web Service)                              │    │
│  │  AI Service ────── Render (Web Service, stay-alive pinged)           │    │
│  │  Admin Portal ──── Vercel (Next.js 16, Prisma generate on build)    │    │
│  │  Mobile Client ─── Codemagic CI/CD → Android APK                    │    │
│  │  Database ──────── Supabase (PostgreSQL + Pooler, TLS pinned)       │    │
│  │  Cache ─────────── Upstash Redis (serverless, fail-open)            │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Caching Strategy (3-Tier)

| Layer | Technology | TTL | Strategy |
| :--- | :--- | :--- | :--- |
| **L1 - In-Process Memory** | Thread-safe `MemoryBackend` | 10-120s | Instant reads; every process has its own copy |
| **L2 - Shared Redis** | Upstash (serverless) | Same as L1 | Cross-instance consistency; **fail-open** to L1 on error |
| **L3 - DB Report Cache** | `analytics_reports` table (PostgreSQL) | 1h-24h | AI-generated analytics cached per time range |
| **API SWR Decorator** | `@swr(ttl=5, stale=30)` | 5s fresh / 30s stale | Stale-while-revalidate on endpoint responses; auto-invalidated on any successful write |
| **Weather Proxy** | In-memory dict | 10 min | Single-location cache protecting OpenWeather quota |

### Real-Time Capabilities

| Channel | Protocol | Purpose |
| :--- | :--- | :--- |
| `/ws/dispatch/{complaint_id}` | WebSocket (JWT auth) | Responder GPS → citizen tracking (OSRM route, ETA, progress) |
| `/ws/notifications/{user_id}` | WebSocket (JWT auth) | Real-time push to specific user sessions |
| `/ws/admin` | WebSocket (JWT auth) | Admin receives ALL mission/dispatch events |
| GPS Batch Buffer | In-memory buffer → DB flush every 5s | Batches high-frequency WebSocket GPS pings for efficient DB writes |
| Firebase FCM | Data-only push (high priority) | Background-wake the Flutter app for full-screen alarm + mission sheet |

---

## 📁 Repository Structure

```
tugon_public_repo/
├── docs/                               # System Documentation & Diagrams
│   ├── SYSTEM_DOCUMENTATION.md         # Full architecture, DFD Level 0/1, UML, ERD
│   ├── USER_MANUAL.md                  # Comprehensive user manual for citizen & dispatcher
│   └── RESEARCH_MANUSCRIPT_SUMMARY.md  # Thesis manuscript chapters 1-5 summary
│
├── tugon_public_site/                  # REAL GitHub Pages Research Website (LSPU CCS Format)
│   ├── index.html                      # Complete research website with TUGON design system
│   ├── styles.css                      # Design tokens (Sora, Plus Jakarta, JetBrains Mono, #ff6b2c)
│   ├── script.js                       # Interactive AI triage simulator & theme switch
│   └── README.md                       # GitHub Pages deployment instructions
│
├── tugon_fastapi/                      # Core REST & Telemetry API (Mock Edition)
│   ├── app/                            # Routers (/api/v1/mock/*), database, schemas
│   ├── requirements.txt                # Python dependencies
│   ├── run.py                          # 1-click startup runner (:8000)
│   └── README.md                       # API documentation & Swagger (/docs)
│
├── tugon_ai_fastapi/                   # AI Triage & Forecasting Microservice (Mock Edition)
│   ├── app/                            # Tagalog NLP heuristics, predictive services
│   ├── requirements.txt                # Python dependencies
│   ├── run.py                          # 1-click startup runner (:8001)
│   └── README.md                       # AI microservice documentation
│
├── tugon_admin/                        # Next.js 15 Command Center Dashboard
│   ├── app/dashboard/                  # Dispatch board, GIS fleet canvas, reports, attendance
│   ├── components/                     # Responsive sidebar, headers, metric cards
│   ├── lib/mock-data.ts                # Pre-seeded municipal datasets for Liliw
│   ├── package.json                    # Node dependencies
│   └── README.md                       # Setup and local run instructions
│
└── tugon_flutter/                      # Cross-Platform Flutter Mobile Client
    ├── lib/                            # Citizen SOS, responder navigation, mock services
    ├── pubspec.yaml                    # Flutter dependencies
    └── README.md                       # Mobile installation & execution instructions
```

---

## 🚀 Quick Execution Guide

### 1. Research Website (GitHub Pages)
Open `tugon_public_site/index.html` directly in any web browser, or serve it locally:
```bash
python -m http.server 8080 --directory tugon_public_site
```

### 2. Core Backend API
```bash
cd tugon_fastapi
python -m venv venv && venv\Scripts\activate
pip install -r requirements.txt
python run.py
# Swagger Docs: http://127.0.0.1:8000/docs
```

### 3. AI Decision-Support Microservice
```bash
cd tugon_ai_fastapi
python -m venv venv && venv\Scripts\activate
pip install -r requirements.txt
python run.py
# Swagger Docs: http://127.0.0.1:8001/docs
```

### 4. Admin Command Center Web Portal
```bash
cd tugon_admin
npm install
npm run dev
# Dashboard Portal: http://localhost:3000
```

### 5. Citizen & Responder Mobile Client
```bash
cd tugon_flutter
flutter pub get
flutter run
```

---

## 📊 Summary of Research Findings (ISO/IEC 25010)

- **Overall Technical Quality**: **4.62 / 5.00 (Excellent)** evaluated by 12 IT systems experts.
- **User Acceptance Testing (UAT)**: **4.54 / 5.00 (Strongly Agree)** by 10 MAT dispatchers and municipal officers.
- **Emergency Dispatch Latency**: Reduced from **18.4 minutes to 4.2 minutes (77.1% speedup)**.
- **AI Emergency Triage Concordance**: **93.8% Agreement** across 500 test incident descriptions.

---

## 🔗 Official Links
- **Live Municipal System**: [https://tugon.live](https://tugon.live)
- **Official Thesis Repository**: Shared with `teamccs-git`
- **Institution**: Laguna State Polytechnic University, Santa Cruz Main Campus (CCS)

