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
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

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

export const NobelScene: React.FC<{
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

  // Smooth Victorian Archival Badge spring entrance
  const badgeSpring = spring({
    frame: frame - 4,
    fps: 30,
    config: { damping: 16, stiffness: 180 },
  });

  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [22, 0]);

  // Subtle deterministic floating gold dust / candle ember particles (Remotion safe)
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const seed = (i * 97) % 100;
    const xBase = (i * 85 + 40) % 1000;
    const speed = 0.4 + (seed % 5) * 0.15;
    const yPos = (seed * 18 + frame * speed * 2) % 1920;
    const opacity = 0.25 + 0.35 * Math.sin((frame + i * 20) * 0.08);
    const size = 3 + (i % 3) * 1.5;
    return { x: xBase, y: yPos, opacity, size };
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#08070A" }}>
      {/* Artwork with Smooth Ken Burns Motion */}
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

      {/* Atmospheric Victorian Archival Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0, 0, 0, 0) 40%, rgba(12, 10, 15, 0.45) 70%, rgba(6, 5, 8, 0.92) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle Bottom Shade for Subtitle Readability */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 720,
          background:
            "linear-gradient(to top, rgba(6, 5, 8, 0.95) 0%, rgba(8, 7, 10, 0.75) 45%, rgba(10, 8, 12, 0.2) 80%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Gold Leaf / Ember Dust */}
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
            backgroundColor: "#FDE68A",
            opacity: p.opacity,
            boxShadow: "0 0 6px rgba(245, 158, 11, 0.8)",
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
              background: "rgba(18, 15, 22, 0.92)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(212, 175, 55, 0.55)",
              boxShadow:
                "0 8px 30px rgba(0, 0, 0, 0.9), inset 0 0 12px rgba(212, 175, 55, 0.2)",
              maxWidth: 960,
            }}
          >
            {/* Glowing Gold Insignia */}
            <span
              style={{
                fontSize: 22,
                color: "#F59E0B",
                filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.9))",
                lineHeight: 1,
              }}
            >
              ⚜️
            </span>

            {/* Badge Text */}
            <span
              style={{
                color: "#FDE047",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
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
