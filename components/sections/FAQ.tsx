"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Who can join Nexus?", a: "Any college student from any year or branch can join Nexus. We welcome everyone from first-year freshers to final-year students. The earlier you join, the more you benefit from our structured roadmaps." },
  { q: "Is there a membership fee?", a: "Nexus is completely free to join. We believe every student deserves access to quality placement preparation resources regardless of their financial background." },
  { q: "How are events conducted?", a: "Events are conducted both online and offline depending on the format. Coding contests and aptitude tests use our platform at vexta.collegecrm.in, while hackathons and workshops are usually in-person at college." },
  { q: "What if I'm a complete beginner?", a: "Perfect! We specifically cater to students who don't know where to start. Our roadmaps begin from the basics and we pair beginners with senior mentors for personalized guidance." },
  { q: "How are mock interviews conducted?", a: "Mock interviews are scheduled sessions with senior Nexus members who have already been placed. They simulate real technical and HR rounds, provide detailed feedback, and suggest areas to improve." },
  { q: "Do you provide certificates?", a: "Yes! Participants in our coding contests, bootcamps, and hackathons receive digital certificates that can be added to resumes and LinkedIn profiles." },
  { q: "Can I contribute to Nexus as a senior?", a: "Absolutely! Placed students and seniors are our backbone. You can mentor juniors, conduct sessions, set contest problems, or serve on our core team. Your experience is invaluable." },
  { q: "How do I register for events?", a: "Events are announced on our community channels and you can register through our platform at vexta.collegecrm.in. Make sure to follow our social media for timely updates." },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          <span
            className="text-xs font-mono flex-shrink-0"
            style={{ color: "#808080", width: "24px" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-medium text-white text-sm leading-snug">{item.q}</span>
        </div>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            color: open ? "#00e5cc" : "#a0a0a0",
            borderColor: open ? "rgba(0,229,204,0.2)" : "rgba(255,255,255,0.15)",
          }}
        >
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>

      <div
        style={{
          maxHeight: open ? "480px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p
          className="text-sm leading-relaxed pb-5"
          style={{ color: "#a0a0a0", paddingLeft: "40px" }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faq" className="section-padding" style={{ background: "#111111" }}>
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-16 max-w-5xl mx-auto">
          {/* Left */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="section-tag">FAQ</div>
            <h2
              className="font-black text-white leading-[0.95] mt-3 mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(32px, 5vw, 60px)",
                letterSpacing: "-0.03em",
              }}
            >
              Frequently<br />Asked
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#a0a0a0" }}>
              Have a question that isn&apos;t answered here? Feel free to reach out.
            </p>
            <a
              href="#contact"
              className="btn-secondary text-sm"
              style={{ padding: "10px 22px" }}
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Contact Us
            </a>
          </div>

          {/* Right */}
          <div
            ref={sectionRef}
            className="flex-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
