export default function TermsPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <p style={badge}>Glideway LLC Legal</p>

        <h1 style={title}>Terms & Conditions</h1>

        <p style={subtitle}>
          Ride Smoothly, Glide Easily. Experience premium rides with real-time
          tracking, secure payments, and professional drivers.
        </p>

        <p style={effective}>
          Effective Date: [Insert Date] · Company: Glideway LLC
        </p>
      </section>

      <section style={card}>
        <Section title="Our Mission">
          To deliver safe, smooth, transparent, and customer-centered
          transportation by combining intelligent technology, reliable service,
          secure communication, and honest support at every step of your ride
          experience.
        </Section>

        <Section title="Our Vision">
          Our vision is to become the most trusted modern ride platform, known
          for excellent customer service, informed digital booking, high driver
          quality, secure payments, and effortless travel that feels personal,
          professional, and reassuring.
        </Section>

        <Section title="Purpose of These Terms">
          These Terms & Conditions explain how Glideway operates and the rules
          that ensure every user, both riders and drivers, enjoys a reliable,
          respectful, and lawful experience. By using any Glideway app, website,
          or service, you agree to follow these Terms.
        </Section>

        <Section title="Use of Glideway Services">
          You agree to use Glideway honestly, safely, and for lawful
          transportation purposes only. This includes providing accurate
          information, respecting drivers and riders, and not using the service
          for illegal, discriminatory, or harmful purposes.
        </Section>

        <Section title="Eligibility">
          You must be at least 18 years old to create an account or request a
          ride. Drivers must meet local licensing, insurance, background check,
          and vehicle safety requirements.
        </Section>

        <Section title="Your Account and Responsibilities">
          You are responsible for keeping your login information secure,
          maintaining valid payment information, and reporting unauthorized
          account access or suspicious activity right away.
        </Section>

        <Section title="Ride Experience & Conduct">
          Riders and drivers are expected to treat one another with courtesy,
          patience, and respect. Harassment, discrimination, violence, unsafe
          conduct, or intentional property damage may lead to account suspension
          or permanent removal from Glideway.
        </Section>

        <Section title="Real-Time Tracking & Safety">
          Glideway uses real-time GPS tracking, driver profiles, vehicle
          details, ride history, and safety tools to support transparency,
          protection, and peace of mind throughout the ride experience.
        </Section>

        <Section title="Payments and Pricing">
          Fares are shown before confirming a ride. Payments are processed
          through secure systems. Pricing may include distance, time, demand,
          route conditions, taxes, applicable fees, and optional tips. By booking
          a ride, you authorize Glideway to charge your selected payment method.
        </Section>

        <Section title="Refunds and Adjustments">
          Refunds or fare adjustments, when applicable, are handled through our
          support process in a respectful and fair manner.
        </Section>

        <Section title="Privacy and Data Protection">
          Your trust matters. Glideway collects and uses data such as trip
          history, location, contact details, and account information only as
          needed to operate and improve services. Glideway does not sell your
          personal data.
        </Section>

        <Section title="Limitation of Liability">
          Glideway works to provide safe and reliable service, but technology,
          traffic, weather, driver availability, and other factors may cause
          delays or disruptions. To the fullest extent permitted by law,
          Glideway is not liable for indirect or incidental damages, and total
          liability for direct loss is limited to the amount paid for the
          specific ride in question.
        </Section>

        <Section title="Third-Party Links and Services">
          Glideway may use maps, payment gateways, communication tools, or other
          third-party services. Glideway is not responsible for the content,
          terms, privacy practices, or operations of those external platforms.
        </Section>

        <Section title="Updates and Modifications">
          Glideway may update these Terms as services, features, pricing, or
          policies change. The updated version will appear on this page with a
          revised effective date. Continued use of Glideway means you accept the
          latest Terms.
        </Section>

        <Section title="Governing Law">
          These Terms are governed by the laws of the State of California and
          the State of Colorado, without regard to conflict of law principles.
          Any dispute related to these Terms should be handled in good faith
          before formal legal action.
        </Section>

        <Section title="Contact and Support">
          We believe communication builds trust. For questions, feedback, or
          support, contact Glideway LLC at contact@glideway.com. Business
          address will be added before public launch.
        </Section>

        <Section title="Our Promise in Simple Words">
          Glideway stands for safety, integrity, respect, and transparency. We
          strive to make every ride simple and smooth, not only through
          technology, but through genuine care for riders, drivers, and the
          communities we serve.
        </Section>

        <div style={notice}>
          <b>Important Notice:</b> This Terms & Conditions page is a professional
          website draft. Before public launch, Glideway LLC should have a
          qualified attorney review the final Terms, Privacy Policy, insurance
          requirements, transportation regulations, and compliance obligations.
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: any) {
  return (
    <div style={section}>
      <h2 style={sectionTitle}>{title}</h2>
      <p style={text}>{children}</p>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "60px 40px",
};

const hero: React.CSSProperties = {
  maxWidth: "980px",
  marginBottom: "36px",
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

const effective: React.CSSProperties = {
  color: "#166534",
  fontWeight: "800",
};

const card: React.CSSProperties = {
  background: "#ffffff",
  padding: "34px",
  borderRadius: "24px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  maxWidth: "1050px",
};

const section: React.CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  padding: "22px 0",
};

const sectionTitle: React.CSSProperties = {
  color: "#064e3b",
  marginBottom: "8px",
};

const text: React.CSSProperties = {
  color: "#4b5563",
  lineHeight: 1.85,
  fontSize: "17px",
};

const notice: React.CSSProperties = {
  marginTop: "28px",
  padding: "20px",
  borderRadius: "16px",
  background: "#fefce8",
  color: "#713f12",
  border: "1px solid #fde68a",
  lineHeight: 1.7,
};