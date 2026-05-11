"use client";

export default function AdminSettings() {
  return (
    <div style={container}>
      <h1>⚙️ Admin Settings</h1>

      <div style={grid}>
        <div style={card}>
          <h3>🏢 Company</h3>
          <p>Company info</p>
          <p>Service cities / zones</p>
        </div>

        <div style={card}>
          <h3>💰 Pricing</h3>
          <p>Base fare rules</p>
          <p>Distance & time rates</p>
          <p>Surge pricing</p>
        </div>

        <div style={card}>
          <h3>🚗 Driver</h3>
          <p>Driver approval settings</p>
          <p>Background check rules</p>
        </div>

        <div style={card}>
          <h3>💳 Payments</h3>
          <p>Payment processor (Stripe / Worldpay)</p>
          <p>Payout configuration</p>
        </div>

        <div style={card}>
          <h3>🔐 Security</h3>
          <p>Staff permissions</p>
          <p>Audit logs</p>
        </div>

        <div style={card}>
          <h3>🔔 Notifications</h3>
          <p>Email / SMS alerts</p>
          <p>System alerts</p>
        </div>
      </div>
    </div>
  );
}

const container = {
  padding: "30px",
  color: "white",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const card = {
  padding: "20px",
  background: "#111",
  borderRadius: "12px",
};