"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Event Highlights" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(12,12,12,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "60px",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/images/logo.png"
                alt="Nexus Community"
                style={{ height: "34px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            {/* Desktop nav links */}
            <div
              style={{
                display: "none",
                alignItems: "center",
                gap: "2px",
              }}
              className="nav-desktop"
            >
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      position: "relative",
                      padding: "6px 12px",
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      borderRadius: "6px",
                      transition: "color 0.18s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    {link.label}
                    {/* Active dot indicator */}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "2px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "3px",
                          height: "3px",
                          borderRadius: "50%",
                          background: "var(--accent)",
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div style={{ display: "none" }} className="nav-cta">
              <a
                href="https://vexta.collegecrm.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12.5px",
                  fontWeight: 500,
                  padding: "7px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "var(--text-primary)",
                  transition: "background 0.18s, border-color 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.32)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                }}
              >
                <span style={{ fontSize: "9px", color: "var(--accent)" }}>✦</span>
                Join Community
              </a>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: mobileOpen ? "rgba(255,255,255,0.05)" : "transparent",
                color: "var(--text-secondary)",
                transition: "background 0.18s",
              }}
              className="nav-burger"
            >
              {mobileOpen ? <X style={{ width: "16px", height: "16px" }} /> : <Menu style={{ width: "16px", height: "16px" }} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay menu ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
          transition: "opacity 0.25s ease",
        }}
        className="nav-mobile-overlay"
      >
        {/* Backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(12,12,12,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: 0,
            right: 0,
            padding: "24px",
            transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
            transition: "transform 0.22s ease",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "24px" }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    padding: "13px 16px",
                    fontSize: "15px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    borderRadius: "8px",
                    background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                    transition: "color 0.18s, background 0.18s",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {isActive && (
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>
          <a
            href="https://vexta.collegecrm.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Join Community
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .nav-cta { display: flex !important; }
          .nav-burger { display: none !important; }
          .nav-mobile-overlay { display: none !important; }
        }
      `}</style>
    </>
  );
}
