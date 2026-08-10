"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";

export interface FAQData {
  q: string;
  a: string;
  category: string;
}

export const faqs: FAQData[] = [
  {
    q: "What is Nexus Community?",
    a: "Nexus is a student-driven technical community founded in 2025. We focus on peer learning, hands-on software engineering, coding bootcamps, and top placement preparation.",
    category: "General",
  },
  {
    q: "Who can join Nexus?",
    a: "Nexus is open to all college students, aspiring developers, and tech enthusiasts passionate about building real-world software projects and cracking tech roles.",
    category: "Membership",
  },
  {
    q: "How does Nexus help students?",
    a: "We offer hands-on programming bootcamps, mock placement drives, technical workshops, open-source projects, and direct peer mentorship from experienced leads.",
    category: "Events",
  },
  {
    q: "What if I am a beginner in coding?",
    a: "No prior experience is required! We provide structured roadmap tracks from fundamental programming concepts to full-stack web development and system architecture.",
    category: "General",
  },
  {
    q: "Why should I join Nexus?",
    a: "You get access to dedicated domain teams, our proprietary testing portal (Vexta Suite), placement drives, hackathons, and a vibrant high-performing peer network.",
    category: "Membership",
  },
  {
    q: "How can I contribute to Nexus?",
    a: "You can participate in community builds, contribute open-source code, mentor junior members, or lead event management as part of our core team.",
    category: "General",
  },
  {
    q: "Do you provide placement support?",
    a: "Yes! We conduct comprehensive placement preparation bootcamps featuring DSA mock interviews, aptitude testing, English communication practice, and resume reviews.",
    category: "Placement",
  },
];

const categoryColors: Record<string, string> = {
  General: "#38bdf8",
  Membership: "#818cf8",
  Events: "#2dd4bf",
  Placement: "#fbbf24",
};

interface FAQItemProps {
  item: FAQData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ item, index, isOpen, onToggle }: FAQItemProps) {
  const color = categoryColors[item.category] || "#38bdf8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        borderRadius: "16px",
        background: isOpen ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.02)",
        border: `1px solid ${isOpen ? `${color}50` : "rgba(255, 255, 255, 0.08)"}`,
        boxShadow: isOpen ? `0 14px 36px -10px ${color}25` : "none",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          textAlign: "left",
          gap: "16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        aria-expanded={isOpen}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "12px",
              fontWeight: 900,
              color: color,
              flexShrink: 0,
              padding: "4px 10px",
              borderRadius: "8px",
              background: `${color}18`,
              border: `1px solid ${color}40`,
              letterSpacing: "0.05em",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "16px",
              color: isOpen ? "#ffffff" : "var(--text-primary)",
              lineHeight: 1.4,
              transition: "color 0.2s",
              fontFamily: "var(--font-display)",
            }}
          >
            {item.q}
          </span>
        </div>

        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: isOpen ? `${color}20` : "rgba(255,255,255,0.04)",
            border: `1px solid ${isOpen ? `${color}50` : "rgba(255,255,255,0.1)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: isOpen ? color : "var(--text-muted)",
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? (
            <Minus style={{ width: "14px", height: "14px" }} />
          ) : (
            <Plus style={{ width: "14px", height: "14px" }} />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingBottom: "22px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "18px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "#cbd5e1",
                  margin: 0,
                }}
              >
                {item.a}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "14px" }}>
                <CheckCircle2 style={{ width: "13px", height: "13px", color: color }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: color, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Verified Nexus Guide
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState("All Questions");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      return activeTab === "All Questions" || faq.category === activeTab;
    });
  }, [activeTab]);

  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1, width: "100%" }}>
        <div className="faq-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}>
          
          {/* ── Left Column: Sticky Header & Support Box ── */}
          <div>
            <div className="section-tag" style={{ marginBottom: "14px" }}>
              <HelpCircle style={{ width: "13px", height: "13px", display: "inline", marginRight: "6px" }} />
              Got Questions?
            </div>

            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(36px, 5vw, 58px)",
                lineHeight: 1.05,
                marginBottom: "20px",
              }}
            >
              Frequently<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Asked Questions.
              </span>
            </h2>

            <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "360px" }}>
              Find quick answers about joining Nexus, participating in bootcamps, and using our proprietary learning portal.
            </p>

            {/* Still Have Questions Box */}
            <div
              style={{
                padding: "24px",
                borderRadius: "18px",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                maxWidth: "360px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <MessageSquare style={{ width: "18px", height: "18px", color: "#38bdf8" }} />
                <span style={{ fontSize: "15px", fontWeight: 800, color: "#ffffff" }}>
                  Have more questions?
                </span>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "18px" }}>
                Our community team is available on Discord and email to assist you.
              </p>
              <a
                href="#contact"
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center", fontSize: "13px", padding: "10px 18px" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Ask via Contact Us</span>
                <ArrowRight style={{ width: "14px", height: "14px" }} />
              </a>
            </div>
          </div>

          {/* ── Right Column: FAQ Accordion List (STANDARD HIGH IMPACT SIZE) ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {filteredFaqs.map((faq, i) => (
              <FAQItem
                key={faq.q}
                item={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .faq-layout {
            grid-template-columns: 360px 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
