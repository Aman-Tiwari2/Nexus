"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type GalleryItem = { id: string; title: string; category: string; image: string; sub: string; caption: string; number: string; date: string };

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Omit<GalleryItem, "id" | "number">>({ title: "", category: "", image: "", sub: "", caption: "", date: "" });

  const load = async () => {
    const r = await fetch("/api/admin/gallery");
    setItems(await r.json());
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    await fetch("/api/admin/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    await load();
    setEditing(null);
    setSaving(false);
    showToast("Gallery item updated");
  };

  const addItem = async () => {
    setSaving(true);
    await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newItem) });
    await load();
    setShowAdd(false);
    setNewItem({ title: "", category: "", image: "", sub: "", caption: "", date: "" });
    setSaving(false);
    showToast("Gallery item added");
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Remove this gallery item?")) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    await load();
    showToast("Removed");
  };

  const F = (val: string, set: (v: string) => void, label: string) => (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "5px" }}>{label}</label>
      <input value={val} onChange={(e) => set(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "7px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar active="/admin/gallery" />
      {toast && (<div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#10b981", color: "#fff", padding: "12px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, zIndex: 9999 }}>{toast}</div>)}
      <main style={{ flex: 1, padding: "40px", overflowX: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "26px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 6px" }}>Gallery</h1>
            <p style={{ fontSize: "13px", color: "#899393", margin: 0 }}>Manage the editorial magazine moments shown in the gallery section.</p>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ padding: "10px 20px", borderRadius: "9px", background: "#60a5fa", color: "#0c0c0c", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>+ Add Moment</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {items.map((item) => (
            <div key={item.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", overflow: "hidden" }}>
              <div style={{ aspectRatio: "16/10", backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "rgba(255,255,255,0.05)", position: "relative" }}>
                <div style={{ position: "absolute", top: "10px", left: "10px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", background: "rgba(5,8,8,0.8)", color: "#00E5CC", padding: "3px 8px", borderRadius: "4px" }}>{item.number}</div>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "4px" }}>{item.sub}</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#F5F5F5", marginBottom: "4px" }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: "#899393", fontStyle: "italic", marginBottom: "12px" }}>"{item.caption}"</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setEditing({ ...item })} style={{ flex: 1, padding: "7px", borderRadius: "7px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => deleteItem(item.id)} style={{ padding: "7px 12px", borderRadius: "7px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(5,8,8,0.92)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div style={{ background: "#0e1212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 20px" }}>Edit Gallery Moment</h3>
              {F(editing.title, (v) => setEditing({ ...editing, title: v }), "Title")}
              {F(editing.category, (v) => setEditing({ ...editing, category: v }), "Category")}
              {F(editing.sub, (v) => setEditing({ ...editing, sub: v }), "Sub Label (e.g. 01 / COMMUNITY)")}
              {F(editing.caption, (v) => setEditing({ ...editing, caption: v }), "Caption / Quote")}
              {F(editing.date, (v) => setEditing({ ...editing, date: v }), "Date (e.g. Aug 2025)")}
              {F(editing.image, (v) => setEditing({ ...editing, image: v }), "Image Path (e.g. /images/gallery/moment1.jpg)")}
              {editing.image && (
                <div style={{ marginBottom: "14px", borderRadius: "8px", overflow: "hidden", aspectRatio: "16/10", backgroundImage: `url(${editing.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "rgba(255,255,255,0.05)" }} />
              )}
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={saveEdit} disabled={saving} style={{ padding: "10px 24px", borderRadius: "8px", background: "#60a5fa", color: "#0c0c0c", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>{saving ? "Saving…" : "Save"}</button>
                <button onClick={() => setEditing(null)} style={{ padding: "10px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#899393", fontSize: "13px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showAdd && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(5,8,8,0.92)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div style={{ background: "#0e1212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 20px" }}>Add Gallery Moment</h3>
              {F(newItem.title, (v) => setNewItem({ ...newItem, title: v }), "Title")}
              {F(newItem.category, (v) => setNewItem({ ...newItem, category: v }), "Category")}
              {F(newItem.sub, (v) => setNewItem({ ...newItem, sub: v }), "Sub Label")}
              {F(newItem.caption, (v) => setNewItem({ ...newItem, caption: v }), "Caption")}
              {F(newItem.date, (v) => setNewItem({ ...newItem, date: v }), "Date")}
              {F(newItem.image, (v) => setNewItem({ ...newItem, image: v }), "Image Path")}
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={addItem} disabled={saving} style={{ padding: "10px 24px", borderRadius: "8px", background: "#60a5fa", color: "#0c0c0c", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>{saving ? "Adding…" : "Add Moment"}</button>
                <button onClick={() => setShowAdd(false)} style={{ padding: "10px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#899393", fontSize: "13px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
