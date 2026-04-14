"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { leads } from "@/lib/db/schema";
import { Mail, Phone, ExternalLink } from "lucide-react";

type Lead = typeof leads.$inferSelect;

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-amber-100 text-amber-800" },
  { value: "contacted", label: "Contacted", color: "bg-blue-100 text-blue-800" },
  { value: "qualified", label: "Qualified", color: "bg-green-100 text-green-800" },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-800" },
  { value: "lost", label: "Lost", color: "bg-red-100 text-red-800" },
] as const;

interface Props {
  leads: Lead[];
}

export function LeadsManager({ leads: initialLeads }: Props) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setLeads((prev) => prev.map((l) => l.id === id ? updated : l));
      if (selected?.id === id) setSelected(updated);
      toast.success("Status updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  const statusColor = (s: string) => STATUS_OPTIONS.find((o) => o.value === s)?.color ?? "bg-gray-100 text-gray-800";

  return (
    <div className="flex gap-6 h-[calc(100vh-200px)] min-h-0">
      {/* List */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-[#E8E0D8] overflow-hidden min-w-0">
        {/* Filter tabs */}
        <div className="flex gap-1 p-3 border-b border-[#E8E0D8] overflow-x-auto">
          {[{ value: "all", label: "All" }, ...STATUS_OPTIONS].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                filter === opt.value
                  ? "bg-[#6B1C23] text-white"
                  : "text-[#6B6056] hover:bg-[#F8F6F3]"
              }`}
            >
              {opt.label}
              <span className="ml-1 opacity-60">
                ({opt.value === "all" ? leads.length : leads.filter((l) => l.status === opt.value).length})
              </span>
            </button>
          ))}
        </div>

        {/* Lead list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#6B6056] text-sm">No leads found</div>
          ) : (
            filtered.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelected(lead)}
                className={`p-4 border-b border-[#F0EBE3] cursor-pointer hover:bg-[#F8F6F3] transition-colors ${selected?.id === lead.id ? "bg-[#F8F6F3] border-l-2 border-l-[#6B1C23]" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#1A1A1A] truncate">{lead.firstName} {lead.lastName}</p>
                    <p className="text-xs text-[#6B6056] truncate">{lead.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                {lead.interest && <p className="text-xs text-[#6B6056] mt-1">{lead.interest}</p>}
                <p className="text-xs text-gray-400 mt-1">{new Date(lead.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="w-80 flex-shrink-0 bg-white rounded-xl border border-[#E8E0D8] overflow-y-auto">
        {!selected ? (
          <div className="flex items-center justify-center h-full text-[#6B6056] text-sm">
            Select a lead to view details
          </div>
        ) : (
          <div className="p-5">
            <h3 className="font-bold text-[#1A1A1A] text-lg mb-1 font-[family-name:var(--font-playfair)]">
              {selected.firstName} {selected.lastName}
            </h3>
            <p className="text-xs text-[#6B6056] mb-4">
              Submitted {new Date(selected.createdAt).toLocaleString()}
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-5">
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-[#6B1C23] hover:underline">
                <Mail className="w-3.5 h-3.5" /> {selected.email}
              </a>
              {selected.phone && (
                <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-[#6B1C23] hover:underline">
                  <Phone className="w-3.5 h-3.5" /> {selected.phone}
                </a>
              )}
            </div>

            {/* Fields */}
            <div className="space-y-3 border-t border-[#E8E0D8] pt-4 mb-5">
              {selected.interest && (
                <div>
                  <p className="text-xs text-[#6B6056]">Interested In</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{selected.interest}</p>
                </div>
              )}
              {selected.sourcePage && (
                <div>
                  <p className="text-xs text-[#6B6056]">Source Page</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{selected.sourcePage}</p>
                </div>
              )}
              {selected.message && (
                <div>
                  <p className="text-xs text-[#6B6056]">Message</p>
                  <p className="text-sm text-[#1A1A1A] leading-relaxed">{selected.message}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-[#6B6056]">Consents</p>
                <p className="text-xs text-[#1A1A1A]">
                  Email: {selected.emailConsent ? "Yes" : "No"} | SMS: {selected.smsConsent ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Status Change */}
            <div>
              <p className="text-xs font-medium text-[#6B6056] mb-2">Update Status</p>
              <div className="grid grid-cols-2 gap-1.5">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateStatus(selected.id, opt.value)}
                    className={`text-xs py-1.5 rounded-md font-medium transition-colors border ${
                      selected.status === opt.value
                        ? "bg-[#6B1C23] text-white border-[#6B1C23]"
                        : "border-[#E8E0D8] text-[#1A1A1A] hover:border-[#6B1C23]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
