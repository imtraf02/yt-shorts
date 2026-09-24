import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const PsychCaseHUD: React.FC<{
  readonly title: string;
  readonly category: string;
  readonly tag: string;
  readonly accentColor?: string;
  readonly caseNumber?: string;
}> = ({
  title,
  category,
  tag,
  accentColor = "#10b981",
  caseNumber = "CASE #03",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  const translateY = interpolate(entrance, [0, 1], [-40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
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
      {/* Top Status Capsule Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(10, 15, 29, 0.78)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          borderRadius: 14,
          padding: "10px 18px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.45)",
        }}
      >
        {/* Left: Case ID with pulsating dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
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
              fontSize: 19,
              fontWeight: 800,
              color: "#e2e8f0",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            {caseNumber} // {category}
          </span>
        </div>

        {/* Right: Diagnosis Tag */}
        <div
          style={{
            backgroundColor: `${accentColor}24`,
            border: `1px solid ${accentColor}66`,
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: accentColor,
              letterSpacing: 1.2,
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
          backgroundColor: "rgba(10, 15, 29, 0.65)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 12,
          padding: "10px 18px",
          alignSelf: "flex-start",
          maxWidth: "92%",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 0.2,
            textTransform: "uppercase",
            lineHeight: 1.2,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
