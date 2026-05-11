"use client";

import Protected from "@/components/Protected";

export default function RiderProfilePage() {
  return (
    <Protected role="RIDER">
      <main style={page}>
        <h1>👤 Rider Profile</h1>
        <p style={subtitle}>Manage rider identity, contact details, saved places, and safety information.</p>

        <section style={grid}>
          <div style={card}>
            <h2>Personal Information</h2>
            <p><b>Full name:</b> Rider User</p>
            <p><b>Phone number:</b> +1 (234) 567-8900</p>
            <p><b>Email:</b> rider@glideway.com</p>
            <p><b>Home address:</b> Add home address</p>
          </div>

          <div style={card}>
            <h2>Saved Places</h2>
            <p>🏠 Home</p>
            <p>💼 Work</p>
            <p>⭐ Favorite destinations</p>
          </div>

          <div style={card}>
            <h2>Emergency Contact</h2>
            <p><b>Name:</b> Add trusted contact</p>
            <p><b>Phone:</b> Add emergency phone</p>
            <p>Trip sharing can notify this contact when needed.</p>
          </div>

          <div style={card}>
            <h2>Security</h2>
            <p>🔐 Password change</p>
            <p>🛡️ Login protection</p>
            <p>📱 Device monitoring</p>
          </div>

          <div style={card}>
            <h2>Driver Safety Visibility</h2>
            <p>✅ Driver photo shown before pickup</p>
            <p>✅ Driver license verification status</p>
            <p>✅ Vehicle and plate shown for rider safety</p>
          </div>
        </section>
      </main>
    </Protected>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "32px",
  background: "linear-gradient(135deg, #031008, #071a10, #102b1a)",
  color: "white",
};

const subtitle: React.CSSProperties = {
  color: "#b8eec6",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginTop: "24px",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.09)",
  border: "1px solid rgba(124,255,58,0.3)",
  borderRadius: "20px",
  padding: "22px",
};