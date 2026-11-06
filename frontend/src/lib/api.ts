// Server-side fetches run inside containers, where NEXT_PUBLIC_API_URL (browser-facing
// localhost) doesn't resolve — API_URL (compose: http://backend:8000) takes precedence there.
// Client components always use the browser-facing URL.
export function apiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  }
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
}

// Absolute URL for a backend media path (e.g. leadership photos).
// Always browser-facing: the result lands in <img src>, so it must resolve
// in the visitor's browser, never to a container-internal hostname.
export function publicMediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const clean = path.replace(/^\/+/, "").replace(/^storage\//, "");
  return `${base}/storage/${clean}`;
}

// Resolve an image setting value: absolute URLs pass through, values starting
// with "/" are frontend /public assets (e.g. /logo-mob.svg), anything else is
// a media-library path uploaded via the admin (e.g. "branding/logo.png").
export function mediaSrc(value?: string | null): string | undefined {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return value;
  return publicMediaUrl(value) ?? undefined;
}

export type ApiResponse<T> = {
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links?: unknown;
};

export type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

async function apiFetch<T>(
  path: string,
  init?: RequestInit & { next?: NextFetchRequestConfig }
): Promise<T> {
  const url = path.startsWith("http") ? path : `${apiBaseUrl()}/api/v1${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    next: init?.next,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${path} failed ${res.status}: ${body.slice(0, 500)}`);
  }
  return res.json() as Promise<T>;
}

// Public fetchers with ISR
export async function getPage(slug: string) {
  return apiFetch<{ data: Page }>(`/pages/${slug}`, {
    next: { revalidate: 3600, tags: [`page:${slug}`] },
  });
}

export async function getProjects(params?: string) {
  return apiFetch<Paginated<Project>>(`/projects${params ? `?${params}` : ""}`, {
    next: { revalidate: 600, tags: ["projects"] },
  });
}

export async function getProject(slug: string) {
  return apiFetch<{ data: Project }>(`/projects/${slug}`, {
    next: { revalidate: 3600, tags: [`project:${slug}`] },
  });
}

export async function getMinerals() {
  return apiFetch<{ data: Mineral[] }>(`/minerals`, {
    next: { revalidate: 3600, tags: ["minerals"] },
  });
}

export async function getMineral(slug: string) {
  return apiFetch<{ data: Mineral }>(`/minerals/${slug}`, {
    next: { revalidate: 3600, tags: [`mineral:${slug}`] },
  });
}

export async function getNews(params?: string) {
  return apiFetch<Paginated<NewsArticle>>(`/news${params ? `?${params}` : ""}`, {
    next: { revalidate: 600, tags: ["news"] },
  });
}

export async function getNewsArticle(slug: string) {
  return apiFetch<{ data: NewsArticle }>(`/news/${slug}`, {
    next: { revalidate: 3600, tags: [`news:${slug}`] },
  });
}

export async function getNavigation(menu = "main") {
  return apiFetch<{ data: NavigationMenu }>(`/navigation?menu=${menu}`, {
    next: { revalidate: 3600, tags: [`nav:${menu}`] },
  });
}

export async function getCareers(params?: string) {
  return apiFetch<Paginated<Career>>(`/careers${params ? `?${params}` : ""}`, {
    next: { revalidate: 600, tags: ["careers"] },
  });
}

export async function search(query: string) {
  return apiFetch<{ data: SearchResult[]; meta: { total: number } }>(
    `/search?q=${encodeURIComponent(query)}`,
    { next: { revalidate: 60 } }
  );
}

export async function getSiteSettings() {
  return apiFetch<{ data: SiteSettings }>(`/site-settings`, {
    next: { revalidate: 3600, tags: ["settings"] },
  });
}

export async function getEsgContents() {
  return apiFetch<EsgContent[]>(`/esg-contents`, {
    next: { revalidate: 3600, tags: ["esg"] },
  });
}

export async function getFaqs() {
  return apiFetch<Faq[]>(`/faqs`, {
    next: { revalidate: 3600, tags: ["faq"] },
  });
}

export async function getLeadership() {
  return apiFetch<LeadershipProfile[]>(`/leadership`, {
    next: { revalidate: 3600, tags: ["leadership"] },
  });
}

// Settings helpers — every key has a hardcoded fallback so the site works if the API is down.
export type SiteSettings = Record<string, unknown>;

export function settingString(settings: SiteSettings | null | undefined, key: string, fallback: string): string {
  const v = settings?.[key];
  return typeof v === "string" ? v : typeof v === "number" ? String(v) : fallback;
}

export function settingLines(settings: SiteSettings | null | undefined, key: string, fallback: string[]): string[] {
  const v = settings?.[key];
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string" && v.trim()) return v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return fallback;
}

export function settingArray(settings: SiteSettings | null | undefined, key: string, fallback: string[]): string[] {
  const v = settings?.[key];
  if (Array.isArray(v)) return v.map(String);
  return fallback;
}

// Optional settings fetch — returns null instead of throwing (used where content must render regardless).
export async function getSiteSettingsSafe(): Promise<SiteSettings | null> {
  try {
    return (await getSiteSettings()).data;
  } catch {
    return null;
  }
}

export async function getFaqsSafe(): Promise<Faq[]> {
  try {
    return await getFaqs();
  } catch {
    return [];
  }
}

export async function getLeadershipSafe(): Promise<LeadershipProfile[]> {
  try {
    return await getLeadership();
  } catch {
    return [];
  }
}

export async function getEsgContentsSafe(): Promise<EsgContent[]> {
  try {
    return await getEsgContents();
  } catch {
    return [];
  }
}

// Types for API
export type Page = {
  id: string;
  title: string;
  slug: string;
  template: string;
  excerpt: string | null;
  status: string;
  blocks: Block[];
  published_at: string | null;
};

export type Block = {
  id: string;
  type: string;
  data: Record<string, unknown>;
  sort_order: number;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  code: string | null;
  summary: string | null;
  description: string | null;
  country: string | null;
  status: string;
  stage: string | null;
  project_type: string | null;
  ownership_percentage: string | null;
  is_featured: boolean;
  published_at: string | null;
  location: { id: string; name: string; slug: string; country: string } | null;
  minerals: Mineral[];
};

export type Mineral = {
  id: string;
  name: string;
  slug: string;
  chemical_symbol: string | null;
  category: string | null;
  summary: string | null;
  description: string | null;
  uses: string | null;
  is_featured: boolean;
  projects_count?: number;
  projects?: Project[];
};

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  status: string;
  is_featured: boolean;
  featured_image: string | null;
  published_at: string | null;
  category: { id: string; name: string; slug: string } | null;
  tags: { id: string; name: string; slug: string }[];
};

export type NavigationMenu = {
  id: string;
  name: string;
  slug: string;
  items: NavigationItem[];
};

export type NavigationItem = {
  id: string;
  title: string;
  url: string | null;
  type: string;
  target: string;
  children: NavigationItem[];
};

export type Career = {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  summary: string | null;
  description: string | null;
  deadline: string | null;
  status: string;
  is_featured: boolean;
};

export type SearchResult = {
  type: string;
  id: string;
  title: string;
  slug: string;
  excerpt: string;
};

export type EsgContent = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  summary: string | null;
  content: string | null;
  featured_image: string | null;
  metrics: unknown;
  sort_order: number;
  published_at: string | null;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
};

export type LeadershipProfile = {
  id: string;
  name: string;
  slug: string;
  position: string | null;
  category: string | null;
  bio: string | null;
  full_bio: string | null;
  photo: string | null;
  linkedin_url: string | null;
};
