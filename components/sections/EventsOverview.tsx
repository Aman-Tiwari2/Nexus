"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar, Clock, MapPin, Award, ArrowUpRight,
  CheckCircle2, Sparkles, Users, Trophy, Zap, Star, Code, BookOpen,
} from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const iconMap: Record<string, any> = {
  Zap,
  Trophy,
  Users,
  Star,
  Code,
  BookOpen,
  Award,
};

type PastEvent = {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  stat: string;
  tagColor: string;
  iconType: string;
};

type UpcomingEvent = {
  title: string;
  displayDate: string;
  date: string;
  time: string;
  location: string;
  prize: string;
  registrationLink: string;
};

export default function EventsOverview() {
  const [upcoming, setUpcoming] = useState<UpcomingEvent>({
    title: "HackNexus 2026",
    date: "2026-03-15T09:00:00",
    displayDate: "Mar 15, 2026",
    time: "09:00 AM — 24 Hour Sprint",
    location: "Main Campus Auditorium & Labs",
    prize: "₹50,000+ Prize Pool + Goodies",
    registrationLink: "https://vexta.collegecrm.in"
  });
  const [past, setPast] = useState<PastEvent[]>([]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Load data from API */
  useEffect(() => {
    fetch("/api/admin/events")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.upcoming) setUpcoming(resData.upcoming);
        if (resData.past) setPast(resData.past);
      })
      .catch(() => {});
  }, []);

  /* Intersection observer for entrance animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Live countdown — target dynamically set */
  useEffect(() => {
    const tick = () => {
      const target = new Date(upcoming.date).getTime();
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86_400_000),
          hours: Math.floor((diff % 86_400_000) / 3_600_000),
          minutes: Math.floor((diff % 3_600_000) / 60_000),
          seconds: Math.floor((diff % 60_000) / 1_000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [upcoming.date]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="events-overview"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Ambient background glows */}
      <div style={{
        position: "absolute", top: "10%", left: "-5%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(47,129,255,0.04) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", right: "-5%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div
        className="section-container relative"
        style={{ zIndex: 1 }}
        ref={sectionRef}
      >
        {/* ── Section Header ── */}
        <div style={{ marginBottom: "52px" }}>
          <div className="section-tag">Event Status</div>
          <h2
            className="heading-display"
            style={{ fontSize: "clamp(36px, 5.5vw, 68px)", marginTop: "8px" }}
          >
            Events:<br />
            <span style={{ color: "var(--accent)" }}>Past & Coming</span>
          </h2>
        </div>

        {/* ── Two-column grid ── */}
        <div
          className="eo-grid"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >

          {/* ════════════════════ LEFT: Upcoming ════════════════════ */}
          <div>
            <p className="eo-col-label">
              <Sparkles style={{ width: "14px", height: "14px" }} />
              Upcoming Highlight
            </p>

            <div className="eo-upcoming-card">
              {/* Glow blob */}
              <div className="eo-card-glow" />

              {/* Top Row */}
              <div className="eo-card-toprow">
                <span className="eo-live-badge">
                  <span className="eo-ping" />
                  Open Registration
                </span>
                <span className="eo-date-chip">
                  <Calendar style={{ width: "12px", height: "12px" }} />
                  {upcoming.displayDate}
                </span>
              </div>

              {/* Title */}
              <h3 className="eo-event-title">{upcoming.title}</h3>
              <p className="eo-event-desc">
                Join our flagship technology community event. Build, learn, compete and network with students and mentors from top companies.
              </p>

              {/* Meta Details */}
              <div className="eo-meta">
                {[
                  { icon: Clock, text: upcoming.time },
                  { icon: MapPin, text: upcoming.location },
                  { icon: Award, text: upcoming.prize },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="eo-meta-item">
                    <Icon style={{ width: "14px", height: "14px", color: "var(--accent)", flexShrink: 0 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Live Countdown */}
              <div className="eo-countdown-wrap">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div className="eo-countdown-label" style={{ margin: 0 }}>
                    Live Target Countdown
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#60a5fa", boxShadow: "0 0 8px #60a5fa", animation: "pulse 2s infinite" }} />
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em" }}>COUNTING DOWN</span>
                  </div>
                </div>

                <div className="eo-countdown-row">
                  {[
                    { val: pad(timeLeft.days), unit: "Days" },
                    { val: pad(timeLeft.hours), unit: "Hours" },
                    { val: pad(timeLeft.minutes), unit: "Mins" },
                    { val: pad(timeLeft.seconds), unit: "Secs" },
                  ].map(({ val, unit }, i) => (
                    <div key={i} className="eo-timer-block">
                      <span className="eo-timer-num">{val}</span>
                      <span className="eo-timer-unit">{unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href={upcoming.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="eo-register-btn"
              >
                Register for {upcoming.title}
                <ArrowUpRight style={{ width: "16px", height: "16px" }} />
              </a>
            </div>
          </div>

          {/* ════════════════════ RIGHT: Past Events ════════════════════ */}
          <div>
            <p className="eo-col-label">
              <CheckCircle2 style={{ width: "14px", height: "14px" }} />
              Concluded Milestones
            </p>

            <div className="eo-past-stack">
              {past.map((ev, idx) => {
                const Icon = iconMap[ev.iconType] || Zap;
                return (
                  <div
                    key={ev.id}
                    className="eo-past-card"
                    style={{
                      transitionDelay: `${idx * 80}ms`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(20px)",
                      transition: `opacity 0.6s ease ${idx * 80}ms, transform 0.6s ease ${idx * 80}ms, border-color 0.25s, background 0.25s`,
                    }}
                  >
                    {/* Left accent bar */}
                    <div className="eo-accent-bar" style={{ background: ev.tagColor }} />

                    {/* Icon bubble */}
                    <div
                      className="eo-icon-bubble"
                      style={{
                        background: `${ev.tagColor}12`,
                        border: `1px solid ${ev.tagColor}35`,
                        color: ev.tagColor,
                      }}
                    >
                      <Icon style={{ width: "16px", height: "16px" }} />
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <div className="eo-past-meta-row">
                        <span className="eo-past-date">{ev.date}</span>
                        <span
                          className="eo-past-type"
                          style={{ color: ev.tagColor, background: `${ev.tagColor}10` }}
                        >
                          {ev.type}
                        </span>
                      </div>
                      <h4 className="eo-past-title">{ev.title}</h4>
                      <p className="eo-past-desc">{ev.description}</p>
                      <div className="eo-past-stat" style={{ borderColor: `${ev.tagColor}25` }}>
                        <div
                          className="eo-stat-dot"
                          style={{ background: ev.tagColor }}
                        />
                        <span style={{ color: ev.tagColor }}>{ev.stat}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>{/* end eo-grid */}
      </div>

      <style>{`
        /* ── Grid Layout ── */
        .eo-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 900px) {
          .eo-grid { grid-template-columns: 1.15fr 1fr; gap: 48px; }
        }

        /* ── Column Label ── */
        .eo-col-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 18px;
        }

        /* ═══════ Upcoming Card ═══════ */
        .eo-upcoming-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .eo-upcoming-card:hover {
          border-color: rgba(96,165,250,0.3);
          box-shadow: 0 12px 40px rgba(96,165,250,0.05);
        }
        .eo-card-glow {
          position: absolute;
          top: -80px; right: -80px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Top row */
        .eo-card-toprow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .eo-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          background: rgba(47,129,255,0.09);
          border: 1px solid rgba(47,129,255,0.25);
          padding: 4px 11px;
          border-radius: 999px;
        }
        .eo-ping {
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          animation: eo-pulse 1.6s ease-in-out infinite;
        }
        @keyframes eo-pulse {
          0%,100% { transform: scale(0.9); opacity: 0.6; }
          50%      { transform: scale(1.25); opacity: 1; }
        }
        .eo-date-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-secondary);
        }

        /* Title & Description */
        .eo-event-title {
          font-family: var(--font-display);
          font-size: clamp(26px, 3.5vw, 34px);
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.1;
        }
        .eo-event-desc {
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 22px;
        }

        /* Meta list */
        .eo-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 22px;
          margin-bottom: 22px;
        }
        .eo-meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-primary);
        }

        /* Countdown */
        .eo-countdown-wrap { margin-bottom: 24px; }
        .eo-countdown-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .eo-countdown-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .eo-timer-block {
          background: rgba(96, 165, 250, 0.08);
          border: 1px solid rgba(96, 165, 250, 0.25);
          border-radius: 10px;
          padding: 12px 6px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: inset 0 0 12px rgba(96, 165, 250, 0.05);
        }
        .eo-timer-num {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.8vw, 28px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          text-shadow: 0 0 12px rgba(96, 165, 250, 0.4);
        }
        .eo-timer-unit {
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #60a5fa;
        }

        /* Register CTA */
        .eo-register-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px;
          border-radius: 8px;
          background: var(--accent);
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          box-shadow: 0 4px 16px rgba(96,165,250,0.28);
        }
        .eo-register-btn:hover {
          transform: translateY(-2px);
          background: #3b82f6;
          box-shadow: 0 8px 24px rgba(96,165,250,0.45);
        }

        /* ═══════ Past Events Stack ═══════ */
        .eo-past-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .eo-past-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 18px 18px 18px 14px;
          position: relative;
          overflow: hidden;
        }
        .eo-past-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.1);
        }

        /* Left vertical accent bar */
        .eo-accent-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 3px 0 0 3px;
        }

        /* Icon bubble */
        .eo-icon-bubble {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Past card text */
        .eo-past-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 6px;
        }
        .eo-past-date {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .eo-past-type {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 7px;
          border-radius: 4px;
        }
        .eo-past-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 5px;
          line-height: 1.2;
        }
        .eo-past-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }
        .eo-past-stat {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid;
          padding: 3px 10px;
          border-radius: 6px;
        }
        .eo-stat-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
