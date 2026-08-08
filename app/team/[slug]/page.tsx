import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, ExternalLink, Instagram, Mail, ArrowLeft, Trophy, Folder } from "lucide-react";
import { teamMembers } from "@/data/team";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) return { title: "Member Not Found" };
  return {
    title: `${member.name} — Nexus Community`,
    description: member.bio,
  };
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default async function MemberProfile({ params }: Props) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) notFound();

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const accentColors = ["#00e5cc", "#8b5cf6", "#60a5fa", "#f472b6", "#34d399", "#fbbf24"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        color: "var(--text-primary)",
      }}
    >
      {/* ── Top navigation bar ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(12,12,12,0.85)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="section-container"
          style={{
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/#team"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              transition: "color 0.18s",
            }}
          >
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            Back to Team
          </Link>
          <img
            src="/images/logo.png"
            alt="Nexus"
            style={{ height: "28px", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "clamp(48px, 7vw, 80px)",
          paddingBottom: "clamp(40px, 6vw, 64px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Ambient glow based on first accent color */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(0,229,204,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "28px",
              alignItems: "center",
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  position: "absolute",
                  inset: "-3px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00e5cc, #8b5cf6)",
                  opacity: 0.7,
                  filter: "blur(6px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: "clamp(80px, 14vw, 120px)",
                  height: "clamp(80px, 14vw, 120px)",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.1)",
                  overflow: "hidden",
                  background: "var(--bg-elevated)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(22px, 4vw, 36px)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                }}
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </div>

            {/* Name + meta */}
            <div style={{ flex: "1 1 200px", minWidth: 0 }}>
              <div
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "8px",
                }}
              >
                {member.branch} · {member.year}
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  marginBottom: "8px",
                }}
              >
                {member.name}
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  marginBottom: "20px",
                }}
              >
                {member.role}
              </p>

              {/* Social links */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "7px 14px",
                      borderRadius: "999px",
                      border: "1px solid var(--border)",
                      fontSize: "12.5px",
                      color: "var(--text-secondary)",
                      transition: "all 0.18s",
                    }}
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "7px 14px",
                      borderRadius: "999px",
                      border: "1px solid var(--border)",
                      fontSize: "12.5px",
                      color: "var(--text-secondary)",
                      transition: "all 0.18s",
                    }}
                  >
                    <Github style={{ width: "13px", height: "13px" }} />
                    GitHub
                  </a>
                )}
                {member.social.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "7px 14px",
                      borderRadius: "999px",
                      border: "1px solid var(--border)",
                      fontSize: "12.5px",
                      color: "var(--text-secondary)",
                      transition: "all 0.18s",
                    }}
                  >
                    <Mail style={{ width: "13px", height: "13px" }} />
                    Email
                  </a>
                )}
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "7px 14px",
                      borderRadius: "999px",
                      border: "1px solid var(--border)",
                      fontSize: "12.5px",
                      color: "var(--text-secondary)",
                      transition: "all 0.18s",
                    }}
                  >
                    <Instagram style={{ width: "13px", height: "13px" }} />
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div
        className="section-container"
        style={{ paddingTop: "clamp(32px, 5vw, 56px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "20px",
          }}
          className="profile-grid"
        >
          {/* ── About & Skills column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Bio */}
            <div
              style={{
                padding: "24px",
                borderRadius: "14px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <h2
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                }}
              >
                About
              </h2>
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {member.bio}
              </p>
            </div>

            {/* Skills */}
            <div
              style={{
                padding: "24px",
                borderRadius: "14px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <h2
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                }}
              >
                Skills & Expertise
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {member.skills.map((skill, i) => (
                  <span
                    key={skill}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      padding: "5px 14px",
                      borderRadius: "999px",
                      border: `1px solid ${accentColors[i % accentColors.length]}30`,
                      background: `${accentColors[i % accentColors.length]}0a`,
                      color: accentColors[i % accentColors.length],
                      fontWeight: 500,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Projects & Achievements column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Projects */}
            <div
              style={{
                padding: "24px",
                borderRadius: "14px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <h2
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                }}
              >
                Projects
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {member.projects.map((project, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.015)",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Folder style={{ width: "13px", height: "13px", color: "#a78bfa", flexShrink: 0 }} />
                        <h3 style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-primary)" }}>
                          {project.title}
                        </h3>
                      </div>
                      {project.link && project.link !== "#" && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--text-muted)", flexShrink: 0 }}
                        >
                          <ExternalLink style={{ width: "12px", height: "12px" }} />
                        </a>
                      )}
                    </div>
                    <p style={{ fontSize: "12px", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div
              style={{
                padding: "24px",
                borderRadius: "14px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <h2
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                }}
              >
                Achievements
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {member.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: "rgba(251,191,36,0.04)",
                      border: "1px solid rgba(251,191,36,0.1)",
                    }}
                  >
                    <Trophy
                      style={{ width: "13px", height: "13px", color: "#fbbf24", flexShrink: 0, marginTop: "2px" }}
                    />
                    <span style={{ fontSize: "13px", lineHeight: 1.55, color: "var(--text-secondary)" }}>
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .profile-grid {
            grid-template-columns: 1fr 1.4fr !important;
          }
        }
      `}</style>
    </div>
  );
}
