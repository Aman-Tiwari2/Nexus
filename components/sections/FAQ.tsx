"use client";

import { useState, useMemo } from "react";
import { Plus, Minus, HelpCircle, MessageSquare, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    category: "Onboarding",
    q: "What is Nexus Community?",
    a: "Nexus Community is a student-led community where students connect, learn, collaborate, participate in activities, and explore opportunities beyond the classroom.",
  },
  {
    category: "Onboarding",
    q: "Who can join Nexus?",
    a: "Students who meet the community's membership requirements can join. It is open to passionate learners who want to build skills and grow.",
  },
  {
    category: "Learning & Bootcamps",
    q: "How does Nexus help students?",
    a: "Nexus provides opportunities for learning, peer interaction, technical activities, mentorship, live bootcamps, and community initiatives.",
  },
  {
    category: "Learning & Bootcamps",
    q: "What if I am a beginner in coding?",
    a: "You can start with beginner-friendly sessions and hands-on bootcamps suitable for your current level, learning alongside helpful peers.",
  },
  {
    category: "Learning & Bootcamps",
    q: "Why should I join Nexus?",
    a: "Nexus gives students a dedicated space to learn with peers, participate in real coding challenges, build projects, and explore career opportunities.",
  },
  {
    category: "Vexta & Support",
    q: "How can I contribute to Nexus?",
    a: "Students can contribute by participating in events, volunteering for initiatives, sharing prep ideas, creating content, or taking up lead roles within the community.",
  },
  {
    category: "Vexta & Support",
    q: "Do you provide placement support?",
    a: "Nexus supports students through learning resources, peer guidance, mock interviews, and mentorship. It provides preparation ecosystems without placement guarantees.",
  },
  {
    category: "Onboarding",
    q: "Can I join Nexus as a fresher?",
    a: "Yes! Nexus is designed to help freshers connect with seniors, understand technical roadmaps early, and explore community activities.",
  },
  {
    category: "Vexta & Support",
    q: "How can I get started today?",
    a: "Join the community through our official portal link, complete your student profile, and take part in upcoming sessions and initiatives.",
  },
];

const categoryTabs = ["All Questions", "Onboarding", "Learning & Bootcamps", "Vexta & Support"];

const themeColors = ["#38bdf8", "#818cf8", "#2dd4bf", "#60a5fa", "#a78bfa", "#34d399"];

function FAQItem({ item, index, isOpen, onToggle }: { item: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) {
  const color = themeColors[index % themeColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={{
        borderRadius: "16px",
        border: `1.5px solid ${isOpen ? `${color}50` : "rgba(255,255,255,0.07)"}`,
        background: isOpen ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.018)",
        backdropFilter: "blur(12px)",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isOpen ? `0 12px 35px ${color}15` : "none",
        marginBottom: "12px",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
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
              fontSize: "15.5px",
              color: isOpen ? "#ffffff" : "var(--text-primary)",
              lineHeight: 1.45,
              transition: "color 0.2s",
              fontFamily: "var(--font-display)",
            }}
          >
            {item.q}
          </span>
        </div>

        <div
          style={{
            width: "30px",
            height: "30px",
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
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "14.5px",
                  lineHeight: 1.8,
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
      style={{ background: "var(--bg-primary)" }}
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

      <div className="section-container relative" style={{ zIndex: 1 }}>
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
                fontSize: "clamp(38px, 5vw, 62px)",
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
                Asked Questions
              </span>
            </h2>

            <p style={{ fontSize: "14.5px", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "340px" }}>
              Find quick answers about joining Nexus, participating in bootcamps, and using our proprietary learning portal.
            </p>

            {/* Still Have Questions Box */}
            <div
              style={{
                padding: "24px",
                borderRadius: "18px",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                maxWidth: "340px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <MessageSquare style={{ width: "18px", height: "18px", color: "#38bdf8" }} />
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>
                  Have more questions?
                </span>
              </div>
              <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "16px" }}>
                Our community team is available on Discord and email to assist you.
              </p>
              <a
                href="#contact"
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center", fontSize: "12.5px", padding: "8px 16px" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Support Team
                <ChevronRight style={{ width: "14px", height: "14px" }} />
              </a>
            </div>
          </div>

          {/* ── Right Column: Category Tabs & FAQ Accordion Cards ── */}
          <div>
            {/* Category Filter Tabs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "28px",
              }}
            >
              {categoryTabs.map((tab) => {
                const isTabActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: isTabActive ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.08)",
                      background: isTabActive ? "rgba(56, 189, 248, 0.15)" : "rgba(255,255,255,0.02)",
                      color: isTabActive ? "#38bdf8" : "var(--text-secondary)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* FAQ Accordion List */}
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
            gap: 64px !important;
          }
        }
      `}</style>
    </section>
  );
}
