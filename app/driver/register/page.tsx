export default function DriverRegisterPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <p style={badge}>Driver Registration</p>

        <h1 style={title}>Start your GlideWay driver application</h1>

        <p style={subtitle}>
          Complete your driver profile, upload required documents, verify your
          identity, and submit your application for admin approval.
        </p>
      </section>

      <section style={grid}>
        <Card title="Personal Information">
          <Item>Full legal name</Item>
          <Item>Phone number verification</Item>
          <Item>Email verification</Item>
          <Item>Home address</Item>
        </Card>

        <Card title="Driver Verification">
          <Item>Driver’s license upload</Item>
          <Item>Social Security number for verification</Item>
          <Item>Background check consent</Item>
          <Item>Identity review</Item>
        </Card>

        <Card title="Vehicle Documents">
          <Item>Insurance upload</Item>
          <Item>Vehicle registration</Item>
          <Item>Vehicle photos</Item>
          <Item>Plate and vehicle details</Item>
        </Card>

        <Card title="Payments & Approval">
          <Item>Tax information</Item>
          <Item>Payout information</Item>
          <Item>Admin document review</Item>
          <Item>Driver activation approval</Item>
        </Card>
      </section>

      <section style={formCard}>
        <h2>Driver Application Form</h2>

        <input style={input} placeholder="Full legal name" />
        <input style={input} placeholder="Phone number" />
        <input style={input} placeholder="Email address" />
        <input style={input} placeholder="Home address" />
        <input style={input} placeholder="Driver license number" />
        <input style={input} placeholder="Vehicle make and model" />
        <input style={input} placeholder="Vehicle plate number" />

        <button style={button}>Submit Driver Application</button>

        <p style={note}>
          File uploads, SSN verification, background check, and payout setup
          will be connected to secure production services before launch.
        </p>
      </section>
    </main>
  );
}

function Card({ title, children }: any) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>
      {children}
    </div>
  );
}

function Item({ children }: any) {
  return <p style={item}>✅ {children}</p>;
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "60px 40px",
  color: "#111827",
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
  fontSize: "50px",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
};

const card: React.CSSProperties = {
  background: "white",
  padding: "24px",
  borderRadius: "22px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

const cardTitle: React.CSSProperties = {
  color: "#064e3b",
  marginTop: 0,
};

const item: React.CSSProperties = {
  color: "#374151",
  fontWeight: "600",
};

const formCard: React.CSSProperties = {
  marginTop: "40px",
  background: "white",
  padding: "30px",
  borderRadius: "24px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
  maxWidth: "760px",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
};

const button: React.CSSProperties = {
  width: "100%",
  marginTop: "20px",
  padding: "16px",
  borderRadius: "14px",
  border: "none",
  background: "#166534",
  color: "white",
  fontWeight: "900",
  fontSize: "16px",
  cursor: "pointer",
};

const note: React.CSSProperties = {
  marginTop: "16px",
  color: "#6b7280",
  lineHeight: 1.6,
};