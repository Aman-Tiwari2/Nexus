"use client";

import { useRef, useEffect, useState } from "react";

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
    <section id="what-we-do" className="section-padding" style={{ background: "#111111" }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <div className="section-tag">What We Do</div>
            <h2
              className="font-black text-white leading-[0.95]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.03em",
                marginTop: "12px",
              }}
            >
              Everything You<br />
              Need to <span style={{ color: "#00e5cc" }}>Succeed</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed lg:text-right"
            style={{ color: "#a0a0a0", paddingBottom: "8px" }}
          >
            From coding contests to career guidance — a complete ecosystem for your placement journey.
          </p>
        </div>

        {/* Skill table rows — like reference portfolio */}
        <div ref={sectionRef}>
          {activities.map((item, i) => (
            <div
              key={item.num}
              className="skill-row group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              }}
            >
              {/* Number + Category */}
              <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 sm:min-w-[230px]">
                <span
                  className="flex-shrink-0 font-mono"
                  style={{ color: "#808080", fontSize: "12px", width: "28px" }}
                >
                  {item.num}
                </span>
                <span
                  className="font-bold text-white"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 flex-1">
                {item.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
