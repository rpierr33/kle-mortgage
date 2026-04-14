import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { loanOfficers } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { TeamManager } from "@/components/admin/TeamManager";

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  let officers: typeof loanOfficers.$inferSelect[] = [];

  try {
    officers = await db.select().from(loanOfficers).orderBy(asc(loanOfficers.displayOrder));
  } catch { /* DB not connected */ }

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Team Management</h1>
          <p className="text-sm text-[#6B6056] mt-1">Manage loan officers — {officers.length} total</p>
        </div>
        <TeamManager officers={officers} />
      </div>
    </AdminLayout>
  );
}
