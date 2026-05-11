"use client";

import Protected from "@/components/Protected";

export default function RiderTripsPage() {
  return (
    <Protected role="RIDER">
      <main style={page}>
        <h1>🚘 My Trips</h1>
        <p style={subtitle}>View your current rides, completed rides, receipts, driver details, and safety records.</p>

        <section style={grid}>
          <div style={card}>
            <h2>Current Trip</h2>
            <p>Status: No active ride right now.</p>
            <p>Book a ride to see live driver ETA, route, and fare.</p>
          </div>

          <div style={card}>
            <h2>Trip History</h2>
            <p>• Completed rides</p>
            <p>• Cancelled rides</p>
            <p>• Scheduled rides</p>
            <p>• Ride receipts</p>
          </div>

          <div style={card}>
            <h2>Safety Records</h2>
            <p>• Shared trips</p>
            <p>• Emergency reports</p>
            <p>• Driver verification shown before pickup</p>
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

const subtitle: React.CSSProperties = { color: "#b8eec6" };

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