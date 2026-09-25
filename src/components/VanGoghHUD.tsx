import React from "react";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const VanGoghHUD: React.FC<{
  readonly title?: string;
  readonly subtitle?: string;
}> = ({
  title = "VINCENT VAN GOGH • 1853-1890",
  subtitle = "KIỆT TÁC HỘI HỌA",
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
        background: "rgba(5, 14, 34, 0.88)",
        backdropFilter: "blur(14px)",
        border: "1.5px solid rgba(245, 158, 11, 0.65)",
        boxShadow:
          "0 8px 24px rgba(2, 6, 18, 0.85), inset 0 0 14px rgba(245, 158, 11, 0.2)",
        zIndex: 150,
        fontFamily,
      }}
    >
      {/* Radiant Sunflower / Artistic Icon */}
      <span
        style={{
          fontSize: 22,
          filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.9))",
          lineHeight: 1,
        }}
      >
        🌻
      </span>

      {/* Main Title */}
      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "1.5px",
          color: "#FEF08A",
          textTransform: "uppercase",
          textShadow: "0 2px 10px rgba(0,0,0,0.95)",
          lineHeight: 1,
          fontFamily,
        }}
      >
        {title}
      </span>

      {/* Radiant Amber Divider Pin */}
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "#F59E0B",
          boxShadow: "0 0 6px #FBBF24",
          display: "inline-block",
        }}
      />

      {/* Subtitle / Category Tag */}
      <span
        style={{
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "1.2px",
          color: "#38BDF8",
          textTransform: "uppercase",
          textShadow: "0 2px 6px rgba(0,0,0,0.8)",
          lineHeight: 1,
          fontFamily,
        }}
      >
        {subtitle}
      </span>
    </div>
  );
};
