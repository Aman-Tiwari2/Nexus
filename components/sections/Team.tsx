"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";
import { teamMembers } from "@/data/team";

/* ─── LinkedIn SVG icon (branded blue) ─────────────────── */
function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Individual card ───────────────────────────────────── */
function TeamCard({
  member,
  index,
  visible,
}: {
  member: (typeof teamMembers)[0];
  index: number;
  visible: boolean;
}) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      className="team-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.055}s, transform 0.5s ease ${index * 0.055}s`,
      }}
    >
      {/* ── Avatar + name row ── */}
      <div className="team-card__header">
        {/* Avatar */}
        <div className="team-card__avatar-wrap">
          {member.photo && (
            <img
              src={member.photo}
              alt={member.name}
              className="team-card__avatar-img"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
                const fb = e.currentTarget
                  .nextElementSibling as HTMLElement | null;
                if (fb) fb.style.display = "flex";
              }}
            />
          )}
          <div
            className="team-card__avatar-fallback"
            style={{ display: member.photo ? "none" : "flex" }}
          >
            {initials}
          </div>
        </div>

        {/* Name + role */}
        <div className="team-card__meta">
          <h3 className="team-card__name">{member.name}</h3>
          <p className="team-card__role">{member.role}</p>
          <p className="team-card__branch">
            {member.branch} · {member.year}
          </p>
        </div>
      </div>

      {/* ── Bio ── */}
      {member.bio && <p className="team-card__bio">{member.bio}</p>}

      {/* ── Skills ── */}
      <div className="team-card__skills">
        {member.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="team-card__skill-tag">
            {skill}
          </span>
        ))}
        {member.skills.length > 4 && (
          <span className="team-card__skill-more">
            +{member.skills.length - 4}
          </span>
        )}
      </div>

      {/* ── Social + profile link ── */}
      <div className="team-card__footer">
        <div className="team-card__socials">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="team-card__social-btn team-card__social-btn--linkedin"
            >
              <LinkedInIcon size={14} />
            </a>
          )}
          {member.social.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} GitHub`}
              className="team-card__social-btn"
            >
              <Github size={14} />
            </a>
          )}
          {member.social.email && (
            <a
              href={`mailto:${member.social.email}`}
              aria-label={`Email ${member.name}`}
              className="team-card__social-btn"
            >
              <Mail size={14} />
            </a>
          )}
        </div>

        <Link href={`/team/${member.slug}`} className="team-card__profile-link">
          Profile →
        </Link>
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────── */
export default function Team() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const categories = [
    { name: "Leadership & Core", key: "leadership" as const },
    { name: "Technical Team", key: "technical" as const },
    { name: "Content & PR Team", key: "content_pr" as const },
    { name: "Social Media Team", key: "social_media" as const },
  ];

  const grouped = {
    leadership: teamMembers.filter((m) => {
      const r = m.role.toLowerCase();
      return r.includes("founder") || r.includes("community");
    }),
    technical: teamMembers.filter((m) =>
      m.role.toLowerCase().includes("technical")
    ),
    content_pr: teamMembers.filter((m) => {
      const r = m.role.toLowerCase();
      return r.includes("content") || r.includes("event");
    }),
    social_media: teamMembers.filter((m) =>
      m.role.toLowerCase().includes("social")
    ),
  };

  return (
    <>
      {/* ── Scoped styles ─────────────────────────────────── */}
      <style>{`
        /* ── Card ── */
        .team-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .team-card:hover {
          border-color: rgba(0,229,204,0.2);
          box-shadow: 0 0 24px rgba(0,229,204,0.05);
        }

        /* ── Avatar + name row ── */
        .team-card__header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .team-card__avatar-wrap {
          position: relative;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
        }
        .team-card__avatar-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .team-card__avatar-fallback {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1e1e1e;
          border: 1px solid rgba(255,255,255,0.1);
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }
        .team-card__meta {
          flex: 1;
          min-width: 0;
        }
        .team-card__name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .team-card__role {
          font-size: 12px;
          color: #00e5cc;
          margin: 0 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .team-card__branch {
          font-size: 11px;
          color: #666;
          margin: 0;
        }

        /* ── Bio ── */
        .team-card__bio {
          font-size: 12px;
          line-height: 1.6;
          color: #888;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Skills ── */
        .team-card__skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .team-card__skill-tag {
          font-size: 11px;
          padding: 3px 9px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: #999;
          line-height: 1.5;
        }
        .team-card__skill-more {
          font-size: 11px;
          padding: 3px 6px;
          color: #555;
        }

        /* ── Footer ── */
        .team-card__footer {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: auto;
        }
        .team-card__socials {
          display: flex;
          gap: 6px;
        }
        .team-card__social-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          /* larger hit area on mobile */
          -webkit-tap-highlight-color: transparent;
        }
        .team-card__social-btn:hover,
        .team-card__social-btn:focus-visible {
          color: #fff;
          border-color: rgba(255,255,255,0.25);
        }
        .team-card__social-btn--linkedin:hover,
        .team-card__social-btn--linkedin:focus-visible {
          color: #0A66C2;
          border-color: rgba(10,102,194,0.5);
          background: rgba(10,102,194,0.1);
        }
        .team-card__profile-link {
          margin-left: auto;
          font-size: 12px;
          color: #555;
          transition: color 0.2s;
          padding: 6px 10px;          /* bigger touch target */
          border-radius: 6px;
          -webkit-tap-highlight-color: transparent;
        }
        .team-card__profile-link:hover,
        .team-card__profile-link:focus-visible {
          color: #fff;
        }

        /* ── Category grid ── */
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 480px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 900px) {
          .team-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1200px) {
          .team-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Category header ── */
        .team-cat-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 4px;
        }
        .team-cat-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #555;
          white-space: nowrap;
        }
        .team-cat-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        /* ── Section header on small screens ── */
        @media (max-width: 640px) {
          .team-section-title {
            font-size: clamp(32px, 10vw, 52px) !important;
          }
        }
      `}</style>

      <section id="team" className="section-padding" style={{ background: "#111111" }}>
        <div className="section-container">
          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <div className="section-tag">The Team</div>
            <h2
              className="team-section-title font-black text-white leading-[0.95] mt-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.03em",
              }}
            >
              Meet the
              <br />
              <span style={{ color: "#00e5cc" }}>People</span>
            </h2>
          </div>

          {/* Categories */}
          <div ref={sectionRef} style={{ display: "flex", flexDirection: "column", gap: "52px" }}>
            {categories.map((cat) => {
              const list = grouped[cat.key];
              if (list.length === 0) return null;
              return (
                <div key={cat.key}>
                  {/* Category label */}
                  <div className="team-cat-header">
                    <span className="team-cat-label">{cat.name}</span>
                    <div className="team-cat-line" />
                  </div>

                  {/* Cards */}
                  <div className="team-grid" style={{ marginTop: "20px" }}>
                    {list.map((member, i) => (
                      <TeamCard
                        key={member.id}
                        member={member}
                        index={i}
                        visible={visible}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
