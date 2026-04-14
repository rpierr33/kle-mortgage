"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { loanApplications, loanOfficers } from "@/lib/db/schema";
import { formatCurrency } from "@/lib/utils/format";

type App = typeof loanApplications.$inferSelect;
type Officer = typeof loanOfficers.$inferSelect;

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "funded", label: "Funded" },
  { value: "closed", label: "Closed" },
  { value: "denied", label: "Denied" },
] as const;

const loanTypeLabels: Record<string, string> = {
  conventional: "Conventional", fha: "FHA", va: "VA", usda: "USDA",
  jumbo: "Jumbo", refinance: "Refinancing", first_time_buyer: "First-Time Buyer", other: "Other",
};

interface Props {
  app: App;
  officers: Officer[];
}

export function ApplicationDetail({ app: initialApp, officers }: Props) {
  const [app, setApp] = useState(initialApp);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState(app.notes ?? "");

  const updateField = async (field: string, value: string | number | null) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/applications/${app.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setApp(updated);
      toast.success("Updated successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const saveNotes = () => updateField("notes", notes);

  const fields = [
    { label: "Full Name", value: `${app.firstName} ${app.lastName}` },
    { label: "Email", value: app.email },
    { label: "Phone", value: app.phone },
    { label: "Date of Birth", value: app.dateOfBirth || "—" },
    { label: "Loan Type", value: loanTypeLabels[app.loanType] || app.loanType },
    { label: "Is Refinance", value: app.isRefinance ? "Yes" : "No" },
    { label: "Purchase Price", value: app.purchasePrice ? formatCurrency(app.purchasePrice) : "—" },
    { label: "Down Payment", value: app.downPayment ? formatCurrency(app.downPayment) : "—" },
    { label: "Property Address", value: app.propertyAddress || "—" },
    { label: "Property City/State/ZIP", value: [app.propertyCity, app.propertyState, app.propertyZip].filter(Boolean).join(", ") || "—" },
    { label: "Property Type", value: app.propertyType || "—" },
    { label: "Property Usage", value: app.propertyUsage?.replace("_", " ") || "—" },
    { label: "Employment", value: app.employmentStatus || "—" },
    { label: "Employer", value: app.employerName || "—" },
    { label: "Job Title", value: app.jobTitle || "—" },
    { label: "Years Employed", value: app.yearsEmployed ?? "—" },
    { label: "Gross Monthly Income", value: app.grossMonthlyIncome ? formatCurrency(app.grossMonthlyIncome) : "—" },
    { label: "Est. Credit Score", value: app.estimatedCreditScore || "—" },
    { label: "SMS Consent", value: app.smsConsent ? "Yes" : "No" },
    { label: "Email Consent", value: app.emailConsent ? "Yes" : "No" },
    { label: "Submitted", value: new Date(app.createdAt).toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Details */}
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
          <h2 className="font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">Application Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-[#6B6056] mb-0.5">{label}</p>
                <p className="text-sm font-medium text-[#1A1A1A] capitalize">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
          <h2 className="font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">Internal Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            className="w-full border border-[#E8E0D8] rounded-lg p-3 text-sm focus:outline-none focus:border-[#6B1C23] resize-none"
            placeholder="Add internal notes about this application..."
          />
          <button
            onClick={saveNotes}
            disabled={saving}
            className="mt-3 flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] disabled:opacity-60 text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-colors"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Notes
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Status */}
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">Status</h3>
          <select
            value={app.status}
            onChange={(e) => updateField("status", e.target.value)}
            disabled={saving}
            className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23] bg-white"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Assign Officer */}
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">Assigned Officer</h3>
          <select
            value={app.assignedOfficerId ?? ""}
            onChange={(e) => updateField("assignedOfficerId", e.target.value ? parseInt(e.target.value) : null)}
            disabled={saving}
            className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23] bg-white"
          >
            <option value="">Unassigned</option>
            {officers.map((o) => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>
        </div>

        {/* Quick Info */}
        <div className="bg-[#F8F6F3] rounded-xl border border-[#E8E0D8] p-5">
          <h3 className="font-bold text-[#1A1A1A] mb-3 text-sm font-[family-name:var(--font-playfair)]">Quick Contact</h3>
          <div className="space-y-2">
            <a href={`mailto:${app.email}`} className="block text-sm text-[#6B1C23] hover:underline truncate">{app.email}</a>
            <a href={`tel:${app.phone}`} className="block text-sm text-[#6B1C23] hover:underline">{app.phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
