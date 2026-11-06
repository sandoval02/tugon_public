"use client";

import { MOCK_INCIDENTS } from "@/lib/mock-data";
import { AlertTriangle, ShieldCheck, Siren } from "lucide-react";

export default function IncidentsQueuePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Emergency Incidents Queue
          </h1>
          <p className="text-xs text-[#9aa7b4] mt-0.5">
            Real-time emergency feed with automated cognitive AI priority scoring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_INCIDENTS.map((inc) => (
          <div key={inc.id} className="p-5 rounded-xl border border-[#243040] bg-[#141b24] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-white">{inc.id}</span>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded font-bold ${
                  inc.severity === "CRITICAL" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                  inc.severity === "HIGH" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                  "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}>
                  {inc.category} · {inc.severity}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  AI Triage: {inc.aiTriageScore}/100
                </span>
              </div>
              <span className="text-xs text-[#7f8b98] font-mono">{inc.createdAt}</span>
            </div>

            <p className="text-xs text-white leading-relaxed font-medium">
              {inc.description}
            </p>

            <div className="pt-2 border-t border-[#243040] flex items-center justify-between flex-wrap gap-3 text-xs text-[#9aa7b4]">
              <div>
                📍 <strong>{inc.address}</strong> (Brgy. {inc.barangay}) · Reported by {inc.reporterName} ({inc.reporterPhone})
              </div>
              <div className="font-mono">
                Assigned: <strong className="text-white">{inc.assignedUnit || "Unassigned"}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

