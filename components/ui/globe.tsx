"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";

const brass: [number, number, number] = [0.73, 0.59, 0.35];

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let phi = 4.55;
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const options: COBEOptions = { devicePixelRatio: Math.min(window.devicePixelRatio, 2), width: 860, height: 860, phi, theta: 0.18, dark: 0.12, diffuse: 1.8, mapSamples: 16000, mapBrightness: 5.2, mapBaseBrightness: 0.18, baseColor: [0.22, 0.34, 0.36], markerColor: brass, glowColor: [0.35, 0.48, 0.46], markers: [{ location: [17.3, -62.72], size: 0.065 }, { location: [51.5, -0.13], size: 0.022 }, { location: [40.71, -74.01], size: 0.018 }, { location: [1.35, 103.82], size: 0.018 }], arcs: [{ from: [17.3, -62.72], to: [51.5, -0.13] }, { from: [17.3, -62.72], to: [40.71, -74.01] }, { from: [17.3, -62.72], to: [1.35, 103.82] }], arcColor: brass, arcWidth: 0.45, arcHeight: 0.24, markerElevation: 0.08, opacity: 0.98 };
    const globe = createGlobe(canvas, options);
    if (!reducedMotion) {
      const animate = () => { phi += 0.0018; globe.update({ phi }); frame = window.requestAnimationFrame(animate); };
      frame = window.requestAnimationFrame(animate);
    }
    return () => { window.cancelAnimationFrame(frame); globe.destroy(); };
  }, []);

  return <div className="globe" role="img" aria-label="Interactive globe centered on Saint Kitts and Nevis"><canvas ref={canvasRef} /></div>;
}
