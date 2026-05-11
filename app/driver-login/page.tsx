"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DriverLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    phone: "",
  });

  async function loginDriver() {
    const res = await fetch("http://localhost:5000/driver/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("driverToken", data.token);
      localStorage.setItem("driverProfile", JSON.stringify(data.driver));

      alert("✅ Driver login successful");
      router.push("/driver");
    } else {
      alert("❌ " + (data.error || "Driver login failed"));
    }
  }

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>GlideWay Driver Login</h1>
        <p style={subtitle}>
          Only approved and activated drivers can access the driver app.
        </p>

        <input
          style={input}
          placeholder="Approved Driver Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={input}
          placeholder="Approved Driver Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button style={greenButton} onClick={loginDriver}>
          Login as Driver
        </button>
      </div>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#050505",
  color: "white",
  padding: "30px",
};

const card: React.CSSProperties = {
  maxWidth: "440px",
  margin: "0 auto",
  background: "#111",
  padding: "26px",
  borderRadius: "18px",
  border: "1px solid #1f2937",
};

const title: React.CSSProperties = {
  color: "#22c55e",
};

const subtitle: React.CSSProperties = {
  color: "#cbd5e1",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #374151",
  background: "#020617",
  color: "white",
};

const greenButton: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "12px",
  border: "none",
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};