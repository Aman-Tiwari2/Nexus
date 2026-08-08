"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

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

function RoadmapYear({ item, index, visible }: { item: typeof roadmap[0]; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono flex-shrink-0" style={{ color: "#808080", width: "24px" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#00e5cc", letterSpacing: "0.12em", fontSize: "10px", fontWeight: 600 }}>{item.year}</div>
            <div className="text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</div>
          </div>
        </div>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            border: `1px solid ${expanded ? "rgba(0,229,204,0.2)" : "rgba(255,255,255,0.15)"}`,
            color: expanded ? "#00e5cc" : "#a0a0a0",
          }}
        >
          {expanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>

      <div style={{ maxHeight: expanded ? "600px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div className="pb-6 grid sm:grid-cols-3 gap-6" style={{ paddingLeft: "40px" }}>
          {item.items.map((section) => (
            <div key={section.category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#c0c0c0", letterSpacing: "0.12em" }}>
                {section.category}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#a0a0a0" }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#555555" }} />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Roadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="roadmap" className="section-padding" style={{ background: "#0d0d0d" }}>
      <div className="section-container">
        <div className="section-tag text-center block w-full">Learning Path</div>
        <h2
          className="font-black text-white leading-[0.95] mb-10 mt-3 text-center"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            letterSpacing: "-0.03em",
          }}
        >
          Year-wise<br />
          <span style={{ color: "#00e5cc" }}>Roadmap</span>
        </h2>

        <div
          ref={sectionRef}
          className="max-w-4xl mx-auto"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {roadmap.map((item, i) => (
            <RoadmapYear key={item.year} item={item} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
