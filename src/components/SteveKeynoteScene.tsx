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
  weights: ["600", "700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export type CameraMotion =
  | "zoom-in"
  | "zoom-out"
  | "drift-up"
  | "drift-down"
  | "drift-right"
  | "drift-left";

export const SteveKeynoteScene: React.FC<{
  readonly src: string;
  readonly motion?: CameraMotion;
  readonly badgeText?: string;
  readonly badgeColor?: string;
  readonly children?: React.ReactNode;
}> = ({
  src,
  motion = "zoom-in",
  badgeText,
  badgeColor = "#0071E3", // Apple Keynote Blue
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
      translateY = interpolate(progress, [0, 1], [0, -16]);
      break;
    case "zoom-out":
      scale = interpolate(progress, [0, 1], [1.14, 1.03]);
      translateY = interpolate(progress, [0, 1], [-14, 0]);
      break;
    case "drift-up":
      scale = 1.07;
      translateY = interpolate(progress, [0, 1], [12, -16]);
      break;
    case "drift-down":
      scale = 1.07;
      translateY = interpolate(progress, [0, 1], [-16, 12]);
      break;
    case "drift-right":
      scale = 1.08;
      translateX = interpolate(progress, [0, 1], [-16, 16]);
      break;
    case "drift-left":
      scale = 1.08;
      translateX = interpolate(progress, [0, 1], [16, -16]);
      break;
  }

  // Keynote Chapter Badge Spring Animation (Smooth & Subtle)
  const badgeSpring = spring({
    frame: frame - 4,
    fps: 30,
    config: { damping: 16, stiffness: 180 },
  });

  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#06080C" }}>
      {/* Dynamic Keynote Artwork with Smooth Camera Flow */}
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

      {/* Cupertino Deep Glass Vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(8, 10, 16, 0.75) 0%, rgba(8, 10, 16, 0.05) 18%, rgba(8, 10, 16, 0.12) 64%, rgba(8, 10, 16, 0.90) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient Specular Studio Light */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "8%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${badgeColor}16 0%, transparent 68%)`,
          filter: "blur(65px)",
          pointerEvents: "none",
        }}
      />

      {/* Children Elements (Dynamic Island Top HUD) */}
      {children}

      {/* Apple Keynote Floating Chapter Pill (Elevated at bottom: 500px, 22px) */}
      {badgeText && (
        <div
          style={{
            position: "absolute",
            bottom: 500,
            left: 44,
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
            fontFamily,
            pointerEvents: "none",
            zIndex: 95,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(16, 18, 24, 0.86)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              borderRadius: 22,
              padding: "9px 20px",
              boxShadow:
                "0 8px 30px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
            }}
          >
            {/* Apple Keynote Accent Dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: badgeColor,
                boxShadow: `0 0 10px ${badgeColor}`,
              }}
            />
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "1px",
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
