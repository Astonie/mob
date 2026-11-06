import { authHeaders, clearSession } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class AdminApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function humanize(j: unknown): string {
  if (j && typeof j === "object" && "errors" in (j as Record<string, unknown>)) {
    const errors = (j as { errors: Record<string, string[]> }).errors;
    return Object.entries(errors)
      .flatMap(([field, msgs]) => msgs.map((m) => `${field}: ${m}`))
      .join(" · ");
  }
  if (j && typeof j === "object" && "message" in (j as Record<string, unknown>)) {
    return String((j as { message: string }).message);
  }
  return "Request failed";
}

export async function adminFetch<T = unknown>(
  path: string,
  options: { method?: string; json?: unknown } = {}
): Promise<T> {
  const method = options.method ?? (options.json !== undefined ? "POST" : "GET");
  const res = await fetch(`${API_URL}/api/v1${path}`, {
    method,
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: options.json !== undefined ? JSON.stringify(options.json) : undefined,
  });

  if (res.status === 401) {
    clearSession();
    if (typeof window !== "undefined") window.location.href = "/admin/login";
    throw new AdminApiError("Session expired — please sign in again", 401);
  }

  const body = await res.json().catch(() => null);
  if (!res.ok) throw new AdminApiError(humanize(body), res.status);
  return body as T;
}

export type PaginatedResponse<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type MediaAsset = {
  id: string;
  original_name: string;
  file_name: string;
  path: string;
  mime_type: string;
  extension: string;
  size: number;
  folder: string;
};

// Upload a file to the media library. Returns the stored asset (use `path` as the image value).
export async function uploadMedia(file: File, folder = "general"): Promise<MediaAsset> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch(`${API_URL}/api/v1/admin/media/upload`, {
    method: "POST",
    headers: { ...authHeaders() },
    body: fd,
  });
  if (res.status === 401) {
    clearSession();
    if (typeof window !== "undefined") window.location.href = "/admin/login";
    throw new AdminApiError("Session expired — please sign in again", 401);
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new AdminApiError(humanize(body), res.status);
  return (body as { data: MediaAsset }).data;
}

// Ask Next.js to bust the ISR cache for the given tags so the public site
// reflects admin changes immediately. Same-origin call, gated by CMS token server-side.
export async function revalidateTags(tags: string[] = ["settings"]): Promise<void> {
  const token = localStorage.getItem("cms_token");
  if (!token) return;
  try {
    await fetch("/api/admin/revalidate", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ tags }),
    });
  } catch {
    // Revalidation is best-effort; the data itself is already saved.
  }
}
