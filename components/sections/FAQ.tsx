"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const numberColors = ["#8b5cf6", "#00e5cc", "#3b82f6", "#fbbf24", "#ec4899", "#10b981"];

const faqs = [
  { q: "Who can join Nexus?", a: "Any college student from any year or branch can join Nexus. We welcome everyone from first-year freshers to final-year students. The earlier you join, the more you benefit from our structured roadmaps." },
  { q: "Is there a membership fee?", a: "Nexus is completely free to join. We believe every student deserves access to quality placement preparation resources regardless of their financial background." },
  { q: "How are events conducted?", a: "Events are conducted both online and offline depending on the format. Coding contests and aptitude tests use our platform at vexta.collegecrm.in, while hackathons and workshops are usually in-person at college." },
  { q: "What if I'm a complete beginner?", a: "Perfect! We specifically cater to students who don't know where to start. Our roadmaps begin from the basics and we pair beginners with senior mentors for personalized guidance." },
  { q: "How are mock interviews conducted?", a: "Mock interviews are scheduled sessions with senior Nexus members who have already been placed. They simulate real technical and HR rounds, provide detailed feedback, and suggest areas to improve." },
  { q: "Do you provide certificates?", a: "Yes! Participants in our coding contests, bootcamps, and hackathons receive digital certificates that can be added to resumes and LinkedIn profiles." },
  { q: "Can I contribute to Nexus as a senior?", a: "Absolutely! Placed students and seniors are our backbone. You can mentor juniors, conduct sessions, set contest problems, or serve on our core team. Your experience is invaluable." },
  { q: "How do I register for events?", a: "Events are announced on our community channels and you can register through our platform at vexta.collegecrm.in. Make sure to follow our social media for timely updates." },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0",
          textAlign: "left",
          gap: "16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        aria-expanded={open}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              fontWeight: 800,
              color: numberColors[index % numberColors.length],
              flexShrink: 0,
              padding: "3px 8px",
              borderRadius: "6px",
              background: `${numberColors[index % numberColors.length]}12`,
              border: `1px solid ${numberColors[index % numberColors.length]}30`,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontWeight: 600,
              fontSize: "14.5px",
              color: open ? "var(--text-primary)" : "rgba(240,240,240,0.85)",
              lineHeight: 1.4,
              transition: "color 0.2s",
            }}
          >
            {item.q}
          </span>
        </div>

        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: `1px solid ${open ? "rgba(0,229,204,0.25)" : "var(--border)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: open ? "var(--accent)" : "var(--text-muted)",
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          {open
            ? <Minus style={{ width: "11px", height: "11px" }} />
            : <Plus style={{ width: "11px", height: "11px" }} />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: "13.5px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                paddingLeft: "36px",
                paddingBottom: "20px",
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
          className="faq-layout"
        >
          {/* ── Left: heading ── */}
          <div>
            <div className="section-tag">FAQ</div>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                marginTop: "10px",
                marginBottom: "16px",
              }}
            >
              Frequently<br />Asked
            </h2>
            <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "28px", maxWidth: "280px" }}>
              Have a question that isn&apos;t answered here? Feel free to reach out to us directly.
            </p>
            <a
              href="#contact"
              className="btn-secondary"
              style={{ fontSize: "13px", padding: "9px 20px" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Us
            </a>
          </div>

          {/* ── Right: FAQ list ── */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .faq-layout {
            grid-template-columns: 280px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
