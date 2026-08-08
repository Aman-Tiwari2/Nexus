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
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(47, 129, 255, 0.6)";
    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(47, 129, 255, 0.15)";
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
        <div className="section-tag" style={{ color: "var(--accent)" }}>Contact</div>
        <h2
          className="heading-display"
          style={{ fontSize: "clamp(36px, 5.5vw, 68px)", marginTop: "8px", marginBottom: "52px" }}
        >
          Get In<br />
          <span style={{ 
            background: "linear-gradient(135deg, var(--accent) 0%, #2036b3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>Touch</span>
        </h2>

        {/* ── Content layout wrapper ── */}
        <div
          ref={sectionRef}
          className="contact-content-container"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Left Side: Contact Info */}
          <div className="contact-info-panel">
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "36px", maxWidth: "380px" }}>
                Have a question, idea, or want to be part of Nexus? Reach out to us through our official channels. We&apos;d be happy to connect.
              </p>

              {/* Contact details nodes */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
                {[
                  { icon: Mail, label: "Email", value: "contact@nexuscommunity.in", color: "#38bdf8" },
                  { icon: Users, label: "Community", value: "Official Member Portal", color: "#818cf8" },
                  { icon: Headset, label: "Support", value: "Official Support Channel", color: "#2dd4bf" },
                  { icon: MapPin, label: "Location", value: "Verified Campus Chapter", color: "#60a5fa" },
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
                    { icon: Mail, href: "mailto:contact@nexuscommunity.in", label: "Email" },
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
                        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
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
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                    required
                    style={inputBase}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="yourname@email.com"
                    required
                    style={inputBase}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?"
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
                className="btn-primary"
                style={{ alignSelf: "flex-start", marginTop: "4px" }}
              >
                {sending ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
                <Send style={{ width: "14px", height: "14px" }} />
              </button>
            </form>
        </div>
      </div>

      <style>{`
        #contact {
          position: relative;
          background-color: #050808;
          overflow: hidden;
        }

        .contact-content-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        @media (min-width: 768px) {
          .contact-content-container {
            grid-template-columns: 1fr 1.2fr;
            gap: 60px;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
