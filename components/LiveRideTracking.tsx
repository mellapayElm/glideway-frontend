"use client";

import { useEffect, useState } from "react";

export default function LiveRideTracking() {
  const [driverLeft, setDriverLeft] = useState(35);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    "Your driver is on the way.",
    "Got it, arriving now.",
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDriverLeft((prev) => (prev >= 70 ? 35 : prev + 2));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function sendMessage() {
    if (!message.trim()) return;
    setChat([...chat, message]);
    setMessage("");
  }

  return (
    <section style={darkSection}>
      <h2 style={title}>Live Ride Tracking</h2>
      <p style={subtitle}>
        Track your driver in real time, chat safely, and manage your ride all in one place.
      </p>

      <div style={grid}>
        <div style={mapCard}>
          <div style={mapHeader}>
            ✈ Live GPS Tracking <span style={live}>● Live</span>
          </div>

          <div style={mapBody}>
            <div style={routeLine}></div>
            <div style={pickupDot}></div>
            <div style={dropoffDot}></div>

            <div
              style={{
                ...driverDot,
                left: `${driverLeft}%`,
              }}
            >
              🚗
            </div>
          </div>

          <div style={mapFooter}>
            <span>Ride ID <b>GW-10234</b></span>
            <span>Status <b style={{ color: "#7cd992" }}>DRIVER_EN_ROUTE</b></span>
            <span>Estimated Fare <b>$24.75</b></span>
            <span style={authorized}>AUTHORIZED</span>
          </div>
        </div>

        <div style={sideStack}>
          <div style={darkCard}>
            <b>John Driver</b>
            <p>Toyota Camry · ABC 123</p>
            <p>⭐ 4.92 rating</p>
          </div>

          <div style={darkCard}>
            <b>Chat with Driver</b>

            {chat.map((item, index) => (
              <p key={index} style={index % 2 === 0 ? bubbleLeft : bubbleRight}>
                {item}
              </p>
            ))}

            <div style={chatRow}>
              <input
                style={chatInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message..."
              />

              <button style={sendButton} onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>

          <div style={darkCard}>
            <b>Safe Calling</b>
            <p>Your number stays private.</p>
            <button style={greenButton}>Start Masked Call</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const darkSection = {
  padding: "90px 38px",
  background: "#111827",
  color: "white",
};

const title = {
  textAlign: "center" as const,
  fontSize: "44px",
};

const subtitle = {
  textAlign: "center" as const,
  marginBottom: "50px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
};

const mapCard = {
  background: "#1f2937",
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid #374151",
};

const mapHeader = {
  padding: "18px",
  borderBottom: "1px solid #374151",
  fontWeight: 900,
};

const live = {
  float: "right" as const,
  color: "#7cd992",
};

const mapBody = {
  position: "relative" as const,
  height: "320px",
};

const routeLine = {
  position: "absolute" as const,
  top: "150px",
  left: "120px",
  width: "340px",
  height: "6px",
  background: "#7cd992",
  transform: "rotate(25deg)",
  borderRadius: "999px",
};

const pickupDot = {
  position: "absolute" as const,
  top: "120px",
  left: "110px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "#7cd992",
};

const dropoffDot = {
  position: "absolute" as const,
  top: "250px",
  right: "120px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "#ef4444",
};

const driverDot = {
  position: "absolute" as const,
  top: "185px",
  fontSize: "34px",
  transition: "left 0.8s ease",
};

const mapFooter = {
  padding: "18px",
  borderTop: "1px solid #374151",
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  flexWrap: "wrap" as const,
};

const authorized = {
  background: "rgba(87,189,124,0.25)",
  color: "#86efac",
  padding: "8px 16px",
  borderRadius: "12px",
  fontWeight: 900,
};

const sideStack = {
  display: "grid",
  gap: "18px",
};

const darkCard = {
  background: "#1f2937",
  borderRadius: "18px",
  padding: "22px",
  border: "1px solid #374151",
};

const bubbleLeft = {
  background: "#374151",
  padding: "10px",
  borderRadius: "12px",
  width: "fit-content",
};

const bubbleRight = {
  background: "#57bd7c",
  padding: "10px",
  borderRadius: "12px",
  width: "fit-content",
  marginLeft: "auto",
};

const chatRow = {
  display: "flex",
  gap: "10px",
  marginTop: "18px",
};

const chatInput = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "none",
};

const sendButton = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  background: "#57bd7c",
  color: "white",
  fontWeight: 900,
};

const greenButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  background: "#57bd7c",
  color: "white",
  border: "none",
  fontWeight: 900,
};