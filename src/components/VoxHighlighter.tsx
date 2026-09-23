import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const VoxHighlighter: React.FC<{
  readonly children: React.ReactNode;
  readonly color?: string;
  readonly delayFrames?: number;
  readonly heightPercent?: number;
}> = ({
  children,
  color = "rgba(250, 204, 21, 0.55)", // Yellow highlighter
  delayFrames = 0,
  heightPercent = 55,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wipe = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const widthProgress = interpolate(wipe, [0, 1], [0, 100]);

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        fontWeight: "inherit",
      }}
    >
      {/* Highlighter marker background wipe */}
      <span
        style={{
          position: "absolute",
          left: -4,
          bottom: "8%",
          width: `${widthProgress}%`,
          height: `${heightPercent}%`,
          backgroundColor: color,
          borderRadius: 3,
          zIndex: 0,
          transform: "rotate(-0.5deg)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </span>
  );
};
