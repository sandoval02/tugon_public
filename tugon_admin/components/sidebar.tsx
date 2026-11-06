"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Radio, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  BrainCircuit, 
  UserCheck, 
  Award, 
  ShieldAlert,
  Home
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Dispatch Board", href: "/dashboard/dispatch", icon: Radio, badge: "1 Active" },
  { label: "Fleet Telemetry", href: "/dashboard/tracking", icon: MapPin },
  { label: "Incidents Queue", href: "/dashboard/incidents", icon: AlertTriangle, badge: "Urgent" },
  { label: "Complaints", href: "/dashboard/complaints", icon: FileText },
  { label: "AI Decision Intel", href: "/dashboard/ai-classification", icon: BrainCircuit },
  { label: "Attendance Logs", href: "/dashboard/attendance", icon: UserCheck },
  { label: "Accomplishment PDF", href: "/dashboard/reports/monthly-accomplishment", icon: Award },
  { label: "Evacuation Hubs", href: "/dashboard/evacuation", icon: Home },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-[#243040] bg-[#0b0f14] flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 border-b border-[#243040] flex items-center px-6 gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#ff6b2c] flex items-center justify-center font-bold text-black font-display text-lg">
          T
        </div>
        <div>
          <div className="font-bold text-white tracking-wide text-sm flex items-center gap-2">
            TUGON ADMIN
            <span className="text-[10px] bg-[#ff6b2c]/20 text-[#ff6b2c] px-1.5 py-0.5 rounded border border-[#ff6b2c]/30">
              LILIW
            </span>
          </div>
          <div className="text-[11px] text-[#9aa7b4]">MAT Command Center</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-semibold text-[#7f8b98] uppercase tracking-wider px-3 mb-2 font-mono">
          Operations
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#ff6b2c] text-black shadow-lg shadow-[#ff6b2c]/20 font-bold"
                  : "text-[#9aa7b4] hover:text-white hover:bg-[#141b24]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-[#7f8b98]"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive
                      ? "bg-black/20 text-black"
                      : "bg-[#243040] text-[#ff6b2c] border border-[#ff6b2c]/30"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Session Box */}
      <div className="p-4 border-t border-[#243040]">
        <div className="bg-[#141b24] p-3 rounded-lg border border-[#243040]">
          <div className="text-xs font-bold text-white flex items-center justify-between">
            <span>MAT Command Post</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-[11px] text-[#9aa7b4] mt-0.5">Municipal Ground Fleet: Online</div>
          <div className="text-[10px] text-[#ff6b2c] font-mono mt-1">LSPU CCS Academic Showcase</div>
        </div>
      </div>
    </aside>
  );
}

