"use client";

import { BrainCircuit, Sparkles, TrendingUp, ShieldAlert, Cpu } from "lucide-react";

export default function AIAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#ff6b2c]" />
            Cognitive AI Decision Intelligence
          </h1>
          <p className="text-xs text-[#9aa7b4] mt-0.5">
            NLP triage metrics, Tagalog emergency keyword vectorization, and disaster forecasting.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-[#243040] bg-[#141b24]">
          <div className="text-xs font-semibold text-[#9aa7b4]">Pipeline Concordance</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-2">93.8%</div>
          <div className="text-[11px] text-[#7f8b98] mt-1">Concordance with human dispatcher triage</div>
        </div>

        <div className="p-5 rounded-xl border border-[#243040] bg-[#141b24]">
          <div className="text-xs font-semibold text-[#9aa7b4]">Average Inference Latency</div>
          <div className="text-2xl font-extrabold text-[#ff6b2c] font-mono mt-2">48 ms</div>
          <div className="text-[11px] text-[#7f8b98] mt-1">Heuristic + Gemini Flash-Lite fallback</div>
        </div>

        <div className="p-5 rounded-xl border border-[#243040] bg-[#141b24]">
          <div className="text-xs font-semibold text-[#9aa7b4]">False Alarm Prank Filter</div>
          <div className="text-2xl font-extrabold text-blue-400 font-mono mt-2">97.2%</div>
          <div className="text-[11px] text-[#7f8b98] mt-1">Spam & unverified submission rejection</div>
        </div>
      </div>

      {/* Keyword Vectorizer & Heuristic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-[#243040] bg-[#141b24] space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ff6b2c]" />
            Tagalog Emergency Keyword Weights
          </h2>
          <div className="space-y-2 text-xs font-mono">
            {[
              { word: "sunog / apoy (Fire Hazard)", weight: "+45 Urgency", count: "128 occurrences" },
              { word: "atake sa puso (Cardiac Arrest)", weight: "+40 Urgency", count: "94 occurrences" },
              { word: "baha / bagyo (Flood Surge)", weight: "+38 Urgency", count: "162 occurrences" },
              { word: "aksidente / banggaan (Crash)", weight: "+35 Urgency", count: "210 occurrences" },
              { word: "patalim / gulo (Weapon Hazard)", weight: "+28 Urgency", count: "45 occurrences" },
            ].map((k, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-[#0b0f14] border border-[#243040] flex justify-between items-center">
                <span className="text-[#e9edf2]">{k.word}</span>
                <div className="flex gap-2">
                  <span className="text-[#ff6b2c]">{k.weight}</span>
                  <span className="text-[#7f8b98]">({k.count})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-[#243040] bg-[#141b24] space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Rolling 7-Day Municipal Disaster Forecast
          </h2>
          <div className="p-4 rounded-lg bg-[#0b0f14] border border-[#243040] space-y-3">
            <div className="text-xs font-bold text-white">Target Zone: Riverside Barangays (Daniw, Ilayang Sungi)</div>
            <p className="text-[11px] text-[#9aa7b4] leading-relaxed">
              Based on rainfall intensity models and historical topographic data, riverbank barangays face a 65% elevated flood surge index over the weekend.
            </p>
            <div className="pt-2 border-t border-[#243040] text-[11px] text-emerald-400 font-mono">
              ✓ Automated recommendation: Position rubber boats at Daniw staging hub.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

