/* ------------------------------------------------------------------ */
/* THEME — shared color tokens + alpha helper                         */
/* ------------------------------------------------------------------ */
export const C = {
  bg: "#06050A",
  panel: "#0D0B14",
  panel2: "#120F1C",
  lilac: "#9D4EDD",
  lilacDim: "#6B3FA0",
  lilacBright: "#C77DFF",
  red: "#FF3366",
  green: "#3DDC97",
  amber: "#F5B759",
  text: "#F8F9FA",
  sub: "#A9A4BE",
  line: "rgba(157,78,221,0.22)",
  glow: "rgba(157,78,221,0.35)",
};

/* Stage gradients — used by <BackdropGradient> to shift the page tone
   as the user moves from landing → story → result → data. Each pair is
   (radial inner color, base bg). Kept short so they compose. */
export const STAGE_GRADIENTS = {
  landing: { inner: "rgba(157,78,221,0.22)", mid: "rgba(91,33,182,0.06)" },
  story:   { inner: "rgba(91,33,182,0.14)", mid: "rgba(6,5,10,0)" },
  result:  { inner: "rgba(61,220,151,0.10)", mid: "rgba(157,78,221,0.05)" },
  data:    { inner: "rgba(245,183,89,0.08)", mid: "rgba(157,78,221,0.04)" },
  module:  { inner: "rgba(157,78,221,0.12)", mid: "rgba(6,5,10,0)" },
};

/* Motion tokens — keep all easings/durations in one place so we can
   swap them in one shot if the design language changes. */
export const motion = {
  duration: { fast: 160, base: 280, slow: 520, scan: 1100 },
  ease: {
    out: "cubic-bezier(.22,.61,.36,1)",
    inOut: "cubic-bezier(.65,0,.35,1)",
  },
};

export const rgba = (hex, a) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};
