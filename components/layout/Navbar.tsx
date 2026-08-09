"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sparkles, GraduationCap, ArrowRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Evolution", href: "#timeline" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Why Join", href: "#why-join" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  // Scroll detection & section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") return;

      const sectionIds = navLinks
        .map((l) => l.href)
        .filter((h) => h.startsWith("#"))
        .map((h) => h.replace("#", ""));

      const scrollCenter = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollCenter >= top && scrollCenter < top + height) {
            setActiveSection(sectionIds[i]);
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
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      if (pathname !== "/") {
        router.push(`/${href}`);
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        setActiveSection(id);
      }
      setMobileOpen(false);
    }
  };

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          background: showNavbarBg ? "rgba(8, 11, 18, 0.94)" : "transparent",
          backdropFilter: showNavbarBg ? "blur(20px)" : "none",
          WebkitBackdropFilter: showNavbarBg ? "blur(20px)" : "none",
          borderBottom: showNavbarBg ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
          boxShadow: showNavbarBg ? "0 10px 30px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "68px",
            }}
          >
            {/* 1. Logo Container (Left Aligned) */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
              className="nav-logo-link"
            >
              <img
                src="/images/logo.png"
                alt="Nexus Community"
                style={{
                  height: "36px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="nav-logo-img"
              />
            </Link>

            {/* 2. Desktop Nav Links Pill Container (Center Aligned) */}
            <div
              style={{
                display: "none",
                alignItems: "center",
                gap: "2px",
                padding: "4px 8px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)",
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
                  </a>
                );
              })}
            </div>

            {/* 3. Desktop CTA Actions Area (Right Aligned) */}
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
                  background: pathname === "/blog" ? "rgba(56, 189, 248, 0.22)" : "rgba(56, 189, 248, 0.12)",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  color: "#38bdf8",
                  transition: "all 0.22s ease",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 14px rgba(56, 189, 248, 0.2)",
                  textDecoration: "none",
                }}
                className="news-study-cta"
              >
                <GraduationCap style={{ width: "15px", height: "15px", color: "#38bdf8" }} />
                <span>News & Study</span>
                <Sparkles style={{ width: "10px", height: "10px", color: "#38bdf8" }} />
              </Link>

              {/* Join Community Button */}
              <a
                href="https://vexta.collegecrm.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  padding: "8px 20px",
                  fontSize: "12.5px",
                  height: "38px",
                  minHeight: "38px",
                }}
              >
                <span>Join Community</span>
                <ArrowRight style={{ width: "13px", height: "13px" }} />
              </a>
            </div>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#ffffff",
                cursor: "pointer",
              }}
              className="nav-burger"
            >
              {mobileOpen ? <X style={{ width: "20px", height: "20px" }} /> : <Menu style={{ width: "20px", height: "20px" }} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(5, 8, 17, 0.97)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "90px 24px 40px",
            animation: "fadeIn 0.25s ease forwards",
          }}
          className="nav-mobile-overlay"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#38bdf8" : "var(--text-secondary)",
                    background: isActive ? "rgba(56, 189, 248, 0.1)" : "transparent",
                    border: isActive ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid transparent",
                    textDecoration: "none",
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8" }} />}
                </a>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                borderRadius: "12px",
                background: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.35)",
                color: "#38bdf8",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <GraduationCap style={{ width: "16px", height: "16px" }} />
              <span>News & Study Hub</span>
            </Link>

            <a
              href="https://vexta.collegecrm.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: "100%", textAlign: "center" }}
            >
              Join Community
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .nav-logo-link {
            margin-left: -25px !important;
          }
        }

        @media (min-width: 1200px) {
          .nav-desktop { display: flex !important; }
          .nav-cta { display: flex !important; }
          .nav-burger { display: none !important; }
          .nav-mobile-overlay { display: none !important; }
        }

        .nav-logo-link:hover .nav-logo-img {
          transform: scale(1.05);
          filter: brightness(1.15) drop-shadow(0 0 16px rgba(56, 189, 248, 0.5));
        }

        .nav-item-link {
          position: relative;
          padding: 6px 14px;
          font-size: 12.5px;
          font-weight: 600;
          border-radius: 999px;
          transition: all 0.22s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
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
          background: rgba(56, 189, 248, 0.2) !important;
          border: 1px solid rgba(56, 189, 248, 0.35) !important;
          font-weight: 700;
          box-shadow: 0 0 14px rgba(56, 189, 248, 0.25);
        }

        .news-study-cta:hover {
          background: rgba(56, 189, 248, 0.25) !important;
          border-color: #38bdf8 !important;
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.35) !important;
        }
      `}</style>
    </>
  );
}
