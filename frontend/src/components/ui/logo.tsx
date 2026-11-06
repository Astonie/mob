import Image from "next/image";
import { mediaSrc } from "@/lib/api";

export function MobLogo({
  variant = "full",
  className = "",
  logoLight = "/logo-mob.svg",
  logoDark,
  logoIcon,
}: {
  variant?: "full" | "icon" | "dark";
  className?: string;
  logoLight?: string;
  logoDark?: string;
  logoIcon?: string;
}) {
  const dark = mediaSrc(logoDark || logoLight) || "/logo-mob.svg";
  const icon = mediaSrc(logoIcon || logoLight) || "/logo-mob.svg";
  const light = mediaSrc(logoLight) || "/logo-mob.svg";

  // An uploaded/custom logo is treated as a full lockup (image only, no wordmark).
  const isCustom = (src: string) => !src.endsWith("/logo-mob.svg") && src !== "/logo-mob.svg";

  if (variant === "icon") {
    return (
      <Image
        src={icon}
        alt="Mob Limited"
        width={200}
        height={130}
        className={`h-14 w-auto shrink-0 object-contain ${className}`}
        unoptimized
      />
    );
  }

  if (variant === "dark") {
    if (isCustom(dark)) {
      return (
        <Image
          src={dark}
          alt="Mob Limited"
          width={200}
          height={130}
          className={`h-12 w-auto shrink-0 object-contain ${className}`}
          unoptimized
        />
      );
    }
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Image
          src={dark}
          alt="Mob Limited"
          width={200}
          height={130}
          className="h-14 w-auto shrink-0 object-contain"
          unoptimized
        />
        <div className="leading-none">
          <div className="font-black tracking-[0.12em] text-white text-[15px]">MOB LIMITED</div>
          <div className="text-[9px] tracking-[0.08em] text-white/70 font-medium">Integrated Mining &amp; Mineral Solutions</div>
        </div>
      </div>
    );
  }

  if (isCustom(light)) {
    return (
      <Image
        src={light}
        alt="Mob Limited"
        width={200}
        height={130}
        className={`h-12 w-auto shrink-0 object-contain ${className}`}
        unoptimized
      />
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src={light}
        alt="Mob Limited"
        width={200}
        height={130}
        className="h-14 w-auto shrink-0 object-contain"
        unoptimized
      />
      <div className="leading-none">
        <div className="font-black tracking-[0.14em] text-[#22262B] text-[16px]">MOB LIMITED</div>
        <div className="text-[9.5px] tracking-[0.06em] text-[#0F4A6B] font-medium">Integrated Mining &amp; Mineral Solutions</div>
      </div>
    </div>
  );
}
