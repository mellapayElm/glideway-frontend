"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminAccountingPage() {
  const [rides, setRides] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [safetyReports, setSafetyReports] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadAllData() {
    try {
      const [ridesData, paymentsData, driversData, appsData, safetyData, zonesData] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`)
            .then((r) => r.json())
            .catch(() => []),

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`)
            .then((r) => r.json())
            .catch(() => []),

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`)
            .then((r) => r.json())
            .catch(() => []),

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`)
            cache: "no-store",
          })
            .then((r) => r.json())
            .catch(() => []),

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`))
            .then((r) => r.json())
            .catch(() => []),

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`)
            .then((r) => r.json())
            .catch(() => []),
        ]);

      setRides(Array.isArray(ridesData) ? ridesData : []);
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);
      setDrivers(Array.isArray(driversData) ? driversData : []);
      setApplications(Array.isArray(appsData) ? appsData : []);
      setSafetyReports(Array.isArray(safetyData) ? safetyData : []);
      setZones(Array.isArray(zonesData) ? zonesData : []);
      setMessage("");
    } catch (error) {
      console.error("Accounting dashboard load error:", error);
      setMessage("Unable to load accounting dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAllData();

    const timer = setInterval(loadAllData, 7000);

    return () => clearInterval(timer);
  }, []);

  const completedRides = rides.filter((ride) => ride.status === "completed");

  const totalFares = completedRides.reduce(
    (sum, ride) => sum + Number(ride.fare || 0),
    0
  );

  const driverEarnings = completedRides.reduce(
    (sum, ride) =>
      sum + Number(ride.driverEarning || ride.driverPayout || 0),
    0
  );

  const platformFeesFromRides = completedRides.reduce(
    (sum, ride) => sum + Number(ride.platformFee || 0),
    0
  );

  const platformFees =
    platformFeesFromRides > 0 ? platformFeesFromRides : totalFares * 0.3;

  const processorFees = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0) * 0.029 + 0.3,
    0
  );

  const refunds = payments
    .filter((payment) => payment.status === "refunded")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  const taxes = platformFees * 0.15;

  const companyMargin = platformFees - processorFees - refunds - taxes;

  const payoutsDue = drivers.reduce(
    (sum, driver) =>
      sum + Number(driver.earningsBalance || driver.availableBalance || 0),
    0
  );

  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  ).length;

  const approvedDrivers = drivers.filter((driver) => driver.verified).length;

  const activeDrivers = drivers.filter(
    (driver) => driver.status === "online"
  ).length;

  const highDemandZones = zones.filter(
    (zone) => Number(zone.demand || 0) >= 10
  ).length;

  const openIncidents = safetyReports.filter(
    (report) => report.status !== "resolved"
  ).length;

  if (loading) {
    return <main style={page}>Loading accounting dashboard...</main>;
  }

  return (
    <main style={page}>
      <section style={header}>
        <div>
          <p style={eyebrow}>GlideWay Admin</p>
          <h1 style={title}>Accounting & Management Dashboard</h1>
          <p style={subtitle}>
            Financial control, operations monitoring, compliance oversight, and
            management reporting.
          </p>
        </div>

        <Link href="/admin" style={backButton}>
          ← Back to Admin
        </Link>
      </section>

      {message && <div style={messageBox}>{message}</div>}

      <section style={grid}>
        <Stat label="Total Fares Collected" value={`$${totalFares.toFixed(2)}`} />
        <Stat
          label="Driver Earnings Payable"
          value={`$${driverEarnings.toFixed(2)}`}
        />
        <Stat label="Platform Fees" value={`$${platformFees.toFixed(2)}`} />
        <Stat
          label="Processor Fees"
          value={`$${processorFees.toFixed(2)}`}
        />
        <Stat label="Refunds" value={`$${refunds.toFixed(2)}`} />
        <Stat label="Estimated Taxes" value={`$${taxes.toFixed(2)}`} />
        <Stat
          label="Net Company Margin"
          value={`$${companyMargin.toFixed(2)}`}
        />
        <Stat label="Payouts Due" value={`$${payoutsDue.toFixed(2)}`} />
      </section>

      <section style={profitCard}>
        <p style={profitLabel}>Net Profit / Company Margin</p>
        <h2 style={profitValue}>${companyMargin.toFixed(2)}</h2>
        <p style={profitNote}>
          Calculated after processor fees, refunds, estimated taxes, and driver
          payout tracking.
        </p>
      </section>

      <Section title="Financial Ledger Summary">
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Category</th>
              <th style={th}>Amount</th>
              <th style={th}>Status</th>
            </tr>
          </thead>

          <tbody>
            <LedgerRow label="Revenue Ledger" amount={totalFares} status="Posted" />
            <LedgerRow
              label="Driver Payout Ledger"
              amount={driverEarnings}
              status="Pending payout"
            />
            <LedgerRow
              label="Processor Fee Ledger"
              amount={processorFees}
              status="Estimated"
            />
            <LedgerRow label="Refund Ledger" amount={refunds} status="Tracked" />
            <LedgerRow label="Tax Ledger" amount={taxes} status="Estimated" />
            <LedgerRow
              label="Company Margin"
              amount={companyMargin}
              status="Calculated"
            />
          </tbody>
        </table>
      </Section>

      <Section title="Accounting System">
        <DashboardList
          items={[
            "Chart of accounts",
            "Revenue ledger",
            "Driver payout ledger",
            "Refund ledger",
            "Tax ledger",
            "Processor fee ledger",
            "Accounts payable",
            "Accounts receivable",
            "Daily reconciliation",
            "Weekly payout reconciliation",
            "Monthly financial reports",
            "Profit and loss report",
            "Cash flow report",
            "Balance summary",
          ]}
        />
      </Section>

      <Section title="Management System">
        <DashboardList
          items={[
            "Role-based access control",
            "Staff permissions",
            "Audit trail",
            "Internal notes",
            "Dispatch management",
            "Issue escalation flow",
            "Incident reporting",
            "Customer complaint management",
            "Service quality reports",
            "City performance comparisons",
          ]}
        />
      </Section>

      <Section title="Compliance System">
        <DashboardList
          items={[
            "KYC / identity verification for drivers",
            "Document verification",
            "Insurance tracking",
            "Safety training records",
            "Background check status",
            "Fraud monitoring",
            "Suspicious activity flagging",
            "Privacy and data access controls",
          ]}
        />
      </Section>

      <Section title="Operations & Risk Snapshot">
        <div style={grid}>
          <Stat label="Total Drivers" value={drivers.length} />
          <Stat label="Approved Drivers" value={approvedDrivers} />
          <Stat label="Active Drivers" value={activeDrivers} />
          <Stat label="Pending Applications" value={pendingApplications} />
          <Stat label="High Demand Zones" value={highDemandZones} />
          <Stat label="Safety Reports" value={safetyReports.length} />
          <Stat label="Open Safety Incidents" value={openIncidents} />
          <Stat label="Completed Rides" value={completedRides.length} />
        </div>
      </Section>

      <Section title="Recent Payments">
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Payment ID</th>
              <th style={th}>Processor</th>
              <th style={th}>Amount</th>
              <th style={th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment.id || index}>
                  <td style={td}>{payment.paymentId || payment.id || "N/A"}</td>
                  <td style={td}>{payment.processor || "Worldpay-ready"}</td>
                  <td style={td}>
                    ${Number(payment.amount || 0).toFixed(2)}
                  </td>
                  <td style={td}>{payment.status || "posted"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={td} colSpan={4}>
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div style={statCard}>
      <p style={statLabel}>{label}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={section}>
      <h2 style={sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function DashboardList({ items }: { items: string[] }) {
  return (
    <div style={listGrid}>
      {items.map((item) => (
        <div key={item} style={listItem}>
          ✅ {item}
        </div>
      ))}
    </div>
  );
}

function LedgerRow({
  label,
  amount,
  status,
}: {
  label: string;
  amount: number;
  status: string;
}) {
  return (
    <tr>
      <td style={td}>{label}</td>
      <td style={td}>${Number(amount || 0).toFixed(2)}</td>
      <td style={td}>{status}</td>
    </tr>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#FFFFFF",
  color: "#111827",
  padding: "30px",
  fontFamily: "system-ui, Arial, sans-serif",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  flexWrap: "wrap",
  marginBottom: "26px",
};

const eyebrow: React.CSSProperties = {
  color: "#2F8F57",
  fontWeight: 900,
  marginBottom: "6px",
};

const title: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "38px",
  margin: 0,
  fontWeight: 900,
};

const subtitle: React.CSSProperties = {
  color: "#4B5563",
  marginTop: "10px",
  fontWeight: 700,
  lineHeight: 1.6,
};

const backButton: React.CSSProperties = {
  background: "#57BE7D",
  color: "white",
  padding: "12px 18px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: 900,
  boxShadow: "0 10px 24px rgba(87,190,125,0.25)",
};

const messageBox: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  color: "#2F8F57",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "20px",
  fontWeight: 900,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const statCard: React.CSSProperties = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "18px",
  border: "2px solid #BBF7D0",
  boxShadow: "0 12px 26px rgba(17,24,39,0.08)",
};

const statLabel: React.CSSProperties = {
  color: "#14532D",
  fontWeight: 900,
};

const statValue: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "30px",
  fontWeight: 900,
};

const profitCard: React.CSSProperties = {
  marginBottom: "24px",
  background: "linear-gradient(135deg, #57BE7D, #2F8F57)",
  borderRadius: "26px",
  padding: "30px",
  color: "white",
  boxShadow: "0 16px 35px rgba(87,190,125,0.28)",
};

const profitLabel: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 900,
  opacity: 0.95,
};

const profitValue: React.CSSProperties = {
  fontSize: "42px",
  margin: "8px 0",
  fontWeight: 900,
};

const profitNote: React.CSSProperties = {
  opacity: 0.95,
  fontWeight: 700,
};

const section: React.CSSProperties = {
  background: "#FFFFFF",
  padding: "22px",
  borderRadius: "22px",
  marginBottom: "24px",
  border: "1px solid #D1D5DB",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  overflowX: "auto",
};

const sectionTitle: React.CSSProperties = {
  color: "#2F8F57",
  marginTop: 0,
  fontWeight: 900,
};

const listGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "10px",
};

const listItem: React.CSSProperties = {
  background: "#ECFDF3",
  color: "#14532D",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #BBF7D0",
  fontWeight: 800,
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid #BBF7D0",
  color: "#2F8F57",
  fontWeight: 900,
};

const td: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #E5E7EB",
  color: "#374151",
  fontWeight: 700,
};