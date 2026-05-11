"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { io } from "socket.io-client";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  TrafficLayer,
  Circle,
  useJsApiLoader,
} from "@react-google-maps/api";
import Protected from "@/components/Protected";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");

const center = {
  lat: 38.8339,
  lng: -104.8214,
};

type TabType = "live-map" | "dispatch" | "driver-tracking";

export default function AdminDispatchPage() {
  const [activeTab, setActiveTab] = useState<TabType>("live-map");
  const [drivers, setDrivers] = useState<any[]>([]);
  const [rides, setRides] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [safetyReports, setSafetyReports] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [selectedRide, setSelectedRide] = useState<any>(null);
  const [directions, setDirections] = useState<any>(null);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [message, setMessage] = useState("");

  const { isLoaded } = useJsApiLoader({
  id: "glideway-google-map",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
});

  async function loadData() {
    try {
     const [driversData, ridesData, zonesData, safetyData] = await Promise.all([
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => []),

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/rides`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => []),

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/heatmap/zones`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => []),

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/safety/reports`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => []),
]);

      setDrivers(Array.isArray(driversData) ? driversData : []);
      setRides(Array.isArray(ridesData) ? ridesData : []);
      setZones(Array.isArray(zonesData) ? zonesData : []);
      setSafetyReports(Array.isArray(safetyData) ? safetyData : []);
      setMessage("");
    } catch (error) {
      console.error("Operations center load failed:", error);
      setMessage("Unable to load live operations data.");
    }
  }

  useEffect(() => {
    loadData();

    socket.on("driverLocationUpdate", loadData);
    socket.on("driverLocationUpdated", loadData);
    socket.on("rideCreated", loadData);
    socket.on("newRideRequest", loadData);
    socket.on("rideStatusUpdated", loadData);
    socket.on("rideAccepted", loadData);
    socket.on("driverArrived", loadData);
    socket.on("tripStarted", loadData);
    socket.on("tripCompleted", loadData);
    socket.on("safetyReportReceived", loadData);

    const timer = setInterval(loadData, 5000);

    return () => {
      socket.off("driverLocationUpdate", loadData);
      socket.off("driverLocationUpdated", loadData);
      socket.off("rideCreated", loadData);
      socket.off("newRideRequest", loadData);
      socket.off("rideStatusUpdated", loadData);
      socket.off("rideAccepted", loadData);
      socket.off("driverArrived", loadData);
      socket.off("tripStarted", loadData);
      socket.off("tripCompleted", loadData);
      socket.off("safetyReportReceived", loadData);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !selectedRide) return;

    const pickupLat = Number(
      selectedRide.pickupLat || selectedRide.pickupLatitude
    );
    const pickupLng = Number(
      selectedRide.pickupLng || selectedRide.pickupLongitude
    );
    const dropoffLat = Number(
      selectedRide.dropoffLat || selectedRide.dropoffLatitude
    );
    const dropoffLng = Number(
      selectedRide.dropoffLng || selectedRide.dropoffLongitude
    );

    if (!pickupLat || !pickupLng || !dropoffLat || !dropoffLng) {
      setDirections(null);
      return;
    }

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: { lat: pickupLat, lng: pickupLng },
        destination: { lat: dropoffLat, lng: dropoffLng },
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          setDirections(null);
        }
      }
    );
  }, [isLoaded, selectedRide]);

  const onlineDrivers = drivers.filter((driver) => driver.status === "online");
  const offlineDrivers = drivers.filter((driver) => driver.status !== "online");

  const activeRides = rides.filter(
    (ride) => ride.status !== "completed" && ride.status !== "cancelled"
  );

  const pickupRides = activeRides.filter(
    (ride) =>
      ride.status === "requested" ||
      ride.status === "assigned" ||
      ride.status === "accepted" ||
      ride.status === "arrived"
  );

  const activeTrips = activeRides.filter(
    (ride) => ride.status === "started" || ride.status === "in_progress"
  );

  const openSafetyReports = safetyReports.filter(
    (report) => report.status !== "resolved"
  );

  return (
    <Protected role="ADMIN">
      <main style={page}>
        <section style={hero}>
          <div>
            <p style={badge}>🚦 GlideWay Live Operations Center</p>

            <h1 style={title}>
              Smarter Dispatch, Tracking, and Safety Visibility
            </h1>

            <p style={subtitle}>
              Professional real-time command center for live driver locations,
              active rider pickups, trip routes, traffic overlay, demand
              heatmaps, safety alerts, and online/offline fleet monitoring.
            </p>
          </div>

          <Link href="/admin" style={backButton}>
            ← Back to Admin
          </Link>
        </section>

        {message && <div style={messageBox}>{message}</div>}

        <section style={dispatchEngine}>
  <p style={badge}>⚡ Smart Dispatch Engine</p>

  <h2 style={dispatchTitle}>
    Intelligent Real-Time Ride Assignment System
  </h2>

  <p style={dispatchSubtitle}>
    GlideWay uses a professional smart dispatch engine designed to improve
    driver efficiency, reduce rider wait times, optimize traffic-aware routing,
    and deliver more accurate ETAs than traditional ride-share systems.
  </p>

  <div style={dispatchGrid}>
    <div style={dispatchCard}>
      <h3 style={dispatchCardTitle}>Best Driver Selection</h3>

      <p style={dispatchCardText}>
        Automatically selects the most suitable nearby driver based on
        distance, availability, ride status, driver performance, and response
        time.
      </p>
    </div>

    <div style={dispatchCard}>
      <h3 style={dispatchCardTitle}>Driver Load Balancing</h3>

      <p style={dispatchCardText}>
        Prevents driver overload by distributing ride requests fairly across
        active drivers to maintain service quality and reduce fatigue.
      </p>
    </div>

    <div style={dispatchCard}>
      <h3 style={dispatchCardTitle}>Traffic-Aware Routing</h3>

      <p style={dispatchCardText}>
        Uses live traffic visibility and route intelligence to reduce delays,
        improve pickup speed, and optimize travel efficiency.
      </p>
    </div>

    <div style={dispatchCard}>
      <h3 style={dispatchCardTitle}>Wait Time Optimization</h3>

      <p style={dispatchCardText}>
        Continuously balances rider demand and nearby fleet positioning to help
        reduce pickup delays and improve dispatch responsiveness.
      </p>
    </div>

    <div style={dispatchCard}>
      <h3 style={dispatchCardTitle}>ETA Accuracy Improvements</h3>

      <p style={dispatchCardText}>
        Enhances estimated arrival calculations using real-time traffic,
        driver movement, route conditions, and dispatch activity.
      </p>
    </div>
  </div>
</section>

        <section style={statsGrid}>
          <Stat title="Online Drivers" value={onlineDrivers.length} />
          <Stat title="Offline Drivers" value={offlineDrivers.length} />
          <Stat title="Active Pickups" value={pickupRides.length} />
          <Stat title="Active Trips" value={activeTrips.length} />
          <Stat title="Safety Alerts" value={openSafetyReports.length} />
          <Stat title="Total Rides" value={rides.length} />
        </section>

        <section style={tabs}>
          <button
            style={activeTab === "live-map" ? activeTabButton : tabButton}
            onClick={() => setActiveTab("live-map")}
          >
            Live Map
          </button>

          <button
            style={activeTab === "dispatch" ? activeTabButton : tabButton}
            onClick={() => setActiveTab("dispatch")}
          >
            Dispatch
          </button>

          <button
            style={
              activeTab === "driver-tracking" ? activeTabButton : tabButton
            }
            onClick={() => setActiveTab("driver-tracking")}
          >
            Driver Tracking
          </button>
        </section>

        <section style={toolbar}>
          <button
            style={showTraffic ? activeSmallButton : smallButton}
            onClick={() => setShowTraffic(!showTraffic)}
          >
            Traffic Overlay
          </button>

          <button
            style={showHeatmap ? activeSmallButton : smallButton}
            onClick={() => setShowHeatmap(!showHeatmap)}
          >
            Demand Heatmaps
          </button>

          <span style={toolbarText}>Live refresh enabled every 5 seconds.</span>
        </section>

        <section style={layout}>
          <div style={mapCard}>
            {!isLoaded ? (
              <div style={loading}>Loading GlideWay live map...</div>
            ) : (
              <GoogleMap mapContainerStyle={mapStyle} center={center} zoom={11}>
                {showTraffic && <TrafficLayer />}

                {showHeatmap &&
                  zones.map((zone, index) => {
                    const lat = Number(zone.lat || zone.latitude);
                    const lng = Number(zone.lng || zone.longitude);
                    const demand = Number(zone.demand || 0);

                    if (!lat || !lng) return null;

                    return (
                      <Circle
                        key={zone.id || index}
                        center={{ lat, lng }}
                        radius={Math.max(600, demand * 150)}
                        options={{
                          fillColor: demand >= 10 ? "#22C55E" : "#A7F3D0",
                          fillOpacity: 0.22,
                          strokeColor: "#16A34A",
                          strokeOpacity: 0.45,
                          strokeWeight: 1,
                        }}
                      />
                    );
                  })}

                {drivers.map((driver, index) => {
                  const lat = Number(driver.lat || driver.latitude);
                  const lng = Number(driver.lng || driver.longitude);

                  if (!lat || !lng) return null;

                  return (
                    <Marker
                      key={driver.id || driver.driverId || index}
                      position={{ lat, lng }}
                      title={`${driver.name || "Driver"} - ${
                        driver.status || "offline"
                      }`}
                      label={driver.status === "online" ? "🚗" : "⚫"}
                      onClick={() => setSelectedDriver(driver)}
                    />
                  );
                })}

                {pickupRides.map((ride, index) => {
                  const lat = Number(ride.pickupLat || ride.pickupLatitude);
                  const lng = Number(ride.pickupLng || ride.pickupLongitude);

                  if (!lat || !lng) return null;

                  return (
                    <Marker
                      key={`pickup-${ride.id || ride.rideId || index}`}
                      position={{ lat, lng }}
                      label="📍"
                      title="Active rider pickup"
                      onClick={() => setSelectedRide(ride)}
                    />
                  );
                })}

                {directions && <DirectionsRenderer directions={directions} />}

                {selectedDriver && (
                  <InfoWindow
                    position={{
                      lat: Number(selectedDriver.lat || selectedDriver.latitude),
                      lng: Number(selectedDriver.lng || selectedDriver.longitude),
                    }}
                    onCloseClick={() => setSelectedDriver(null)}
                  >
                    <div style={{ color: "#111827", maxWidth: "230px" }}>
                      <b>{selectedDriver.name || "Driver"}</b>
                      <p>Status: {selectedDriver.status || "offline"}</p>
                      <p>ID: {selectedDriver.driverId || selectedDriver.id}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            )}
          </div>

          <aside style={sidePanel}>
            {activeTab === "live-map" && (
              <>
                <h2 style={sectionTitle}>Live Map Overview</h2>

                <InfoBox
                  title="Live Driver Locations"
                  value={`${drivers.length} visible drivers`}
                />

                <InfoBox
                  title="Online Fleet"
                  value={`${onlineDrivers.length} online`}
                />

                <InfoBox
                  title="Offline Fleet"
                  value={`${offlineDrivers.length} offline`}
                />

                <InfoBox
                  title="Active Rider Pickups"
                  value={`${pickupRides.length} pickups`}
                />

                <InfoBox
                  title="Trip Routes"
                  value={
                    selectedRide
                      ? "Selected route displayed"
                      : "Select a pickup to show route"
                  }
                />

                <InfoBox
                  title="Traffic Overlay"
                  value={showTraffic ? "Enabled" : "Disabled"}
                />

                <InfoBox
                  title="Demand Heatmaps"
                  value={showHeatmap ? "Enabled" : "Disabled"}
                />

                <h2 style={sectionTitle}>Safety Alerts</h2>

                {openSafetyReports.length === 0 ? (
                  <p style={muted}>No open safety alerts.</p>
                ) : (
                  openSafetyReports.slice(0, 5).map((report, index) => (
                    <SafetyAlert key={report.safetyId || index} report={report} />
                  ))
                )}
              </>
            )}

            {activeTab === "dispatch" && (
              <>
                <h2 style={sectionTitle}>Dispatch Queue</h2>

                {activeRides.length === 0 ? (
                  <p style={muted}>No active ride requests.</p>
                ) : (
                  activeRides.map((ride, index) => (
                    <button
                      key={ride.id || ride.rideId || index}
                      style={rideCard}
                      onClick={() => setSelectedRide(ride)}
                    >
                      <b>{ride.rideId || ride.id || "Ride Request"}</b>
                      <p>
                        Pickup: {ride.pickupAddress || ride.pickup || "N/A"}
                      </p>
                      <p>
                        Drop-off:{" "}
                        {ride.dropoffAddress || ride.dropoff || "N/A"}
                      </p>
                      <p>
                        Driver:{" "}
                        {ride.driverId || ride.assignedDriverId || "Pending"}
                      </p>
                      <span style={statusBadge}>
                        {ride.status || "requested"}
                      </span>
                    </button>
                  ))
                )}

                <h2 style={sectionTitle}>Safety Alerts</h2>

                {openSafetyReports.length === 0 ? (
                  <p style={muted}>No open safety alerts.</p>
                ) : (
                  openSafetyReports.slice(0, 5).map((report, index) => (
                    <SafetyAlert key={report.safetyId || index} report={report} />
                  ))
                )}
              </>
            )}

            {activeTab === "driver-tracking" && (
              <>
                <h2 style={sectionTitle}>Driver Tracking</h2>

                {drivers.length === 0 ? (
                  <p style={muted}>No drivers found.</p>
                ) : (
                  drivers.map((driver, index) => (
                    <button
                      key={driver.id || driver.driverId || index}
                      style={driverCard}
                      onClick={() => setSelectedDriver(driver)}
                    >
                      <div style={driverTop}>
                        <b>{driver.name || "Driver"}</b>

                        <span
                          style={{
                            ...driverStatus,
                            background:
                              driver.status === "online"
                                ? "#DCFCE7"
                                : "#F3F4F6",
                            color:
                              driver.status === "online"
                                ? "#166534"
                                : "#374151",
                          }}
                        >
                          {driver.status || "offline"}
                        </span>
                      </div>

                      <p>ID: {driver.driverId || driver.id || "N/A"}</p>
                      <p>
                        Lat:{" "}
                        {Number(driver.lat || driver.latitude || 0)
                          ? Number(driver.lat || driver.latitude).toFixed(5)
                          : "N/A"}
                      </p>
                      <p>
                        Lng:{" "}
                        {Number(driver.lng || driver.longitude || 0)
                          ? Number(driver.lng || driver.longitude).toFixed(5)
                          : "N/A"}
                      </p>
                    </button>
                  ))
                )}
              </>
            )}

            {selectedRide && (
              <div style={selectedCard}>
                <h3 style={sectionTitle}>Selected Trip Route</h3>
                <p>
                  <b>Ride:</b> {selectedRide.rideId || selectedRide.id}
                </p>
                <p>
                  <b>Status:</b> {selectedRide.status || "requested"}
                </p>
                <p>
                  <b>Fare:</b> ${Number(selectedRide.fare || 0).toFixed(2)}
                </p>
                <p>
                  <b>Driver:</b>{" "}
                  {selectedRide.driverId ||
                    selectedRide.assignedDriverId ||
                    "Pending"}
                </p>
              </div>
            )}
          </aside>
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

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div style={infoBox}>
      <p style={infoTitle}>{title}</p>
      <h3 style={infoValue}>{value}</h3>
    </div>
  );
}

function SafetyAlert({ report }: { report: any }) {
  return (
    <div style={alertCard}>
      <h3 style={alertTitle}>{report.type || "Safety Alert"}</h3>

      <p style={smallText}>
        {report.description || report.message || "No details."}
      </p>

      <span style={alertBadge}>{report.status || "open"}</span>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "30px",
  background: "#FFFFFF",
  color: "#111827",
  fontFamily: "system-ui, Arial, sans-serif",
};

const hero: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  flexWrap: "wrap",
  padding: "30px",
  borderRadius: "28px",
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
  maxWidth: "950px",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "16px",
  marginBottom: "20px",
};

const statCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "2px solid #BBF7D0",
  borderRadius: "22px",
  padding: "20px",
  boxShadow: "0 12px 26px rgba(17,24,39,0.08)",
};

const statLabel: React.CSSProperties = {
  color: "#14532D",
  fontWeight: 900,
};

const statValue: React.CSSProperties = {
  color: "#57BE7D",
  fontSize: "32px",
  fontWeight: 900,
};

const tabs: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "14px",
};

const tabButton: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "1px solid #BBF7D0",
  background: "#FFFFFF",
  color: "#2F8F57",
  fontWeight: 900,
  cursor: "pointer",
};

const activeTabButton: React.CSSProperties = {
  ...tabButton,
  background: "#57BE7D",
  color: "#FFFFFF",
};

const toolbar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const smallButton: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: "12px",
  border: "1px solid #D1D5DB",
  background: "#FFFFFF",
  color: "#374151",
  fontWeight: 900,
  cursor: "pointer",
};

const activeSmallButton: React.CSSProperties = {
  ...smallButton,
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  color: "#166534",
};

const toolbarText: React.CSSProperties = {
  color: "#6B7280",
  fontWeight: 700,
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
  height: "700px",
};

const sidePanel: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "24px",
  padding: "22px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  maxHeight: "700px",
  overflowY: "auto",
};

const loading: React.CSSProperties = {
  height: "700px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#2F8F57",
  fontWeight: 900,
};

const sectionTitle: React.CSSProperties = {
  color: "#2F8F57",
  fontWeight: 900,
  marginTop: 0,
};

const muted: React.CSSProperties = {
  color: "#6B7280",
  fontWeight: 700,
};

const rideCard: React.CSSProperties = {
  width: "100%",
  textAlign: "left",
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  borderRadius: "16px",
  padding: "16px",
  marginBottom: "12px",
  color: "#111827",
  cursor: "pointer",
};

const statusBadge: React.CSSProperties = {
  display: "inline-block",
  marginTop: "8px",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "#57BE7D",
  color: "#FFFFFF",
  fontWeight: 900,
  textTransform: "capitalize",
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

const driverStatus: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: "999px",
  fontWeight: 900,
  textTransform: "capitalize",
};

const infoBox: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "18px",
  padding: "18px",
  marginBottom: "14px",
};

const infoTitle: React.CSSProperties = {
  color: "#14532D",
  fontWeight: 900,
  margin: 0,
};

const infoValue: React.CSSProperties = {
  color: "#57BE7D",
  marginBottom: 0,
};

const selectedCard: React.CSSProperties = {
  marginTop: "20px",
  padding: "16px",
  borderRadius: "18px",
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
};

const alertCard: React.CSSProperties = {
  background: "#FEF2F2",
  border: "1px solid #FECACA",
  borderRadius: "16px",
  padding: "16px",
  marginBottom: "12px",
};

const alertTitle: React.CSSProperties = {
  color: "#B91C1C",
  marginTop: 0,
};

const alertBadge: React.CSSProperties = {
  display: "inline-block",
  marginTop: "8px",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "#FEE2E2",
  color: "#B91C1C",
  fontWeight: 900,
  textTransform: "capitalize",
};

const smallText: React.CSSProperties = {
  color: "#4B5563",
  fontWeight: 700,
  margin: "6px 0",
};
const dispatchEngine: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "26px",
  padding: "28px",
  marginBottom: "24px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const dispatchTitle: React.CSSProperties = {
  color: "#2F8F57",
  fontSize: "32px",
  fontWeight: 900,
  margin: "14px 0 10px",
};

const dispatchSubtitle: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.8,
  fontWeight: 700,
  maxWidth: "1000px",
};

const dispatchGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "18px",
  marginTop: "24px",
};

const dispatchCard: React.CSSProperties = {
  background: "#ECFDF3",
  border: "1px solid #BBF7D0",
  borderRadius: "18px",
  padding: "20px",
};

const dispatchCardTitle: React.CSSProperties = {
  color: "#14532D",
  marginTop: 0,
  fontWeight: 900,
};

const dispatchCardText: React.CSSProperties = {
  color: "#4B5563",
  lineHeight: 1.7,
  fontWeight: 700,
};