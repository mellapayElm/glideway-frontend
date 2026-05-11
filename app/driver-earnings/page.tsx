"use client";

import { useEffect, useState } from "react";

export default function DriverEarningsPage() {
  const driverId = "driver-001";

  const [data, setData] = useState<any>(null);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cashOutLoading, setCashOutLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadEarnings() {
    try {
      const res = await fetch(`http://localhost:5000/driver/${driverId}/earnings`);
      const result = await res.json();

      const payoutRes = await fetch(`http://localhost:5000/driver/payouts/${driverId}`);
      const payoutData = await payoutRes.json();

      setData(result);
      setPayouts(Array.isArray(payoutData) ? payoutData : []);
    } catch {
      setMessage("Unable to load earnings.");
    } finally {
      setLoading(false);
    }
  }

  async function cashOut() {
    setCashOutLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/driver/${driverId}/cashout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

   const result = await res.json();

if (result.success) {

  setData(result);

  const payoutAmount = Number(
    result?.payoutAmount ??
    result?.payout?.amount ??
    0
  );

  setMessage(
    `✅ Cash out submitted: $${payoutAmount.toFixed(2)} is processing.`
  );

  loadEarnings();

} else {
  setMessage(result.message || "❌ Cash out failed.");
}
} catch (error) {
  console.error("Cash out failed:", error);
  setMessage("❌ Unable to process cash out.");
} finally {
  setCashOutLoading(false);
}

  useEffect(() => {
    loadEarnings();
  }, []);

  if (loading) return <div style={page}>Loading earnings...</div>;

  const totalEarnings = Number(data?.totalEarnings || 0);
  const availableBalance = Number(data?.availableBalance || data?.balance || 0);
  const pendingBalance = Number(data?.pendingBalance || 0);
  const completedTrips = Number(data?.completedTrips || 0);
  const driverShare = Number(data?.driverSharePercent || 70);
  const platformShare = 100 - driverShare;

  return (
    <div style={page}>
      <h1 style={title}>💰 GlideWay Earnings Dashboard</h1>
      <p style={subtitle}>Track your income, trips, payouts, and instant cash out.</p>

      {message && <div style={messageBox}>{message}</div>}

      <div style={summaryGrid}>
        <div style={balanceCard}>
          <p style={smallLabel}>Available Balance</p>
          <h1 style={bigMoney}>${availableBalance.toFixed(2)}</h1>
          <p style={mutedText}>Total Earned: ${totalEarnings.toFixed(2)}</p>

          <button
            style={{
              ...greenButton,
              opacity: cashOutLoading || availableBalance <= 0 ? 0.6 : 1,
              cursor: cashOutLoading || availableBalance <= 0 ? "not-allowed" : "pointer",
            }}
            disabled={cashOutLoading || availableBalance <= 0}
            onClick={cashOut}
          >
            {cashOutLoading ? "Processing..." : "Cash Out Now"}
          </button>
        </div>

        <div style={miniCard}>
          <p style={smallLabel}>Pending Balance</p>
          <h2 style={miniMoney}>${pendingBalance.toFixed(2)}</h2>
        </div>

        <div style={miniCard}>
          <p style={smallLabel}>Completed Trips</p>
          <h2 style={miniMoney}>{completedTrips}</h2>
        </div>
      </div>

      <div style={card}>
        <h2>Earnings Breakdown</h2>

        <div style={breakdownGrid}>
          <div style={blueBox}>
            <p style={smallLabel}>Passenger Paid</p>
            <h2>${Number(data?.totalFare || 0).toFixed(2)}</h2>
          </div>

          <div style={greenBox}>
            <p style={smallLabel}>Driver Keeps</p>
            <h2>${Number(data?.driverEarnings || totalEarnings).toFixed(2)}</h2>
            <p>{driverShare}% of fare</p>
          </div>

          <div style={redBox}>
            <p style={smallLabel}>GlideWay Fee</p>
            <h2>${Number(data?.platformFees || 0).toFixed(2)}</h2>
            <p>{platformShare}% platform fee</p>
          </div>
        </div>

        <div style={progressBar}>
          <div style={{ ...progressFill, width: `${driverShare}%` }} />
          <div style={{ ...platformFill, width: `${platformShare}%` }} />
        </div>

        <p style={explainText}>
          Driver keeps <b style={{ color: "#22c55e" }}>{driverShare}%</b>. GlideWay takes{" "}
          <b style={{ color: "#f87171" }}>{platformShare}%</b>. Professional target fee range:{" "}
          <b>20%–30%</b>.
        </p>
      </div>

      <div style={card}>
        <h2>Fee Commitment</h2>
        <p style={mutedText}>
          GlideWay is designed to be fair and transparent. The platform fee should stay within
          the 20%–30% range while protecting driver income and company operations.
        </p>
        <p style={{ color: "#a3e635", fontWeight: "bold" }}>
          GlideWay fee capped at 30% monthly.
        </p>
      </div>

      <div style={card}>
        <h2>Payout History</h2>

        {payouts.length > 0 ? (
          payouts.map((payout) => (
            <div key={payout.id} style={payoutRow}>
              <div>
                <b style={{ color: "#a3e635" }}>
                  ${Number(payout.amount || 0).toFixed(2)}
                </b>
                <p style={mutedText}>
                  Requested: {new Date(payout.createdAt).toLocaleString()}
                </p>
                <p style={mutedText}>Arrival: {payout.estimatedArrival}</p>
              </div>

              <span style={{ ...statusBadge, ...getStatusStyle(payout.status) }}>
                {payout.status}
              </span>
            </div>
          ))
        ) : (
          <p style={mutedText}>No payout requests yet.</p>
        )}
      </div>

      <div style={card}>
        <h2>Recent Transactions</h2>

        {data?.transactions?.length > 0 ? (
          data.transactions.map((t: any) => (
            <div key={t.id || t.createdAt} style={payoutRow}>
              <div>
                <b>{t.type}</b>
                <p style={mutedText}>{t.description}</p>
              </div>

              <b>${Number(t.amount || 0).toFixed(2)}</b>
            </div>
          ))
        ) : (
          <p style={mutedText}>No transactions yet.</p>
        )}
      </div>
    </div>
  );
}

function getStatusStyle(status: string): React.CSSProperties {
  if (status === "pending") return { background: "#facc1530", color: "#facc15" };
  if (status === "approved") return { background: "#38bdf830", color: "#38bdf8" };
  if (status === "processing") return { background: "#a78bfa30", color: "#a78bfa" };
  if (status === "paid") return { background: "#22c55e30", color: "#22c55e" };
  if (status === "rejected") return { background: "#ef444430", color: "#ef4444" };
  return { background: "#334155", color: "#cbd5e1" };
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "white",
  padding: "30px",
  fontFamily: "system-ui, Arial, sans-serif",
};

const title: React.CSSProperties = {
  color: "#a3e635",
  marginBottom: "8px",
  fontSize: "34px",
};

const subtitle: React.CSSProperties = {
  color: "#cbd5e1",
  marginBottom: "24px",
};

const summaryGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "18px",
  marginBottom: "20px",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  padding: "22px",
  borderRadius: "18px",
  marginBottom: "20px",
  border: "1px solid rgba(255,255,255,0.10)",
};

const balanceCard: React.CSSProperties = {
  ...card,
  background: "linear-gradient(135deg, #064e3b, #022c22)",
  marginBottom: 0,
};

const miniCard: React.CSSProperties = {
  ...card,
  marginBottom: 0,
};

const smallLabel: React.CSSProperties = {
  color: "#cbd5e1",
  fontSize: "14px",
};

const bigMoney: React.CSSProperties = {
  color: "#a3e635",
  fontSize: "44px",
};

const miniMoney: React.CSSProperties = {
  color: "#22c55e",
  fontSize: "30px",
};

const mutedText: React.CSSProperties = {
  color: "#cbd5e1",
};

const breakdownGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
  marginTop: "16px",
};

const blueBox: React.CSSProperties = {
  background: "rgba(59,130,246,0.15)",
  border: "1px solid rgba(59,130,246,0.35)",
  borderRadius: "14px",
  padding: "16px",
};

const greenBox: React.CSSProperties = {
  background: "rgba(34,197,94,0.15)",
  border: "1px solid rgba(34,197,94,0.4)",
  borderRadius: "14px",
  padding: "16px",
};

const redBox: React.CSSProperties = {
  background: "rgba(239,68,68,0.15)",
  border: "1px solid rgba(239,68,68,0.4)",
  borderRadius: "14px",
  padding: "16px",
};

const greenButton: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "12px",
};

const progressBar: React.CSSProperties = {
  width: "100%",
  height: "14px",
  background: "#1e293b",
  borderRadius: "999px",
  marginTop: "18px",
  overflow: "hidden",
  display: "flex",
};

const progressFill: React.CSSProperties = {
  height: "100%",
  background: "linear-gradient(90deg, #22c55e, #a3e635)",
};

const platformFill: React.CSSProperties = {
  height: "100%",
  background: "linear-gradient(90deg, #f87171, #ef4444)",
};

const explainText: React.CSSProperties = {
  marginTop: "12px",
  color: "#e2e8f0",
};

const payoutRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #1e293b",
  padding: "14px 0",
};

const statusBadge: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "inline-block",
  textTransform: "capitalize",
};

const messageBox: React.CSSProperties = {
  background: "rgba(34,197,94,0.12)",
  border: "1px solid rgba(34,197,94,0.4)",
  color: "#a3e635",
  padding: "14px",
  borderRadius: "12px",
  marginBottom: "18px",
  fontWeight: "bold",
};