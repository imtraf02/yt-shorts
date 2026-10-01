import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800"],
  subsets: ["vietnamese", "latin"],
});

interface DocumentarySceneBadgeProps {
  description: string;
}

export const DocumentarySceneBadge: React.FC<DocumentarySceneBadgeProps> = ({
  description,
}) => {
  const localFrame = useCurrentFrame();

  if (!description) return null;

  // Hiệu ứng fade-in & slide-right nhẹ khi chuyển sang ảnh mới (15 frames đầu)
  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(localFrame, [0, 15], [-12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 74,
        right: 54,
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 25,
        opacity,
        transform: `translateX(${-translateX}px)`,
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(10, 15, 29, 0.90)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          borderRadius: 20,
          padding: "6px 18px",
          backdropFilter: "blur(14px)",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.65)",
          maxWidth: 900,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "#38bdf8",
            boxShadow: "0 0 10px #38bdf8",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 0.3,
            lineHeight: 1.4,
            color: "#f1f5f9",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)",
            whiteSpace: "nowrap",
          }}
        >
          {description}
        </span>
      </div>
    </div>
  );
};
