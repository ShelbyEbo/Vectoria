"use client";

import { useEffect, useRef } from "react";

// ─── CONFIGURAÇÃO ──────────────────────────────────────────────
const CONFIG = {
  width: 680,
  height: 300,
  gridSize: 28,
  gravity: 0.18,
  speedX: 2.8,
  nucleusRadius: 11,
  orbitRadiusX: 54,
  orbitRadiusY: 19,
  electronRadius: 5.5,
  bounceHeights: [28, 48, 72, 100, 130, 160, 180, 200],
};
// ───────────────────────────────────────────────────────────────

const ORBITS_INIT = [
  { tilt: 0, phase: 0 },
  { tilt: 1.047, phase: 2.09 },
  { tilt: -1.047, phase: 4.19 },
];

export default function AtomTumbleweed() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // FIX: useRef dentro do componente
  const orbitStrokeRef = useRef("rgba(255,255,255,0.30)");

  useEffect(() => {
    // SSR safety
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    // ─── THEME HELPERS ────────────────────────────────────────
    function hexToRgba(hex: string, alpha: number) {
      const normalized = hex.trim();

      if (!normalized.startsWith("#")) {
        return `rgba(255,255,255,${alpha})`;
      }

      const hexValue =
        normalized.length === 4
          ? normalized
              .slice(1)
              .split("")
              .map((c) => c + c)
              .join("")
          : normalized.slice(1);

      const r = parseInt(hexValue.slice(0, 2), 16);
      const g = parseInt(hexValue.slice(2, 4), 16);
      const b = parseInt(hexValue.slice(4, 6), 16);

      return `rgba(${r},${g},${b},${alpha})`;
    }

    function updateOrbitStroke() {
      const styles = getComputedStyle(document.documentElement);

      const mainText =
        styles.getPropertyValue("--main-text") || "#FFFFFF";

      orbitStrokeRef.current = hexToRgba(mainText, 0.3);
    }

    updateOrbitStroke();

    const themeObserver = new MutationObserver(() => {
      updateOrbitStroke();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ─── CONFIG LOCAL ────────────────────────────────────────
    const {
      width,
      height,
      gravity,
      speedX,
      nucleusRadius,
      orbitRadiusX,
      orbitRadiusY,
      electronRadius,
      bounceHeights,
    } = CONFIG;

    const GROUND = height - 30;
    const NR = nucleusRadius;

    const orbits = ORBITS_INIT.map((o) => ({ ...o }));

    let x = 40;
    let y = GROUND - NR - 1;

    let vx = speedX;
    let vy = 0;

    let angle = 0;
    let bounceIndex = 0;

    const trail: { x: number; y: number }[] = [];

    // ─── PHYSICS ─────────────────────────────────────────────
    function launchBounce() {
      const h =
        bounceHeights[
          Math.min(bounceIndex, bounceHeights.length - 1)
        ];

      bounceIndex++;

      vy = -Math.sqrt(2 * gravity * h);
    }

    launchBounce();

    function update() {
      vy += gravity;

      x += vx;
      y += vy;

      angle += (vx / speedX) * 0.044;

      orbits.forEach((o) => {
        o.phase += 0.038;
      });

      if (y >= GROUND - NR) {
        y = GROUND - NR;

        if (bounceIndex >= bounceHeights.length) {
          bounceIndex = 0;
          x = 40;
          vx = speedX;
        }

        launchBounce();
      }

      if (x > width + 80) {
        x = 40;
        bounceIndex = 0;
        launchBounce();
      }

      trail.push({ x, y });

      if (trail.length > 28) {
        trail.shift();
      }
    }

    // ─── ELECTRONS ──────────────────────────────────────────
    function getElectronPos(o: {
      tilt: number;
      phase: number;
    }) {
      const lx = Math.cos(o.phase) * orbitRadiusX;
      const ly = Math.sin(o.phase) * orbitRadiusY;

      const ry2 = ly * Math.cos(o.tilt);

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      return {
        x: lx * cosA - ry2 * sinA,
        y: lx * sinA + ry2 * cosA,
        behind: ly * Math.sin(o.tilt) < 0,
      };
    }

    // ─── DRAWING ────────────────────────────────────────────
    function drawOrbitLine(o: { tilt: number }) {
      ctx.save();

      ctx.rotate(angle + o.tilt);

      ctx.beginPath();

      ctx.ellipse(
        0,
        0,
        orbitRadiusX,
        orbitRadiusY,
        0,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle = orbitStrokeRef.current;
      ctx.lineWidth = 1.4;

      ctx.stroke();

      ctx.restore();
    }

    function drawElectron(
      ep: { x: number; y: number },
      alpha: number
    ) {
      ctx.beginPath();

      ctx.arc(
        ep.x,
        ep.y,
        electronRadius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = `rgba(220,220,220,${alpha})`;

      ctx.fill();
    }

    function drawNucleus() {
      const pts = [
        { a: 0, r: 4.8, col: "#c0392b" },
        { a: 1.05, r: 4.8, col: "#2980b9" },
        { a: 2.09, r: 4.8, col: "#c0392b" },
        { a: 3.14, r: 4.8, col: "#2980b9" },
        { a: 4.19, r: 4.8, col: "#c0392b" },
        { a: 5.24, r: 4.8, col: "#2980b9" },
        { a: 0, r: 0, col: "#c0392b" },
      ];

      pts.forEach((p) => {
        ctx.beginPath();

        ctx.arc(
          Math.cos(p.a) * p.r,
          Math.sin(p.a) * p.r,
          4.8,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = p.col;

        ctx.fill();
      });

      ctx.beginPath();

      ctx.arc(0, 0, NR, 0, Math.PI * 2);

      ctx.strokeStyle = "rgba(255,255,255,0.30)";
      ctx.lineWidth = 1;

      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // trail
      for (let i = 1; i < trail.length; i++) {
        const a = (i / trail.length) * 0.18;

        ctx.beginPath();

        ctx.arc(
          trail[i].x,
          trail[i].y,
          2.5 * (i / trail.length),
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(140,130,220,${a})`;

        ctx.fill();
      }

      ctx.save();

      ctx.translate(x, y);

      const eps = orbits.map((o) => getElectronPos(o));

      // behind
      orbits.forEach((o, i) => {
        if (eps[i].behind) drawOrbitLine(o);
      });

      orbits.forEach((o, i) => {
        if (eps[i].behind) drawElectron(eps[i], 0.35);
      });

      // nucleus
      drawNucleus();

      // front
      orbits.forEach((o, i) => {
        if (!eps[i].behind) drawOrbitLine(o);
      });

      orbits.forEach((o, i) => {
        if (!eps[i].behind) drawElectron(eps[i], 1);
      });

      ctx.restore();
    }

    // ─── LOOP ───────────────────────────────────────────────
    let rafId: number;

    function loop() {
      update();
      draw();

      rafId = requestAnimationFrame(loop);
    }

    loop();

    // ─── CLEANUP ────────────────────────────────────────────
    return () => {
      themeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CONFIG.width}
      height={CONFIG.height}
      style={{
        display: "block",
        width: "100%",
        borderRadius: 12,
      }}
    />
  );
}