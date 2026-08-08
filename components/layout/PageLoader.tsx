"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className="page-loader"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo Image */}
        <div className="relative">
          <img 
            src="/images/logo.png" 
            alt="Nexus Community" 
            className="w-20 h-20 object-contain animate-pulse"
          />
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "120px",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "#f97316",
              animation: "loading-bar 1.8s ease-out forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
