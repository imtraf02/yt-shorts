import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const ZeigarnikHUD: React.FC<{
  readonly title: string;
  readonly category?: string;
  readonly tag: string;
  readonly accentColor?: string;
  readonly badgeNumber?: string;
}> = ({
  title,
  category = "BẪY TÂM LÝ NHẬN THỨC",
  tag,
  accentColor = "#8b5cf6",
  badgeNumber = "TRAP #04",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 190 },
  });

  const translateY = interpolate(entrance, [0, 1], [-35, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 96,
        left: 36,
        right: 36,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFamily,
        pointerEvents: "none",
        zIndex: 100,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* Top Holographic Glass Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(9, 12, 24, 0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(139, 92, 246, 0.28)",
          borderRadius: 14,
          padding: "10px 18px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(139, 92, 246, 0.15)",
        }}
      >
        {/* Left: Trap ID with pulsing neon violet dot */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: `0 0 12px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#e0e7ff",
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            {badgeNumber} // {category}
          </span>
        </div>

        {/* Right: Status Pill */}
        <div
          style={{
            backgroundColor: `${accentColor}26`,
            border: `1px solid ${accentColor}88`,
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: accentColor,
              letterSpacing: 1.1,
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        </div>
      </div>

      {/* Main Punchy Topic Title */}
      <div
        style={{
          backgroundColor: "rgba(9, 12, 24, 0.7)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 12,
          padding: "10px 18px",
          alignSelf: "flex-start",
          maxWidth: "92%",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
        }}
      >
        <span
          style={{
            fontSize: 25,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 0.2,
            textTransform: "uppercase",
            lineHeight: 1.2,
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
