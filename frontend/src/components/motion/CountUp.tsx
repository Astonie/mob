"use client";

import { useEffect, useRef, useState } from "react";

type Parsed = { target: number; decimals: number; prefix: string; suffix: string } | null;

function parse(value: string): Parsed {
  const m = /^([^0-9]*)([0-9][0-9,]*\.?[0-9]*)([\s\S]*)$/.exec(value.trim());
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  const target = Number(num.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { target, decimals, prefix, suffix };
}

function format(n: number, decimals: number): string {
  return decimals > 0
    ? n.toFixed(decimals)
    : Math.round(n).toLocaleString("en-US");
}

/**
 * Animated number that counts up when scrolled into view.
 * Non-numeric values render as-is. Final value is server-rendered for SEO/no-JS.
 */
export function CountUp({ value, duration = 1400, className = "" }: { value: string; duration?: number; className?: string }) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${parsed.prefix}${format(parsed.target * eased, parsed.decimals)}${parsed.suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [parsed, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
