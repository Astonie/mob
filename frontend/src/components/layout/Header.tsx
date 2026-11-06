import { HeaderClient, type NavItem } from "./HeaderClient";
import { getNavigation, getSiteSettingsSafe, settingString } from "@/lib/api";

export async function Header() {
  let menu = null;
  try {
    const res = await getNavigation("main");
    menu = res.data;
  } catch {
    menu = null;
  }

  const fallback = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Our Services", url: "/services" },
    { title: "Our Team", url: "/team" },
    { title: "News", url: "/news" },
    { title: "Careers", url: "/careers" },
    { title: "Contact", url: "/contact" },
  ];
  const items: NavItem[] = menu?.items?.length ? menu.items.map((i: any) => ({ title: i.title, url: i.url || "" })) : fallback;

  const settings = await getSiteSettingsSafe().catch(() => null);
  const logoLight = settingString(settings, "site.logo_light", "/logo-mob.svg");
  const logoDark = settingString(settings, "site.logo_dark", logoLight || "/logo-mob.svg");
  const logoIcon = settingString(settings, "site.logo_icon", logoLight || "/logo-mob.svg");
  return <HeaderClient items={items} logos={{ logoLight, logoDark, logoIcon }} />;
}
