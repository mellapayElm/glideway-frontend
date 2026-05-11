"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "RIDER",
  });

  async function register() {
    try {
      console.log("Sending data:", form);

      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("REGISTER RESPONSE:", data);

      if (res.ok && data.userId) {
        alert("✅ Account created successfully!");
      } else {
        alert("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("❌ Cannot connect to backend");
    }
  }

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: "auto" }}>
      <h2>Create GlideWay Account</h2>

      <input
        placeholder="Full Name"
        style={input}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <input
        placeholder="Email"
        style={input}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Phone"
        style={input}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        style={input}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        style={input}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="RIDER">Rider</option>
        <option value="DRIVER">Driver</option>
      </select>

      <button
        type="button"
        style={button}
        onClick={() => {
          
          register();
        }}
      >
        Create Account
      </button>
    </div>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const button: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
};