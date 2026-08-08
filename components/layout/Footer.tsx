"use client";

import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Event Highlights" },
  { href: "#team", label: "Team" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#contact", label: "Contact" },
];

const communityLinks = [
  { href: "https://vexta.collegecrm.in", label: "Join Community", external: true },
  { href: "#faq", label: "FAQ" },
];

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/nexuscommunity___?igsh=MXNmZW5xYXk1ZmoyeQ==",
    label: "Instagram",
  },
  { icon: Linkedin, href: "https://www.linkedin.com/company/nexus-23176/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:nexus@college.edu", label: "Email" },
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
      {/* ── Top Solid Orange Bar (matching screenshot style but with theme color) ── */}
      <div
        style={{
          height: "22px",
          background: "var(--accent)", // Neon orange theme
          width: "100%",
        }}
      />

      {/* ── The Two Banner Buttons (exact design from screenshot) ── */}
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Left button: WHERE DO I SIGN? */}
        <a
          href="https://vexta.collegecrm.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 3,
            background: "#000000",
            color: "#ffffff",
            padding: "24px 20px",
            textAlign: "center",
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(12px, 1.8vw, 18px)",
            fontWeight: 800,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRight: "1px solid rgba(255, 255, 255, 0.15)",
            transition: "background 0.25s, color 0.25s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#111111";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#000000";
          }}
        >
          WHERE DO I SIGN?
        </a>

        {/* Right button: HERE ↗↗↗ */}
        <a
          href="https://vexta.collegecrm.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 2,
            background: "#ffffff",
            color: "#000000",
            padding: "24px 20px",
            textAlign: "center",
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(12px, 1.8vw, 18px)",
            fontWeight: 800,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.25s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
          }}
        >
          HERE ↗↗↗
        </a>
      </div>

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
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                NEXUS<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </div>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: "260px",
                marginBottom: "20px",
              }}
            >
              A student-driven community helping college students master coding,
              aptitude, and placement skills.
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

          {/* Quick Links */}
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
                <li key={link.href}>
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

          {/* Community */}
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

          {/* Get in touch */}
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
              Get In Touch
            </h4>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                marginBottom: "16px",
                maxWidth: "220px",
              }}
            >
              Want to collaborate, sponsor, or join? Reach out to us.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="btn-secondary"
              style={{ fontSize: "12px", padding: "8px 16px" }}
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* ── Giant Stylized NEXUS Text (Screenshot brand style) ── */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            marginTop: "16px",
            marginBottom: "-12px",
            userSelect: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(70px, 17vw, 220px)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.06em",
              lineHeight: 0.8,
              textTransform: "lowercase",
              display: "block",
            }}
          >
            nexus
          </span>
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
            © 2025 Nexus Community. All rights reserved.
          </p>
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            Built with care by the Nexus Team ·{" "}
            <a
              href="https://vexta.collegecrm.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-secondary)", transition: "color 0.18s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              Powered by Vexta
            </a>
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
      `}</style>
    </footer>
  );
}
