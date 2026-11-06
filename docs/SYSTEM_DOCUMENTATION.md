# TUGON - System Documentation & Technical Diagrams
**Research Project:** TUGON: An Intelligent Municipal Emergency Response, Real-Time Dispatch, and Spatial Decision-Support Framework for Liliw, Laguna  
**Academic Entity:** Laguna State Polytechnic University (LSPU), College of Computer Studies (CCS)  
**Target Repository:** `teamccs-git` (Sanitized Academic Release)

---

## 1. High-Level System Architecture

```
+-----------------------------------------------------------------------------------------+
|                              1. CLIENT & PRESENTATION TIER                              |
|   [Citizen Mobile App]           [Responder Mobile App]         [MAT Command Web Portal]|
|   (Flutter 3.8+ / Android & iOS) (Flutter 3.8+ / GPS Beacon)    (Next.js 15 / TypeScript)
+-----------------------------------------------------------------------------------------+
                                             |
                                  HTTPS / WSS (WebSocket)
                                             v
+-----------------------------------------------------------------------------------------+
|                                2. EDGE & INGRESS GATEWAY                                |
|   - Next.js Edge Server Actions & Session Token Gateways                                |
|   - FastAPI Global CORS, Host Whitelist & Token-Bucket Rate Limiter                    |
+-----------------------------------------------------------------------------------------+
                                             |
                     +-----------------------+-----------------------+
                     |                                               |
                     v                                               v
+------------------------------------------+    +-----------------------------------------+
|  3. CORE APPLICATION & TELEMETRY TIER    |    |   4. COGNITIVE AI INFERENCE TIER        |
|               (tugon_fastapi)            |    |          (tugon_ai_fastapi)             |
| - JWT HS256 Role-Based Guards            |    | - Multilingual Tagalog NLP Ingestion    |
| - Incident & Mission State Machines      |    | - Automated Severity & Urgency Scoring  |
| - WebSocket Telemetry Multiplexer        |    | - Emergency Unit & Gear Allocator       |
| - Haversine 50m Geofenced Attendance     |    | - Rolling Time-Series Disaster Forecast |
+------------------------------------------+    +-----------------------------------------+
                     |                                               |
                     +-----------------------+-----------------------+
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                            5. DATA PERSISTENCE & SERVICES LAYER                         |
|   - Relational Database: PostgreSQL 15+ / SQLite Storage Engine                         |
|   - Real-Time Pub/Sub: Redis In-Memory Telemetry Cache                                  |
|   - Object Storage: S3-Compatible Evidence Bucket (Photo & PDF Reports)                 |
|   - Notification Broker: Firebase Cloud Messaging (FCM v1) High-Priority Siren Alarms   |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Data Flow Diagrams (DFD)

### 2.1 DFD Level 0 (Context Diagram)

```
                       +-----------------------------------+
                       |                                   |
                       |         TUGON EMERGENCY           |
 [CITIZEN] ----------->|        MANAGEMENT PLATFORM        |<----------- [RESPONDER]
   - Distress Report   |                                   |   - Location Stream
   - Photo & GPS       | - Processes Triage & Allocations  |   - Mission Status
   <-------------------| - Coordinates Unit Dispatch       |-------------------->
   - Responder ETA     | - Generates Municipal Analytics   |   - Siren Alert & Nav
                       |                                   |
                       +-----------------+-----------------+
                                         ^
                                         |
                                         v
                                  [MAT DISPATCHER]
                                    - Reviews Priority Triage
                                    - Confirms Unit Assignment
                                    - Exports Accomplishment PDF
```

### 2.2 DFD Level 1 (Subsystem Deconstruction)

```
[Citizen] -----> (1.0 Ingest Report) -----> [FastAPI Core Gateway]
                                                    |
                                            +-------+
                                            |
                                            v
[AI Microservice] <---- (2.0 Tagalog NLP Triage) <--+
        |
        +-----> (3.0 Urgency Score & Unit Recommendation) -----> [Database Engine]
                                                                        |
                                                                +-------+
                                                                |
                                                                v
[Dispatcher Dashboard] <---- (4.0 Real-Time WebSocket Push) <---+
        |
        v
(5.0 Unit Assignment & Confirmation) -----> [FastAPI Core Gateway]
                                                    |
                                                    v
[Responder Mobile App] <---- (6.0 High-Priority Siren Push) <--- [Firebase FCM]
```

---

## 3. UML Use Case Diagram

```
+------------------------------------------------------------------------------------+
|                                 TUGON SYSTEM ACTORS                                |
+------------------------------------------------------------------------------------+

 (Citizen)
   |-- [UC-01] 1-Tap SOS Emergency Submission
   |-- [UC-02] Voice Audio Recording & Photo Upload
   |-- [UC-03] Real-Time Responder Tracking & ETA Stream
   |-- [UC-04] Access Municipal Emergency Hotlines
   |-- [UC-05] View Go-Bag Disaster Checklist

 (Field Responder)
   |-- [UC-06] High-Priority Mission Alert Ingestion
   |-- [UC-07] Step-by-Step Mission Transition (Accepted, En Route, Arrived, Resolved)
   |-- [UC-08] Photographic Proof of Resolution Submission
   |-- [UC-09] 50m Geofenced Face ID Attendance Check-in

 (MAT Dispatcher / Administrator)
   |-- [UC-10] Real-Time Incident Priority Inspection & AI Triage Review
   |-- [UC-11] Emergency Fleet Vehicle Allocation & Dispatch
   |-- [UC-12] GIS Territorial Telemetry Visualizer Monitoring
   |-- [UC-13] Generate & Print Official Monthly Accomplishment PDF Reports
   |-- [UC-14] Manage Safe Zone Evacuation Facilities
```

---

## 4. Entity-Relationship Diagram (ERD Schema)

```
+--------------------+        1:N        +--------------------+
|       USERS        |-------------------|     COMPLAINTS     |
+--------------------+                   +--------------------+
| id (PK)            |                   | id (PK)            |
| name               |                   | user_id (FK)       |
| email              |                   | category           |
| role               |                   | status             |
| barangay           |                   | latitude / long    |
+--------------------+                   +--------------------+
          |
          | 1:N
          v
+--------------------+        1:N        +--------------------+
|     INCIDENTS      |-------------------|      MISSIONS      |
+--------------------+                   +--------------------+
| id (PK)            |                   | id (PK)            |
| category           |                   | incident_id (FK)   |
| severity           |                   | responder_id (FK)  |
| ai_triage_score    |                   | vehicle_id (FK)    |
| status             |                   | status             |
| barangay           |                   | dispatched_at      |
+--------------------+                   +--------------------+
                                                   |
                                                   | N:1
                                                   v
                                         +--------------------+
                                         |      VEHICLES      |
                                         +--------------------+
                                         | id (PK)            |
                                         | plate_number       |
                                         | type               |
                                         | status             |
                                         +--------------------+
```

