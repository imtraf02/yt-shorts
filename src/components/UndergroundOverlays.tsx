import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import type { UndergroundChapter } from "../data/undergroundData";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

interface UndergroundOverlaysProps {
  currentChapter: UndergroundChapter;
  chapterLocalFrame: number;
}

export const UndergroundOverlays: React.FC<UndergroundOverlaysProps> = ({
  currentChapter,
  chapterLocalFrame,
}) => {
  const globalFrame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Hiệu ứng xuất hiện của Chapter Intro Card đầu mỗi phần
  const introProgress = interpolate(
    chapterLocalFrame,
    [10, 36],
    [0, 1],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const isFullBanner = chapterLocalFrame < 210;
  const bannerFadeOut = interpolate(
    chapterLocalFrame,
    [175, 210],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 10, fontFamily }}>
      {/* 1. Lớp phủ Vignette phong cách Vox Documentary kết hợp rừng già huyền bí */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(3, 16, 10, 0.72) 100%), linear-gradient(180deg, rgba(2, 12, 8, 0.85) 0%, transparent 16%, transparent 80%, rgba(2, 12, 8, 0.92) 100%)",
        }}
      />

      {/* 2. Top Progress Bar (Neon Emerald -> Mint Green) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.10)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, Math.max(0, (globalFrame / durationInFrames) * 100))}%`,
            background:
              "linear-gradient(90deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)",
            boxShadow: "0 0 14px rgba(52, 211, 153, 0.9)",
          }}
        />
      </div>

      {/* 3. Top Header HUD: Tên phim & Chủ đề hệ sinh thái */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Pill: Tên phim tài liệu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(4, 20, 14, 0.85)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            backdropFilter: "blur(12px)",
            padding: "8px 20px",
            borderRadius: 30,
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              boxShadow: "0 0 10px #22C55E",
              display: "inline-block",
            }}
          />
          <span
            style={{
              color: "#A7F3D0",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            CUỘC SỐNG BÍ MẬT DƯỚI LÒNG ĐẤT
          </span>
        </div>

        {/* Right Pill: Phân đoạn hiện tại */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(4, 20, 14, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            padding: "8px 22px",
            borderRadius: 30,
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          <span
            style={{
              color: "#34D399",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            {currentChapter.partLabel}
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>|</span>
          <span
            style={{
              color: "#F3F4F6",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.8,
              textTransform: "uppercase",
            }}
          >
            {currentChapter.historicalEra}
          </span>
        </div>
      </div>

      {/* 4. Intro Chapter Card lớn hiển thị đầu mỗi chương (Tự động biến mất sau 7s) */}
      {isFullBanner && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 40,
            maxWidth: 820,
            opacity: bannerFadeOut * introProgress,
            transform: `translateY(${interpolate(introProgress, [0, 1], [-20, 0])}px)`,
            background:
              "linear-gradient(135deg, rgba(4, 24, 16, 0.94) 0%, rgba(6, 36, 24, 0.95) 100%)",
            border: "1px solid rgba(52, 211, 153, 0.45)",
            borderLeft: "6px solid #10B981",
            borderRadius: 16,
            padding: "20px 28px",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(16, 185, 129, 0.25)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                color: "#34D399",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              🌿 {currentChapter.partLabel} · {currentChapter.historicalEra}
            </span>
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 900,
              lineHeight: 1.25,
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              marginBottom: 8,
            }}
          >
            {currentChapter.title}
          </div>
          <div
            style={{
              color: "#D1FAE5",
              fontSize: 15,
              fontWeight: 600,
              lineHeight: 1.45,
              opacity: 0.9,
            }}
          >
            {currentChapter.subtitle}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
