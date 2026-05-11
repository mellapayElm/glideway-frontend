"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Role = "ADMIN" | "DRIVER" | "RIDER" | null;

export default function GlideWayNav() {
  const [role, setRole] = useState<Role>(null);

  function loadRole() {
    const stored = localStorage.getItem("user");

    if (!stored) {
      setRole(null);
      return;
    }

    try {
      const user = JSON.parse(stored);
      setRole(user?.role || null);
    } catch {
      setRole(null);
    }
  }

  useEffect(() => {
    loadRole();

    window.addEventListener("focus", loadRole);
    window.addEventListener("storage", loadRole);

    const timer = setInterval(loadRole, 1000);

    return () => {
      window.removeEventListener("focus", loadRole);
      window.removeEventListener("storage", loadRole);
      clearInterval(timer);
    };
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <nav style={nav}>
      <Link href="/" style={brand}>🚗 GlideWay</Link>

      <div style={links}>
        {role === "ADMIN" && (
          <>
            <Link style={navLink} href="/admin">Admin Dashboard</Link>
            <Link style={navLink} href="/accounting">Accounting</Link>
            <Link style={navLink} href="/admin">Payouts</Link>
            <Link style={navLink} href="/admin/users">Users</Link>
            <Link style={navLink} href="/admin/settings">Settings</Link>
            <Link style={navLink} href="/admin/profile">Profile</Link>
            <button style={logoutButton} onClick={logout}>Logout</button>
          </>
        )}

        {role === "DRIVER" && (
          <>
            <Link style={navLink} href="/driver">Driver App</Link>
            <Link style={navLink} href="/driver-earnings">Earnings</Link>
            <Link style={navLink} href="/driver/trips">Trips</Link>
            <Link style={navLink} href="/driver/settings">Settings</Link>
            <Link style={navLink} href="/driver/profile">Profile</Link>
            <button style={logoutButton} onClick={logout}>Logout</button>
          </>
        )}

        {role === "RIDER" && (
          <>
            <Link style={navLink} href="/">Book Ride</Link>
            <Link style={navLink} href="/rider/trips">My Trips</Link>
            <Link style={navLink} href="/rider/payments">Payments</Link>
            <Link style={navLink} href="/rider/settings">Settings</Link>
            <Link style={navLink} href="/rider/profile">Profile</Link>
            <button style={logoutButton} onClick={logout}>Logout</button>
          </>
        )}

        {!role && (
          <>
            <Link style={navLink} href="/">Home</Link>
            <Link style={navLink} href="/">Ride</Link>
            <Link style={navLink} href="/become-driver">Drive</Link>
            <Link style={navLink} href="/safety">Safety</Link>
            <Link style={navLink} href="/pricing">Pricing</Link>
            <Link style={loginButton} href="/login">Login</Link>
            <Link style={loginButton} href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const nav: React.CSSProperties = {
  width: "100%",
  minHeight: "82px",
  padding: "0 28px",
  background: "linear-gradient(90deg, #061108, #0b2413, #12391f)",
  borderBottom: "1px solid rgba(124,255,58,0.35)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  position: "sticky",
  top: 0,
  zIndex: 999,
  boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
};

const brand: React.CSSProperties = {
  fontSize: "30px",
  fontWeight: "900",
  color: "#9CFF57",
  textDecoration: "none",
};

const links: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "flex-end",
};

const navLink: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontWeight: "800",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
};

const loginButton: React.CSSProperties = {
  color: "#061108",
  background: "#9CFF57",
  padding: "12px 20px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "900",
};

const logoutButton: React.CSSProperties = {
  border: "none",
  color: "#061108",
  background: "#9CFF57",
  padding: "12px 20px",
  borderRadius: "999px",
  fontWeight: "900",
  cursor: "pointer",
};