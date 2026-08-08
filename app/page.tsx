import PageLoader from "@/components/layout/PageLoader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import EventSection from "@/components/sections/EventSection";
import EventsOverview from "@/components/sections/EventsOverview";
import Team from "@/components/sections/Team";
import WhyJoin from "@/components/sections/WhyJoin";
import Roadmap from "@/components/sections/Roadmap";
import FAQ from "@/components/sections/FAQ";
import Sponsors from "@/components/sections/Sponsors";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Global UI */}
      <PageLoader />
      <ScrollProgress />
      <BackToTop />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          background: "var(--bg-primary)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.95)",
        }}
      >
        <Hero />
        <About />
        <Timeline />
        <EventsOverview />
        <EventSection />
        <Team />
        <Roadmap />
        <WhyJoin />
        <FAQ />
        <Sponsors />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
