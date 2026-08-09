"use client";

import { useRef, useState, useEffect } from "react";
import { Mail, MapPin, Send, Instagram, Github, Linkedin, Users, Headset, CheckCircle2, MessageSquare, Radio, Globe, Phone, Share2, QrCode, X, ExternalLink } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

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

  const inputStyle: React.CSSProperties = {
    background: "rgba(12, 18, 32, 0.45)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "14px",
    color: "var(--text-primary)",
    padding: "16px 20px",
    fontSize: "14.5px",
    outline: "none",
    width: "100%",
    transition: "all 0.25s ease",
    fontFamily: "var(--font-body)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "var(--text-muted)",
    marginBottom: "8px",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(96, 165, 250, 0.25)";
    (e.currentTarget as HTMLElement).style.background = "rgba(15, 23, 42, 0.85)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.12)";
    (e.currentTarget as HTMLElement).style.boxShadow = "none";
    (e.currentTarget as HTMLElement).style.background = "rgba(12, 18, 32, 0.45)";
  };

  const socialChannels = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/nexuscommunity___?igsh=MXNmZW5xYXk1ZmoyeQ==",
      label: "Instagram",
      className: "social-btn-instagram",
    },
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
      className: "social-btn-github",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/nexus-23176/",
      label: "LinkedIn",
      className: "social-btn-linkedin",
    },
    {
      icon: Mail,
      href: "mailto:contact@nexuscommunity.in",
      label: "Email",
      className: "social-btn-email",
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: "#050811", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      
      {/* ── Floating Moving Communication Logos ── */}
      <div className="contact-floating-icons pointer-events-none">
        <div className="floating-icon icon-mail">
          <Mail style={{ width: "24px", height: "24px", color: "#ea4335" }} />
        </div>
        <div className="floating-icon icon-msg">
          <MessageSquare style={{ width: "26px", height: "26px", color: "#25D366" }} />
        </div>
        <div className="floating-icon icon-send">
          <Send style={{ width: "22px", height: "22px", color: "#34d399" }} />
        </div>
        <div className="floating-icon icon-radio">
          <Radio style={{ width: "24px", height: "24px", color: "#fbbf24" }} />
        </div>
        <div className="floating-icon icon-globe">
          <Globe style={{ width: "28px", height: "28px", color: "#ec4899" }} />
        </div>
        <div className="floating-icon icon-phone">
          <Phone style={{ width: "22px", height: "22px", color: "#38bdf8" }} />
        </div>
        <div className="floating-icon icon-share">
          <Share2 style={{ width: "22px", height: "22px", color: "#818cf8" }} />
        </div>
      </div>

      {/* Ambient Radial Glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(37,211,102,0.06) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1, width: "100%" }}>
        {/* Eyebrow & Title */}
        <div style={{ marginBottom: "48px" }}>
          <div className="section-tag" style={{ marginBottom: "14px" }}>Contact & Connect</div>
          <h2
            className="heading-display"
            style={{
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 0.95,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Let&apos;s Build<br />
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #25D366 50%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Together.
            </span>
          </h2>
        </div>

        {/* ── Unboxed Full-Screen Content Layout ── */}
        <div
          ref={sectionRef}
          className="contact-fullscreen-grid"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Left Column: Direct Communication Channels & WhatsApp QR Card */}
          <div className="contact-info-column" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "36px" }}>
            <div>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "36px", maxWidth: "460px" }}>
                Have a project, question, idea, or want to collaborate with Nexus? Drop us a message or scan to join our official WhatsApp group!
              </p>

              {/* Communication Channel List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                
                {/* ⚡ Featured WhatsApp Group QR Card ⚡ */}
                <div
                  onClick={() => setShowQrModal(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 22px",
                    borderRadius: "18px",
                    background: "linear-gradient(135deg, rgba(37, 211, 102, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)",
                    border: "1.5px solid rgba(37, 211, 102, 0.4)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "0 10px 30px rgba(37, 211, 102, 0.12)",
                  }}
                  className="whatsapp-qr-channel-card"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        background: "rgba(37, 211, 102, 0.2)",
                        border: "1px solid rgba(37, 211, 102, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#25D366",
                        boxShadow: "0 0 20px rgba(37, 211, 102, 0.3)",
                      }}
                    >
                      <QrCode style={{ width: "24px", height: "24px" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 800,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#25D366",
                          marginBottom: "3px",
                        }}
                      >
                        OFFICIAL COMMUNITY
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-display)" }}>
                        Join WhatsApp Group
                      </div>
                      <div style={{ fontSize: "12.5px", color: "#cbd5e1", marginTop: "2px" }}>
                        Click to view QR Code & scan
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "6px 14px",
                      borderRadius: "999px",
                      background: "rgba(37, 211, 102, 0.2)",
                      color: "#25D366",
                      border: "1px solid rgba(37, 211, 102, 0.4)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    View QR 📱
                  </span>
                </div>

                {/* Other Channels */}
                {[
                  { icon: Mail, label: "Official Email", value: "contact@nexuscommunity.in", color: "#60a5fa" },
                  { icon: Users, label: "Member Portal", value: "vexta.collegecrm.in", color: "#a78bfa" },
                  { icon: Headset, label: "Student Support", value: "Official Support Channel", color: "#34d399" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      padding: "16px 20px",
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      transition: "all 0.25s ease",
                    }}
                    className="contact-channel-row"
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        background: `${color}15`,
                        border: `1px solid ${color}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: color,
                      }}
                    >
                      <Icon style={{ width: "20px", height: "20px" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          marginBottom: "3px",
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "#ffffff" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links with Original Brand Hover Logos */}
            <div style={{ marginTop: "24px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                }}
              >
                Follow Nexus Channels
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                {socialChannels.map(({ icon: Icon, href, label, className }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.03)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className={`contact-social-btn ${className}`}
                  >
                    <Icon style={{ width: "20px", height: "20px" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="contact-form-column">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="form-grid-row">
                <div>
                  <label htmlFor="name" style={labelStyle}>Your Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@college.edu"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" style={labelStyle}>Subject / Topic</label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder="e.g. Collaboration Opportunity / Membership Inquiry"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>Your Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Tell us about your query, ideas, or how you want to connect with Nexus..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "16px 28px",
                  fontSize: "15px",
                  fontWeight: 700,
                  marginTop: "8px",
                  borderRadius: "14px",
                  opacity: sending || sent ? 0.8 : 1,
                  background: sent ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : undefined,
                }}
              >
                {sending ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>Sending Message...</span>
                ) : sent ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    Message Sent Successfully!
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    Send Message Direct
                    <Send style={{ width: "16px", height: "16px" }} />
                  </span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── WhatsApp Group QR Code Modal ── */}
      {showQrModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Backdrop Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(5, 8, 17, 0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            onClick={() => setShowQrModal(false)}
          />

          {/* Modal Content Box */}
          <div
            style={{
              position: "relative",
              zIndex: 101,
              width: "100%",
              maxWidth: "420px",
              background: "#0c1220",
              border: "1.5px solid rgba(37, 211, 102, 0.4)",
              borderRadius: "24px",
              padding: "32px 28px",
              textAlign: "center",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(37, 211, 102, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowQrModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <X style={{ width: "18px", height: "18px" }} />
            </button>

            {/* Header Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: "rgba(37, 211, 102, 0.15)",
                border: "1px solid rgba(37, 211, 102, 0.4)",
                color: "#25D366",
                fontSize: "11.5px",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              <QrCode style={{ width: "14px", height: "14px" }} />
              Nexus WhatsApp Community
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              Scan to Join Group
            </h3>

            <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px", maxWidth: "320px" }}>
              Scan this QR code with your phone camera or WhatsApp scanner to join our official student group.
            </p>

            {/* WhatsApp QR Code Image Box */}
            <div
              style={{
                padding: "16px",
                borderRadius: "20px",
                background: "#ffffff",
                boxShadow: "0 12px 35px rgba(37, 211, 102, 0.3)",
                marginBottom: "24px",
              }}
            >
              <img
                src="/images/whatsapp-qr.png"
                alt="Nexus WhatsApp Group QR Code"
                style={{
                  width: "240px",
                  height: "240px",
                  objectFit: "contain",
                  borderRadius: "12px",
                  display: "block",
                }}
              />
            </div>

            {/* Action Button */}
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                color: "#ffffff",
                fontSize: "14.5px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 10px 25px rgba(37, 211, 102, 0.3)",
                textDecoration: "none",
              }}
            >
              <span>Join WhatsApp Group Directly</span>
              <ExternalLink style={{ width: "16px", height: "16px" }} />
            </a>
          </div>
        </div>
      )}

      {/* ── CSS Styles ── */}
      <style>{`
        .contact-fullscreen-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          align-items: flex-start;
        }

        .form-grid-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .contact-channel-row:hover, .whatsapp-qr-channel-card:hover {
          border-color: rgba(37, 211, 102, 0.6) !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.2) !important;
        }

        /* ── Official Brand Hover Styles for Social Channels ── */
        .social-btn-instagram:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
          color: #ffffff !important;
          border-color: transparent !important;
          box-shadow: 0 10px 28px rgba(220, 39, 67, 0.5) !important;
          transform: translateY(-3px) scale(1.08) !important;
        }

        .social-btn-github:hover {
          background: #24292e !important;
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          box-shadow: 0 10px 28px rgba(255, 255, 255, 0.25) !important;
          transform: translateY(-3px) scale(1.08) !important;
        }

        .social-btn-linkedin:hover {
          background: #0A66C2 !important;
          color: #ffffff !important;
          border-color: transparent !important;
          box-shadow: 0 10px 28px rgba(10, 102, 194, 0.5) !important;
          transform: translateY(-3px) scale(1.08) !important;
        }

        .social-btn-email:hover {
          background: linear-gradient(135deg, #ea4335 0%, #c5221f 100%) !important;
          color: #ffffff !important;
          border-color: transparent !important;
          box-shadow: 0 10px 28px rgba(234, 67, 53, 0.5) !important;
          transform: translateY(-3px) scale(1.08) !important;
        }

        @media (min-width: 1024px) {
          .contact-fullscreen-grid {
            grid-template-columns: 1.1fr 1.3fr !important;
            gap: 80px !important;
          }
        }

        /* ── Floating Communication Icons continuous movement ── */
        .contact-floating-icons {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        .floating-icon {
          position: absolute;
          opacity: 0.28;
          filter: drop-shadow(0 0 12px currentColor);
          animation: floatMotion 16s infinite ease-in-out alternate;
        }

        .icon-mail { top: 18%; left: 8%; animation-duration: 14s; }
        .icon-msg { top: 72%; left: 12%; animation-duration: 18s; animation-delay: -3s; }
        .icon-send { top: 25%; right: 14%; animation-duration: 15s; animation-delay: -5s; }
        .icon-radio { top: 78%; right: 18%; animation-duration: 20s; animation-delay: -2s; }
        .icon-globe { top: 48%; left: 4%; animation-duration: 19s; animation-delay: -7s; }
        .icon-phone { top: 82%; left: 45%; animation-duration: 16s; animation-delay: -4s; }
        .icon-share { top: 14%; right: 38%; animation-duration: 17s; animation-delay: -6s; }

        @keyframes floatMotion {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(25px, -35px) rotate(12deg) scale(1.1); }
          66% { transform: translate(-20px, 25px) rotate(-10deg) scale(0.95); }
          100% { transform: translate(15px, -15px) rotate(6deg) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
