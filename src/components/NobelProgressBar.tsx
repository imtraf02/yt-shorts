import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const NobelProgressBar: React.FC<{
  readonly height?: number;
}> = ({ height = 8 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 100], {
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
        height,
        backgroundColor: "rgba(10, 8, 12, 0.65)",
        zIndex: 200,
        overflow: "visible",
      }}
    >
      {/* Liquid Burnished Gold Bar */}
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background:
            "linear-gradient(90deg, #996515 0%, #D4AF37 35%, #F59E0B 70%, #FFE066 95%, #FFFDF0 100%)",
          boxShadow:
            "0 0 16px rgba(245, 158, 11, 0.85), 0 0 8px rgba(255, 215, 0, 0.9)",
          position: "relative",
          transition: "width 0.05s linear",
        }}
      >
        {/* Molten Gold Spark Head */}
        <div
          style={{
            position: "absolute",
            right: -6,
            top: -3,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#FFFDF0",
            boxShadow:
              "0 0 14px #FFD700, 0 0 24px #F59E0B, 0 0 35px rgba(255, 215, 0, 0.9)",
          }}
        />
      </div>
    </div>
  );
};
