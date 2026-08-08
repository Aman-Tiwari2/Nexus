"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⬡" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/gallery", label: "Gallery", icon: "🖼" },
  { href: "/admin/team", label: "Team", icon: "👥" },
];

function Sidebar({ active }: { active: string }) {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  };
  return (
    <aside style={{ width: "220px", minHeight: "100vh", background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0 }}>
      <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>⬡</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#F5F5F5", lineHeight: 1.2 }}>NEXUS</div>
            <div style={{ fontSize: "10px", color: "#899393", letterSpacing: "0.1em" }}>ADMIN PANEL</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV.map((item) => {
          const isActive = active === item.href;
          return (
            <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", marginBottom: "2px", background: isActive ? "rgba(249,115,22,0.1)" : "transparent", color: isActive ? "#f97316" : "#899393", fontSize: "13px", fontWeight: isActive ? 600 : 400, textDecoration: "none", borderLeft: isActive ? "2px solid #f97316" : "2px solid transparent", transition: "all 0.15s" }}>
              <span style={{ fontSize: "15px" }}>{item.icon}</span>{item.label}
            </Link>
          );
        })}
      </nav>
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "8px", color: "#899393", fontSize: "12px", textDecoration: "none", marginBottom: "4px" }}>↗ View Live Site</Link>
        <button onClick={logout} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "none", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontSize: "12px", cursor: "pointer", textAlign: "left" }}>⎋ Sign Out</button>
      </div>
    </aside>
  );
}

const ICON_OPTIONS = ["Zap", "Trophy", "Users", "Star", "Code", "BookOpen", "Award"];
const TAG_COLORS = ["#00E5CC", "#00A8FF", "#8B5CF6", "#f97316", "#10b981", "#ec4899"];

type PastEvent = { id: string; title: string; date: string; type: string; description: string; stat: string; tagColor: string; iconType: string };
type UpcomingEvent = { title: string; displayDate: string; date: string; time: string; location: string; prize: string; registrationLink: string };
type EventData = { upcoming: UpcomingEvent; past: PastEvent[] };

const EMPTY_PAST: Omit<PastEvent, "id"> = { title: "", date: "", type: "", description: "", stat: "", tagColor: "#00E5CC", iconType: "Zap" };

export default function EventsAdminPage() {
  const [data, setData] = useState<EventData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [editUpcoming, setEditUpcoming] = useState(false);
  const [upcomingDraft, setUpcomingDraft] = useState<UpcomingEvent | null>(null);
  const [showAddPast, setShowAddPast] = useState(false);
  const [newPast, setNewPast] = useState<Omit<PastEvent, "id">>(EMPTY_PAST);
  const [editingPast, setEditingPast] = useState<PastEvent | null>(null);

  const load = async () => {
    const r = await fetch("/api/admin/events");
    const d = await r.json();
    setData(d);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const saveUpcoming = async () => {
    if (!upcomingDraft) return;
    setSaving(true);
    await fetch("/api/admin/events", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "upcoming", data: upcomingDraft }) });
    await load();
    setEditUpcoming(false);
    setSaving(false);
    showToast("Upcoming event updated ✓");
  };

  const savePastEdit = async () => {
    if (!editingPast) return;
    setSaving(true);
    await fetch("/api/admin/events", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "past", data: editingPast }) });
    await load();
    setEditingPast(null);
    setSaving(false);
    showToast("Event updated ✓");
  };

  const addPast = async () => {
    setSaving(true);
    await fetch("/api/admin/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPast) });
    await load();
    setShowAddPast(false);
    setNewPast(EMPTY_PAST);
    setSaving(false);
    showToast("Event added ✓");
  };

  const deletePast = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    await load();
    showToast("Event deleted");
  };

  const inp = (val: string, set: (v: string) => void, label: string, area?: boolean) => (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "6px" }}>{label}</label>
      {area ? (
        <textarea value={val} onChange={(e) => set(e.target.value)} rows={3} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "13px", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }} />
      ) : (
        <input value={val} onChange={(e) => set(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
      )}
    </div>
  );

  if (!data) return <div style={{ display: "flex", minHeight: "100vh" }}><Sidebar active="/admin/events" /><main style={{ flex: 1, padding: "40px" }}><p style={{ color: "#899393" }}>Loading…</p></main></div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active="/admin/events" />

      {toast && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#10b981", color: "#fff", padding: "12px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, zIndex: 9999, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>{toast}</div>
      )}

      <main style={{ flex: 1, padding: "40px", overflowX: "auto" }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "26px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 6px" }}>Events</h1>
        <p style={{ fontSize: "13px", color: "#899393", margin: "0 0 32px" }}>Manage upcoming and past events shown on the main site.</p>

        {/* Upcoming Event */}
        <div style={{ background: "rgba(0,229,204,0.04)", border: "1px solid rgba(0,229,204,0.15)", borderRadius: "14px", padding: "24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "#00E5CC", textTransform: "uppercase" }}>Upcoming Event</span>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#F5F5F5", margin: "4px 0 0" }}>{data.upcoming.title}</h2>
            </div>
            <button onClick={() => { setEditUpcoming(true); setUpcomingDraft({ ...data.upcoming }); }} style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(0,229,204,0.1)", border: "1px solid rgba(0,229,204,0.25)", color: "#00E5CC", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Edit</button>
          </div>
          {!editUpcoming ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[["Date", data.upcoming.displayDate], ["Time", data.upcoming.time], ["Location", data.upcoming.location], ["Prize", data.upcoming.prize]].map(([k, v]) => (
                <div key={k} style={{ fontSize: "12px", color: "#899393" }}><strong style={{ color: "#F5F5F5" }}>{k}:</strong> {v}</div>
              ))}
            </div>
          ) : (
            <div>
              {inp(upcomingDraft!.title, (v) => setUpcomingDraft({ ...upcomingDraft!, title: v }), "Title")}
              {inp(upcomingDraft!.displayDate, (v) => setUpcomingDraft({ ...upcomingDraft!, displayDate: v }), "Display Date (e.g. Mar 15, 2026)")}
              {inp(upcomingDraft!.date, (v) => setUpcomingDraft({ ...upcomingDraft!, date: v }), "ISO Date (e.g. 2026-03-15T09:00:00)")}
              {inp(upcomingDraft!.time, (v) => setUpcomingDraft({ ...upcomingDraft!, time: v }), "Time Label")}
              {inp(upcomingDraft!.location, (v) => setUpcomingDraft({ ...upcomingDraft!, location: v }), "Location")}
              {inp(upcomingDraft!.prize, (v) => setUpcomingDraft({ ...upcomingDraft!, prize: v }), "Prize")}
              {inp(upcomingDraft!.registrationLink, (v) => setUpcomingDraft({ ...upcomingDraft!, registrationLink: v }), "Registration Link")}
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={saveUpcoming} disabled={saving} style={{ padding: "9px 20px", borderRadius: "8px", background: "#f97316", color: "#0c0c0c", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>{saving ? "Saving…" : "Save Changes"}</button>
                <button onClick={() => setEditUpcoming(false)} style={{ padding: "9px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#899393", fontSize: "13px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Past Events */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#F5F5F5", margin: 0 }}>Past Events ({data.past.length})</h2>
          <button onClick={() => setShowAddPast(true)} style={{ padding: "8px 18px", borderRadius: "8px", background: "#f97316", color: "#0c0c0c", fontWeight: 700, fontSize: "12px", border: "none", cursor: "pointer" }}>+ Add Event</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
          {data.past.map((ev) => (
            <div key={ev.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: ev.tagColor, background: `${ev.tagColor}15`, padding: "3px 8px", borderRadius: "4px", marginBottom: "6px", display: "inline-block" }}>{ev.type}</span>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#F5F5F5" }}>{ev.title}</div>
                <div style={{ fontSize: "12px", color: "#899393" }}>{ev.date} · {ev.stat}</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setEditingPast({ ...ev })} style={{ padding: "7px 14px", borderRadius: "7px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                <button onClick={() => deletePast(ev.id)} style={{ padding: "7px 14px", borderRadius: "7px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Past Event Modal */}
        {showAddPast && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(5,8,8,0.92)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div style={{ background: "#0e1212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 20px" }}>Add Past Event</h3>
              {inp(newPast.title, (v) => setNewPast({ ...newPast, title: v }), "Title")}
              {inp(newPast.date, (v) => setNewPast({ ...newPast, date: v }), "Date (e.g. Sept 2025)")}
              {inp(newPast.type, (v) => setNewPast({ ...newPast, type: v }), "Type (e.g. Coding Challenge)")}
              {inp(newPast.stat, (v) => setNewPast({ ...newPast, stat: v }), "Stat (e.g. 800+ Competitors)")}
              {inp(newPast.description, (v) => setNewPast({ ...newPast, description: v }), "Description", true)}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "8px" }}>Tag Color</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {TAG_COLORS.map((c) => (
                    <button key={c} onClick={() => setNewPast({ ...newPast, tagColor: c })} style={{ width: "28px", height: "28px", borderRadius: "50%", background: c, border: newPast.tagColor === c ? "2px solid #fff" : "2px solid transparent", cursor: "pointer" }} />
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "8px" }}>Icon</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {ICON_OPTIONS.map((ic) => (
                    <button key={ic} onClick={() => setNewPast({ ...newPast, iconType: ic })} style={{ padding: "5px 12px", borderRadius: "6px", background: newPast.iconType === ic ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)", border: newPast.iconType === ic ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.1)", color: newPast.iconType === ic ? "#f97316" : "#899393", fontSize: "11px", cursor: "pointer" }}>{ic}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={addPast} disabled={saving} style={{ padding: "10px 24px", borderRadius: "8px", background: "#f97316", color: "#0c0c0c", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>{saving ? "Adding…" : "Add Event"}</button>
                <button onClick={() => { setShowAddPast(false); setNewPast(EMPTY_PAST); }} style={{ padding: "10px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#899393", fontSize: "13px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Past Event Modal */}
        {editingPast && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(5,8,8,0.92)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div style={{ background: "#0e1212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 20px" }}>Edit Event</h3>
              {inp(editingPast.title, (v) => setEditingPast({ ...editingPast, title: v }), "Title")}
              {inp(editingPast.date, (v) => setEditingPast({ ...editingPast, date: v }), "Date")}
              {inp(editingPast.type, (v) => setEditingPast({ ...editingPast, type: v }), "Type")}
              {inp(editingPast.stat, (v) => setEditingPast({ ...editingPast, stat: v }), "Stat")}
              {inp(editingPast.description, (v) => setEditingPast({ ...editingPast, description: v }), "Description", true)}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "8px" }}>Tag Color</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {TAG_COLORS.map((c) => (
                    <button key={c} onClick={() => setEditingPast({ ...editingPast, tagColor: c })} style={{ width: "28px", height: "28px", borderRadius: "50%", background: c, border: editingPast.tagColor === c ? "2px solid #fff" : "2px solid transparent", cursor: "pointer" }} />
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={savePastEdit} disabled={saving} style={{ padding: "10px 24px", borderRadius: "8px", background: "#f97316", color: "#0c0c0c", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>{saving ? "Saving…" : "Save Changes"}</button>
                <button onClick={() => setEditingPast(null)} style={{ padding: "10px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#899393", fontSize: "13px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
