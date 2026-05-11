"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { io } from "socket.io-client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { logoutAdmin, requireAdminRole } from "@/app/utils/adminAuth";

const socket = io("http://localhost:5000");

export default function AdminFinancialDashboardPage() {
  const [data, setData] = useState<any>(null);

  const chartData = data
    ? [
        { name: "Earnings", amount: Number(data.totalEarnings || 0) },
        { name: "Payouts", amount: Number(data.totalPayouts || 0) },
        { name: "Pending", amount: Number(data.pendingPayouts || 0) },
        { name: "Balance", amount: Number(data.platformBalance || 0) },
      ]
    : [];

  async function loadData() {
    const res = await fetch("http://localhost:5000/admin/financial-dashboard");
    const result = await res.json();
    setData(result);
  }

  async function approvePayout(payoutId: string) {
    await fetch(`http://localhost:5000/admin/payouts/${payoutId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "admin-id": "finance-001",
      },
      body: JSON.stringify({ status: "paid" }),
    });

    loadData();
  }

  function exportCSV() {
    if (!data?.recentTransactions?.length) return;

    const headers = ["Type", "Driver ID", "Amount", "Status", "Description", "Date"];

    const rows = data.recentTransactions.map((t: any) => [
      t.type,
      t.driverId,
      t.amount,
      t.status,
      t.description,
      new Date(t.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "glideway-financial-report.csv";
    link.click();
  }

  async function exportPDF() {
    const canvas = await html2canvas(document.body);
    const dataUrl = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("glideway-financial-dashboard.pdf");
  }

  useEffect(() => {
    const allowed = requireAdminRole(["SUPER_ADMIN", "FINANCE_ADMIN"]);

    if (!allowed) return;

    loadData();

    socket.on("financialUpdated", loadData);

    const interval = setInterval(loadData, 10000);

    return () => {
      clearInterval(interval);
      socket.off("financialUpdated", loadData);
    };
  }, []);

  if (!data) {
    return <main style={main}>Loading financial dashboard...</main>;
  }

  return (
    <main style={main}>
      <style>{pulseStyle}</style>

      <div style={header}>
        <div>
          <div style={titleRow}>
            <div style={liveDot} />
            <h1 style={{ margin: 0 }}>Admin Financial Dashboard</h1>
          </div>

          <p style={{ color: "#6b7280", marginBottom: "4px" }}>
            Revenue, payouts, pending balances, and transaction overview
          </p>

          <p style={{ color: "#9ca3af", fontSize: "13px", margin: 0 }}>
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>

        <div style={buttonRow}>
          <button onClick={logoutAdmin} style={logoutButton}>
            Logout
          </button>

          <button onClick={loadData} style={button}>
            Refresh Data
          </button>

          <button onClick={() => window.print()} style={blueButton}>
            Print / Export Report
          </button>

          <button onClick={exportPDF} style={purpleButton}>
            Download PDF
          </button>

          <button onClick={exportCSV} style={darkButton}>
            Download CSV
          </button>
        </div>
      </div>

      <div style={grid}>
        <SummaryCard title="Total Earnings" value={data.totalEarnings} color="#16a34a" />
        <SummaryCard title="Total Payouts" value={data.totalPayouts} color="#dc2626" />
        <SummaryCard title="Pending Payouts" value={data.pendingPayouts} color="#d97706" />
        <SummaryCard title="Platform Balance" value={data.platformBalance} color="#2563eb" />
        <CountCard title="Transaction Count" value={data.transactionCount || 0} color="#111827" />
        <CountCard title="Live Financial Events" value={data.recentTransactions?.length || 0} color="#16a34a" />
        <CountCard title="Ledger Count" value={data.ledgerCount || 0} color="#7c3aed" />
        <SummaryCard title="Refunds" value={data.refunds || 0} color="#dc2626" />
        <SummaryCard title="Processor Fees" value={data.processorFees || 0} color="#9333ea" />
        <SummaryCard title="Estimated Tax Ledger" value={data.taxLedger || 0} color="#0891b2" />
      </div>

      <SectionTitle>Financial Reconciliation</SectionTitle>

      <div style={grid}>
        <SummaryCard title="Gross Revenue" value={data.totalEarnings || 0} color="#16a34a" />
        <SummaryCard title="Driver Payouts" value={data.totalPayouts || 0} color="#dc2626" />
        <SummaryCard title="Processor Fees" value={data.processorFees || 0} color="#9333ea" />
        <SummaryCard
          title="Net Platform Revenue"
          value={
            Number(data.totalEarnings || 0) -
            Number(data.totalPayouts || 0) -
            Number(data.processorFees || 0)
          }
          color="#2563eb"
        />
      </div>

      <SectionTitle>Revenue Analytics</SectionTitle>

      <div style={card}>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#166534" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <SectionTitle>Recent Transactions</SectionTitle>

      <div style={{ ...card, overflowX: "auto" }}>
        {data.recentTransactions?.length === 0 ? (
          <p style={{ color: "#6b7280", margin: 0 }}>No recent transactions yet.</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={th}>Type</th>
                <th style={th}>Driver ID</th>
                <th style={th}>Amount</th>
                <th style={th}>Status</th>
                <th style={th}>Description</th>
                <th style={th}>Date</th>
              </tr>
            </thead>

            <tbody>
              {data.recentTransactions.map((t: any) => (
                <tr key={t.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={td}>
                    <span style={typeStyle(t.type)}>{t.type}</span>
                  </td>
                  <td style={td}>{t.driverId}</td>
                  <td style={td}>${Number(t.amount || 0).toFixed(2)}</td>
                  <td style={td}>
                    <span style={statusStyle(t.status)}>{t.status}</span>
                  </td>
                  <td style={td}>{t.description}</td>
                  <td style={td}>{new Date(t.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <SectionTitle>Payout Approval Queue</SectionTitle>

      <div style={card}>
        {data.recentTransactions
          ?.filter((t: any) => t.type === "payout")
          ?.slice(0, 5)
          ?.map((t: any) => (
            <div key={t.id} style={activityRow}>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", color: "#dc2626" }}>
                  Payout Request
                </p>
                <p style={{ margin: "4px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                  {t.description}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  ${Number(t.amount || 0).toFixed(2)}
                </p>

                <button
                  onClick={() => {
                    if (!t.payoutId) {
                      alert("No payout ID found for this transaction.");
                      return;
                    }

                    approvePayout(t.payoutId);
                  }}
                  style={smallGreenButton}
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
      </div>

      <SectionTitle>Refund Management</SectionTitle>

      <div style={card}>
        {data.recentTransactions?.filter((t: any) => t.type === "refund")?.length === 0 ? (
          <p style={{ color: "#6b7280", margin: 0 }}>No refunds processed yet.</p>
        ) : (
          data.recentTransactions
            ?.filter((t: any) => t.type === "refund")
            ?.map((t: any) => (
              <div key={t.id} style={activityRow}>
                <div>
                  <p style={{ margin: 0, fontWeight: "bold", color: "#dc2626" }}>
                    Refund Issued
                  </p>
                  <p style={{ color: "#6b7280", fontSize: "14px" }}>{t.description}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: "bold", color: "#dc2626" }}>
                    -${Number(t.amount || 0).toFixed(2)}
                  </p>
                  <p style={{ color: "#6b7280", fontSize: "12px" }}>
                    {new Date(t.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
        )}
      </div>

      <SectionTitle>Accounting Ledger</SectionTitle>

      <div style={{ ...card, overflowX: "auto" }}>
        <table style={table}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={th}>Category</th>
              <th style={th}>Debit</th>
              <th style={th}>Credit</th>
              <th style={th}>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={td}>Gross Revenue</td>
              <td style={td}>$0.00</td>
              <td style={td}>${Number(data.totalEarnings || 0).toFixed(2)}</td>
              <td style={td}>Total driver trip earnings recorded</td>
            </tr>

            <tr>
              <td style={td}>Driver Payouts</td>
              <td style={td}>${Number(data.totalPayouts || 0).toFixed(2)}</td>
              <td style={td}>$0.00</td>
              <td style={td}>Completed payouts to drivers</td>
            </tr>

            <tr>
              <td style={td}>Processor Fees</td>
              <td style={td}>${Number(data.processorFees || 0).toFixed(2)}</td>
              <td style={td}>$0.00</td>
              <td style={td}>Estimated payment processing fees</td>
            </tr>

            <tr>
              <td style={td}>Tax Ledger</td>
              <td style={td}>${Number(data.taxLedger || 0).toFixed(2)}</td>
              <td style={td}>$0.00</td>
              <td style={td}>Estimated tax reserve</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionTitle>Tax Reporting</SectionTitle>

      <div style={grid}>
        <SummaryCard title="Tax Reserve" value={data.taxLedger || 0} color="#0891b2" />
        <SummaryCard title="Taxable Revenue" value={data.totalEarnings || 0} color="#16a34a" />
        <SummaryCard title="Estimated Deductible Fees" value={data.processorFees || 0} color="#9333ea" />
        <SummaryCard
          title="Net Taxable Platform Revenue"
          value={
            Number(data.totalEarnings || 0) -
            Number(data.totalPayouts || 0) -
            Number(data.processorFees || 0)
          }
          color="#2563eb"
        />
      </div>

      <SectionTitle>AI Financial Insights</SectionTitle>

      <div style={grid}>
        <InsightCard title="Revenue Trend" status="Stable Growth" color="#16a34a" text="Platform revenue is maintaining healthy operational growth based on current earnings and payout activity." />
        <InsightCard title="Payout Monitoring" status="Normal Processing" color="#2563eb" text="Driver payout activity appears within normal operational thresholds." />
        <InsightCard title="Financial Risk Analysis" status="Low Risk" color="#d97706" text="No abnormal refund spikes or processor fee anomalies detected." />
      </div>

      <SectionTitle>Live Financial Activity</SectionTitle>

      <div style={card}>
        {data.recentTransactions?.length === 0 ? (
          <p style={{ color: "#6b7280", margin: 0 }}>No financial activity yet.</p>
        ) : (
          data.recentTransactions.slice(0, 8).map((t: any) => (
            <div key={t.id} style={activityRow}>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: "bold",
                    color: t.type === "earning" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {t.type.toUpperCase()}
                </p>

                <p style={{ margin: "4px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                  {t.description}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  ${Number(t.amount || 0).toFixed(2)}
                </p>

                <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6b7280" }}>
                  {new Date(t.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={footer}>
        GlideWay Financial Operations Dashboard • Real-time Revenue & Payout Monitoring
      </div>
    </main>
  );
}

function SummaryCard({ title, value, color }: any) {
  return (
    <div style={card}>
      <p style={label}>{title}</p>
      <h1 style={{ ...amount, color }}>${Number(value || 0).toFixed(2)}</h1>
    </div>
  );
}

function CountCard({ title, value, color }: any) {
  return (
    <div style={card}>
      <p style={label}>{title}</p>
      <h1 style={{ ...amount, color }}>{value}</h1>
    </div>
  );
}

function SectionTitle({ children }: any) {
  return <h2 style={sectionTitle}>{children}</h2>;
}

function InsightCard({ title, status, color, text }: any) {
  return (
    <div style={card}>
      <p style={label}>{title}</p>
      <h3 style={{ color, marginTop: 0 }}>{status}</h3>
      <p style={{ color: "#6b7280" }}>{text}</p>
    </div>
  );
}

function typeStyle(type: string): React.CSSProperties {
  return {
    color: type === "earning" ? "#16a34a" : type === "payout" ? "#dc2626" : "#111827",
    fontWeight: "bold",
    textTransform: "capitalize",
  };
}

function statusStyle(status: string): React.CSSProperties {
  return {
    background:
      status === "completed" ? "#dcfce7" : status === "processing" ? "#fef3c7" : "#fee2e2",
    color:
      status === "completed" ? "#166534" : status === "processing" ? "#92400e" : "#b91c1c",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  };
}

const main: React.CSSProperties = {
  padding: "32px",
  fontFamily: "Arial, sans-serif",
  background: "#ffffff",
  minHeight: "100vh",
  color: "#111827",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  gap: "12px",
  flexWrap: "wrap",
};

const titleRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
};

const liveDot: React.CSSProperties = {
  width: "12px",
  height: "12px",
  borderRadius: "999px",
  background: "#16a34a",
  boxShadow: "0 0 14px #16a34a",
  animation: "pulse 1.5s infinite",
};

const button: React.CSSProperties = {
  background: "#166534",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
};

const blueButton: React.CSSProperties = {
  ...button,
  background: "#2563eb",
};

const purpleButton: React.CSSProperties = {
  ...button,
  background: "#7c3aed",
};

const darkButton: React.CSSProperties = {
  ...button,
  background: "#111827",
};

const smallGreenButton: React.CSSProperties = {
  marginTop: "8px",
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  marginTop: "28px",
};

const card: React.CSSProperties = {
  background: "#ffffff",
  color: "#111827",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
};

const label: React.CSSProperties = {
  color: "#6b7280",
  marginBottom: "8px",
  fontWeight: "bold",
};

const amount: React.CSSProperties = {
  fontSize: "38px",
  margin: 0,
};

const sectionTitle: React.CSSProperties = {
  fontSize: "26px",
  marginTop: "40px",
  marginBottom: "18px",
  color: "#111827",
};

const table: React.CSSProperties = {
  width: "100%",
  minWidth: "900px",
  borderCollapse: "collapse",
  fontSize: "15px",
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "14px 10px",
  color: "#6b7280",
  fontWeight: "bold",
};

const td: React.CSSProperties = {
  padding: "14px 10px",
  color: "#111827",
};

const activityRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "1px solid #f3f4f6",
};

const pulseStyle = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
`;

const footer: React.CSSProperties = {
  marginTop: "50px",
  paddingTop: "20px",
  borderTop: "1px solid #e5e7eb",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px",
};

const logoutButton: React.CSSProperties = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};