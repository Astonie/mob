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

  if (variant === "icon") {
    return (
      <Image
        src={icon}
        alt="Mob Limited"
        width={200}
        height={130}
        className={`h-14 w-auto shrink-0 ${className}`}
        unoptimized
      />
    );
  }

  if (variant === "dark") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Image
          src={dark}
          alt="Mob Limited"
          width={200}
          height={130}
          className="h-14 w-auto shrink-0"
          unoptimized
        />
        <div className="leading-none">
          <div className="font-black tracking-[0.12em] text-white text-[15px]">MOB LIMITED</div>
          <div className="text-[9px] tracking-[0.08em] text-white/70 font-medium">Integrated Mining &amp; Mineral Solutions</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src={light}
        alt="Mob Limited"
        width={200}
        height={130}
        className="h-14 w-auto shrink-0"
        unoptimized
      />
      <div className="leading-none">
        <div className="font-black tracking-[0.14em] text-[#22262B] text-[16px]">MOB LIMITED</div>
        <div className="text-[9.5px] tracking-[0.06em] text-[#0F4A6B] font-medium">Integrated Mining &amp; Mineral Solutions</div>
      </div>
    </div>
  );
}
