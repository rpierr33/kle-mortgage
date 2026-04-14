import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { LeadsManager } from "@/components/admin/LeadsManager";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  let allLeads: typeof leads.$inferSelect[] = [];
  let dbConnected = false;

  try {
    allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(200);
    dbConnected = true;
  } catch { /* DB not connected */ }

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Leads</h1>
          <p className="text-sm text-[#6B6056] mt-1">Contact form submissions and inquiries — {allLeads.length} total</p>
        </div>
        {!dbConnected && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">
              <strong>Database not connected.</strong> Connect your Neon database via <code className="bg-amber-100 px-1 rounded">DATABASE_URL</code> in <code className="bg-amber-100 px-1 rounded">.env.local</code> to see real lead data.
            </p>
          </div>
        )}
        <LeadsManager leads={allLeads} />
      </div>
    </AdminLayout>
  );
}
