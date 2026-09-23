import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const ProgressBar: React.FC<{
  readonly color?: string;
  readonly backgroundColor?: string;
  readonly height?: number;
  readonly top?: number;
}> = ({
  color = "#ff0000",
  backgroundColor = "rgba(255, 255, 255, 0.2)",
  height = 8,
  top = 0,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, Math.max(0, frame / (durationInFrames - 1)));

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        height,
        backgroundColor,
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          backgroundColor: color,
          borderRadius: "0 4px 4px 0",
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
};
