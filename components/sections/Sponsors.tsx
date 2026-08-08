"use client";

const companies = [
  "Google", "Microsoft", "Amazon", "TCS", "Infosys",
  "Wipro", "Accenture", "IBM", "Adobe", "Cognizant",
  "Deloitte", "Goldman Sachs",
];

export default function Sponsors() {
  return (
    <section id="sponsors" style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "36px 0", overflow: "hidden" }}>
      <div className="section-container mb-6">
        <p
          className="text-xs uppercase"
          style={{ color: "#808080", letterSpacing: "0.25em", fontWeight: 600 }}
        >
          Our Members Are Placed At Top Companies
        </p>
      </div>

      {/* Row 1 — scroll left */}
      <div className="marquee-wrapper mb-3">
        <div className="marquee-track">
          {[...companies, ...companies, ...companies].map((name, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#a0a0a0",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right */}
      <div className="marquee-wrapper">
        <div className="marquee-track" style={{ animationName: "scroll-right" }}>
          {[...[...companies].reverse(), ...[...companies].reverse(), ...companies].map((name, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#a0a0a0",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
