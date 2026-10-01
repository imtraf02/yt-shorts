import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import type { BinaryChapter } from "../data/binaryData";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

interface BinaryOverlaysProps {
  currentChapter: BinaryChapter;
  chapterLocalFrame: number;
}

export const BinaryOverlays: React.FC<BinaryOverlaysProps> = ({
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

  // Lấy mô tả chi tiết của ảnh hiện tại trong chapter
  const currentImgIdx = (() => {
    if (!currentChapter.imageStartFrames || currentChapter.imageStartFrames.length === 0) {
      const perImg = Math.floor(currentChapter.durationInFrames / currentChapter.images.length);
      return Math.min(
        currentChapter.images.length - 1,
        Math.floor(chapterLocalFrame / Math.max(1, perImg))
      );
    }
    const frames = currentChapter.imageStartFrames;
    let idx = 0;
    for (let i = 0; i < frames.length; i++) {
      if (chapterLocalFrame >= frames[i]) {
        idx = i;
      } else {
        break;
      }
    }
    return Math.min(currentChapter.images.length - 1, idx);
  })();

  const currentDesc = currentChapter.imageDescriptions[currentImgIdx] || "";

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 10, fontFamily }}>
      {/* 1. Lớp phủ Vignette phong cách Vox Documentary */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(4, 9, 20, 0.72) 100%), linear-gradient(180deg, rgba(2, 6, 16, 0.85) 0%, transparent 16%, transparent 80%, rgba(2, 6, 16, 0.92) 100%)",
        }}
      />

      {/* 2. Top Progress Bar (Neon Cyan -> Amber Gold) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, Math.max(0, (globalFrame / durationInFrames) * 100))}%`,
            background:
              "linear-gradient(90deg, #06B6D4 0%, #3B82F6 40%, #F59E0B 80%, #FBBF24 100%)",
            boxShadow: "0 0 12px rgba(6, 182, 212, 0.6)",
          }}
        />
      </div>

      {/* 3. Top Header HUD */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Series Title & Chapter Indicator */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(4, 12, 26, 0.84)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(6, 182, 212, 0.35)",
            borderRadius: 999,
            padding: "8px 20px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#06B6D4",
              boxShadow: "0 0 8px #06B6D4",
            }}
          />
          <span
            style={{
              color: "#06B6D4",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            VÌ SAO MÁY TÍNH HIỂU 0 & 1
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: 13 }}>/</span>
          <span
            style={{
              color: "#F8FAFC",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            {currentChapter.partLabel}: {currentChapter.title}
          </span>
        </div>

        {/* Right: Era & Scene Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(4, 12, 26, 0.84)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: 999,
              padding: "6px 16px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
            }}
          >
            <span
              style={{
                color: "#F59E0B",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {currentChapter.historicalEra}
            </span>
          </div>

          {/* Scene Context Badge */}
          {currentDesc && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(2, 6, 16, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 999,
                padding: "4px 14px",
                maxWidth: 480,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#06B6D4",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: "#E2E8F0",
                  fontSize: 12,
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {currentDesc}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Chapter Intro Card (Xuất hiện mượt mà trong ~6s đầu mỗi chapter) */}
      {isFullBanner && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${0.92 + introProgress * 0.08})`,
            opacity: introProgress * bannerFadeOut,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "36px 56px",
            background:
              "linear-gradient(135deg, rgba(4, 14, 30, 0.94) 0%, rgba(10, 24, 46, 0.92) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(6, 182, 212, 0.4)",
            borderRadius: 24,
            boxShadow:
              "0 24px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            maxWidth: 880,
          }}
        >
          <div
            style={{
              color: "#06B6D4",
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {currentChapter.partLabel} • {currentChapter.historicalEra}
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 14,
              textShadow: "0 4px 18px rgba(0, 0, 0, 0.5)",
            }}
          >
            {currentChapter.title}
          </div>
          <div
            style={{
              color: "#CBD5E1",
              fontSize: 18,
              fontWeight: 500,
              maxWidth: 720,
              lineHeight: 1.45,
            }}
          >
            {currentChapter.subtitle}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
