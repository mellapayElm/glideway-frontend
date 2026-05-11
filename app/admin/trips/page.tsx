"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";

export default function AdminTripsPage() {
  const [rides, setRides] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadTrips() {
    try {
      const res = await fetch("http://localhost:5000/rides");
      const data = await res.json();

      setRides(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load trips:", error);
      setMessage("Unable to load trip records.");
    }
  }

  useEffect(() => {
    loadTrips();
  }, []);

  const activeTrips = rides.filter(
    (ride) => ride.status !== "completed" && ride.status !== "cancelled"
  );

  const completedTrips = rides.filter((ride) => ride.status === "completed");
  const cancelledTrips = rides.filter((ride) => ride.status === "cancelled");

  return (
    <Protected role="ADMIN">
      <main style={page}>
        <section style={hero}>
          <p style={badge}>📍 GlideWay Trip Management</p>

          <h1 style={title}>Trips Management Center</h1>

          <p style={subtitle}>
            Monitor active rides, completed rides, cancelled trips, pickup and
            drop-off records, driver assignment, fare records, and trip status.
          </p>
        </section>

        {message && <div style={messageBox}>{message}</div>}

        <section style={statsGrid}>
          <Stat title="Total Trips" value={rides.length} />
          <Stat title="Active Trips" value={activeTrips.length} />
          <Stat title="Completed Trips" value={completedTrips.length} />
          <Stat title="Cancelled Trips" value={cancelledTrips.length} />
        </section>

        <section style={panel}>
          <h2 style={sectionTitle}>Trip Records</h2>

          {rides.length === 0 ? (
            <p style={muted}>No trips found.</p>
          ) : (
            rides.map((ride) => (
              <div key={ride.id || ride.rideId} style={tripCard}>
                <div style={tripTop}>
                  <div>
                    <h3 style={tripTitle}>Ride #{ride.rideId || ride.id}</h3>
                    <p style={smallText}>
                      Pickup: {ride.pickupAddress || ride.pickup || "N/A"}
                    </p>
                    <p style={smallText}>
                      Drop-off: {ride.dropoffAddress || ride.dropoff || "N/A"}
                    </p>
                  </div>

                  <span style={getStatusBadge(ride.status || "requested")}>
                    {ride.status || "requested"}
                  </span>
                </div>

                <div style={infoGrid}>
                  <Info
                    label="Fare"
                    value={`$${Number(ride.fare || ride.estimatedFare || 0).toFixed(
                      2
                    )}`}
                  />

                  <Info
                    label="Ride Type"
                    value={ride.rideType || ride.type || "Standard"}
                  />

                  <Info
                    label="Driver"
                    value={ride.assignedDriverId || ride.driverId || "Pending"}
                  />

                  <Info label="ETA" value={ride.eta || ride.duration || "N/A"} />

                  <Info
                    label="Distance"
                    value={ride.distance || ride.distanceMiles || "N/A"}
                  />

                  <Info
                    label="Created"
                    value={
                      ride.createdAt
                        ? new Date(ride.createdAt).toLocaleString()
                        : "N/A"
                    }
                  />
                </div>

                <div style={buttonRow}>
                  <button style={greenButton}>View Details</button>
                  <button style={outlineButton}>Review Route</button>
                  <button style={redButton}>Flag Issue</button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </Protected>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div style={statCard}>
      <p style={statLabel}>{title}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={infoBox}>
      <p style={infoLabel}>{label}</p>
      <b style={infoValue}>{value}</b>
    </div>
  );
}

function getStatusBadge(status: string): React.CSSProperties {
  const normalized = status.toLowerCase();

  if (normalized === "completed") {
    return {
      ...statusBadge,
      background: "#ECFDF3",
      color: "#2F8F57",
      border: "1px solid #57BE7D",
    };
  }

  if (normalized === "cancelled") {
    return {
      ...statusBadge,
      background: "#FEF2F2",
      color: "#DC2626",
      border: "1px solid #FCA5A5",
    };
  }

  if (normalized === "started" || normalized === "accepted") {
    return {
      ...statusBadge,
      background: "#EFF6FF",
      color: "#2563EB",
      border: "1px solid #93C5FD",
    };
  }

  return {
    ...statusBadge,
    background: "#FEF3C7",
    color: "#92400E",
    border: "1px solid #F59E0B",
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
  boxShadow: "0 12px 30px rgba(87,190,125,0.14)",
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
  fontWeight: 700,
  lineHeight: 1.7,
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

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "18px",
  marginBottom: "24px",
};

const statCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "2px solid #BBF7D0",
  borderRadius: "22px",
  padding: "22px",
  boxShadow: "0 12px 26px rgba(17,24,39,0.08)",
};

const statLabel: React.CSSProperties = {
  color: "#14532D",
  fontWeight: 900,
};

const statValue: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "34px",
  fontWeight: 900,
};

const panel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const sectionTitle: React.CSSProperties = {
  color: "#2F8F57",
  marginTop: 0,
};

const muted: React.CSSProperties = {
  color: "#6B7280",
};

const tripCard: React.CSSProperties = {
  padding: "20px",
  borderRadius: "20px",
  border: "1px solid #E5E7EB",
  background: "#FFFFFF",
  marginBottom: "18px",
  boxShadow: "0 10px 24px rgba(17,24,39,0.06)",
};

const tripTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
};

const tripTitle: React.CSSProperties = {
  margin: 0,
  color: "#111827",
};

const smallText: React.CSSProperties = {
  color: "#6B7280",
  margin: "6px 0",
};

const statusBadge: React.CSSProperties = {
  borderRadius: "999px",
  padding: "8px 14px",
  fontWeight: 900,
  textTransform: "capitalize",
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "12px",
  marginTop: "18px",
};

const infoBox: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "14px",
  padding: "14px",
};

const infoLabel: React.CSSProperties = {
  margin: 0,
  color: "#4B5563",
  fontWeight: 800,
};

const infoValue: React.CSSProperties = {
  color: "#2F8F57",
  fontSize: "18px",
};

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const greenButton: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "none",
  background: "#57BE7D",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};

const outlineButton: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "1px solid #57BE7D",
  background: "#ECFDF3",
  color: "#2F8F57",
  fontWeight: 900,
  cursor: "pointer",
};

const redButton: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "none",
  background: "#EF4444",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};