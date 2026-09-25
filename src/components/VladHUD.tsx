import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const VladHUD: React.FC<{
  readonly tag?: string;
  readonly accentColor?: string;
}> = ({
  tag = "VLAD ĐỆ TAM • DRACULA",
  accentColor = "#DC2626", // Blood Crimson
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 190 },
  });

  const translateY = interpolate(entrance, [0, 1], [-30, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 96,
        left: 36,
        display: "flex",
        alignItems: "flex-start",
        fontFamily,
        pointerEvents: "none",
        zIndex: 100,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* Sleek Auto-Width Header Badge with Gothic Crimson & Dragon Gold Glow */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(19, 9, 12, 0.90)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1.5px solid ${accentColor}99`,
          borderRadius: 24,
          padding: "8px 20px",
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 18px ${accentColor}35`,
          width: "fit-content",
        }}
      >
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
        />
        <span
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1.1,
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
      </div>
    </div>
  );
};
