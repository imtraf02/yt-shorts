import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface CinematicSceneProps {
  readonly src: string;
  readonly zoomDirection?: "in" | "out";
  readonly mood?: "normal" | "danger" | "golden" | "burnout" | "focus";
  readonly badgeText?: string;
  readonly badgeColor?: string;
  readonly badgePosition?: "top-right" | "bottom-right" | "bottom-left";
  readonly children?: React.ReactNode;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  src,
  zoomDirection = "in",
  mood = "normal",
  badgeText,
  badgeColor = "#f97316",
  badgePosition = "bottom-right",
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Smooth continuous cinematic Ken Burns zoom
  const scale =
    zoomDirection === "in"
      ? interpolate(frame, [0, durationInFrames], [1.0, 1.08], {
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [0, durationInFrames], [1.08, 1.0], {
          extrapolateRight: "clamp",
        });

  const translateY =
    zoomDirection === "in"
      ? interpolate(frame, [0, durationInFrames], [0, -18], {
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [0, durationInFrames], [-18, 0], {
          extrapolateRight: "clamp",
        });

  // Danger pulse for tiger chase scene
  const dangerPulse =
    mood === "danger"
      ? Math.sin((frame / 8) * Math.PI) * 0.35 + 0.65
      : 0;

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#080c14" }}>
      {/* Cinematic Full-Bleed Moving Artwork */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
          transition: "transform 0.05s linear",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter:
              mood === "burnout"
                ? "contrast(1.08) saturate(0.82) brightness(0.92)"
                : mood === "danger"
                ? "contrast(1.12) saturate(1.18)"
                : "contrast(1.05) saturate(1.08)",
          }}
        />
      </div>

      {/* Atmospheric Mood Glows */}
      {mood === "danger" && (
        <AbsoluteFill
          style={{
            boxShadow: `inset 0 0 120px rgba(239, 68, 68, ${dangerPulse * 0.6})`,
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
      )}

      {mood === "golden" && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(circle at 50% 25%, rgba(251, 146, 60, 0.18) 0%, transparent 65%)",
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
      )}

      {mood === "burnout" && (
        <AbsoluteFill
          style={{
            boxShadow: "inset 0 0 140px rgba(15, 23, 42, 0.8)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Top Header Dark Gradient (Ensures HUD is 100% readable) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 380,
          background:
            "linear-gradient(to bottom, rgba(5, 8, 18, 0.92) 0%, rgba(5, 8, 18, 0.6) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom Subtitles Dark Gradient (Ensures floating subtitles pop crisp) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 480,
          background:
            "linear-gradient(to top, rgba(5, 8, 18, 0.95) 0%, rgba(5, 8, 18, 0.72) 48%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Micro-Badge */}
      {badgeText && (
        <div
          style={{
            position: "absolute",
            top: badgePosition === "top-right" ? 220 : undefined,
            bottom: badgePosition !== "top-right" ? 440 : undefined,
            left: badgePosition === "bottom-left" ? 54 : undefined,
            right: badgePosition !== "bottom-left" ? 54 : undefined,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            backgroundColor: "rgba(10, 15, 28, 0.84)",
            backdropFilter: "blur(12px)",
            border: `1.5px solid ${badgeColor}`,
            borderRadius: 9999,
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1,
            boxShadow: `0 6px 24px rgba(0,0,0,0.7), 0 0 14px ${badgeColor}55`,
            zIndex: 80,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: badgeColor,
              boxShadow: `0 0 8px ${badgeColor}`,
            }}
          />
          {badgeText}
        </div>
      )}

      {children}
    </AbsoluteFill>
  );
};
