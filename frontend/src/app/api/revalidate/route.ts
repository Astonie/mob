import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const tag: string | undefined = body.tag;
  const path: string | undefined = body.path;

  if (tag) revalidateTag(tag, "max");
  if (path) revalidatePath(path);
  if (!tag && !path) {
    revalidateTag("projects", "max");
    revalidateTag("news", "max");
    revalidatePath("/");
  }

  return NextResponse.json({ revalidated: true, tag, path, now: Date.now() });
}
