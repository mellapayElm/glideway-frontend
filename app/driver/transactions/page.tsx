"use client";

import { useEffect, useState } from "react";

const driverId = "driver-001";

export default function DriverTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [ledger, setLedger] = useState<any[]>([]);
  const [availableBalance, setAvailableBalance] = useState(0);

  async function loadData() {
    const txRes = await fetch(
      `http://localhost:5000/driver/${driverId}/transactions`
    );
    const txData = await txRes.json();

    const ledgerRes = await fetch(
      `http://localhost:5000/driver/${driverId}/wallet-ledger`
    );
    const ledgerData = await ledgerRes.json();

    setTransactions(txData.transactions || []);
    setAvailableBalance(txData.availableBalance || 0);
    setLedger(ledgerData.ledger || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main
      style={{
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        background: "#ffffff",
        minHeight: "100vh",
        color: "#111827",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "34px",
              margin: 0,
              color: "#111827",
            }}
          >
            Driver Wallet
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            Earnings, payouts, and transaction history
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <div style={card}>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Available Balance
          </p>

          <h1
            style={{
              fontSize: "42px",
              color: "#16a34a",
              margin: 0,
            }}
          >
            ${availableBalance.toFixed(2)}
          </h1>
        </div>

        <div style={card}>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Total Transactions
          </p>

          <h1
            style={{
              fontSize: "42px",
              color: "#111827",
              margin: 0,
            }}
          >
            {transactions.length}
          </h1>
        </div>

        <div style={card}>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Wallet Ledger Records
          </p>

          <h1
            style={{
              fontSize: "42px",
              color: "#2563eb",
              margin: 0,
            }}
          >
            {ledger.length}
          </h1>
        </div>
      </div>

      <h2
        style={{
          fontSize: "28px",
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <div style={card}>
          <p style={emptyText}>No transactions yet.</p>
        </div>
      ) : (
        transactions.map((t) => (
          <div key={t.id} style={card}>
            <h3
              style={{
                color:
                  t.type === "earning"
                    ? "green"
                    : t.type === "payout"
                    ? "red"
                    : "#111827",
              }}
            >
              {t.type.toUpperCase()}
            </h3>

            <p>
              <b>Amount:</b> ${Number(t.amount).toFixed(2)}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  background:
                    t.status === "completed"
                      ? "#dcfce7"
                      : t.status === "processing"
                      ? "#fef3c7"
                      : "#fee2e2",
                  color:
                    t.status === "completed"
                      ? "green"
                      : t.status === "processing"
                      ? "#92400e"
                      : "red",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {t.status}
              </span>
            </p>

            <p>
              <b>Description:</b> {t.description}
            </p>

            <p>
              <b>Date:</b>{" "}
              {new Date(t.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}

      <h2
        style={{
          fontSize: "28px",
          marginTop: "40px",
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        Wallet Ledger
      </h2>

      {ledger.length === 0 ? (
        <div style={card}>
          <p style={emptyText}>No wallet ledger records yet.</p>
        </div>
      ) : (
        ledger.map((l) => (
          <div key={l.ledgerId} style={card}>
            <p>
              <b>Type:</b> {l.type}
            </p>

            <p>
              <b>Credit:</b> ${Number(l.credit).toFixed(2)}
            </p>

            <p>
              <b>Debit:</b> ${Number(l.debit).toFixed(2)}
            </p>

            <p>
              <b>Balance After:</b>{" "}
              ${Number(l.balanceAfter).toFixed(2)}
            </p>

            <p>
              <b>Description:</b> {l.description}
            </p>
          </div>
        ))
      )}
    </main>
  );
}

const card: React.CSSProperties = {
  background: "#ffffff",
  color: "#111827",
  padding: "24px",
  borderRadius: "20px",
  marginBottom: "20px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
};

const emptyText: React.CSSProperties = {
  color: "#6b7280",
  margin: 0,
};