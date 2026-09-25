import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const JuliusCaesarProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const width = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: "#281A16",
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: "100%",
          background: "linear-gradient(90deg, #7C2025, #D74735, #F2C46D)",
          boxShadow: "0 0 16px rgba(210, 55, 42, 0.85)",
        }}
      />
    </div>
  );
};
