"use client";

import { useState } from "react";
import { MOCK_INCIDENTS, MOCK_VEHICLES, Incident } from "@/lib/mock-data";
import { Radio, Truck, CheckCircle2, AlertCircle, Clock, Shield } from "lucide-react";

export default function DispatchBoardPage() {
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [assignedUnit, setAssignedUnit] = useState<string>("Ambulance MAT-01");
  const [notification, setNotification] = useState<string | null>(null);

  const handleDispatch = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: "DISPATCHED",
          assignedUnit: assignedUnit
        };
      }
      return inc;
    }));
    setSelectedIncident(null);
    setNotification(`Mock Dispatch Confirmed: ${assignedUnit} dispatched to ${incidentId}.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#ff6b2c]" />
            Real-Time Unit Dispatch Board
          </h1>
          <p className="text-xs text-[#9aa7b4] mt-0.5">
            Coordinate emergency requests, review AI triage scores, and assign field response units.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#ff6b2c]/10 text-[#ff6b2c] border border-[#ff6b2c]/30 self-start sm:self-center">
          DEMO MODE · ANONYMIZED
        </span>
      </div>

      {notification && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Incidents Table / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-[#7f8b98] uppercase tracking-wider font-mono">
            Pending & Active Incidents ({incidents.length})
          </h2>

          <div className="space-y-3">
            {incidents.map((inc) => (
              <div 
                key={inc.id}
                className="p-5 rounded-xl border border-[#243040] bg-[#141b24] space-y-3 hover:border-[#ff6b2c]/40 transition-all"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white">{inc.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff6b2c]/10 text-[#ff6b2c] border border-[#ff6b2c]/30 font-bold">
                      {inc.category}
                    </span>
                    <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-bold">
                      {inc.severity}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#9aa7b4]">
                    AI Urgency: <strong className="text-white">{inc.aiTriageScore}/100</strong>
                  </span>
                </div>

                <p className="text-xs text-[#e9edf2] font-medium leading-relaxed">
                  {inc.description}
                </p>

                <div className="text-[11px] text-[#7f8b98] flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>📍 {inc.address} (Brgy. {inc.barangay})</span>
                  <span>👤 Caller: {inc.reporterName}</span>
                  <span>🕒 {inc.createdAt}</span>
                </div>

                <div className="pt-3 border-t border-[#243040] flex items-center justify-between flex-wrap gap-3">
                  <div className="text-xs font-mono">
                    Status: <span className="text-[#ff6b2c] font-bold">{inc.status}</span>
                    {inc.assignedUnit && (
                      <span className="text-[#7f8b98] ml-2">({inc.assignedUnit})</span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedIncident(inc)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#ff6b2c] text-black font-bold text-xs hover:bg-[#ff854d] transition-all"
                  >
                    Assign / Reassign Unit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Units Column */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-[#7f8b98] uppercase tracking-wider font-mono">
            Ground Vehicle Fleet
          </h2>

          <div className="p-4 rounded-xl border border-[#243040] bg-[#141b24] space-y-3">
            {MOCK_VEHICLES.map((v) => (
              <div key={v.id} className="p-3 rounded-lg border border-[#243040] bg-[#0b0f14] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{v.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    v.status === "AVAILABLE" ? "bg-emerald-500/20 text-emerald-400" : "bg-[#ff6b2c]/20 text-[#ff6b2c]"
                  }`}>
                    {v.status}
                  </span>
                </div>
                <div className="text-[11px] text-[#7f8b98]">{v.assignedResponder}</div>
                <div className="text-[10px] text-[#7f8b98] font-mono flex justify-between">
                  <span>Plate: {v.plateNumber}</span>
                  <span>Fuel: {v.fuelLevel}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Dispatch Assignment Box */}
          {selectedIncident && (
            <div className="p-5 rounded-xl border border-[#ff6b2c] bg-[#141b24] space-y-3">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ff6b2c]" />
                Dispatch Unit to {selectedIncident.id}
              </div>
              <p className="text-[11px] text-[#9aa7b4]">
                Target: Brgy. {selectedIncident.barangay} · {selectedIncident.category}
              </p>
              <div>
                <label className="text-[11px] text-[#7f8b98] font-mono block mb-1">Select Available Unit:</label>
                <select 
                  value={assignedUnit}
                  onChange={(e) => setAssignedUnit(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-[#0b0f14] border border-[#243040] text-white font-mono"
                >
                  {MOCK_VEHICLES.map((v) => (
                    <option key={v.id} value={v.name}>{v.name} ({v.status})</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleDispatch(selectedIncident.id)}
                  className="flex-1 py-2 rounded-lg bg-[#ff6b2c] text-black font-bold text-xs hover:bg-[#ff854d]"
                >
                  Confirm Dispatch
                </button>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="px-3 py-2 rounded-lg bg-[#243040] text-[#9aa7b4] text-xs hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

