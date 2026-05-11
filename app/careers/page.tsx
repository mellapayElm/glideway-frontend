"use client";

export default function CareersPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <p style={badge}>GlideWay Careers</p>

        <h1 style={title}>
          Build the future of transportation with GlideWay.
        </h1>

        <p style={subtitle}>
          GlideWay is building modern mobility technology focused on safety,
          reliability, mapping, operations, payments, and real-time
          rider-driver experiences.
        </p>
      </section>

      <section style={grid}>
        <JobCard
          title="Frontend Engineer"
          location="Remote / Hybrid"
          description="Build rider, driver, and admin interfaces using Next.js and real-time systems."
        />

        <JobCard
          title="Backend Engineer"
          location="Remote / Hybrid"
          description="Develop APIs, sockets, payments, trip systems, and operational services."
        />

        <JobCard
          title="Operations Coordinator"
          location="United States"
          description="Support dispatch operations, onboarding, compliance, and driver support."
        />

        <JobCard
          title="Safety & Compliance Specialist"
          location="United States"
          description="Assist with safety reviews, incident reporting, and driver verification systems."
        />
      </section>

      <section style={applySection}>
        <h2 style={applyTitle}>
          Why work with GlideWay?
        </h2>

        <p style={applyText}>
          We are building a transportation platform focused on innovation,
          safety, operational excellence, customer service, and modern mobility
          technology.
        </p>

        <a
          href="mailto:careers@glidewayride.com?subject=Future GlideWay Application"
          style={button}
        >
          Submit Future Application
        </a>
      </section>
    </main>
  );
}

function JobCard({
  title,
  location,
  description,
}: {
  title: string;
  location: string;
  description: string;
}) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>

      <p style={locationStyle}>{location}</p>

      <p style={descriptionStyle}>{description}</p>

      <a
        href="mailto:careers@glidewayride.com?subject=GlideWay Career Application"
        style={applyButton}
      >
        Apply Now
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
  lineHeight: 1.1,
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
  marginBottom: "10px",
};

const locationStyle: React.CSSProperties = {
  color: "#166534",
  fontWeight: "800",
  marginBottom: "10px",
};

const descriptionStyle: React.CSSProperties = {
  color: "#4b5563",
  lineHeight: 1.7,
};

const applyButton: React.CSSProperties = {
  marginTop: "18px",
  padding: "12px 18px",
  borderRadius: "12px",
  background: "#166534",
  color: "#ffffff",
  fontWeight: "800",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const applySection: React.CSSProperties = {
  marginTop: "44px",
  background: "#064e3b",
  color: "#ffffff",
  padding: "36px",
  borderRadius: "24px",
};

const applyTitle: React.CSSProperties = {
  marginTop: 0,
  fontSize: "34px",
};

const applyText: React.CSSProperties = {
  lineHeight: 1.7,
  fontSize: "18px",
};

const button: React.CSSProperties = {
  marginTop: "20px",
  padding: "16px 22px",
  borderRadius: "14px",
  background: "#ffffff",
  color: "#166534",
  fontWeight: "900",
  fontSize: "16px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};