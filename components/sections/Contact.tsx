"use client";

import { useRef, useState, useEffect } from "react";
import { Mail, MapPin, Phone, Send, Instagram, Github, Linkedin } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    color: "#ffffff",
    padding: "12px 16px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    fontSize: "10px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    color: "#808080",
    marginBottom: "8px",
  };

  return (
    <section id="contact" className="section-padding" style={{ background: "#111111" }}>
      <div className="section-container">
        <div className="section-tag text-center block w-full">Contact</div>
        <h2
          className="font-black text-white leading-[0.95] mb-10 mt-3 text-center"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            letterSpacing: "-0.03em",
          }}
        >
          Get In<br />
          <span style={{ color: "#00e5cc" }}>Touch</span>
        </h2>

        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Left: Info */}
          <div>
            <p className="text-sm leading-relaxed mb-10" style={{ color: "#a0a0a0", maxWidth: "400px" }}>
              Whether you&apos;re a student looking to join, a company interested in collaborating, or a senior wanting to mentor — we&apos;d love to hear from you.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-6 mb-12">
              {[
                { icon: Mail, label: "Email", value: "nexus@college.edu" },
                { icon: MapPin, label: "Location", value: "SRMCEM, Lucknow" },
                { icon: Phone, label: "WhatsApp", value: "+91 XXXXXXXXXX" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#a0a0a0" }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", color: "#808080", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>{label}</div>
                    <div className="text-sm text-white mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <div style={{ fontSize: "10px", color: "#808080", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Follow Us</div>
              <div className="flex gap-3">
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
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#a0a0a0" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "#a0a0a0"; }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Aryan Sharma"
                  required
                  style={inputStyle}
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
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
                  style={inputStyle}
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
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
                style={inputStyle}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
              />
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us more..."
                required
                rows={5}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
              />
            </div>

            <button type="submit" disabled={sending || sent} className="btn-primary justify-center mt-2">
              {sent ? "✓ Message Sent!" : sending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(0,0,0,0.2)", borderTopColor: "#000" }} />
                  Sending...
                </span>
              ) : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
