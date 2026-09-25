import React from "react";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const WorldCupHUD: React.FC<{
  readonly title?: string;
  readonly subtitle?: string;
}> = ({
  title = "WORLD CUP 2002 • CONTROVERSY",
  subtitle = "REFEREE SCANDAL",
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
        background: "rgba(9, 23, 14, 0.88)",
        backdropFilter: "blur(14px)",
        border: "1.5px solid rgba(34, 197, 94, 0.6)",
        boxShadow:
          "0 8px 24px rgba(0, 0, 0, 0.85), inset 0 0 14px rgba(34, 197, 94, 0.2)",
        zIndex: 150,
        fontFamily,
      }}
    >
      {/* Soccer Ball Icon */}
      <span
        style={{
          fontSize: 22,
          filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.85))",
          lineHeight: 1,
        }}
      >
        ⚽
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

      {/* Neon Turf Green Divider Pin */}
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#22C55E",
          boxShadow: "0 0 8px #22C55E",
          display: "inline-block",
        }}
      />

      {/* Subtitle / Category Tag */}
      <span
        style={{
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "1.2px",
          color: "#EF4444",
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
