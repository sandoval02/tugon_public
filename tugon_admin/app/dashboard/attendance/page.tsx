"use client";

import { MOCK_ATTENDANCE } from "@/lib/mock-data";
import { UserCheck, ShieldCheck, MapPin } from "lucide-react";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            Geofenced Biometric Attendance Logs
          </h1>
          <p className="text-xs text-[#9aa7b4] mt-0.5">
            50-meter Haversine geofenced check-in logs around MAT Headquarters in Liliw, Laguna.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#243040] bg-[#141b24] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0b0f14] text-[#7f8b98] font-mono uppercase text-[10px] border-b border-[#243040]">
            <tr>
              <th className="p-4">Log ID</th>
              <th className="p-4">Responder Name</th>
              <th className="p-4">Assigned Unit</th>
              <th className="p-4">Time In</th>
              <th className="p-4">Proximity to HQ</th>
              <th className="p-4">Face ID Verified</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#243040]">
            {MOCK_ATTENDANCE.map((a) => (
              <tr key={a.id} className="hover:bg-[#1a232f] transition-colors">
                <td className="p-4 font-mono font-bold text-white">{a.id}</td>
                <td className="p-4 font-semibold text-white">{a.responderName}</td>
                <td className="p-4 text-[#9aa7b4]">{a.unit}</td>
                <td className="p-4 font-mono text-[#e9edf2]">{a.timeIn}</td>
                <td className="p-4 font-mono text-emerald-400">{a.distanceToHQ}</td>
                <td className="p-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    VERIFIED (99.2%)
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

