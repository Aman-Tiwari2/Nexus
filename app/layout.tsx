import type { Metadata } from "next";
import "./globals.css";
import GlobalParticles from "@/components/ui/GlobalParticles";

export const metadata: Metadata = {
  title: "Nexus | Student Placement Community",
  description:
    "Nexus is a student-driven community helping college students master coding, aptitude, hackathons, and placement skills to land their dream jobs.",
  keywords: [
    "student community",
    "placement preparation",
    "coding contest",
    "hackathon",
    "aptitude",
    "DSA",
    "interview prep",
    "college community",
  ],
  openGraph: {
    title: "Nexus | Student Placement Community",
    description:
      "Build Skills. Crack Placements. Shape Your Future. Join 1500+ students on the path to their dream job.",
    type: "website",
    siteName: "Nexus Community",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus | Student Placement Community",
    description: "Build Skills. Crack Placements. Shape Your Future.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased" style={{ background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "var(--font-body)", position: "relative" }}>
        <GlobalParticles />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
