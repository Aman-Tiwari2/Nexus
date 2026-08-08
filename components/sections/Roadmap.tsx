"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roadmap = [
  {
    year: "1st Year",
    title: "Build Your Foundation",
    items: [
      { category: "Programming", tasks: ["Learn C or Python basics", "Understand arrays, strings, loops", "Start with simple problem solving on HackerRank"] },
      { category: "Aptitude", tasks: ["Basic maths & arithmetic", "Start solving simple reasoning problems", "Join Nexus aptitude practice sessions"] },
      { category: "Soft Skills", tasks: ["Improve English communication", "Learn presentation skills", "Participate in club activities"] },
    ],
  },
  {
    year: "2nd Year",
    title: "Strengthen DSA & Projects",
    items: [
      { category: "DSA", tasks: ["Arrays, Linked Lists, Trees, Graphs", "Sorting, Searching, Recursion", "Solve 100+ problems on LeetCode/GFG"] },
      { category: "Development", tasks: ["Pick a tech stack (Web/App/ML)", "Build 1-2 projects end-to-end", "Learn Git & GitHub"] },
      { category: "Competitive", tasks: ["Join monthly Nexus Coding Contests", "Participate in Codeforces/CodeChef rounds", "Target Div 3-4 level problems"] },
    ],
  },
  {
    year: "3rd Year",
    title: "Internships & Advanced Skills",
    items: [
      { category: "Internships", tasks: ["Apply for summer internships", "Prepare specifically for intern roles", "Use Nexus alumni network for referrals"] },
      { category: "Advanced DSA", tasks: ["Dynamic Programming", "Advanced Graphs, Segment Trees", "System Design basics"] },
      { category: "Placement Prep", tasks: ["Mock interviews with Nexus seniors", "ATS-optimized resume building", "Practice company-specific patterns"] },
    ],
  },
  {
    year: "Final Year",
    title: "Crack Your Dream Placement",
    items: [
      { category: "On-Campus", tasks: ["Register for all drives through college", "Attend Nexus Mock Placement Drive", "Track application statuses"] },
      { category: "Off-Campus", tasks: ["Apply via LinkedIn, Naukri, company websites", "Target FAANG & dream companies", "Leverage Nexus alumni connections"] },
      { category: "Final Polish", tasks: ["Complete LinkedIn profile optimization", "Prepare HR round answers", "Post-offer negotiation guidance"] },
    ],
  },
];

function RoadmapYear({ item, index }: { item: typeof roadmap[0]; index: number }) {
  const [expanded, setExpanded] = useState(index < 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <button
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 0",
          textAlign: "left",
          gap: "16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "10.5px",
              color: "var(--text-muted)",
              flexShrink: 0,
              width: "22px",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <div
              style={{
                fontSize: "9.5px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "5px",
              }}
            >
              {item.year}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(15px, 2vw, 18px)",
                fontWeight: 700,
                color: expanded ? "var(--text-primary)" : "rgba(240,240,240,0.85)",
                lineHeight: 1.2,
                transition: "color 0.2s",
              }}
            >
              {item.title}
            </div>
          </div>
        </div>

        <div
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            border: `1px solid ${expanded ? "rgba(0,229,204,0.25)" : "var(--border)"}`,
            color: expanded ? "var(--accent)" : "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          {expanded ? <Minus style={{ width: "12px", height: "12px" }} /> : <Plus style={{ width: "12px", height: "12px" }} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                paddingBottom: "24px",
                paddingLeft: "clamp(12px, 4vw, 42px)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
                  gap: "24px",
                  paddingTop: "4px",
                }}
              >
                {item.items.map((section) => (
                  <div key={section.category}>
                    <h4
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--text-primary)",
                        marginBottom: "14px",
                        paddingBottom: "8px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {section.category}
                    </h4>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {section.tasks.map((task, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            fontSize: "12.5px",
                            lineHeight: 1.55,
                            color: "var(--text-secondary)",
                          }}
                        >
                          <span
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: "var(--accent)",
                              flexShrink: 0,
                              marginTop: "7px",
                            }}
                          />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-container">
        <div className="section-tag">Learning Path</div>
        <h2
          className="heading-display"
          style={{ fontSize: "clamp(36px, 5.5vw, 68px)", marginTop: "8px", marginBottom: "52px" }}
        >
          Year-wise<br />
          <span style={{ color: "var(--accent)" }}>Roadmap</span>
        </h2>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {roadmap.map((item, i) => (
            <RoadmapYear key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
