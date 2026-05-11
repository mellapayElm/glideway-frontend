"use client";

import React, { useEffect, useState } from "react";
import { getAdminToken, logoutAdmin } from "../../utils/adminAuth";
type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/admin/users");

      if (!res.ok) {
        throw new Error("Failed to load admin users.");
      }

      const data = await res.json();

      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load admin users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const token = getAdminToken();

  if (!token) {
    window.location.href = "/admin/login";
    return;
  }

  loadUsers();
}, []);

  return (
    <main style={main}>
      <h1 style={title}>Admin Users & Role Permissions</h1>

      <p style={subtitle}>
        Manage GlideWay admin roles and permission access.
      </p>

    <button onClick={logoutAdmin} style={logoutButton}>
  Logout
</button>
      {loading && <p>Loading admin users...</p>}

      {error && <p style={errorText}>{error}</p>}

      {!loading && !error && (
        <div style={card}>
          {users.length === 0 ? (
            <p>No admin users found.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} style={row}>
                <div>
                  <h3 style={name}>{user.name}</h3>

                  <p style={email}>{user.email}</p>

                  <span style={badge}>{user.role}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

const main: React.CSSProperties = {
  padding: "32px",
  minHeight: "100vh",
  background: "#f9fafb",
  fontFamily: "Arial, sans-serif",
};

const title: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "8px",
  color: "#111827",
};

const subtitle: React.CSSProperties = {
  color: "#6b7280",
  marginBottom: "24px",
};

const card: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "24px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const row: React.CSSProperties = {
  padding: "18px 0",
  borderBottom: "1px solid #f3f4f6",
};

const name: React.CSSProperties = {
  margin: 0,
  color: "#111827",
};

const email: React.CSSProperties = {
  margin: "6px 0",
  color: "#6b7280",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "bold",
};

const errorText: React.CSSProperties = {
  color: "red",
  fontWeight: "bold",
}; 
const logoutButton: React.CSSProperties = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  marginBottom: "20px",
};