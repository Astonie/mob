"use client";

import { useRef, type ReactNode } from "react";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -4;
    const ry = (x - 0.5) * 4;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    el.style.transition = "transform 120ms ease-out";
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateZ(0)";
    el.style.transition = "transform 320ms ease-out";
  };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
