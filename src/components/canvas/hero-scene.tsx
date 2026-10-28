"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Theme } from "@/lib/theme";

/**
 * Hero scene — dibangun dengan Three.js murni (tanpa wrapper React)
 * agar bundle tetap ringan dan kontrol render sepenuhnya ada di tangan kita.
 *
 * Isi scene: satu medan partikel mengambang (starfield / nebula) dengan
 * warna gradien violet→cyan. Tidak ada objek padat berbentuk bola, jadi
 * latar terasa lapang dan teks tetap jadi fokus utama.
 *
 * Optimasi:
 *   - Device pixel ratio dibatasi (maks 1.8).
 *   - Loop berhenti saat tab tidak aktif atau hero keluar dari viewport.
 *   - Menghormati `prefers-reduced-motion` (hanya satu frame statis).
 *   - Semua resource di-dispose saat unmount.
 */

const PARTICLE_VERTEX = /* glsl */ `
attribute vec3 aColor;
attribute float aSize;

uniform float uPixelRatio;

varying vec3 vColor;

void main() {
  vColor = aColor;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  // Ukuran dibatasi: partikel yang terlalu dekat kamera tidak boleh
  // membesar menjadi bulatan kabur.
  float size = aSize * uPixelRatio * (40.0 / max(-mvPosition.z, 1.6));
  gl_PointSize = min(size, 13.0 * uPixelRatio);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const PARTICLE_FRAGMENT = /* glsl */ `
uniform float uOpacity;

varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);

  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.02, dist);
  gl_FragColor = vec4(vColor, alpha * alpha * 0.85 * uOpacity);
}
`;

/**
 * Palet & mode pencampuran per tema.
 *
 * Gelap  → aditif: partikel saling menjumlah sehingga tampak berpendar.
 * Terang → normal + opasitas rendah: tetap terlihat seperti debu cahaya,
 *          tanpa mengotori latar putih dengan titik-titik gelap.
 */
const PALETTES = {
  dark: {
    colorA: "#c4b5fd",
    colorB: "#22d3ee",
    colorC: "#f0abfc",
    opacity: 1,
    blending: THREE.AdditiveBlending,
  },
  light: {
    colorA: "#8b5cf6",
    colorB: "#06b6d4",
    colorC: "#d946ef",
    opacity: 0.45,
    blending: THREE.NormalBlending,
  },
} as const;

export function HeroScene({ className, theme = "dark" }: { className?: string; theme?: Theme }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const palette = PALETTES[theme];

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSmallScreen,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      // WebGL tidak tersedia — biarkan lapisan CSS gradient sebagai fallback.
      return;
    }

    const maxDpr = isSmallScreen ? 1.5 : 1.8;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setClearAlpha(0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    const world = new THREE.Group();
    scene.add(world);

    /* ---------------- Partikel ---------------- */
    const particleCount = isSmallScreen ? 800 : 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorA = new THREE.Color(palette.colorA);
    const colorB = new THREE.Color(palette.colorB);
    const colorC = new THREE.Color(palette.colorC);

    for (let i = 0; i < particleCount; i += 1) {
      // Sebaran tipis-memanjang (bukan bola padat) agar terasa seperti nebula.
      const radius = 2.4 + Math.random() * 9.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * 1.15;
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.62;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const mixer = Math.random();
      const mixed =
        mixer < 0.5
          ? colorA.clone().lerp(colorB, mixer * 2)
          : colorB.clone().lerp(colorC, (mixer - 0.5) * 2);

      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;

      sizes[i] = 0.55 + Math.random() * 1.9;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: renderer.getPixelRatio() },
        uOpacity: { value: palette.opacity },
      },
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: palette.blending as THREE.Blending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);

    /* ---------------- Interaksi & ukuran ---------------- */
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handlePointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      particleMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    /* ---------------- Loop animasi ---------------- */
    const timer = new THREE.Timer();
    let frameId = 0;
    let visible = true;

    const renderFrame = (timestamp?: number) => {
      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 0.05);
      const elapsed = timer.getElapsed();

      smooth.x += (pointer.x - smooth.x) * 0.05;
      smooth.y += (pointer.y - smooth.y) * 0.05;

      particles.rotation.y -= delta * 0.02;
      particles.rotation.x = Math.sin(elapsed * 0.1) * 0.045;

      world.rotation.y = smooth.x * 0.3;
      world.rotation.x = smooth.y * 0.2;

      camera.position.x = smooth.x * 0.32;
      camera.position.y = -smooth.y * 0.24;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (frameId) return;
      const tick = (timestamp: number) => {
        frameId = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        renderFrame(timestamp);
      };
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!frameId) return;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    if (reducedMotion) {
      // Satu frame statis saja.
      renderFrame();
    } else {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave);
      start();
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.02 },
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (!reducedMotion) start();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    /* ---------------- Cleanup ---------------- */
    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);

      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}

export default HeroScene;
