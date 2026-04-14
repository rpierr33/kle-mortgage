import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { loanOfficers } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { TeamManager } from "@/components/admin/TeamManager";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  let officers: typeof loanOfficers.$inferSelect[] = [];
  let dbConnected = false;

  try {
    officers = await db.select().from(loanOfficers).orderBy(asc(loanOfficers.displayOrder));
    dbConnected = true;
  } catch { /* DB not connected */ }

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Team Management</h1>
          <p className="text-sm text-[#6B6056] mt-1">Manage loan officers — {officers.length} total</p>
        </div>
        {!dbConnected && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">
              <strong>Database not connected.</strong> Connect your Neon database via <code className="bg-amber-100 px-1 rounded">DATABASE_URL</code> in <code className="bg-amber-100 px-1 rounded">.env.local</code> to manage team members.
            </p>
          </div>
        )}
        <TeamManager officers={officers} />
      </div>
    </AdminLayout>
  );
}
