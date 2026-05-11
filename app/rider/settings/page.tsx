"use client";

import Protected from "@/components/Protected";

export default function RiderSettingsPage() {
  return (
    <Protected role="RIDER">
      <main style={page}>
        <h1>⚙️ Rider Settings</h1>
        <p style={subtitle}>Control payments, ride preferences, privacy, notifications, and safety.</p>

        <section style={grid}>
          <Setting title="💳 Payment Methods" items={["Saved cards", "Add payment method", "Default payment", "Receipts"]} />
          <Setting title="🚘 Ride Preferences" items={["Preferred ride type", "Pickup instructions", "Accessibility needs", "Quiet ride preference"]} />
          <Setting title="🔔 Notifications" items={["Ride updates", "Driver arrival alerts", "Payment receipts", "Safety alerts"]} />
          <Setting title="🌐 Language" items={["English", "Tigrinya option later", "App display language"]} />
          <Setting title="🔐 Privacy" items={["Location sharing", "Trip history visibility", "Data privacy controls"]} />
          <Setting title="🛡️ Safety Settings" items={["Emergency contact", "SOS settings", "Trusted contact sharing", "Driver verification display"]} />
          <Setting title="📤 Trip Sharing" items={["Share live trip", "Auto-share with trusted contact", "Trip link settings"]} />
          <Setting title="🗑️ Delete Account" items={["Request account deletion", "Download data before deletion", "Confirm identity first"]} />
        </section>
      </main>
    </Protected>
  );
}

function Setting({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={card}>
      <h2>{title}</h2>
      {items.map((item) => (
        <p key={item}>• {item}</p>
      ))}
    </div>
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