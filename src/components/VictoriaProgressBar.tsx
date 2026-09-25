import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const VictoriaProgressBar: React.FC<{
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
        backgroundColor: "rgba(10, 6, 14, 0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      {/* Liquid Victorian Crimson Rose & Gold Stream */}
      <div
        style={{
          width: `${progressPercent}%`,
          height: "100%",
          background:
            "linear-gradient(90deg, #881337 0%, #BE123C 30%, #D97706 70%, #FBBF24 100%)",
          boxShadow: "0 0 16px rgba(251, 191, 36, 0.9), 0 0 30px rgba(225, 29, 72, 0.6)",
          transition: "width 0.05s linear",
          position: "relative",
        }}
      >
        {/* Leading Victorian Starlight Spark */}
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
              "0 0 10px #FFFFFF, 0 0 20px #FDA4AF, 0 0 35px #FBBF24",
          }}
        />
      </div>
    </div>
  );
};
