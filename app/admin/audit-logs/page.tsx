"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  async function loadLogs() {
    const res = await fetch("http://localhost:5000/admin/audit-logs");
    const data = await res.json();
    setLogs(data.logs || []);
  }

  useEffect(() => {
    loadLogs();

    socket.on("auditUpdated", loadLogs);

    return () => {
      socket.off("auditUpdated", loadLogs);
    };
  }, []);

  return (
    <main style={main}>
      <h1 style={{ marginBottom: "8px" }}>Admin Audit Logs</h1>
      <p style={{ color: "#6b7280" }}>
        Compliance tracking for payout approvals, refunds, and financial actions.
      </p>

      <div style={card}>
        {logs.length === 0 ? (
          <p style={{ color: "#6b7280", margin: 0 }}>No audit logs yet.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} style={row}>
              <div>
                <p style={{ fontWeight: "bold", margin: 0 }}>{log.action}</p>
                <p style={{ color: "#6b7280", margin: "6px 0 0" }}>
                  By: {log.performedBy}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0 }}>
                  {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

const main: React.CSSProperties = {
  padding: "32px",
  fontFamily: "Arial, sans-serif",
  background: "#ffffff",
  minHeight: "100vh",
  color: "#111827",
};

const card: React.CSSProperties = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  marginTop: "28px",
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  padding: "16px 0",
  borderBottom: "1px solid #f3f4f6",
};