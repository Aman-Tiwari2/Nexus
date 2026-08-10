import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, ExternalLink, Instagram, Mail, ArrowLeft, Trophy, Folder, Sparkles, GraduationCap, Briefcase } from "lucide-react";
import { teamMembers } from "@/data/team";
import type { TeamMember } from "@/data/team";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

function getTeamMembers(): TeamMember[] {
  try {
    const filePath = path.join(process.cwd(), "data", "store", "team.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.error(e);
  }
  return teamMembers;
}

export async function generateStaticParams() {
  const members = getTeamMembers();
  return members.map((m: TeamMember) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const members = getTeamMembers();
  const member = members.find((m: TeamMember) => m.slug === slug);
  if (!member) return { title: "Member Not Found" };
  return {
    title: `${member.name} — Nexus Community`,
    description: member.bio,
  };
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default async function MemberProfile({ params }: Props) {
  const { slug } = await params;
  const members = getTeamMembers();
  const member = members.find((m: TeamMember) => m.slug === slug);
  if (!member) notFound();

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const accentColors = ["#38bdf8", "#a78bfa", "#2dd4bf", "#60a5fa", "#818cf8", "#ec4899"];

  return (
    <div className="profile-page">
      {/* ── Top navigation bar ── */}
      <div className="profile-topbar">
        <div className="section-container" style={{ height: "48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/#team" className="profile-back-link">
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            Back to Team
          </Link>
          <img src="/images/nexus_logo.png" alt="Nexus" style={{ height: "26px", objectFit: "contain" }} />
        </div>
      </div>

      {/* ── Single-screen content ── */}
      <div className="section-container profile-main">
        {/* ── Hero row: Avatar + Info + Social ── */}
        <div className="profile-hero-row">
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div className="profile-avatar-glow" />
            <div className="profile-avatar">
              {member.photo ? (
                <img src={member.photo} alt={member.name} style={{ width: "130%", height: "130%", objectFit: "cover", objectPosition: "center top" }} />
              ) : (
                <span style={{ fontSize: "28px", fontWeight: 800, color: "#38bdf8" }}>{initials}</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: "1 1 200px", minWidth: 0 }}>
            <div className="profile-badge">
              <GraduationCap style={{ width: "11px", height: "11px" }} />
              {member.branch} · {member.year}
            </div>
            <h1 className="profile-name">{member.name}</h1>
            <div className="profile-role">
              <Briefcase style={{ width: "13px", height: "13px", color: "#a78bfa" }} />
              {member.role}
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
              {member.social.linkedin && (
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="profile-social-btn">
                  <LinkedInIcon /> LinkedIn
                </a>
              )}
              {member.social.github && (
                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="profile-social-btn">
                  <Github style={{ width: "12px", height: "12px" }} /> GitHub
                </a>
              )}
              {member.social.email && (
                <a href={`mailto:${member.social.email}`} className="profile-social-btn">
                  <Mail style={{ width: "12px", height: "12px" }} /> Email
                </a>
              )}
              {member.social.instagram && (
                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="profile-social-btn">
                  <Instagram style={{ width: "12px", height: "12px" }} /> Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.25) 30%, rgba(167,139,250,0.25) 70%, transparent 100%)", margin: "18px 0" }} />

        {/* ── 4-card grid ── */}
        <div className="profile-cards-grid">
          {/* About */}
          <div className="profile-card">
            <div className="profile-card-accent" style={{ background: "linear-gradient(90deg, #38bdf8, transparent 80%)" }} />
            <h2 className="profile-card-heading">
              <Sparkles style={{ width: "12px", height: "12px", color: "#38bdf8" }} />
              About
            </h2>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
              {member.bio}
            </p>
          </div>

          {/* Projects */}
          <div className="profile-card">
            <div className="profile-card-accent" style={{ background: "linear-gradient(90deg, #2dd4bf, transparent 80%)" }} />
            <h2 className="profile-card-heading">
              <Folder style={{ width: "12px", height: "12px", color: "#2dd4bf" }} />
              Projects
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {member.projects.map((project, i) => (
                <div key={i} className="profile-project-item">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
                    <h3 style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px", margin: 0 }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: accentColors[i % accentColors.length], flexShrink: 0 }} />
                      {project.title}
                    </h3>
                    {project.link && project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                        <ExternalLink style={{ width: "11px", height: "11px" }} />
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: "11.5px", lineHeight: 1.6, color: "var(--text-secondary)", margin: "4px 0 0 11px" }}>
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="profile-card">
            <div className="profile-card-accent" style={{ background: "linear-gradient(90deg, #a78bfa, transparent 80%)" }} />
            <h2 className="profile-card-heading">
              <Sparkles style={{ width: "12px", height: "12px", color: "#a78bfa" }} />
              Skills & Expertise
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {member.skills.map((skill, i) => {
                const color = accentColors[i % accentColors.length];
                return (
                  <span
                    key={skill}
                    style={{
                      fontSize: "11px",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      border: `1px solid ${color}30`,
                      background: `${color}0c`,
                      color: color,
                      fontWeight: 600,
                    }}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="profile-card">
            <div className="profile-card-accent" style={{ background: "linear-gradient(90deg, #fbbf24, transparent 80%)" }} />
            <h2 className="profile-card-heading">
              <Trophy style={{ width: "12px", height: "12px", color: "#fbbf24" }} />
              Achievements
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {member.achievements.map((achievement, i) => (
                <div key={i} className="profile-achievement-item">
                  <Trophy style={{ width: "12px", height: "12px", color: "#fbbf24", flexShrink: 0, marginTop: "1px" }} />
                  <span style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-secondary)", fontWeight: 500 }}>
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glows */}
      <div style={{ position: "fixed", top: "10%", left: "0%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 65%)", filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "0%", right: "0%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 65%)", filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }} />

      <style>{`
        .profile-page {
          height: 100vh;
          overflow: hidden;
          background: #050811;
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .profile-topbar {
          flex-shrink: 0;
          background: rgba(5,8,17,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
          z-index: 10;
        }

        .profile-back-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .profile-back-link:hover { color: #38bdf8; }

        .profile-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 20px;
          padding-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .profile-hero-row {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .profile-avatar-glow {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: conic-gradient(from 180deg, #38bdf8, #a78bfa, #ec4899, #38bdf8);
          opacity: 0.45;
          filter: blur(10px);
        }
        .profile-avatar {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(15,22,36,1);
          display: flex;
          align-items: center;
          justify-content: center;
          outline: 2.5px solid rgba(56,189,248,0.5);
          outline-offset: 0px;
        }

        .profile-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.2);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 8px;
        }

        .profile-name {
          font-family: var(--font-display);
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 4px;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .profile-role {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .profile-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .profile-social-btn:hover {
          border-color: rgba(56,189,248,0.4);
          color: #ffffff;
          background: rgba(56,189,248,0.08);
        }

        .profile-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          flex: 1;
          min-height: 0;
        }

        .profile-card {
          position: relative;
          padding: 18px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(12, 18, 30, 0.6);
          backdrop-filter: blur(10px);
          overflow: hidden;
          transition: border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .profile-card:hover { border-color: rgba(255,255,255,0.12); }

        .profile-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          opacity: 0.6;
        }

        .profile-card-heading {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 12px;
        }

        .profile-project-item {
          padding: 10px 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.2s;
        }
        .profile-project-item:hover {
          border-color: rgba(255,255,255,0.12);
        }

        .profile-achievement-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 8px;
          background: rgba(251,191,36,0.04);
          border: 1px solid rgba(251,191,36,0.1);
          transition: border-color 0.2s, background 0.2s;
        }
        .profile-achievement-item:hover {
          border-color: rgba(251,191,36,0.2);
          background: rgba(251,191,36,0.06);
        }

        /* Mobile: allow scroll on small screens */
        @media (max-width: 768px) {
          .profile-page {
            height: auto;
            overflow: auto;
          }
          .profile-hero-row {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
          .profile-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .profile-main {
            justify-content: flex-start;
          }
          .profile-social-btn { font-size: 11px; }
        }

        @media (min-height: 900px) {
          .profile-cards-grid { gap: 18px; }
          .profile-card { padding: 22px 24px; }
        }
      `}</style>
    </div>
  );
}
