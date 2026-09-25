import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const JuliusCaesarTransition: React.FC<{
  readonly boundaries: number[];
}> = ({ boundaries }) => {
  const frame = useCurrentFrame();
  const activeBoundary = boundaries.find(
    (boundary) => frame >= boundary - 9 && frame <= boundary + 9,
  );

  if (activeBoundary === undefined) {
    return null;
  }

  const progress = interpolate(
    frame,
    [activeBoundary - 9, activeBoundary + 9],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.62, 0]);
  const streakX = interpolate(progress, [0, 1], [-360, 1240]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 110,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          bottom: -180,
          left: streakX,
          width: 150,
          rotate: "8deg",
          opacity,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124, 32, 37, 0.16) 18%, rgba(215, 71, 53, 0.78) 48%, rgba(242, 196, 109, 0.52) 67%, transparent 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: opacity * 0.18,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255, 231, 184, 0.5) 0px, rgba(255, 231, 184, 0.5) 2px, transparent 2px, transparent 8px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};
