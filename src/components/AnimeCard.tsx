import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

const { fontFamily: montserratFont } = loadMontserrat("normal", {
  weights: ["800", "900"],
  subsets: ["vietnamese", "latin"],
});

export type CardTapeStyle =
  | "none"
  | "two-neon-tapes"
  | "hazard-tape"
  | "holo-tape"
  | "corner-washi";

export type CardFrameStyle =
  | "neon-glow"
  | "manga-border"
  | "holo-card"
  | "cyber-slate";

interface AnimeCardProps {
  readonly src: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly rotation?: number;
  readonly delay?: number;
  readonly zIndex?: number;
  readonly tapeStyle?: CardTapeStyle;
  readonly frameStyle?: CardFrameStyle;
  readonly badgeText?: string;
  readonly badgeColor?: string;
  readonly badgePosition?: "top-left" | "top-right" | "bottom-right" | "bottom-left";
  readonly badgeDelay?: number;
  readonly glowColor?: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  src,
  x,
  y,
  width,
  rotation = 0,
  delay = 0,
  zIndex = 10,
  tapeStyle = "two-neon-tapes",
  frameStyle = "neon-glow",
  badgeText,
  badgeColor = "#facc15",
  badgePosition = "bottom-right",
  badgeDelay = 6,
  glowColor = "#38bdf8",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // If card is scheduled for later in the scene, do not render before its delay
  if (frame < delay) {
    return null;
  }

  // Entrance animation with spring
  const activeFrame = frame - delay;
  const entrance = spring({
    frame: activeFrame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.9 },
  });

  // CRITICAL FIX: If delay === 0 (primary scene card), opacity is 1.0 from frame 0 so screen NEVER flashes black!
  // The card enters with a punchy scale & slide spring.
  const opacity =
    delay === 0 ? 1 : interpolate(entrance, [0, 0.35, 1], [0, 0.95, 1]);
  const scale = interpolate(entrance, [0, 1], [0.93, 1]);
  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  // Subtle Ken Burns slow zoom
  const kenBurns = interpolate(activeFrame, [0, 300], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  // Badge slam animation
  const badgeFrame = Math.max(0, frame - delay - badgeDelay);
  const badgeEntrance = spring({
    frame: badgeFrame,
    fps,
    config: { damping: 11, stiffness: 220 },
  });
  const badgeScale = interpolate(badgeEntrance, [0, 0.7, 1], [2.2, 0.9, 1]);
  const badgeOpacity = interpolate(badgeEntrance, [0, 0.3, 1], [0, 1, 1]);

  // Height for 3:4 aspect ratio (1086x1448)
  const height = Math.round((width * 1448) / 1086);

  // Frame styling
  const getFrameStyles = (): React.CSSProperties => {
    switch (frameStyle) {
      case "neon-glow":
        return {
          backgroundColor: "#0d111e",
          border: `3px solid ${glowColor}`,
          boxShadow: `0 14px 40px rgba(0, 0, 0, 0.8), 0 0 24px ${glowColor}55`,
          borderRadius: 18,
          padding: 10,
        };
      case "manga-border":
        return {
          backgroundColor: "#090a10",
          border: "4px solid #ffffff",
          boxShadow:
            "8px 12px 0px #000000, 0 16px 36px rgba(0, 0, 0, 0.85)",
          borderRadius: 12,
          padding: 8,
        };
      case "holo-card":
        return {
          background:
            "linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(56,189,248,0.3) 50%, rgba(250,204,21,0.3) 100%)",
          border: "3px solid rgba(255, 255, 255, 0.8)",
          boxShadow:
            "0 16px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(168, 85, 247, 0.4)",
          borderRadius: 20,
          padding: 10,
        };
      case "cyber-slate":
      default:
        return {
          backgroundColor: "#111827",
          border: `2.5px solid ${glowColor}99`,
          boxShadow:
            "0 18px 45px rgba(0, 0, 0, 0.8), inset 0 0 14px rgba(0,0,0,0.5)",
          borderRadius: 16,
          padding: 10,
        };
    }
  };

  // Tape Renderers
  const renderTape = () => {
    switch (tapeStyle) {
      case "two-neon-tapes":
        return (
          <>
            {/* Top Left Neon Tape */}
            <div
              style={{
                position: "absolute",
                top: -14,
                left: 32,
                width: 100,
                height: 28,
                backgroundColor: "rgba(56, 189, 248, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                transform: "rotate(-7deg)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 0 10px rgba(56,189,248,0.6)",
                borderRadius: 3,
                zIndex: 25,
              }}
            />
            {/* Top Right Neon Tape */}
            <div
              style={{
                position: "absolute",
                top: -14,
                right: 32,
                width: 100,
                height: 28,
                backgroundColor: "rgba(250, 204, 21, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                transform: "rotate(6deg)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 0 10px rgba(250,204,21,0.6)",
                borderRadius: 3,
                zIndex: 25,
              }}
            />
          </>
        );
      case "hazard-tape":
        return (
          <div
            style={{
              position: "absolute",
              top: -16,
              left: "50%",
              transform: "translateX(-50%) rotate(-2deg)",
              width: 180,
              height: 32,
              background:
                "repeating-linear-gradient(45deg, #facc15, #facc15 14px, #000000 14px, #000000 28px)",
              border: "1px solid #ffffff",
              boxShadow: "0 4px 14px rgba(0,0,0,0.6)",
              borderRadius: 4,
              zIndex: 25,
            }}
          />
        );
      case "holo-tape":
        return (
          <div
            style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%) rotate(3deg)",
              width: 140,
              height: 28,
              background:
                "linear-gradient(90deg, rgba(236,72,153,0.85), rgba(56,189,248,0.85), rgba(250,204,21,0.85))",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5), 0 0 14px rgba(236,72,153,0.5)",
              borderRadius: 3,
              zIndex: 25,
            }}
          />
        );
      case "corner-washi":
        return (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: -24,
              width: 110,
              height: 30,
              backgroundColor: "rgba(244, 63, 94, 0.88)",
              border: "1px solid rgba(255,255,255,0.8)",
              transform: "rotate(42deg)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              borderRadius: 3,
              zIndex: 25,
            }}
          />
        );
      case "none":
      default:
        return null;
    }
  };

  // Badge positioning style
  const getBadgePositionStyle = (): React.CSSProperties => {
    switch (badgePosition) {
      case "top-left":
        return { top: 22, left: 22 };
      case "top-right":
        return { top: 22, right: 22 };
      case "bottom-left":
        return { bottom: 22, left: 22 };
      case "bottom-right":
      default:
        return { bottom: 24, right: 24 };
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        zIndex,
        transformOrigin: "center center",
      }}
    >
      {/* Tape Attachment */}
      {renderTape()}

      {/* Frame Container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          ...getFrameStyles(),
        }}
      >
        {/* The Anime Image */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: frameStyle === "manga-border" ? 8 : 14,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${kenBurns})`,
              transformOrigin: "center 40%",
            }}
          />

          {/* Subtle Bottom Image Gradient Shadow for Contrast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.65) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Slam Action Badge */}
        {badgeText && (
          <div
            style={{
              position: "absolute",
              ...getBadgePositionStyle(),
              transform: `scale(${badgeScale})`,
              opacity: badgeOpacity,
              backgroundColor: "#080b14",
              border: `2.5px solid ${badgeColor}`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.8), 0 0 16px ${badgeColor}66`,
              padding: "10px 18px",
              borderRadius: 12,
              color: "#ffffff",
              fontFamily: montserratFont,
              fontSize: width > 700 ? 24 : 19,
              fontWeight: 900,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              zIndex: 30,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                backgroundColor: badgeColor,
                boxShadow: `0 0 10px ${badgeColor}`,
              }}
            />
            {badgeText}
          </div>
        )}
      </div>
    </div>
  );
};
