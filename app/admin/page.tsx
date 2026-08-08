"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Try again.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#050808",
      backgroundImage: "radial-gradient(circle at 50% 30%, rgba(0,229,204,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.03) 0%, transparent 60%)",
      padding: "24px",
    }}>
      {/* Subtle grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        width: "100%", maxWidth: "400px", position: "relative", zIndex: 1,
      }}>
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "56px", height: "56px", borderRadius: "16px",
            background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)",
            marginBottom: "16px",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 2v20M2 7l10 5 10-5" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700,
            color: "#F5F5F5", margin: "0 0 6px",
          }}>NEXUS Admin</h1>
          <p style={{ fontSize: "13px", color: "#899393", margin: 0 }}>
            Sign in to manage your community portal
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px", padding: "32px",
        }}>
          <form onSubmit={handleLogin}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#899393", textTransform: "uppercase", marginBottom: "8px" }}>
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                width: "100%", padding: "12px 16px", borderRadius: "10px",
                background: "rgba(255,255,255,0.04)", border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
                color: "#F5F5F5", fontSize: "14px", outline: "none",
                boxSizing: "border-box", marginBottom: "8px",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"; }}
            />

            {error && (
              <p style={{ fontSize: "12px", color: "#ef4444", margin: "0 0 16px" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px", borderRadius: "10px",
                background: loading ? "rgba(249,115,22,0.5)" : "#f97316",
                color: "#0c0c0c", fontWeight: 700, fontSize: "14px",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                marginTop: error ? "0" : "8px",
                transition: "background 0.2s, transform 0.1s",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#ea6a0a"; }}
              onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#f97316"; }}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "11px", color: "rgba(137,147,147,0.5)", marginTop: "24px" }}>
          NEXUS Community · Admin Panel · 2026
        </p>
      </div>
    </div>
  );
}
