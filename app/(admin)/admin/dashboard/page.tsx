import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { loanApplications, leads, loanOfficers } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import Link from "next/link";
import { ClipboardList, Users, CheckCircle, Clock, TrendingUp, ArrowRight, AlertTriangle } from "lucide-react";

export default async function AdminDashboardPage() {
  let stats = { total: 0, new: 0, inReview: 0, approved: 0, funded: 0, closed: 0, leads: 0, officers: 0 };
  let recentApps: typeof loanApplications.$inferSelect[] = [];
  let dbConnected = false;

  try {
    const [totalApps, newApps, inReviewApps, approvedApps, fundedApps, closedApps, totalLeads, totalOfficers] = await Promise.all([
      db.select({ count: count() }).from(loanApplications),
      db.select({ count: count() }).from(loanApplications).where(eq(loanApplications.status, "new")),
      db.select({ count: count() }).from(loanApplications).where(eq(loanApplications.status, "in_review")),
      db.select({ count: count() }).from(loanApplications).where(eq(loanApplications.status, "approved")),
      db.select({ count: count() }).from(loanApplications).where(eq(loanApplications.status, "funded")),
      db.select({ count: count() }).from(loanApplications).where(eq(loanApplications.status, "closed")),
      db.select({ count: count() }).from(leads),
      db.select({ count: count() }).from(loanOfficers).where(eq(loanOfficers.isActive, true)),
    ]);

    stats = {
      total: totalApps[0]?.count ?? 0,
      new: newApps[0]?.count ?? 0,
      inReview: inReviewApps[0]?.count ?? 0,
      approved: approvedApps[0]?.count ?? 0,
      funded: fundedApps[0]?.count ?? 0,
      closed: closedApps[0]?.count ?? 0,
      leads: totalLeads[0]?.count ?? 0,
      officers: totalOfficers[0]?.count ?? 0,
    };

    recentApps = await db.select().from(loanApplications).orderBy(loanApplications.createdAt).limit(5);
    dbConnected = true;
  } catch {
    // DB not connected — show warning banner
  }

  const statCards = [
    { label: "Total Applications", value: stats.total, icon: ClipboardList, color: "bg-[#6B1C23]", href: "/admin/applications" },
    { label: "New (Unreviewed)", value: stats.new, icon: Clock, color: "bg-amber-600", href: "/admin/applications" },
    { label: "In Review", value: stats.inReview, icon: TrendingUp, color: "bg-blue-600", href: "/admin/applications" },
    { label: "Approved", value: stats.approved, icon: CheckCircle, color: "bg-green-600", href: "/admin/applications" },
    { label: "Total Leads", value: stats.leads, icon: Users, color: "bg-purple-600", href: "/admin/leads" },
    { label: "Active Officers", value: stats.officers, icon: Users, color: "bg-slate-600", href: "/admin/team" },
  ];

  const loanTypeLabels: Record<string, string> = {
    conventional: "Conventional", fha: "FHA", va: "VA", usda: "USDA",
    jumbo: "Jumbo", refinance: "Refinance", first_time_buyer: "First-Time Buyer", other: "Other",
  };

  const statusColors: Record<string, string> = {
    new: "bg-amber-100 text-amber-800",
    in_review: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    funded: "bg-purple-100 text-purple-800",
    closed: "bg-gray-100 text-gray-800",
    denied: "bg-red-100 text-red-800",
  };

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Dashboard</h1>
          <p className="text-[#6B6056] text-sm mt-1">KLE Mortgage Financing — CRM Overview</p>
        </div>

        {/* DB connection warning */}
        {!dbConnected && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Database not connected</p>
              <p className="text-amber-700 text-xs mt-0.5">
                Connect your Neon database by setting <code className="bg-amber-100 px-1 rounded">DATABASE_URL</code> in <code className="bg-amber-100 px-1 rounded">.env.local</code> to see real applications, leads, and pipeline data.
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-white rounded-xl border border-[#E8E0D8] p-4 hover:shadow-md transition-shadow group"
            >
              <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{value}</p>
              <p className="text-xs text-[#6B6056] mt-0.5">{label}</p>
            </Link>
          ))}
        </div>

        {/* Pipeline Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Pipeline Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8E0D8] p-6">
            <h2 className="font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">Application Pipeline</h2>
            <div className="space-y-3">
              {[
                { label: "New", count: stats.new, color: "bg-amber-500", max: Math.max(stats.total, 1) },
                { label: "In Review", count: stats.inReview, color: "bg-blue-500", max: Math.max(stats.total, 1) },
                { label: "Approved", count: stats.approved, color: "bg-green-500", max: Math.max(stats.total, 1) },
                { label: "Funded", count: stats.funded, color: "bg-purple-500", max: Math.max(stats.total, 1) },
                { label: "Closed", count: stats.closed, color: "bg-gray-400", max: Math.max(stats.total, 1) },
              ].map(({ label, count: c, color, max }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-20 text-xs text-[#6B6056] text-right">{label}</span>
                  <div className="flex-1 h-4 bg-[#F0EBE3] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all`}
                      style={{ width: `${(c / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-xs font-semibold text-[#1A1A1A]">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
            <h2 className="font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "View All Applications", href: "/admin/applications" },
                { label: "Review New Leads", href: "/admin/leads" },
                { label: "Manage Team", href: "/admin/team" },
                { label: "Publish Blog Post", href: "/admin/blog" },
                { label: "Update Settings", href: "/admin/settings" },
                { label: "View Public Site", href: "/" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center justify-between text-sm text-[#1A1A1A] hover:text-[#6B1C23] py-2 border-b border-[#F0EBE3] last:border-0 transition-colors"
                >
                  {label}
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Recent Applications</h2>
            <Link href="/admin/applications" className="text-sm text-[#6B1C23] hover:underline">View All</Link>
          </div>

          {recentApps.length === 0 ? (
            <p className="text-center text-[#6B6056] py-8 text-sm">No applications yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E8E0D8]">
                    {["Borrower", "Loan Type", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-[#6B6056] pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE3]">
                  {recentApps.map((app) => (
                    <tr key={app.id} className="hover:bg-[#F8F6F3] transition-colors">
                      <td className="py-3 pr-4">
                        <Link href={`/admin/applications/${app.id}`} className="font-medium text-[#1A1A1A] hover:text-[#6B1C23]">
                          {app.firstName} {app.lastName}
                        </Link>
                        <p className="text-xs text-[#6B6056]">{app.email}</p>
                      </td>
                      <td className="py-3 pr-4 text-[#6B6056]">
                        {loanTypeLabels[app.loanType] || app.loanType}
                      </td>
                      <td className="py-3 pr-4 text-[#6B6056]">
                        {app.loanAmount ? `$${Number(app.loanAmount).toLocaleString()}` : "—"}
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status] || "bg-gray-100 text-gray-800"}`}>
                          {app.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 text-[#6B6056]">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
