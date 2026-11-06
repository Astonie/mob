import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { apiBaseUrl } from "@/lib/api";

const API_URL = apiBaseUrl();

// Admin-only revalidation: requires a valid CMS bearer token.
// Called by the admin UI after content changes so the public site reflects them immediately.
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.toLowerCase().startsWith("bearer ")) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const me = await fetch(`${API_URL}/api/v1/auth/me`, {
      headers: { Authorization: auth, Accept: "application/json" },
    });
    if (!me.ok) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ message: "Upstream unavailable" }, { status: 502 });
  }

  const body = await req.json().catch(() => ({}));
  const tags: string[] = Array.isArray(body.tags) && body.tags.length ? body.tags : ["settings"];

  for (const tag of tags) {
    revalidateTag(tag, "max");
    if (tag === "settings") revalidatePath("/", "layout");
    else if (tag.startsWith("page:")) {
      const slug = tag.slice("page:".length);
      revalidatePath(slug ? `/${slug}` : "/");
    } else {
      revalidatePath("/");
    }
  }

  return NextResponse.json({ revalidated: true, tags });
}
