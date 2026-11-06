"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "fade" | "scale" | "left";

type RevealProps = {
  children: ReactNode;
  /** stagger delay in ms */
  delay?: number;
  variant?: RevealVariant;
  className?: string;
};

/**
 * Scroll-triggered reveal wrapper (IntersectionObserver, fires once).
 * Server components can pass their output as children — no client logic leaks.
 * Respects prefers-reduced-motion: content appears immediately.
 */
export function Reveal({ children, delay = 0, variant = "up", className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Reduced-motion users see content immediately (evaluated during render, not in an effect).
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div ref={ref} data-variant={variant} style={style} className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
