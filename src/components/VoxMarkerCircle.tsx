import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const VoxMarkerCircle: React.FC<{
  readonly width?: number;
  readonly height?: number;
  readonly color?: string;
  readonly startFrame?: number;
  readonly durationFrames?: number;
}> = ({
  width = 240,
  height = 90,
  color = "#ef4444",
  startFrame = 0,
  durationFrames = 15,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Approximate ellipse perimeter = 2 * PI * sqrt((a^2 + b^2) / 2)
  const a = width / 2;
  const b = height / 2;
  const pathLength = 650;
  const dashoffset = (1 - progress) * pathLength;

  return (
    <svg
      width={width + 30}
      height={height + 30}
      viewBox={`0 0 ${width + 30} ${height + 30}`}
      style={{
        position: "absolute",
        top: -15,
        left: -15,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <ellipse
        cx={(width + 30) / 2}
        cy={(height + 30) / 2}
        rx={a}
        ry={b}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={dashoffset}
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
          transform: "rotate(-3deg)",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
};
