import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadBeVietnamPro } from "@remotion/google-fonts/BeVietnamPro";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";

const { fontFamily: beVietnamFont } = loadBeVietnamPro("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

const { fontFamily: robotoMonoFont } = loadRobotoMono("normal", {
  weights: ["700"],
  subsets: ["vietnamese", "latin"],
});

interface CinematicHUDHeaderProps {
  readonly title: string;
  readonly category?: string;
  readonly tag?: string;
  readonly accentColor?: string;
}

export const CinematicHUDHeader: React.FC<CinematicHUDHeaderProps> = ({
  title,
  category = "TÂM LÝ HỌC // BẪY NÃO BỘ",
  tag = "CORTISOL & DEADLINE",
  accentColor = "#f97316",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 150 },
  });

  const translateY = interpolate(reveal, [0, 1], [-20, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 90,
        left: 50,
        right: 50,
        zIndex: 100,
        transform: `translateY(${translateY}px)`,
        opacity: reveal,
      }}
    >
      {/* Sleek Floating Glass Capsule */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          padding: "8px 22px",
          borderRadius: 9999,
          backgroundColor: "rgba(10, 15, 28, 0.72)",
          backdropFilter: "blur(14px)",
          border: `1px solid rgba(255, 255, 255, 0.18)`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), 0 0 16px ${accentColor}33`,
        }}
      >
        {/* Pulsing Status Dot */}
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: accentColor,
            boxShadow: `0 0 12px ${accentColor}`,
          }}
        />

        {/* Category */}
        <span
          style={{
            color: "#f1f5f9",
            fontFamily: robotoMonoFont,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {category}
        </span>

        {/* Divider */}
        <span style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: 16 }}>•</span>

        {/* Tag Pill */}
        <span
          style={{
            color: accentColor,
            fontFamily: robotoMonoFont,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
      </div>

      {/* Main Title */}
      <div
        style={{
          marginTop: 14,
          maxWidth: 960,
          color: "#ffffff",
          fontFamily: beVietnamFont,
          fontSize: 44,
          fontWeight: 900,
          lineHeight: 1.18,
          letterSpacing: -0.6,
          textTransform: "uppercase",
          textShadow:
            "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9)",
        }}
      >
        {title}
      </div>
    </div>
  );
};
