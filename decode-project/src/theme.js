/* ------------------------------------------------------------------ */
/* THEME — shared color tokens + alpha helper                         */
/* ------------------------------------------------------------------ */
export const C = {
  bg: "#06050A",
  panel: "#0D0B14",
  panel2: "#120F1C",
  lilac: "#9D4EDD",
  lilacDim: "#6B3FA0",
  red: "#FF3366",
  green: "#3DDC97",
  amber: "#F5B759",
  text: "#F8F9FA",
  sub: "#A9A4BE",
  line: "rgba(157,78,221,0.22)",
};

export const rgba = (hex, a) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};
