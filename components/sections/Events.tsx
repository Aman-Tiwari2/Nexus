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


function EventCard({ event, index, visible }: { event: typeof events[0]; index: number; visible: boolean }) {
  const date = new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  // An event only counts as upcoming while its date hasn't passed
  const isUpcoming = event.isUpcoming && new Date(`${event.date}T23:59:59`).getTime() >= Date.now();

  return (
    <div
      className="card p-6 group flex flex-col h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: isUpcoming ? "rgba(0,229,204,0.1)" : "rgba(255,255,255,0.05)",
            color: isUpcoming ? "#00e5cc" : "#555555",
            border: `1px solid ${isUpcoming ? "rgba(0,229,204,0.2)" : "rgba(255,255,255,0.08)"}`,
            letterSpacing: "0.1em",
            fontSize: "10px",
          }}
        >
          {isUpcoming ? "● Upcoming" : typeLabels[event.type] || event.type}
        </span>
        {event.prize && (
          <span className="text-xs" style={{ color: "#808080" }}>🏆 {event.prize}</span>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-bold text-white mb-3 leading-tight"
        style={{ fontSize: "17px", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em" }}
      >
        {event.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-4" style={{ color: "#808080" }}>
        <div className="flex items-center gap-1.5 text-xs">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          {date}
        </div>
        {event.venue && (
          <div className="flex items-center gap-1.5 text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {event.venue}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-6 line-clamp-2 flex-grow" style={{ color: "#a0a0a0" }}>
        {event.description}
      </p>

      {/* CTA */}
      <a
        href={event.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        style={{ color: isUpcoming ? "#00e5cc" : "#808080" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isUpcoming ? "#00e5cc" : "#808080"; }}
      >
        {isUpcoming ? "Register Now" : "View Details"}
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filters = ["all", "hackathon", "coding", "aptitude", "workshop", "placement"];
  const filtered = filter === "all" ? events : events.filter((e) => e.type === filter);

  return (
    <section id="events" className="section-padding" style={{ background: "#111111" }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <div className="section-tag">Events</div>
            <h2
              className="font-black text-white leading-[0.95] mt-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.03em",
              }}
            >
              Featured<br />
              <span style={{ color: "#00e5cc" }}>Events</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-full text-xs font-semibold capitalize transition-all duration-200"
                style={{
                  background: filter === f ? "rgba(255,255,255,0.1)" : "transparent",
                  color: filter === f ? "#ffffff" : "#a0a0a0",
                  border: `1px solid ${filter === f ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                  letterSpacing: "0.05em",
                }}
              >
                {f === "all" ? "All" : typeLabels[f]}
              </button>
            ))}
          </div>
        </div>

        <div ref={sectionRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
