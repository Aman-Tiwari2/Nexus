"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Info, CalendarClock, CalendarDays, Images, Users, Map, Star, HelpCircle, Mail, Newspaper, GraduationCap, Sparkles } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: Info },
  { href: "#timeline", label: "Evolution", icon: CalendarClock },
  { href: "#events-overview", label: "Events", icon: CalendarDays },
  { href: "#events", label: "Gallery", icon: Images },
  { href: "#team", label: "Team", icon: Users },
  { href: "#roadmap", label: "Roadmap", icon: Map },
  { href: "#why-join", label: "Why Join", icon: Star },
  { href: "#faq", label: "FAQ", icon: HelpCircle },
  { href: "#contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Absolute document coordinate active section scroll tracking
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = [
      "home",
      "about",
      "timeline",
      "events-overview",
      "blog",
      "events",
      "team",
      "roadmap",
      "why-join",
      "faq",
      "contact",
    ];

    const handleScroll = () => {
      const scrollCenter = window.scrollY + window.innerHeight / 2;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = el.offsetHeight;

          if (scrollCenter >= top && scrollCenter < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      setMobileOpen(false);
      return;
    }
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const showNavbarBg = scrolled || pathname !== "/";

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
          background: showNavbarBg ? "rgba(12,12,12,0.92)" : "transparent",
          backdropFilter: showNavbarBg ? "blur(18px)" : "none",
          WebkitBackdropFilter: showNavbarBg ? "blur(18px)" : "none",
          borderBottom: showNavbarBg ? "1px solid var(--border)" : "1px solid transparent",
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
            {/* Logo with cursor pointing hover effect */}
            <Link href="/" style={{ display: "flex", alignItems: "center" }} className="nav-logo-link">
              <img
                src="/images/logo.png"
                alt="Nexus Community"
                style={{
                  height: "34px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="nav-logo-img"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div
              style={{
                display: "none",
                alignItems: "center",
                gap: "3px",
              }}
              className="nav-desktop"
            >
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isRoute = link.href.startsWith("/");
                const isActive = isRoute ? pathname === link.href : pathname === "/" && activeSection === id;
                const targetHref = isRoute ? link.href : pathname === "/" ? link.href : `/${link.href}`;

                return (
                  <a
                    key={link.href + link.label}
                    href={targetHref}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`nav-item-link ${isActive ? "active" : ""}`}
                  >
                    <span>{link.label}</span>
                    <span
                      style={{
                        display: "block",
                        height: "2px",
                        width: isActive ? "100%" : "0%",
                        borderRadius: "2px",
                        background: "var(--accent)",
                        transition: "width 0.25s ease",
                      }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA Buttons Area */}
            <div style={{ display: "none", alignItems: "center", gap: "10px" }} className="nav-cta">
              {/* News & Study Action Button */}
              <Link
                href="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  padding: "7px 16px",
                  borderRadius: "999px",
                  background: pathname === "/blog" ? "rgba(96, 165, 250, 0.22)" : "rgba(96, 165, 250, 0.12)",
                  border: "1px solid rgba(96, 165, 250, 0.35)",
                  color: "#60a5fa",
                  transition: "all 0.22s ease",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 14px rgba(96, 165, 250, 0.2)",
                }}
                className="news-study-cta"
              >
                <GraduationCap style={{ width: "15px", height: "15px", color: "#60a5fa" }} />
                <span>News & Study</span>
                <Sparkles style={{ width: "10px", height: "10px", color: "#a78bfa" }} />
              </Link>

              {/* Join Community Button */}
              <a
                href="https://vexta.collegecrm.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  padding: "7px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "var(--text-primary)",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                className="join-community-cta"
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

      {/* ── Mobile Overlay Menu ── */}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
            {navLinks.map((link) => {
              const isRoute = link.href.startsWith("/");
              const isActive = isRoute ? pathname === link.href : pathname === "/" && activeSection === link.href.replace("#", "");
              const Icon = link.icon;
              const targetHref = isRoute ? link.href : pathname === "/" ? link.href : `/${link.href}`;

              return (
                <a
                  key={link.href + link.label}
                  href={targetHref}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    padding: "12px 16px",
                    fontSize: "14.5px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    borderRadius: "8px",
                    background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                    transition: "color 0.18s, background 0.18s",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  }}
                >
                  <Icon style={{
                    width: "16px", height: "16px",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    flexShrink: 0,
                  }} />
                  {link.label}
                </a>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)" }}
            >
              <GraduationCap style={{ width: "16px", height: "16px" }} />
              News & Study
            </Link>

            <a
              href="https://vexta.collegecrm.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Join Community
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1200px) {
          .nav-desktop { display: flex !important; }
          .nav-cta { display: flex !important; }
          .nav-burger { display: none !important; }
          .nav-mobile-overlay { display: none !important; }
        }

        /* Logo cursor pointing hover effect */
        .nav-logo-link:hover .nav-logo-img {
          transform: scale(1.08);
          filter: brightness(1.2) drop-shadow(0 0 16px rgba(96, 165, 250, 0.5));
        }

        .nav-item-link {
          position: relative;
          padding: 6px 9px;
          font-size: 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          color: var(--text-secondary);
          background: transparent;
          cursor: pointer;
          text-decoration: none;
        }

        .nav-item-link:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .nav-item-link.active {
          color: #ffffff !important;
          background: rgba(96, 165, 250, 0.12) !important;
          font-weight: 600;
        }

        .news-study-cta:hover {
          background: rgba(96, 165, 250, 0.25) !important;
          border-color: #60a5fa !important;
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.35) !important;
        }

        .join-community-cta:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.35) !important;
        }
      `}</style>
    </>
  );
}
