"use client";

import { useState } from "react";

export default function BecomeDriverPage() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    license: "",
    insurance: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    plate: "",
    payoutAccount: "",
    backgroundConsent: false,
  });

  async function submitApplication() {
  if (!form.fullName || !form.phone || !form.email || !form.license || !form.insurance || !form.backgroundConsent) {
    alert("Please complete all required fields.");
    return;
  }

  const res = await fetch("http://localhost:5000/driver/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (data.success) {
    alert("✅ Application submitted. Await approval.");
  } else {
    alert("❌ Submission failed");
  }
}
  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Become a GlideWay Driver</h1>
        <p style={subtitle}>
          Apply to drive with GlideWay. Your documents will be reviewed before activation.
        </p>

        <div style={stepsBox}>
          <span style={stepBadge(step === 1)}>1. Personal Details</span>
          <span style={stepBadge(step === 2)}>2. Documents</span>
          <span style={stepBadge(step === 3)}>3. Vehicle & Payout</span>
          <span style={stepBadge(step === 4)}>4. Consent & Submit</span>
        </div>

        {step === 1 && (
          <>
            <h2>Personal Details</h2>

            <input style={input} placeholder="Full Name" onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <input style={input} placeholder="Phone Number" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input style={input} placeholder="Email Address" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input style={input} placeholder="Home Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />

            <button style={greenButton} onClick={() => setStep(2)}>
              Continue to Documents
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Upload Driver Documents</h2>

            <label style={label}>Driver License</label>
            <input style={input} type="file" onChange={(e) => setForm({ ...form, license: e.target.files?.[0]?.name || "" })} />

            <label style={label}>Insurance</label>
            <input style={input} type="file" onChange={(e) => setForm({ ...form, insurance: e.target.files?.[0]?.name || "" })} />

            <button style={greenButton} onClick={() => setStep(3)}>
              Continue to Vehicle
            </button>

            <button style={grayButton} onClick={() => setStep(1)}>
              Back
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Vehicle & Payout Details</h2>

            <input style={input} placeholder="Vehicle Make" onChange={(e) => setForm({ ...form, vehicleMake: e.target.value })} />
            <input style={input} placeholder="Vehicle Model" onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })} />
            <input style={input} placeholder="Vehicle Year" onChange={(e) => setForm({ ...form, vehicleYear: e.target.value })} />
            <input style={input} placeholder="License Plate" onChange={(e) => setForm({ ...form, plate: e.target.value })} />
            <input style={input} placeholder="Payout Account / Bank Info" onChange={(e) => setForm({ ...form, payoutAccount: e.target.value })} />

            <button style={greenButton} onClick={() => setStep(4)}>
              Continue to Consent
            </button>

            <button style={grayButton} onClick={() => setStep(2)}>
              Back
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h2>Background Check Consent</h2>

            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={form.backgroundConsent}
                onChange={(e) =>
                  setForm({ ...form, backgroundConsent: e.target.checked })
                }
              />
              I consent to a background check, driving history review, and document verification.
            </label>

            <div style={reviewBox}>
              <b>Application Status:</b>
              <p>Submitted applications will be reviewed by GlideWay Admin.</p>
              <p>Driver activation happens only after approval.</p>
            </div>

            <button style={greenButton} onClick={submitApplication}>
              Submit Driver Application
            </button>

            <button style={grayButton} onClick={() => setStep(3)}>
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
  background: "#050505",
  color: "white",
  padding: "30px",
};

const card: React.CSSProperties = {
  maxWidth: "620px",
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

const label: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  color: "#d1d5db",
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
};

const checkboxRow: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginTop: "14px",
};

const reviewBox: React.CSSProperties = {
  marginTop: "18px",
  padding: "14px",
  background: "#0f172a",
  borderRadius: "12px",
};