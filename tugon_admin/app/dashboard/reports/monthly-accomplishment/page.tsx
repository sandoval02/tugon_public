"use client";

import { Printer, Download, Award, FileSpreadsheet } from "lucide-react";

export default function MonthlyAccomplishmentReportPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#ff6b2c]" />
            Monthly Municipal Accomplishment Report
          </h1>
          <p className="text-xs text-[#9aa7b4] mt-0.5">
            Standardized disaster risk reduction accomplishment summary for LGU review.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-[#ff6b2c] text-black font-bold text-xs flex items-center gap-2 hover:bg-[#ff854d] transition-all"
          >
            <Printer className="w-4 h-4" />
            Print / Export to PDF
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="bg-white text-slate-900 rounded-xl p-8 sm:p-12 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0">
        {/* Official Header */}
        <div className="text-center border-b-2 border-slate-900 pb-6 mb-6 space-y-1">
          <div className="text-xs font-semibold tracking-wider uppercase text-slate-600">
            Republic of the Philippines · Province of Laguna
          </div>
          <div className="text-base font-bold text-slate-900 tracking-wide uppercase">
            MUNICIPALITY OF LILIW
          </div>
          <div className="text-sm font-extrabold text-[#d2480f] tracking-tight uppercase">
            MAYOR'S ACTION TEAM (MAT) & MUNICIPAL DISASTER RISK REDUCTION AND MANAGEMENT OFFICE
          </div>
          <div className="text-xs font-mono text-slate-500 pt-1">
            REPORTING PERIOD: OCTOBER 1 – OCTOBER 31, 2026
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-6 text-xs leading-relaxed">
          <div>
            <h2 className="font-bold text-sm text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              I. EXECUTIVE SUMMARY & HIGHLIGHTS
            </h2>
            <p className="text-slate-700">
              During the reporting period of October 2026, the TUGON Emergency Response and Fleet Telemetry Platform managed a total of <strong>142 calls</strong> and incident dispatches across all 33 barangays of Liliw, Laguna. Integration of real-time GPS fleet tracking and cognitive Tagalog AI incident triage reduced mean response dispatch times from <strong>18.4 minutes to 4.2 minutes</strong>, representing a <strong>77.1% efficiency improvement</strong>.
            </p>
          </div>

          {/* Key Metrics Table */}
          <div>
            <h2 className="font-bold text-sm text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              II. INCIDENT STATISTICS & OPERATIONAL DISPATCH BREAKDOWN
            </h2>
            <table className="w-full text-left border border-slate-300 text-xs">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2.5 border-r border-slate-300">Incident Classification</th>
                  <th className="p-2.5 border-r border-slate-300 text-center">Total Ingested</th>
                  <th className="p-2.5 border-r border-slate-300 text-center">Successfully Resolved</th>
                  <th className="p-2.5 text-center">Average Turnaround</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                <tr>
                  <td className="p-2.5 border-r border-slate-300 font-semibold">Medical Emergencies (Trauma / Acute Illness)</td>
                  <td className="p-2.5 border-r border-slate-300 text-center">46</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-bold text-emerald-700">46 (100%)</td>
                  <td className="p-2.5 text-center">3.8 mins</td>
                </tr>
                <tr>
                  <td className="p-2.5 border-r border-slate-300 font-semibold">Vehicular & Traffic Collisions</td>
                  <td className="p-2.5 border-r border-slate-300 text-center">29</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-bold text-emerald-700">28 (96.5%)</td>
                  <td className="p-2.5 text-center">4.1 mins</td>
                </tr>
                <tr>
                  <td className="p-2.5 border-r border-slate-300 font-semibold">Natural Hazards & Monsoon Flooding</td>
                  <td className="p-2.5 border-r border-slate-300 text-center">15</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-bold text-emerald-700">15 (100%)</td>
                  <td className="p-2.5 text-center">5.4 mins</td>
                </tr>
                <tr>
                  <td className="p-2.5 border-r border-slate-300 font-semibold">Fire & Electrical Alarms</td>
                  <td className="p-2.5 border-r border-slate-300 text-center">8</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-bold text-emerald-700">8 (100%)</td>
                  <td className="p-2.5 text-center">2.9 mins</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2.5 border-r border-slate-300">TOTAL INCIDENTS HANDLED</td>
                  <td className="p-2.5 border-r border-slate-300 text-center">98</td>
                  <td className="p-2.5 border-r border-slate-300 text-center text-emerald-800">97 (98.9%)</td>
                  <td className="p-2.5 text-center">4.2 mins</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-center">
            <div>
              <div className="border-b border-slate-900 pb-1 mb-1 font-bold">
                MUNICIPAL DISPATCH OPERATIONS OFFICER
              </div>
              <div className="text-[10px] text-slate-600 uppercase font-mono">
                MAT Lead Dispatch Operations Officer
              </div>
            </div>

            <div>
              <div className="border-b border-slate-900 pb-1 mb-1 font-bold">
                HON. MUNICIPAL MAYOR / MDRRMO HEAD
              </div>
              <div className="text-[10px] text-slate-600 uppercase font-mono">
                Municipality of Liliw, Laguna
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

