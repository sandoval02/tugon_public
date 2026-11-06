# TUGON - User Manual & Operations Guide
**Research Project:** TUGON Emergency Response & Vehicle Dispatch System  
**Municipality:** Liliw, Laguna  
**Institution:** Laguna State Polytechnic University, College of Computer Studies

---

## 1. Citizen Mobile Application (Tugon Flutter)

### 1.1 Emergency Incident Submission
1. Launch the TUGON app on your smartphone and select **Enter as Resident / Citizen**.
2. Tap the red emergency button: **PRESS TO REPORT INCIDENT**.
3. Select the emergency category:
   - **MEDICAL**: Cardiac arrest, trauma, unconsciousness, severe illness.
   - **FIRE**: Residential, structural, or wild land fire.
   - **TRAFFIC_ACCIDENT**: Vehicular crashes, collisions, highway obstructions.
   - **FLOOD**: River overflow, typhoon inundation, landslide.
4. Enter a brief description or use Tagalog text (e.g., *"May sunog po sa may palengke kailangan agad ng bumbero"*).
5. Confirm your barangay location (GPS coordinates are attached automatically).
6. Tap **TRANSMIT EMERGENCY REPORT**.

### 1.2 Tracking Assigned Responders
1. Open the active mission banner from the home screen.
2. View the assigned municipal unit (e.g., *Ambulance MAT-01*).
3. Observe live ETA countdown and route progression.
4. Use the **Call Responder** button for direct telephone communication.

---

## 2. Command Center Web Portal (Tugon Admin)

### 2.1 Unit Dispatch & Queue Management
1. Open the web portal at `http://localhost:3000` and sign in as **Dispatcher Joya**.
2. Navigate to **Dispatch Board** (`/dashboard/dispatch`).
3. Inspect incoming incidents ranked by **AI Triage Urgency Scores** (0-100).
4. Click **Assign / Reassign Unit** on a pending emergency.
5. Select an available vehicle from the fleet roster (e.g., *Ambulance MAT-01*, *Fire Engine 02*).
6. Click **Confirm Dispatch** to transmit instant high-priority siren alarms to the responder's phone.

### 2.2 Live Fleet Telemetry Visualizer
1. Navigate to **Fleet Telemetry** (`/dashboard/tracking`).
2. Review real-time vehicle positions across the 33 barangays of Liliw.
3. Inspect battery levels, fuel percentages, and responder shift statuses.

### 2.3 Generating Monthly Accomplishment Reports
1. Navigate to **Accomplishment PDF** (`/dashboard/reports/monthly-accomplishment`).
2. Inspect aggregated call volumes, resolution percentages, and response time metrics.
3. Click **Print / Export to PDF** to generate the official LGU document ready for municipal mayoral signature.

---

## 3. Field Responder Operations

### 3.1 Mission Execution
1. Open the app and select **Enter as MAT Field Responder**.
2. When a mission alert is triggered, review citizen details and location.
3. Tap **Accept Mission** -> **En Route** -> **Arrived Scene** -> **Mark Resolved**.
4. Capture photographic evidence of resolution before closing the mission.

### 3.2 Geofenced Biometric Check-in
1. Navigate to the **Geofenced Attendance** section.
2. Ensure you are within **50 meters** of MAT Headquarters in Liliw.
3. Tap **Face ID Check-in** to complete biometric verification.

