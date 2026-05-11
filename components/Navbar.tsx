"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  function logout() {
    localStorage.removeItem("role");
    window.location.href = "/login";
  }

  function navStyle(path: string): React.CSSProperties {
    const active = pathname === path;

    return {
      padding: "10px 14px",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: active ? "800" : "600",
      color: active ? "#ffffff" : "#1f2937",
      background: active ? "#15803d" : "transparent",
      transition: "0.2s",
    };
  }

  return (
    <nav style={nav}>
      <Link href="/" style={logo}>
        GlideWay
      </Link>

      <div style={links}>
        {!role && (
          <>
            <Link href="/" style={navStyle("/")}>Home</Link>
            <Link href="/ride" style={navStyle("/ride")}>Ride</Link>
            <Link href="/drive" style={navStyle("/drive")}>Drive</Link>
            <Link href="/safety" style={navStyle("/safety")}>Safety</Link>
            <Link href="/pricing" style={navStyle("/pricing")}>Pricing</Link>
            <Link href="/about" style={navStyle("/about")}>About</Link>
            <Link href="/contact" style={navStyle("/contact")}>Contact</Link>
            <Link href="/careers" style={navStyle("/careers")}>Careers</Link>
            <Link href="/support" style={navStyle("/support")}>Support</Link>
            <Link href="/admin/login" style={navStyle("/admin/login")}>Admin</Link>
            <Link href="/login" style={navStyle("/login")}>Login</Link>
            <Link href="/register" style={navStyle("/register")}>Register</Link>
          </>
        )}

        {role === "RIDER" && (
          <>
            <Link href="/rider" style={navStyle("/rider")}>Ride</Link>
            <Link href="/rider/trips" style={navStyle("/rider/trips")}>Trips</Link>
            <Link href="/rider/payments" style={navStyle("/rider/payments")}>Payments</Link>
            <Link href="/rider/profile" style={navStyle("/rider/profile")}>Profile</Link>
            <Link href="/rider/settings" style={navStyle("/rider/settings")}>Settings</Link>
            <button onClick={logout} style={logoutStyle}>Logout</button>
          </>
        )}

        {role === "DRIVER" && (
          <>
            <Link href="/driver" style={navStyle("/driver")}>Driver Home</Link>
            <Link href="/driver/trips" style={navStyle("/driver/trips")}>Trips</Link>
            <Link href="/driver/profile" style={navStyle("/driver/profile")}>Profile</Link>
            <Link href="/driver/settings" style={navStyle("/driver/settings")}>Settings</Link>
            <button onClick={logout} style={logoutStyle}>Logout</button>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Link href="/admin/financial" style={navStyle("/admin/financial")}>Financial</Link>
            <Link href="/admin/payouts" style={navStyle("/admin/payouts")}>Payouts</Link>
            <Link href="/admin/users" style={navStyle("/admin/users")}>Users</Link>
            <Link href="/admin/audit-logs" style={navStyle("/admin/audit-logs")}>Audit Logs</Link>
            <Link href="/admin/executive" style={navStyle("/admin/executive")}>Executive</Link>
            <button onClick={logout} style={logoutStyle}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const nav: React.CSSProperties = {
  width: "100%",
  padding: "16px 32px",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logo: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "900",
  color: "#15803d",
  textDecoration: "none",
};

const links: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const logoutStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#dc2626",
  color: "#ffffff",
  fontWeight: "800",
  cursor: "pointer",
};