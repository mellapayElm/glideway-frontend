"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Protected from "@/components/Protected";
import DriverTopNav from "@/components/DriverTopNav";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");

const driver = {
  driverId: "driver-001",
  name: "Berhane H.",
  car: "Toyota Camry",
  plate: "GLD-2026",
  color: "Black",
  verified: true,
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
};

const fallbackLocation = {
  lat: 38.8339,
  lng: -104.8214,
};

export default function DriverApp() {
  const [online, setOnline] = useState(false);
  const [ride, setRide] = useState<any>(null);
  const [status, setStatus] = useState("Offline");
  const [step, setStep] = useState("waiting");
  const [location, setLocation] = useState<any>(null);
  const [safetyMessage, setSafetyMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatText, setChatText] = useState("");

  const watchId = useRef<number | null>(null);
  const demoTimer = useRef<any>(null);
  const lastLocation = useRef<any>(null);
  const alertAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    alertAudioRef.current = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );
    alertAudioRef.current.loop = true;

    socket.on("connect", () => {
      console.log("✅ Driver connected:", socket.id);
    });

    socket.on("newRideRequest", (rideData) => {
      alert("🚗 New Ride Request!");
      setRide(rideData);
      setStatus("New ride request received!");
      setStep("requested");
      playAlert();
    });

    socket.on("receiveChatMessage", (chatMessage) => {
      setChatMessages((current) => {
        const exists = current.find(
          (msg) => msg.id === chatMessage.id && msg.sender === chatMessage.sender
        );

        if (exists) return current;
        return [...current, chatMessage];
      });
    });

    socket.on("safetyReportReceived", (report) => {
      setSafetyMessage(`🛡️ Safety notice received: ${report.type || "Report"}`);
    });

    return () => {
      socket.off("connect");
      socket.off("newRideRequest");
      socket.off("receiveChatMessage");
      socket.off("safetyReportReceived");
      stopAlert();

      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }

      if (demoTimer.current) {
        clearInterval(demoTimer.current);
      }
    };
  }, [ride?.rideId]);

  function sendChatMessage() {
    if (!chatText.trim()) return;

    const chatMessage = {
      id: "driver_msg_" + Date.now(),
      rideId: ride?.rideId || "",
      sender: "driver",
      senderName: driver.name,
      text: chatText,
    };

    setChatMessages((current) => [...current, chatMessage]);
    socket.emit("sendChatMessage", chatMessage);
    setChatText("");
  }

  function playAlert() {
    if (navigator.vibrate) {
      navigator.vibrate([500, 200, 500, 200, 500]);
    }

    const audioContext = new AudioContext();

    const beep = () => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gain.gain.value = 0.3;

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.4);
    };

    beep();
    setTimeout(beep, 700);
    setTimeout(beep, 1400);
  }

  function stopAlert() {
    if (alertAudioRef.current) {
      alertAudioRef.current.pause();
      alertAudioRef.current.currentTime = 0;
    }
  }

  function calculateHeading(from: any, to: any) {
    if (!from || !to) return 0;

    const lat1 = (from.lat * Math.PI) / 180;
    const lat2 = (to.lat * Math.PI) / 180;
    const lngDiff = ((to.lng - from.lng) * Math.PI) / 180;

    const y = Math.sin(lngDiff) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lngDiff);

    const heading = (Math.atan2(y, x) * 180) / Math.PI;
    return (heading + 360) % 360;
  }

  function sendDriverLocation(positionData: {
    lat: number;
    lng: number;
    accuracy?: number;
    speed?: number | null;
    heading?: number | null;
    source: "gps" | "demo";
  }) {
    const previous = lastLocation.current;
    const current = { lat: positionData.lat, lng: positionData.lng };

    const calculatedHeading = previous
      ? calculateHeading(previous, current)
      : positionData.heading || 0;

    const driverData = {
      ...driver,
      lat: positionData.lat,
      lng: positionData.lng,
      heading: positionData.heading ?? calculatedHeading,
      calculatedHeading,
      speed: positionData.speed ?? 0,
      accuracy: positionData.accuracy ?? null,
      timestamp: Date.now(),
      source: positionData.source,
      status: "online",
    };

    lastLocation.current = current;
    setLocation(driverData);

    socket.emit("registerDriver", driverData);
    socket.emit("driverOnline", driverData);
    socket.emit("driverLocationUpdate", driverData);
  }

  function goOnline() {
    setStatus("Starting GPS stream...");
    playAlert();
    setTimeout(() => stopAlert(), 700);

    if (!navigator.geolocation) {
      startDemoMovement();
      setOnline(true);
      setStatus("Online with demo GPS stream. Waiting for rides.");
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        sendDriverLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          speed: pos.coords.speed,
          heading: pos.coords.heading,
          source: "gps",
        });

        setOnline(true);
        setStatus("Online and waiting for ride requests");
      },
      () => {
        startDemoMovement();
        setOnline(true);
        setStatus("GPS unavailable. Online with demo GPS stream.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 8000,
      }
    );
  }

  function startDemoMovement() {
    if (demoTimer.current) clearInterval(demoTimer.current);

    let lat = fallbackLocation.lat;
    let lng = fallbackLocation.lng;

    sendDriverLocation({
      lat,
      lng,
      accuracy: 10,
      speed: 12,
      heading: 45,
      source: "demo",
    });

    demoTimer.current = setInterval(() => {
      lat += 0.00035;
      lng += 0.00025;

      sendDriverLocation({
        lat,
        lng,
        accuracy: 10,
        speed: 12,
        heading: null,
        source: "demo",
      });
    }, 3000);
  }

  function goOffline() {
    stopAlert();

    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    if (demoTimer.current) {
      clearInterval(demoTimer.current);
      demoTimer.current = null;
    }

    setOnline(false);
    setRide(null);
    setStep("waiting");
    setStatus("Offline");
  }

  async function updateRideStatus(nextStatus: string) {
    if (!ride?.rideId) return;

    try {
      const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/rides/${ride.rideId}/status`,
  {
    method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          driverId: driver.driverId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setStatus(data.message || "Unable to update ride status.");
        return;
      }

      setRide(data.ride);
    } catch (error) {
      console.error("Ride status update failed:", error);
      setStatus("Unable to update ride status.");
    }
  }

  async function acceptRide() {
    if (!ride) return;

    stopAlert();
    await updateRideStatus("accepted");

    setStatus("Ride accepted. Navigate to pickup.");
    setStep("accepted");

    socket.emit("rideAccepted", { ride, driver, driverLocation: location });
  }

  async function driverArrived() {
    await updateRideStatus("arrived");

    setStatus("Driver arrived at pickup.");
    setStep("arrived");

    socket.emit("driverArrived", { ride, driver, driverLocation: location });
  }

  async function startTrip() {
    await updateRideStatus("started");

    setStatus("Trip started. Drive safely.");
    setStep("started");

    socket.emit("tripStarted", { ride, driver, driverLocation: location });
  }

  async function completeTrip() {
    await updateRideStatus("completed");

    setStatus("Trip completed.");
    setStep("completed");

    socket.emit("tripCompleted", { ride, driver, driverLocation: location });
  }

  function declineRide() {
    stopAlert();
    setRide(null);
    setStep("waiting");
    setStatus("Online and waiting for ride requests");
  }

  const pickupText = ride?.pickup || ride?.pickupAddress || "Pending";
  const destinationText =
    ride?.destination || ride?.dropoff || ride?.dropoffAddress || "Pending";

  const riderPhoto =
    ride?.rider?.photo || "https://randomuser.me/api/portraits/men/75.jpg";

  const riderName = ride?.rider?.name || "Verified Rider";

  const riderId =
    ride?.rider?.riderId ||
    ride?.rider?.id ||
    `RIDER-${ride?.rideId || "UNKNOWN"}`;

  const navDestination = step === "started" ? destinationText : pickupText;

  const navUrl = ride
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        navDestination
      )}`
    : "#";

  function shareTrip() {
    const message = `GlideWay Driver Trip
Ride ID: ${ride?.rideId || "Pending"}
Rider ID: ${riderId}
Status: ${step}
Pickup: ${pickupText}
Destination: ${destinationText}
Driver: ${driver.name}
Vehicle: ${driver.color} ${driver.car}
Plate: ${driver.plate}`;

    navigator.clipboard?.writeText(message).catch(() => {});
    setSafetyMessage("✅ Trip details copied for safety sharing.");
  }

  function driverSOS() {
    const report = {
      rideId: ride?.rideId || "",
      type: "Driver SOS",
      driver,
      ride,
      driverLocation: location,
      time: new Date().toISOString(),
    };

    setSafetyMessage(
      "🚨 Driver SOS sent. GlideWay Safety Support would be alerted immediately."
    );
fetch(`${process.env.NEXT_PUBLIC_API_URL}/safety/report`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(report),
}).catch(() => {});
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    }).catch(() => {});
  }

  return (
    <Protected role="DRIVER">
      <DriverTopNav />

      <main style={pageStyle}>
        <section style={heroCard}>
          <p style={badge}>🚗 GlideWay Driver App</p>

          <h1 style={title}>Driver Work Dashboard</h1>

          <p style={subtitle}>
            Go online, receive ride requests, stream GPS location, manage safety,
            navigate to riders, and communicate in real time.
          </p>
        </section>

        <div style={statusPill}>
          {online ? "🟢 Online" : "⚫ Offline"} · {status}
        </div>

        {!online ? (
          <button onClick={goOnline} style={greenButton}>
            Go Online
          </button>
        ) : (
          <button onClick={goOffline} style={redButton}>
            Go Offline
          </button>
        )}

        <div style={safetyCardStyle}>
          <h2 style={sectionTitle}>🛡️ Driver Safety Center</h2>
          <p style={bodyText}>✔ Verified driver profile</p>
          <p style={bodyText}>✔ GPS stream active when online</p>
          <p style={bodyText}>✔ Rider identity visible before accepting</p>
          <p style={bodyText}>✔ Trip details available for safety sharing</p>
          <p style={bodyText}>✔ Report concerns anytime</p>

          <button onClick={driverSOS} style={sosButtonStyle}>
            🚨 Driver Emergency / SOS
          </button>

          <button onClick={shareTrip} style={blueButton}>
            📤 Share Trip Details
          </button>

          <button onClick={reportRiderIssue} style={redOutlineButton}>
            Report Rider / Trip Concern
          </button>

          {safetyMessage && <div style={noticeStyle}>{safetyMessage}</div>}
        </div>

        {location && (
          <div style={miniCard}>
            <b>GPS Stream Active</b>
            <br />
            Lat: {location.lat.toFixed(5)} · Lng: {location.lng.toFixed(5)}
            <br />
            Heading: {Math.round(location.calculatedHeading)}°
            <br />
            Accuracy:{" "}
            {location.accuracy ? `${Math.round(location.accuracy)}m` : "N/A"}
            <br />
            Source: {location.source}
          </div>
        )}

        {ride && (
          <div style={cardStyle}>
            <h2 style={sectionTitle}>🚗 Incoming Ride Request</h2>

            <div style={riderBox}>
              <img src={riderPhoto} alt="Rider Profile" style={riderPhotoStyle} />

              <div style={riderInfo}>
                <h3 style={riderNameStyle}>{riderName}</h3>
                <p style={verifiedText}>✓ Verified Rider</p>
                <p style={riderIdText}>
                  <b>Rider ID:</b> {riderId}
                </p>
              </div>
            </div>

            <div style={securityBox}>
              <b>Driver Safety Check</b>
              <p>✔ Rider picture visible</p>
              <p>✔ Rider ID shown before accepting</p>
              <p>✔ Pickup and destination visible</p>
              <p>✔ SOS and rider concern reporting enabled</p>
            </div>

            <p>
              <b>Ride ID:</b> {ride.rideId}
            </p>
            <p>
              <b>Pickup:</b> {pickupText}
            </p>
            <p>
              <b>Destination:</b> {destinationText}
            </p>
            <p>
              <b>Trip Distance:</b>{" "}
              {ride.distance || ride.distanceMiles || "Calculating"}
            </p>
            <p>
              <b>Trip ETA:</b> {ride.eta || "Calculating"}
            </p>

            <h2 style={fareText}>
              ${Number(ride.fare || ride.estimatedFare || 0).toFixed(2)}
            </h2>

            <a href={navUrl} target="_blank" style={blueButton}>
              Open Route Navigation
            </a>

            {step === "requested" && (
              <>
                <button onClick={acceptRide} style={greenButton}>
                  Accept Ride
                </button>
                <button onClick={declineRide} style={redButton}>
                  Decline
                </button>
              </>
            )}

            {step === "accepted" && (
              <button onClick={driverArrived} style={greenButton}>
                Driver Arrived
              </button>
            )}

            {step === "arrived" && (
              <button onClick={startTrip} style={greenButton}>
                Start Trip
              </button>
            )}

            {step === "started" && (
              <button onClick={completeTrip} style={greenButton}>
                Complete Trip
              </button>
            )}

            {step === "completed" && (
              <button
                onClick={() => {
                  setRide(null);
                  setStep("waiting");
                  setStatus("Online and waiting for ride requests");
                  setChatMessages([]);
                }}
                style={greenButton}
              >
                Ready for Next Ride
              </button>
            )}

            <div style={chatBox}>
              <div style={chatHeader}>💬 Message Rider</div>

              <div style={chatMessagesBox}>
                {chatMessages.length === 0 ? (
                  <p style={{ color: "#6B7280", fontSize: "14px" }}>
                    No messages yet.
                  </p>
                ) : (
                  chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        display: "flex",
                        justifyContent:
                          msg.sender === "driver" ? "flex-end" : "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "75%",
                          padding: "10px 12px",
                          borderRadius: "14px",
                          background:
                            msg.sender === "driver" ? "#57BE7D" : "#E5E7EB",
                          color: msg.sender === "driver" ? "#FFFFFF" : "#111827",
                          fontSize: "14px",
                        }}
                      >
                        <b>{msg.senderName}</b>
                        <div>{msg.text}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={chatInputRow}>
                <input
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  placeholder="Type message..."
                  style={chatInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendChatMessage();
                  }}
                />

                <button onClick={sendChatMessage} style={chatButton}>
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Protected>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#FFFFFF",
  color: "#111827",
  padding: "30px",
  fontFamily: "Arial, sans-serif",
};

const heroCard: React.CSSProperties = {
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
  lineHeight: 1.7,
};

const statusPill: React.CSSProperties = {
  padding: "14px",
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  borderRadius: "999px",
  marginTop: "12px",
  marginBottom: "16px",
  color: "#2F8F57",
  fontWeight: "900",
};

const safetyCardStyle: React.CSSProperties = {
  marginTop: "20px",
  padding: "24px",
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "20px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
};

const sectionTitle: React.CSSProperties = {
  color: "#2F8F57",
  marginTop: 0,
};

const bodyText: React.CSSProperties = {
  color: "#4B5563",
};

const miniCard: React.CSSProperties = {
  marginTop: "15px",
  padding: "16px",
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  borderRadius: "14px",
  color: "#2F8F57",
};

const cardStyle: React.CSSProperties = {
  marginTop: "25px",
  padding: "24px",
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "20px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
  color: "#111827",
};

const riderBox: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  padding: "16px",
  background: "#ECFDF3",
  borderRadius: "16px",
  border: "1px solid #57BE7D",
  marginBottom: "20px",
};

const riderPhotoStyle: React.CSSProperties = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #57BE7D",
};

const riderInfo: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const riderNameStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  color: "#111827",
};

const verifiedText: React.CSSProperties = {
  color: "#2F8F57",
  fontSize: "14px",
  margin: 0,
  fontWeight: 900,
};

const riderIdText: React.CSSProperties = {
  margin: 0,
  color: "#4B5563",
  fontSize: "14px",
};

const securityBox: React.CSSProperties = {
  padding: "14px",
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  borderRadius: "12px",
  marginBottom: "18px",
  color: "#2F8F57",
};

const fareText: React.CSSProperties = {
  color: "#57BE7D",
};

const greenButton: React.CSSProperties = {
  width: "100%",
  padding: "18px",
  marginTop: "14px",
  borderRadius: "14px",
  border: "none",
  background: "#57BE7D",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  cursor: "pointer",
  boxShadow: "0 12px 24px rgba(87, 190, 125, 0.24)",
};

const redButton: React.CSSProperties = {
  width: "100%",
  padding: "18px",
  marginTop: "14px",
  borderRadius: "14px",
  border: "none",
  background: "#EF4444",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  cursor: "pointer",
};

const sosButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "18px",
  marginTop: "14px",
  borderRadius: "14px",
  border: "none",
  background: "#DC2626",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
};

const redOutlineButton: React.CSSProperties = {
  width: "100%",
  padding: "18px",
  marginTop: "14px",
  borderRadius: "14px",
  border: "1px solid #FCA5A5",
  background: "#FEF2F2",
  color: "#DC2626",
  fontWeight: "bold",
  fontSize: "18px",
};

const blueButton: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  padding: "18px",
  marginTop: "14px",
  borderRadius: "14px",
  background: "#2563EB",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "18px",
};

const noticeStyle: React.CSSProperties = {
  marginTop: "15px",
  padding: "14px",
  background: "#ECFDF3",
  border: "1px solid #57BE7D",
  borderRadius: "12px",
  color: "#2F8F57",
  fontWeight: "bold",
};

const chatBox: React.CSSProperties = {
  marginTop: "20px",
  padding: "14px",
  borderRadius: "18px",
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
};

const chatHeader: React.CSSProperties = {
  fontWeight: "900",
  color: "#2F8F57",
  marginBottom: "10px",
};

const chatMessagesBox: React.CSSProperties = {
  minHeight: "120px",
  maxHeight: "220px",
  overflowY: "auto",
  padding: "10px",
  borderRadius: "14px",
  background: "#F9FAFB",
  border: "1px solid #E5E7EB",
};

const chatInputRow: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  marginTop: "10px",
};

const chatInput: React.CSSProperties = {
  flex: 1,
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #D1D5DB",
  color: "#111827",
  background: "#FFFFFF",
};

const chatButton: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "12px",
  border: "none",
  background: "#57BE7D",
  color: "#FFFFFF",
  fontWeight: "800",
  cursor: "pointer",
};