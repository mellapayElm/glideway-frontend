import Link from "next/link";

export default function AboutPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <p style={badge}>About GlideWay</p>

        <h1 style={title}>A modern ride platform built for safety, trust, and smooth mobility.</h1>

        <p style={subtitle}>
          GlideWay is being built to connect riders and drivers through a reliable,
          transparent, and community-centered transportation platform.
        </p>

        <Link href="/ride" style={button}>
          Request a Ride
        </Link>
      </section>

      <section style={grid}>
        <Card
          title="Our Mission"
          text="To provide safe, smooth, and dependable rides while supporting drivers with fair tools, clear earnings, and reliable operations."
        />

        <Card
          title="Our Vision"
          text="To become a trusted mobility platform that helps families, workers, students, visitors, and communities move with confidence."
        />

        <Card
          title="Our Values"
          text="Safety, reliability, fairness, service, transparency, respect, and operational excellence guide how GlideWay is being built."
        />

        <Card
          title="Our Technology"
          text="GlideWay includes live maps, driver tracking, rider-driver communication, safety tools, admin dashboards, payouts, and financial monitoring."
        />
      </section>

      <section style={story}>
        <h2>Why GlideWay?</h2>
        <p>
          Transportation should feel simple, safe, and peaceful. GlideWay is designed
          to create a smooth experience for riders while giving drivers the tools
          they need to serve well and earn confidently.
        </p>
      </section>
    </main>
  );
}

function Card({ title, text }: any) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>
      <p style={cardText}>{text}</p>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "60px 40px",
  color: "#111827",
};

const hero: React.CSSProperties = {
  maxWidth: "980px",
  marginBottom: "42px",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "bold",
};

const title: React.CSSProperties = {
  fontSize: "52px",
  color: "#064e3b",
  margin: "18px 0",
  lineHeight: 1.1,
};

const subtitle: React.CSSProperties = {
  fontSize: "20px",
  color: "#4b5563",
  lineHeight: 1.6,
  maxWidth: "820px",
};

const button: React.CSSProperties = {
  display: "inline-block",
  marginTop: "22px",
  background: "#166534",
  color: "white",
  padding: "14px 20px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: "900",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "22px",
};

const card: React.CSSProperties = {
  background: "white",
  padding: "26px",
  borderRadius: "22px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

const cardTitle: React.CSSProperties = {
  color: "#064e3b",
  marginTop: 0,
};

const cardText: React.CSSProperties = {
  color: "#4b5563",
  lineHeight: 1.6,
};

const story: React.CSSProperties = {
  marginTop: "42px",
  background: "#064e3b",
  color: "white",
  padding: "36px",
  borderRadius: "24px",
  lineHeight: 1.7,
  fontSize: "18px",
};