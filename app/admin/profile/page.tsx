"use client";

export default function AdminProfile() {
  return (
    <div style={container}>
      <h1>👤 Admin Profile</h1>

      <div style={card}>
        <p><b>Name:</b> Admin User</p>
        <p><b>Email:</b> admin@glideway.com</p>
        <p><b>Role:</b> ADMIN</p>
        <p><b>Phone:</b> +1 (000) 000-0000</p>
      </div>

      <div style={card}>
        <h3>🔐 Security</h3>
        <p>• Change Password</p>
        <p>• Multi-Factor Authentication (MFA)</p>
        <p>• Login Activity Logs</p>
      </div>

      <div style={card}>
        <h3>📊 Account Activity</h3>
        <p>• Last login: Today</p>
        <p>• Devices: Web / Mobile</p>
        <p>• Active sessions monitored</p>
      </div>
    </div>
  );
}

const container = {
  padding: "30px",
  color: "white",
};

const card = {
  marginTop: "20px",
  padding: "20px",
  background: "#111",
  borderRadius: "12px",
};