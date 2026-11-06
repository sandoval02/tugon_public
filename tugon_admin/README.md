# TUGON - Admin Command Center Dashboard (Academic Showcase)

This repository contains the Next.js 15 administrative command portal of **TUGON: Emergency Response & Vehicle Dispatch System** for the Municipality of Liliw, Laguna.

Submitted to the **Laguna State Polytechnic University (LSPU) - College of Computer Studies** for academic evaluation (`teamccs-git`).

---

## 🚀 Key Modules
- **Overview Dashboard (`/dashboard`)**: Live emergency counters, response time benchmarks, and fleet status summary.
- **Dispatch Board (`/dashboard/dispatch`)**: Real-time incoming incident triage stream and unit allocation modal.
- **GIS Fleet Telemetry Canvas (`/dashboard/tracking`)**: Spatial visualizer representing vehicle telemetry across Liliw's 33 barangays.
- **Complaints & Incidents Queue (`/dashboard/complaints`, `/dashboard/incidents`)**: Filterable tables with AI severity indicators.
- **Cognitive AI Decision Intelligence (`/dashboard/ai-classification`)**: Tagalog emergency keyword weights and predictive 7-day disaster forecasts.
- **Geofenced Attendance (`/dashboard/attendance`)**: Biometric Face ID logs with 50-meter Haversine distance verification around MAT HQ.
- **Monthly Accomplishment Report (`/dashboard/reports/monthly-accomplishment`)**: Official printable and exportable LGU accomplishment document.

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install
# or
pnpm install

# Run the local development server
npm run dev
# or
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to explore the command center with pre-configured demo logins.

