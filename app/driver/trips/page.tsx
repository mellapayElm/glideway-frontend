"use client";

import DriverTopNav from "@/components/DriverTopNav";
import Protected from "@/components/Protected";

export default function DriverTripsPage() {
  return (
    <Protected role="DRIVER">
      <DriverTopNav />

      <main style={page}>
        <section style={hero}>
          <p style={badge}>📍 GlideWay Driver Trips</p>
          <h1 style={title}>Trips & Ride History</h1>
          <p style={subtitle}>
            View active trips, completed rides, cancellations, rider safety
            records, pickup history, fare details, and tip records.
          </p>
        </section>

        <section style={grid}>
          <StatCard title="Completed Trips" value="148" />
          <StatCard title="Active Trips" value="0" />
          <StatCard title="Cancelled Trips" value="3" />
          <StatCard title="Tips Records" value="$86.50" />
        </section>

        <section style={panel}>
          <h2 style={sectionTitle}>Active Trip</h2>
          <p style={text}>Status: No active trip right now.</p>
          <p style={text}>Go online to receive nearby ride requests.</p>
        </section>

        <section style={panel}>
          <h2 style={sectionTitle}>Trip History</h2>

          <Trip
            name="Airport Ride"
            pickup="Downtown Denver"
            dropoff="DIA Airport"
            duration="38 mins"
            distance="24.6 mi"
            payout="$42.80"
            tip="20%"
            status="Completed"
          />

          <Trip
            name="City Ride"
            pickup="Colorado Springs"
            dropoff="Monument"
            duration="22 mins"
            distance="14.2 mi"
            payout="$24.15"
            tip="15%"
            status="Completed"
          />

          <Trip
            name="Premium Ride"
            pickup="Hotel District"
            dropoff="Downtown"
            duration="44 mins"
            distance="29.1 mi"
            payout="$58.60"
            tip="25%"
            status="Completed"
          />
        </section>

        <section style={panel}>
          <h2 style={sectionTitle}>Safety Records</h2>
          <p style={text}>• Rider verification</p>
          <p style={text}>• SOS reports</p>
          <p style={text}>• Trip sharing history</p>
          <p style={text}>• Driver/rider issue reports</p>
        </section>
      </main>
    </Protected>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div style={card}>
      <p style={label}>{title}</p>
      <h2 style={amount}>{value}</h2>
    </div>
  );
}

function Trip({
  name,
  pickup,
  dropoff,
  duration,
  distance,
  payout,
  tip,
  status,
}: {
  name: string;
  pickup: string;
  dropoff: string;
  duration: string;
  distance: string;
  payout: string;
  tip: string;
  status: string;
}) {
  return (
    <div style={tripCard}>
      <div>
        <h3 style={tripTitle}>{name}</h3>
        <p style={smallText}>Pickup: {pickup}</p>
        <p style={smallText}>Drop-off: {dropoff}</p>
        <p style={smallText}>
          {duration} · {distance} · Tip {tip}
        </p>
      </div>

      <div style={right}>
        <b style={money}>{payout}</b>
        <p style={statusBadge}>{status}</p>
      </div>
    </div>
  );
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
};

const title: React.CSSProperties = {
  fontSize: "38px",
  color: "#57BE7D",
  margin: "12px 0 8px",
  fontWeight: 900,
};

const subtitle: React.CSSProperties = {
  color: "#4B5563",
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
  fontWeight: 800,
};

const amount: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "30px",
  fontWeight: 900,
};

const panel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "20px",
  padding: "24px",
  marginBottom: "24px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
};

const sectionTitle: React.CSSProperties = {
  color: "#2F8F57",
  marginTop: 0,
};

const text: React.CSSProperties = {
  color: "#4B5563",
};

const tripCard: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "18px",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #E5E7EB",
  marginBottom: "14px",
  background: "#FFFFFF",
};

const tripTitle: React.CSSProperties = {
  margin: 0,
  color: "#111827",
};

const smallText: React.CSSProperties = {
  color: "#6B7280",
  margin: "6px 0",
};

const right: React.CSSProperties = {
  textAlign: "right",
};

const money: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "20px",
};

const statusBadge: React.CSSProperties = {
  padding: "7px 12px",
  borderRadius: "999px",
  background: "#ECFDF3",
  color: "#2F8F57",
  fontWeight: 900,
};