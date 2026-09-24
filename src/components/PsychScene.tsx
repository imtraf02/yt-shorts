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

export const PsychScene: React.FC<{
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
  badgeColor = "#10b981",
  badgePosition = "bottom-right",
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Progress from 0 to 1 across the sequence duration
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
      translateY = interpolate(progress, [0, 1], [-15, 0]);
      break;
    case "drift-up":
      scale = 1.08;
      translateY = interpolate(progress, [0, 1], [15, -25]);
      break;
    case "drift-down":
      scale = 1.08;
      translateY = interpolate(progress, [0, 1], [-20, 15]);
      break;
    case "drift-right":
      scale = 1.09;
      translateX = interpolate(progress, [0, 1], [-20, 15]);
      break;
    case "drift-left":
      scale = 1.09;
      translateX = interpolate(progress, [0, 1], [15, -20]);
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
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#080c14" }}>
      {/* Background Illustrated Image with Camera Motion */}
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
            objectPosition: "center",
          }}
        />
      </div>

      {/* Top Gradient Vignette (for HUD contrast) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 380,
          background:
            "linear-gradient(180deg, rgba(5, 8, 15, 0.88) 0%, rgba(5, 8, 15, 0.5) 55%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Bottom Gradient Vignette (for floating subtitles contrast) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 520,
          background:
            "linear-gradient(0deg, rgba(5, 8, 15, 0.92) 0%, rgba(5, 8, 15, 0.65) 50%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Subtle edge vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.55)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />

      {/* Contextual Floating Scene Badge */}
      {badgeText && (
        <div
          style={{
            position: "absolute",
            bottom: 430,
            ...(badgePosition === "bottom-right"
              ? { right: 36 }
              : { left: 36 }),
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
            backgroundColor: "rgba(10, 15, 29, 0.78)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1.5px solid ${badgeColor}66`,
            borderRadius: 24,
            padding: "8px 16px",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: `0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px ${badgeColor}33`,
            fontFamily,
            pointerEvents: "none",
            zIndex: 150,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: badgeColor,
              boxShadow: `0 0 8px ${badgeColor}`,
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: 0.8,
              textTransform: "uppercase",
            }}
          >
            {badgeText}
          </span>
        </div>
      )}

      {/* Optional Child Overlays (like HUD) */}
      {children}
    </AbsoluteFill>
  );
};
