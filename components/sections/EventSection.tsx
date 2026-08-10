"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  sub: string;
  caption: string;
  number: string;
  date: string;
};

export default function EventSection() {
  const [eventItems, setEventItems] = useState<GalleryItem[]>([
    {
      id: "1",
      title: "Core Team Meet",
      category: "Community",
      image: "/images/gallery/CoreTeamMate.jpeg",
      sub: "01 / CORE TEAM",
      caption: "Building people. Building ideas.",
      number: "01 / 06",
      date: "Jan 2026"
    },
    {
      id: "2",
      title: "Speaker Session",
      category: "Event",
      image: "/images/gallery/SpeakerSession.jpeg",
      sub: "02 / SPEAKER SESSION",
      caption: "Insights and industry perspectives.",
      number: "02 / 06",
      date: "Feb 2026"
    },
    {
      id: "3",
      title: "Registration Desk",
      category: "Community",
      image: "/images/gallery/moment1.jpg",
      sub: "03 / COMMUNITY",
      caption: "Welcoming peers, matching frequencies.",
      number: "03 / 06",
      date: "Aug 2025"
    },
    {
      id: "4",
      title: "Event Management",
      category: "Workshop",
      image: "/images/gallery/moment2.jpg",
      sub: "04 / WORKSHOP",
      caption: "Planning, executing, and delivering impact.",
      number: "04 / 06",
      date: "Nov 2025"
    },
    {
      id: "5",
      title: "Orientation Session",
      category: "Event",
      image: "/images/gallery/moment6.jpg",
      sub: "05 / ORIENTATION",
      caption: "Stepping into a bigger technical world.",
      number: "05 / 06",
      date: "Oct 2025"
    },
    {
      id: "6",
      title: "Interactive Lab",
      category: "Workshop",
      image: "/images/gallery/moment7.jpg",
      sub: "06 / WORKSHOP",
      caption: "Translating code into solutions.",
      number: "06 / 06",
      date: "Jan 2026"
    }
  ]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEventItems(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + eventItems.length) % eventItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % eventItems.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + eventItems.length) % eventItems.length);
      if (e.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % eventItems.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const renderCard = (item: typeof eventItems[0]) => {
    return (
      <div 
        className="magazine-item-container"
        onClick={() => {
          const index = eventItems.findIndex(x => x.id === item.id);
          setLightboxIndex(index);
        }}
        style={{ cursor: "pointer" }}
      >
        {/* Top Meta info */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "#899393",
          textTransform: "uppercase"
        }}>
          <span>{item.sub}</span>
          <span>{item.number}</span>
        </div>
        
        {/* Image container */}
        <div className="magazine-image-wrapper" style={{
          position: "relative",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.01)",
          border: "1px solid rgba(255, 255, 255, 0.04)",
        }}>
          {/* Film Grain & Gradient Overlay */}
          <div className="film-overlay" />
          
          <div 
            className="magazine-image" 
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          />
          
          {/* Hover Overlay */}
          <div className="magazine-hover-overlay" style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5, 8, 8, 0.65)",
            opacity: 0,
            transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2
          }}>
            <div style={{ textAlign: "center" }}>
              <span style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#00E5CC",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}>
                VIEW STORY ↗
              </span>
              <div style={{
                width: "0%",
                height: "1px",
                background: "#00E5CC",
                margin: "8px auto 0",
                transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
              }} className="hover-line" />
            </div>
          </div>
        </div>
        
        {/* Caption */}
        <div style={{ marginTop: "16px" }}>
          <h4 style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#F5F5F5",
            letterSpacing: "-0.01em",
            marginBottom: "6px",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase"
          }}>
            {item.title}
          </h4>
          
          <p style={{
            fontSize: "14px",
            color: "#899393",
            lineHeight: 1.5,
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            letterSpacing: "0.03em",
            transition: "color 0.3s ease"
          }} className="magazine-desc">
            "{item.caption}"
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="gallery"
      className="section-padding relative overflow-hidden"
      style={{ background: "#050808", color: "#F5F5F5" }}
      ref={sectionRef}
    >
      {/* Background radial gradients */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.02) 0%, transparent 60%),
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.015) 0%, transparent 60%)
        `,
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Grid Lines */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.007) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.007) 1px, transparent 1px)",
        backgroundSize: "240px 240px",
        opacity: 0.8,
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Faint Noise Grain */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="noise-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.02 0" />
        </filter>
      </svg>
      <div style={{
        position: "absolute",
        inset: 0,
        filter: "url(#noise-grain)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ marginBottom: "64px", position: "relative" }}>
          <div style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#899393",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px"
          }}>
            <span>NEXUS / COMMUNITY / 2026</span>
            <span style={{ height: "1px", width: "40px", background: "#00E5CC" }} />
          </div>
          
          <h2
            className="heading-display"
            style={{
              fontSize: "clamp(54px, 8vw, 100px)",
              lineHeight: 0.85,
              textTransform: "uppercase",
              fontWeight: 900,
              marginBottom: "16px",
              letterSpacing: "-0.04em",
              color: "#F5F5F5"
            }}
          >
            NEXUS<br />
            <span style={{ 
              fontFamily: "'Instrument Serif', serif", 
              fontWeight: "normal", 
              fontStyle: "italic",
              textTransform: "none",
              letterSpacing: "0.02em"
            }}>Moments</span>
          </h2>
          
          <p style={{
            fontSize: "18px",
            color: "#899393",
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            letterSpacing: "0.05em",
            marginTop: "12px"
          }}>
            "Stories from our community."
          </p>
        </div>

        {/* Equal-sized Grid Layout */}
        <div 
          className="magazine-layout-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "40px 32px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {eventItems.map((item) => (
            <div key={item.id}>
              {renderCard(item)}
            </div>
          ))}
        </div>



      </div>

      {/* Fullscreen Editorial Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay"
            style={{
              background: "rgba(5, 8, 8, 0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)"
            }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header / Info Row */}
            <div className="lightbox-header">
              <div>
                <span className="lightbox-tag">{eventItems[lightboxIndex].category}</span>
                <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.2)" }}>·</span>
                <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#899393" }}>
                  {eventItems[lightboxIndex].date}
                </span>
              </div>
              
              <button
                className="lightbox-close"
                onClick={() => setLightboxIndex(null)}
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            {/* Main Stage (Image & Navigation) */}
            <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
              
              {/* Prev Button */}
              <button className="nav-btn prev" onClick={handlePrev}>
                <ChevronLeft style={{ width: "20px", height: "20px" }} />
              </button>

              {/* Image Frame */}
              <motion.div 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="lightbox-image-container"
              >
                <img 
                  src={eventItems[lightboxIndex].image} 
                  alt={eventItems[lightboxIndex].title} 
                  className="lightbox-image"
                />
              </motion.div>

              {/* Next Button */}
              <button className="nav-btn next" onClick={handleNext}>
                <ChevronRight style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            {/* Bottom details block */}
            <div className="lightbox-footer" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-footer-content">
                <span className="lightbox-number">{eventItems[lightboxIndex].number}</span>
                <h3 className="lightbox-title">{eventItems[lightboxIndex].title}</h3>
                <p className="lightbox-caption">"{eventItems[lightboxIndex].caption}"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Magazine Grid System ── */
        .magazine-layout {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .magazine-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        .col-stacked {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        @media (min-width: 900px) {
          .magazine-layout {
            gap: 72px;
          }
          .magazine-row.r1 {
            grid-template-columns: 1.35fr 1fr;
            gap: 40px;
          }
          .magazine-row.r2 {
            grid-template-columns: 1fr 1.35fr;
            gap: 40px;
          }
          .magazine-row.r3 {
            grid-template-columns: 1.35fr 1fr;
            gap: 40px;
          }
          .col-stacked {
            justify-content: space-between;
            gap: 40px;
          }
        }

        /* Hover effects */
        .magazine-item-container:hover .magazine-image {
          transform: scale(1.04);
        }
        .magazine-item-container:hover .magazine-hover-overlay {
          opacity: 1;
        }
        .magazine-item-container:hover .hover-line {
          width: 100% !important;
        }
        .magazine-item-container:hover .magazine-desc {
          color: var(--text-primary) !important;
        }

        /* Subtle film grain effect on images */
        .film-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(5,8,8,0.1) 0%, rgba(5,8,8,0.45) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* ── Lightbox Styles ── */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
        }

        .lightbox-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          z-index: 10;
        }

        .lightbox-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          padding: 4px 10px;
          border-radius: 4px;
        }

        .lightbox-close {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          color: #899393;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .lightbox-close:hover {
          color: #ffffff;
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
        }

        .lightbox-stage {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          margin: auto;
          gap: 20px;
          height: 55vh;
        }

        .lightbox-image-container {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 24px 70px rgba(0,0,0,0.9);
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          color: #899393;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .nav-btn:hover {
          color: #ffffff;
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
        }

        .lightbox-footer {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          z-index: 10;
        }

        .lightbox-footer-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .lightbox-number {
          display: block;
          font-size: 10px;
          font-weight: 700;
          color: #00E5CC;
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }

        .lightbox-title {
          font-family: var(--font-display);
          font-size: clamp(20px, 3.5vw, 26px);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .lightbox-caption {
          font-size: 15px;
          color: #899393;
          font-family: "'Instrument Serif', serif";
          font-style: italic;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .lightbox-stage {
            height: 40vh;
          }
          .nav-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
}
