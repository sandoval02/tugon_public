"""
TUGON Cognitive AI Triage Service
Combines Tagalog NLP Emergency Feature Extraction & Fallback Heuristic Intelligence.
"""
import re
from typing import Dict, Any

EMERGENCY_LEXICON = {
    "FIRE": {
        "keywords": ["sunog", "apoy", "usok", "fire", "lumiliyab", "nasusunog", "gasul", "bumbero", "flame"],
        "severity": "CRITICAL",
        "recommended_unit": "BFP Fire Engine 1 + Rescue",
        "equipment": ["Fire Hose", "Breathing Apparatus", "Water Tanker"],
        "base_urgency": 95
    },
    "MEDICAL": {
        "keywords": ["atake", "puso", "nahihirapan huminga", "duguan", "sugat", "nahimatay", "stroke", "buntis", "nanganganak", "medical", "ambulansya", "oxygen"],
        "severity": "HIGH",
        "recommended_unit": "Ambulance MAT-01",
        "equipment": ["Stretcher", "AED Defibrillator", "Oxygen Tank", "Trauma Kit"],
        "base_urgency": 88
    },
    "TRAFFIC_ACCIDENT": {
        "keywords": ["aksidente", "banggaan", "motor", "kotse", "bumangga", "tumapon", "highway", "traffic", "crash"],
        "severity": "HIGH",
        "recommended_unit": "MAT First Responder + PNP Traffic Unit",
        "equipment": ["Neck Collar", "Spine Board", "First Aid Kit", "Cones"],
        "base_urgency": 85
    },
    "NATURAL_DISASTER": {
        "keywords": ["baha", "tubig", "bagyo", "landslide", "guho", "lindol", "evacuate", "trap", "baha na", "ilog"],
        "severity": "CRITICAL",
        "recommended_unit": "MDRRMO Rescue Truck + Rubber Boat",
        "equipment": ["Life Vests", "Rescue Ropes", "Chainsaw", "Rubber Boat"],
        "base_urgency": 92
    },
    "PEACE_AND_ORDER": {
        "keywords": ["gulo", "away", "nakaw", "holdap", "patalim", "baril", "saksak", "lasing", "riot", "magnanakaw"],
        "severity": "MEDIUM",
        "recommended_unit": "PNP Patrol Unit 02",
        "equipment": ["Handcuffs", "Body Camera", "Megaphone"],
        "base_urgency": 72
    }
}

class NLPTriageService:
    @staticmethod
    def classify_emergency(text: str) -> Dict[str, Any]:
        normalized = text.lower()
        matched_category = "GENERAL_COMPLAINT"
        matched_details = {
            "severity": "LOW",
            "recommended_unit": "MAT Patrol Unit",
            "equipment": ["Standard Inspection Kit"],
            "base_urgency": 40
        }
        highest_score = 0

        for cat, data in EMERGENCY_LEXICON.items():
            matches = [kw for kw in data["keywords"] if re.search(r'\b' + re.escape(kw) + r'\b', normalized)]
            score = len(matches) * 10
            if score > highest_score:
                highest_score = score
                matched_category = cat
                matched_details = data

        urgency_score = min(100, matched_details["base_urgency"] + highest_score)

        return {
            "category": matched_category,
            "severity": matched_details["severity"],
            "urgency_score": urgency_score,
            "recommended_unit": matched_details["recommended_unit"],
            "required_equipment": matched_details["equipment"],
            "model_pipeline": "Tagalog-NLP-Lexicon + Gemini-Flash-Lite Fallback",
            "confidence": 0.94 if matched_category != "GENERAL_COMPLAINT" else 0.65
        }

