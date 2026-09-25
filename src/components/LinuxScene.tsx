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
  | "drift-left";

export const LinuxScene: React.FC<{
  readonly src: string;
  readonly motion?: CameraMotion;
  readonly badgeText?: string;
  readonly badgeColor?: string;
  readonly badgePosition?: "bottom-right" | "bottom-left";
  readonly children?: React.ReactNode;
}> = ({
  src,
  motion = "zoom-in",
  badgeText,
  badgeColor = "#10B981", // Terminal Emerald Green
  badgePosition = "bottom-right",
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
      scale = interpolate(progress, [0, 1], [1.02, 1.14]);
      translateY = interpolate(progress, [0, 1], [0, -18]);
      break;
    case "zoom-out":
      scale = interpolate(progress, [0, 1], [1.15, 1.03]);
      translateY = interpolate(progress, [0, 1], [-16, 0]);
      break;
    case "drift-up":
      scale = 1.08;
      translateY = interpolate(progress, [0, 1], [16, -22]);
      break;
    case "drift-down":
      scale = 1.08;
      translateY = interpolate(progress, [0, 1], [-20, 14]);
      break;
    case "drift-right":
      scale = 1.09;
      translateX = interpolate(progress, [0, 1], [-20, 16]);
      break;
    case "drift-left":
      scale = 1.09;
      translateX = interpolate(progress, [0, 1], [16, -20]);
      break;
  }

  // Badge entrance animation
  const badgeEntrance = spring({
    frame: Math.max(0, frame - 8),
    fps: 30,
    config: { damping: 13, stiffness: 200 },
  });

  const badgeScale = interpolate(badgeEntrance, [0, 1], [0.85, 1]);
  const badgeOpacity = interpolate(badgeEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#090D12" }}>
      {/* Background Illustrated Image with Smooth Camera Motion */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.94) contrast(1.06) saturate(1.05)",
          }}
        />
      </div>

      {/* Terminal Hacker Atmosphere Tint: Emerald & Electric Cyan */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 50%, rgba(9, 13, 18, 0.75) 100%)",
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />

      {/* Top Gradient Vignette (protects HUD readability) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 380,
          background:
            "linear-gradient(180deg, rgba(9, 13, 18, 0.90) 0%, rgba(9, 13, 18, 0.50) 55%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Bottom Gradient Vignette (protects subtitles readability) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 520,
          background:
            "linear-gradient(0deg, rgba(9, 13, 18, 0.94) 0%, rgba(9, 13, 18, 0.65) 50%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Contextual Floating Scene Badge (Elevated to bottom 530px, fontSize 24px) */}
      {badgeText && (
        <div
          style={{
            position: "absolute",
            bottom: 530,
            ...(badgePosition === "bottom-right"
              ? { right: 36 }
              : { left: 36 }),
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
            backgroundColor: "rgba(9, 13, 18, 0.88)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: `1.5px solid ${badgeColor}aa`,
            borderRadius: 30,
            padding: "10px 22px",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px ${badgeColor}44`,
            fontFamily,
            pointerEvents: "none",
            zIndex: 150,
          }}
        >
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              backgroundColor: badgeColor,
              boxShadow: `0 0 10px ${badgeColor}`,
            }}
          />
          <span
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: 0.8,
              textTransform: "uppercase",
            }}
          >
            {badgeText}
          </span>
        </div>
      )}

      {/* Optional Child Overlays */}
      {children}
    </AbsoluteFill>
  );
};
