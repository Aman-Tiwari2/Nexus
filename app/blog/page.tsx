"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Search, Sparkles, User, Tag, ArrowRight, CheckCircle2, FileText, Code2, Brain } from "lucide-react";
import { blogs as fallbackBlogs, BlogPost } from "@/data/blogs";

const categories = [
  "All Topics",
  "Artificial Intelligence",
  "Web Development",
  "Cybersecurity",
  "Quantum Tech",
  "Backend & DevOps",
];

export default function BlogHubPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(fallbackBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllPosts(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Topics" || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b11",
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(96,165,250,0.08) 0%, transparent 60%)",
        color: "var(--text-primary)",
      }}
    >
      {/* ── Top Header Bar ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8, 11, 17, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div
          className="section-container"
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-secondary)",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <ArrowLeft style={{ width: "14px", height: "14px" }} />
              Back to Home
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/images/nexus_logo.png" alt="Nexus" style={{ height: "30px", width: "auto" }} />
              <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.1em" }}>
                STUDY HUB
              </span>
            </div>
          </div>

          <a
            href="https://vexta.collegecrm.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, var(--accent) 0%, #2563eb 100%)",
              color: "#ffffff",
              fontSize: "12.5px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(96,165,250,0.3)",
            }}
          >
            Practice Online Tests ↗
          </a>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="section-container" style={{ paddingTop: "48px", paddingBottom: "80px" }}>
        {/* Banner Section */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 48px auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(96,165,250,0.1)",
              border: "1px solid rgba(96,165,250,0.25)",
              color: "#60a5fa",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            <Sparkles style={{ width: "14px", height: "14px" }} />
            Nexus Knowledge & Study Portal
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Learn, Master & Excel in <br />
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Modern Tech & Placements
            </span>
          </h1>

          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--text-secondary)" }}>
            Deep-dive guides, DSA problem breakdowns, AI breakthroughs, and system design roadmaps crafted by senior student leads.
          </p>
        </div>

        {/* Search & Category Toolbar */}
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: "relative",
                flex: "1 1 300px",
                maxWidth: "420px",
              }}
            >
              <Search
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search study guides, topics, or authors..."
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 42px",
                  borderRadius: "12px",
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Showing <strong style={{ color: "#ffffff" }}>{filteredPosts.length}</strong> study articles
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontSize: "12.5px",
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? "rgba(96,165,250,0.18)" : "rgba(255,255,255,0.03)",
                    color: isActive ? "#60a5fa" : "var(--text-secondary)",
                    border: `1px solid ${isActive ? "#60a5fa" : "rgba(255,255,255,0.08)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "24px",
          }}
        >
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              style={{
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              className="study-card"
            >
              <div>
                {/* Image header */}
                <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: "rgba(8, 11, 17, 0.85)",
                      backdropFilter: "blur(8px)",
                      color: "#38bdf8",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)", marginBottom: "10px" }}>
                    <Clock style={{ width: "13px", height: "13px" }} />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#ffffff",
                      lineHeight: 1.35,
                      marginBottom: "10px",
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "13.5px",
                      lineHeight: 1.65,
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: "20px",
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(8, 11, 17, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(96,165,250,0.15)",
                      border: "1px solid rgba(96,165,250,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#60a5fa",
                    }}
                  >
                    <User style={{ width: "14px", height: "14px" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff" }}>{post.author}</div>
                    <div style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>{post.authorRole}</div>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    color: "#60a5fa",
                    textDecoration: "none",
                  }}
                >
                  Read & Study
                  <ArrowRight style={{ width: "13px", height: "13px" }} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <style>{`
        .study-card:hover {
          transform: translateY(-6px);
          border-color: rgba(96, 165, 250, 0.4) !important;
          box-shadow: 0 16px 40px rgba(96, 165, 250, 0.12);
        }
      `}</style>
    </div>
  );
}
