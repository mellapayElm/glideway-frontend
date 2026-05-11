"use client";

export default function SupportPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <p style={badge}>GlideWay Support</p>

        <h1 style={title}>
          How can we help you today?
        </h1>

        <p style={subtitle}>
          Get support for rides, payments, safety, driver onboarding,
          account access, and technical assistance.
        </p>
      </section>

      <section style={grid}>
        <SupportCard
          title="Ride Support"
          description="Issues with active rides, pickup problems, trip updates, or driver arrival."
          email="ridesupport@glidewayride.com"
        />

        <SupportCard
          title="Payments & Refunds"
          description="Questions about receipts, charges, refunds, payouts, and billing."
          email="payments@glidewayride.com"
        />

        <SupportCard
          title="Safety Center"
          description="Report emergencies, unsafe behavior, lost items, or urgent concerns."
          email="safety@glidewayride.com"
        />

        <SupportCard
          title="Driver Support"
          description="Driver onboarding, documents, background checks, and account approval."
          email="drivers@glidewayride.com"
        />
      </section>

      <section style={bottomSection}>
        <h2 style={bottomTitle}>24/7 Support Operations</h2>

        <p style={bottomText}>
          GlideWay is committed to providing reliable customer support,
          safety operations, and real-time transportation assistance.
        </p>

        <a
          href="mailto:support@glidewayride.com"
          style={button}
        >
          Contact General Support
        </a>
      </section>
    </main>
  );
}

function SupportCard({
  title,
  description,
  email,
}: {
  title: string;
  description: string;
  email: string;
}) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>

      <p style={descriptionStyle}>{description}</p>

      <a
        href={`mailto:${email}`}
        style={cardButton}
      >
        Contact Support
      </a>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "22px",
};

const card: React.CSSProperties = {
  background: "#ffffff",
  padding: "28px",
  borderRadius: "22px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

const cardTitle: React.CSSProperties = {
  color: "#064e3b",
  marginBottom: "12px",
};

const descriptionStyle: React.CSSProperties = {
  color: "#4b5563",
  lineHeight: 1.7,
};

const cardButton: React.CSSProperties = {
  marginTop: "18px",
  padding: "12px 18px",
  borderRadius: "12px",
  background: "#166534",
  color: "#ffffff",
  fontWeight: "800",
  textDecoration: "none",
  display: "inline-block",
};

const bottomSection: React.CSSProperties = {
  marginTop: "50px",
  background: "#064e3b",
  color: "#ffffff",
  padding: "40px",
  borderRadius: "24px",
};

const bottomTitle: React.CSSProperties = {
  fontSize: "34px",
  marginTop: 0,
};

const bottomText: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: 1.7,
};

const button: React.CSSProperties = {
  marginTop: "20px",
  padding: "16px 22px",
  borderRadius: "14px",
  background: "#ffffff",
  color: "#166534",
  fontWeight: "900",
  fontSize: "16px",
  textDecoration: "none",
  display: "inline-block",
};