"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Evolution" },
  { href: "#events-overview", label: "Events" },
  { href: "#blog", label: "News" },
  { href: "#events", label: "Gallery" },
];

const exploreLinks = [
  { href: "#team", label: "Team" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#why-join", label: "Why Join" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const communityLinks = [
  { href: "https://vexta.collegecrm.in", label: "Join Community", external: true },
  { href: "/blog", label: "News & Study Hub" },
];

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/nexuscommunity___?igsh=MXNmZW5xYXk1ZmoyeQ==",
    label: "Instagram",
  },
  { icon: Linkedin, href: "https://www.linkedin.com/company/nexus-23176/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:nexuscommunitystu@gmail.com", label: "Email" },
];

const linkStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "var(--text-secondary)",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  transition: "color 0.18s",
};

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 1,
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* ── Main links content ── */}
      <div className="section-container" style={{ paddingTop: "48px", paddingBottom: "36px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "36px",
            marginBottom: "32px",
          }}
          className="footer-grid"
        >
          {/* Brand Column with Original Logo */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", marginBottom: "16px" }} className="footer-logo-link">
              <img
                src="/images/nexus_logo.png"
                alt="Nexus Community"
                style={{
                  height: "36px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="footer-logo-img"
              />
            </Link>

            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: "260px",
                marginBottom: "20px",
              }}
            >
              Nexus Community — Connect. Learn. Create. Grow.
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    transition: "color 0.18s, border-color 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <Icon style={{ width: "14px", height: "14px" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Column 1) */}
          <div>
            <h4
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "16px",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={linkStyle}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links (Column 2) */}
          <div>
            <h4
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "16px",
              }}
            >
              Explore
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0 }}>
              {exploreLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={linkStyle}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "16px",
              }}
            >
              Community
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0 }}>
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => !link.external && handleNavClick(e, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    style={linkStyle}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {link.label}
                    {link.external && <ArrowUpRight style={{ width: "11px", height: "11px" }} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            © 2026 Nexus Community. All rights reserved.
          </p>
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            Built with love by the Nexus Team
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.4fr 1fr 1fr 1fr !important;
          }
        }

        /* Logo Cursor Pointing Hover Effect */
        .footer-logo-link:hover .footer-logo-img {
          transform: scale(1.06);
          filter: brightness(1.15) drop-shadow(0 0 14px rgba(96, 165, 250, 0.45));
        }
      `}</style>
    </footer>
  );
}
