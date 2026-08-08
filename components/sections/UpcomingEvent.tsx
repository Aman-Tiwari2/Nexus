"use client";

import { useRef, useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { events } from "@/data/events";

function CountdownTimer({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(`${date}T09:00:00`).getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [date]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col gap-2 mt-8">
      <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#808080", letterSpacing: "0.15em" }}>
        Event Starts In
      </span>
      <div className="flex items-center gap-2 md:gap-3 mt-1">
        {/* Days */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", minWidth: "64px" }}>
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formatNumber(timeLeft.days)}</span>
            <span className="text-[9px] uppercase tracking-widest mt-1 font-semibold" style={{ color: "#808080" }}>Days</span>
          </div>
          <span className="text-lg font-bold" style={{ color: "rgba(255,255,255,0.15)" }}>:</span>
        </div>
        {/* Hours */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", minWidth: "64px" }}>
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formatNumber(timeLeft.hours)}</span>
            <span className="text-[9px] uppercase tracking-widest mt-1 font-semibold" style={{ color: "#808080" }}>Hrs</span>
          </div>
          <span className="text-lg font-bold" style={{ color: "rgba(255,255,255,0.15)" }}>:</span>
        </div>
        {/* Minutes */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", minWidth: "64px" }}>
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formatNumber(timeLeft.minutes)}</span>
            <span className="text-[9px] uppercase tracking-widest mt-1 font-semibold" style={{ color: "#808080" }}>Min</span>
          </div>
          <span className="text-lg font-bold" style={{ color: "rgba(255,255,255,0.15)" }}>:</span>
        </div>
        {/* Seconds */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", minWidth: "64px" }}>
          <span className="text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formatNumber(timeLeft.seconds)}</span>
          <span className="text-[9px] uppercase tracking-widest mt-1 font-semibold" style={{ color: "#808080" }}>Sec</span>
        </div>
      </div>
    </div>
  );
}

export default function UpcomingEvent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const upcomingEvent = events.find((e) => e.isUpcoming && e.type === "hackathon");

  if (!upcomingEvent) return null;

  return (
    <section id="upcoming" className="section-padding" style={{ background: "#0d0d0d" }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col mb-10 text-center items-center">
          <div className="section-tag" style={{ color: "#00e5cc" }}>Coming Soon</div>
          <h2
            className="font-black text-white leading-[0.95] mt-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.03em",
            }}
          >
            Next Big<br />
            <span style={{ color: "#00e5cc" }}>Event</span>
          </h2>
        </div>

        {/* Card */}
        <div
          ref={sectionRef}
          className="card p-8 md:p-10 max-w-4xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                background: "rgba(0,229,204,0.1)",
                color: "#00e5cc",
                border: "1px solid rgba(0,229,204,0.2)",
                letterSpacing: "0.1em",
                fontSize: "10px",
              }}
            >
              Hackathon
            </span>
            {upcomingEvent.prize && (
              <span className="text-xs font-medium" style={{ color: "#a0a0a0" }}>
                🏆 Prize: {upcomingEvent.prize}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-black text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
          >
            {upcomingEvent.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: "#a0a0a0" }}>
            {upcomingEvent.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-8 text-xs" style={{ color: "#808080" }}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00e5cc]" />
              <span>
                {new Date(upcomingEvent.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            {upcomingEvent.venue && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00e5cc]" />
                <span>{upcomingEvent.venue}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00e5cc]" />
              <span>24 Hours</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "24px 0" }} />

          {/* Countdown & Button layout */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <CountdownTimer date={upcomingEvent.date} />

            <div className="flex flex-col justify-end">
              <a
                href={upcomingEvent.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200"
                style={{
                  background: "#ffffff",
                  color: "#0d0d0d",
                  padding: "14px 28px",
                  borderRadius: "50px",
                  boxShadow: "0 4px 15px rgba(255,255,255,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#e5e5e5";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                Register Now — Free Entry
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
