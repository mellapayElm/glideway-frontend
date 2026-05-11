"use client";

import { useState } from "react";

export default function RiderRegisterPage() {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    otp: "",
    email: "",
    address: "",
    password: "",
    paymentMethod: "",
    acceptTerms: false,
  });

  function sendOtp() {
    if (!form.phone) {
      alert("Please enter phone number first.");
      return;
    }

    setOtpSent(true);
    alert("Demo OTP sent. Use 123456.");
  }

  function verifyOtp() {
    if (form.otp === "123456") {
      alert("Phone verified successfully.");
      setStep(2);
    } else {
      alert("Invalid OTP. Use demo code 123456.");
    }
  }

  async function submitRider() {
    if (
      !form.fullName ||
      !form.phone ||
      !form.email ||
      !form.address ||
      !form.password ||
      !form.paymentMethod ||
      !form.acceptTerms
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/rider/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          address: form.address,
          password: form.password,
          paymentMethod: form.paymentMethod,
          acceptedTerms: form.acceptTerms,
          role: "RIDER",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Rider registered successfully. Please login.");
        window.location.href = "/login";
      } else {
        alert("❌ " + (data.error || "Failed to register"));
      }
    } catch (error) {
      console.error("RIDER REGISTER ERROR:", error);
      alert("❌ Cannot connect to backend");
    }
  }

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>GlideWay Rider Registration</h1>
        <p style={subtitle}>
          Create your secure rider account to request smooth and trusted rides.
        </p>

        <div style={stepsBox}>
          <span style={stepBadge(step === 1)}>1. Phone Verification</span>
          <span style={stepBadge(step === 2)}>2. Rider Details</span>
          <span style={stepBadge(step === 3)}>3. Payment & Terms</span>
        </div>

        {step === 1 && (
          <>
            <h2>Verify Phone Number</h2>

            <input
              style={input}
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <button style={greenButton} onClick={sendOtp}>
              Send OTP Code
            </button>

            {otpSent && (
              <>
                <input
                  style={input}
                  placeholder="Enter OTP Code"
                  value={form.otp}
                  onChange={(e) => setForm({ ...form, otp: e.target.value })}
                />

                <button style={blueButton} onClick={verifyOtp}>
                  Verify OTP
                </button>
              </>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2>Rider Personal Details</h2>

            <input
              style={input}
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />

            <input
              style={input}
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              style={input}
              placeholder="Home Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <input
              style={input}
              type="password"
              placeholder="Create Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button style={greenButton} onClick={() => setStep(3)}>
              Continue to Payment
            </button>

            <button style={grayButton} onClick={() => setStep(1)}>
              Back
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Payment Method & Terms</h2>

            <select
              style={input}
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value })
              }
            >
              <option value="">Select Payment Method</option>
              <option value="card">Credit / Debit Card</option>
              <option value="wallet">Digital Wallet</option>
              <option value="worldpay">Worldpay Secure Payment</option>
            </select>

            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={(e) =>
                  setForm({ ...form, acceptTerms: e.target.checked })
                }
              />
              I accept GlideWay Terms, Privacy Policy, and Safety Agreement.
            </label>

            <button style={greenButton} onClick={submitRider}>
              Complete Rider Registration
            </button>

            <button style={grayButton} onClick={() => setStep(2)}>
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #031008, #071a10, #102b1a)",
  color: "white",
  padding: "30px",
};

const card: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  background: "rgba(255,255,255,0.08)",
  padding: "28px",
  borderRadius: "22px",
  border: "1px solid rgba(124,255,58,0.35)",
  boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
};

const title: React.CSSProperties = {
  color: "#9CFF57",
  marginBottom: "8px",
};

const subtitle: React.CSSProperties = {
  color: "#cbd5e1",
  marginBottom: "20px",
};

const stepsBox: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "22px",
};

function stepBadge(active: boolean): React.CSSProperties {
  return {
    padding: "10px",
    borderRadius: "10px",
    background: active ? "#16a34a" : "#1f2937",
    color: "white",
    fontWeight: "bold",
  };
}

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

const blueButton: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const grayButton: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "12px",
  border: "none",
  background: "#374151",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const checkboxRow: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginTop: "14px",
  color: "#d1d5db",
};