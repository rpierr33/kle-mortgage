import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const dynamic = "force-dynamic";

export default async function SettingsAdminPage() {
  let settings: typeof siteSettings.$inferSelect[] = [];

  try {
    settings = await db.select().from(siteSettings);
  } catch { /* DB not connected */ }

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Settings</h1>
          <p className="text-sm text-[#6B6056] mt-1">Company and site configuration</p>
        </div>
        <SettingsManager settings={settings} />
      </div>
    </AdminLayout>
  );
}
