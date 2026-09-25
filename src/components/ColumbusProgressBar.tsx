import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const ColumbusProgressBar: React.FC<{
  readonly height?: number;
}> = ({ height = 8 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, Math.max(0, frame / Math.max(1, durationInFrames)));
  const progressPercent = progress * 100;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height,
        backgroundColor: "rgba(5, 14, 28, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      {/* Liquid Nautical Brass & Astrolabe Gold Stream */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "100%",
          background:
            "linear-gradient(90deg, #1E3A8A 0%, #0284C7 25%, #D97706 65%, #F59E0B 90%, #FEF08A 100%)",
          boxShadow: "0 0 16px rgba(245, 158, 11, 0.9), 0 0 30px rgba(2, 132, 199, 0.6)",
          transition: "width 0.05s linear",
          position: "relative",
        }}
      >
        {/* Leading Compass Needle Light Spark */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translate(50%, -50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 0 10px #FFFFFF, 0 0 20px #F59E0B, 0 0 35px #38BDF8",
          }}
        />
      </div>
    </div>
  );
};
