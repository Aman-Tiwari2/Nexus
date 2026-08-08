"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Sparkles, BookOpen, User } from "lucide-react";
import { BlogPost, blogs as fallbackBlogs } from "@/data/blogs";

const categoryColors: Record<string, string> = {
  "Artificial Intelligence": "#38bdf8",
  "Web Development": "#818cf8",
  "Quantum Tech": "#2dd4bf",
  "Cybersecurity": "#60a5fa",
  "Backend & DevOps": "#a78bfa",
};

export default function Blog() {
  const [blogList, setBlogList] = useState<BlogPost[]>(fallbackBlogs);

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogList(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="blog"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "-5%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="section-tag"
          style={{ marginBottom: "14px" }}
        >
          Tech Insights & News
        </motion.div>

        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "52px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(36px, 5.5vw, 68px)",
                lineHeight: 1.0,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Latest Tech<br />
              <span style={{ color: "var(--accent)" }}>Breakthroughs</span>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "14px",
                marginTop: "16px",
                maxWidth: "540px",
                lineHeight: 1.6,
              }}
            >
              Stay ahead of the curve with deep dives into AI models, web frameworks, quantum computing, and system architecture curated by the Nexus team.
            </p>
          </div>
        </div>

        {/* ── Blogs Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "28px",
          }}
        >
          {blogList.map((post, index) => {
            const catColor = categoryColors[post.category] || "#38bdf8";

            return (
              <motion.article
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  background: "rgba(16, 18, 24, 0.92)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${catColor}30`,
                  borderRadius: "18px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: `0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 ${catColor}20`,
                  transition: "all 0.3s ease",
                }}
              >
                {/* Thumbnail Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "190px",
                    overflow: "hidden",
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
                      background: "linear-gradient(to bottom, transparent 40%, rgba(16, 18, 24, 0.95) 100%)",
                    }}
                  />

                  {/* Category Pill */}
                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      padding: "5px 12px",
                      borderRadius: "999px",
                      fontSize: "10.5px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#ffffff",
                      background: `${catColor}35`,
                      border: `1px solid ${catColor}60`,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Content Box */}
                <div style={{ padding: "24px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Meta date & read time */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "11.5px", color: "var(--text-muted)", marginBottom: "12px" }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <Clock style={{ width: "12px", height: "12px" }} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(16px, 1.8vw, 19px)",
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1.35,
                      marginBottom: "12px",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.65,
                      color: "var(--text-secondary)",
                      marginBottom: "20px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Footer Author & Link */}
                  <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                        }}
                      >
                        <User style={{ width: "13px", height: "13px", color: catColor }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>{post.author}</div>
                        <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{post.authorRole}</div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: catColor,
                        textDecoration: "none",
                        transition: "gap 0.2s",
                      }}
                    >
                      Read
                      <ArrowRight style={{ width: "13px", height: "13px" }} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
