"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Protected from "@/components/Protected";
import { apiFetch } from "@/lib/api";
import {
  BarChart3,
  ShieldAlert,
  Car,
  DollarSign,
  Users,
  Route,
  Wallet,
  Settings,
  Headphones,
  ClipboardList,
  Activity,
} from "lucide-react";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [rides, setRides] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [driverEarnings, setDriverEarnings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  async function loadData() {
    try {
      const reportsRes = await apiFetch("/safety/reports");
      const ridesRes = await apiFetch("/rides");
      const statsRes = await apiFetch("/admin/stats");
      const earningsRes = await apiFetch("/admin/driver-earnings");
      const reportsData = await reportsRes.json();
      const ridesData = await ridesRes.json();
      const statsData = await statsRes.json();
      const earningsData = await earningsRes.json();
      setReports(Array.isArray(reportsData) ? reportsData : []);
      setRides(Array.isArray(ridesData) ? ridesData : []);
      setStats(statsData || null);
      setDriverEarnings(Array.isArray(earningsData) ? earningsData : []);
    } catch {
  setReports([]);
  setRides([]);
  setStats(null);
  setDriverEarnings([]);
}
  }

  async function updateSafetyStatus(id: string, status: string) {
    await apiFetch(`/safety/report/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );
  }
async function processDriverPayout() {
  try {
   const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/admin/payouts/driver-001/process`,
      { method: "POST" }
    );

    const data = await res.json();
    alert(data.message || "Payout processed");
    loadData();
  } catch {
    alert("Payout failed");
  }
}
   useEffect(() => {
    loadData();

    socket.on("safetyReportReceived", loadData);
    socket.on("safetyReportUpdated", loadData);
    socket.on("rideCreated", loadData);
    socket.on("rideStatusUpdated", loadData);
    socket.on("driverEarningsUpdated", loadData);
    socket.on("driverPayoutUpdated", loadData);

    return () => {
      socket.off("safetyReportReceived");
      socket.off("safetyReportUpdated");
      socket.off("rideCreated");
      socket.off("rideStatusUpdated");
      socket.off("driverEarningsUpdated");
      socket.off("driverPayoutUpdated");
    };
  }, []);

  const completedRides = rides.filter((r) => r.status === "completed").length;
  const activeRides = rides.filter((r) => r.status !== "completed").length;
  const openReports = reports.filter((r) => r.status !== "resolved").length;

  return (
    <Protected role="ADMIN">
      <main style={page}>
        <aside style={sidebar}>
          <div style={brandBox}>
            <div style={logoCircle}>G</div>
            <div>
              <h2 style={{ margin: 0 }}>GlideWay</h2>
              <p style={smallMuted}>Admin Suite</p>
            </div>
          </div>

          <NavButton icon={<BarChart3 size={18} />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <NavButton icon={<Activity size={18} />} label="Operations" active={activeTab === "operations"} onClick={() => setActiveTab("operations")} />
          <NavButton icon={<ShieldAlert size={18} />} label="Safety" active={activeTab === "safety"} onClick={() => setActiveTab("safety")} />
          <NavButton icon={<Car size={18} />} label="Trips" active={activeTab === "trips"} onClick={() => setActiveTab("trips")} />
          <NavButton icon={<DollarSign size={18} />} label="Accounting" active={activeTab === "accounting"} onClick={() => setActiveTab("accounting")} />
          <NavButton icon={<Wallet size={18} />} label="Payouts" active={activeTab === "payouts"} onClick={() => setActiveTab("payouts")} />
          <NavButton icon={<Headphones size={18} />} label="Support" active={activeTab === "support"} onClick={() => setActiveTab("support")} />
          <NavButton icon={<Settings size={18} />} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />

          <div style={sidebarFooter}>
            <span style={liveDot}></span>
            System Online
          </div>
        </aside>

        <section style={content}>
          <header style={topBar}>
            <div>
              <p style={eyebrow}>Company Operations Center</p>
              <h1 style={title}>Admin & Management Dashboard</h1>
              <p style={subtitle}>
                Secure dashboard for operations, dispatch, accounting, driver payouts,
                safety reports, and live trip monitoring.
              </p>
            </div>

            <div style={glassPill}>
              <span style={liveDot}></span>
              Real-time updates active
            </div>
          </header>

          {activeTab === "overview" && (
            <>
              <section style={statsGrid}>
                <Stat icon={<DollarSign />} title="Total Revenue" value={`$${Number(stats?.totalRevenue || 0).toFixed(2)}`} accent="#7CFF3A" />
                <Stat icon={<Wallet />} title="Driver Payouts" value={`$${Number(stats?.driverPayouts || 0).toFixed(2)}`} accent="#60a5fa" />
                <Stat icon={<ClipboardList />} title="Company Commission" value={`$${Number(stats?.platformCommission || 0).toFixed(2)}`} accent="#facc15" />
                <Stat icon={<DollarSign />} title="Processor Fees" value={`$${Number(stats?.processorFees || 0).toFixed(2)}`} accent="#fb7185" />
                <Stat icon={<Users />} title="Total Drivers" value={Number(stats?.totalDrivers || 0)} accent="#a78bfa" />
                <Stat icon={<Route />} title="Total Trips" value={Number(stats?.totalTrips || 0)} accent="#38bdf8" />
              </section>

              <section style={dashboardGrid}>
                <InfoPanel title="Operations Summary">
                  <Metric label="Active Rides" value={activeRides} />
                  <Metric label="Completed Rides" value={completedRides} />
                  <Metric label="Open Safety Reports" value={openReports} />
                </InfoPanel>

                <InfoPanel title="Management Modules">
                  <ModuleList items={[
                    "Super Admin",
                    "Operations",
                    "Dispatch",
                    "Accounting",
                    "Driver Management",
                    "Customer Management",
                    "Trip Management",
                    "Pricing Engine",
                    "Payments & Refunds",
                    "Compliance & Risk",
                  ]} />
                </InfoPanel>
              </section>
            </>
          )}

          {activeTab === "operations" && (
            <section style={dashboardGrid}>
              <InfoPanel title="Operations Control">
                <ModuleList items={[
                  "Dispatch monitoring",
                  "Ride assignment",
                  "Route status",
                  "Driver availability",
                  "Customer support escalation",
                  "Incident response",
                ]} />
              </InfoPanel>

              <InfoPanel title="Live Operations Numbers">
                <Metric label="Active Rides" value={activeRides} />
                <Metric label="Completed Rides" value={completedRides} />
                <Metric label="Total Trips" value={Number(stats?.totalTrips || 0)} />
              </InfoPanel>
            </section>
          )}

          {activeTab === "accounting" && (
            <section style={dashboardGrid}>
              <InfoPanel title="Accounting Dashboard">
                <Metric label="Total Revenue" value={`$${Number(stats?.totalRevenue || 0).toFixed(2)}`} />
                <Metric label="Driver Payouts" value={`$${Number(stats?.driverPayouts || 0).toFixed(2)}`} />
                <Metric label="Company Commission" value={`$${Number(stats?.platformCommission || 0).toFixed(2)}`} />
                <Metric label="Processor Fees" value={`$${Number(stats?.processorFees || 0).toFixed(2)}`} />
              </InfoPanel>

              <InfoPanel title="Accounting Tools">
                <ModuleList items={[
                  "Daily reconciliation",
                  "Weekly payout reports",
                  "Monthly financial reports",
                  "Profit & loss summary",
                  "Refund ledger",
                  "Tax ledger",
                  "Promo discount tracking",
                ]} />
              </InfoPanel>
            </section>
          )}

          {activeTab === "safety" && (
            <section style={panel}>
              <h2>🚨 Safety Reports</h2>
              <p style={muted}>SOS reports and safety incident management.</p>

              {reports.length === 0 && <p style={empty}>No safety reports yet.</p>}

              {reports.map((report) => (
                <div key={report.id} style={itemCard}>
                  <div style={rowBetween}>
                    <b>Report #{report.id}</b>
                    <span style={badge(report.status)}>{report.status}</span>
                  </div>

                  <p><b>Ride:</b> {report.rideId || "N/A"}</p>
                  <p><b>Message:</b> {report.message}</p>
                  <p>
                    <b>Location:</b>{" "}
                    {report.locationLat && report.locationLng
                      ? `${report.locationLat}, ${report.locationLng}`
                      : "N/A"}
                  </p>

                  <div style={buttonRow}>
                    <button style={dangerButton} onClick={() => updateSafetyStatus(report.id, "open")}>Open</button>
                    <button style={warningButton} onClick={() => updateSafetyStatus(report.id, "reviewing")}>Reviewing</button>
                    <button style={successButton} onClick={() => updateSafetyStatus(report.id, "resolved")}>Resolved</button>
                  </div>
                </div>
              ))}
            </section>
          )}

          {activeTab === "trips" && (
            <section style={panel}>
              <h2>🚗 Live Trips</h2>
              <p style={muted}>Current and completed ride activity.</p>

              {rides.length === 0 && <p style={empty}>No rides yet.</p>}

              {rides.map((ride) => (
                <div key={ride.id || ride.rideId} style={itemCard}>
                  <div style={rowBetween}>
                    <b>Ride #{ride.id || ride.rideId}</b>
                    <span style={badge(ride.status)}>{ride.status}</span>
                  </div>

                  <p><b>Pickup:</b> {ride.pickup || "N/A"}</p>
                  <p><b>Dropoff:</b> {ride.dropoff || "N/A"}</p>
                  <p><b>Fare:</b> {ride.fare ? `$${ride.fare}` : "N/A"}</p>
                </div>
              ))}
            </section>
          )}

          {activeTab === "payouts" && (
            <section style={dashboardGrid}>
              <InfoPanel title="Driver Payouts">
                <Metric label="Total Driver Payouts" value={`$${Number(stats?.driverPayouts || 0).toFixed(2)}`} />
                <Metric label="Processor Fees" value={`$${Number(stats?.processorFees || 0).toFixed(2)}`} />
                <Metric label="Company Commission" value={`$${Number(stats?.platformCommission || 0).toFixed(2)}`} />
              </InfoPanel>

              <InfoPanel title="Driver Earnings List">

  {driverEarnings.length === 0 && (
    <p>No driver earnings found.</p>
  )}

  {driverEarnings.map((driver) => (
    <div key={driver.driverId} style={itemCard}>

      <div style={rowBetween}>
        <b>Driver: {driver.driverId}</b>
        <span style={badge("completed")}>
          ${Number(driver.availableBalance || 0).toFixed(2)}
        </span>
      </div>

      <p><b>Total Earnings:</b> ${Number(driver.totalEarnings || 0).toFixed(2)}</p>
      <p><b>Completed Trips:</b> {driver.completedTrips}</p>

      <button
        style={payoutButton}
        onClick={async () => {
          try {
           const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/admin/payouts/${driver.driverId}/process`,
  { method: "POST" }
);

            const data = await res.json();
            alert(data.message || "Payout processed");
            loadData();
          } catch {
            alert("Payout failed");
          }
        }}
      >
        💸 Pay {driver.driverId}
      </button>

    </div>
  ))}

</InfoPanel>
</section>
)}

<section style={roadmapPanel}>
  <p style={badge}>GlideWay Enterprise Roadmap</p>

  <h2 style={sectionTitle}>Next-Level Production Systems</h2>

  <p style={sectionText}>
    These systems prepare GlideWay for secure production deployment,
    enterprise-level operations, scalable data management, intelligent pricing,
    and mobile app readiness.
  </p>

  <div style={roadmapGrid}>
    <RoadmapCard
      title="7) Professional Authentication"
      items={[
        "JWT refresh tokens",
        "MFA authentication",
        "Role-based permissions",
        "Admin session monitoring",
        "Audit logs",
      ]}
    />

    <RoadmapCard
      title="8) Production Database Structure"
      items={[
        "Users",
        "Drivers",
        "Riders",
        "Rides",
        "Payouts",
        "Transactions",
        "Safety reports",
        "Support tickets",
        "Pricing rules",
        "Driver documents",
        "Audit logs",
      ]}
    />

    <RoadmapCard
      title="9) AI-Powered Pricing Engine"
      items={[
        "Dynamic pricing",
        "Traffic pricing",
        "Airport pricing",
        "Event surge pricing",
        "Driver incentive pricing",
        "Demand prediction",
      ]}
    />

    <RoadmapCard
      title="10) Mobile App Readiness"
      items={[
        "React Native apps",
        "Push notifications",
        "Background GPS",
        "Live trip tracking",
        "Apple/Google login",
        "In-app chat",
      ]}
    />
  </div>

  <div style={nextStepBox}>
    <h3 style={nextStepTitle}>Best Next Step Right Now</h3>

    <p style={nextStepText}>
      🚗 Build and refine the Live Dispatch + Real-Time Driver Map because it
      becomes the heart of GlideWay operations and makes the platform feel real,
      modern, enterprise-level, and comparable to Uber/Lyft dispatch systems.
    </p>

    <p style={nextStepText}>
      After that, continue with analytics charts, driver approval workflows,
      payout automation, and production database optimization.
    </p>
  </div>
</section>
          {activeTab === "support" && (
            <section style={dashboardGrid}>
              <InfoPanel title="Customer Support">
                <ModuleList items={[
                  "Support tickets",
                  "Customer complaints",
                  "Refund requests",
                  "Driver disputes",
                  "Trip issue escalation",
                  "Safety follow-up cases",
                ]} />
              </InfoPanel>

              <InfoPanel title="Support Summary">
                <Metric label="Open Safety Reports" value={openReports} />
                <Metric label="Total Rides" value={rides.length} />
              </InfoPanel>
            </section>
          )}

          {activeTab === "settings" && (
            <section style={dashboardGrid}>
              <InfoPanel title="Security & Access">
                <ModuleList items={[
                  "JWT authentication",
                  "MFA required for admin dashboard",
                  "Role-based access control",
                  "Full audit logs",
                  "Encryption in transit",
                  "Encryption at rest",
                  "Secure session management",
                  "Device monitoring",
                ]} />
              </InfoPanel>

              <InfoPanel title="Compliance Controls">
                <ModuleList items={[
                  "Audit trail",
                  "Permission levels",
                  "Data retention policy",
                  "Privacy policy compliance",
                  "Limited access to personal data",
                  "Sensitive change monitoring",
                ]} />
              </InfoPanel>
            </section>
          )}
        </section>
      </main>
    </Protected>
  );
}

function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        ...navButton,
       background: active ? "#57BE7D" : "#FFFFFF",
       color: active ? "#FFFFFF" : "#14532D",
       borderColor: active ? "#57BE7D" : "#BBF7D0",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function Stat({ icon, title, value, accent }: any) {
  return (
    <div style={statCard}>
      <div style={{ ...statIcon, color: accent }}>{icon}</div>
      <p style={statTitle}>{title}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

function InfoPanel({ title, children }: any) {
  return (
    <div style={panel}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div style={metricRow}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function ModuleList({ items }: any) {
  return (
    <div style={moduleGrid}>
      {items.map((item: string) => (
        <div key={item} style={moduleCard}>{item}</div>
      ))}
    </div>
  );
}

function NotificationCard({
  title,
  level,
  text,
}: {
  title: string;
  level: string;
  text: string;
}) {
  return (
    <div style={notificationCard}>
      <div style={notificationTop}>
        <h3 style={notificationTitle}>{title}</h3>
        <span style={notificationBadge}>{level}</span>
      </div>

      <p style={notificationText}>{text}</p>
    </div>
  );
}
const page: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  fontFamily: "Arial, sans-serif",
  color: "#111827",
  background: "#FFFFFF",
  overflowX: "hidden",
};

const sidebar: React.CSSProperties = {
  width: "270px",
  minWidth: "270px",
  padding: "24px",
  background: "#ECFDF3",
  borderRight: "1px solid #D1D5DB",
  position: "sticky",
  top: 0,
  height: "100vh",
  overflowY: "auto",
};

const brandBox: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "28px",
};

const logoCircle: React.CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  background: "#7CFF3A",
  color: "#07110b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "22px",
};

const navButton: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "13px 14px",
  borderRadius: "14px",
  border: "1px solid #57BE7D",
  color: "#14532D",
  background: "#FFFFFF",
  cursor: "pointer",
  marginBottom: "10px",
  fontWeight: "900",
};

const sidebarFooter: React.CSSProperties = {
  marginTop: "28px",
  padding: "14px",
  borderRadius: "14px",
  background: "#FFFFFF",
  border: "1px solid #BBF7D0",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#14532D",
  fontWeight: "900",
};

const content: React.CSSProperties = {
  flex: 1,
  padding: "32px",
  maxWidth: "100%",
  overflowX: "hidden",
};

const topBar: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  alignItems: "flex-start",
  marginBottom: "28px",
  flexWrap: "wrap",
};

const eyebrow: React.CSSProperties = {
  color: "#2F8F57",
  fontWeight: "900",
  letterSpacing: "1px",
};

const title: React.CSSProperties = {
  fontSize: "42px",
  margin: "8px 0",
};

const subtitle: React.CSSProperties = {
  color: "#374151",
  fontSize: "17px",
  maxWidth: "900px",
  fontWeight: "700",
};

const glassPill: React.CSSProperties = {
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(124,255,58,0.5)",
  borderRadius: "999px",
  padding: "12px 18px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backdropFilter: "blur(14px)",
};

const liveDot: React.CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: "#7CFF3A",
  boxShadow: "0 0 14px #7CFF3A",
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
  marginBottom: "28px",
};

const statCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "2px solid #BBF7D0",
  borderRadius: "24px",
  padding: "26px",
  boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
};

const statIcon: React.CSSProperties = {
  width: "34px",
  height: "34px",
  fontWeight: "900",
};

const statTitle: React.CSSProperties = {
  color: "#14532D",
  fontWeight: "900",
  fontSize: "20px",
  marginTop: "10px",
};

const statValue: React.CSSProperties = {
  fontSize: "42px",
  margin: "14px 0 0",
  fontWeight: "900",
  color: "#111827",
};
const dashboardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
};

const panel: React.CSSProperties = {
  background: "rgba(255,255,255,0.09)",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: "24px",
  padding: "24px",
  backdropFilter: "blur(18px)",
  boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
};

const muted: React.CSSProperties = {
  color: "#b8eec6",
};

const smallMuted: React.CSSProperties = {
  color: "#2F8F57",
  margin: 0,
  fontSize: "13px",
  fontWeight: "800",
};

const empty: React.CSSProperties = {
  color: "#d8ffe1",
  background: "rgba(0,0,0,0.25)",
  padding: "14px",
  borderRadius: "14px",
};

const itemCard: React.CSSProperties = {
  background: "rgba(0,0,0,0.28)",
  border: "1px solid rgba(124,255,58,0.25)",
  borderRadius: "18px",
  padding: "18px",
  marginTop: "14px",
};

const rowBetween: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "14px",
};

const baseButton: React.CSSProperties = {
  border: "none",
  borderRadius: "12px",
  padding: "10px 14px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const payoutButton: React.CSSProperties = {
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "green",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const dangerButton: React.CSSProperties = {
  ...baseButton,
  background: "#dc2626",
};

const warningButton: React.CSSProperties = {
  ...baseButton,
  background: "#f59e0b",
};

const successButton: React.CSSProperties = {
  ...baseButton,
  background: "#16a34a",
};

const metricRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 0",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
};

const moduleGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
  marginTop: "14px",
};

const moduleCard: React.CSSProperties = {
  background: "#57BE7D",
  border: "1px solid #2F8F57",
  borderRadius: "14px",
  padding: "14px",
  color: "#FFFFFF",
  fontWeight: "900",
};
function badge(status: string): React.CSSProperties {
  let background = "#6b7280";

  if (status === "open") background = "#dc2626";
  if (status === "reviewing") background = "#f59e0b";
  if (status === "resolved") background = "#16a34a";
  if (status === "assigned") background = "#2563eb";
  if (status === "completed") background = "#16a34a";
  if (status === "cancelled") background = "#dc2626";

  return {
    background,
    color: "white",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  };
}
