"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X } from "lucide-react";
import type { blogPosts, loanOfficers } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils/format";

type Post = typeof blogPosts.$inferSelect;
type Officer = typeof loanOfficers.$inferSelect;

const CATEGORY_OPTIONS = [
  { value: "market_update", label: "Market Update" },
  { value: "buying_tips", label: "Buying Tips" },
  { value: "mortgage_tips", label: "Mortgage Tips" },
  { value: "first_time_buyer", label: "First-Time Buyer" },
  { value: "refinancing", label: "Refinancing" },
  { value: "company_news", label: "Company News" },
] as const;

type BlogCategory = Post["category"];

interface FormState {
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  authorId: string;
  readTimeMinutes: number;
  isPublished: boolean;
}

interface Props {
  posts: Post[];
  officers: Officer[];
}

export function BlogManager({ posts: initialPosts, officers }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormState>({
    title: "", excerpt: "", content: "", category: "mortgage_tips",
    authorId: "", readTimeMinutes: 5, isPublished: false,
  });

  const resetForm = () => setForm({
    title: "", excerpt: "", content: "", category: "mortgage_tips",
    authorId: "", readTimeMinutes: 5, isPublished: false,
  });

  const openAdd = () => { resetForm(); setEditing(null); setShowForm(true); };

  const openEdit = (p: Post) => {
    setForm({
      title: p.title, excerpt: p.excerpt, content: p.content,
      category: p.category, authorId: p.authorId ? String(p.authorId) : "",
      readTimeMinutes: p.readTimeMinutes, isPublished: p.isPublished,
    });
    setEditing(p);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.excerpt || !form.content) {
      toast.error("Title, excerpt, and content are required");
      return;
    }
    setSaving(true);

    const payload = {
      ...form,
      authorId: form.authorId ? parseInt(form.authorId) : null,
    };

    try {
      if (editing) {
        const res = await fetch(`/api/blog/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => p.id === editing.id ? updated : p));
      } else {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        const created = await res.json();
        setPosts((prev) => [created, ...prev]);
      }
      toast.success(editing ? "Post updated" : "Post created");
      setShowForm(false);
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (id: number, isPublished: boolean) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => p.id === id ? updated : p));
      toast.success(isPublished ? "Post published" : "Post unpublished");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const categoryLabel = (cat: string) =>
    CATEGORY_OPTIONS.find((o) => o.value === cat)?.label ?? cat;

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-4 py-2.5 rounded-md text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E0D8] overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-[#6B6056]">No blog posts yet. Create your first post.</div>
        ) : (
          <div className="divide-y divide-[#F0EBE3]">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F8F6F3] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm text-[#1A1A1A] truncate">{post.title}</p>
                    {post.isPublished ? (
                      <span className="flex-shrink-0 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span>
                    ) : (
                      <span className="flex-shrink-0 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Draft</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#6B6056]">
                    <span>{categoryLabel(post.category)}</span>
                    <span>{post.readTimeMinutes} min</span>
                    {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => togglePublish(post.id, !post.isPublished)}
                    className="p-1.5 hover:bg-[#F0EBE3] rounded-md transition-colors"
                    title={post.isPublished ? "Unpublish" : "Publish"}
                  >
                    {post.isPublished
                      ? <EyeOff className="w-4 h-4 text-[#6B6056]" />
                      : <Eye className="w-4 h-4 text-[#6B6056]" />
                    }
                  </button>
                  <button onClick={() => openEdit(post)} className="p-1.5 hover:bg-[#F0EBE3] rounded-md transition-colors">
                    <Pencil className="w-3.5 h-3.5 text-[#6B6056]" />
                  </button>
                  <button onClick={() => deletePost(post.id)} className="p-1.5 hover:bg-red-50 rounded-md transition-colors">
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-[#E8E0D8] w-full max-w-2xl p-6 my-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">
                {editing ? "Edit Post" : "New Post"}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-[#F0EBE3] rounded-md">
                <X className="w-4 h-4 text-[#6B6056]" />
              </button>
            </div>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Excerpt *</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23] resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Content *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={10}
                  className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23] resize-none font-mono"
                  placeholder="Write your article content here..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof form.category }))}
                    className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23] bg-white"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Author</label>
                  <select
                    value={form.authorId}
                    onChange={(e) => setForm((f) => ({ ...f, authorId: e.target.value }))}
                    className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23] bg-white"
                  >
                    <option value="">Select author...</option>
                    {officers.map((o) => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#1A1A1A] block mb-1">Read Time (minutes)</label>
                  <input
                    type="number"
                    value={form.readTimeMinutes}
                    onChange={(e) => setForm((f) => ({ ...f, readTimeMinutes: Number(e.target.value) }))}
                    className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isPublished}
                      onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                      className="accent-[#6B1C23]"
                    />
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-[#E8E0D8]">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#E8E0D8] text-[#1A1A1A] rounded-md text-sm font-medium hover:border-[#6B1C23] transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] disabled:opacity-60 text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {editing ? "Save Changes" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
