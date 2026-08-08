"use client";

import { useRef, useState, useEffect } from "react";
import { Mail, MapPin, Send, Instagram, Github, Linkedin, Users, Headset } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputBase: React.CSSProperties = {
    background: "rgba(5, 8, 8, 0.6)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    color: "var(--text-primary)",
    padding: "11px 14px",
    fontSize: "13.5px",
    outline: "none",
    width: "100%",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    fontFamily: "var(--font-body)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "var(--text-muted)",
    marginBottom: "7px",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 229, 204, 0.6)";
    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(0, 229, 204, 0.15)";
    (e.currentTarget as HTMLElement).style.background = "rgba(5, 8, 8, 0.8)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
    (e.currentTarget as HTMLElement).style.boxShadow = "none";
    (e.currentTarget as HTMLElement).style.background = "rgba(5, 8, 8, 0.6)";
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>

        {/* ── Header ── */}
        <div className="section-tag" style={{ color: "#00E5CC" }}>Contact</div>
        <h2
          className="heading-display"
          style={{ fontSize: "clamp(36px, 5.5vw, 68px)", marginTop: "8px", marginBottom: "52px" }}
        >
          Get In<br />
          <span style={{ 
            background: "linear-gradient(135deg, #00E5CC 0%, #00A8FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>Touch</span>
        </h2>

        {/* ── Content layout wrapper ── */}
        <div
          ref={sectionRef}
          className="contact-layout-wrapper"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Left Side: Contact Info & Form */}
          <div className="contact-content-container">
            {/* Info details */}
            <div className="contact-info-panel">
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "36px", maxWidth: "380px" }}>
                Whether you&apos;re a student looking to join, a company interested in
                collaborating, or a senior wanting to mentor — we&apos;d love to hear from you.
              </p>

              {/* Contact details nodes */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
                {[
                  { icon: Mail, label: "Email", value: "nexus@college.edu", color: "#00E5CC" },
                  { icon: Users, label: "Community", value: "discord.gg/nexus", color: "#00A8FF" },
                  { icon: Headset, label: "Support", value: "support.nexus.com", color: "#8B5CF6" },
                  { icon: MapPin, label: "Location", value: "SRMCEM, Lucknow", color: "#00E5CC" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: `${color}15`,
                        border: `1px solid ${color}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: color,
                      }}
                    >
                      <Icon style={{ width: "15px", height: "15px" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          marginBottom: "2px",
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontSize: "13.5px", color: "var(--text-primary)" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <div
                  style={{
                    fontSize: "9.5px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "12px",
                  }}
                >
                  Follow Us
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    { icon: Instagram, href: "https://www.instagram.com/nexuscommunity___?igsh=MXNmZW5xYXk1ZmoyeQ==", label: "Instagram" },
                    { icon: Github, href: "https://github.com", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/company/nexus-23176/", label: "LinkedIn" },
                    { icon: Mail, href: "mailto:nexus@college.edu", label: "Email" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--text-secondary)",
                        transition: "color 0.18s, border-color 0.18s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#00E5CC";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 229, 204, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      }}
                    >
                      <Icon style={{ width: "14px", height: "14px" }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Aryan Sharma"
                    required
                    style={inputBase}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="aryan@email.com"
                    required
                    style={inputBase}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  required
                  style={inputBase}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more..."
                  required
                  rows={6}
                  style={{ ...inputBase, resize: "none" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                style={{
                  alignSelf: "flex-start",
                  marginTop: "4px",
                  background: "linear-gradient(135deg, #00E5CC 0%, #00A8FF 100%)",
                  color: "#050808",
                  boxShadow: "0 4px 20px rgba(0, 229, 204, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  lineHeight: "1",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 150ms ease, background 150ms ease, box-shadow 150ms ease",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0, 229, 204, 0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0, 229, 204, 0.35)";
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {sent ? (
                  "✓ Message Sent!"
                ) : sending ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        border: "2px solid rgba(0,0,0,0.15)",
                        borderTopColor: "#050808",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send style={{ width: "14px", height: "14px" }} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side: Spacer to display the Communication Hub core */}
          <div className="contact-visual-spacer" />
        </div>
      </div>

      <style>{`
        #contact {
          position: relative;
          background-color: #050808;
          background-image: linear-gradient(to bottom, #050808 0%, rgba(5, 8, 8, 0.9) 60%, #050808 100%), url('/images/contact_hero_bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          #contact {
            background-image: linear-gradient(to right, #050808 0%, #050808 25%, rgba(5, 8, 8, 0.85) 55%, rgba(5, 8, 8, 0.3) 100%), url('/images/contact_hero_bg.png');
            background-position: right center;
          }
        }

        .contact-layout-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        .contact-content-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        .contact-visual-spacer {
          display: none;
        }

        @media (min-width: 768px) {
          .contact-content-container {
            grid-template-columns: 1fr 1.2fr;
          }
        }

        @media (min-width: 1150px) {
          .contact-layout-wrapper {
            grid-template-columns: 1.8fr 1fr;
            gap: 60px;
          }
          .contact-visual-spacer {
            display: block;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
