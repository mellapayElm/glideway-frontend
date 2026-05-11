"use client";

import { useEffect, useState } from "react";

export default function HeatmapPage() {
  const [zones, setZones] = useState<any[]>([]);

  async function loadZones() {
    const res = await fetch("http://localhost:5000/heatmap/zones");
    const data = await res.json();
    setZones(data);
  }

  useEffect(() => {
    loadZones();
    const timer = setInterval(loadZones, 5000);
    return () => clearInterval(timer);
  }, []);

  function zoneColor(demand: number) {
    if (demand >= 10) return "#dc2626";
    if (demand >= 5) return "#f59e0b";
    return "#22c55e";
  }

  return (
    <div style={page}>
      <h1 style={title}>🔥 GlideWay Demand Heatmap</h1>
      <p style={subtitle}>
        Real-time demand intelligence for dispatch, pricing, and driver supply.
      </p>

      <div style={grid}>
        {zones.map((zone) => (
          <div
            key={zone.id}
            style={{
              ...card,
              border: `2px solid ${zoneColor(zone.demand)}`,
              boxShadow: `0 0 20px ${zoneColor(zone.demand)}55`,
            }}
          >
            <h2>{zone.zoneName}</h2>
            <p>{zone.city}</p>

            <div style={badge(zone.demand)}>
              {zone.demand >= 10
                ? "🔴 High Demand"
                : zone.demand >= 5
                ? "🟡 Medium Demand"
                : "🟢 Low Demand"}
            </div>

            <p>
              <b>Demand:</b> {zone.demand}
            </p>
            <p>
              <b>Active Drivers:</b> {zone.activeDrivers}
            </p>
            <p>
              <b>Surge:</b> {zone.surge}x
            </p>
            <p>
              <b>Location:</b> {zone.lat}, {zone.lng}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#050505",
  color: "white",
  padding: "30px",
};

const title: React.CSSProperties = {
  color: "#22c55e",
};

const subtitle: React.CSSProperties = {
  color: "#cbd5e1",
  marginBottom: "24px",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "18px",
};

const card: React.CSSProperties = {
  background: "#111827",
  padding: "20px",
  borderRadius: "18px",
};

function badge(demand: number): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    marginBottom: "12px",
    background:
      demand >= 10 ? "#7f1d1d" : demand >= 5 ? "#78350f" : "#064e3b",
    color: "white",
    fontWeight: "bold",
  };
}