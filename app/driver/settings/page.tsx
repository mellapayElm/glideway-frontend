"use client";

import DriverTopNav from "@/components/DriverTopNav";
import Protected from "@/components/Protected";

export default function DriverSettingsPage() {
  return (
    <Protected role="DRIVER">
      <DriverTopNav />

      <main style={page}>
        <section style={hero}>
          <p style={badge}>⚙️ GlideWay Driver Settings</p>

          <h1 style={title}>Driver Preferences & Account Settings</h1>

          <p style={subtitle}>
            Manage availability, navigation, payouts, safety, service areas,
            notifications, tax documents, and driver security preferences.
          </p>
        </section>

        <section style={grid}>
          <Setting
            title="🟢 Availability"
            items={[
              "Go online/offline preferences",
              "Working hours",
              "Break mode",
              "Auto-accept settings",
            ]}
          />

          <Setting
            title="📍 Service Area"
            items={[
              "Preferred zones",
              "Airport rides",
              "Long-distance rides",
              "City geofencing",
            ]}
          />

          <Setting
            title="🗺️ Navigation"
            items={[
              "Google Maps",
              "Waze preference",
              "Avoid tolls option",
              "Traffic-aware routing",
            ]}
          />

          <Setting
            title="🔔 Notifications"
            items={[
              "New ride alerts",
              "Safety alerts",
              "Payout notifications",
              "Trip reminders",
            ]}
          />

          <Setting
            title="💵 Payout Settings"
            items={[
              "Bank account",
              "Instant cash out",
              "Weekly payout schedule",
              "Tax withholding summary",
            ]}
          />

          <Setting
            title="🛡️ Safety Settings"
            items={[
              "SOS settings",
              "Trip sharing",
              "Rider issue reporting",
              "Emergency contacts",
            ]}
          />

          <Setting
            title="📄 Document Renewal Alerts"
            items={[
              "License renewal",
              "Insurance renewal",
              "Vehicle registration",
              "Background check reminders",
            ]}
          />

          <Setting
            title="🔐 Password & Security"
            items={[
              "Change password",
              "Two-factor authentication",
              "Login activity",
              "Trusted devices",
            ]}
          />

          <Setting
            title="🧾 Tax Documents"
            items={[
              "1099 tax forms",
              "Yearly earnings",
              "Tax profile",
              "Download statements",
            ]}
          />
        </section>
      </main>
    </Protected>
  );
}

function Setting({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>

      {items.map((item) => (
        <p key={item} style={itemText}>
          • {item}
        </p>
      ))}

      <button style={button}>Manage Settings</button>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "30px",
  background: "#FFFFFF",
  color: "#111827",
  fontFamily: "Arial, sans-serif",
};

const hero: React.CSSProperties = {
  padding: "30px",
  borderRadius: "26px",
  background: "linear-gradient(135deg, #FFFFFF, #ECFDF3)",
  border: "1px solid #D1D5DB",
  marginBottom: "24px",
  boxShadow: "0 12px 30px rgba(87, 190, 125, 0.14)",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  padding: "9px 16px",
  borderRadius: "999px",
  background: "#ECFDF3",
  color: "#2F8F57",
  border: "1px solid #57BE7D",
  fontWeight: 900,
};

const title: React.CSSProperties = {
  fontSize: "38px",
  color: "#57BE7D",
  margin: "12px 0 8px",
  fontWeight: 900,
};

const subtitle: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginTop: "24px",
};

const card: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
};

const cardTitle: React.CSSProperties = {
  color: "#2F8F57",
  marginTop: 0,
  marginBottom: "14px",
};

const itemText: React.CSSProperties = {
  color: "#4B5563",
  marginBottom: "8px",
};

const button: React.CSSProperties = {
  marginTop: "18px",
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #57BE7D",
  background: "#ECFDF3",
  color: "#2F8F57",
  fontWeight: 900,
  cursor: "pointer",
};