"use client";

import { Bell, Siren, Shield, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-[#243040] bg-[#0b0f14]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold animate-pulse">
          <Siren className="w-3.5 h-3.5" />
          <span>EMERGENCY DISPATCH ACTIVE: 1 UNIT ON MISSION</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          title="Alert Notifications"
          className="w-9 h-9 rounded-lg border border-[#243040] bg-[#141b24] text-[#9aa7b4] hover:text-white flex items-center justify-center transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-[#ff6b2c] absolute top-2 right-2"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-[#243040]">
          <div className="w-8 h-8 rounded-full bg-[#ff6b2c]/20 border border-[#ff6b2c]/40 flex items-center justify-center text-[#ff6b2c] font-bold text-xs">
            DO
          </div>
          <div className="text-left hidden md:block">
            <div className="text-xs font-bold text-white">Duty Dispatcher</div>
            <div className="text-[10px] text-[#7f8b98] font-mono">Operations Console</div>
          </div>
        </div>
      </div>
    </header>
  );
}

