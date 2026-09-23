import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";

const { fontFamily: robotoMonoFont } = loadRobotoMono("normal", {
  weights: ["600", "700"],
  subsets: ["vietnamese", "latin"],
});

const { fontFamily: notesFont } = loadCaveat("normal", {
  weights: ["700"],
  subsets: ["latin"],
});

export type ThermalMode = "winter-cold" | "summer-hot";

export interface ThermalInvestigationBackgroundProps {
  readonly mode?: ThermalMode;
  readonly showParticles?: boolean;
  readonly showIsotherms?: boolean;
}

const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
};

export const ThermalInvestigationBackground: React.FC<ThermalInvestigationBackgroundProps> = ({
  mode = "winter-cold",
  showParticles = true,
  showIsotherms = true,
}) => {
  const frame = useCurrentFrame();
  const { width = 1080, height = 1920 } = useVideoConfig();

  const isHot = mode === "summer-hot";

  // Gentle camera drift
  const driftX = Math.sin(frame * 0.012) * 6;
  const driftY = Math.cos(frame * 0.009) * 8;

  // Ambient thermal breathing light
  const lightPulse = 0.5 + 0.5 * Math.sin(frame * 0.035);

  // Floating particles: Frost crystals (cold) vs Embers (hot)
  const particles = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      const baseX = pseudoRandom(i * 17 + 2) * width;
      const baseY = pseudoRandom(i * 23 + 4) * height;
      const speed = 0.6 + pseudoRandom(i * 31 + 6) * 1.5;
      const size = 3 + pseudoRandom(i * 37 + 8) * 5;
      const opacity = 0.25 + pseudoRandom(i * 41 + 10) * 0.5;
      const swaySpeed = 0.015 + pseudoRandom(i * 47 + 12) * 0.025;
      const swayAmount = 18 + pseudoRandom(i * 53 + 14) * 24;
      return { baseX, baseY, speed, size, opacity, swaySpeed, swayAmount };
    });
  }, [width, height]);

  // Isothermal dynamic contour lines (Đường đẳng nhiệt)
  const isothermPaths = useMemo(() => {
    const paths: string[] = [];
    const baseLevels = [450, 750, 1050, 1350, 1650];

    for (const base of baseLevels) {
      const pts: string[] = [];
      for (let x = -50; x <= width + 50; x += 35) {
        const yOffset =
          Math.sin(x * 0.006 + frame * 0.025 + base * 0.01) * 35 +
          Math.cos(x * 0.015 - frame * 0.03) * 15;
        pts.push(`${x},${(base + yOffset).toFixed(1)}`);
      }
      paths.push(pts.join(" "));
    }
    return paths;
  }, [frame, width]);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: isHot ? "#1a0804" : "#080e1c",
        fontFamily: robotoMonoFont,
      }}
    >
      {/* 1. Base Craft / Workshop Surface Gradient with Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isHot
            ? "radial-gradient(ellipse at 50% 35%, #2c0f08 0%, #1c0904 55%, #0f0402 100%)"
            : "radial-gradient(ellipse at 50% 30%, #111e38 0%, #0a1324 55%, #040810 100%)",
        }}
      />

      {/* 2. Soft Ambient Radial Light Pool */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          width: 850,
          height: 850,
          transform: `translate(-50%, -50%) scale(${1 + lightPulse * 0.12})`,
          background: isHot
            ? "radial-gradient(circle, rgba(249, 115, 22, 0.28) 0%, rgba(234, 88, 12, 0.08) 50%, transparent 75%)"
            : "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(2, 132, 199, 0.08) 50%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Subtle Dot Matrix Texture */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          transform: `translate(${driftX}px, ${driftY}px)`,
          opacity: 0.22,
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="dot-grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="20"
                cy="20"
                r="1.5"
                fill={isHot ? "#fb923c" : "#7dd3fc"}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid-pattern)" />
        </svg>
      </div>

      {/* 4. Animated Isothermal Contours (Đường Đẳng Nhiệt) */}
      {showIsotherms && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.35 }}>
          <svg width="100%" height="100%">
            {isothermPaths.map((pathPoints, idx) => (
              <polyline
                key={idx}
                points={pathPoints}
                fill="none"
                stroke={isHot ? (idx % 2 === 0 ? "#f97316" : "#fbbf24") : (idx % 2 === 0 ? "#38bdf8" : "#818cf8")}
                strokeWidth={idx % 2 === 0 ? "2" : "1.5"}
                strokeDasharray={idx % 2 === 0 ? "8 6" : "4 4"}
              />
            ))}
          </svg>
        </div>
      )}

      {/* 5. Handwritten Scientific Formulas on Desk Surface */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.16,
          fontFamily: notesFont,
          color: isHot ? "#fed7aa" : "#bae6fd",
        }}
      >
        <div style={{ position: "absolute", top: 180, left: 60, fontSize: 32, transform: "rotate(-3deg)" }}>
          Fourier: q = -k · ∇T
        </div>
        <div style={{ position: "absolute", top: 220, right: 60, fontSize: 28, transform: "rotate(2deg)" }}>
          ΔQ / Δt = k · A · (T₁ - T₂) / d
        </div>
        <div style={{ position: "absolute", top: 820, left: 40, fontSize: 30, transform: "rotate(-4deg)" }}>
          k(metal) ≈ 400 W/m·K
        </div>
        <div style={{ position: "absolute", top: 860, right: 40, fontSize: 30, transform: "rotate(3deg)" }}>
          k(wood) ≈ 0.15 W/m·K
        </div>
        <div style={{ position: "absolute", bottom: 420, left: 60, fontSize: 32, transform: "rotate(-2deg)" }}>
          Skin Thermoreceptors: Heat Flux Sensibility
        </div>
      </div>

      {/* 6. Floating Ambient Particles (Frost vs Embers) */}
      {showParticles && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {particles.map((p, idx) => {
            const currentY = ((p.baseY - frame * p.speed) % height + height) % height;
            const currentX = p.baseX + Math.sin(frame * p.swaySpeed + idx) * p.swayAmount;
            const color = isHot
              ? idx % 2 === 0 ? "#f97316" : "#fde047"
              : idx % 2 === 0 ? "#38bdf8" : "#e0f2fe";

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: currentX,
                  top: currentY,
                  width: p.size,
                  height: p.size,
                  borderRadius: isHot ? "50%" : idx % 3 === 0 ? "2px" : "50%",
                  backgroundColor: color,
                  opacity: p.opacity * (0.6 + 0.4 * Math.sin(frame * 0.06 + idx)),
                  transform: !isHot ? `rotate(${frame * 2 + idx * 20}deg)` : undefined,
                  boxShadow: `0 0 ${p.size * 2.5}px ${color}`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 7. Precision Edge Rulers */}
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 180,
          bottom: 260,
          width: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: 0.3,
          color: isHot ? "#fb923c" : "#38bdf8",
          fontSize: 9,
          fontWeight: 800,
          pointerEvents: "none",
        }}
      >
        {[
          isHot ? "+50°C" : "-10°C",
          isHot ? "+40°C" : "-5°C",
          isHot ? "+30°C" : "0°C",
          isHot ? "+20°C" : "+5°C",
          isHot ? "+10°C" : "+10°C",
        ].map((t, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 1.5, backgroundColor: isHot ? "#f97316" : "#38bdf8" }} />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
