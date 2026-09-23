import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";

const { fontFamily: robotoMonoFont } = loadRobotoMono("normal", {
  weights: ["600", "700"],
  subsets: ["vietnamese", "latin"],
});

export type BackgroundTheme = "dark-lab" | "deep-blueprint" | "warm-paper";

export interface AnimatedBackgroundProps {
  readonly theme?: BackgroundTheme;
  readonly showGrid?: boolean;
  readonly showBrainwave?: boolean;
  readonly showParticles?: boolean;
  readonly showRadar?: boolean;
  readonly showScanline?: boolean;
  readonly showConnectingLines?: boolean;
  readonly showBackgroundCollage?: boolean;
}

// Deterministic pseudo-random number generator for consistent Remotion rendering
const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
};

export const AnimatedResearchBackground: React.FC<AnimatedBackgroundProps> = ({
  theme = "dark-lab",
  showGrid = true,
  showBrainwave = true,
  showParticles = true,
  showRadar = true,
  showScanline = true,
  showConnectingLines = true,
  showBackgroundCollage = true,
}) => {
  const frame = useCurrentFrame();
  const { width = 1080, height = 1920 } = useVideoConfig();

  // Subtle breathing & camera drift
  const cameraDriftX = Math.sin(frame * 0.012) * 8;
  const cameraDriftY = Math.cos(frame * 0.009) * 10;
  const gridPanX = (frame * 0.35) % 60;
  const gridPanY = (frame * 0.25) % 60;

  // Moving ambient lights (dynamic studio aurora)
  const orb1X = 260 + Math.sin(frame * 0.015) * 80;
  const orb1Y = 380 + Math.cos(frame * 0.018) * 60;
  const orb2X = 820 + Math.cos(frame * 0.014) * 90;
  const orb2Y = 960 + Math.sin(frame * 0.017) * 80;
  const orb3X = 420 + Math.sin(frame * 0.011) * 70;
  const orb3Y = 1520 + Math.cos(frame * 0.013) * 60;

  // Pulsing energy cycles
  const pulseA = 0.5 + 0.5 * Math.sin(frame * 0.04);
  const pulseB = 0.5 + 0.5 * Math.sin(frame * 0.06 + 1.2);

  // Scanline vertical sweep (repeats every 140 frames ~ 4.6s)
  const scanlineY = (frame * 12) % (height + 300) - 150;

  // Pre-generate deterministic particle data (26 particles)
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const baseX = pseudoRandom(i * 13 + 1) * width;
      const baseY = pseudoRandom(i * 17 + 2) * height;
      const speed = 0.6 + pseudoRandom(i * 19 + 3) * 1.4;
      const size = 2.5 + pseudoRandom(i * 23 + 4) * 4;
      const baseOpacity = 0.18 + pseudoRandom(i * 29 + 5) * 0.45;
      const swaySpeed = 0.018 + pseudoRandom(i * 31 + 6) * 0.025;
      const swayAmount = 14 + pseudoRandom(i * 37 + 7) * 22;
      const colorType = i % 3; // 0: violet, 1: cyan, 2: amber
      return {
        baseX,
        baseY,
        speed,
        size,
        baseOpacity,
        swaySpeed,
        swayAmount,
        colorType,
      };
    });
  }, [width, height]);

  // Procedural EEG / Circadian Sine Wave Path (Mid-layer)
  const wavePoints = useMemo(() => {
    const points: string[] = [];
    const step = 28;
    const waveY = 820;

    for (let x = -50; x <= width + 50; x += step) {
      const primary = Math.sin(x * 0.007 + frame * 0.035) * 38;
      const secondary = Math.sin(x * 0.02 - frame * 0.05) * 14;
      const tertiary = Math.cos(x * 0.04 + frame * 0.025) * 6;
      const y = waveY + primary + secondary + tertiary;
      points.push(`${x},${y.toFixed(1)}`);
    }

    return points.join(" ");
  }, [frame, width]);

  // Secondary Lower Wave Path (Lower-third NREM / Delta rhythm)
  const lowerWavePoints = useMemo(() => {
    const points: string[] = [];
    const step = 32;
    const waveY = 1360;

    for (let x = -50; x <= width + 50; x += step) {
      const slow = Math.sin(x * 0.005 + frame * 0.02) * 24;
      const ripple = Math.sin(x * 0.018 - frame * 0.03) * 8;
      const y = waveY + slow + ripple;
      points.push(`${x},${y.toFixed(1)}`);
    }

    return points.join(" ");
  }, [frame, width]);

  // Current focal point of the moving brainwave scan
  const waveScanX = (frame * 5) % (width + 200) - 100;
  const waveScanY =
    820 +
    Math.sin(waveScanX * 0.007 + frame * 0.035) * 38 +
    Math.sin(waveScanX * 0.02 - frame * 0.05) * 14;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: theme === "warm-paper" ? "#d8d3c5" : "#080c16",
        fontFamily: `${robotoMonoFont}, monospace`,
      }}
    >
      {/* 1. Base Gradient Canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            theme === "warm-paper"
              ? "radial-gradient(circle at 50% 25%, #eae6d9 0%, #d8d3c5 60%, #b8b19f 100%)"
              : "radial-gradient(ellipse at 50% 30%, #111a2e 0%, #090d18 55%, #04060c 100%)",
        }}
      />

      {/* 2. Dynamic Ambient Auroras / Glowing Orbs */}
      {theme !== "warm-paper" && (
        <div
          style={{
            position: "absolute",
            inset: -100,
            opacity: 0.85,
            pointerEvents: "none",
          }}
        >
          {/* Violet Sleep Depth Aura */}
          <div
            style={{
              position: "absolute",
              left: orb1X,
              top: orb1Y,
              width: 580,
              height: 580,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(147, 51, 234, 0.12) 50%, transparent 70%)",
              transform: `scale(${1 + pulseA * 0.15})`,
            }}
          />

          {/* Electric Cyan REM Aura */}
          <div
            style={{
              position: "absolute",
              left: orb2X,
              top: orb2Y,
              width: 520,
              height: 520,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(14, 165, 233, 0.1) 50%, transparent 70%)",
              transform: `scale(${1 + pulseB * 0.18})`,
            }}
          />

          {/* Amber Circadian Sunset Glow */}
          <div
            style={{
              position: "absolute",
              left: orb3X,
              top: orb3Y,
              width: 620,
              height: 620,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)",
              transform: `scale(${1.1 - pulseA * 0.12})`,
            }}
          />
        </div>
      )}

      {/* 3. Infinite Parallax Grid & Coordinate Markers */}
      {showGrid && (
        <div
          style={{
            position: "absolute",
            inset: -80,
            transform: `translate(${cameraDriftX}px, ${cameraDriftY}px)`,
            opacity: theme === "warm-paper" ? 0.35 : 0.45,
            pointerEvents: "none",
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              {/* Fine Micro-Grid */}
              <pattern
                id="tech-micro-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(${gridPanX}, ${gridPanY})`}
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke={theme === "warm-paper" ? "rgba(40, 50, 45, 0.2)" : "rgba(148, 163, 184, 0.12)"}
                  strokeWidth="1"
                />
                {/* Dot at intersection */}
                <circle
                  cx="0"
                  cy="0"
                  r="1.5"
                  fill={theme === "warm-paper" ? "rgba(180, 83, 9, 0.3)" : "rgba(56, 189, 248, 0.35)"}
                />
              </pattern>

              {/* Major Coordinate Grid */}
              <pattern
                id="tech-macro-grid"
                width="240"
                height="240"
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(${gridPanX}, ${gridPanY})`}
              >
                <rect width="240" height="240" fill="none" />
                <path
                  d="M 240 0 L 0 0 0 240"
                  fill="none"
                  stroke={theme === "warm-paper" ? "rgba(40, 50, 45, 0.35)" : "rgba(168, 85, 247, 0.22)"}
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
                {/* Precision Crosshair (+) at intersection */}
                <path
                  d="M -10 0 L 10 0 M 0 -10 L 0 10"
                  stroke={theme === "warm-paper" ? "#b45309" : "#38bdf8"}
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#tech-micro-grid)" />
            <rect width="100%" height="100%" fill="url(#tech-macro-grid)" />
          </svg>
        </div>
      )}

      {/* 4. Scientific Circadian Clock / Orbital Reticle (Top-Right Blueprint) */}
      {showRadar && (
        <div
          style={{
            position: "absolute",
            top: 195,
            right: 25,
            width: 270,
            height: 270,
            pointerEvents: "none",
            opacity: theme === "warm-paper" ? 0.35 : 0.42,
            transform: `translate(${cameraDriftX * 0.6}px, ${cameraDriftY * 0.6}px)`,
          }}
        >
          <svg width="270" height="270" viewBox="0 0 320 320">
            {/* Outer Rotating Ring */}
            <circle
              cx="160"
              cy="160"
              r="135"
              fill="none"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeDasharray="8 6 2 6"
              style={{
                transform: `rotate(${frame * 0.25}deg)`,
                transformOrigin: "160px 160px",
              }}
            />

            {/* Inner Precision Ring */}
            <circle
              cx="160"
              cy="160"
              r="105"
              fill="rgba(168, 85, 247, 0.03)"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="3 3"
              style={{
                transform: `rotate(${-frame * 0.18}deg)`,
                transformOrigin: "160px 160px",
              }}
            />

            {/* Active Sweeping Sonar Needle */}
            <line
              x1="160"
              y1="160"
              x2="160"
              y2="28"
              stroke="#38bdf8"
              strokeWidth="2"
              style={{
                transform: `rotate(${frame * 1.6}deg)`,
                transformOrigin: "160px 160px",
                filter: "drop-shadow(0 0 6px #38bdf8)",
              }}
            />

            {/* 24-Hour Markers */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 160 + Math.cos(rad) * 125;
              const y1 = 160 + Math.sin(rad) * 125;
              const x2 = 160 + Math.cos(rad) * 135;
              const y2 = 160 + Math.sin(rad) * 135;
              return (
                <line
                  key={idx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
              );
            })}

            {/* Center Crosshair and Reticle Target */}
            <line x1="160" y1="135" x2="160" y2="185" stroke="#facc15" strokeWidth="1.5" />
            <line x1="135" y1="160" x2="185" y2="160" stroke="#facc15" strokeWidth="1.5" />
            <circle cx="160" cy="160" r="18" fill="none" stroke="#facc15" strokeWidth="1.5" />
            <circle cx="160" cy="160" r="3" fill="#facc15" />

            {/* Orbiting Circadian Satellite Marker */}
            <g
              style={{
                transform: `rotate(${frame * 0.7}deg)`,
                transformOrigin: "160px 160px",
              }}
            >
              <circle cx="160" cy="55" r="5" fill="#38bdf8" />
              <circle
                cx="160"
                cy="55"
                r="11"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1"
                opacity={pulseA}
              />
            </g>

            {/* Technical Sub-label */}
            <text
              x="160"
              y="225"
              fill="#94a3b8"
              fontSize="9"
              textAnchor="middle"
              letterSpacing="2"
              fontWeight="800"
            >
              CIRCADIAN LAB // 24H
            </text>
          </svg>
        </div>
      )}

      {/* 5. Deep Parallax Blueprint Schematics (Pure Technical Charts - No Photo Duplicates) */}
      {showBackgroundCollage && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {/* Schematic 1: Frequency Matrix (Deep Left) */}
          <div
            style={{
              position: "absolute",
              left: -100 + cameraDriftX * 1.6,
              top: 310 + cameraDriftY * 1.4,
              width: 440,
              height: 440,
              padding: 16,
              backgroundColor: "rgba(15, 23, 42, 0.45)",
              border: "1px solid rgba(168, 85, 247, 0.25)",
              borderRadius: 8,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.65)",
              opacity: 0.32,
              transform: "rotate(-6deg)",
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 12 }}>
              SYS // NEURAL FREQUENCY MATRIX
            </div>
            <svg width="100%" height="340" viewBox="0 0 400 340">
              <line x1="20" y1="40" x2="380" y2="40" stroke="rgba(168, 85, 247, 0.3)" strokeDasharray="4 4" />
              <line x1="20" y1="120" x2="380" y2="120" stroke="rgba(168, 85, 247, 0.3)" strokeDasharray="4 4" />
              <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(168, 85, 247, 0.3)" strokeDasharray="4 4" />
              <line x1="20" y1="280" x2="380" y2="280" stroke="rgba(168, 85, 247, 0.3)" strokeDasharray="4 4" />
              {/* Harmonic curve */}
              <path
                d="M 20 180 Q 110 40 200 180 T 380 180"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
              />
              <circle cx="200" cy="180" r="5" fill="#a855f7" />
              <text x="30" y="32" fill="#c084fc" fontSize="10">GAMMA (30-100 Hz)</text>
              <text x="30" y="112" fill="#c084fc" fontSize="10">BETA (13-30 Hz)</text>
              <text x="30" y="192" fill="#c084fc" fontSize="10">ALPHA (8-12 Hz)</text>
              <text x="30" y="272" fill="#c084fc" fontSize="10">DELTA (0.5-4 Hz)</text>
            </svg>
          </div>

          {/* Schematic 2: Neuro-Metric Grid (Deep Right) */}
          <div
            style={{
              position: "absolute",
              right: -110 - cameraDriftX * 1.5,
              top: 690 + cameraDriftY * 1.2,
              width: 420,
              height: 420,
              padding: 16,
              backgroundColor: "rgba(15, 23, 42, 0.42)",
              border: "1px solid rgba(56, 189, 248, 0.22)",
              borderRadius: 8,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.65)",
              opacity: 0.28,
              transform: "rotate(5deg)",
            }}
          >
            <div style={{ color: "#38bdf8", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 12 }}>
              NEURO-METRICS // LAB 03
            </div>
            <svg width="100%" height="320" viewBox="0 0 380 320">
              <circle cx="190" cy="160" r="110" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="3 3" />
              <circle cx="190" cy="160" r="70" fill="none" stroke="rgba(56, 189, 248, 0.35)" />
              <circle cx="190" cy="160" r="30" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="80" y1="160" x2="300" y2="160" stroke="rgba(56, 189, 248, 0.3)" />
              <line x1="190" y1="50" x2="190" y2="270" stroke="rgba(56, 189, 248, 0.3)" />
              <text x="190" y="295" fill="#38bdf8" fontSize="10" textAnchor="middle">REST STATE: 94.2%</text>
            </svg>
          </div>

          {/* Schematic 3: Circadian 24h Arc (Deep Bottom-Left) */}
          <div
            style={{
              position: "absolute",
              left: 120 - cameraDriftX * 1.3,
              top: 1390 - cameraDriftY * 1.5,
              width: 380,
              height: 380,
              padding: 14,
              backgroundColor: "rgba(15, 23, 42, 0.38)",
              border: "1px solid rgba(250, 204, 21, 0.2)",
              borderRadius: 8,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.65)",
              opacity: 0.24,
              transform: "rotate(2deg)",
            }}
          >
            <div style={{ color: "#facc15", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>
              CIRCADIAN CYCLE PHASES
            </div>
            <svg width="100%" height="300" viewBox="0 0 340 300">
              <path
                d="M 40 220 A 130 130 0 0 1 300 220"
                fill="none"
                stroke="rgba(250, 204, 21, 0.4)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <circle cx="170" cy="90" r="14" fill="#facc15" opacity="0.8" />
              <circle cx="170" cy="90" r="22" fill="none" stroke="#facc15" strokeWidth="1" opacity="0.4" />
              <text x="170" y="240" fill="#fef08a" fontSize="10" textAnchor="middle">13:00 - 15:00 // NAP WINDOW</text>
            </svg>
          </div>
        </div>
      )}

      {/* 6. Active Neural / Data Constellation Connecting Lines */}
      {showConnectingLines && (
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {/* Connecting line 1: between top card and brain */}
          <line
            x1={200 + cameraDriftX * 1.6}
            y1={420 + cameraDriftY * 1.4}
            x2={800 - cameraDriftX * 1.5}
            y2={800 + cameraDriftY * 1.2}
            stroke="rgba(168, 85, 247, 0.32)"
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeDashoffset={-frame * 1.5}
          />
          {/* Node dot 1 */}
          <circle
            cx={200 + cameraDriftX * 1.6}
            cy={420 + cameraDriftY * 1.4}
            r="4"
            fill="#a855f7"
          />
          <circle
            cx={200 + cameraDriftX * 1.6}
            cy={420 + cameraDriftY * 1.4}
            r="10"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.5"
            opacity={pulseA}
          />

          {/* Connecting line 2: between brain and bottom cycle */}
          <line
            x1={800 - cameraDriftX * 1.5}
            y1={800 + cameraDriftY * 1.2}
            x2={360 - cameraDriftX * 1.3}
            y2={1500 - cameraDriftY * 1.5}
            stroke="rgba(56, 189, 248, 0.28)"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeDashoffset={frame * 1.2}
          />
          {/* Node dot 2 */}
          <circle
            cx={800 - cameraDriftX * 1.5}
            cy={800 + cameraDriftY * 1.2}
            r="4"
            fill="#38bdf8"
          />
        </svg>
      )}

      {/* 7. Animated Brainwave (EEG Oscilloscope Stream) */}
      {showBrainwave && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            pointerEvents: "none",
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <linearGradient id="waveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.05" />
                <stop offset="25%" stopColor="#a855f7" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Secondary Harmonic Wave (Ghost trail) */}
            <polyline
              points={wavePoints}
              fill="none"
              stroke="rgba(168, 85, 247, 0.25)"
              strokeWidth="3.5"
              style={{
                transform: "translateY(12px)",
              }}
            />

            {/* Primary Neon Wave */}
            <polyline
              points={wavePoints}
              fill="none"
              stroke="url(#waveGlow)"
              strokeWidth="3"
              style={{
                filter: "drop-shadow(0 0 10px rgba(56, 189, 248, 0.75))",
              }}
            />

            {/* Lower-Third Rhythm Frequency Wave */}
            <polyline
              points={lowerWavePoints}
              fill="none"
              stroke="rgba(56, 189, 248, 0.45)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              style={{
                filter: "drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))",
              }}
            />

            {/* Moving Scanner Head / Cursor on the Wave */}
            <circle
              cx={waveScanX}
              cy={waveScanY}
              r="5"
              fill="#ffffff"
              style={{
                filter: "drop-shadow(0 0 12px #38bdf8)",
              }}
            />
            <circle
              cx={waveScanX}
              cy={waveScanY}
              r="14"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              opacity={pulseA}
            />

            {/* Telemetry Annotation Label */}
            <g transform={`translate(${Math.max(80, Math.min(width - 320, waveScanX - 100))}, ${waveScanY - 32})`}>
              <rect
                x="0"
                y="0"
                width="220"
                height="22"
                rx="4"
                fill="rgba(15, 23, 42, 0.85)"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeWidth="1"
              />
              <text
                x="110"
                y="15"
                fill="#38bdf8"
                fontSize="11"
                fontWeight="900"
                letterSpacing="1.2"
                textAnchor="middle"
              >
                DELTA BAND: 1.8 Hz // DEEP SLEEP
              </text>
            </g>
          </svg>
        </div>
      )}

      {/* 8. Floating Atmospheric Particles & Luminous Dust */}
      {showParticles && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {particles.map((p, idx) => {
            const currentY =
              ((p.baseY - frame * p.speed) % height + height) % height;
            const currentX =
              p.baseX + Math.sin(frame * p.swaySpeed + idx) * p.swayAmount;
            const opacity =
              p.baseOpacity * (0.6 + 0.4 * Math.sin(frame * 0.05 + idx * 2));
            const color =
              p.colorType === 0
                ? "#c084fc"
                : p.colorType === 1
                ? "#38bdf8"
                : "#fde047";

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
                  boxShadow: `0 0 ${p.size * 2.5}px ${color}`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 9. High-Tech Light Scanline Sweep */}
      {showScanline && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: scanlineY,
            height: 90,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.08) 50%, rgba(168, 85, 247, 0.22) 95%, rgba(255, 255, 255, 0.6) 100%)",
            pointerEvents: "none",
            boxShadow: "0 2px 20px rgba(56, 189, 248, 0.35)",
          }}
        />
      )}

      {/* 10. Precision Viewfinder Corner Brackets & Technical Rulers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {/* Left Edge Ruler Ticks */}
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 200,
            bottom: 300,
            width: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: 0.38,
            color: "#94a3b8",
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          {[
            "00 // BASE",
            "15 // ALPHA",
            "30 // THETA",
            "45 // DELTA",
            "60 // SPINDLE",
            "75 // SLOW",
            "90 // CYCLE",
          ].map((label, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: idx % 2 === 0 ? 14 : 7,
                  height: 1.5,
                  backgroundColor: "#38bdf8",
                }}
              />
              <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Top Safe-Zone Corner Brackets */}
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 45,
            width: 24,
            height: 24,
            borderTop: "3px solid rgba(168, 85, 247, 0.7)",
            borderLeft: "3px solid rgba(168, 85, 247, 0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 45,
            width: 24,
            height: 24,
            borderTop: "3px solid rgba(168, 85, 247, 0.7)",
            borderRight: "3px solid rgba(168, 85, 247, 0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 45,
            width: 24,
            height: 24,
            borderBottom: "3px solid rgba(168, 85, 247, 0.7)",
            borderLeft: "3px solid rgba(168, 85, 247, 0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 220,
            right: 45,
            width: 24,
            height: 24,
            borderBottom: "3px solid rgba(168, 85, 247, 0.7)",
            borderRight: "3px solid rgba(168, 85, 247, 0.7)",
          }}
        />

        {/* Header Telemetry Bar */}
        <div
          style={{
            position: "absolute",
            top: 55,
            left: 55,
            right: 55,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0.8,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 2,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Blinking REC dot */}
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                boxShadow: "0 0 10px #ef4444",
                opacity: (frame % 30 < 20) ? 1 : 0.3,
              }}
            />
            <span style={{ color: "#f8fafc" }}>REC // VOX RESEARCH LAB</span>

            {/* Mini Animated Brain Spectrum Bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 14, marginLeft: 6 }}>
              {[12, 18, 9, 22, 16, 20, 10, 17].map((h, i) => {
                const barH = Math.max(3, h * (0.35 + 0.65 * Math.sin(frame * 0.18 + i * 0.75)));
                return (
                  <div
                    key={i}
                    style={{
                      width: 2.5,
                      height: barH,
                      backgroundColor: i % 2 === 0 ? "#38bdf8" : "#c084fc",
                      borderRadius: 1,
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div style={{ color: "#38bdf8", display: "flex", alignItems: "center", gap: 8 }}>
            <span>SEQ: 0{Math.min(6, Math.floor((frame / 2650) * 6) + 1)} / 06</span>
          </div>
        </div>
      </div>

      {/* 11. Subtle Film Grain & Noise Overlay */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.055,
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      >
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>

      {/* 12. Deep Cinematic Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(3, 5, 10, 0.88) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
