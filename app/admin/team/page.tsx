"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type SocialLinks = { linkedin?: string; github?: string; instagram?: string; email?: string };
type TeamMember = {
  id: string; slug: string; name: string; role: string; branch: string; year: string;
  bio: string; photo: string; skills: string[]; achievements: string[];
  social: SocialLinks;
  projects: { title: string; description: string; link: string }[];
};

const EMPTY_MEMBER: Omit<TeamMember, "id" | "slug"> = {
  name: "", role: "", branch: "", year: "", bio: "", photo: "",
  skills: [], achievements: [], social: {}, projects: [],
};

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState<Omit<TeamMember, "id" | "slug">>(EMPTY_MEMBER);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [achInput, setAchInput] = useState("");

  const load = async () => {
    const r = await fetch("/api/admin/team");
    setMembers(await r.json());
  };
  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    await fetch("/api/admin/team", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    await load();
    setEditing(null);
    setSaving(false);
    showToast("Member updated");
  };

  const addMember = async () => {
    setSaving(true);
    await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newMember) });
    await load();
    setShowAdd(false);
    setNewMember(EMPTY_MEMBER);
    setSaving(false);
    showToast("Member added");
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
    await load();
    showToast("Deleted");
  };

  const F = (val: string, set: (v: string) => void, label: string, area?: boolean) => (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "5px" }}>{label}</label>
      {area ? (
        <textarea value={val} onChange={(e) => set(e.target.value)} rows={3} style={{ width: "100%", padding: "9px 12px", borderRadius: "7px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "13px", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }} />
      ) : (
        <input value={val} onChange={(e) => set(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "7px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
      )}
    </div>
  );

  const TagEditor = ({ tags, onAdd, onRemove, input, setInput, label }: {
    tags: string[]; onAdd: () => void; onRemove: (i: number) => void;
    input: string; setInput: (v: string) => void; label: string;
  }) => (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "6px" }}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
        {tags.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "6px", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", color: "#60a5fa", fontSize: "11px" }}>
            {t}
            <button onClick={() => onRemove(i)} style={{ background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: "12px", lineHeight: 1, padding: 0 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(); } }} placeholder="Type and press Enter" style={{ flex: 1, padding: "8px 12px", borderRadius: "7px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "12px", outline: "none" }} />
        <button onClick={onAdd} style={{ padding: "8px 14px", borderRadius: "7px", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", color: "#60a5fa", fontSize: "12px", cursor: "pointer" }}>Add</button>
      </div>
    </div>
  );

  const SocialEditor = ({ social, set }: { social: SocialLinks; set: (s: SocialLinks) => void }) => (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "8px" }}>Social Links</label>
      {(["linkedin", "github", "instagram", "email"] as const).map((k) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "11px", color: "#899393", width: "64px", flexShrink: 0, textTransform: "capitalize" }}>{k}</span>
          <input value={social[k] ?? ""} onChange={(e) => set({ ...social, [k]: e.target.value || undefined })} placeholder={`${k} URL`} style={{ flex: 1, padding: "7px 10px", borderRadius: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F5F5", fontSize: "12px", outline: "none" }} />
        </div>
      ))}
    </div>
  );

  const MemberModal = ({ isEdit }: { isEdit: boolean }) => {
    const member = isEdit ? editing! : newMember;
    const setM = isEdit
      ? (m: Partial<TeamMember>) => setEditing({ ...editing!, ...m })
      : (m: Partial<typeof newMember>) => setNewMember({ ...newMember, ...m });

    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(5,8,8,0.94)", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ background: "#0e1212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "540px", maxHeight: "90vh", overflowY: "auto" }}>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 20px" }}>{isEdit ? "Edit" : "Add"} Team Member</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            {F(member.name, (v) => setM({ name: v }), "Full Name")}
            {F(member.role, (v) => setM({ role: v }), "Role")}
            {F(member.branch, (v) => setM({ branch: v }), "Branch")}
            {F(member.year, (v) => setM({ year: v }), "Year")}
          </div>
          {F(member.bio, (v) => setM({ bio: v }), "Bio", true)}
          {F(member.photo, (v) => setM({ photo: v }), "Photo Path (e.g. /images/team/name.jpg)")}
          {member.photo && (
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundImage: `url(${member.photo})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "rgba(255,255,255,0.05)", marginBottom: "12px" }} />
          )}
          <TagEditor label="Skills" tags={member.skills} input={skillInput} setInput={setSkillInput}
            onAdd={() => { if (!skillInput.trim()) return; setM({ skills: [...(member.skills ?? []), skillInput.trim()] }); setSkillInput(""); }}
            onRemove={(i) => setM({ skills: member.skills.filter((_, idx) => idx !== i) })} />
          <TagEditor label="Achievements" tags={member.achievements} input={achInput} setInput={setAchInput}
            onAdd={() => { if (!achInput.trim()) return; setM({ achievements: [...(member.achievements ?? []), achInput.trim()] }); setAchInput(""); }}
            onRemove={(i) => setM({ achievements: member.achievements.filter((_, idx) => idx !== i) })} />
          <SocialEditor social={member.social} set={(s) => setM({ social: s })} />
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <button onClick={isEdit ? saveEdit : addMember} disabled={saving} style={{ padding: "10px 24px", borderRadius: "8px", background: "#60a5fa", color: "#0c0c0c", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Member"}
            </button>
            <button onClick={() => { if (isEdit) setEditing(null); else setShowAdd(false); setSkillInput(""); setAchInput(""); }}
              style={{ padding: "10px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#899393", fontSize: "13px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar active="/admin/team" />
      {toast && (<div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#10b981", color: "#fff", padding: "12px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, zIndex: 9999 }}>{toast}</div>)}
      <main style={{ flex: 1, padding: "40px", overflowX: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "26px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 6px" }}>Team Members</h1>
            <p style={{ fontSize: "13px", color: "#899393", margin: 0 }}>Manage all {members.length} team member profiles.</p>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ padding: "10px 20px", borderRadius: "9px", background: "#60a5fa", color: "#0c0c0c", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer" }}>+ Add Member</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {members.map((m) => (
            <div key={m.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0, backgroundImage: `url(${m.photo})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#F5F5F5" }}>{m.name}</div>
                <div style={{ fontSize: "12px", color: "#899393" }}>{m.role} · {m.branch} · {m.year}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                  {m.skills.slice(0, 3).map((s) => (
                    <span key={s} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.15)", color: "#60a5fa" }}>{s}</span>
                  ))}
                  {m.skills.length > 3 && <span style={{ fontSize: "10px", color: "#899393" }}>+{m.skills.length - 3} more</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <button onClick={() => { setEditing({ ...m }); setSkillInput(""); setAchInput(""); }} style={{ padding: "7px 14px", borderRadius: "7px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F5F5", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                <button onClick={() => deleteMember(m.id)} style={{ padding: "7px 14px", borderRadius: "7px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {editing && <MemberModal isEdit={true} />}
        {showAdd && <MemberModal isEdit={false} />}
      </main>
    </div>
  );
}
