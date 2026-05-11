"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadDrivers() {
    try {
      const res = await fetch("http://localhost:5000/drivers", {
        cache: "no-store",
      });
      const data = await res.json();
      setDrivers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load drivers:", error);
      setMessage("Unable to load drivers.");
    }
  }

  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <Protected role="ADMIN">
      <main style={page}>
        <section style={hero}>
          <p style={badge}>🚗 GlideWay Driver Management</p>
          <h1 style={title}>Driver Management Center</h1>
          <p style={subtitle}>
            Manage driver approval, suspension, document verification,
            background checks, compliance alerts, ratings, earnings, and
            operational readiness in one professional admin center.
          </p>
        </section>

        {message && <div style={messageBox}>{message}</div>}

        <section style={statsGrid}>
          <Stat title="Total Drivers" value={drivers.length} />
          <Stat
            title="Online Drivers"
            value={drivers.filter((d) => d.status === "online").length}
          />
          <Stat
            title="Verified Drivers"
            value={drivers.filter((d) => d.verified).length}
          />
          <Stat
            title="Compliance Review"
            value={drivers.filter((d) => !d.verified).length}
          />
        </section>

        <section style={managementPanel}>
          <p style={badge}>Driver Management System</p>

          <h2 style={sectionTitle}>
            Complete Driver Oversight & Compliance Control
          </h2>

          <p style={sectionText}>
            GlideWay gives administrators a professional driver management
            system to review onboarding, approve qualified drivers, suspend
            unsafe or noncompliant accounts, verify documents, monitor earnings,
            review ratings, and protect platform quality beyond the standard
            ride-share experience.
          </p>

          <div style={managementGrid}>
            <ManagementCard
              title="Approve Drivers"
              text="Review applications and activate qualified drivers after license, insurance, identity, and vehicle requirements are complete."
            />
            <ManagementCard
              title="Suspend Drivers"
              text="Temporarily restrict driver access for safety incidents, expired documents, low ratings, complaints, or policy violations."
            />
            <ManagementCard
              title="Verify Documents"
              text="Review driver license, insurance, registration, vehicle details, profile identity, and required compliance records."
            />
            <ManagementCard
              title="Review Background Checks"
              text="Track screening status and confirm drivers meet GlideWay trust, safety, and eligibility standards before approval."
            />
            <ManagementCard
              title="Track Driver Ratings"
              text="Monitor rider feedback, professionalism, service quality, trip performance, and long-term reliability trends."
            />
            <ManagementCard
              title="Monitor Earnings"
              text="View driver earnings, payout balances, completed trip income, payout history, and financial activity."
            />
            <ManagementCard
              title="Compliance Alerts"
              text="Identify expired documents, missing requirements, unresolved safety flags, insurance issues, and risk alerts."
            />
          </div>
        </section>

        <section style={panel}>
          <h2 style={sectionTitle}>Driver List</h2>

          {drivers.length === 0 ? (
            <p style={muted}>No drivers found.</p>
          ) : (
            drivers.map((driver) => (
              <div key={driver.id || driver.driverId} style={driverCard}>
                <div style={driverTop}>
                  <div style={driverLeft}>
                    <img
                      src={
                        driver.photo ||
                        "https://randomuser.me/api/portraits/men/32.jpg"
                      }
                      alt="Driver"
                      style={photo}
                    />

                    <div>
                      <h3 style={driverName}>
                        {driver.name || "GlideWay Driver"}
                      </h3>

                      <p style={smallText}>
                        Driver ID: {driver.driverId || driver.id || "N/A"}
                      </p>

                      <p style={smallText}>
                        Vehicle: {driver.color || "Black"}{" "}
                        {driver.car || "Vehicle"} · Plate{" "}
                        {driver.plate || "N/A"}
                      </p>
                    </div>
                  </div>

                  <span
                    style={
                      driver.status === "online" ? onlineBadge : offlineBadge
                    }
                  >
                    {driver.status === "online" ? "Online" : "Offline"}
                  </span>
                </div>

                <div style={infoGrid}>
                  <Info label="Rating" value={driver.rating || "4.92"} />
                  <Info
                    label="Verified"
                    value={driver.verified ? "Yes" : "Pending"}
                  />
                  <Info
                    label="Background Check"
                    value={driver.backgroundCheck || "Review Needed"}
                  />
                  <Info
                    label="Compliance"
                    value={driver.verified ? "Approved" : "Needs Review"}
                  />
                  <Info
                    label="Earnings"
                    value={`$${Number(driver.totalEarnings || 0).toFixed(2)}`}
                  />
                  <Info
                    label="Alerts"
                    value={
                      driver.verified ? "Clear" : "Document / Compliance Alert"
                    }
                  />
                </div>

                <div style={buttonRow}>
                  <button style={greenButton}>Approve</button>
                  <button style={outlineButton}>Verify Documents</button>
                  <button style={outlineButton}>Background Check</button>
                  <button style={outlineButton}>View Earnings</button>
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

function ManagementCard({ title, text }: { title: string; text: string }) {
  return (
    <div style={managementCard}>
      <h3 style={managementTitle}>{title}</h3>
      <p style={managementText}>{text}</p>
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

const managementPanel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "26px",
  padding: "28px",
  marginBottom: "24px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const managementGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
  marginTop: "22px",
};

const managementCard: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "18px",
  padding: "18px",
};

const managementTitle: React.CSSProperties = {
  color: "#14532D",
  marginTop: 0,
  fontWeight: 900,
};

const managementText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 700,
};

const sectionText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 700,
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
  fontWeight: 900,
};

const muted: React.CSSProperties = {
  color: "#6B7280",
};

const driverCard: React.CSSProperties = {
  padding: "20px",
  borderRadius: "20px",
  border: "1px solid #E5E7EB",
  background: "#FFFFFF",
  marginBottom: "18px",
  boxShadow: "0 10px 24px rgba(17,24,39,0.06)",
};

const driverTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
};

const driverLeft: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const photo: React.CSSProperties = {
  width: "76px",
  height: "76px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #57BE7D",
};

const driverName: React.CSSProperties = {
  margin: 0,
  color: "#111827",
};

const smallText: React.CSSProperties = {
  color: "#6B7280",
  margin: "6px 0",
};

const onlineBadge: React.CSSProperties = {
  background: "#ECFDF3",
  color: "#2F8F57",
  border: "1px solid #57BE7D",
  borderRadius: "999px",
  padding: "8px 14px",
  fontWeight: 900,
};

const offlineBadge: React.CSSProperties = {
  background: "#F3F4F6",
  color: "#4B5563",
  border: "1px solid #D1D5DB",
  borderRadius: "999px",
  padding: "8px 14px",
  fontWeight: 900,
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