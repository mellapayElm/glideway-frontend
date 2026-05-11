"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminSafetyCenterPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadReports() {
    try {
      const res = await fetch("http://localhost:5000/safety/reports", {
        cache: "no-store",
      });

      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load safety reports:", error);
      setMessage("Unable to load safety reports.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(safetyId: string, status: string) {
    try {
      const res = await fetch(
        `http://localhost:5000/safety/report/${safetyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage(`✅ Report marked as ${status}.`);
        loadReports();
      } else {
        setMessage(data.message || "Unable to update report.");
      }
    } catch (error) {
      console.error("Status update failed:", error);
      setMessage("Server error while updating report.");
    }
  }

  useEffect(() => {
    loadReports();
    const timer = setInterval(loadReports, 5000);
    return () => clearInterval(timer);
  }, []);

  const openReports = reports.filter((r) => (r.status || "open") === "open").length;
  const reviewingReports = reports.filter((r) => r.status === "reviewing").length;
  const resolvedReports = reports.filter((r) => r.status === "resolved").length;

  if (loading) {
    return <main style={page}>Loading GlideWay Safety Center...</main>;
  }

  return (
    <main style={page}>
      <section style={header}>
        <div>
          <p style={eyebrow}>GlideWay Admin</p>
          <h1 style={title}>Safety Center</h1>
          <p style={subtitle}>
            Monitor incidents, rider safety alerts, SOS events, complaints, and
            operational risk reports in real time.
          </p>
        </div>

        <Link href="/admin" style={backButton}>
          ← Back to Admin
        </Link>
      </section>

      {message && <div style={messageBox}>{message}</div>}

      <section style={statsGrid}>
        <Stat title="Total Reports" value={reports.length} />
        <Stat title="Open" value={openReports} />
        <Stat title="Reviewing" value={reviewingReports} />
        <Stat title="Resolved" value={resolvedReports} />
      </section>

      <section style={hero}>
        <p style={badge}>GlideWay Safety</p>
        <h2 style={heroTitle}>Safety is built into every ride.</h2>
        <p style={heroText}>
          GlideWay is designed with rider protection, driver verification, live
          trip monitoring, emergency support, and trusted communication.
        </p>
      </section>

      <section style={featureGrid}>
        <FeatureCard
          icon="🛡️"
          title="Verified Drivers"
          text="Driver identity, insurance, license validation, and compliance approval before activation."
        />

        <FeatureCard
          icon="📍"
          title="Live Trip Tracking"
          text="Monitor active rides, driver movement, trip progress, and live operational safety events."
        />

        <FeatureCard
          icon="🚨"
          title="Emergency SOS"
          text="Emergency alerts and rapid-response safety escalation tools for riders and drivers."
        />

        <FeatureCard
          icon="💬"
          title="Secure Communication"
          text="Protected rider-driver communication without exposing private phone numbers."
        />

        <FeatureCard
          icon="🚗"
          title="Vehicle Verification"
          text="Vehicle details, plate verification, and approved driver profile transparency."
        />

        <FeatureCard
          icon="📋"
          title="Incident Reporting"
          text="Real-time operational safety reporting, escalation management, and resolution tracking."
        />
      </section>

      <section style={panel}>
        <h2 style={sectionTitle}>Safety Incident Reports</h2>

        {reports.length === 0 ? (
          <p style={muted}>No safety incidents reported.</p>
        ) : (
          reports.map((report, index) => {
            const safetyId = report.safetyId || report.id || `report-${index}`;
            const status = report.status || "open";

            return (
              <div key={safetyId} style={reportCard}>
                <div style={topRow}>
                  <div>
                    <h3 style={reportTitle}>
                      {report.type || "Safety Incident"}
                    </h3>

                    <p style={smallText}>Safety ID: {safetyId}</p>
                    <p style={smallText}>
                      Rider: {report.riderId || "Unknown"}
                    </p>
                    <p style={smallText}>
                      Driver: {report.driverId || "Unknown"}
                    </p>
                    <p style={smallText}>
                      Created:{" "}
                      {report.createdAt
                        ? new Date(report.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  <span style={{ ...statusBadge, ...getStatusStyle(status) }}>
                    {status}
                  </span>
                </div>

                <div style={descriptionBox}>
                  {report.description || report.message || "No description provided."}
                </div>

                <div style={buttonRow}>
                  <button
                    style={blueButton}
                    onClick={() => updateStatus(safetyId, "reviewing")}
                  >
                    Reviewing
                  </button>

                  <button
                    style={greenButton}
                    onClick={() => updateStatus(safetyId, "resolved")}
                  >
                    Resolve
                  </button>

                  <button
                    style={redButton}
                    onClick={() => updateStatus(safetyId, "open")}
                  >
                    Reopen
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}

function getStatusStyle(status: string) {
  if (status === "resolved") {
    return { background: "#DCFCE7", color: "#166534" };
  }

  if (status === "reviewing") {
    return { background: "#EDE9FE", color: "#6D28D9" };
  }

  return { background: "#FEE2E2", color: "#B91C1C" };
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div style={statCard}>
      <p style={statLabel}>{title}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div style={featureCard}>
      <div style={featureIcon}>{icon}</div>
      <h3 style={featureTitle}>{title}</h3>
      <p style={featureText}>{text}</p>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#FFFFFF",
  padding: "30px",
  color: "#111827",
  fontFamily: "system-ui, Arial, sans-serif",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  flexWrap: "wrap",
  marginBottom: "26px",
};

const eyebrow: React.CSSProperties = {
  color: "#2F8F57",
  fontWeight: 900,
};

const title: React.CSSProperties = {
  fontSize: "38px",
  color: "#57BE7D",
  fontWeight: 900,
  margin: "6px 0",
};

const subtitle: React.CSSProperties = {
  color: "#4B5563",
  fontWeight: 700,
  lineHeight: 1.7,
};

const backButton: React.CSSProperties = {
  background: "#57BE7D",
  color: "white",
  padding: "12px 18px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: 900,
};

const messageBox: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  color: "#166534",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "20px",
  fontWeight: 900,
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const statCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "2px solid #BBF7D0",
  borderRadius: "18px",
  padding: "20px",
  boxShadow: "0 12px 26px rgba(17,24,39,0.08)",
};

const statLabel: React.CSSProperties = {
  color: "#14532D",
  fontWeight: 900,
};

const statValue: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "30px",
  fontWeight: 900,
};

const hero: React.CSSProperties = {
  background: "linear-gradient(135deg, #FFFFFF, #ECFDF3)",
  border: "1px solid #BBF7D0",
  borderRadius: "26px",
  padding: "30px",
  marginBottom: "24px",
  boxShadow: "0 12px 30px rgba(87,190,125,0.14)",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  background: "#DCFCE7",
  color: "#166534",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: 900,
};

const heroTitle: React.CSSProperties = {
  fontSize: "34px",
  color: "#064E3B",
  margin: "16px 0 10px",
  fontWeight: 900,
};

const heroText: React.CSSProperties = {
  fontSize: "18px",
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 700,
};

const featureGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "18px",
  marginBottom: "24px",
};

const featureCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "22px",
  padding: "24px",
  boxShadow: "0 10px 24px rgba(17,24,39,0.06)",
};

const featureIcon: React.CSSProperties = {
  fontSize: "38px",
};

const featureTitle: React.CSSProperties = {
  color: "#14532D",
  marginTop: "14px",
  marginBottom: "10px",
  fontWeight: 900,
};

const featureText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 600,
};

const panel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "22px",
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
  fontWeight: 700,
};

const reportCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "20px",
  padding: "20px",
  marginTop: "18px",
  boxShadow: "0 10px 24px rgba(17,24,39,0.06)",
};

const topRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  flexWrap: "wrap",
};

const reportTitle: React.CSSProperties = {
  margin: 0,
  color: "#111827",
};

const smallText: React.CSSProperties = {
  color: "#6B7280",
  margin: "6px 0",
  fontWeight: 700,
};

const statusBadge: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: 900,
  height: "fit-content",
  textTransform: "capitalize",
};

const descriptionBox: React.CSSProperties = {
  marginTop: "16px",
  background: "#F9FAFB",
  borderRadius: "14px",
  padding: "16px",
  color: "#374151",
  lineHeight: 1.7,
  fontWeight: 600,
};

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const baseButton: React.CSSProperties = {
  border: "none",
  borderRadius: "12px",
  padding: "11px 16px",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};

const blueButton: React.CSSProperties = {
  ...baseButton,
  background: "#2563EB",
};

const greenButton: React.CSSProperties = {
  ...baseButton,
  background: "#57BE7D",
};

const redButton: React.CSSProperties = {
  ...baseButton,
  background: "#DC2626",
};