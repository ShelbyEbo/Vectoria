"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Usa a paleta do globals.css:
// - grid  -> --card
// - energia -> --error
// - background -> --background / --color-background
export default function CyberneticGridShader() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDarkTheme = () => document.documentElement.classList.contains("dark");

    const cssColorToVec3 = (value: string, fallbackHex: string): THREE.Vector3 => {
      const raw = (value || "").trim();

      const fromHex = (hex: string) => {
        const h = hex.replace("#", "").trim();
        if (h.length !== 6) return null;
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        if ([r, g, b].some(Number.isNaN)) return null;
        return new THREE.Vector3(r / 255, g / 255, b / 255);
      };

      if (raw.startsWith("#")) {
        const v = fromHex(raw);
        if (v) return v;
      }

      const rgb = raw.match(/rgba?\(([^)]+)\)/i);
      if (rgb) {
        const parts = rgb[1].split(",").map((s) => s.trim());
        const r = Number(parts[0]);
        const g = Number(parts[1]);
        const b = Number(parts[2]);
        if (![r, g, b].some(Number.isNaN)) return new THREE.Vector3(r / 255, g / 255, b / 255);
      }

      // oklch(), var(...), etc -> normaliza via browser
      if (raw) {
        const tmp = document.createElement("span");
        tmp.style.color = raw;
        document.body.appendChild(tmp);
        const normalized = getComputedStyle(tmp).color;
        document.body.removeChild(tmp);

        const m = normalized.match(/rgba?\(([^)]+)\)/i);
        if (m) {
          const parts = m[1].split(",").map((s) => s.trim());
          const r = Number(parts[0]);
          const g = Number(parts[1]);
          const b = Number(parts[2]);
          if (![r, g, b].some(Number.isNaN)) return new THREE.Vector3(r / 255, g / 255, b / 255);
        }
      }

      return fromHex(fallbackHex) ?? new THREE.Vector3(1, 1, 1);
    };

    const readPalette = () => {
      // Lê do container (herda vars do :root/.dark) para pegar o valor atualizado.
      const style = getComputedStyle(document.documentElement);
      const gridCss = style.getPropertyValue("--button").trim();
      const energyCss = style.getPropertyValue("--error").trim();
      const backgroundCss = style.getPropertyValue("--color-background").trim();

      return {
        grid: cssColorToVec3(gridCss, "#4A7FD4"),
        energy: cssColorToVec3(energyCss, "#EF476F"),
        background: cssColorToVec3(backgroundCss, "#EDF2FF"),
      };
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;
      uniform vec2  iMouse;

      uniform vec3  uColorGrid;
      uniform vec3  uColorEnergy;
      uniform vec3  uColorBackground;
      uniform float uGridOpacity;
      uniform float uEnergyOpacity;
      uniform float uIsDark;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;

        float t         = iTime * 0.2;
        float mouseDist = length(uv - mouse);

        // warp effect around mouse
        float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.1;
        warp *= smoothstep(0.4, 0.0, mouseDist);
        uv += warp;

        // grid lines
        vec2 gridUv = abs(fract(uv * 10.0) - 0.5);
        float line  = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);

        vec3 color = uColorGrid
                   * line
                   * (0.55 + sin(t * 2.0) * 0.2)
                   * uGridOpacity;

        // energetic pulses
        float energy = sin(uv.x * 20.0 + t * 5.0)
                     * sin(uv.y * 20.0 + t * 3.0);
        energy = smoothstep(0.8, 1.0, energy);
        color += uColorEnergy * energy * line * uEnergyOpacity;

        // glow around mouse
        float glow = smoothstep(0.1, 0.0, mouseDist);
        color += vec3(1.0) * glow * 0.28 * uGridOpacity;

        color += random(uv + t * 0.1) * 0.03;

        // alpha: light mais sutil
        float alphaLight = line * uGridOpacity;
        float alphaDark  = mix(line * uGridOpacity, uGridOpacity, 0.65);
        float alpha = mix(alphaLight, alphaDark, uIsDark);

        // Em light, mistura com background (para não ficar transparente demais e "sumir").
        vec3 finalColor = mix(uColorBackground * 0.92 + color, uColorBackground * 0.82 + color, uIsDark);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const palette = readPalette();

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2(0, 0) },
      uColorGrid: { value: palette.grid },
      uColorEnergy: { value: palette.energy },
      uColorBackground: { value: palette.background },
      uGridOpacity: { value: isDarkTheme() ? 0.85 : 0.25 },
      uEnergyOpacity: { value: isDarkTheme() ? 0.95 : 0.18 },
      uIsDark: { value: isDarkTheme() ? 1.0 : 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const setSize = (width: number, height: number) => {
      // Evita canvas 0x0 (causa comum de "não renderiza")
      const w = Math.max(1, Math.floor(width));
      const h = Math.max(1, Math.floor(height));
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(w, h);

      // inicializa mouse no centro do canvas
      uniforms.iMouse.value.set(w / 2, h / 2);
    };

    const onResize = () => {
      setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onResize);

    // Observa resizing real do container (hero/sections responsivas, mudanças de layout, etc.)
    const resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(container);

    onResize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.bottom - e.clientY; // Y invertido no espaço do shader
      uniforms.iMouse.value.set(x, y);
    };
    window.addEventListener("mousemove", onMouseMove);

    const updateThemeUniforms = () => {
      uniforms.uIsDark.value = isDarkTheme() ? 1.0 : 0.0;
      uniforms.uGridOpacity.value = isDarkTheme() ? 0.85 : 0.25;
      uniforms.uEnergyOpacity.value = isDarkTheme() ? 0.95 : 0.18;

      const next = readPalette();
      uniforms.uColorGrid.value = next.grid;
      uniforms.uColorEnergy.value = next.energy;
      uniforms.uColorBackground.value = next.background;
    };

    const themeObserver = new MutationObserver(() => updateThemeUniforms());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // garante que as cores iniciais batem com o tema atual
    updateThemeUniforms();

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.setAnimationLoop(null);

      const canvas = renderer.domElement;
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);

      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="shader-container"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-label="Cybernetic Grid animated background"
    />
  );
}
