const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const TOKEN_KEY = "cms_token";
const USER_KEY = "cms_user";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setSession(token: string, user: unknown) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function authHeaders(token?: string): HeadersInit {
  const t = token ?? getToken();
  return t ? { Authorization: `Bearer ${t}`, Accept: "application/json" } : { Accept: "application/json" };
}

export async function validateToken(token?: string): Promise<boolean> {
  const t = token ?? getToken();
  if (!t) return false;
  try {
    const res = await fetch(`${API_URL}/api/v1/auth/me`, { headers: authHeaders(t) });
    return res.ok;
  } catch {
    return false;
  }
}
