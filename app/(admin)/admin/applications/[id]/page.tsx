import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { loanApplications, loanOfficers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicationDetail } from "@/components/admin/ApplicationDetail";

type Props = { params: Promise<{ id: string }> };

export default async function ApplicationDetailPage({ params }: Props) {
  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) notFound();

  let app: typeof loanApplications.$inferSelect | null = null;
  let officers: typeof loanOfficers.$inferSelect[] = [];

  try {
    const [result] = await db.select().from(loanApplications).where(eq(loanApplications.id, numId)).limit(1);
    app = result ?? null;
    officers = await db.select().from(loanOfficers).where(eq(loanOfficers.isActive, true));
  } catch { /* DB not connected */ }

  if (!app) notFound();

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-6">
          <Link href="/admin/applications" className="flex items-center gap-2 text-sm text-[#6B6056] hover:text-[#6B1C23] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Applications
          </Link>
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">
            Application #{app.id} — {app.firstName} {app.lastName}
          </h1>
        </div>
        <ApplicationDetail app={app} officers={officers} />
      </div>
    </AdminLayout>
  );
}
