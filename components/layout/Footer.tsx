"use client";

import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#team", label: "Team" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#contact", label: "Contact" },
];

const communityLinks = [
  { href: "https://vexta.collegecrm.in", label: "Join Community", external: true },
  { href: "#upcoming", label: "Upcoming Events" },
  { href: "#achievements", label: "Achievements" },
  { href: "#faq", label: "FAQ" },
];

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/nexuscommunity___?igsh=MXNmZW5xYXk1ZmoyeQ==", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/nexus-23176/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:nexus@college.edu", label: "Email" },
];

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
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* ── Marquee ticker (now actually visible) ── */}
      <div
        className="marquee-wrapper"
        style={{
          borderBottom: "1px solid var(--border)",
          paddingBlock: "10px",
        }}
      >
        <div className="marquee-track">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              style={{
                color: "#3d3d3d",
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                userSelect: "none",
              }}
            >
              Nexus Community&nbsp;·&nbsp;Build Skills&nbsp;·&nbsp;Crack Placements&nbsp;·&nbsp;Shape Your Future&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Main footer content ── */}
      <div className="section-container" style={{ paddingTop: "56px", paddingBottom: "56px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            marginBottom: "40px",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <img
                src="/images/logo.png"
                alt="Nexus Community"
                style={{ height: "40px", width: "auto", objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                maxWidth: "260px",
                marginBottom: "24px",
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
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    transition: "color 0.18s, border-color 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
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
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none" }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={linkStyle}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
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
                marginBottom: "20px",
              }}
            >
              Community
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none" }}>
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => !link.external && handleNavClick(e, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    style={linkStyle}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="w-3 h-3" />}
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
                marginBottom: "20px",
              }}
            >
              Get In Touch
            </h4>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                marginBottom: "20px",
                maxWidth: "220px",
              }}
            >
              Want to collaborate, sponsor, or join? Reach out to us.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="btn-secondary"
              style={{ fontSize: "12.5px", padding: "8px 18px" }}
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

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <p style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
            © 2025 Nexus Community. All rights reserved.
          </p>
          <p style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
            Built with care by the Nexus Team ·{" "}
            <a
              href="https://vexta.collegecrm.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-secondary)", transition: "color 0.18s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              Powered by Vexta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
