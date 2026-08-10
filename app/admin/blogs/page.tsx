"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { BlogPost, blogs as fallbackBlogs } from "@/data/blogs";

const CATEGORIES = [
  "Artificial Intelligence", "Web Development", "Quantum Tech",
  "Cybersecurity", "Backend & DevOps", "Mobile Dev", "Cloud Infrastructure",
];

const EMPTY_BLOG: Omit<BlogPost, "id"> = {
  slug: "", title: "", category: "Artificial Intelligence",
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
  readTime: "5 min read", author: "Nexus Tech Team", authorRole: "Technical Lead",
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  excerpt: "", content: "",
};

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>(EMPTY_BLOG);

  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : fallbackBlogs);
    } catch {
      setBlogs(fallbackBlogs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBlogs(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleOpenAdd = () => { setEditingBlog(null); setFormData(EMPTY_BLOG); setShowModal(true); };

  const handleOpenEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({ slug: blog.slug, title: blog.title, category: blog.category, date: blog.date, readTime: blog.readTime, author: blog.author, authorRole: blog.authorRole, image: blog.image, excerpt: blog.excerpt, content: blog.content });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingBlog) {
        const res = await fetch(`/api/admin/blogs/${editingBlog.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        if (res.ok) { showToast("Blog post updated!"); setShowModal(false); loadBlogs(); }
      } else {
        const res = await fetch("/api/admin/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        if (res.ok) { showToast("New blog post published!"); setShowModal(false); loadBlogs(); }
      }
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) { showToast("Blog post deleted!"); setBlogs((prev) => prev.filter((b) => String(b.id) !== String(id))); loadBlogs(); }
      else showToast(`Failed to delete: ${data.error || "Unknown error"}`);
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    }
  };

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050808" }}>
      <AdminSidebar active="/admin/blogs" />
      <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto" }}>
        {toast && (<div style={{ position: "fixed", top: "20px", right: "20px", background: "rgba(96,165,250,0.9)", color: "#000", padding: "10px 18px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", zIndex: 999 }}>{toast}</div>)}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F5F5F5", margin: 0 }}>Blog & Tech News</h1>
            <p style={{ fontSize: "13px", color: "#899393", marginTop: "4px" }}>Publish, edit, and update tech news articles displayed on the Nexus website.</p>
          </div>
          <button onClick={handleOpenAdd} style={{ padding: "10px 20px", borderRadius: "8px", background: "#60a5fa", color: "#050808", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>+ Add New Blog</button>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <input type="text" placeholder="Search blogs by title, category, or author..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", maxWidth: "400px", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px", outline: "none" }} />
        </div>

        {loading ? (
          <div style={{ color: "#899393", padding: "40px 0" }}>Loading blogs...</div>
        ) : filtered.length === 0 ? (
          <div style={{ color: "#899393", padding: "40px 0" }}>No blogs found.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {filtered.map((blog) => (
              <div key={blog.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", padding: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", background: "rgba(96,165,250,0.12)", color: "#60a5fa" }}>{blog.category}</span>
                  <span style={{ fontSize: "11px", color: "#899393" }}>{blog.date}</span>
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px", lineHeight: 1.3 }}>{blog.title}</h3>
                <p style={{ fontSize: "12.5px", color: "#899393", lineHeight: 1.5, marginBottom: "16px", flex: 1 }}>{blog.excerpt}</p>
                <div style={{ fontSize: "11.5px", color: "#60a5fa", marginBottom: "16px" }}>
                  {blog.author} ({blog.authorRole}) · {blog.readTime}
                </div>
                <div style={{ display: "flex", gap: "10px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <button onClick={() => handleOpenEdit(blog)} style={{ flex: 1, padding: "7px 12px", borderRadius: "6px", border: "1px solid rgba(96,165,250,0.3)", background: "rgba(96,165,250,0.08)", color: "#60a5fa", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Edit</button>
                  <button onClick={() => handleDelete(blog.id)} style={{ padding: "7px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Delete</button>
                  <Link href={`/blog/${blog.slug}`} target="_blank" style={{ padding: "7px 12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#899393", fontSize: "12px", textDecoration: "none" }}>View</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div style={{ background: "#0c0e12", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: 0 }}>{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</h2>
                <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", color: "#899393", fontSize: "18px", cursor: "pointer" }}>×</button>
              </div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#899393", marginBottom: "6px", textTransform: "uppercase" }}>Blog Title</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#899393", marginBottom: "6px", textTransform: "uppercase" }}>Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "#050808", color: "#fff", fontSize: "13px" }}>
                      {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#899393", marginBottom: "6px", textTransform: "uppercase" }}>Read Time</label>
                    <input type="text" value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} placeholder="e.g. 5 min read" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px" }} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#899393", marginBottom: "6px", textTransform: "uppercase" }}>Author Name</label>
                    <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#899393", marginBottom: "6px", textTransform: "uppercase" }}>Author Role</label>
                    <input type="text" value={formData.authorRole} onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#899393", marginBottom: "6px", textTransform: "uppercase" }}>Cover Image URL</label>
                  <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#899393", marginBottom: "6px", textTransform: "uppercase" }}>Short Excerpt</label>
                  <textarea rows={3} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px", resize: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#899393", marginBottom: "6px", textTransform: "uppercase" }}>Full Article Content</label>
                  <textarea rows={8} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px", resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#899393", fontSize: "13px", cursor: "pointer" }}>Cancel</button>
                  <button type="submit" disabled={saving} style={{ padding: "10px 22px", borderRadius: "8px", border: "none", background: "#60a5fa", color: "#050808", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                    {saving ? "Saving..." : editingBlog ? "Update Blog Post" : "Publish Blog Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
