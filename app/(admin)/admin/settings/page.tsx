import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { SettingsManager } from "@/components/admin/SettingsManager";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsAdminPage() {
  let settings: typeof siteSettings.$inferSelect[] = [];
  let dbConnected = false;

  try {
    settings = await db.select().from(siteSettings);
    dbConnected = true;
  } catch { /* DB not connected */ }

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Settings</h1>
          <p className="text-sm text-[#6B6056] mt-1">Company and site configuration</p>
        </div>
        {!dbConnected && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">
              <strong>Database not connected.</strong> Connect your Neon database via <code className="bg-amber-100 px-1 rounded">DATABASE_URL</code> in <code className="bg-amber-100 px-1 rounded">.env.local</code> to configure site settings.
            </p>
          </div>
        )}
        <SettingsManager settings={settings} />
      </div>
    </AdminLayout>
  );
}
