"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  Users,
  MessageSquare,
  QrCode,
  Radio,
  Globe,
  Phone,
  Share2,
  Linkedin,
  Instagram,
  X as CloseIcon,
  Sparkles,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    marginBottom: "6px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "13.5px",
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#38bdf8";
    e.target.style.background = "rgba(56, 189, 248, 0.04)";
    e.target.style.boxShadow = "0 0 16px rgba(56, 189, 248, 0.15)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(255, 255, 255, 0.12)";
    e.target.style.background = "rgba(255, 255, 255, 0.03)";
    e.target.style.boxShadow = "none";
  };

  // Official Nexus Social Links
  const socialChannels = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/nexuscommunity___?igsh=MXNmZW5xYXk1ZmoyeQ==",
      label: "Instagram",
      className: "social-btn-instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/nexus-23176/",
      label: "LinkedIn",
      className: "social-btn-linkedin",
    },
    {
      icon: Mail,
      href: "mailto:nexuscommunitystu@gmail.com",
      label: "Email",
      className: "social-btn-email",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "#050811",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "76px",
        paddingBottom: "48px",
      }}
    >
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
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
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
        <div style={{ marginBottom: "24px" }}>
          <div className="section-tag" style={{ marginBottom: "10px" }}>Contact & Connect</div>
          <h2
            className="heading-display"
            style={{
              fontSize: "clamp(32px, 4.2vw, 52px)",
              lineHeight: 1.0,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Let&apos;s Build{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #25D366 50%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Together.
            </span>
          </h2>
        </div>

        {/* ── Unboxed Content Layout ── */}
        <div
          ref={sectionRef}
          className="contact-fullscreen-grid"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Left Column: Direct Communication Channels */}
          <div className="contact-info-column" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: "4px", maxWidth: "460px" }}>
              Have a project, question, idea, or want to collaborate with Nexus? Drop us a message or scan to join our official WhatsApp group!
            </p>

            {/* Continuous Uniform Channel Card Stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* 1. Featured WhatsApp Group QR Card */}
              <div
                onClick={() => setShowQrModal(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(37, 211, 102, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)",
                  border: "1.5px solid rgba(37, 211, 102, 0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 10px 30px rgba(37, 211, 102, 0.12)",
                }}
                className="whatsapp-qr-channel-card"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
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
                    <QrCode style={{ width: "20px", height: "20px" }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#25D366",
                        marginBottom: "2px",
                      }}
                    >
                      OFFICIAL COMMUNITY
                    </div>
                    <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-display)" }}>
                      Join WhatsApp Group
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 800,
                    padding: "5px 12px",
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

              {/* 2. Official Email & Member Portal & Student Support Channels */}
              {[
                { icon: Mail, label: "Official Email", value: "nexuscommunitystu@gmail.com", color: "#38bdf8" },
                { icon: Users, label: "Nexus Build Portal", value: "vexta.collegecrm.in", color: "#a78bfa" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.25s ease",
                  }}
                  className="contact-channel-row"
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "12px",
                      background: `${color}15`,
                      border: `1px solid ${color}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: color,
                    }}
                  >
                    <Icon style={{ width: "18px", height: "18px" }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        marginBottom: "2px",
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#ffffff" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Follow Nexus Channels Logos directly below Student Support */}
            <div style={{ marginTop: "4px" }}>
              <div
                style={{
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "8px",
                }}
              >
                Connect With Us
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {socialChannels.map(({ icon: Icon, href, label, className }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.03)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      textDecoration: "none",
                    }}
                    className={`contact-social-btn ${className}`}
                  >
                    <Icon style={{ width: "17px", height: "17px" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="contact-form-column">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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
                  rows={3}
                  placeholder="Tell us about your query, ideas, or how you want to connect with Nexus..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "95px" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Submit Button directly below Your Message field */}
              <button
                type="submit"
                disabled={sending || sent}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "13px 24px",
                  fontSize: "14px",
                  fontWeight: 750,
                  borderRadius: "14px",
                  height: "46px",
                  minHeight: "46px",
                  marginTop: "10px",
                  opacity: sending || sent ? 0.8 : 1,
                  background: sent ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : undefined,
                  boxSizing: "border-box",
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
                    <Send style={{ width: "15px", height: "15px" }} />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── WhatsApp QR Code Lightbox Modal ── */}
      {showQrModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(5, 8, 17, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.25s ease forwards",
          }}
          onClick={() => setShowQrModal(false)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "420px",
              width: "100%",
              background: "rgba(10, 14, 24, 0.98)",
              border: "1.5px solid rgba(37, 211, 102, 0.5)",
              borderRadius: "24px",
              padding: "32px 28px",
              textAlign: "center",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(37, 211, 102, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setShowQrModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <CloseIcon style={{ width: "16px", height: "16px" }} />
            </button>

            {/* Header Badge */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#25D366",
                marginBottom: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Sparkles style={{ width: "13px", height: "13px" }} />
              NEXUS OFFICIAL WHATSAPP
            </div>

            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", marginBottom: "6px" }}>
              Scan to Join Group
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Open WhatsApp on your phone & scan this QR code to join our student community group instantly!
            </p>

            {/* QR Image Container */}
            <div
              style={{
                position: "relative",
                width: "220px",
                height: "220px",
                margin: "0 auto 24px auto",
                borderRadius: "20px",
                padding: "12px",
                background: "#ffffff",
                boxShadow: "0 10px 30px rgba(37, 211, 102, 0.3)",
              }}
            >
              <img
                src="/images/whatsapp-qr.png"
                alt="Nexus Official WhatsApp QR Code"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <a
              href="https://whatsapp.com/channel/0029Va69Z5v9cDDY05tWbE3a"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 8px 25px rgba(37, 211, 102, 0.4)",
              }}
            >
              <span>Open Group Link Directly</span>
              <Send style={{ width: "15px", height: "15px" }} />
            </a>
          </div>
        </div>
      )}

      {/* ── CSS Styles ── */}
      <style>{`
        .contact-fullscreen-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }

        .contact-form-column {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
        }

        .form-grid-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        @media (min-width: 640px) {
          .form-grid-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .contact-channel-row:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          transform: translateX(4px);
        }

        .whatsapp-qr-channel-card:hover {
          transform: translateY(-2px) scale(1.01);
          border-color: #25D366 !important;
          box-shadow: 0 15px 40px rgba(37, 211, 102, 0.25) !important;
        }

        .contact-social-btn:hover {
          transform: translateY(-3px) scale(1.08) !important;
        }

        .social-btn-github:hover {
          background: #24292e !important;
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          box-shadow: 0 10px 28px rgba(255, 255, 255, 0.25) !important;
        }

        .social-btn-instagram:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
          color: #ffffff !important;
          border-color: transparent !important;
          box-shadow: 0 10px 28px rgba(225, 48, 108, 0.45) !important;
        }

        .social-btn-linkedin:hover {
          background: #0A66C2 !important;
          color: #ffffff !important;
          border-color: transparent !important;
          box-shadow: 0 10px 28px rgba(10, 102, 194, 0.5) !important;
        }

        .social-btn-email:hover {
          background: linear-gradient(135deg, #ea4335 0%, #c5221f 100%) !important;
          color: #ffffff !important;
          border-color: transparent !important;
          box-shadow: 0 10px 28px rgba(234, 67, 53, 0.5) !important;
        }

        @media (min-width: 1024px) {
          .contact-fullscreen-grid {
            grid-template-columns: 1fr 1.15fr !important;
            gap: 48px !important;
          }
        }

        /* ── Floating Communication Icons ── */
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
