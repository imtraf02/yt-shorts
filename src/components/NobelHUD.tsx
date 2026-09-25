import React from "react";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const NobelHUD: React.FC<{
  readonly title?: string;
}> = ({ title = "ALFRED NOBEL • 1888" }) => {
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
        background: "rgba(16, 14, 20, 0.88)",
        backdropFilter: "blur(14px)",
        border: "1.5px solid rgba(212, 175, 55, 0.45)",
        boxShadow:
          "0 8px 24px rgba(0, 0, 0, 0.85), inset 0 0 12px rgba(212, 175, 55, 0.15)",
        zIndex: 150,
        fontFamily,
      }}
    >
      {/* Royal Archival Emblem */}
      <span
        style={{
          fontSize: 20,
          color: "#F59E0B",
          filter: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))",
          lineHeight: 1,
        }}
      >
        ⚜️
      </span>

      {/* Title */}
      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "1.5px",
          color: "#FDE68A",
          textTransform: "uppercase",
          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
          lineHeight: 1,
        }}
      >
        {title}
      </span>

      {/* Royal Swedish Gold Divider & Seal */}
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

      <span
        style={{
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "1px",
          color: "rgba(253, 230, 138, 0.75)",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        ARCHIVES
      </span>
    </div>
  );
};
