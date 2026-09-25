import React from "react";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const PubgHUD: React.FC<{
  readonly title?: string;
  readonly subtitle?: string;
}> = ({
  title = "PUBG ASIA STARS 2026",
  subtitle = "KRAFTON SCANDAL",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 96,
        left: 36,
        width: "fit-content",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 22px",
        borderRadius: 9999,
        background: "rgba(11, 20, 28, 0.9)",
        backdropFilter: "blur(14px)",
        border: "1.5px solid rgba(14, 165, 233, 0.6)",
        boxShadow:
          "0 8px 24px rgba(0, 0, 0, 0.85), inset 0 0 14px rgba(14, 165, 233, 0.2)",
        zIndex: 150,
        fontFamily,
      }}
    >
      {/* Gamepad / Crosshair Icon */}
      <span
        style={{
          fontSize: 22,
          filter: "drop-shadow(0 0 8px rgba(14, 165, 233, 0.85))",
          lineHeight: 1,
        }}
      >
        🎮
      </span>

      {/* Main Title */}
      <span
        style={{
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: "1.2px",
          color: "#F8FAFC",
          textTransform: "uppercase",
          textShadow: "0 2px 10px rgba(0,0,0,0.95)",
          lineHeight: 1,
        }}
      >
        {title}
      </span>

      {/* Neon Cyan Tactical Divider */}
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#38BDF8",
          boxShadow: "0 0 8px #0EA5E9",
          display: "inline-block",
        }}
      />

      {/* Subtitle / Category Tag */}
      <span
        style={{
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "1.2px",
          color: "#F59E0B",
          textTransform: "uppercase",
          textShadow: "0 2px 6px rgba(0,0,0,0.8)",
          lineHeight: 1,
        }}
      >
        {subtitle}
      </span>
    </div>
  );
};
