"use client";

import Link from "next/link";

export default function DriverTopNav() {
  return (
    <nav style={nav}>
      <div style={logo}>🚗 GlideWay Driver</div>

      <div style={links}>
        <Link href="/driver" style={link}>Driver App</Link>
        <Link href="/driver/earnings" style={link}>Earnings</Link>
        <Link href="/driver/trips" style={link}>Trips</Link>
        <Link href="/driver/settings" style={link}>Settings</Link>
        <Link href="/driver/profile" style={link}>Profile</Link>
        <Link href="/login" style={logout}>Logout</Link>
      </div>
    </nav>
  );
}

const nav: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: "#052e16",
  color: "white",
  padding: "16px 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #166534",
};

const logo: React.CSSProperties = {
  fontWeight: 900,
  fontSize: "20px",
};

const links: React.CSSProperties = {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap",
};

const link: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontWeight: 800,
};

const logout: React.CSSProperties = {
  color: "#fecaca",
  textDecoration: "none",
  fontWeight: 900,
};