"use client";

import Link from "next/link";
import { Shield, Radio, KeyRound, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0b0f14] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff6b2c]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#141b24] border border-[#243040] rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ff6b2c] flex items-center justify-center font-bold text-black text-xl">
            T
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">TUGON Command Portal</h1>
            <p className="text-xs text-[#9aa7b4]">Mayor's Action Team (MAT) · Liliw, Laguna</p>
          </div>
        </div>

        <p className="text-xs text-[#7f8b98] mb-6 leading-relaxed">
          Authorized access point for municipal dispatchers, MAT tactical units, and administrative officers. Select a demo profile below to access the academic showcase:
        </p>

        <div className="space-y-3 mb-6">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#243040] bg-[#0b0f14] hover:border-[#ff6b2c] hover:bg-[#1a232f] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ff6b2c]/20 text-[#ff6b2c] flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white group-hover:text-[#ff6b2c] transition-colors">
                  Enter as Dispatcher
                </div>
                <div className="text-[10px] text-[#7f8b98]">Full dispatch & telemetry controls</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7f8b98] group-hover:text-[#ff6b2c] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#243040] bg-[#0b0f14] hover:border-[#ff6b2c] hover:bg-[#1a232f] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Enter as MAT Chief Administrator
                </div>
                <div className="text-[10px] text-[#7f8b98]">System-wide governance & reports</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7f8b98] group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        <div className="text-center pt-4 border-t border-[#243040]">
          <span className="text-[11px] text-[#7f8b98] font-mono">
            Laguna State Polytechnic University · BSCS Thesis 2026
          </span>
        </div>
      </div>
    </div>
  );
}

