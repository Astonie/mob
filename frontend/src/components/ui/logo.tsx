export function MobLogo({ variant = "full", className = "" }: { variant?: "full" | "icon" | "dark"; className?: string }) {
  if (variant === "icon") {
    return (
      <svg viewBox="0 0 120 78" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mob Limited">
        <path d="M5 58 L25 22 L42 18 L8 58 Z" fill="#22262B" />
        <path d="M34 18 L72 4 L51 18 L41 28 L32 18 Z" fill="#0F4A6B" />
        <path d="M27 58 L47 20 L57 32 L72 5 L88 58 Z" fill="#0F4A6B" />
        <path d="M90 58 L102 20 L125 58 Z" fill="#0F4A6B" />
        <g transform="translate(60,44) rotate(-28)">
          <path d="M-22 -1.5 L22 1.5 L21 3.5 L-23 0 Z" fill="white" />
          <ellipse cx="0" cy="1" rx="4.5" ry="4" fill="white" />
        </g>
      </svg>
    );
  }

  if (variant === "dark") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg viewBox="0 0 120 78" className="h-10 w-16 shrink-0" fill="none">
          <path d="M5 58 L25 22 L42 18 L8 58 Z" fill="white" fillOpacity="0.9" />
          <path d="M34 18 L72 4 L51 18 L41 28 L32 18 Z" fill="#2A7FA3" />
          <path d="M27 58 L47 20 L57 32 L72 5 L88 58 Z" fill="white" />
          <path d="M90 58 L102 20 L125 58 Z" fill="white" />
          <g transform="translate(60,44) rotate(-28)">
            <path d="M-22 -1.5 L22 1.5 L21 3.5 L-23 0 Z" fill="#22262B" />
            <ellipse cx="0" cy="1" rx="4.5" ry="4" fill="#22262B" />
          </g>
        </svg>
        <div className="leading-none">
          <div className="font-black tracking-[0.12em] text-white text-[15px]">MOB LIMITED</div>
          <div className="text-[9px] tracking-[0.08em] text-white/70 font-medium">Integrated Mining and Mineral Consultancy</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 120 78" className="h-11 w-[72px] shrink-0" fill="none" aria-label="Mob Limited">
        <path d="M5 58 L25 22 L42 18 L8 58 Z" fill="#22262B" />
        <path d="M34 18 L72 4 L51 18 L41 28 L32 18 Z" fill="#0F4A6B" />
        <path d="M27 58 L47 20 L57 32 L72 5 L88 58 Z" fill="#0F4A6B" />
        <path d="M90 58 L102 20 L125 58 Z" fill="#0F4A6B" />
        <g transform="translate(60,44) rotate(-28)">
          <path d="M-22 -1.5 L22 1.5 L21 3.5 L-23 0 Z" fill="white" />
          <ellipse cx="0" cy="1" rx="4.5" ry="4" fill="white" />
          <circle cx="0" cy="1" r="1.2" fill="#0F4A6B" />
        </g>
      </svg>
      <div className="leading-none">
        <div className="font-black tracking-[0.14em] text-[#22262B] text-[16px]">MOB LIMITED</div>
        <div className="text-[9.5px] tracking-[0.06em] text-[#0F4A6B] font-medium">Integrated Mining and Mineral Consultancy</div>
      </div>
    </div>
  );
}
