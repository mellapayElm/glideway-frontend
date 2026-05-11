"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  getAdminToken,
  logoutAdmin,
  requireAdminRole,
} from "@/app/utils/adminAuth";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const currentAdmin = {
    id: "finance-001",
    name: "Finance Admin",
    role: "FINANCE_ADMIN",
  };

  const canApprovePayouts =
    currentAdmin.role === "SUPER_ADMIN" ||
    currentAdmin.role === "FINANCE_ADMIN";

  async function loadPayouts() {
    try {
      const res = await fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/driver/payouts/driver-001?t=${Date.now()}`,
{ cache: "no-store" }

      const data = await res.json();
      setPayouts(data?.payouts || []);
      setMessage("");
    } catch (error) {
      console.error("Failed to load payouts:", error);
      setPayouts([]);
      setMessage("Unable to load payouts.");
    } finally {
      setLoading(false);
    }
  }

  async function updatePayoutStatus(payoutId: string, status: string) {
    try {
      const res = await fetch(
        `http://localhost:5000/admin/payouts/${payoutId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "admin-id": currentAdmin.id,
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setMessage(`✅ Payout marked as ${status}.`);
        loadPayouts();
      } else {
        setMessage(result.message || "Failed to update payout.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to update payout.");
    }
  }

  function getStatusStyle(status: string) {
    if (status === "pending") return { background: "#FEF3C7", color: "#92400E" };
    if (status === "approved") return { background: "#DBEAFE", color: "#1D4ED8" };
    if (status === "processing") return { background: "#EDE9FE", color: "#6D28D9" };
    if (status === "paid") return { background: "#DCFCE7", color: "#166534" };
    if (status === "rejected") return { background: "#FEE2E2", color: "#B91C1C" };
    return { background: "#E5E7EB", color: "#374151" };
  }

  useEffect(() => {
    const allowed = requireAdminRole(["SUPER_ADMIN", "FINANCE_ADMIN"]);

    if (!allowed) return;

    const token = getAdminToken();

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    loadPayouts();

    socket.on("payoutUpdated", loadPayouts);

    return () => {
      socket.off("payoutUpdated", loadPayouts);
    };
  }, []);

  const safePayouts = Array.isArray(payouts) ? payouts : [];

  if (loading) {
    return <div style={page}>Loading admin payouts...</div>;
  }

  return (
    <div style={page}>
      <h1 style={title}>🏦 Admin Payout Approval System</h1>

      <p style={{ color: "#4B5563", marginTop: "8px", fontWeight: "700" }}>
        Logged in as: <b>{currentAdmin.name}</b> ({currentAdmin.role})
      </p>

      <button onClick={logoutAdmin} style={logoutButton}>
        Logout
      </button>

      <p style={subtitle}>
        Review driver cash-out requests, approve payouts, process transfers, and
        mark payments complete.
      </p>

      {!canApprovePayouts && (
        <div style={permissionNotice}>
          Permission Notice: Your current role can view payouts but cannot
          approve or mark payouts as paid.
        </div>
      )}

      {message && <p style={messageStyle}>{message}</p>}

      <div style={summaryGrid}>
        <div style={summaryCard}>
          <p style={label}>Total Requests</p>
          <h2>{safePayouts.length}</h2>
        </div>

        <div style={summaryCard}>
          <p style={label}>Pending</p>
          <h2>{safePayouts.filter((p) => p.status === "pending").length}</h2>
        </div>

        <div style={summaryCard}>
          <p style={label}>Processing</p>
          <h2>{safePayouts.filter((p) => p.status === "processing").length}</h2>
        </div>

        <div style={summaryCard}>
          <p style={label}>Paid</p>
          <h2>{safePayouts.filter((p) => p.status === "paid").length}</h2>
        </div>
      </div>

      <div style={card}>
        <h2 style={{ color: "#14532D", marginTop: 0 }}>Payout Requests</h2>

        {safePayouts.length > 0 ? (
          safePayouts.map((payout) => (
            <div key={payout.id} style={payoutRow}>
              <div>
                <h3 style={{ margin: 0, color: "#111827" }}>
                  ${Number(payout.amount || 0).toFixed(2)}
                </h3>

                <p style={muted}>Driver ID: {payout.driverId}</p>
                <p style={muted}>Provider: {payout.provider}</p>

                <p style={muted}>
                  Requested:{" "}
                  {payout.createdAt
                    ? new Date(payout.createdAt).toLocaleString()
                    : "N/A"}
                </p>

                <p style={muted}>
                  Arrival: {payout.estimatedArrival || "1–2 business days"}
                </p>
              </div>

              <div style={rightSide}>
                <p style={{ ...statusBadge, ...getStatusStyle(payout.status) }}>
                  {payout.status || "pending"}
                </p>

                <div style={buttonGrid}>
                  <button
                    style={{
                      ...blueButton,
                      opacity: canApprovePayouts ? 1 : 0.5,
                      cursor: canApprovePayouts ? "pointer" : "not-allowed",
                    }}
                    disabled={!canApprovePayouts}
                    onClick={() => updatePayoutStatus(payout.id, "approved")}
                  >
                    Approve
                  </button>

                  <button
                    style={purpleButton}
                    onClick={() => updatePayoutStatus(payout.id, "processing")}
                  >
                    Processing
                  </button>

                  <button
                    style={{
                      ...greenButton,
                      opacity: canApprovePayouts ? 1 : 0.5,
                      cursor: canApprovePayouts ? "pointer" : "not-allowed",
                    }}
                    disabled={!canApprovePayouts}
                    onClick={() => updatePayoutStatus(payout.id, "paid")}
                  >
                    Paid
                  </button>

                  <button
                    style={redButton}
                    onClick={() => updatePayoutStatus(payout.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={muted}>No payout requests yet.</p>
        )}
      </div>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#FFFFFF",
  color: "#111827",
  padding: "30px",
  fontFamily: "system-ui, Arial, sans-serif",
};

const title: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "38px",
  marginBottom: "8px",
  fontWeight: "900",
};

const subtitle: React.CSSProperties = {
  color: "#4B5563",
  marginBottom: "24px",
  fontWeight: "700",
};

const summaryGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  marginBottom: "22px",
};

const summaryCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "2px solid #BBF7D0",
  borderRadius: "18px",
  padding: "20px",
  boxShadow: "0 12px 26px rgba(17,24,39,0.08)",
};

const card: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "22px",
  padding: "24px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const payoutRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "18px",
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "18px",
  padding: "18px",
  marginTop: "14px",
  boxShadow: "0 10px 24px rgba(17,24,39,0.06)",
};

const rightSide: React.CSSProperties = {
  minWidth: "260px",
  textAlign: "right",
};

const buttonGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "8px",
  marginTop: "12px",
};

const label: React.CSSProperties = {
  color: "#14532D",
  fontSize: "14px",
  fontWeight: "900",
};

const muted: React.CSSProperties = {
  color: "#4B5563",
  margin: "5px 0",
  fontWeight: "700",
};

const statusBadge: React.CSSProperties = {
  display: "inline-block",
  padding: "7px 12px",
  borderRadius: "999px",
  fontWeight: "900",
  textTransform: "capitalize",
};

const baseButton: React.CSSProperties = {
  padding: "10px",
  borderRadius: "12px",
  border: "none",
  color: "white",
  fontWeight: "900",
  cursor: "pointer",
};

const blueButton: React.CSSProperties = {
  ...baseButton,
  background: "#2563EB",
};

const purpleButton: React.CSSProperties = {
  ...baseButton,
  background: "#7C3AED",
};

const greenButton: React.CSSProperties = {
  ...baseButton,
  background: "#57BE7D",
};

const redButton: React.CSSProperties = {
  ...baseButton,
  background: "#DC2626",
};

const messageStyle: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  color: "#2F8F57",
  padding: "12px",
  borderRadius: "12px",
  marginBottom: "18px",
  fontWeight: "900",
};

const permissionNotice: React.CSSProperties = {
  marginTop: "16px",
  padding: "14px 18px",
  borderRadius: "12px",
  background: "#FEF3C7",
  color: "#92400E",
  border: "1px solid #F59E0B",
  fontWeight: "900",
  marginBottom: "18px",
};

const logoutButton: React.CSSProperties = {
  background: "#DC2626",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "900",
  marginBottom: "20px",
};