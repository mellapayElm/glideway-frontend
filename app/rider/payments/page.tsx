"use client";

import Protected from "@/components/Protected";

export default function RiderPaymentsPage() {
  return (
    <Protected role="RIDER">
      <main style={page}>
        <h1>💳 Rider Payments</h1>
        <p style={subtitle}>Manage saved cards, receipts, tips, refunds, and secure payment preferences.</p>

        <section style={grid}>
          <div style={card}>
            <h2>Saved Payment Method</h2>
            <p>Visa •••• 4242</p>
            <p>Status: Active</p>
          </div>

          <div style={card}>
            <h2>Receipts</h2>
            <p>• Ride receipts</p>
            <p>• Tip history</p>
            <p>• Refund requests</p>
          </div>

          <div style={card}>
            <h2>Security</h2>
            <p>• Tokenized payments</p>
            <p>• No raw card data stored</p>
            <p>• Secure processor ready</p>
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