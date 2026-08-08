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
    <footer style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Scrolling marquee */}
      <div
        className="marquee-wrapper py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="marquee-track">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              style={{ color: "#2a2a2a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}
            >
              Nexus Community&nbsp;·&nbsp;Build Skills&nbsp;·&nbsp;Crack Placements&nbsp;·&nbsp;Shape Your Future&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src="/images/logo.png" 
                alt="Nexus Community" 
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#a0a0a0" }}>
              A student-driven community helping college students master coding, aptitude, and placement skills.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#a0a0a0" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                      (e.currentTarget as HTMLElement).style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.color = "#a0a0a0";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#808080", letterSpacing: "0.2em" }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#a0a0a0" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#a0a0a0"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#808080", letterSpacing: "0.2em" }}>
              Community
            </h4>
            <ul className="flex flex-col gap-3">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => !link.external && handleNavClick(e, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm transition-colors duration-200 inline-flex items-center gap-1"
                    style={{ color: "#a0a0a0" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#a0a0a0"; }}
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
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#808080", letterSpacing: "0.2em" }}>
              Get In Touch
            </h4>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#a0a0a0" }}>
              Want to collaborate, sponsor, or join? Reach out to us.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="btn-secondary text-sm"
              style={{ padding: "10px 22px" }}
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "#666666" }}>
            © {new Date().getFullYear()} Nexus Community. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#666666" }}>
            Built with care by the Nexus Team ·{" "}
            <a
              href="https://vexta.collegecrm.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#808080" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#808080"; }}
            >
              Powered by Vexta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
