const API_URL = "http://localhost:5000";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function apiFetch(path: string, options: any = {}) {
  const token = getToken();

  return fetch(`${API_URL}${path}`, {
    ...options,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
}