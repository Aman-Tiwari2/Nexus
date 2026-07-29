"use client";

import { useRef, useState, useEffect } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { events } from "@/data/events";

const typeLabels: Record<string, string> = {
  hackathon: "Hackathon",
  coding: "Coding Contest",
  aptitude: "Aptitude",
  workshop: "Workshop",
  placement: "Placement Drive",
};

const filterList = ["all", "hackathon", "coding", "aptitude", "workshop", "placement"];

function EventCard({ event, index, visible }: { event: typeof events[0]; index: number; visible: boolean }) {
  const date = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        transition2: "border-color 0.2s, background 0.2s",
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = event.isUpcoming
          ? "rgba(0,229,204,0.2)"
          : "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* ── Top row: Badge + prize ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: "999px",
            background: event.isUpcoming ? "rgba(0,229,204,0.09)" : "rgba(255,255,255,0.04)",
            color: event.isUpcoming ? "var(--accent)" : "var(--text-muted)",
            border: `1px solid ${event.isUpcoming ? "rgba(0,229,204,0.2)" : "rgba(255,255,255,0.07)"}`,
          }}
        >
          {event.isUpcoming ? (
            <>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              Upcoming
            </>
          ) : (
            typeLabels[event.type] || event.type
          )}
        </span>
        {event.prize && (
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            🏆 {event.prize}
          </span>
        )}
      </div>

      {/* ── Title ── */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "16px",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          marginBottom: "12px",
        }}
      >
        {event.title}
      </h3>

      {/* ── Meta info ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          marginBottom: "14px",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
          <Calendar style={{ width: "11px", height: "11px", flexShrink: 0 }} />
          {date}
        </div>
        {event.venue && (
          <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
            <MapPin style={{ width: "11px", height: "11px", flexShrink: 0 }} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>
              {event.venue}
            </span>
          </div>
        )}
      </div>

      {/* ── Description ── */}
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.65,
          color: "var(--text-secondary)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginBottom: "20px",
          flex: 1,
        } as React.CSSProperties}
      >
        {event.description}
      </p>

      {/* ── CTA link ── */}
      <a
        href={event.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "12.5px",
          fontWeight: 600,
          color: event.isUpcoming ? "var(--accent)" : "var(--text-muted)",
          transition: "color 0.2s",
          marginTop: "auto",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = event.isUpcoming ? "var(--accent)" : "var(--text-muted)"; }}
      >
        {event.isUpcoming ? "Register Now" : "View Details"}
        <ExternalLink style={{ width: "12px", height: "12px" }} />
      </a>
    </div>
  );
}

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = filter === "all" ? events : events.filter((e) => e.type === filter);

  return (
    <section id="events" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-container">

        {/* ── Header ── */}
        <div style={{ marginBottom: "48px" }}>
          <div className="section-tag">Events</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginTop: "8px",
            }}
          >
            <h2
              className="heading-display"
              style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
            >
              Featured<br />
              <span style={{ color: "var(--accent)" }}>Events</span>
            </h2>

            {/* ── Filter pills ── */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                paddingBottom: "8px",
              }}
            >
              {filterList.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "999px",
                      fontSize: "11.5px",
                      fontWeight: active ? 600 : 400,
                      letterSpacing: "0.04em",
                      background: active ? "rgba(255,255,255,0.1)" : "transparent",
                      color: active ? "var(--text-primary)" : "var(--text-secondary)",
                      border: `1px solid ${active ? "rgba(255,255,255,0.22)" : "var(--border)"}`,
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      }
                    }}
                  >
                    {f === "all" ? "All" : typeLabels[f]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div
          ref={sectionRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} visible={visible} />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "64px 24px",
                color: "var(--text-muted)",
                fontSize: "14px",
                border: "1px dashed var(--border)",
                borderRadius: "14px",
              }}
            >
              No events found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
