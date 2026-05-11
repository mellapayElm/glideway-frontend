"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";

export default function AdminRidersPage() {
  const [riders, setRiders] = useState<any[]>([]);
  const [rides, setRides] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadData() {
    try {
      const ridesRes = await fetch("http://localhost:5000/rides");
      const ridesData = await ridesRes.json();

      setRides(Array.isArray(ridesData) ? ridesData : []);

      const sampleRiders = [
        {
          id: "rider-001",
          name: "Verified Rider",
          email: "rider@glideway.com",
          phone: "+1 (234) 567-8910",
          status: "active",
          trips: ridesData?.length || 0,
          safety: "clear",
          refunds: 0,
        },
        {
          id: "rider-002",
          name: "Sarah M.",
          email: "sarah@example.com",
          phone: "+1 (555) 777-2222",
          status: "active",
          trips: 12,
          safety: "clear",
          refunds: 1,
        },
        {
          id: "rider-003",
          name: "John D.",
          email: "john@example.com",
          phone: "+1 (555) 111-3333",
          status: "review",
          trips: 4,
          safety: "needs review",
          refunds: 2,
        },
      ];

      setRiders(sampleRiders);
    } catch (error) {
      console.error("Failed to load riders:", error);
      setMessage("Unable to load rider management data.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Protected role="ADMIN">
      <main style={page}>
        <section style={hero}>
          <p style={badge}>👥 GlideWay Rider Management</p>

          <h1 style={title}>Rider Management Center</h1>

          <p style={subtitle}>
            Manage rider accounts, trip history, refunds, complaints, safety
            reports, account status, and support needs.
          </p>
        </section>

        {message && <div style={messageBox}>{message}</div>}

        <section style={statsGrid}>
          <Stat title="Total Riders" value={riders.length} />
          <Stat
            title="Active Riders"
            value={riders.filter((r) => r.status === "active").length}
          />
          <Stat
            title="Needs Review"
            value={riders.filter((r) => r.status === "review").length}
          />
          <Stat title="Total Trips" value={rides.length} />
        </section>

        <section style={panel}>
          <h2 style={sectionTitle}>Rider Accounts</h2>

          {riders.length === 0 ? (
            <p style={muted}>No riders found.</p>
          ) : (
            riders.map((rider) => (
              <div key={rider.id} style={riderCard}>
                <div style={riderTop}>
                  <div>
                    <h3 style={riderName}>{rider.name}</h3>
                    <p style={smallText}>Rider ID: {rider.id}</p>
                    <p style={smallText}>{rider.email}</p>
                    <p style={smallText}>{rider.phone}</p>
                  </div>

                  <span
                    style={
                      rider.status === "active" ? activeBadge : reviewBadge
                    }
                  >
                    {rider.status}
                  </span>
                </div>

                <div style={infoGrid}>
                  <Info label="Trips" value={String(rider.trips)} />
                  <Info label="Refunds" value={String(rider.refunds)} />
                  <Info label="Safety" value={rider.safety} />
                  <Info label="Account" value={rider.status} />
                </div>

                <div style={buttonRow}>
                  <button style={greenButton}>View Trips</button>
                  <button style={outlineButton}>Review Account</button>
                  <button style={redButton}>Suspend</button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </Protected>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div style={statCard}>
      <p style={statLabel}>{title}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={infoBox}>
      <p style={infoLabel}>{label}</p>
      <b style={infoValue}>{value}</b>
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
  boxShadow: "0 12px 30px rgba(87,190,125,0.14)",
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
  fontWeight: 700,
  lineHeight: 1.7,
};

const messageBox: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  color: "#2F8F57",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "20px",
  fontWeight: 900,
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "18px",
  marginBottom: "24px",
};

const statCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "2px solid #BBF7D0",
  borderRadius: "22px",
  padding: "22px",
  boxShadow: "0 12px 26px rgba(17,24,39,0.08)",
};

const statLabel: React.CSSProperties = {
  color: "#14532D",
  fontWeight: 900,
};

const statValue: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "34px",
  fontWeight: 900,
};

const panel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const sectionTitle: React.CSSProperties = {
  color: "#2F8F57",
  marginTop: 0,
};

const muted: React.CSSProperties = {
  color: "#6B7280",
};

const riderCard: React.CSSProperties = {
  padding: "20px",
  borderRadius: "20px",
  border: "1px solid #E5E7EB",
  background: "#FFFFFF",
  marginBottom: "18px",
  boxShadow: "0 10px 24px rgba(17,24,39,0.06)",
};

const riderTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
};

const riderName: React.CSSProperties = {
  margin: 0,
  color: "#111827",
};

const smallText: React.CSSProperties = {
  color: "#6B7280",
  margin: "6px 0",
};

const activeBadge: React.CSSProperties = {
  background: "#ECFDF3",
  color: "#2F8F57",
  border: "1px solid #57BE7D",
  borderRadius: "999px",
  padding: "8px 14px",
  fontWeight: 900,
  textTransform: "capitalize",
};

const reviewBadge: React.CSSProperties = {
  background: "#FEF3C7",
  color: "#92400E",
  border: "1px solid #F59E0B",
  borderRadius: "999px",
  padding: "8px 14px",
  fontWeight: 900,
  textTransform: "capitalize",
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "12px",
  marginTop: "18px",
};

const infoBox: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "14px",
  padding: "14px",
};

const infoLabel: React.CSSProperties = {
  margin: 0,
  color: "#4B5563",
  fontWeight: 800,
};

const infoValue: React.CSSProperties = {
  color: "#2F8F57",
  fontSize: "18px",
};

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const greenButton: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "none",
  background: "#57BE7D",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};

const outlineButton: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "1px solid #57BE7D",
  background: "#ECFDF3",
  color: "#2F8F57",
  fontWeight: 900,
  cursor: "pointer",
};

const redButton: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "none",
  background: "#EF4444",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};