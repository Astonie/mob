const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
  const url = path.startsWith("http") ? path : `${API_URL}/api/v1${path}`;
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
