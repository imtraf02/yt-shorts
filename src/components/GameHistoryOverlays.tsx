import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import type { GameHistoryChapter } from "../data/gameHistoryData";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

interface GameHistoryOverlaysProps {
  currentChapter: GameHistoryChapter;
  chapterLocalFrame: number;
}

export const GameHistoryOverlays: React.FC<GameHistoryOverlaysProps> = ({
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
      {/* 1. Lớp phủ Vignette phong cách Vox Documentary & Anime */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(6, 13, 24, 0.72) 100%), linear-gradient(180deg, rgba(4, 9, 20, 0.85) 0%, transparent 16%, transparent 80%, rgba(4, 9, 20, 0.92) 100%)",
        }}
      />

      {/* 2. Top Progress Bar (Gradient Teal -> Vàng Mustard) */}
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
              "linear-gradient(90deg, #14B8A6 0%, #06B6D4 40%, #F59E0B 80%, #FBBF24 100%)",
            boxShadow: "0 0 12px rgba(245, 158, 11, 0.6)",
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
            background: "rgba(10, 20, 35, 0.82)",
            border: "1px solid rgba(20, 184, 166, 0.35)",
            borderRadius: 9999,
            padding: "8px 20px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1.2,
              color: "#2DD4BF",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#2DD4BF",
                boxShadow: "0 0 8px #2DD4BF",
              }}
            />
            5.000 NĂM LỊCH SỬ TRÒ CHƠI
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.25)", fontSize: 13 }}>/</span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: 0.5,
            }}
          >
            {currentChapter.partLabel}: {currentChapter.title}
          </span>
        </div>

        {/* Right: Topic / Era Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            borderRadius: 9999,
            padding: "8px 18px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#FBBF24",
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            {currentChapter.historicalEra}
          </span>
        </div>
      </div>

      {/* 4. Contextual Scene Badge (Mô tả cảnh minh họa thời gian thực) */}
      <SceneDescriptionBadge
        currentChapter={currentChapter}
        chapterLocalFrame={chapterLocalFrame}
      />

      {/* 5. Chapter Intro Card (Xuất hiện đầu mỗi chương trong ~6 giây) */}
      {isFullBanner && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: bannerFadeOut,
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(8, 18, 35, 0.94) 0%, rgba(13, 27, 48, 0.92) 100%)",
              border: "1px solid rgba(20, 184, 166, 0.4)",
              borderRadius: 24,
              padding: "36px 54px",
              maxWidth: 960,
              textAlign: "center",
              boxShadow:
                "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(20, 184, 166, 0.15)",
              backdropFilter: "blur(20px)",
              transform: `scale(${interpolate(introProgress, [0, 1], [0.92, 1])}) translateY(${interpolate(
                introProgress,
                [0, 1],
                [20, 0]
              )}px)`,
              opacity: introProgress,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 3,
                color: "#2DD4BF",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {currentChapter.partLabel} · {currentChapter.historicalEra}
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#FFFFFF",
                margin: "0 0 14px 0",
                lineHeight: 1.2,
                textShadow: "0 4px 16px rgba(0, 0, 0, 0.6)",
              }}
            >
              {currentChapter.title}
            </h1>
            <p
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "rgba(226, 232, 240, 0.85)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {currentChapter.subtitle}
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Sub-component hiển thị mô tả phân cảnh hiện tại ở góc trên bên phải
const SceneDescriptionBadge: React.FC<{
  currentChapter: GameHistoryChapter;
  chapterLocalFrame: number;
}> = ({ currentChapter, chapterLocalFrame }) => {
  const images = currentChapter.images;
  const startFrames = currentChapter.imageStartFrames;
  const descriptions = currentChapter.imageDescriptions;

  let activeIndex = 0;
  if (startFrames && startFrames.length === images.length) {
    for (let i = 0; i < startFrames.length; i++) {
      if (chapterLocalFrame >= startFrames[i]) {
        activeIndex = i;
      } else {
        break;
      }
    }
  } else {
    const baseFrames = Math.floor(currentChapter.durationInFrames / images.length);
    activeIndex = Math.min(
      images.length - 1,
      Math.floor(chapterLocalFrame / baseFrames)
    );
  }

  const desc = descriptions[activeIndex] || "";
  if (!desc) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 86,
        right: 48,
        maxWidth: 580,
        background: "rgba(10, 20, 36, 0.78)",
        border: "1px solid rgba(245, 158, 11, 0.25)",
        borderRadius: 9999,
        padding: "6px 16px",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#F59E0B",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "rgba(241, 245, 249, 0.9)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
    </div>
  );
};
