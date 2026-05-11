"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function SafetyDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReports() {
    try {
      const res = await fetch("http://localhost:5000/safety/reports");
      const data = await res.json();
      setReports([...data].reverse());
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(safetyId: string, status: string) {
    await fetch(`http://localhost:5000/safety/report/${safetyId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  useEffect(() => {
    loadReports();

    socket.on("safetyReportReceived", (newReport) => {
      setReports((current) => [newReport, ...current]);
    });

    socket.on("safetyReportUpdated", (updatedReport) => {
      setReports((current) =>
        current.map((report) =>
          report.safetyId === updatedReport.safetyId ? updatedReport : report
        )
      );
    });

    return () => {
      socket.off("safetyReportReceived");
      socket.off("safetyReportUpdated");
    };
  }, []);

  function badgeStyle(status: string) {
    if (status === "resolved") return resolvedBadge;
    if (status === "reviewing") return reviewingBadge;
    return openBadge;
  }

  return (
    <div style={pageStyle}>
      <h1 style={{ color: "#22c55e" }}>🛡️ GlideWay Safety Dashboard</h1>
      <p style={{ color: "#aaa" }}>
        Live SOS and safety reports from riders and drivers.
      </p>

      <button onClick={loadReports} style={refreshButton}>
        Refresh Reports
      </button>

      {loading && <p>Loading safety reports...</p>}

      {!loading && reports.length === 0 && (
        <div style={emptyCard}>No safety reports yet.</div>
      )}

      {reports.map((report) => (
        <div
          key={report.safetyId}
          style={{
            ...cardStyle,
            border:
              report.priority === "high"
                ? "2px solid #dc2626"
                : "1px solid #333",
          }}
        >
          <h2 style={{ color: report.priority === "high" ? "#ef4444" : "#22c55e" }}>
            {report.priority === "high" ? "🚨 HIGH PRIORITY" : "🛡️ Safety Report"}
          </h2>

          <div style={badgeStyle(report.status)}>
            {report.status?.toUpperCase() || "OPEN"}
          </div>

          <p><b>Safety ID:</b> {report.safetyId}</p>
          <p><b>Ride ID:</b> {report.rideId || "N/A"}</p>
          <p><b>Type:</b> {report.type || "General Report"}</p>
          <p><b>Priority:</b> {report.priority}</p>
          <p><b>Time:</b> {report.createdAt || report.time}</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <button onClick={() => updateStatus(report.safetyId, "open")} style={smallButton}>
              Open
            </button>

            <button onClick={() => updateStatus(report.safetyId, "reviewing")} style={smallButton}>
              Reviewing
            </button>

            <button onClick={() => updateStatus(report.safetyId, "resolved")} style={smallButton}>
              Resolved
            </button>
          </div>

          {report.driver && (
            <div style={sectionStyle}>
              <h3>Driver</h3>
              <p><b>Name:</b> {report.driver.name}</p>
              <p><b>Vehicle:</b> {report.driver.color} {report.driver.car}</p>
              <p><b>Plate:</b> {report.driver.plate}</p>
            </div>
          )}

          {report.driverLocation && (
            <div style={sectionStyle}>
              <h3>Driver Location</h3>
              <p><b>Lat:</b> {report.driverLocation.lat}</p>
              <p><b>Lng:</b> {report.driverLocation.lng}</p>
              <p><b>Accuracy:</b> {report.driverLocation.accuracy || "N/A"}</p>
            </div>
          )}

          {report.riderLocation && (
            <div style={sectionStyle}>
              <h3>Rider Location</h3>
              <p><b>Lat:</b> {report.riderLocation.lat}</p>
              <p><b>Lng:</b> {report.riderLocation.lng}</p>
            </div>
          )}

          {report.pickup && <p><b>Pickup:</b> {report.pickup}</p>}
          {report.destination && <p><b>Destination:</b> {report.destination}</p>}
        </div>
      ))}
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#050505",
  color: "white",
  padding: "30px",
};

const refreshButton = {
  padding: "14px 20px",
  marginTop: "20px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "none",
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
};

const emptyCard = {
  padding: "20px",
  background: "#111",
  borderRadius: "14px",
  marginTop: "20px",
};

const cardStyle = {
  padding: "20px",
  background: "#111",
  borderRadius: "16px",
  marginTop: "20px",
};

const sectionStyle = {
  marginTop: "15px",
  padding: "12px",
  background: "#1f2937",
  borderRadius: "12px",
};

const smallButton = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const openBadge = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "#dc2626",
  color: "white",
  fontWeight: "bold",
  marginBottom: "12px",
};

const reviewingBadge = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "#f59e0b",
  color: "white",
  fontWeight: "bold",
  marginBottom: "12px",
};

const resolvedBadge = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
  marginBottom: "12px",
};