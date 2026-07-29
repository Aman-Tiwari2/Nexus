"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ExternalLink, Users, Trophy } from "lucide-react";
import { events } from "@/data/events";

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "12px 14px",
          minWidth: "60px",
          marginBottom: "6px",
        }}
        className="countdown-box"
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1,
            display: "block",
            letterSpacing: "-0.02em",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        style={{
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Countdown({ targetDateStr }: { targetDateStr: string }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDateStr]);

  return (
    <div>
      <div
        style={{
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "16px",
        }}
      >
        Event Starts In
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", flexWrap: "nowrap" }}>
        <CountdownBox value={time.d} label="Days" />
        <span style={{ fontSize: "22px", fontWeight: 300, color: "var(--border-hover)", marginTop: "10px" }}>:</span>
        <CountdownBox value={time.h} label="Hrs" />
        <span style={{ fontSize: "22px", fontWeight: 300, color: "var(--border-hover)", marginTop: "10px" }}>:</span>
        <CountdownBox value={time.m} label="Min" />
        <span style={{ fontSize: "22px", fontWeight: 300, color: "var(--border-hover)", marginTop: "10px" }}>:</span>
        <CountdownBox value={time.s} label="Sec" />
      </div>
    </div>
  );
}

export default function UpcomingEvent() {
  const upcomingEvent = events.find((e) => e.isUpcoming && e.type === "hackathon");
  if (!upcomingEvent) return null;

  const date = new Date(upcomingEvent.date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      id="upcoming"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,229,204,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "52px" }}>
          <div className="section-tag">Coming Soon</div>
          <h2
            className="heading-display"
            style={{ fontSize: "clamp(36px, 5.5vw, 68px)", marginTop: "8px" }}
          >
            The Next Big<br />
            <span style={{ color: "var(--accent)" }}>Event</span>
          </h2>
        </div>

        {/* Main layout: left info + right registration */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            overflow: "hidden",
            background: "var(--bg-card)",
          }}
          className="upcoming-grid"
        >
          {/* ── Left: event details ── */}
          <div
            style={{
              padding: "clamp(28px, 4vw, 48px)",
              borderBottom: "1px solid var(--border)",
            }}
            className="upcoming-left"
          >
            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background: "rgba(0,229,204,0.09)",
                  color: "var(--accent)",
                  border: "1px solid rgba(0,229,204,0.2)",
                }}
              >
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", animation: "pulse-dot 1.5s ease infinite" }} />
                Hackathon
              </span>
              {upcomingEvent.prize && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "rgba(251,191,36,0.08)",
                    color: "#fbbf24",
                    border: "1px solid rgba(251,191,36,0.2)",
                  }}
                >
                  <Trophy style={{ width: "11px", height: "11px" }} />
                  {upcomingEvent.prize}
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                marginBottom: "16px",
              }}
            >
              {upcomingEvent.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                marginBottom: "28px",
                maxWidth: "520px",
              }}
            >
              {upcomingEvent.description}
            </p>

            {/* Meta chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {[
                { icon: Calendar, text: date },
                ...(upcomingEvent.venue ? [{ icon: MapPin, text: upcomingEvent.venue }] : []),
                { icon: Clock, text: "24 Hours" },
                { icon: Users, text: "200+ Participants" },
              ].map(({ icon: Icon, text }, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    fontSize: "12.5px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Icon style={{ width: "13px", height: "13px", color: "var(--accent)", flexShrink: 0 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: countdown + CTA ── */}
          <div
            style={{
              padding: "clamp(28px, 4vw, 48px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "36px",
              background: "rgba(0,229,204,0.015)",
            }}
            className="upcoming-right"
          >
            <Countdown targetDateStr={upcomingEvent.date} />

            <div>
              <a
                href={upcomingEvent.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "14px",
                  padding: "14px 28px",
                  marginBottom: "12px",
                }}
              >
                Register Now — Free Entry
                <ExternalLink style={{ width: "14px", height: "14px" }} />
              </a>
              <p style={{ fontSize: "11.5px", color: "var(--text-muted)", textAlign: "center", marginTop: "10px" }}>
                Free entry · Open to all students
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .upcoming-grid {
            grid-template-columns: 1.5fr 1fr !important;
          }
          .upcoming-left {
            border-bottom: none !important;
            border-right: 1px solid var(--border);
          }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
      `}</style>
    </section>
  );
}
