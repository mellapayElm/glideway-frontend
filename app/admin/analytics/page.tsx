"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminAnalyticsPage() {
  const [rides, setRides] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [riders, setRiders] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [safetyReports, setSafetyReports] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAnalytics() {
    try {
      const [ridesData, driversData, ridersData, paymentsData, safetyData, zonesData] =
        await Promise.all([
          const [ridesData, driversData, ridersData, paymentsData, safetyData, zonesData] =
  await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rides`, { cache: "no-store" })
      .then((r) => r.json())
      .catch(() => []),

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, { cache: "no-store" })
      .then((r) => r.json())
      .catch(() => []),

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/riders`, { cache: "no-store" })
      .then((r) => r.json())
      .catch(() => []),

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, { cache: "no-store" })
      .then((r) => r.json())
      .catch(() => []),

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/safety/reports`, { cache: "no-store" })
      .then((r) => r.json())
      .catch(() => []),

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/heatmap/zones`, { cache: "no-store" })
      .then((r) => r.json())
      .catch(() => []),
  ]);

      setRides(Array.isArray(ridesData) ? ridesData : []);
      setDrivers(Array.isArray(driversData) ? driversData : []);
      setRiders(Array.isArray(ridersData) ? ridersData : []);
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);
      setSafetyReports(Array.isArray(safetyData) ? safetyData : []);
      setZones(Array.isArray(zonesData) ? zonesData : []);
    } catch (error) {
      console.error("Analytics load error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
    const timer = setInterval(loadAnalytics, 7000);
    return () => clearInterval(timer);
  }, []);

  const completedRides = rides.filter((r) => r.status === "completed");
  const activeRides = rides.filter(
    (r) => r.status !== "completed" && r.status !== "cancelled"
  );

  const totalRevenue = completedRides.reduce(
    (sum, r) => sum + Number(r.fare || 0),
    0
  );

  const driverPayouts = completedRides.reduce(
    (sum, r) => sum + Number(r.driverEarning || r.driverPayout || 0),
    0
  );

  const platformCommission = completedRides.reduce(
    (sum, r) => sum + Number(r.platformFee || 0),
    0
  ) || totalRevenue * 0.3;

  const processorFees = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0) * 0.029 + 0.3,
    0
  );
const refunds = payments
  .filter((payment) => payment.status === "refunded")
  .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

const taxes = platformCommission * 0.15;

  const netMargin = platformCommission - processorFees - refunds - taxes;

  const onlineDrivers = drivers.filter((d) => d.status === "online").length;
  const verifiedDrivers = drivers.filter((d) => d.verified).length;
  const openSafetyReports = safetyReports.filter((s) => s.status !== "resolved").length;
  const highDemandZones = zones.filter((z) => Number(z.demand || 0) >= 10).length;

  if (loading) {
    return <main style={page}>Loading analytics dashboard...</main>;
  }

  return (
    <main style={page}>
      <section style={header}>
        <div>
          <p style={eyebrow}>GlideWay Admin</p>
          <h1 style={title}>Analytics Dashboard</h1>
          <p style={subtitle}>
            Real-time business intelligence for rides, revenue, drivers, riders,
            safety, zones, and platform performance.
          </p>
        </div>

        <Link href="/admin" style={backButton}>
          ← Back to Admin
        </Link>
      </section>

      <section style={heroGrid}>
        <div style={heroCard}>
          <p style={heroLabel}>Total Revenue</p>
          <h2 style={heroValue}>${totalRevenue.toFixed(2)}</h2>
          <p style={heroText}>Completed ride revenue collected by GlideWay.</p>
        </div>

        <div style={heroCardDark}>
          <p style={heroLabelWhite}>Net Platform Margin</p>
          <h2 style={heroValueWhite}>${netMargin.toFixed(2)}</h2>
          <p style={heroTextWhite}>After estimated payment processor fees.</p>
        </div>
      </section>

      <section style={statsGrid}>
        <Stat title="Total Rides" value={rides.length} />
        <Stat title="Completed Rides" value={completedRides.length} />
        <Stat title="Active Rides" value={activeRides.length} />
        <Stat title="Total Drivers" value={drivers.length} />
        <Stat title="Online Drivers" value={onlineDrivers} />
        <Stat title="Verified Drivers" value={verifiedDrivers} />
        <Stat title="Total Riders" value={riders.length} />
        <Stat title="Open Safety Reports" value={openSafetyReports} />
      </section>

         <section style={financialPanel}>
  <p style={badge}>Financial Analytics Dashboard</p>

  <h2 style={sectionTitle}>Revenue, Payouts & Profitability Intelligence</h2>

  <p style={sectionText}>
    GlideWay provides administrators with a clear financial analytics center to
    monitor platform revenue, driver payouts, daily trip activity, city
    performance, refunds, processor fees, taxes, and overall profitability.
  </p>

  <div style={financialGrid}>
    <FinancialCard
      title="Revenue Charts"
      value={`$${totalRevenue.toFixed(2)}`}
      text="Track gross ride revenue and completed trip income."
    />

    <FinancialCard
      title="Payout Analytics"
      value={`$${driverPayouts.toFixed(2)}`}
      text="Monitor driver payout obligations and payout trends."
    />

    <FinancialCard
      title="Daily Trip Volume"
      value={completedRides.length}
      text="Review completed trips and daily platform activity."
    />

    <FinancialCard
      title="City Performance"
      value={`${highDemandZones} high-demand zones`}
      text="Compare demand activity by city, area, or service zone."
    />

    <FinancialCard
      title="Refunds"
      value={`$${refunds.toFixed(2)}`}
      text="Track refunded rides, disputes, and adjustment activity."
    />

    <FinancialCard
      title="Processor Fees"
      value={`$${processorFees.toFixed(2)}`}
      text="Estimate payment processing costs from card and payout providers."
    />

    <FinancialCard
      title="Taxes"
      value={`$${taxes.toFixed(2)}`}
      text="Monitor estimated tax obligations and financial reporting needs."
    />

    <FinancialCard
      title="Profitability"
      value={`$${netMargin.toFixed(2)}`}
      text="Review net platform margin after fees, refunds, and expenses."
    />
  </div>
</section>   

      <section style={panelGrid}>
        <Panel title="Financial Performance">
          <Metric label="Gross Revenue" value={`$${totalRevenue.toFixed(2)}`} />
          <Metric label="Driver Payouts" value={`$${driverPayouts.toFixed(2)}`} />
          <Metric label="Platform Commission" value={`$${platformCommission.toFixed(2)}`} />
          <Metric label="Processor Fees" value={`$${processorFees.toFixed(2)}`} />
          <Metric label="Net Margin" value={`$${netMargin.toFixed(2)}`} />
        </Panel>

        <Panel title="Operations Performance">
          <Metric label="Active Ride Queue" value={activeRides.length} />
          <Metric label="Available Drivers" value={onlineDrivers} />
          <Metric label="High Demand Zones" value={highDemandZones} />
          <Metric label="Safety Alerts" value={openSafetyReports} />
          <Metric label="Payment Records" value={payments.length} />
        </Panel>
      </section>

      <section style={panel}>
        <h2 style={sectionTitle}>Demand Zone Snapshot</h2>

        {zones.length === 0 ? (
          <p style={muted}>No demand zones found.</p>
        ) : (
          <div style={zoneGrid}>
            {zones.map((zone, index) => (
              <div key={zone.id || index} style={zoneCard}>
                <h3 style={zoneTitle}>{zone.name || `Zone ${index + 1}`}</h3>
                <p style={smallText}>Demand: {zone.demand || 0}</p>
                <p style={smallText}>Drivers: {zone.drivers || zone.driverCount || 0}</p>
                <p style={smallText}>Status: {Number(zone.demand || 0) >= 10 ? "High demand" : "Normal"}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div style={statCard}>
      <p style={statLabel}>{title}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

function FinancialCard({
  title,
  value,
  text,
}: {
  title: string;
  value: any;
  text: string;
}) {
  return (
    <div style={financialCard}>
      <p style={financialTitle}>{title}</p>
      <h3 style={financialValue}>{value}</h3>
      <p style={financialText}>{text}</p>
    </div>
  );
}
function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={panel}>
      <h2 style={sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div style={metricRow}>
      <span>{label}</span>
      <b>{value}</b>
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
};

const title: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "38px",
  margin: "6px 0",
  fontWeight: 900,
};

const subtitle: React.CSSProperties = {
  color: "#4B5563",
  fontWeight: 700,
  lineHeight: 1.7,
};

const backButton: React.CSSProperties = {
  background: "#57BE7D",
  color: "white",
  padding: "12px 18px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: 900,
};

const heroGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "18px",
  marginBottom: "24px",
};

const heroCard: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "26px",
  padding: "28px",
  boxShadow: "0 12px 30px rgba(87,190,125,0.14)",
};

const heroCardDark: React.CSSProperties = {
  background: "linear-gradient(135deg, #57BE7D, #2F8F57)",
  borderRadius: "26px",
  padding: "28px",
  color: "white",
  boxShadow: "0 16px 35px rgba(87,190,125,0.28)",
};

const heroLabel: React.CSSProperties = {
  color: "#14532D",
  fontWeight: 900,
};

const heroLabelWhite: React.CSSProperties = {
  color: "white",
  fontWeight: 900,
};

const heroValue: React.CSSProperties = {
  color: "#2F8F57",
  fontSize: "42px",
  margin: "8px 0",
  fontWeight: 900,
};

const heroValueWhite: React.CSSProperties = {
  color: "white",
  fontSize: "42px",
  margin: "8px 0",
  fontWeight: 900,
};

const heroText: React.CSSProperties = {
  color: "#4B5563",
  fontWeight: 700,
};

const heroTextWhite: React.CSSProperties = {
  color: "rgba(255,255,255,0.92)",
  fontWeight: 700,
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const statCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "2px solid #BBF7D0",
  borderRadius: "18px",
  padding: "20px",
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

const panelGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "18px",
  marginBottom: "24px",
};

const panel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "22px",
  padding: "24px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const sectionTitle: React.CSSProperties = {
  color: "#2F8F57",
  marginTop: 0,
  fontWeight: 900,
};

const metricRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  padding: "14px 0",
  borderBottom: "1px solid #E5E7EB",
  color: "#374151",
  fontWeight: 800,
};

const zoneGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const zoneCard: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "18px",
  padding: "18px",
};

const zoneTitle: React.CSSProperties = {
  color: "#14532D",
  marginTop: 0,
};

const smallText: React.CSSProperties = {
  color: "#4B5563",
  fontWeight: 700,
};

const muted: React.CSSProperties = {
  color: "#6B7280",
  fontWeight: 700,
};
const badge: React.CSSProperties = {
  display: "inline-block",
  padding: "9px 16px",
  borderRadius: "999px",
  background: "#ECFDF3",
  color: "#2F8F57",
  border: "1px solid #57BE7D",
  fontWeight: 900,
};

const sectionText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 700,
};

const financialPanel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "26px",
  padding: "28px",
  marginBottom: "24px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const financialGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
  marginTop: "22px",
};

const financialCard: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "18px",
  padding: "18px",
};

const financialTitle: React.CSSProperties = {
  color: "#14532D",
  fontWeight: 900,
  margin: 0,
};

const financialValue: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "28px",
  fontWeight: 900,
  margin: "10px 0",
};

const financialText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 700,
};