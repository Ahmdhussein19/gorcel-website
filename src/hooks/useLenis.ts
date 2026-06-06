import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Gorcel weighted smooth scroll.
 * Tuned for a heavy, gliding feel (Mugen/Framer-style) that still respects
 * `prefers-reduced-motion`. Init once near the root of the app.
 */
export function useLenis(): void {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,            // length of the inertial glide (seconds)
      lerp: 0.09,                // per-frame smoothing — lower = heavier/slower catch-up
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,         // weighted easing on mouse-wheel input
      wheelMultiplier: 1,        // wheel sensitivity
      touchMultiplier: 1.4,      // touch sensitivity (a touch friskier than wheel)
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
