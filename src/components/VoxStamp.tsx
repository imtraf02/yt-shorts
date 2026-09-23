import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const VoxStamp: React.FC<{
  readonly text: string;
  readonly color?: string;
  readonly rotation?: number;
  readonly delayFrames?: number;
  readonly size?: "sm" | "md" | "lg";
}> = ({
  text,
  color = "#ef4444",
  rotation = -12,
  delayFrames = 0,
  size = "md",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampEntrance = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 9, stiffness: 220 }, // High punchy slap
  });

  const scale = interpolate(stampEntrance, [0, 1], [2.2, 1]);
  const opacity = interpolate(stampEntrance, [0, 0.2, 1], [0, 1, 0.92]);

  const fontSize = size === "sm" ? 18 : size === "lg" ? 32 : 24;
  const padding = size === "sm" ? "4px 12px" : size === "lg" ? "10px 24px" : "6px 18px";
  const borderWidth = size === "sm" ? 2.5 : size === "lg" ? 4.5 : 3.5;

  return (
    <div
      style={{
        display: "inline-block",
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        border: `${borderWidth}px dashed ${color}`,
        borderRadius: 8,
        padding,
        color,
        fontFamily: "'Courier New', Courier, monospace",
        fontWeight: 900,
        fontSize,
        letterSpacing: 2,
        textTransform: "uppercase",
        boxShadow: `0 0 12px ${color}33`,
        backgroundColor: `${color}15`,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );
};
