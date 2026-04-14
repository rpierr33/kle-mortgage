import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { loanApplications, loanOfficers } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_COLUMNS = [
  { key: "new", label: "New", color: "bg-amber-50 border-amber-200" },
  { key: "in_review", label: "In Review", color: "bg-blue-50 border-blue-200" },
  { key: "approved", label: "Approved", color: "bg-green-50 border-green-200" },
  { key: "funded", label: "Funded", color: "bg-purple-50 border-purple-200" },
  { key: "closed", label: "Closed", color: "bg-gray-50 border-gray-200" },
] as const;

const loanTypeLabels: Record<string, string> = {
  conventional: "Conv.", fha: "FHA", va: "VA", usda: "USDA",
  jumbo: "Jumbo", refinance: "Refi", first_time_buyer: "FTB", other: "Other",
};

export default async function ApplicationsPage() {
  let apps: typeof loanApplications.$inferSelect[] = [];

  try {
    apps = await db.select().from(loanApplications).orderBy(desc(loanApplications.createdAt)).limit(200);
  } catch { /* DB not connected */ }

  const byStatus = STATUS_COLUMNS.reduce((acc, col) => {
    acc[col.key] = apps.filter((a) => a.status === col.key);
    return acc;
  }, {} as Record<string, typeof apps>);

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Applications</h1>
            <p className="text-sm text-[#6B6056] mt-1">Loan application pipeline — {apps.length} total</p>
          </div>
        </div>

        {/* Kanban */}
        {apps.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E8E0D8] p-16 text-center">
            <p className="text-[#6B6056]">No applications yet. They'll appear here once submitted.</p>
          </div>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-4">
            {STATUS_COLUMNS.map((col) => {
              const colApps = byStatus[col.key] || [];
              return (
                <div key={col.key} className={`flex-shrink-0 w-72 rounded-xl border ${col.color} p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#1A1A1A] text-sm">{col.label}</h3>
                    <span className="bg-white border border-current text-xs font-bold px-2 py-0.5 rounded-full text-[#6B6056]">
                      {colApps.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colApps.length === 0 ? (
                      <p className="text-xs text-[#6B6056] text-center py-4">No applications</p>
                    ) : (
                      colApps.map((app) => (
                        <Link
                          key={app.id}
                          href={`/admin/applications/${app.id}`}
                          className="block bg-white rounded-lg border border-white shadow-sm p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <p className="font-semibold text-sm text-[#1A1A1A]">
                                {app.firstName} {app.lastName}
                              </p>
                              <p className="text-xs text-[#6B6056] truncate">{app.email}</p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-[#F8F6F3] text-[#6B1C23] px-2 py-0.5 rounded-full font-medium">
                              {loanTypeLabels[app.loanType] || app.loanType}
                            </span>
                            {app.purchasePrice && (
                              <span className="text-xs text-[#6B6056]">
                                ${Number(app.purchasePrice).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B6056] mt-2">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
