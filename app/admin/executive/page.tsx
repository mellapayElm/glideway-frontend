"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { requireAdminRole, logoutAdmin } from "@/app/utils/adminAuth";

export default function ExecutiveDashboardPage() {
  const [data, setData] = useState<any>(null);

  async function loadData() {
    const res = await fetch("http://localhost:5000/admin/financial-dashboard");
    const result = await res.json();
    setData(result);
  }

  useEffect(() => {
    const allowed = requireAdminRole(["SUPER_ADMIN", "FINANCE_ADMIN"]);
    if (!allowed) return;

    loadData();

    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <main style={main}>Loading executive dashboard...</main>;
  }

  const revenueData = [
    { name: "Revenue", value: Number(data.totalEarnings || 0) },
    { name: "Payouts", value: Number(data.totalPayouts || 0) },
    { name: "Balance", value: Number(data.platformBalance || 0) },
  ];

  const pieData = [
    { name: "Refunds", value: Number(data.refunds || 0) },
    { name: "Tax Reserve", value: Number(data.taxLedger || 0) },
  ];

  return (
    <main style={main}>
      <div style={header}>
        <div>
          <h1 style={title}>Executive KPI Dashboard</h1>
          <p style={subtitle}>
            Real-time GlideWay performance, finance, and operations overview.
          </p>
        </div>

        <button onClick={logoutAdmin} style={logoutButton}>
          Logout
        </button>
      </div>

      <div style={grid}>
        <KpiCard title="Total Revenue" value={`$${Number(data.totalEarnings || 0).toFixed(2)}`} />
        <KpiCard title="Driver Payouts" value={`$${Number(data.totalPayouts || 0).toFixed(2)}`} />
        <KpiCard title="Platform Balance" value={`$${Number(data.platformBalance || 0).toFixed(2)}`} />
        <KpiCard title="Transactions" value={data.transactionCount || 0} />
        <KpiCard title="Refunds" value={`$${Number(data.refunds || 0).toFixed(2)}`} />
        <KpiCard title="Tax Reserve" value={`$${Number(data.taxLedger || 0).toFixed(2)}`} />
      </div>

      <div style={chartGrid}>
        <div style={chartCard}>
          <h2 style={chartTitle}>Revenue Analytics</h2>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#166534" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={chartCard}>
          <h2 style={chartTitle}>Financial Distribution</h2>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={110} label>
                  <Cell fill="#dc2626" />
                  <Cell fill="#2563eb" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

function KpiCard({ title, value }: any) {
  return (
    <div style={card}>
      <p style={label}>{title}</p>
      <h2 style={valueStyle}>{value}</h2>
    </div>
  );
}

const main: React.CSSProperties = {
  padding: "32px",
  minHeight: "100vh",
  background: "#f9fafb",
  fontFamily: "Arial, sans-serif",
  color: "#111827",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "28px",
};

const title: React.CSSProperties = {
  fontSize: "34px",
  margin: 0,
};

const subtitle: React.CSSProperties = {
  color: "#6b7280",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
};

const card: React.CSSProperties = {
  background: "white",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const label: React.CSSProperties = {
  color: "#6b7280",
  fontWeight: "bold",
};

const valueStyle: React.CSSProperties = {
  fontSize: "34px",
  margin: 0,
  color: "#166534",
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

const chartGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
  marginTop: "30px",
};

const chartCard: React.CSSProperties = {
  background: "white",
  borderRadius: "20px",
  padding: "24px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const chartTitle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "20px",
  color: "#111827",
};