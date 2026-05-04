"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { siteSettings } from "@/lib/db/schema";

type Setting = typeof siteSettings.$inferSelect;

const DEFAULT_SETTINGS = [
  { key: "company_name", label: "Company Name", defaultValue: "KLE Mortgage Financing, LLC" },
  { key: "company_phone", label: "Phone Number", defaultValue: "(404) 555-1234" },
  { key: "company_email", label: "Contact Email", defaultValue: "info@klemortgage.com" },
  { key: "company_address", label: "Address", defaultValue: "Miami, FL" },
  { key: "company_nmls", label: "NMLS Number", defaultValue: "2380070" },
  { key: "company_license_states", label: "Licensed States", defaultValue: "FL" },
  { key: "hero_headline", label: "Hero Headline", defaultValue: "Your Dream Home Starts Here." },
  { key: "hero_subheadline", label: "Hero Subheadline", defaultValue: "KLE Mortgage Financing simplifies the path to homeownership." },
  { key: "facebook_url", label: "Facebook URL", defaultValue: "" },
  { key: "linkedin_url", label: "LinkedIn URL", defaultValue: "" },
];

interface Props {
  settings: Setting[];
}

export function SettingsManager({ settings: initialSettings }: Props) {
  const [saving, setSaving] = useState<string | null>(null);

  const getInitialValue = (key: string) => {
    const found = initialSettings.find((s) => s.key === key);
    return found?.value ?? DEFAULT_SETTINGS.find((d) => d.key === key)?.defaultValue ?? "";
  };

  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(DEFAULT_SETTINGS.map((d) => [d.key, getInitialValue(d.key)]))
  );

  const saveSetting = async (key: string) => {
    setSaving(key);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: values[key] }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("Setting saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(null);
    }
  };

  const saveAll = async () => {
    setSaving("all");
    try {
      await Promise.all(
        DEFAULT_SETTINGS.map((d) =>
          fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: d.key, value: values[d.key] }),
          })
        )
      );
      toast.success("All settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
        <h2 className="font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">Company Information</h2>
        <div className="space-y-4">
          {DEFAULT_SETTINGS.slice(0, 6).map(({ key, label }) => (
            <div key={key} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-[#1A1A1A] block mb-1">{label}</label>
                <input
                  value={values[key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                  className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                />
              </div>
              <button
                onClick={() => saveSetting(key)}
                disabled={saving === key || saving === "all"}
                className="flex items-center gap-1.5 bg-[#F8F6F3] hover:bg-[#F0EBE3] border border-[#E8E0D8] text-[#6B1C23] px-3 py-2 rounded-md text-xs font-semibold transition-colors flex-shrink-0"
              >
                {saving === key && <Loader2 className="w-3 h-3 animate-spin" />}
                Save
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
        <h2 className="font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">Website Content</h2>
        <div className="space-y-4">
          {DEFAULT_SETTINGS.slice(6, 8).map(({ key, label }) => (
            <div key={key} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-[#1A1A1A] block mb-1">{label}</label>
                <input
                  value={values[key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                  className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                />
              </div>
              <button
                onClick={() => saveSetting(key)}
                disabled={saving === key}
                className="flex items-center gap-1.5 bg-[#F8F6F3] hover:bg-[#F0EBE3] border border-[#E8E0D8] text-[#6B1C23] px-3 py-2 rounded-md text-xs font-semibold transition-colors flex-shrink-0"
              >
                {saving === key && <Loader2 className="w-3 h-3 animate-spin" />}
                Save
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
        <h2 className="font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">Social Media</h2>
        <div className="space-y-4">
          {DEFAULT_SETTINGS.slice(8).map(({ key, label }) => (
            <div key={key} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-[#1A1A1A] block mb-1">{label}</label>
                <input
                  value={values[key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                  type="url"
                  placeholder="https://..."
                  className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                />
              </div>
              <button
                onClick={() => saveSetting(key)}
                disabled={saving === key}
                className="flex items-center gap-1.5 bg-[#F8F6F3] hover:bg-[#F0EBE3] border border-[#E8E0D8] text-[#6B1C23] px-3 py-2 rounded-md text-xs font-semibold transition-colors flex-shrink-0"
              >
                {saving === key && <Loader2 className="w-3 h-3 animate-spin" />}
                Save
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveAll}
          disabled={saving === "all"}
          className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] disabled:opacity-60 text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors"
        >
          {saving === "all" && <Loader2 className="w-4 h-4 animate-spin" />}
          Save All Settings
        </button>
      </div>
    </div>
  );
}
