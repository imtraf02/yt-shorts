import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const SteveProgressBar: React.FC<{
  readonly height?: number;
}> = ({ height = 4 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, Math.max(0, frame / Math.max(1, durationInFrames)));

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 44,
        right: 44,
        height,
        backgroundColor: "rgba(255, 255, 255, 0.16)",
        borderRadius: height / 2,
        overflow: "hidden",
        zIndex: 150,
        pointerEvents: "none",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          background: "linear-gradient(90deg, #0071E3 0%, #5AC8FA 60%, #AF52DE 100%)",
          borderRadius: height / 2,
          boxShadow: "0 0 10px rgba(90, 200, 250, 0.8)",
        }}
      />
    </div>
  );
};
