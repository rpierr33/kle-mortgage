import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { LeadsManager } from "@/components/admin/LeadsManager";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  let allLeads: typeof leads.$inferSelect[] = [];

  try {
    allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(200);
  } catch { /* DB not connected */ }

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Leads</h1>
          <p className="text-sm text-[#6B6056] mt-1">Contact form submissions and inquiries — {allLeads.length} total</p>
        </div>
        <LeadsManager leads={allLeads} />
      </div>
    </AdminLayout>
  );
}
