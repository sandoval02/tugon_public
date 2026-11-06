"""
TUGON In-Memory & Mock Database Layer (Academic Demonstration)
Clean mock storage interface without implicit data seeding.
"""
from typing import Dict, List, Any

# Standard territorial reference list for municipal boundaries
LILIW_BARANGAYS = [
    "Bagong Anyo", "Bayate", "Bubukal", "Bongkol", "Cabuyew", "Calumpang",
    "Culoy", "Dagatan", "Daniw", "Dita", "Ibabang Palina", "Ibabang San Roque",
    "Ibabang Sungi", "Ilayang Palina", "Ilayang San Roque", "Ilayang Sungi",
    "Kanlurang Bukal", "Laguan", "Luquin", "Malinao", "Masikap", "Maslun",
    "Mojon", "Novaliches", "Oples", "Pag-asa", "Palayan", "Rizal",
    "San Isidro", "Silangang Bukal", "Tuy-Baanan", "Poblacion", "Victoria"
]

class MockDatabase:
    """
    In-memory mock database store.
    Initializes clean and empty without any implicit seed data.
    """
    def __init__(self):
        self.users: Dict[str, Dict[str, Any]] = {}
        self.complaints: Dict[str, Dict[str, Any]] = {}
        self.incidents: Dict[str, Dict[str, Any]] = {}
        self.missions: Dict[str, Dict[str, Any]] = {}
        self.vehicles: Dict[str, Dict[str, Any]] = {}
        self.responders: Dict[str, Dict[str, Any]] = {}
        self.attendance: List[Dict[str, Any]] = []
        self.announcements: List[Dict[str, Any]] = []
        self.evacuation_centers: List[Dict[str, Any]] = []

    def clear(self):
        """Reset all tables to empty state."""
        self.users.clear()
        self.complaints.clear()
        self.incidents.clear()
        self.missions.clear()
        self.vehicles.clear()
        self.responders.clear()
        self.attendance.clear()
        self.announcements.clear()
        self.evacuation_centers.clear()

db = MockDatabase()
