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

export const BitcoinScene: React.FC<{
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
  badgeColor = "#F59E0B", // Bitcoin Gold
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
      translateY = interpolate(progress, [0, 1], [14, -18]);
      break;
    case "drift-down":
      scale = 1.08;
      translateY = interpolate(progress, [0, 1], [-18, 14]);
      break;
    case "drift-right":
      scale = 1.09;
      translateX = interpolate(progress, [0, 1], [-18, 18]);
      break;
    case "drift-left":
      scale = 1.09;
      translateX = interpolate(progress, [0, 1], [18, -18]);
      break;
  }

  // Scene Badge Spring Entrance (Elevated at bottom: 530px, 24px)
  const badgeSpring = spring({
    frame: frame - 4,
    fps: 30,
    config: { damping: 14, stiffness: 180 },
  });

  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [24, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#060B14" }}>
      {/* Dynamic Cinematic Artwork with Motion */}
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

      {/* Cyberpunk & Gold Vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6, 11, 20, 0.70) 0%, rgba(6, 11, 20, 0.05) 20%, rgba(6, 11, 20, 0.10) 65%, rgba(6, 11, 20, 0.88) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Cryptographic Atmospheric Glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${badgeColor}18 0%, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Optional Children (Header HUD) */}
      {children}

      {/* Elevated Scene Badge (ALWAYS bottom: 530px, font size 24px) */}
      {badgeText && (
        <div
          style={{
            position: "absolute",
            bottom: 530,
            ...(badgePosition === "bottom-right"
              ? { right: 40 }
              : { left: 40 }),
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
            fontFamily,
            pointerEvents: "none",
            zIndex: 90,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(8, 12, 20, 0.92)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: `1.5px solid ${badgeColor}`,
              borderRadius: 24,
              padding: "10px 22px",
              boxShadow: `0 8px 30px rgba(0, 0, 0, 0.75), 0 0 20px ${badgeColor}40`,
            }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                backgroundColor: badgeColor,
                boxShadow: `0 0 10px ${badgeColor}`,
              }}
            />
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
              }}
            >
              {badgeText}
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
