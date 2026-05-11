export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("glideway_admin_token");
}

export function getAdminUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("glideway_admin_user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function logoutAdmin() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("glideway_admin_token");
  localStorage.removeItem("glideway_admin_user");

  window.location.href = "/admin/login";
}
export function hasAdminRole(allowedRoles: string[]) {
  const admin = getAdminUser();

  if (!admin) return false;

  return allowedRoles.includes(admin.role);
}

export function requireAdminRole(allowedRoles: string[]) {
  const token = getAdminToken();
  const admin = getAdminUser();

  if (!token || !admin) {
    window.location.href = "/admin/login";
    return false;
  }

  if (!allowedRoles.includes(admin.role)) {
    window.location.href = "/admin/users";
    return false;
  }

  return true;
}