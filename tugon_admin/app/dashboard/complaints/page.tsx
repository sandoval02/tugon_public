"use client";

import { useState } from "react";
import { MOCK_COMPLAINTS } from "@/lib/mock-data";
import { FileText, Search, Filter } from "lucide-react";

export default function ComplaintsPage() {
  const [filter, setFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filtered = MOCK_COMPLAINTS.filter((c) => {
    const matchesFilter = filter === "ALL" || c.status === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.barangay.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#ff6b2c]" />
            Citizen Complaints Management
          </h1>
          <p className="text-xs text-[#9aa7b4] mt-0.5">
            Non-emergency concerns filed by residents of Liliw, Laguna.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#7f8b98] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by title or barangay..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-lg bg-[#141b24] border border-[#243040] text-white focus:outline-none focus:border-[#ff6b2c]"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {["ALL", "PENDING", "IN_PROGRESS", "RESOLVED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-lg font-mono font-semibold transition-all ${
                filter === s
                  ? "bg-[#ff6b2c] text-black"
                  : "bg-[#141b24] text-[#9aa7b4] border border-[#243040] hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints Table */}
      <div className="rounded-xl border border-[#243040] bg-[#141b24] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0b0f14] text-[#7f8b98] font-mono uppercase text-[10px] border-b border-[#243040]">
            <tr>
              <th className="p-4">Reference</th>
              <th className="p-4">Title & Description</th>
              <th className="p-4">Category</th>
              <th className="p-4">Barangay</th>
              <th className="p-4">Filed By</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#243040]">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[#1a232f] transition-colors">
                <td className="p-4 font-mono font-bold text-white">{c.id}</td>
                <td className="p-4">
                  <div className="font-semibold text-white">{c.title}</div>
                  <div className="text-[11px] text-[#7f8b98] line-clamp-1">{c.description}</div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#243040] text-[#9aa7b4]">
                    {c.category}
                  </span>
                </td>
                <td className="p-4 text-[#e9edf2]">{c.barangay}</td>
                <td className="p-4 text-[#9aa7b4]">{c.reporterName}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    c.status === "RESOLVED" ? "bg-emerald-500/20 text-emerald-400" :
                    c.status === "IN_PROGRESS" ? "bg-blue-500/20 text-blue-400" :
                    "bg-amber-500/20 text-amber-400"
                  }`}>
                    {c.status}
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

