import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { blogPosts, loanOfficers } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { BlogManager } from "@/components/admin/BlogManager";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  let posts: typeof blogPosts.$inferSelect[] = [];
  let officers: typeof loanOfficers.$inferSelect[] = [];

  try {
    [posts, officers] = await Promise.all([
      db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(100),
      db.select().from(loanOfficers),
    ]);
  } catch { /* DB not connected */ }

  return (
    <AdminLayout>
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">Blog Management</h1>
          <p className="text-sm text-[#6B6056] mt-1">Manage blog posts and resources — {posts.length} total</p>
        </div>
        <BlogManager posts={posts} officers={officers} />
      </div>
    </AdminLayout>
  );
}
