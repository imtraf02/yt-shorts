import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// 36 hạt bụi vàng/tàn tro trôi dạt nhẹ trên khung hình 1920x1080
const DUST_PARTICLES = Array.from({ length: 36 }, (_, index) => ({
  x: (index * 59) % 1920,
  size: 3 + ((index * 7) % 6),
  speedY: 0.6 + ((index * 11) % 15) / 10,
  speedX: 0.3 + ((index * 5) % 10) / 10,
  delay: (index * 83) % 1200,
  drift: 15 + ((index * 13) % 25),
  phase: index * 0.61,
  baseOpacity: 0.18 + ((index * 3) % 5) / 15,
  isGold: index % 3 === 0,
}));

export const DocumentaryAtmosphere: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {/* 1. Lớp bụi tro / hạt ánh sáng trôi dạt nhẹ */}
      {DUST_PARTICLES.map((p, index) => {
        const y = 1120 - ((frame * p.speedY + p.delay) % 1200);
        const x =
          (p.x + frame * p.speedX + Math.sin(frame * 0.025 + p.phase) * p.drift) %
          1940;

        const edgeFade = interpolate(
          y,
          [0, 100, 980, 1080],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={`dust-${index}`}
            style={{
              position: "absolute",
              left: x - 20,
              top: y - 20,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.isGold ? "#f59e0b" : "#e2e8f0",
              opacity: p.baseOpacity * edgeFade,
              boxShadow: p.isGold
                ? "0 0 10px rgba(245, 158, 11, 0.8)"
                : "0 0 8px rgba(226, 232, 240, 0.6)",
              filter: "blur(0.5px)",
            }}
          />
        );
      })}

      {/* 2. Ánh sáng anamorphic quét nhẹ toàn khung theo chu kỳ 180 frames */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.015) 0%, transparent 40%, rgba(56,189,248,0.02) 60%, transparent 100%)",
          transform: `translateX(${interpolate(
            frame % 240,
            [0, 240],
            [-200, 200]
          )}px)`,
        }}
      />
    </div>
  );
};
