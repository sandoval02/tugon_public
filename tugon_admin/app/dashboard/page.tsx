"use client";

import { MOCK_INCIDENTS, MOCK_VEHICLES, MOCK_COMPLAINTS } from "@/lib/mock-data";
import { Siren, Users, Truck, Clock, ShieldCheck, ArrowUpRight, Radio } from "lucide-react";
import Link from "next/link";

export default function DashboardOverviewPage() {
  const activeEmergencies = MOCK_INCIDENTS.filter(i => i.status !== "RESOLVED");
  const availableVehicles = MOCK_VEHICLES.filter(v => v.status === "AVAILABLE");

  return (
    <div className="space-y-8">
      {/* Page Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Command Center Overview</h1>
          <p className="text-xs text-[#9aa7b4] mt-1">
            Real-time telemetry and incident triage for the 33 barangays of Liliw, Laguna
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/dispatch"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff6b2c] hover:bg-[#ff854d] text-black font-bold text-xs shadow-lg shadow-[#ff6b2c]/20 transition-all"
          >
            <Radio className="w-4 h-4" />
            Open Dispatch Board
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-[#243040] bg-[#141b24] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9aa7b4]">Active Emergencies</span>
            <span className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
              <Siren className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white mt-3 font-mono">
            {activeEmergencies.length}
          </div>
          <div className="text-[11px] text-red-400 font-semibold mt-1 flex items-center gap-1">
            <span>● 1 High Urgency in Brgy. Rizal</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-[#243040] bg-[#141b24]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9aa7b4]">Available Fleet Units</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white mt-3 font-mono">
            {availableVehicles.length} / {MOCK_VEHICLES.length}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            Ambulance & Fire Engine ready
          </div>
        </div>

        <div className="p-5 rounded-xl border border-[#243040] bg-[#141b24]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9aa7b4]">Mean Response Time</span>
            <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white mt-3 font-mono">
            4.2 <span className="text-sm font-normal text-[#9aa7b4]">mins</span>
          </div>
          <div className="text-[11px] text-blue-400 font-semibold mt-1">
            77.1% faster than manual baseline
          </div>
        </div>

        <div className="p-5 rounded-xl border border-[#243040] bg-[#141b24]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9aa7b4]">AI Triage Accuracy</span>
            <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white mt-3 font-mono">
            93.8%
          </div>
          <div className="text-[11px] text-amber-400 font-semibold mt-1">
            Tagalog NLP incident concordance
          </div>
        </div>
      </div>

      {/* Main Grid: Active Incidents & Fleet Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Emergency Queue */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-[#243040] bg-[#141b24] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Priority Incident Stream
              </h2>
              <p className="text-xs text-[#7f8b98]">Incoming distress signals analyzed by AI triage</p>
            </div>
            <Link href="/dashboard/incidents" className="text-xs text-[#ff6b2c] hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_INCIDENTS.map((inc) => (
              <div 
                key={inc.id}
                className="p-4 rounded-lg border border-[#243040] bg-[#0b0f14] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#ff6b2c]/50 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-white">{inc.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      inc.severity === "CRITICAL" ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                      inc.severity === "HIGH" ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" :
                      "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                    }`}>
                      {inc.category} · {inc.severity}
                    </span>
                    <span className="text-[10px] text-[#7f8b98] font-mono">
                      AI Urgency: {inc.aiTriageScore}/100
                    </span>
                  </div>
                  <p className="text-xs text-[#e9edf2] font-medium leading-relaxed">
                    {inc.description}
                  </p>
                  <div className="text-[11px] text-[#7f8b98]">
                    📍 {inc.address} (Brgy. {inc.barangay}) · Reported by {inc.reporterName} ({inc.createdAt})
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <span className={`text-xs px-2.5 py-1 rounded font-bold font-mono ${
                    inc.status === "DISPATCHED" ? "bg-[#ff6b2c]/20 text-[#ff6b2c]" :
                    inc.status === "IN_PROGRESS" ? "bg-blue-500/20 text-blue-400" :
                    "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {inc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet & Resource Status */}
        <div className="p-6 rounded-xl border border-[#243040] bg-[#141b24] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Vehicle Readiness
            </h2>
            <Link href="/dashboard/tracking" className="text-xs text-[#ff6b2c] hover:underline flex items-center gap-1">
              GIS Canvas <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_VEHICLES.map((v) => (
              <div key={v.id} className="p-3.5 rounded-lg border border-[#243040] bg-[#0b0f14] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{v.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    v.status === "AVAILABLE" ? "bg-emerald-500/20 text-emerald-400" : "bg-[#ff6b2c]/20 text-[#ff6b2c]"
                  }`}>
                    {v.status}
                  </span>
                </div>
                <div className="text-[11px] text-[#9aa7b4]">
                  Driver: {v.assignedResponder}
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#7f8b98] font-mono pt-1 border-t border-[#243040]/50">
                  <span>Plate: {v.plateNumber}</span>
                  <span>Fuel: {v.fuelLevel}%</span>
                  <span>Battery: {v.batteryLevel}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

