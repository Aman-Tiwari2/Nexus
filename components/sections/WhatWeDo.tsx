"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const activities = [
  { num: "01", category: "Coding", tags: ["Contests", "DSA Sessions", "Code Reviews", "LeetCode Sprints"] },
  { num: "02", category: "Placement Prep", tags: ["Mock Interviews", "Resume Workshops", "HR Rounds", "Aptitude Training"] },
  { num: "03", category: "Hackathons", tags: ["24hr Builds", "Team Projects", "Industry Mentors", "Prizes"] },
  { num: "04", category: "Web Development", tags: ["React", "Node.js", "Full-Stack Projects", "Deployment"] },
  { num: "05", category: "Soft Skills", tags: ["Communication", "Leadership", "Presentations", "Group Discussions"] },
  { num: "06", category: "AI & Emerging Tech", tags: ["ML Workshops", "NLP", "AI Tools", "Research Papers"] },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="what-we-do" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
          <div className="section-tag">What We Do</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <h2
              className="heading-display"
              style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
            >
              Everything You<br />
              Need to <span style={{ color: "var(--accent)" }}>Succeed</span>
            </h2>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "380px",
              }}
            >
              From coding contests to career guidance — a complete ecosystem designed for your placement journey.
            </p>
          </div>
        </div>

        {/* Clean, Perfectly Spaced Skill Rows */}
        <div ref={sectionRef} style={{ borderTop: "1px solid var(--border)" }}>
          {activities.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
                padding: "20px 0",
                borderBottom: "1px solid var(--border)",
                alignItems: "center",
              }}
              className="what-we-do-row group"
            >
              {/* Category + Number */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--accent)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(0, 229, 204, 0.08)",
                    border: "1px solid rgba(0, 229, 204, 0.2)",
                    flexShrink: 0,
                  }}
                >
                  {item.num}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(17px, 2vw, 22px)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {item.category}
                </h3>
              </div>

              {/* Skill Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {item.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .what-we-do-row {
            grid-template-columns: 280px 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
