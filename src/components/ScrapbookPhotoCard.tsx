import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadBeVietnamPro } from "@remotion/google-fonts/BeVietnamPro";

const { fontFamily: beVietnamFont } = loadBeVietnamPro("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export type TapeStyle =
  | "two-top-corners"
  | "top-center"
  | "diagonal-corners"
  | "side-tapes"
  | "pushpin"
  | "paperclip"
  | "none";

export type FrameStyle = "polaroid" | "craft-card" | "clean-white" | "dark-film";

export interface ScrapbookPhotoCardProps {
  readonly src: string;
  readonly label?: string;
  readonly x: number;
  readonly y: number;
  readonly width?: number;
  readonly height?: number;
  readonly rotation?: number;
  readonly delay?: number;
  readonly tapeStyle?: TapeStyle;
  readonly frameStyle?: FrameStyle;
  readonly tapeColor?: string;
  readonly pinColor?: string;
  readonly stampText?: string;
  readonly stampColor?: string;
  readonly stampRotation?: number;
  readonly stampDelay?: number;
  readonly zIndex?: number;
  readonly aspectRatio?: string;
}

export const ScrapbookPhotoCard: React.FC<ScrapbookPhotoCardProps> = ({
  src,
  label,
  x,
  y,
  width = 720,
  height,
  rotation = 0,
  delay = 0,
  tapeStyle = "top-center",
  frameStyle = "polaroid",
  tapeColor = "rgba(253, 230, 138, 0.85)", // semi-translucent yellowish masking tape
  pinColor = "#ef4444",
  stampText,
  stampColor = "#ef4444",
  stampRotation = -12,
  stampDelay = 8,
  zIndex = 10,
  aspectRatio = "1 / 1",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Subtle floating breathing effect
  const bob = Math.sin((frame + delay * 6) * 0.04) * 3;

  const scale = interpolate(appear, [0, 1], [0.82, 1]);
  const translateY = interpolate(appear, [0, 1], [60, 0]);

  // Stamp animation
  const stampEntrance = spring({
    frame: Math.max(0, frame - (delay + stampDelay)),
    fps,
    config: { damping: 9, stiffness: 240 },
  });
  const stampScale = interpolate(stampEntrance, [0, 1], [2.4, 1]);

  // Frame styles
  let bgColor = "#faf8f2";
  let borderStyle = "6px solid #fcfbf7";
  let textColor = "#1c1917";

  if (frameStyle === "craft-card") {
    bgColor = "#e7dec8";
    borderStyle = "5px solid #dcd2b8";
    textColor = "#292524";
  } else if (frameStyle === "clean-white") {
    bgColor = "#ffffff";
    borderStyle = "4px solid #f1f5f9";
    textColor = "#0f172a";
  } else if (frameStyle === "dark-film") {
    bgColor = "#18181b";
    borderStyle = "5px solid #27272a";
    textColor = "#f4f4f5";
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        zIndex,
        opacity: appear,
        transform: `translate(0, ${translateY + bob}px) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: "center center",
        filter: "drop-shadow(0 26px 45px rgba(0, 0, 0, 0.78))",
      }}
    >
      {/* Tape Variations */}
      {/* 1. Top Center Tape */}
      {tapeStyle === "top-center" && (
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            left: "50%",
            top: -18,
            width: 150,
            height: 40,
            transform: "translateX(-50%) rotate(-1deg)",
            backgroundColor: tapeColor,
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* 2. Two Top Corners Tapes */}
      {tapeStyle === "two-top-corners" && (
        <>
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              left: -16,
              top: -14,
              width: 110,
              height: 36,
              transform: "rotate(-38deg)",
              backgroundColor: tapeColor,
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              right: -16,
              top: -14,
              width: 110,
              height: 36,
              transform: "rotate(38deg)",
              backgroundColor: tapeColor,
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
            }}
          />
        </>
      )}

      {/* 3. Diagonal Corners Tape */}
      {tapeStyle === "diagonal-corners" && (
        <>
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              left: -14,
              top: -14,
              width: 110,
              height: 36,
              transform: "rotate(-40deg)",
              backgroundColor: tapeColor,
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              right: -14,
              bottom: -14,
              width: 110,
              height: 36,
              transform: "rotate(-40deg)",
              backgroundColor: tapeColor,
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
            }}
          />
        </>
      )}

      {/* 4. Side Tapes */}
      {tapeStyle === "side-tapes" && (
        <>
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              left: -18,
              top: "40%",
              width: 38,
              height: 90,
              transform: "rotate(-2deg)",
              backgroundColor: tapeColor,
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              right: -18,
              top: "40%",
              width: 38,
              height: 90,
              transform: "rotate(2deg)",
              backgroundColor: tapeColor,
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
            }}
          />
        </>
      )}

      {/* 5. 3D Pushpin */}
      {tapeStyle === "pushpin" && (
        <div
          style={{
            position: "absolute",
            zIndex: 25,
            top: -18,
            left: "50%",
            transform: "translateX(-50%)",
            filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44">
            {/* Pin head shadow */}
            <ellipse cx="22" cy="30" rx="10" ry="4" fill="rgba(0,0,0,0.35)" />
            {/* Pin base */}
            <circle cx="22" cy="20" r="14" fill={pinColor} />
            <circle cx="22" cy="20" r="14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            {/* Top highlight bulb */}
            <circle cx="20" cy="17" r="7" fill="rgba(255,255,255,0.4)" />
            <circle cx="18" cy="15" r="3" fill="#ffffff" />
          </svg>
        </div>
      )}

      {/* 6. Paperclip */}
      {tapeStyle === "paperclip" && (
        <div
          style={{
            position: "absolute",
            zIndex: 25,
            top: -24,
            left: 40,
            transform: "rotate(6deg)",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
          }}
        >
          <svg width="36" height="72" viewBox="0 0 36 72" fill="none">
            <path
              d="M 12 60 L 12 16 A 10 10 0 0 1 32 16 L 32 50 A 8 8 0 0 1 18 50 L 18 22 A 6 6 0 0 1 26 22 L 26 44"
              stroke="#e2e8f0"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* Main Photo Card Container */}
      <div
        style={{
          padding: 16,
          backgroundColor: bgColor,
          border: borderStyle,
          borderRadius: 8,
          boxShadow:
            "inset 0 0 12px rgba(0,0,0,0.06), 0 16px 36px rgba(0,0,0,0.45)",
          position: "relative",
        }}
      >
        {/* Photo Image Frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: height ? height : undefined,
            aspectRatio: height ? undefined : aspectRatio,
            overflow: "hidden",
            backgroundColor: "#0f172a",
            borderRadius: 4,
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.3)",
          }}
        >
          <Img
            src={staticFile(src)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Stamped Badge on Photo */}
          {stampText && (
            <div
              style={{
                position: "absolute",
                bottom: 14,
                right: 14,
                zIndex: 10,
                transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
                opacity: stampEntrance,
                border: `3.5px dashed ${stampColor}`,
                borderRadius: 8,
                padding: "6px 14px",
                color: stampColor,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                fontFamily: beVietnamFont,
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                boxShadow: `0 4px 16px ${stampColor}40`,
                backdropFilter: "blur(4px)",
              }}
            >
              {stampText}
            </div>
          )}
        </div>

        {/* Label Note at Bottom */}
        {label && (
          <div
            style={{
              padding: "16px 8px 6px",
              color: textColor,
              fontFamily: beVietnamFont,
              textAlign: "center",
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 0.8,
              lineHeight: 1.25,
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
};
