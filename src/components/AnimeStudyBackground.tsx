import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";

const { fontFamily: robotoMonoFont } = loadRobotoMono("normal", {
  weights: ["700"],
  subsets: ["vietnamese", "latin"],
});

interface AnimeStudyBackgroundProps {
  readonly mood?: "focus" | "alert" | "action" | "calm";
  readonly showSpeedLines?: boolean;
}

export const AnimeStudyBackground: React.FC<AnimeStudyBackgroundProps> = ({
  mood = "focus",
  showSpeedLines = false,
}) => {
  const frame = useCurrentFrame();

  // Vibrant, rich anime study palettes (clean, saturated, high luminance floor to prevent banding)
  const moodColors = {
    focus: {
      bgTop: "#121a36",
      bgMid: "#1a2750",
      bgBottom: "#0f162e",
      gridColor: "#38bdf8",
      accentGlow: "rgba(56, 189, 248, 0.30)", // cyan rim light
      secondaryGlow: "rgba(250, 204, 21, 0.25)", // warm desk lamp
      decalColor: "rgba(125, 211, 252, 0.35)",
    },
    alert: {
      bgTop: "#2a101b",
      bgMid: "#40182a",
      bgBottom: "#1f0c14",
      gridColor: "#ef4444",
      accentGlow: "rgba(239, 68, 68, 0.32)", // red alert
      secondaryGlow: "rgba(249, 115, 22, 0.25)", // warm orange
      decalColor: "rgba(252, 165, 165, 0.35)",
    },
    action: {
      bgTop: "#1e113b",
      bgMid: "#2e1a5a",
      bgBottom: "#160a2c",
      gridColor: "#c084fc",
      accentGlow: "rgba(168, 85, 247, 0.32)", // electric purple
      secondaryGlow: "rgba(250, 204, 21, 0.26)", // bright gold
      decalColor: "rgba(216, 180, 254, 0.35)",
    },
    calm: {
      bgTop: "#10262b",
      bgMid: "#183e47",
      bgBottom: "#0c1d22",
      gridColor: "#2dd4bf",
      accentGlow: "rgba(20, 184, 166, 0.30)", // anime teal
      secondaryGlow: "rgba(56, 189, 248, 0.24)", // sky blue
      decalColor: "rgba(153, 246, 228, 0.35)",
    },
  }[mood];

  // Floating anime dust motes / sparkles (clean and smooth drifting, no strobing)
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const baseX = ((i * 59) % 960) + 60;
      const speed = 0.8 + ((i * 31) % 40) / 40;
      const size = 3 + ((i * 13) % 4);
      const seed = i * 137;
      const color =
        i % 3 === 0 ? "#fde047" : i % 3 === 1 ? "#38bdf8" : "#e879f9";
      return { baseX, speed, size, seed, color };
    });
  }, []);

  const ambientPulse = Math.sin((frame / 30) * 1.2) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: moodColors.bgTop,
        overflow: "hidden",
        fontFamily: robotoMonoFont,
      }}
    >
      {/* 1. Base Studio Gradient - Rich, saturated, never pitch black */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 95% 75% at 50% 25%, ${moodColors.bgMid} 0%, ${moodColors.bgTop} 60%, ${moodColors.bgBottom} 100%)`,
        }}
      />

      {/* 2. Manga / Tech Dot Grid Pattern (eliminates 8-bit color banding) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.22,
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id={`anime-dot-grid-${mood}`}
              width="44"
              height="44"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="22" cy="22" r="1.5" fill={moodColors.gridColor} />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#anime-dot-grid-${mood})`}
          />
        </svg>
      </div>

      {/* 3. Warm Desk Lamp / Spotlight Aura (Top-Right) */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${moodColors.secondaryGlow} 0%, rgba(0,0,0,0) 70%)`,
          transform: `scale(${ambientPulse})`,
          pointerEvents: "none",
        }}
      />

      {/* 4. Cool Accent Backlight Glow (Bottom-Left) */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: -120,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${moodColors.accentGlow} 0%, rgba(0,0,0,0) 70%)`,
          transform: `scale(${ambientPulse})`,
          pointerEvents: "none",
        }}
      />

      {/* 5. Center Spotlight Behind Cards */}
      <div
        style={{
          position: "absolute",
          top: "43%",
          left: "50%",
          width: 900,
          height: 1000,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(0,0,0,0) 75%)",
          pointerEvents: "none",
        }}
      />

      {/* 6. Desk Surface Horizon Shadow (y: 1350 to bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 580,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.60) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 7. Anime Graphic Watermarks & Framing Brackets */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          color: moodColors.decalColor,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        {/* Top Framing Brackets */}
        <div style={{ position: "absolute", top: 40, left: 56 }}>
          ┌ MIND_HACK // 03 ┐
        </div>
        <div style={{ position: "absolute", top: 40, right: 56 }}>
          [ BEHAVIORAL OVERRIDE ]
        </div>

        {/* Mid-stage horizontal dashed divider line at y=1360 */}
        <div
          style={{
            position: "absolute",
            top: 1360,
            left: 56,
            right: 56,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: 0.45,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: `repeating-linear-gradient(to right, ${moodColors.gridColor}, ${moodColors.gridColor} 6px, transparent 6px, transparent 14px)`,
            }}
          />
          <div style={{ fontSize: 11, letterSpacing: 1.5 }}>
            FOCUS STAGE // AUDIO SYNC
          </div>
          <div
            style={{
              flex: 1,
              height: 1,
              background: `repeating-linear-gradient(to right, ${moodColors.gridColor}, ${moodColors.gridColor} 6px, transparent 6px, transparent 14px)`,
            }}
          />
        </div>

        {/* Bottom Decals */}
        <div style={{ position: "absolute", bottom: 180, left: 56 }}>
          DOPAMINE DETOX // FOCUS SPRINTS
        </div>
        <div style={{ position: "absolute", bottom: 180, right: 56 }}>
          NO EXCUSES PROTOCOL
        </div>
      </div>

      {/* 8. Dynamic Anime Speed / Action Burst Lines */}
      {showSpeedLines && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: 0.52,
          }}
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const baseAngle = (i * 360) / 28;
            // Smooth slow rotation instead of rapid jitter
            const currentAngle = (baseAngle + frame * 0.25) % 360;
            const rad = (currentAngle * Math.PI) / 180;
            const cx = 540;
            const cy = 720;
            const innerR = 480 + ((i * 23) % 60);
            const outerR = 1350;
            const x1 = cx + innerR * Math.cos(rad);
            const y1 = cy + innerR * Math.sin(rad);
            const x2 = cx + outerR * Math.cos(rad);
            const y2 = cy + outerR * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 2 === 0 ? "#fde047" : "#38bdf8"}
                strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
                strokeOpacity={0.7}
              />
            );
          })}
        </svg>
      )}

      {/* 9. Floating Anime Sparks / Dust Particles */}
      {particles.map((p, idx) => {
        const yOffset = ((frame * p.speed * 1.4 + p.seed) % 2000) - 80;
        const currentY = 1920 - yOffset;
        const wobble = Math.sin(frame / 22 + p.seed) * 20;
        const currentX = p.baseX + wobble;
        const opacity = interpolate(
          currentY,
          [0, 160, 1680, 1920],
          [0, 0.8, 0.8, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

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
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              opacity,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
