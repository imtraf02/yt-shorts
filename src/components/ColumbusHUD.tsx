import React from "react";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const ColumbusHUD: React.FC<{
  readonly title?: string;
  readonly subtitle?: string;
}> = ({
  title = "CHRISTOPHER COLUMBUS • 1492",
  subtitle = "EXPEDITION",
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
        background: "rgba(6, 18, 38, 0.88)",
        backdropFilter: "blur(14px)",
        border: "1.5px solid rgba(212, 175, 55, 0.55)",
        boxShadow:
          "0 8px 24px rgba(2, 8, 20, 0.85), inset 0 0 14px rgba(212, 175, 55, 0.18)",
        zIndex: 150,
        fontFamily,
      }}
    >
      {/* Antique Nautical Astrolabe Icon */}
      <span
        style={{
          fontSize: 22,
          filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.85))",
          lineHeight: 1,
        }}
      >
        🧭
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

      {/* Nautical Brass Divider Pin */}
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "#D4AF37",
          boxShadow: "0 0 6px #F59E0B",
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
