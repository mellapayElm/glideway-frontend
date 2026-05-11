import Link from "next/link";

export default function PricingPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <p style={badge}>GlideWay Pricing</p>

        <h1 style={title}>Clear, fair, and rider-friendly pricing.</h1>

        <p style={subtitle}>
          GlideWay pricing is designed to be transparent for riders while also
          protecting fair driver earnings and platform sustainability.
        </p>
      </section>

      <section style={grid}>
        <Card title="Standard" price="Affordable everyday rides" items={[
          "Base fare",
          "Per-mile rate",
          "Per-minute rate",
          "Live ETA and tracking",
          "Verified driver",
        ]} />

        <Card title="Comfort" price="More space and comfort" items={[
          "Comfortable vehicles",
          "Higher driver quality standards",
          "Live trip tracking",
          "Safety features",
          "Great for longer rides",
        ]} />

        <Card title="Family" price="Family-friendly trips" items={[
          "Larger vehicle option",
          "Extra passenger space",
          "Safer pickup coordination",
          "Trip sharing",
          "Ideal for families",
        ]} />

        <Card title="Premium" price="Professional ride experience" items={[
          "Premium vehicle options",
          "Professional drivers",
          "Priority matching",
          "Smooth ride experience",
          "Enhanced comfort",
        ]} />
      </section>

      <section style={notice}>
        <h2>How fares are calculated</h2>
        <p>
          Fares may include base fare, distance, time, demand adjustments,
          airport or toll fees where applicable, taxes, and optional tips.
        </p>

        <Link href="/ride" style={button}>
          Estimate Your Ride
        </Link>
      </section>
    </main>
  );
}

function Card({ title, price, items }: any) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>
      <p style={priceText}>{price}</p>

      {items.map((item: string) => (
        <p key={item} style={itemStyle}>✅ {item}</p>
      ))}
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "60px 40px",
};

const hero: React.CSSProperties = {
  maxWidth: "900px",
  marginBottom: "40px",
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
};

const subtitle: React.CSSProperties = {
  fontSize: "20px",
  color: "#4b5563",
  lineHeight: 1.6,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
  fontSize: "26px",
};

const priceText: React.CSSProperties = {
  color: "#166534",
  fontWeight: "900",
};

const itemStyle: React.CSSProperties = {
  color: "#374151",
  fontWeight: "600",
};

const notice: React.CSSProperties = {
  marginTop: "40px",
  background: "#064e3b",
  color: "white",
  padding: "36px",
  borderRadius: "24px",
};

const button: React.CSSProperties = {
  display: "inline-block",
  marginTop: "18px",
  background: "white",
  color: "#166534",
  padding: "14px 20px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: "900",
};