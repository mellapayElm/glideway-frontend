export default function ContactPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <p style={badge}>Contact GlideWay</p>

        <h1 style={title}>We are here to help.</h1>

        <p style={subtitle}>
          Contact GlideWay Support for rider assistance, driver support,
          business partnerships, safety concerns, or general questions.
        </p>
      </section>

      <section style={grid}>
        <div style={card}>
          <h2 style={cardTitle}>General Support</h2>

          <p style={text}>
            Email: support@glidewayride.com
          </p>

          <p style={text}>
            Rider Support: 24/7 assistance available
          </p>

          <p style={text}>
            Driver Operations Support
          </p>

          <p style={text}>
            Safety & Incident Reporting
          </p>
        </div>

        <div style={card}>
          <h2 style={cardTitle}>Business & Partnerships</h2>

          <p style={text}>
            Business Accounts
          </p>

          <p style={text}>
            Fleet Partnerships
          </p>

          <p style={text}>
            City & Transportation Partnerships
          </p>

          <p style={text}>
            Enterprise Mobility Solutions
          </p>
        </div>
      </section>

      <section style={formCard}>
        <h2 style={formTitle}>Send us a message</h2>

        <input style={input} placeholder="Full name" />
        <input style={input} placeholder="Email address" />
        <input style={input} placeholder="Phone number" />

        <select style={input}>
          <option>General Question</option>
          <option>Rider Support</option>
          <option>Driver Support</option>
          <option>Safety Concern</option>
          <option>Business Partnership</option>
        </select>

        <textarea
          style={textarea}
          placeholder="Type your message here..."
        />

        <button style={button}>
          Send Message
        </button>
      </section>
    </main>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "22px",
};

const card: React.CSSProperties = {
  background: "white",
  padding: "28px",
  borderRadius: "22px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

const cardTitle: React.CSSProperties = {
  color: "#064e3b",
  marginTop: 0,
};

const text: React.CSSProperties = {
  color: "#4b5563",
  fontWeight: "600",
  lineHeight: 1.8,
};

const formCard: React.CSSProperties = {
  marginTop: "40px",
  background: "white",
  padding: "32px",
  borderRadius: "24px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  maxWidth: "800px",
};

const formTitle: React.CSSProperties = {
  color: "#064e3b",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  color: "#111827",
  background: "#ffffff",
  fontWeight: "600",
};
const textarea: React.CSSProperties = {
  width: "100%",
  minHeight: "160px",
  padding: "14px",
  marginTop: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  color: "#111827",
  background: "#ffffff",
  fontWeight: "600",
  resize: "vertical",
};

const button: React.CSSProperties = {
  marginTop: "20px",
  padding: "16px 24px",
  borderRadius: "14px",
  border: "none",
  background: "#166534",
  color: "#ffffff",
  fontWeight: "900",
  fontSize: "18px",
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(22,101,52,0.25)",
};