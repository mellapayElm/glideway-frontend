"use client";

import DriverTopNav from "@/components/DriverTopNav";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const driverId = "driver-001";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");
export default function DriverEarningsPage() {
  const [earnings, setEarnings] = useState<any>(null);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cashOutLoading, setCashOutLoading] = useState(false);
  const [message, setMessage] = useState("");

  const latestPayout = payouts[0];
  const displayPayoutStatus =
    latestPayout?.status || earnings?.payoutStatus || "Available";

  async function loadEarnings() {
    try {
      const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/driver/${driverId}/earnings?t=${Date.now()}`,
  { cache: "no-store" }
);

const data = await res.json();

const payoutRes = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/driver/payouts/${driverId}`
);
      const payoutData = await payoutRes.json();

      setEarnings(data);
      setPayouts(Array.isArray(payoutData) ? payoutData : []);
    } catch (error) {
      console.error("Failed to load earnings:", error);
      setMessage("Unable to load driver earnings.");
    } finally {
      setLoading(false);
    }
  }

  async function cashOut() {
    setCashOutLoading(true);
    setMessage("");

    try {
      const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/driver/${driverId}/cashout`,
  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (result.success) {
        const payoutAmount = Number(
          result?.payoutAmount ?? result?.payout?.amount ?? 0
        );

        setMessage(
          `✅ Cash out submitted: $${payoutAmount.toFixed(2)} is processing.`
        );

        await loadEarnings();
      } else {
        setMessage(result.message || "❌ Cash out failed.");
      }
    } catch (error) {
      console.error("Cash out failed:", error);
      setMessage("❌ Cash out request failed. Please try again.");
    } finally {
      setCashOutLoading(false);
    }
  }

  useEffect(() => {
    loadEarnings();

    socket.on("driverPayoutUpdated", loadEarnings);

    return () => {
      socket.off("driverPayoutUpdated", loadEarnings);
    };
  }, []);

  if (loading) {
    return (
      <>
        <DriverTopNav />
        <main style={page}>
          <h1 style={title}>Driver Earnings</h1>
          <p style={subtitle}>Loading earnings...</p>
        </main>
      </>
    );
  }

  if (!earnings) {
    return (
      <>
        <DriverTopNav />
        <main style={page}>
          <h1 style={title}>Driver Earnings</h1>
          <p style={subtitle}>No earnings found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <DriverTopNav />

      <main style={page}>
        <section style={hero}>
          <div>
            <p style={badge}>🚗 GlideWay Driver Finance</p>
            <h1 style={title}>Driver Earnings + Completed Trips</h1>
            <p style={subtitle}>
              Track your income, tips, trips, payouts, available balance, and
              instant cash out.
            </p>
          </div>
        </section>

        {message && <div style={messageBox}>{message}</div>}

        <div style={grid}>
          <StatCard
            labelText="Total Earnings"
            value={`$${Number(earnings.totalEarnings || 0).toFixed(2)}`}
          />

          <StatCard
            labelText="Today Earnings"
            value={`$${Number(earnings.todayEarnings || 0).toFixed(2)}`}
          />

          <StatCard
            labelText="Weekly Earnings"
            value={`$${Number(earnings.weeklyEarnings || 0).toFixed(2)}`}
          />

          <StatCard
            labelText="Tips Earned"
            value={`$${Number(earnings.tipsEarned || 0).toFixed(2)}`}
          />

          <StatCard
            labelText="Available Balance"
            value={`$${Number(earnings?.availableBalance ?? 0).toFixed(2)}`}
          />

          <StatCard
            labelText="Pending Balance"
            value={`$${Number(earnings.pendingBalance || 0).toFixed(2)}`}
          />

          <StatCard
            labelText="Completed Rides"
            value={`${earnings.completedTrips || 0}`}
          />

          <StatCard labelText="Payout Status" value={displayPayoutStatus} />
        </div>

        <section style={cashOutCard}>
          <h2 style={sectionTitle}>💳 Instant Cash Out</h2>

          <p style={bodyText}>
            Available balance can be requested for instant payout. This can later
            connect to Dwolla, bank ACH, debit-card push payout, or another
            approved payout processor.
          </p>

          <button
            onClick={cashOut}
            disabled={
              cashOutLoading || Number(earnings?.availableBalance ?? 0) <= 0
            }
            style={{
              ...cashOutButton,
              opacity:
                cashOutLoading || Number(earnings?.availableBalance ?? 0) <= 0
                  ? 0.5
                  : 1,
              cursor:
                cashOutLoading || Number(earnings?.availableBalance ?? 0) <= 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {cashOutLoading ? "Processing..." : "Cash Out Now"}
          </button>

          <p style={statusText}>
            Payout Status: <b>{displayPayoutStatus}</b>
          </p>
        </section>

        <section style={transactionCard}>
          <h2 style={sectionTitle}>💚 Rider Tips</h2>

          <p style={smallText}>
            Quick rider tipping options after completed rides.
          </p>

          <div style={tipsGrid}>
            <button style={tipButton}>15% Tip</button>
            <button style={tipButton}>20% Tip</button>
            <button style={tipButton}>25% Tip</button>
          </div>
        </section>

        <section style={transactionCard}>
          <h2 style={sectionTitle}>📜 Trip History</h2>

          {!earnings.transactions || earnings.transactions.length === 0 ? (
            <p style={bodyText}>No trip history yet.</p>
          ) : (
            earnings.transactions.map((txn: any) => (
              <div key={txn.id || txn.createdAt} style={transactionRow}>
                <div>
                  <b>{txn.type || "Completed Ride"}</b>
                  <p style={smallText}>{txn.description || "Trip completed"}</p>
                  <p style={smallText}>
                    {txn.pickup ? `Pickup: ${txn.pickup}` : ""}
                  </p>
                  <p style={smallText}>
                    {txn.dropoff ? `Drop-off: ${txn.dropoff}` : ""}
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <b style={moneyText}>${Number(txn.amount || 0).toFixed(2)}</b>
                  <p style={smallText}>{txn.status || "completed"}</p>
                </div>
              </div>
            ))
          )}
        </section>

        <section style={transactionCard}>
          <h2 style={sectionTitle}>🏦 Payout History</h2>

          {payouts.length === 0 ? (
            <p style={bodyText}>No payout requests yet.</p>
          ) : (
            payouts.map((payout: any) => (
              <div key={payout.id} style={transactionRow}>
                <div>
                  <b style={moneyText}>
                    ${Number(payout.amount || 0).toFixed(2)}
                  </b>
                  <p style={smallText}>
                    Arrival: {payout.estimatedArrival || "1–2 business days"}
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={getPayoutBadge(payout.status)}>
                    {payout.status || "pending"}
                  </span>

                  <p style={smallText}>
                    {payout.createdAt
                      ? new Date(payout.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}

function StatCard({
  labelText,
  value,
}: {
  labelText: string;
  value: string;
}) {
  return (
    <div style={card}>
      <p style={label}>{labelText}</p>
      <h2 style={amount}>{value}</h2>
    </div>
  );
}

function getPayoutBadge(status: string): React.CSSProperties {
  return {
    padding: "7px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
    background:
      status === "paid"
        ? "#ECFDF3"
        : status === "processing"
        ? "#EFF6FF"
        : status === "approved"
        ? "#ECFEFF"
        : status === "rejected"
        ? "#FEF2F2"
        : "#F3F4F6",
    color:
      status === "paid"
        ? "#2F8F57"
        : status === "processing"
        ? "#2563EB"
        : status === "approved"
        ? "#0891B2"
        : status === "rejected"
        ? "#DC2626"
        : "#374151",
    border:
      status === "paid"
        ? "1px solid #57BE7D"
        : status === "rejected"
        ? "1px solid #FCA5A5"
        : "1px solid #D1D5DB",
  };
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
  boxShadow: "0 12px 30px rgba(87, 190, 125, 0.14)",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  padding: "9px 16px",
  borderRadius: "999px",
  background: "#ECFDF3",
  color: "#2F8F57",
  border: "1px solid #57BE7D",
  fontWeight: 900,
  margin: "0 0 12px",
};

const title: React.CSSProperties = {
  fontSize: "38px",
  margin: "0 0 8px",
  color: "#57BE7D",
  fontWeight: 900,
};

const subtitle: React.CSSProperties = {
  color: "#4B5563",
  marginBottom: "25px",
  fontSize: "16px",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
  marginBottom: "25px",
};

const card: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
};

const label: React.CSSProperties = {
  color: "#4B5563",
  fontSize: "14px",
  fontWeight: 800,
};

const amount: React.CSSProperties = {
  fontSize: "30px",
  marginTop: "8px",
  color: "#57BE7D",
  fontWeight: 900,
};

const cashOutCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "20px",
  padding: "24px",
  marginBottom: "25px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
};

const sectionTitle: React.CSSProperties = {
  marginTop: 0,
  color: "#2F8F57",
};

const bodyText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.6,
};

const cashOutButton: React.CSSProperties = {
  background: "#57BE7D",
  color: "#FFFFFF",
  border: "none",
  padding: "15px 24px",
  borderRadius: "14px",
  fontWeight: "bold",
  fontSize: "16px",
  marginTop: "15px",
  boxShadow: "0 12px 24px rgba(87, 190, 125, 0.28)",
};

const statusText: React.CSSProperties = {
  marginTop: "15px",
  color: "#4B5563",
};

const transactionCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "20px",
  padding: "24px",
  marginBottom: "25px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
};

const transactionRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #E5E7EB",
  padding: "14px 0",
  gap: "20px",
};

const smallText: React.CSSProperties = {
  fontSize: "13px",
  color: "#6B7280",
  marginTop: "4px",
};

const moneyText: React.CSSProperties = {
  color: "#57BE7D",
};

const messageBox: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  color: "#2F8F57",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "20px",
  fontWeight: 800,
};

const tipsGrid: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "14px",
};

const tipButton: React.CSSProperties = {
  padding: "14px 20px",
  borderRadius: "14px",
  border: "1px solid #57BE7D",
  background: "#ECFDF3",
  color: "#2F8F57",
  fontWeight: "900",
  cursor: "pointer",
};