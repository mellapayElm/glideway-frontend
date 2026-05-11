"use client";

import DriverTopNav from "@/components/DriverTopNav";
import Protected from "@/components/Protected";

export default function DriverProfilePage() {
  return (
    <Protected role="DRIVER">
      <DriverTopNav />

      <main style={page}>
        <section style={hero}>
          <p style={badge}>👤 GlideWay Driver Profile</p>

          <h1 style={title}>Driver Account & Verification Profile</h1>

          <p style={subtitle}>
            Manage driver identity, vehicle documents, insurance, payout
            profile, ratings, and verification status.
          </p>
        </section>

        <section style={topProfileCard}>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Driver"
            style={photo}
          />

          <div>
            <h2 style={driverName}>Berhane H.</h2>

            <p style={verified}>✓ Verified GlideWay Driver</p>

            <p style={smallText}>Driver ID: driver-001</p>
            <p style={smallText}>Rating: ⭐ 4.92</p>
            <p style={smallText}>Completed Trips: 148</p>
          </div>
        </section>

        <section style={grid}>
          <ProfileCard
            title="Personal Information"
            items={[
              "Full legal name: Driver User",
              "Phone: +1 (234) 567-8910",
              "Email: driver@glideway.com",
              "Address: Add driver address",
            ]}
          />

          <ProfileCard
            title="Driver Documents"
            items={[
              "Driver photo: Uploaded",
              "Driver license: Pending verification",
              "Background check: Pending",
              "Safety training: Required",
            ]}
          />

          <ProfileCard
            title="Vehicle Information"
            items={[
              "Vehicle: Toyota Camry",
              "Color: Black",
              "Plate: GLD-2026",
              "Registration: Required",
            ]}
          />

          <ProfileCard
            title="Insurance"
            items={[
              "Insurance document: Required",
              "Renewal alerts: Enabled",
              "Compliance status: Needs review",
              "Expiration reminders: Enabled",
            ]}
          />

          <ProfileCard
            title="Bank / Payout Info"
            items={[
              "Bank account: Not connected",
              "Payout method: Weekly payout",
              "Instant cash out: Not enabled",
              "Tax profile: Pending",
            ]}
          />

          <ProfileCard
            title="Verification Status"
            items={[
              "Driver account: Active",
              "Document review: Pending",
              "Safety training: Not completed",
              "Compliance review: In progress",
            ]}
          />
        </section>
      </main>
    </Protected>
  );
}

function ProfileCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>

      {items.map((item) => (
        <p key={item} style={itemText}>
          • {item}
        </p>
      ))}

      <button style={button}>Update Information</button>
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
  lineHeight: 1.7,
};

const topProfileCard: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "24px",
  padding: "28px",
  marginBottom: "24px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
};

const photo: React.CSSProperties = {
  width: "110px",
  height: "110px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #57BE7D",
};

const driverName: React.CSSProperties = {
  margin: 0,
  fontSize: "30px",
};

const verified: React.CSSProperties = {
  color: "#2F8F57",
  fontWeight: 900,
  marginTop: "6px",
};

const smallText: React.CSSProperties = {
  color: "#6B7280",
  margin: "6px 0",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
};

const card: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 12px 26px rgba(17, 24, 39, 0.06)",
};

const cardTitle: React.CSSProperties = {
  color: "#2F8F57",
  marginTop: 0,
  marginBottom: "14px",
};

const itemText: React.CSSProperties = {
  color: "#4B5563",
  marginBottom: "8px",
  lineHeight: 1.6,
};

const button: React.CSSProperties = {
  marginTop: "18px",
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #57BE7D",
  background: "#ECFDF3",
  color: "#2F8F57",
  fontWeight: 900,
  cursor: "pointer",
};