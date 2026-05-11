import Link from "next/link";

export default function DrivePage() {
  return (
    <main style={page}>
      <section style={hero}>
        <div>
          <p style={badge}>Drive with GlideWay</p>

          <h1 style={title}>Earn on your schedule.</h1>

          <p style={subtitle}>
            Join GlideWay and help move communities safely while earning with
            flexible driving opportunities, real-time trip tools, and secure
            payout support.
          </p>

          <Link href="/driver/register" style={button}>
            Driver Registration
          </Link>
        </div>

        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Driver Registration Requirements</h2>

          <div style={benefit}>✅ Driver sign-up / register account</div>
          <div style={benefit}>✅ Full legal name</div>
          <div style={benefit}>✅ Phone and email verification</div>
          <div style={benefit}>✅ Home address</div>
          <div style={benefit}>✅ Driver’s license upload</div>
          <div style={benefit}>✅ Social Security number for verification</div>
          <div style={benefit}>✅ Background check consent</div>
          <div style={benefit}>✅ Insurance upload</div>
          <div style={benefit}>✅ Vehicle registration</div>
          <div style={benefit}>✅ Vehicle photos</div>
          <div style={benefit}>✅ Tax and payout information</div>
          <div style={benefit}>✅ Admin approval process</div>

          <Link href="/driver/register" style={buttonFull}>
            Start Driver Registration
          </Link>
        </div>
      </section>

      <section style={steps}>
        <Step
          number="1"
          title="Create Account"
          text="Register with your full legal name, phone number, and email."
        />

        <Step
          number="2"
          title="Upload Documents"
          text="Submit license, insurance, vehicle registration, and required photos."
        />

        <Step
          number="3"
          title="Background Review"
          text="Provide consent for identity verification and background screening."
        />

        <Step
          number="4"
          title="Admin Approval"
          text="GlideWay admin reviews documents before activating driver access."
        />

        <Step
          number="5"
          title="Set Up Payouts"
          text="Add tax and payout information for driver earnings."
        />

        <Step
          number="6"
          title="Start Driving"
          text="Go online, receive ride requests, and begin earning."
        />
      </section>
    </main>
  );
}

function Step({ number, title, text }: any) {
  return (
    <div style={stepCard}>
      <div style={numberStyle}>{number}</div>
      <h3>{title}</h3>
      <p style={{ color: "#4b5563", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "60px 40px",
};

const hero: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 460px",
  gap: "40px",
  alignItems: "center",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#dcfce7",
  color: "#166534",
  fontWeight: "bold",
};

const title: React.CSSProperties = {
  fontSize: "56px",
  color: "#064e3b",
  margin: "18px 0",
};

const subtitle: React.CSSProperties = {
  fontSize: "20px",
  lineHeight: 1.6,
  color: "#4b5563",
  maxWidth: "680px",
};

const button: React.CSSProperties = {
  display: "inline-block",
  marginTop: "24px",
  background: "#166534",
  color: "white",
  textDecoration: "none",
  border: "none",
  padding: "16px 22px",
  borderRadius: "14px",
  fontWeight: "800",
  cursor: "pointer",
  fontSize: "16px",
};

const buttonFull: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  marginTop: "24px",
  background: "#166534",
  color: "white",
  textDecoration: "none",
  border: "none",
  padding: "16px 22px",
  borderRadius: "14px",
  fontWeight: "800",
  cursor: "pointer",
  fontSize: "16px",
};

const card: React.CSSProperties = {
  background: "white",
  padding: "28px",
  borderRadius: "24px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
};

const benefit: React.CSSProperties = {
  padding: "13px 0",
  borderBottom: "1px solid #f1f5f9",
  fontWeight: "600",
  color: "#111827",
};

const steps: React.CSSProperties = {
  marginTop: "70px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const stepCard: React.CSSProperties = {
  background: "white",
  padding: "24px",
  borderRadius: "22px",
  border: "1px solid #e5e7eb",
};

const numberStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "#166534",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
  marginBottom: "16px",
};