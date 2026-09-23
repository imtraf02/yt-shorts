import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";

const { fontFamily: robotoMonoFont } = loadRobotoMono("normal", {
  weights: ["600", "700"],
  subsets: ["vietnamese", "latin"],
});

export type HeatTheme = "cold" | "hot";

export interface HeatTransferBackgroundProps {
  readonly theme?: HeatTheme;
  readonly showGrid?: boolean;
  readonly showParticles?: boolean;
  readonly showThermalWave?: boolean;
  readonly showFormulas?: boolean;
}

// Deterministic pseudo-random number generator for consistent Remotion rendering
const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
};

export const HeatTransferBackground: React.FC<HeatTransferBackgroundProps> = ({
  theme = "cold",
  showGrid = true,
  showParticles = true,
  showThermalWave = true,
  showFormulas = true,
}) => {
  const frame = useCurrentFrame();
  const { width = 1080, height = 1920 } = useVideoConfig();

  const isHot = theme === "hot";

  // Parallax subtle drifting camera
  const cameraDriftX = Math.sin(frame * 0.014) * 8;
  const cameraDriftY = Math.cos(frame * 0.01) * 10;
  const gridPanY = (frame * 0.4) % 60;
  const gridPanX = (frame * 0.2) % 60;

  // Ambient orbs
  const orb1X = isHot ? 780 + Math.sin(frame * 0.018) * 80 : 260 + Math.sin(frame * 0.015) * 80;
  const orb1Y = isHot ? 450 + Math.cos(frame * 0.015) * 70 : 380 + Math.cos(frame * 0.018) * 60;
  const orb2X = isHot ? 320 + Math.cos(frame * 0.016) * 90 : 820 + Math.cos(frame * 0.014) * 90;
  const orb2Y = isHot ? 1100 + Math.sin(frame * 0.018) * 80 : 1060 + Math.sin(frame * 0.017) * 80;

  // Pulsing energy
  const pulseA = 0.5 + 0.5 * Math.sin(frame * 0.05);

  // Particles: kinetic heat/cold atoms
  const particles = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const baseX = pseudoRandom(i * 13 + 3) * width;
      const baseY = pseudoRandom(i * 17 + 5) * height;
      const speed = 0.8 + pseudoRandom(i * 19 + 7) * 1.6;
      const size = 3 + pseudoRandom(i * 23 + 9) * 4.5;
      const baseOpacity = 0.2 + pseudoRandom(i * 29 + 11) * 0.5;
      const swaySpeed = 0.02 + pseudoRandom(i * 31 + 13) * 0.03;
      const swayAmount = 15 + pseudoRandom(i * 37 + 15) * 25;
      return {
        baseX,
        baseY,
        speed,
        size,
        baseOpacity,
        swaySpeed,
        swayAmount,
      };
    });
  }, [width, height]);

  // Sine thermal wave points
  const wavePoints = useMemo(() => {
    const points: string[] = [];
    const step = 28;
    const waveY = 820;

    for (let x = -50; x <= width + 50; x += step) {
      const primary = Math.sin(x * 0.008 + frame * 0.04) * 36;
      const secondary = Math.sin(x * 0.022 - frame * 0.05) * 12;
      const y = waveY + primary + secondary;
      points.push(`${x},${y.toFixed(1)}`);
    }

    return points.join(" ");
  }, [frame, width]);

  // Scanline Y
  const scanlineY = (frame * 10) % (height + 300) - 150;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: isHot ? "#100604" : "#050b18",
        fontFamily: `${robotoMonoFont}, monospace`,
      }}
    >
      {/* 1. Base Gradient Canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isHot
            ? "radial-gradient(ellipse at 50% 30%, #2a0e08 0%, #170704 55%, #0d0302 100%)"
            : "radial-gradient(ellipse at 50% 25%, #0e1e38 0%, #071224 55%, #030812 100%)",
        }}
      />

      {/* 2. Dynamic Ambient Auroras */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          opacity: 0.85,
          pointerEvents: "none",
        }}
      >
        {/* Primary Glowing Thermal Aura */}
        <div
          style={{
            position: "absolute",
            left: orb1X,
            top: orb1Y,
            width: 650,
            height: 650,
            borderRadius: "50%",
            background: isHot
              ? "radial-gradient(circle, rgba(249, 115, 22, 0.32) 0%, rgba(220, 38, 38, 0.12) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(14, 165, 233, 0.32) 0%, rgba(3, 105, 161, 0.12) 50%, transparent 70%)",
            transform: `scale(${1 + pulseA * 0.15})`,
          }}
        />

        {/* Secondary Aura */}
        <div
          style={{
            position: "absolute",
            left: orb2X,
            top: orb2Y,
            width: 580,
            height: 580,
            borderRadius: "50%",
            background: isHot
              ? "radial-gradient(circle, rgba(234, 179, 8, 0.25) 0%, rgba(180, 83, 9, 0.08) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 70%)",
            transform: `scale(${1.1 - pulseA * 0.12})`,
          }}
        />
      </div>

      {/* 3. Engineering Blueprint Grid */}
      {showGrid && (
        <div
          style={{
            position: "absolute",
            inset: -80,
            transform: `translate(${cameraDriftX}px, ${cameraDriftY}px)`,
            opacity: 0.45,
            pointerEvents: "none",
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="thermal-micro-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(${gridPanX}, ${gridPanY})`}
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke={isHot ? "rgba(249, 115, 22, 0.14)" : "rgba(56, 189, 248, 0.14)"}
                  strokeWidth="1"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="1.5"
                  fill={isHot ? "rgba(251, 146, 60, 0.4)" : "rgba(56, 189, 248, 0.4)"}
                />
              </pattern>

              <pattern
                id="thermal-macro-grid"
                width="240"
                height="240"
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(${gridPanX}, ${gridPanY})`}
              >
                <rect width="240" height="240" fill="none" />
                <path
                  d="M 240 0 L 0 0 0 240"
                  fill="none"
                  stroke={isHot ? "rgba(234, 179, 8, 0.22)" : "rgba(14, 165, 233, 0.22)"}
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
                <path
                  d="M -10 0 L 10 0 M 0 -10 L 0 10"
                  stroke={isHot ? "#f59e0b" : "#38bdf8"}
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#thermal-micro-grid)" />
            <rect width="100%" height="100%" fill="url(#thermal-macro-grid)" />
          </svg>
        </div>
      )}

      {/* 4. Thermal Wave Stream */}
      {showThermalWave && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <svg width="100%" height="100%">
            <defs>
              <linearGradient id="heatGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isHot ? "#f97316" : "#38bdf8"} stopOpacity="0.05" />
                <stop offset="35%" stopColor={isHot ? "#fbbf24" : "#0284c7"} stopOpacity="0.7" />
                <stop offset="65%" stopColor={isHot ? "#ef4444" : "#38bdf8"} stopOpacity="0.85" />
                <stop offset="100%" stopColor={isHot ? "#f97316" : "#60a5fa"} stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <polyline
              points={wavePoints}
              fill="none"
              stroke="url(#heatGlow)"
              strokeWidth="3.5"
              style={{
                filter: isHot
                  ? "drop-shadow(0 0 12px rgba(249, 115, 22, 0.75))"
                  : "drop-shadow(0 0 12px rgba(56, 189, 248, 0.75))",
              }}
            />
          </svg>
        </div>
      )}

      {/* 5. Floating Atoms / Kinetic Energy Particles */}
      {showParticles && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {particles.map((p, idx) => {
            const currentY = ((p.baseY - frame * p.speed) % height + height) % height;
            const currentX = p.baseX + Math.sin(frame * p.swaySpeed + idx) * p.swayAmount;
            const opacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(frame * 0.05 + idx * 2));
            const color = isHot
              ? idx % 2 === 0
                ? "#fb923c"
                : "#facc15"
              : idx % 2 === 0
              ? "#38bdf8"
              : "#a5f3fc";

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: currentX,
                  top: currentY,
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  backgroundColor: color,
                  opacity,
                  boxShadow: `0 0 ${p.size * 3}px ${color}`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 6. Scanline Sweep */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanlineY,
          height: 100,
          background: isHot
            ? "linear-gradient(180deg, transparent 0%, rgba(249, 115, 22, 0.06) 50%, rgba(251, 191, 36, 0.2) 95%, rgba(255, 255, 255, 0.5) 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(14, 165, 233, 0.06) 50%, rgba(56, 189, 248, 0.2) 95%, rgba(255, 255, 255, 0.5) 100%)",
          pointerEvents: "none",
          boxShadow: isHot
            ? "0 2px 20px rgba(249, 115, 22, 0.3)"
            : "0 2px 20px rgba(56, 189, 248, 0.3)",
        }}
      />

      {/* 7. Subtle Physics Formulas & Thermal HUD */}
      {showFormulas && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.32,
          }}
        >
          {/* Top-Right HUD Badge */}
          <div
            style={{
              position: "absolute",
              top: 140,
              right: 60,
              color: isHot ? "#fb923c" : "#38bdf8",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textAlign: "right",
            }}
          >
            <div>FOURIER CONDUCTION LAW</div>
            <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 4 }}>
              q = -k · ∇T | dQ/dt
            </div>
          </div>

          {/* Left Temperature Scale Ticks */}
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 220,
              bottom: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "#94a3b8",
              fontSize: 10,
              fontWeight: 800,
            }}
          >
            {[
              isHot ? "+50°C // SUN" : "0°C // FREEZE",
              isHot ? "+40°C // PEAK" : "-5°C // COLD",
              isHot ? "+37°C // BODY" : "-10°C // SNOW",
              "ΔT RATE OF LOSS",
              "k_metal >> k_wood",
            ].map((label, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 12,
                    height: 1.5,
                    backgroundColor: isHot ? "#f97316" : "#38bdf8",
                  }}
                />
                <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Corner Framing Brackets */}
      <div
        style={{
          position: "absolute",
          top: 95,
          left: 45,
          width: 26,
          height: 26,
          borderTop: `3px solid ${isHot ? "#f97316" : "#38bdf8"}`,
          borderLeft: `3px solid ${isHot ? "#f97316" : "#38bdf8"}`,
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 95,
          right: 45,
          width: 26,
          height: 26,
          borderTop: `3px solid ${isHot ? "#f97316" : "#38bdf8"}`,
          borderRight: `3px solid ${isHot ? "#f97316" : "#38bdf8"}`,
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
};
