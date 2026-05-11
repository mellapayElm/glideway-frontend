"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      { day: "Mon", revenue: 120, trips: 18 },
      { day: "Tue", revenue: 210, trips: 26 },
      { day: "Wed", revenue: 180, trips: 22 },
      { day: "Thu", revenue: 260, trips: 31 },
      { day: "Fri", revenue: 300, trips: 38 },
      { day: "Sat", revenue: 420, trips: 46 },
      { day: "Sun", revenue: 390, trips: 42 },
    ]);
  }, []);

  const modules = [
    "Super Admin",
    "Operations",
    "Dispatch",
    "Accounting",
    "Driver Management",
    "Customer Management",
    "Trip Management",
    "Pricing Engine",
    "Payments & Refunds",
    "Driver Payouts",
    "Reports & Analytics",
    "Compliance & Risk",
    "Support Tickets",
    "Audit Logs",
  ];

  const accounting = [
    "Total Revenue",
    "Driver Payouts",
    "Company Commission",
    "Processor Fees",
    "Refunds",
    "Promo Discounts",
    "Taxes",
    "Daily Reconciliation",
    "Weekly Payout Reports",
    "Monthly Financial Reports",
    "Profit & Loss Summary",
  ];

  const security = [
    "JWT Authentication",
    "MFA Required for Admin Dashboard",
    "Role-Based Access Control",
    "Full Audit Logs",
    "Encryption in Transit",
    "Encryption at Rest",
    "Secure Session Management",
    "Device Recognition",
    "Suspicious Login Alerts",
    "Tokenized Payments Only",
    "PCI-Compliant Processor",
    "Secure Database Access",
  ];

  return (
    <main style={page}>
      <h1 style={title}>GlideWay Admin & Management Dashboard</h1>
      <p style={subtitle}>
        Separate secure company dashboard for operations, dispatch, accounting,
        reporting, customer support, pricing controls, compliance, and risk.
      </p>

      <div style={grid}>
        <Stat title="Total Revenue" value="$1,880" />
        <Stat title="Driver Payouts" value="$1,245" />
        <Stat title="Company Commission" value="$376" />
        <Stat title="Processor Fees" value="$56" />
      </div>

      <section style={section}>
        <h2>Admin Dashboard Modules</h2>
        <div style={moduleGrid}>
          {modules.map((item) => (
            <div key={item} style={moduleCard}>{item}</div>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2>Accounting & Financial Tools</h2>
        <div style={moduleGrid}>
          {accounting.map((item) => (
            <div key={item} style={moduleCard}>{item}</div>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2>Smart Pricing System</h2>
        <div style={formulaBox}>
          <p><b>Fare Formula:</b></p>
          <p>
            Fare = Base Fare + Distance Charge + Time Charge + Pickup Adjustment +
            Traffic Adjustment + Toll / Zone Fees - Discount
          </p>

          <p><b>Economics Formula:</b></p>
          <p>
            Company Margin = Customer Fare - Processor Fee - Driver Payout -
            Platform Costs
          </p>

          <p><b>Pricing Strategy:</b></p>
          <p>
            GlideWay may aim to be 2% to 3% lower than Uber, Lyft, taxis, and
            similar companies only when financially safe.
          </p>

          <p><b>Guardrails:</b></p>
          <p>
            Protect minimum driver payout, protect company margin, avoid losses
            during heavy traffic, control promo discounts, and never price below
            sustainable operating cost.
          </p>
        </div>
      </section>

      <section style={section}>
        <h2>Security Requirements</h2>
        <div style={moduleGrid}>
          {security.map((item) => (
            <div key={item} style={securityCard}>{item}</div>
          ))}
        </div>
      </section>

      <div style={chartGrid}>
        <div style={chartCard}>
          <h3>Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={chartCard}>
          <h3>Weekly Trips</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trips" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

function Stat({ title, value }: any) {
  return (
    <div style={card}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "30px",
  background: "linear-gradient(135deg, #06140b, #0e2d1d, #12391f)",
  color: "white",
  fontFamily: "Arial, sans-serif",
};

const title: React.CSSProperties = {
  fontSize: "38px",
  marginBottom: "10px",
};

const subtitle: React.CSSProperties = {
  color: "#c7f7d4",
  maxWidth: "1000px",
  marginBottom: "28px",
  fontSize: "18px",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
  marginBottom: "28px",
};

const card: React.CSSProperties = {
  background: "#112418",
  border: "1px solid #7CFF3A",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
};

const section: React.CSSProperties = {
  background: "#102016",
  border: "1px solid #285f36",
  borderRadius: "18px",
  padding: "24px",
  marginBottom: "26px",
};

const moduleGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "14px",
  marginTop: "18px",
};

const moduleCard: React.CSSProperties = {
  background: "#173d21",
  border: "1px solid #3f9b52",
  borderRadius: "14px",
  padding: "16px",
  fontWeight: "bold",
};

const securityCard: React.CSSProperties = {
  background: "#1d2f45",
  border: "1px solid #6db7ff",
  borderRadius: "14px",
  padding: "16px",
  fontWeight: "bold",
};

const formulaBox: React.CSSProperties = {
  background: "#07110b",
  border: "1px solid #7CFF3A",
  borderRadius: "14px",
  padding: "20px",
  lineHeight: "1.6",
};

const chartGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "22px",
};

const chartCard: React.CSSProperties = {
  background: "#102016",
  border: "1px solid #285f36",
  borderRadius: "18px",
  padding: "24px",
};
const notificationsPanel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "26px",
  padding: "28px",
  marginBottom: "24px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const notificationsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
  marginTop: "22px",
};

const notificationCard: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "18px",
  padding: "18px",
};

const notificationTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  alignItems: "center",
};

const notificationTitle: React.CSSProperties = {
  color: "#14532D",
  margin: 0,
  fontWeight: 900,
};

const notificationBadge: React.CSSProperties = {
  background: "#57BE7D",
  color: "#FFFFFF",
  padding: "6px 10px",
  borderRadius: "999px",
  fontWeight: 900,
  fontSize: "12px",
};

const notificationText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 700,
};

const sectionText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 700,
};