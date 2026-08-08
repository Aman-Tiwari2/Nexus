"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const numberColors = ["#2f81ff", "#3b82f6", "#60a5fa", "#2f81ff", "#3b82f6", "#60a5fa"];

const faqs = [
  { q: "What is Nexus Community?", a: "Nexus Community is a student-led community where students connect, learn, collaborate, participate in activities, and explore opportunities beyond the classroom." },
  { q: "Who can join Nexus?", a: "Students who meet the community's actual membership requirements can join." },
  { q: "How does Nexus help students?", a: "Nexus provides opportunities for learning, peer interaction, technical activities, mentorship, events, and community participation." },
  { q: "What if I am a beginner?", a: "You can start with the activities and sessions suitable for your current level and learn alongside other students." },
  { q: "Why should I join Nexus?", a: "Nexus gives students a space to learn with peers, participate in activities, build skills, and explore new opportunities." },
  { q: "How can I contribute to Nexus?", a: "Students can contribute by participating in events, volunteering for initiatives, sharing ideas, creating content, or taking up responsibilities within the community." },
  { q: "Do you provide placement support?", a: "Nexus can support students through learning resources, peer guidance, preparation activities, and mentorship. It does not guarantee placement." },
  { q: "Can I join Nexus as a fresher?", a: "Yes, if freshers are eligible under the community's membership rules. Nexus can help new students connect with peers and explore community activities." },
  { q: "How can I get started?", a: "Join the community through the official link and take part in the upcoming activities, sessions, and initiatives." },
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
