import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { blogPosts, loanOfficers } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { BlogManager } from "@/components/admin/BlogManager";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  let posts: typeof blogPosts.$inferSelect[] = [];
  let officers: typeof loanOfficers.$inferSelect[] = [];
  let dbConnected = false;

  try {
    [posts, officers] = await Promise.all([
      db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(100),
      db.select().from(loanOfficers),
    ]);
    dbConnected = true;
  } catch { /* DB not connected */ }

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Blog Management</h1>
          <p className="text-sm text-[#6B6056] mt-1">Manage blog posts and resources — {posts.length} total</p>
        </div>
        {!dbConnected && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">
              <strong>Database not connected.</strong> Connect your Neon database via <code className="bg-amber-100 px-1 rounded">DATABASE_URL</code> in <code className="bg-amber-100 px-1 rounded">.env.local</code> to manage blog posts.
            </p>
          </div>
        )}
        <BlogManager posts={posts} officers={officers} />
      </div>
    </AdminLayout>
  );
}
