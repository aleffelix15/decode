import { useState, useEffect, useMemo } from "react";

export function ParticleField({ count = 22, seed = 1 }) {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(onChange);
      return () => mediaQuery.removeListener(onChange);
    }
  }, []);

  const particles = useMemo(() => {
    if (reducedMotion) return [];
    let s = seed >>> 0;
    const rand = () => {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: count }, (_, i) => ({
      x: `${(rand() * 100).toFixed(2)}%`,
      size: 2 + Math.floor(rand() * 3),
      delay: `${(rand() * 8).toFixed(2)}s`,
      dur: `${(7 + rand() * 6).toFixed(2)}s`,
      dx: `${(rand() * 40 - 20).toFixed(0)}px`,
      key: i,
    }));
  }, [count, seed, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {particles.map((p) => (
        <span
          key={p.key}
          className="decode-particle"
          style={{
            "--x": p.x,
            "--size": `${p.size}px`,
            "--delay": p.delay,
            "--dur": p.dur,
            "--dx": p.dx,
          }}
        />
      ))}
    </div>
  );
}
