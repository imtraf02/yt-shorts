import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export type CameraMotion =
  | "zoom-in"
  | "zoom-out"
  | "drift-up"
  | "drift-down"
  | "drift-right"
  | "drift-left"
  | "dramatic-zoom";

export const VanGoghScene: React.FC<{
  readonly src: string;
  readonly motion?: CameraMotion;
  readonly badgeText?: string;
  readonly children?: React.ReactNode;
}> = ({
  src,
  motion = "zoom-in",
  badgeText,
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, Math.max(0, frame / Math.max(1, durationInFrames)));

  let scale = 1.05;
  let translateX = 0;
  let translateY = 0;

  switch (motion) {
    case "zoom-in":
      scale = interpolate(progress, [0, 1], [1.02, 1.13]);
      translateY = interpolate(progress, [0, 1], [0, -18]);
      break;
    case "zoom-out":
      scale = interpolate(progress, [0, 1], [1.14, 1.03]);
      translateY = interpolate(progress, [0, 1], [-16, 0]);
      break;
    case "dramatic-zoom":
      scale = interpolate(progress, [0, 1], [1.05, 1.20]);
      translateY = interpolate(progress, [0, 1], [0, -28]);
      break;
    case "drift-up":
      scale = 1.07;
      translateY = interpolate(progress, [0, 1], [14, -18]);
      break;
    case "drift-down":
      scale = 1.07;
      translateY = interpolate(progress, [0, 1], [-18, 14]);
      break;
    case "drift-right":
      scale = 1.08;
      translateX = interpolate(progress, [0, 1], [-18, 18]);
      break;
    case "drift-left":
      scale = 1.08;
      translateX = interpolate(progress, [0, 1], [18, -18]);
      break;
  }

  // Smooth Badge spring entrance
  const badgeSpring = spring({
    frame: frame - 4,
    fps: 30,
    config: { damping: 16, stiffness: 180 },
  });

  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [22, 0]);

  // Subtle floating golden starlight & sunflower pollen particles
  const particles = Array.from({ length: 14 }).map((_, i) => {
    const seed = (i * 97) % 100;
    const xBase = (i * 75 + 40) % 1020;
    const speed = 0.35 + (seed % 5) * 0.12;
    const yPos = (seed * 19 + frame * speed * 2) % 1920;
    const opacity = 0.2 + 0.35 * Math.sin((frame + i * 22) * 0.08);
    const size = 3 + (i % 3) * 1.5;
    return { x: xBase, y: yPos, opacity, size };
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#050C1A" }}>
      {/* Artwork with Ken Burns Motion */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center center",
          position: "absolute",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Atmospheric Starry Night Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0, 0, 0, 0) 38%, rgba(5, 14, 30, 0.45) 70%, rgba(2, 6, 16, 0.94) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Deep Night Shadow for Subtitle Readability */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 720,
          background:
            "linear-gradient(to top, rgba(2, 6, 16, 0.96) 0%, rgba(4, 12, 28, 0.8) 45%, rgba(6, 18, 38, 0.2) 80%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Golden Stardust Particles */}
      {particles.map((p, idx) => (
        <div
          key={`particle-${idx}`}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: idx % 2 === 0 ? "#FDE68A" : "#BAE6FD",
            opacity: p.opacity,
            boxShadow:
              idx % 2 === 0
                ? "0 0 6px rgba(245, 158, 11, 0.85)"
                : "0 0 6px rgba(56, 189, 248, 0.85)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Elevated Contextual Scene Badge at bottom: 530px */}
      {badgeText && (
        <div
          style={{
            position: "absolute",
            bottom: 530,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 120,
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
            fontFamily,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "9px 24px",
              borderRadius: 9999,
              background: "rgba(5, 14, 34, 0.92)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(245, 158, 11, 0.65)",
              boxShadow:
                "0 8px 30px rgba(1, 4, 12, 0.9), inset 0 0 14px rgba(245, 158, 11, 0.22)",
              maxWidth: 960,
            }}
          >
            {/* Glowing Neon Dot Indicator */}
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#FBBF24",
                boxShadow: "0 0 8px #F59E0B, 0 0 14px #FEF08A",
                display: "inline-block",
                flexShrink: 0,
              }}
            />

            {/* Badge Text */}
            <span
              style={{
                color: "#FEF08A",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                textShadow: "0 2px 10px rgba(0,0,0,0.95)",
                lineHeight: 1,
              }}
            >
              {badgeText}
            </span>
          </div>
        </div>
      )}

      {children}
    </AbsoluteFill>
  );
};
