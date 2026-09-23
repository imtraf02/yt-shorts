import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const VoxPaperPhoto: React.FC<{
  readonly src: string;
  readonly width?: number;
  readonly height?: number;
  readonly rotation?: number;
  readonly label?: string;
  readonly delayFrames?: number;
  readonly tapeType?: "top-center" | "two-corners" | "single-corner" | "none";
  readonly badgeText?: string;
  readonly badgeColor?: string;
  readonly style?: React.CSSProperties;
}> = ({
  src,
  width = 720,
  height = 960,
  rotation = -2.5,
  label,
  delayFrames = 0,
  tapeType = "top-center",
  badgeText,
  badgeColor = "#ef4444",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Subtle stop-motion breathing / drift
  const drift = Math.sin((frame + delayFrames * 5) * 0.03) * 1.5;

  const scale = interpolate(entrance, [0, 1], [0.75, 1]);
  const translateY = interpolate(entrance, [0, 1], [70, 0]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        transform: `scale(${scale}) translateY(${translateY + drift}px) rotate(${rotation}deg)`,
        opacity: entrance,
        filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.75))",
        ...style,
      }}
    >
      {/* Scotch Masking Tape Strip (Top Center) */}
      {tapeType === "top-center" && (
        <div
          style={{
            position: "absolute",
            top: -18,
            left: "50%",
            transform: "translateX(-50%) rotate(1deg)",
            width: 140,
            height: 38,
            backgroundColor: "rgba(254, 240, 138, 0.55)",
            border: "1px solid rgba(250, 204, 21, 0.6)",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            backdropFilter: "blur(2px)",
            zIndex: 10,
          }}
        />
      )}

      {/* Two Corner Tapes */}
      {tapeType === "two-corners" && (
        <>
          <div
            style={{
              position: "absolute",
              top: -14,
              left: -14,
              transform: "rotate(-35deg)",
              width: 110,
              height: 34,
              backgroundColor: "rgba(254, 240, 138, 0.6)",
              border: "1px solid rgba(250, 204, 21, 0.65)",
              borderRadius: 2,
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -14,
              right: -14,
              transform: "rotate(35deg)",
              width: 110,
              height: 34,
              backgroundColor: "rgba(254, 240, 138, 0.6)",
              border: "1px solid rgba(250, 204, 21, 0.65)",
              borderRadius: 2,
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
              zIndex: 10,
            }}
          />
        </>
      )}

      {/* Polaroid / Archival Paper Container */}
      <div
        style={{
          width,
          backgroundColor: "#faf8f5", // Cream vintage photo paper
          padding: "16px 16px 22px 16px",
          borderRadius: 6,
          boxShadow:
            "inset 0 0 10px rgba(0,0,0,0.05), 0 12px 36px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            width: "100%",
            height,
            overflow: "hidden",
            backgroundColor: "#18181b",
            position: "relative",
            borderRadius: 3,
          }}
        >
          <Img
            src={src}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Optional Badge Overlay */}
          {badgeText && (
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                backgroundColor: badgeColor,
                color: "#ffffff",
                padding: "6px 16px",
                borderRadius: 6,
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 900,
                fontSize: 18,
                letterSpacing: 1.5,
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                textTransform: "uppercase",
              }}
            >
              {badgeText}
            </div>
          )}
        </div>

        {/* Vintage Label Note */}
        {label && (
          <div
            style={{
              marginTop: 14,
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 22,
              fontWeight: 800,
              color: "#18181b",
              textAlign: "center",
              letterSpacing: 1,
              textTransform: "uppercase",
              lineHeight: 1.3,
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
};
