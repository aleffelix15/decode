import { C, STAGE_GRADIENTS, motion } from "../theme";

/* A full-bleed, fixed, low-opacity radial gradient tied to the current
   "stage" of the experience. Renders behind content (z-index 0) and
   shifts with a 0.55s ease so the page tone tells you where you are
   (landing / story / result / data / module). */
export function BackdropGradient({ stage = "module" }) {
  const g = STAGE_GRADIENTS[stage] || STAGE_GRADIENTS.module;
  return (
    <div
      className="decode-backdrop"
      aria-hidden="true"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${g.inner} 0%, ${g.mid} 38%, ${C.bg} 78%)`,
        transition: `background ${motion.duration.slow}ms ${motion.ease.out}`,
      }}
    />
  );
}
