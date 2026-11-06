"use client";

import { MOCK_VEHICLES } from "@/lib/mock-data";
import { MapPin, Navigation, Compass, Layers, Shield } from "lucide-react";

export default function FleetTrackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#ff6b2c]" />
            GIS Fleet Telemetry & Live Spatial Canvas
          </h1>
          <p className="text-xs text-[#9aa7b4] mt-0.5">
            Real-time GPS tracking across the 33 barangays of Liliw, Laguna (Simulation Mode).
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[#9aa7b4]">WebSocket Telemetry Active</span>
        </div>
      </div>

      {/* Simulated GIS Canvas */}
      <div className="rounded-2xl border border-[#243040] bg-[#141b24] overflow-hidden shadow-2xl relative">
        {/* Canvas Toolbar */}
        <div className="p-4 border-b border-[#243040] bg-[#0b0f14]/60 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded bg-[#243040]">
              MDRRMO Liliw GIS Layer
            </span>
            <span className="text-xs text-[#7f8b98] font-mono">
              Center: 14.1338° N, 121.4342° E · Zoom 15
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#243040] bg-[#141b24] text-xs text-[#9aa7b4] hover:text-white flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Barangay Boundaries
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-[#243040] bg-[#141b24] text-xs text-[#9aa7b4] hover:text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Reset Compass
            </button>
          </div>
        </div>

        {/* Map Vector Mock Graphics */}
        <div className="h-[480px] bg-[#070b10] relative flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          {/* Barangay Territorial Polygonal Overlay (Schematic Mock) */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 800 500">
            <polygon points="120,80 340,60 410,180 280,240 150,190" fill="#ff6b2c" fillOpacity="0.08" stroke="#ff6b2c" strokeWidth="1" strokeDasharray="4 2" />
            <text x="230" y="140" fill="#ff6b2c" fontSize="12" fontFamily="monospace">Brgy. Rizal (Elevation: 340m)</text>

            <polygon points="340,60 580,90 620,260 410,180" fill="#3b82f6" fillOpacity="0.06" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" />
            <text x="450" y="160" fill="#3b82f6" fontSize="12" fontFamily="monospace">Brgy. Calumpang</text>

            <polygon points="280,240 410,180 490,380 310,420" fill="#10b981" fillOpacity="0.06" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
            <text x="350" y="310" fill="#10b981" fontSize="12" fontFamily="monospace">Brgy. Poblacion (MAT HQ)</text>

            {/* Road network schematic */}
            <path d="M 120 180 Q 300 210 400 300 T 700 450" fill="none" stroke="#243040" strokeWidth="3" />
            <path d="M 340 60 L 400 300" fill="none" stroke="#243040" strokeWidth="2" strokeDasharray="2 2" />
          </svg>

          {/* Vehicle Markers */}
          {/* Ambulance MAT-01 Marker */}
          <div className="absolute top-[180px] left-[320px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#ff6b2c] text-black font-extrabold flex items-center justify-center shadow-xl shadow-[#ff6b2c]/40 animate-bounce">
              🚑
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-[#0b0f14] border border-[#ff6b2c] text-[10px] font-mono font-bold text-white whitespace-nowrap shadow-md">
              Ambulance MAT-01 · 32 km/h
            </div>
          </div>

          {/* Fire Engine Marker */}
          <div className="absolute top-[280px] left-[460px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-red-600 text-white font-extrabold flex items-center justify-center shadow-lg">
              🚒
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-[#0b0f14] border border-[#243040] text-[10px] font-mono text-[#9aa7b4] whitespace-nowrap">
              BFP Engine 02 (Stationary)
            </div>
          </div>

          {/* Police Patrol Marker */}
          <div className="absolute top-[340px] left-[380px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center shadow-lg">
              🚓
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-[#0b0f14] border border-[#243040] text-[10px] font-mono text-[#9aa7b4] whitespace-nowrap">
              Patrol 03 (Standby)
            </div>
          </div>

          {/* Incident Callout */}
          <div className="absolute top-[130px] left-[270px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-red-500 animate-ping absolute"></div>
            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold relative z-10">
              !
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-red-950/80 border border-red-500 text-[10px] font-mono text-red-200">
              INC-2026-1042 (Rizal)
            </div>
          </div>
        </div>

        {/* Bottom Fleet Status Bar */}
        <div className="p-4 border-t border-[#243040] bg-[#0b0f14] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MOCK_VEHICLES.map((v) => (
            <div key={v.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#141b24] border border-[#243040] flex items-center justify-center text-base">
                {v.type === "AMBULANCE" ? "🚑" : v.type === "FIRE_TRUCK" ? "🚒" : "🚓"}
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">{v.name}</div>
                <div className="text-[10px] text-[#7f8b98] font-mono">
                  {v.status} · Battery: {v.batteryLevel}% · Fuel: {v.fuelLevel}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

