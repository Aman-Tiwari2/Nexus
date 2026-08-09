"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, ArrowRight, User, Sparkles, BookOpen, ArrowUpRight, Cpu } from "lucide-react";
import { BlogPost, blogs as fallbackBlogs } from "@/data/blogs";

const categoryColors: Record<string, string> = {
  "Artificial Intelligence": "#38bdf8",
  "Web Development": "#818cf8",
  "Quantum Tech": "#2dd4bf",
  "Cybersecurity": "#60a5fa",
  "Backend & DevOps": "#a78bfa",
};

// ── SCROLL-DRIVEN CONTINUOUS CARD COMPONENT ──
function BlogCardItem({
  post,
  index,
  catColor,
  isLeft,
  itemNumber,
}: {
  post: BlogPost;
  index: number;
  catColor: string;
  isLeft: boolean;
  itemNumber: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "end 5%"],
  });

  // Smooth continuous card transitions with 3D tilt-to-straight entry:
  // 0 -> 0.28: Enters tilted (-10deg / +10deg, rotateX 18deg) and smooth Fade IN
  // 0.28 -> 0.62: Straightens out (rotate 0deg, rotateX 0deg) & 100% Sharp in center
  // 0.62 -> 0.92: Smooth Fade OUT near upper screen
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.62, 0.92], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.62, 0.92], [0.88, 1, 1, 0.88]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.28, 0.62, 0.92],
    [isLeft ? -10 : 10, 0, 0, isLeft ? 5 : -5]
  );
  const rotateX = useTransform(scrollYProgress, [0, 0.28, 0.62, 0.92], [18, 0, 0, 8]);
  const y = useTransform(scrollYProgress, [0, 0.28, 0.62, 0.92], [40, 0, 0, -40]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        scale,
        rotate,
        rotateX,
        y,
        width: "100%",
        maxWidth: "390px",
        alignSelf: isLeft ? "flex-start" : "flex-end",
        marginLeft: isLeft ? "0" : "auto",
        marginRight: isLeft ? "auto" : "0",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(10, 14, 24, 0.94)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          borderLeft: isLeft ? `4px solid ${catColor}` : "1.5px solid rgba(255, 255, 255, 0.12)",
          borderRight: !isLeft ? `4px solid ${catColor}` : "1.5px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "20px",
          padding: "22px 22px 18px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(56, 189, 248, 0.1)",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="pinned-blog-card"
      >
        {/* Thumbnail Image Banner */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "145px",
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "16px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 35%, rgba(10, 14, 24, 0.95) 100%)",
            }}
          />

          {/* Category Tag Pill Overlay */}
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              padding: "4px 10px",
              borderRadius: "999px",
              fontSize: "9.5px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ffffff",
              background: `${catColor}40`,
              border: `1px solid ${catColor}70`,
              backdropFilter: "blur(8px)",
            }}
          >
            {post.category}
          </span>

          {/* Numeric Index Tag Overlay */}
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontFamily: "monospace",
              fontSize: "12px",
              fontWeight: 800,
              color: "#f97316",
              letterSpacing: "0.1em",
              background: "rgba(8, 11, 17, 0.85)",
              padding: "3px 8px",
              borderRadius: "6px",
              border: "1px solid rgba(249, 115, 22, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            {itemNumber}
          </span>
        </div>

        {/* Header Row: Title */}
        <div style={{ marginBottom: "10px" }}>
          <h3
            style={{
              fontFamily: "monospace, var(--font-display)",
              fontSize: "clamp(16px, 1.8vw, 18.5px)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {post.title.toUpperCase()}.
          </h3>
        </div>

        {/* Excerpt Body */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            marginBottom: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        {/* Footer: Author & Read Link */}
        <div
          style={{
            paddingTop: "12px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: `${catColor}20`,
                border: `1px solid ${catColor}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: catColor,
              }}
            >
              <User style={{ width: "12px", height: "12px" }} />
            </div>
            <div>
              <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#ffffff" }}>{post.author}</div>
              <div style={{ fontSize: "9.5px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                <span>{post.date}</span>
                <span>•</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                  <Clock style={{ width: "9px", height: "9px" }} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11.5px",
              fontWeight: 800,
              color: catColor,
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "10px",
              background: `${catColor}15`,
              border: `1px solid ${catColor}35`,
              transition: "all 0.25s ease",
            }}
            className="pinned-read-btn"
          >
            <span>Read</span>
            <ArrowRight style={{ width: "12px", height: "12px" }} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Blog() {
  const [blogList, setBlogList] = useState<BlogPost[]>(fallbackBlogs.slice(0, 5));

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogList(data.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="blog"
      className="relative"
      style={{
        background: "#050811",
        minHeight: "280vh", // Tight balanced height for continuous smooth scroll
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* ── 1. CENTERED PINNED BACKDROP HEADER (HIGH-IMPACT IMPRESSIVE STYLE) ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1,
          padding: "0 20px",
        }}
      >
        {/* Ambient radial lighting aura */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1000px",
            height: "1000px",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(167, 139, 250, 0.08) 50%, transparent 75%)",
            filter: "blur(140px)",
            zIndex: 0,
          }}
        />

        {/* Ambient Grid Lines overlay for futuristic aesthetic */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.4,
            zIndex: 0,
          }}
        />

        <div style={{ textAlign: "center", maxWidth: "960px", position: "relative", zIndex: 1 }}>
          {/* Eyebrow Tag Pill */}
          <div
            style={{
              fontSize: "11.5px",
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#38bdf8",
              marginBottom: "18px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "999px",
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              boxShadow: "0 0 22px rgba(56, 189, 248, 0.22)",
            }}
          >
            <Cpu style={{ width: "14px", height: "14px", color: "#38bdf8" }} />
            // TECH INSIGHTS & KNOWLEDGE SPHERE
          </div>

          {/* Main Backdrop Display Heading */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8.2vw, 110px)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
              margin: 0,
              userSelect: "none",
            }}
          >
            <span
              style={{
                color: "rgba(255, 255, 255, 0.25)",
                WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.45)",
              }}
            >
              LATEST TECH
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, rgba(56, 189, 248, 0.55) 0%, rgba(167, 139, 250, 0.45) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "1.5px rgba(56, 189, 248, 0.7)",
                filter: "drop-shadow(0 0 35px rgba(56, 189, 248, 0.35))",
              }}
            >
              BREAKTHROUGHS.
            </span>
          </h2>

          <p
            style={{
              fontSize: "14.5px",
              fontWeight: 600,
              lineHeight: 1.7,
              color: "rgba(226, 232, 240, 0.65)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              maxWidth: "540px",
              margin: "24px auto 0 auto",
            }}
          >
            Discover SOTA AI Models, Web Engineering & System Architecture Deep Dives
          </p>

          <div style={{ marginTop: "24px", pointerEvents: "auto" }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(167, 139, 250, 0.15) 100%)",
                border: "1px solid rgba(56, 189, 248, 0.45)",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)",
                transition: "all 0.3s ease",
              }}
              className="backdrop-hub-btn"
            >
              <BookOpen style={{ width: "14px", height: "14px", color: "#38bdf8" }} />
              <span>Explore News & Study Hub</span>
              <ArrowUpRight style={{ width: "14px", height: "14px" }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. SCROLLING CARDS LAYER (TIGHT CONTINUOUS FLOW OVER FIXED BACKDROP) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          marginTop: "-100vh",
          paddingTop: "50vh",
          paddingBottom: "50vh",
        }}
      >
        <div className="section-container" style={{ perspective: "1200px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "80px", // Tight 80px gap so next card enters immediately after previous one
            }}
          >
            {blogList.map((post, index) => {
              const catColor = categoryColors[post.category] || "#38bdf8";
              const isLeft = index % 2 === 0;
              const itemNumber = `[0${index + 1}]`;

              return (
                <BlogCardItem
                  key={post.id || post.slug}
                  post={post}
                  index={index}
                  catColor={catColor}
                  isLeft={isLeft}
                  itemNumber={itemNumber}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .pinned-blog-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(56, 189, 248, 0.6) !important;
          box-shadow: 0 30px 75px rgba(0, 0, 0, 0.85), 0 0 45px rgba(56, 189, 248, 0.25) !important;
        }

        .pinned-read-btn:hover {
          background: rgba(56, 189, 248, 0.35) !important;
          color: #ffffff !important;
          border-color: #38bdf8 !important;
          transform: translateX(3px);
        }

        .backdrop-hub-btn:hover {
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(167, 139, 250, 0.25) 100%) !important;
          box-shadow: 0 0 35px rgba(56, 189, 248, 0.45) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
