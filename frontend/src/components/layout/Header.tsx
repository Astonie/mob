import { HeaderClient, type NavItem } from "./HeaderClient";
import { getNavigation } from "@/lib/api";

export async function Header() {
  let menu = null;
  try {
    const res = await getNavigation("main");
    menu = res.data;
  } catch {
    menu = null;
  }

  const fallback = [
    { title: "About", url: "/about" },
    { title: "Operations", url: "/projects" },
    { title: "Minerals", url: "/minerals" },
    { title: "Sustainability", url: "/sustainability" },
    { title: "News", url: "/news" },
    { title: "Careers", url: "/careers" },
  ];
  const items: NavItem[] = menu?.items?.length ? menu.items.map((i: any) => ({ title: i.title, url: i.url || "" })) : fallback;

  return <HeaderClient items={items} />;
}
