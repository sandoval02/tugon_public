"use client";

import { Home, Users, CheckCircle, ShieldAlert } from "lucide-react";

export default function EvacuationPage() {
  const centers = [
    {
      name: "Liliw Municipal Gymnasium",
      barangay: "Poblacion",
      capacity: 500,
      occupied: 0,
      status: "READY",
      facilities: ["Restrooms", "Generator", "Medical Triage Hub", "Kitchen"]
    },
    {
      name: "Calumpang Elementary School Evacuation Hub",
      barangay: "Calumpang",
      capacity: 300,
      occupied: 0,
      status: "READY",
      facilities: ["Restrooms", "Deep Well Water", "First Aid Station"]
    },
    {
      name: "Rizal Barangay Multi-Purpose Hall",
      barangay: "Rizal",
      capacity: 150,
      occupied: 0,
      status: "STANDBY",
      facilities: ["Restrooms", "Solar Lighting"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Home className="w-5 h-5 text-[#ff6b2c]" />
            Municipal Evacuation Facilities
          </h1>
          <p className="text-xs text-[#9aa7b4] mt-0.5">
            Designated safe zones, shelters, and real-time occupant capacities across Liliw.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {centers.map((c, i) => (
          <div key={i} className="p-5 rounded-xl border border-[#243040] bg-[#141b24] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Brgy. {c.barangay}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                {c.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{c.name}</h3>
            <div className="text-xs text-[#9aa7b4]">
              Capacity: <strong className="text-white">{c.occupied} / {c.capacity}</strong> occupants
            </div>
            <div className="pt-2 border-t border-[#243040]">
              <div className="text-[10px] text-[#7f8b98] font-mono uppercase mb-1">On-Site Amenities:</div>
              <div className="flex flex-wrap gap-1">
                {c.facilities.map((f, j) => (
                  <span key={j} className="text-[10px] px-2 py-0.5 rounded bg-[#0b0f14] text-[#9aa7b4] border border-[#243040]">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

