"use client";

import { useEffect, useState } from "react";

export default function SuperAdminDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadApplications() {
    try {
      const res = await fetch(
        "http://localhost:5000/admin/driver-applications"
      );
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function approve(id: string) {
    await fetch(
      `http://localhost:5000/admin/driver-applications/${id}/approve`,
      { method: "PATCH" }
    );
    loadApplications();
  }

  async function reject(id: string) {
    await fetch(
      `http://localhost:5000/admin/driver-applications/${id}/reject`,
      { method: "PATCH" }
    );
    loadApplications();
  }

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div style={page}>
      <h1 style={title}>🚀 GlideWay Super Admin</h1>
      <p style={subtitle}>
        Manage driver onboarding and approve applications.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={card}>
          <h2>Pending Driver Applications</h2>

          {applications.length === 0 && (
            <p style={{ color: "#9ca3af" }}>No applications yet.</p>
          )}

          {applications.map((app) => (
            <div key={app.id} style={appCard}>
              <div style={row}>
                <div>
                  <h3 style={{ margin: 0 }}>{app.fullName}</h3>
                  <p style={muted}>{app.email}</p>
                  <p style={muted}>{app.phone}</p>
                </div>

                <div>
                  <span style={status(app.status)}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div style={details}>
                <p>
                  <b>Vehicle:</b>{" "}
                  {app.vehicleYear} {app.vehicleMake} {app.vehicleModel}
                </p>
                <p>
                  <b>Plate:</b> {app.plate}
                </p>
                <p>
                  <b>Payout:</b> {app.payoutAccount}
                </p>
              </div>

              {app.status === "pending" && (
                <div style={actions}>
                  <button
                    onClick={() => approve(app.id)}
                    style={approveBtn}
                  >
                    ✅ Approve
                  </button>

                  <button
                    onClick={() => reject(app.id)}
                    style={rejectBtn}
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= UI ================= */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#050505",
  color: "white",
  padding: "30px",
};

const title: React.CSSProperties = {
  color: "#22c55e",
};

const subtitle: React.CSSProperties = {
  color: "#cbd5e1",
  marginBottom: "20px",
};

const card: React.CSSProperties = {
  background: "#111",
  padding: "20px",
  borderRadius: "16px",
};

const appCard: React.CSSProperties = {
  background: "#0f172a",
  padding: "16px",
  borderRadius: "12px",
  marginTop: "12px",
  border: "1px solid #1e293b",
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const muted: React.CSSProperties = {
  color: "#9ca3af",
  margin: 0,
};

const details: React.CSSProperties = {
  marginTop: "10px",
  color: "#e5e7eb",
};

const actions: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  marginTop: "12px",
};

const approveBtn: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  background: "#22c55e",
  border: "none",
  color: "white",
  cursor: "pointer",
};

const rejectBtn: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  background: "#ef4444",
  border: "none",
  color: "white",
  cursor: "pointer",
};

function status(s: string): React.CSSProperties {
  return {
    padding: "6px 10px",
    borderRadius: "8px",
    background:
      s === "approved"
        ? "#16a34a"
        : s === "rejected"
        ? "#dc2626"
        : "#f59e0b",
    color: "white",
    fontWeight: "bold",
  };
}