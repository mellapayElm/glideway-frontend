"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { io } from "socket.io-client";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const socket = io("http://localhost:5000");

const center = {
  lat: 38.8339,
  lng: -104.8214,
};

export default function AdminDriverTrackingPage() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [message, setMessage] = useState("");

  const { isLoaded } = useJsApiLoader({
  id: "glideway-google-map",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
});

  async function loadDrivers() {
    try {
      const data = await fetch("http://localhost:5000/drivers", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .catch(() => []);

      setDrivers(Array.isArray(data) ? data : []);
      setMessage("");
    } catch (error) {
      console.error("Driver tracking load failed:", error);
      setMessage("Unable to load driver tracking data.");
    }
  }

  useEffect(() => {
    loadDrivers();

    socket.on("driverLocationUpdate", loadDrivers);
    socket.on("driverLocationUpdated", loadDrivers);

    const timer = setInterval(loadDrivers, 5000);

    return () => {
      socket.off("driverLocationUpdate", loadDrivers);
      socket.off("driverLocationUpdated", loadDrivers);
      clearInterval(timer);
    };
  }, []);

  const onlineDrivers = drivers.filter((driver) => driver.status === "online");

  return (
    <main style={page}>
      <section style={header}>
        <div>
          <p style={badge}>📍 GlideWay Live Tracking</p>

          <h1 style={title}>Real-Time Driver Tracking</h1>

          <p style={subtitle}>
            View driver locations, online status, coordinates, and current trip
            visibility from one admin tracking center.
          </p>
        </div>

        <Link href="/admin" style={backButton}>
          ← Back to Admin
        </Link>
      </section>

      {message && <div style={messageBox}>{message}</div>}

      <section style={statsGrid}>
        <Stat title="Total Drivers" value={drivers.length} />
        <Stat title="Online Drivers" value={onlineDrivers.length} />
        <Stat
          title="Offline Drivers"
          value={drivers.length - onlineDrivers.length}
        />
      </section>

      <section style={layout}>
        <div style={mapCard}>
          {!isLoaded ? (
            <div style={loading}>Loading driver tracking map...</div>
          ) : (
            <GoogleMap mapContainerStyle={mapStyle} center={center} zoom={11}>
              {drivers.map((driver) => {
                const lat = Number(driver.lat || driver.latitude);
                const lng = Number(driver.lng || driver.longitude);

                if (!lat || !lng) return null;

                return (
                  <Marker
                    key={driver.id || driver.driverId}
                    position={{ lat, lng }}
                    title={`${driver.name || "Driver"} - ${
                      driver.status || "unknown"
                    }`}
                    label={driver.status === "online" ? "🚗" : "⚫"}
                    onClick={() => setSelectedDriver(driver)}
                  />
                );
              })}

              {selectedDriver && (
                <InfoWindow
                  position={{
                    lat: Number(selectedDriver.lat || selectedDriver.latitude),
                    lng: Number(selectedDriver.lng || selectedDriver.longitude),
                  }}
                  onCloseClick={() => setSelectedDriver(null)}
                >
                  <div style={{ color: "#111827", maxWidth: "220px" }}>
                    <b>{selectedDriver.name || "Driver"}</b>
                    <p>Status: {selectedDriver.status || "unknown"}</p>
                    <p>ID: {selectedDriver.id || selectedDriver.driverId}</p>
                    <p>
                      Lat:{" "}
                      {Number(
                        selectedDriver.lat || selectedDriver.latitude || 0
                      ).toFixed(5)}
                    </p>
                    <p>
                      Lng:{" "}
                      {Number(
                        selectedDriver.lng || selectedDriver.longitude || 0
                      ).toFixed(5)}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>

        <aside style={sidePanel}>
          <h2 style={sectionTitle}>Driver List</h2>

          {drivers.length === 0 ? (
            <p style={muted}>No drivers found.</p>
          ) : (
            drivers.map((driver, index) => {
              const lat = Number(driver.lat || driver.latitude || 0);
              const lng = Number(driver.lng || driver.longitude || 0);

              return (
                <button
                  key={driver.id || driver.driverId || index}
                  style={driverCard}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div style={driverTop}>
                    <b>{driver.name || "Driver"}</b>
                    <span
                      style={{
                        ...statusBadge,
                        background:
                          driver.status === "online" ? "#DCFCE7" : "#F3F4F6",
                        color:
                          driver.status === "online" ? "#166534" : "#374151",
                      }}
                    >
                      {driver.status || "offline"}
                    </span>
                  </div>

                  <p style={smallText}>
                    ID: {driver.driverId || driver.id || "N/A"}
                  </p>

                  <p style={smallText}>Lat: {lat ? lat.toFixed(5) : "N/A"}</p>
                  <p style={smallText}>Lng: {lng ? lng.toFixed(5) : "N/A"}</p>
                </button>
              );
            })
          )}
        </aside>
      </section>
    </main>
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

const backButton: React.CSSProperties = {
  background: "#57BE7D",
  color: "white",
  padding: "12px 18px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: 900,
};

const messageBox: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  color: "#166534",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "20px",
  fontWeight: 900,
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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

const layout: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
};

const mapCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const mapStyle: React.CSSProperties = {
  width: "100%",
  height: "680px",
};

const loading: React.CSSProperties = {
  height: "680px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#2F8F57",
  fontWeight: 900,
};

const sidePanel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "24px",
  padding: "22px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  maxHeight: "680px",
  overflowY: "auto",
};

const sectionTitle: React.CSSProperties = {
  color: "#2F8F57",
  fontWeight: 900,
};

const muted: React.CSSProperties = {
  color: "#6B7280",
  fontWeight: 700,
};

const driverCard: React.CSSProperties = {
  width: "100%",
  textAlign: "left",
  background: "#FFFFFF",
  border: "1px solid #BBF7D0",
  borderRadius: "16px",
  padding: "16px",
  marginBottom: "12px",
  color: "#111827",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(17,24,39,0.05)",
};

const driverTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "center",
};

const statusBadge: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: "999px",
  fontWeight: 900,
  textTransform: "capitalize",
};

const smallText: React.CSSProperties = {
  color: "#4B5563",
  fontWeight: 700,
  margin: "6px 0",
};