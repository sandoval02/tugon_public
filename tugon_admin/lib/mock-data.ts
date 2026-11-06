/**
 * TUGON Admin Portal Mock Data Provider (Sanitized & Anonymized)
 * Standard synthetic test records for academic evaluation
 */

export interface Incident {
  id: string;
  category: "MEDICAL" | "FIRE" | "TRAFFIC_ACCIDENT" | "NATURAL_DISASTER" | "PEACE_AND_ORDER";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "PENDING" | "DISPATCHED" | "IN_PROGRESS" | "RESOLVED";
  description: string;
  barangay: string;
  address: string;
  latitude: number;
  longitude: number;
  reporterName: string;
  reporterPhone: string;
  aiTriageScore: number;
  assignedUnit?: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  title: string;
  category: string;
  severity: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
  description: string;
  barangay: string;
  reporterName: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  name: string;
  plateNumber: string;
  type: "AMBULANCE" | "FIRE_TRUCK" | "PATROL_CAR" | "RESCUE_BOAT";
  status: "AVAILABLE" | "DISPATCHED" | "MAINTENANCE";
  assignedResponder: string;
  latitude: number;
  longitude: number;
  batteryLevel: number;
  fuelLevel: number;
}

export interface AttendanceRecord {
  id: string;
  responderName: string;
  unit: string;
  timeIn: string;
  status: "APPROVED" | "FLAGGED";
  distanceToHQ: string;
  verifiedFace: boolean;
}

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: "INC-DEMO-001",
    category: "MEDICAL",
    severity: "HIGH",
    status: "DISPATCHED",
    description: "Resident requesting emergency medical assistance for respiratory distress.",
    barangay: "Rizal",
    address: "Zone 2, Rizal Municipal Sector",
    latitude: 14.1315,
    longitude: 121.4372,
    reporterName: "Resident A",
    reporterPhone: "0900-000-0001",
    aiTriageScore: 88,
    assignedUnit: "Ambulance Unit 01",
    createdAt: "10 mins ago"
  },
  {
    id: "INC-DEMO-002",
    category: "TRAFFIC_ACCIDENT",
    severity: "HIGH",
    status: "IN_PROGRESS",
    description: "Two-vehicle road collision reported along national highway access route.",
    barangay: "Calumpang",
    address: "National Highway Access Rd",
    latitude: 14.1287,
    longitude: 121.4385,
    reporterName: "Resident B",
    reporterPhone: "0900-000-0002",
    aiTriageScore: 84,
    assignedUnit: "Patrol Unit 02",
    createdAt: "25 mins ago"
  },
  {
    id: "INC-DEMO-003",
    category: "FIRE",
    severity: "CRITICAL",
    status: "RESOLVED",
    description: "Electrical smoke alarm reported and safely contained by station units.",
    barangay: "Poblacion",
    address: "Central Poblacion Sector",
    latitude: 14.1338,
    longitude: 121.4342,
    reporterName: "Resident C",
    reporterPhone: "0900-000-0003",
    aiTriageScore: 96,
    assignedUnit: "Fire Engine 01",
    createdAt: "2 hours ago"
  }
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "CMP-DEMO-01",
    title: "Sanitation & Drainage Debris",
    category: "SANITATION",
    severity: "MEDIUM",
    status: "IN_PROGRESS",
    description: "Drainage canal requires scheduled maintenance.",
    barangay: "Poblacion",
    reporterName: "Resident D",
    createdAt: "Yesterday, 3:15 PM"
  },
  {
    id: "CMP-DEMO-02",
    title: "Streetlight Maintenance Notice",
    category: "INFRASTRUCTURE",
    severity: "LOW",
    status: "RESOLVED",
    description: "Flickering street lamp inspection request.",
    barangay: "Rizal",
    reporterName: "Resident E",
    createdAt: "Nov 3, 2026"
  }
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "VEH-01",
    name: "Rescue Ambulance 01",
    plateNumber: "GOV-1001",
    type: "AMBULANCE",
    status: "DISPATCHED",
    assignedResponder: "Duty Paramedic Unit",
    latitude: 14.1325,
    longitude: 121.4360,
    batteryLevel: 98,
    fuelLevel: 82
  },
  {
    id: "VEH-02",
    name: "Fire Rescue Engine 01",
    plateNumber: "GOV-2001",
    type: "FIRE_TRUCK",
    status: "AVAILABLE",
    assignedResponder: "Duty Fire Unit",
    latitude: 14.1345,
    longitude: 121.4350,
    batteryLevel: 100,
    fuelLevel: 90
  },
  {
    id: "VEH-03",
    name: "Community Patrol 01",
    plateNumber: "GOV-3001",
    type: "PATROL_CAR",
    status: "AVAILABLE",
    assignedResponder: "Duty Patrol Unit",
    latitude: 14.1338,
    longitude: 121.4342,
    batteryLevel: 95,
    fuelLevel: 75
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "ATT-DEMO-01",
    responderName: "Duty Responder A",
    unit: "Emergency Medical Service",
    timeIn: "07:48 AM",
    status: "APPROVED",
    distanceToHQ: "18.4m (Within 50m geofence)",
    verifiedFace: true
  },
  {
    id: "ATT-DEMO-02",
    responderName: "Duty Responder B",
    unit: "Fire & Rescue Division",
    timeIn: "07:55 AM",
    status: "APPROVED",
    distanceToHQ: "12.1m (Within 50m geofence)",
    verifiedFace: true
  }
];
