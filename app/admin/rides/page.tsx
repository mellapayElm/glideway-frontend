"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function AdminRidesPage() {
  const [rides, setRides] = useState<any[]>([]);

  async function loadRides() {
    try {
      const res = await fetch("http://localhost:5000/rides");
      const data = await res.json();
      setRides([...data].reverse());
    } catch {
      setRides([]);
    }
  }

  useEffect(() => {
    loadRides();

    socket.on("newRideRequest", (newRide) => {
      setRides((current) => [newRide, ...current]);
    });

    socket.on("rideUpdated", (updatedRide) => {
      setRides((current) =>
        current.map((ride) =>
          ride.rideId === updatedRide.rideId ? updatedRide : ride
        )
      );
    });

    return () => {
      socket.off("newRideRequest");
      socket.off("rideUpdated");
    };
  }, []);

  return (
    <main style={{ minHeight: "100vh", padding: "50px", background: "#f9fafb" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#166534" }}>
        Admin Rides
      </h1>

      <p style={{ marginTop: "10px", color: "#4b5563" }}>
        View all ride requests from GlideWay riders in real time.
      </p>

      <button onClick={loadRides} style={buttonStyle}>
        Refresh Rides
      </button>

      <div style={{ marginTop: "30px", display: "grid", gap: "18px" }}>
        {rides.length === 0 ? (
          <p style={{ color: "#111827" }}>No rides found yet.</p>
        ) : (
          rides.map((ride) => {
            const pickup = ride.pickup || ride.pickupAddress || "Not entered";
            const dropoff =
              ride.dropoff || ride.dropoffAddress || ride.destination || "Not entered";
            const fare = Number(ride.estimatedFare || ride.fare || 0);

            return (
              <div key={ride.rideId || ride.id} style={cardStyle}>
                <h2 style={{ color: "#166534", fontWeight: "800" }}>
                  {ride.rideId}
                </h2>

                <p style={textStyle}>
                  <b>Pickup:</b> {pickup}
                </p>

                <p style={textStyle}>
                  <b>Drop-off:</b> {dropoff}
                </p>

                <p style={textStyle}>
                  <b>Ride Type:</b> {ride.rideType || "Standard"}
                </p>

                <p style={textStyle}>
                  <b>Status:</b> {ride.status || "requested"}
                </p>

                <p style={textStyle}>
                  <b>Assigned Driver:</b>{" "}
                  {ride.assignedDriverId || ride.driver?.driverId || "Not assigned yet"}
                </p>

                <p style={textStyle}>
                  <b>Fare:</b> ${fare.toFixed(2)}
                </p>

                <p style={{ color: "#6b7280" }}>
                  <b>Created:</b> {ride.createdAt || "Just now"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

const textStyle: React.CSSProperties = {
  color: "#111827",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "20px",
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#166534",
  color: "#ffffff",
  fontWeight: "700",
  cursor: "pointer",
};

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  padding: "22px",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  color: "#111827",
};