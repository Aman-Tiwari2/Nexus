"use client";

import { useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = [
  { id: 1, title: "Registration Desk", category: "Community", image: "/images/gallery/moment1.jpg" },
  { id: 2, title: "Bootcamp Session", category: "Workshop", image: "/images/gallery/moment2.jpg" },
  { id: 3, title: "Achievement & Awards", category: "Celebration", image: "/images/gallery/moment3.jpg" },
  { id: 4, title: "Core Team Meet", category: "Community", image: "/images/gallery/moment4.jpg" },
  { id: 5, title: "Speaker Session", category: "Event", image: "/images/gallery/moment5.jpg" },
  { id: 6, title: "Orientation Session", category: "Event", image: "/images/gallery/moment6.jpg" },
  { id: 7, title: "Interactive Lab", category: "Workshop", image: "/images/gallery/moment7.jpg" },
];

const categories = ["All", "Community", "Workshop", "Event", "Celebration"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxItem(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0,229,204,0.03) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* Header & Filter Pills */}
        <div style={{ marginBottom: "48px" }}>
          <div className="section-tag">Gallery</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "20px",
              marginTop: "8px",
            }}
          >
            <h2
              className="heading-display"
              style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
            >
              Community<br />
              <span style={{ color: "var(--accent)" }}>Moments</span>
            </h2>

            {/* Filter buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.04em",
                      background: isActive ? "rgba(0, 229, 204, 0.12)" : "rgba(255,255,255,0.02)",
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      border: `1px solid ${isActive ? "rgba(0, 229, 204, 0.3)" : "var(--border)"}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Clean, Uniform Aspect-Ratio Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "20px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => setLightboxItem(item)}
                style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                }}
                className="gallery-card-group"
              >
                {/* Image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.5s ease",
                  }}
                  className="gallery-img"
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(12,12,12,0.85) 0%, rgba(12,12,12,0.2) 50%, rgba(12,12,12,0.05) 100%)",
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    zIndex: 2,
                  }}
                >
                  {/* Top: Category pill */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "5px 12px",
                        borderRadius: "999px",
                        background: "rgba(12, 12, 12, 0.75)",
                        backdropFilter: "blur(8px)",
                        color: "var(--accent)",
                        border: "1px solid rgba(0, 229, 204, 0.2)",
                      }}
                    >
                      {item.category}
                    </span>
                    
                    {/* Zoom Icon Button */}
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(12, 12, 12, 0.6)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        transition: "all 0.2s ease",
                      }}
                      className="zoom-icon-btn"
                    >
                      <ZoomIn style={{ width: "14px", height: "14px" }} />
                    </div>
                  </div>

                  {/* Bottom: Title */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.3,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lightbox-overlay"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                padding: "24px",
                maxWidth: "680px",
                width: "calc(100% - 32px)",
                position: "relative",
                boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
              }}
            >
              <button
                onClick={() => setLightboxItem(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  background: "var(--bg-elevated)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  zIndex: 10,
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
                <X style={{ width: "15px", height: "15px" }} />
              </button>

              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "12px",
                  backgroundImage: `url(${lightboxItem.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: "20px",
                  border: "1px solid var(--border)",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                    {lightboxItem.title}
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "rgba(0,229,204,0.08)",
                    color: "var(--accent)",
                    border: "1px solid rgba(0,229,204,0.2)",
                  }}
                >
                  {lightboxItem.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-card-group:hover .gallery-img {
          transform: scale(1.05);
        }
        .gallery-card-group:hover .zoom-icon-btn {
          background: var(--accent) !important;
          color: #0c0c0c !important;
          border-color: var(--accent) !important;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}
