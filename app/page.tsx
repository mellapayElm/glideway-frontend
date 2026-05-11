import type { CSSProperties } from "react";
import Link from "next/link";
import LiveRideTracking from "../components/LiveRideTracking";
export default function HomePage() {
  return (
    <main style={page}>
      {/* HERO */}
      <section style={hero}>
        <div style={badge}>● Premium Ride Service ✨</div>

        <h1 style={heroTitle}>
          Ride Smoothly,
          <br />
          <span style={greenText}>Glide Easily</span>
        </h1>

        <p style={heroSubtitle}>
          Experience premium rides with real-time tracking, secure payments,
          and professional drivers. Your journey starts with a single tap.
        </p>

        <p style={smallText}>
          Elegant mobility. Trusted service.{" "}
          <b style={greenText}>Premium experience.</b>
        </p>

        <div style={buttonRow}>
          <Link href="/ride" style={primaryButton}>
            🚘 Book a Ride →
          </Link>

          <Link href="/drive" style={secondaryButton}>
            ♙ Become a Driver
          </Link>
        </div>
      </section>

      {/* MISSION */}
      <section style={section}>
        <h2 style={sectionTitle}>
          Our <span style={greenText}>Mission & Vision</span>
        </h2>

        <p style={sectionSubtitle}>
          Building the future of transportation with safety, transparency, and
          excellence at every step.
        </p>

        <div style={twoGrid}>
          <InfoCard
            title="GlideWay Mission"
            text="GlideWay delivers safe, smooth, transparent, and customer-centered transportation through dependable technology and professional service."
          />

          <InfoCard
            title="GlideWay Vision"
            text="To become a trusted modern ride platform known for excellent service, secure payments, quality drivers, and smooth travel experiences."
          />
        </div>

        <div style={miniGrid}>
          <MiniCard title="Safety First" text="Your safety is our priority." />
          <MiniCard title="Customer Care" text="Dedicated support and service." />
          <MiniCard title="Efficiency" text="Fast and reliable rides." />
          <MiniCard title="Community" text="Building trusted connections." />
        </div>
      </section>

      {/* FARE ESTIMATE */}
      <section style={section}>
        <h2 style={sectionTitle}>
          What will your <span style={greenText}>GlideWay</span> ride cost?
        </h2>

        <p style={sectionSubtitle}>
          Plan your next trip with a simple fare preview before you confirm your
          ride.
        </p>

        <div style={twoGrid}>
          <div style={card}>
            <h3 style={cardHeading}>🗺️ Google Maps Fare Estimate Calculator</h3>

            <p style={muted}>
              Enter your pickup and drop-off locations to preview live ride
              pricing and nearby GlideWay ride options.
            </p>

            <input style={input} placeholder="📍 Enter pickup location" />
            <input style={input} placeholder="📌 Enter drop-off location" />

            <RideType name="Economy" price="$12–15" note="Affordable daily rides" />

            <RideType
              name="Comfort"
              price="$18–22"
              note="Extra space & comfort"
              active
            />

            <RideType name="Premium" price="$35–45" note="Luxury experience" />
            <RideType name="XL" price="$25–30" note="Groups & luggage" />

            <Link href="/ride" style={fullButton}>
              Get Fare Estimate →
            </Link>
          </div>

          <div style={card}>
            <h3 style={cardHeading}>Book your ride in seconds</h3>

            <p style={muted}>
              Easy booking with live estimates, premium ride choices, and secure
              checkout.
            </p>

            <Step text="Enter pickup and drop-off locations" />
            <Step text="Choose your preferred ride type" />
            <Step text="See transparent pricing upfront" />
            <Step text="Confirm with secure payment" />

            <div style={iconGrid}>
              <div style={miniGrid}>
  <MiniCard
    title="Fast Pickup"
    text="Nearby drivers arrive quickly."
  />

  <MiniCard
    title="Real-Time Tracking"
    text="Track every ride live."
  />

  <MiniCard
    title="Trusted Drivers"
    text="Verified professional drivers."
  />

  <MiniCard
    title="Transparent Pricing"
    text="No hidden surprise fees."
  />
</div>
              <SmallFeature text="Secure Payment" />
              <SmallFeature text="Live GPS" />
              <SmallFeature text="24/7 Support" />
            </div>
          </div>
        </div>
      </section>

       {/* LIVE TRACKING */}
      <LiveRideTracking />

      {/* WHY CHOOSE */}
      <section style={section}>
        <h2 style={sectionTitle}>
          Why Choose <span style={greenText}>GlideWay?</span>
        </h2>

        <p style={sectionSubtitle}>
          Built around four core pillars — every decision we make starts here.
        </p>

        <div style={fourGrid}>
          <Feature
            title="Comfort"
            text="Clean, comfortable rides with professional drivers."
          />

          <Feature
            title="Safety"
            text="Verified drivers, live tracking, and secure communication."
          />

          <Feature
            title="Efficiency"
            text="Smart dispatch, nearby matching, and fast ETAs."
          />

          <Feature
            title="Trust"
            text="Transparent pricing and reliable customer support."
          />
        </div>

        <div style={ctaStrip}>
          <div>
            <h2>Ready to experience the difference?</h2>
            <p>Join happy riders and start your first GlideWay trip today.</p>
          </div>

          <Link href="/ride" style={primaryButton}>
            Book Your First Ride
          </Link>
        </div>
      </section>
{/* WHY GLIDEWAY IS BETTER */}
<section style={section}>
  <div style={premiumBanner}>
    <div style={bannerBadge}>🚘 Driver-First • Rider-Friendly • Transparent</div>

    <h2 style={premiumTitle}>
      Why <span style={greenText}>GlideWay</span> Is Better
      <br />
      for Drivers and Riders
    </h2>

    <p style={premiumSubtitle}>
      GlideWay is built for fair pricing, better driver pay, smarter rides,
      transparent earnings, and safer transportation.
    </p>
  </div>

  <div style={twoGrid}>
    <div style={highlightCard}>
      <h3>⚠️ The Industry Problem</h3>
      <p>
        Many ride-share drivers feel frustrated because large platforms may take
        30%–50% of the total fare, and in some cases even more. Drivers can be
        left with only a small portion after fuel, insurance, maintenance, and
        vehicle wear.
      </p>
    </div>

    <div style={highlightCardGreen}>
      <h3>✅ GlideWay’s Better Model</h3>
      <p>
        GlideWay is designed to create a healthier balance between riders,
        drivers, and the platform through fair driver compensation, transparent
        pricing, sustainable growth, and smarter technology.
      </p>
    </div>
  </div>

  <div style={fourGrid}>
    <Feature
      title="Fair Driver Pay"
      text="Clear earnings, fair payout protection, and minimum payout guardrails before accepting rides."
    />

    <Feature
      title="Smarter Pricing"
      text="Pricing considers distance, time, traffic, demand, fuel, tolls, airport zones, and platform costs."
    />

    <Feature
      title="Lower Rider Cost"
      text="GlideWay can aim to stay 2%–3% lower than major competitors while still protecting drivers."
    />

    <Feature
      title="Full Transparency"
      text="Drivers see estimated payout, pickup distance, trip time, route preview, and bonuses upfront."
    />
  </div>

  <div style={twoGrid}>
    <div style={colorCardBlue}>
      <h3>🧠 Smart Driver Matching</h3>
      <p>
        GlideWay selects the best qualified driver using distance, rating,
        online status, vehicle type, safety compliance, acceptance rate, traffic,
        and estimated arrival time.
      </p>
    </div>

    <div style={colorCardPurple}>
      <h3>🔔 Powerful Driver Alert System</h3>
      <p>
        Drivers receive a loud ride alarm, vibration alert, full-screen request,
        pickup location, fare estimate, payout preview, navigation preview,
        countdown timer, and Accept or Decline buttons.
      </p>
    </div>
  </div>

  <div style={fourGrid}>
    <Feature
      title="Live GPS Mapping"
      text="Real-time driver tracking, route optimization, ETA prediction, traffic monitoring, and toll detection."
    />

    <Feature
      title="Driver Dashboard"
      text="Total earnings, today earnings, weekly earnings, completed trips, payout balance, and cash out."
    />

    <Feature
      title="Rider Safety"
      text="Driver profile, vehicle details, license plate, live tracking, emergency support, and trip sharing."
    />

    <Feature
      title="Modern Technology"
      text="Smart dispatch, dynamic pricing, secure payments, AI-assisted routing, and scalable app architecture."
    />
  </div>

  <div style={finalSummaryCard}>
    <h2>GlideWay: Ride Smart. Arrive Easy.</h2>
    <p>
      Unlike systems that maximize company fees at the expense of drivers,
      GlideWay aims to build a fairer transportation ecosystem where drivers
      earn more fairly, riders receive reasonable pricing, trips are safer and
      faster, and the platform remains sustainable long-term.
    </p>

    <Link href="/drive" style={primaryButton}>
      Drive with GlideWay →
    </Link>
  </div>
</section>
      {/* FOOTER */}
      <footer style={footer}>
        <div>
          <h2 style={footerLogo}>GlideWay</h2>

          <p style={footerText}>
            Premium transportation built around comfort, safety, efficiency, and
            trust.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <FooterLink href="/" text="Home" />
          <FooterLink href="/ride" text="Book a Ride" />
          <FooterLink href="/drive" text="Drive with Us" />
          <FooterLink href="/support" text="Support" />
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: support@glidewayride.com</p>
          <p>Phone: +1 (800) 123-4567</p>
          <p>Headquarters: Los Angeles, CA</p>
        </div>
      </footer>
    </main>
  );
}

/* COMPONENTS */

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div style={card}>
      <h3 style={cardTitle}>{title}</h3>
      <p style={muted}>{text}</p>
    </div>
  );
}

function MiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div style={miniCard}>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div style={featureCard}>
      <div style={featureIcon}>☘</div>
      <h3>{title}</h3>
      <p style={muted}>{text}</p>
    </div>
  );
}

function RideType({
  name,
  price,
  note,
  active,
}: {
  name: string;
  price: string;
  note: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        ...rideType,
        borderColor: active ? "#57bd7c" : "#e5e7eb",
        background: active ? "#f0fdf4" : "#ffffff",
      }}
    >
      <div>
        <b>{name}</b>
        <p style={tiny}>{note}</p>
      </div>

      <b>{price}</b>
    </div>
  );
}

function Step({ text }: { text: string }) {
  return <p style={step}>✅ {text}</p>;
}

function SmallFeature({ text }: { text: string }) {
  return <div style={smallFeature}>{text}</div>;
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} style={footerLink}>
      {text}
    </Link>
  );
}

/* STYLES */

const page: CSSProperties = {
  minHeight: "100vh",
  background: "#f8fafc",
  color: "#111827",
  fontFamily: "Arial, sans-serif",
};

const hero: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "80px 24px",
};

const badge: CSSProperties = {
  padding: "12px 24px",
  borderRadius: "999px",
  background: "#ecfdf5",
  border: "1px solid #bbf7d0",
  color: "#166534",
  fontWeight: 800,
  marginBottom: "30px",
};

const heroTitle: CSSProperties = {
  fontSize: "88px",
  lineHeight: 1.05,
  fontWeight: 900,
  margin: 0,
  letterSpacing: "-3px",
};

const greenText: CSSProperties = {
  color: "#57bd7c",
};

const heroSubtitle: CSSProperties = {
  maxWidth: "760px",
  fontSize: "22px",
  lineHeight: 1.6,
  color: "#6b7280",
  marginTop: "24px",
};

const smallText: CSSProperties = {
  marginTop: "30px",
  color: "#9ca3af",
  fontWeight: 800,
};

const buttonRow: CSSProperties = {
  display: "flex",
  gap: "18px",
  marginTop: "44px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const primaryButton: CSSProperties = {
  background: "#57bd7c",
  color: "white",
  padding: "18px 30px",
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: "18px",
  boxShadow: "0 14px 30px rgba(87,189,124,0.28)",
};

const secondaryButton: CSSProperties = {
  background: "white",
  color: "#166534",
  padding: "18px 30px",
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: "18px",
  border: "1px solid #bbf7d0",
};

const section: CSSProperties = {
  padding: "90px 38px",
};

const sectionTitle: CSSProperties = {
  fontSize: "44px",
  textAlign: "center",
  margin: 0,
};

const sectionSubtitle: CSSProperties = {
  textAlign: "center",
  color: "#6b7280",
  maxWidth: "760px",
  margin: "18px auto 50px",
  lineHeight: 1.7,
  fontSize: "18px",
};

const twoGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "28px",
};

const fourGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "24px",
};

const miniGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  marginTop: "24px",
};

const card: CSSProperties = {
  background: "white",
  borderRadius: "24px",
  padding: "30px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 34px rgba(0,0,0,0.05)",
};

const cardTitle: CSSProperties = {
  color: "#166534",
  marginTop: 0,
};

const cardHeading: CSSProperties = {
  fontSize: "24px",
  fontWeight: 900,
  marginBottom: "12px",
};

const muted: CSSProperties = {
  color: "#4b5563",
  lineHeight: 1.7,
};

const miniCard: CSSProperties = {
  background: "white",
  borderRadius: "18px",
  padding: "20px",
  border: "1px solid #e5e7eb",
  textAlign: "center",
};

const input: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "15px",
  marginTop: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  fontWeight: 700,
};

const rideType: CSSProperties = {
  marginTop: "12px",
  padding: "16px",
  borderRadius: "16px",
  border: "2px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const tiny: CSSProperties = {
  fontSize: "13px",
  color: "#6b7280",
  marginTop: "4px",
};

const fullButton: CSSProperties = {
  display: "block",
  textAlign: "center",
  marginTop: "22px",
  padding: "16px",
  borderRadius: "16px",
  background: "#57bd7c",
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
};

const iconGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  marginTop: "24px",
};

const smallFeature: CSSProperties = {
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #bbf7d0",
  textAlign: "center",
  fontWeight: 800,
  color: "#166534",
};

const step: CSSProperties = {
  fontWeight: 600,
  lineHeight: 1.8,
};

const darkSection: CSSProperties = {
  padding: "90px 38px",
  background: "#111827",
  color: "white",
};

const darkTitle: CSSProperties = {
  textAlign: "center",
  fontSize: "44px",
  margin: 0,
};

const darkSubtitle: CSSProperties = {
  textAlign: "center",
  color: "#cbd5e1",
  marginBottom: "50px",
};

const trackingGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
};

const mapMock: CSSProperties = {
  background: "#1f2937",
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid #374151",
};

const mapHeader: CSSProperties = {
  padding: "18px",
  borderBottom: "1px solid #374151",
  fontWeight: 900,
};

const live: CSSProperties = {
  float: "right",
  color: "#57bd7c",
};

const mapBody: CSSProperties = {
  position: "relative",
  height: "320px",
};

const routeLine: CSSProperties = {
  position: "absolute",
  top: "150px",
  left: "120px",
  width: "340px",
  height: "6px",
  background: "#57bd7c",
  transform: "rotate(25deg)",
  borderRadius: "999px",
};

const pickupDot: CSSProperties = {
  position: "absolute",
  top: "120px",
  left: "110px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "#57bd7c",
};

const dropoffDot: CSSProperties = {
  position: "absolute",
  top: "250px",
  right: "120px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "#ef4444",
};

const driverDot: CSSProperties = {
  position: "absolute",
  top: "185px",
  left: "320px",
  fontSize: "34px",
};

const mapFooter: CSSProperties = {
  padding: "18px",
  borderTop: "1px solid #374151",
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  flexWrap: "wrap",
};

const authorized: CSSProperties = {
  background: "rgba(87,189,124,0.25)",
  color: "#86efac",
  padding: "8px 16px",
  borderRadius: "12px",
  fontWeight: 900,
};

const sideStack: CSSProperties = {
  display: "grid",
  gap: "18px",
};

const darkCard: CSSProperties = {
  background: "#1f2937",
  borderRadius: "18px",
  padding: "22px",
  border: "1px solid #374151",
};

const darkMuted: CSSProperties = {
  color: "#cbd5e1",
};

const bubbleLeft: CSSProperties = {
  background: "#374151",
  padding: "10px",
  borderRadius: "12px",
  width: "fit-content",
};

const bubbleRight: CSSProperties = {
  background: "#57bd7c",
  padding: "10px",
  borderRadius: "12px",
  width: "fit-content",
  marginLeft: "auto",
};

const greenMiniButton: CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  background: "#57bd7c",
  color: "white",
  border: "none",
  fontWeight: 900,
  cursor: "pointer",
};

const featureCard: CSSProperties = {
  background: "white",
  borderRadius: "24px",
  padding: "30px",
  border: "1px solid #e5e7eb",
};

const featureIcon: CSSProperties = {
  width: "56px",
  height: "56px",
  borderRadius: "16px",
  background: "#ecfdf5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "18px",
};

const ctaStrip: CSSProperties = {
  marginTop: "60px",
  padding: "32px",
  borderRadius: "24px",
  background: "#f0fdf4",
  border: "1px solid #bbf7d0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const footer: CSSProperties = {
  padding: "60px 50px",
  background: "white",
  borderTop: "1px solid #e5e7eb",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "40px",
};

const footerLogo: CSSProperties = {
  fontSize: "32px",
  color: "#166534",
};

const footerText: CSSProperties = {
  color: "#4b5563",
  lineHeight: 1.7,
};

const footerLink: CSSProperties = {
  display: "block",
  marginBottom: "14px",
  textDecoration: "none",
  color: "#4b5563",
  fontWeight: 700,
};
const premiumBanner: CSSProperties = {
  textAlign: "center",
  padding: "60px 30px",
  borderRadius: "32px",
  background:
    "linear-gradient(135deg, #052e16, #166534, #57bd7c)",
  color: "white",
  marginBottom: "34px",
  boxShadow: "0 24px 60px rgba(22,101,52,0.28)",
};

const bannerBadge: CSSProperties = {
  display: "inline-block",
  padding: "10px 18px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.35)",
  fontWeight: 900,
  marginBottom: "18px",
};

const premiumTitle: CSSProperties = {
  fontSize: "52px",
  lineHeight: 1.1,
  margin: 0,
  fontWeight: 900,
};

const premiumSubtitle: CSSProperties = {
  maxWidth: "820px",
  margin: "22px auto 0",
  fontSize: "20px",
  lineHeight: 1.7,
  color: "#ecfdf5",
};

const highlightCard: CSSProperties = {
  background: "linear-gradient(135deg, #fff7ed, #ffffff)",
  border: "1px solid #fed7aa",
  borderRadius: "26px",
  padding: "30px",
  boxShadow: "0 14px 34px rgba(0,0,0,0.06)",
};

const highlightCardGreen: CSSProperties = {
  background: "linear-gradient(135deg, #ecfdf5, #ffffff)",
  border: "1px solid #bbf7d0",
  borderRadius: "26px",
  padding: "30px",
  boxShadow: "0 14px 34px rgba(0,0,0,0.06)",
};

const colorCardBlue: CSSProperties = {
  background: "linear-gradient(135deg, #eff6ff, #ffffff)",
  border: "1px solid #bfdbfe",
  borderRadius: "26px",
  padding: "30px",
  boxShadow: "0 14px 34px rgba(0,0,0,0.06)",
};

const colorCardPurple: CSSProperties = {
  background: "linear-gradient(135deg, #f5f3ff, #ffffff)",
  border: "1px solid #ddd6fe",
  borderRadius: "26px",
  padding: "30px",
  boxShadow: "0 14px 34px rgba(0,0,0,0.06)",
};

const finalSummaryCard: CSSProperties = {
  marginTop: "44px",
  padding: "42px",
  borderRadius: "30px",
  background: "linear-gradient(135deg, #111827, #064e3b)",
  color: "white",
  textAlign: "center",
  boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
};