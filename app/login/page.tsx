"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type UserRole = "ADMIN" | "DRIVER" | "RIDER";

export default function LoginPage() {
  const [email, setEmail] = useState("BH@glideway.com");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token || !data.user) {
        alert("❌ " + (data.error || "Login failed"));
        return;
      }

      // 🔥 Normalize role (THIS FIXES YOUR ISSUE)
      const role: UserRole = String(data.user.role || "RIDER").toUpperCase() as UserRole;

      // ✅ Save auth
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user,
          role,
          email: data.user.email || email,
        })
      );

      alert("✅ Login successful!");

      // 🔥 Correct redirect
      if (role === "ADMIN") router.push("/admin");
      else if (role === "DRIVER") router.push("/driver");
      else router.push("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("❌ Cannot connect to backend");
    }
  }

  return (
    <main style={page}>
      <div style={card}>
        <h1 style={title}>GlideWay Login</h1>
        <p style={subtitle}>Secure access for Rider, Driver, and Admin.</p>

        <input
          style={inputStyle}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} onClick={login}>
          Login
        </button>
      </div>
    </main>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg, #031008, #071a10, #102b1a)",
  color: "white",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: "430px",
  padding: "30px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(124,255,58,0.35)",
  boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
};

const title: React.CSSProperties = {
  fontSize: "32px",
  marginBottom: "8px",
};

const subtitle: React.CSSProperties = {
  color: "#b8eec6",
  marginBottom: "22px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#16a34a",
  color: "white",
  fontWeight: "bold",
  fontSize: "17px",
  cursor: "pointer",
};