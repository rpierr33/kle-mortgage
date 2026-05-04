"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Loader2, Award, X } from "lucide-react";
import type { loanOfficers } from "@/lib/db/schema";

type Officer = typeof loanOfficers.$inferSelect;

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

interface Props {
  officers: Officer[];
}

export function TeamManager({ officers: initialOfficers }: Props) {
  const [officers, setOfficers] = useState(initialOfficers);
  const [editing, setEditing] = useState<Officer | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "", title: "", nmlsNumber: "", phone: "", email: "", bio: "",
    yearsExperience: 0, specialties: "", languages: "", licenseState: "",
    isFounder: false, displayOrder: 0,
  });

  const resetForm = () => setForm({
    name: "", title: "", nmlsNumber: "", phone: "", email: "", bio: "",
    yearsExperience: 0, specialties: "", languages: "", licenseState: "",
    isFounder: false, displayOrder: 0,
  });

  const openAdd = () => { resetForm(); setEditing(null); setShowForm(true); };

  const openEdit = (o: Officer) => {
    const specialties = Array.isArray(o.specialties) ? (o.specialties as string[]).join(", ") : "";
    const languages = Array.isArray(o.languages) ? (o.languages as string[]).join(", ") : "";
    const licenseState = Array.isArray(o.licenseState) ? (o.licenseState as string[]).join(", ") : "";
    setForm({
      name: o.name, title: o.title, nmlsNumber: o.nmlsNumber,
      phone: o.phone, email: o.email, bio: o.bio,
      yearsExperience: o.yearsExperience, specialties, languages, licenseState,
      isFounder: o.isFounder, displayOrder: o.displayOrder,
    });
    setEditing(o);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.nmlsNumber) {
      toast.error("Name, email, and NMLS number are required");
      return;
    }
    setSaving(true);

    const payload = {
      ...form,
      specialties: form.specialties.split(",").map((s) => s.trim()).filter(Boolean),
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
      licenseState: form.licenseState.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editing) {
        const res = await fetch(`/api/team/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setOfficers((prev) => prev.map((o) => o.id === editing.id ? updated : o));
      } else {
        const res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        const created = await res.json();
        setOfficers((prev) => [...prev, created]);
      }
      toast.success(editing ? "Officer updated" : "Officer added");
      setShowForm(false);
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: number, isActive: boolean) => {
    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setOfficers((prev) => prev.map((o) => o.id === id ? updated : o));
      toast.success(isActive ? "Officer activated" : "Officer deactivated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  return (
    <div>
      {/* Header Actions */}
      <div className="flex justify-end mb-5">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-4 py-2.5 rounded-md text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Officer
        </button>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {officers.length === 0 ? (
          <div className="col-span-3 bg-white rounded-xl border border-[#E8E0D8] p-16 text-center text-[#6B6056]">
            No loan officers yet. Add your first team member.
          </div>
        ) : (
          officers.map((o) => {
            const specialties = Array.isArray(o.specialties) ? o.specialties as string[] : [];
            return (
              <div key={o.id} className={`bg-white rounded-xl border ${o.isActive ? "border-[#E8E0D8]" : "border-dashed border-gray-300 opacity-60"} p-5`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#6B1C23] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm font-[family-name:var(--font-playfair)]">
                        {getInitials(o.name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#1A1A1A]">{o.name}</p>
                      <p className="text-xs text-[#C9A345]">{o.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(o)} className="p-1.5 hover:bg-[#F0EBE3] rounded-md transition-colors" title="Edit">
                      <Pencil className="w-3.5 h-3.5 text-[#6B6056]" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#6B6056] mb-1">NMLS #{o.nmlsNumber}</p>
                <p className="text-xs text-[#6B6056] line-clamp-2 mb-3">{o.bio}</p>

                {specialties.slice(0, 3).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {specialties.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs bg-[#F8F6F3] text-[#6B6056] px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-[#E8E0D8]">
                  {o.isFounder && (
                    <span className="flex items-center gap-1 text-xs text-[#C9A345]">
                      <Award className="w-3 h-3" /> Founder
                    </span>
                  )}
                  <button
                    onClick={() => toggleActive(o.id, !o.isActive)}
                    className={`ml-auto text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                      o.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {o.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-[#E8E0D8] w-full max-w-xl p-6 my-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">
                {editing ? "Edit Officer" : "Add Officer"}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-[#F0EBE3] rounded-md">
                <X className="w-4 h-4 text-[#6B6056]" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {[
                { key: "name", label: "Full Name *" },
                { key: "title", label: "Title *" },
                { key: "nmlsNumber", label: "NMLS Number *" },
                { key: "phone", label: "Phone *" },
                { key: "email", label: "Email *" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-[#1A1A1A] block mb-1">{label}</label>
                  <input
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  rows={3}
                  className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Years Experience</label>
                  <input
                    type="number"
                    value={form.yearsExperience}
                    onChange={(e) => setForm((f) => ({ ...f, yearsExperience: Number(e.target.value) }))}
                    className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) => setForm((f) => ({ ...f, displayOrder: Number(e.target.value) }))}
                    className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                  />
                </div>
              </div>

              {[
                { key: "specialties", label: "Specialties (comma-separated)" },
                { key: "languages", label: "Languages (comma-separated)" },
                { key: "licenseState", label: "Licensed States (comma-separated, e.g. FL)" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-[#1A1A1A] block mb-1">{label}</label>
                  <input
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                  />
                </div>
              ))}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFounder"
                  checked={form.isFounder}
                  onChange={(e) => setForm((f) => ({ ...f, isFounder: e.target.checked }))}
                  className="accent-[#6B1C23]"
                />
                <label htmlFor="isFounder" className="text-sm text-[#1A1A1A]">Mark as Founder</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-[#E8E0D8]">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-[#E8E0D8] text-[#1A1A1A] rounded-md text-sm font-medium hover:border-[#6B1C23] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] disabled:opacity-60 text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {editing ? "Save Changes" : "Add Officer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
