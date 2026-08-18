import { useMemo } from "react";

/* A faint, non-interactive particle layer — the same "system coming
   alive" energy as the scanline body::before, but rising vertically.
   Position/size/duration are picked once (memoized) so React doesn't
   reroll them on every render. */
export function ParticleField({ count = 22, seed = 1 }) {
  const particles = useMemo(() => {
    // Mulberry32 — tiny deterministic PRNG so particles don't "jump" on
    // re-render. Seed defaults to 1; pass another seed for variety.
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
  }, [count, seed]);

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
