import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from "lucide-react";
import { blogs as fallbackBlogs, BlogPost } from "@/data/blogs";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

function getBlogs(): BlogPost[] {
  try {
    const filePath = path.join(process.cwd(), "data", "store", "blogs.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.error(e);
  }
  return fallbackBlogs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const list = getBlogs();
  const post = list.find((b) => b.slug === slug || b.id === slug);
  if (!post) return { title: "Blog Post Not Found — Nexus" };
  return {
    title: `${post.title} — Nexus Tech News`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const list = getBlogs();
  const post = list.find((b) => b.slug === slug || b.id === slug);
  if (!post) notFound();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        color: "var(--text-primary)",
      }}
    >
      {/* ── Top Navigation Bar ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(12,12,12,0.85)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="section-container"
          style={{
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/#blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            Back to Tech News
          </Link>
          <img src="/images/nexus_logo.png" alt="Nexus" style={{ height: "26px", objectFit: "contain" }} />
        </div>
      </div>

      {/* ── Article Header ── */}
      <div className="section-container" style={{ paddingTop: "48px", paddingBottom: "40px", maxWidth: "840px" }}>
        {/* Category Pill */}
        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#38bdf8",
              background: "rgba(56,189,248,0.12)",
              border: "1px solid rgba(56,189,248,0.3)",
            }}
          >
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#ffffff",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </h1>

        {/* Meta Author & Date Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(56,189,248,0.15)",
                border: "1px solid rgba(56,189,248,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User style={{ width: "18px", height: "18px", color: "#38bdf8" }} />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{post.author}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{post.authorRole}</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12.5px", color: "var(--text-muted)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar style={{ width: "13px", height: "13px" }} />
              {post.date}
            </span>
            <span>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock style={{ width: "13px", height: "13px" }} />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Feature Cover Image */}
        <div
          style={{
            marginTop: "32px",
            marginBottom: "40px",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            maxHeight: "420px",
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Article Body */}
        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "rgba(240,240,240,0.88)",
            whiteSpace: "pre-wrap",
          }}
        >
          {post.content}
        </div>
      </div>
    </div>
  );
}
