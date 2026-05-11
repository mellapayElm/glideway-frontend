"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@glideway.com");
  const [password, setPassword] = useState("Admin123!");
  const [message, setMessage] = useState("");

  async function loginAdmin() {
  try {
    setMessage("Logging in...");

    const res = await fetch("http://localhost:5000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setMessage(data.message || "Invalid email or password.");
      return;
    }

    localStorage.setItem("glideway_admin_token", data.token);
    localStorage.setItem(
      "glideway_admin_user",
      JSON.stringify(data.admin)
    );

    setMessage("✅ Login successful. Redirecting...");

    setTimeout(() => {
      window.location.href = "/admin/financial";
    }, 500);

  } catch (error) {
    console.error("Login error:", error);
    setMessage("Unable to login. Make sure backend is running.");
  }
}

  return (
    <main style={main}>
      <div style={card}>
        <h1 style={{ marginTop: 0 }}>Admin Login</h1>
        <p style={{ color: "#6b7280" }}>
          Sign in to access GlideWay admin operations.
        </p>

        <input
          style={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
        />

        <input
          style={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        <button onClick={loginAdmin} style={button}>
          Login
        </button>

        {message && <p style={{ marginTop: "16px" }}>{message}</p>}
      </div>
    </main>
  );
}

const main: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f9fafb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Arial, sans-serif",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: "420px",
  background: "white",
  padding: "32px",
  borderRadius: "20px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
};

const button: React.CSSProperties = {
  width: "100%",
  marginTop: "18px",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#166534",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};