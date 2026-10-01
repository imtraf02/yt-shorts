import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { HistoryGapsChapter } from "../data/historyGapsData";

interface HistoryGapsOverlaysProps {
  currentChapter: HistoryGapsChapter;
  chapterLocalFrame: number;
}

export const HistoryGapsOverlays: React.FC<HistoryGapsOverlaysProps> = ({
  currentChapter,
  chapterLocalFrame,
}) => {
  const globalFrame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Hiệu ứng xuất hiện của Chapter Card đầu mỗi phần
  const introProgress = interpolate(
    chapterLocalFrame,
    [10, 40],
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
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 10 }}>
      {/* 1. Lớp phủ Vignette phim tài liệu lịch sử */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(12, 8, 4, 0.72) 100%), linear-gradient(180deg, rgba(8, 5, 2, 0.78) 0%, transparent 18%, transparent 80%, rgba(6, 4, 2, 0.92) 100%)",
        }}
      />

      {/* 2. Top Header HUD */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 54,
          right: 54,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fef3c7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Đèn chỉ báo hổ phách ấm (Amber Pulse) */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              boxShadow: "0 0 10px #f59e0b, 0 0 16px rgba(245, 158, 11, 0.75)",
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#fbbf24",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            KHOẢNG TRỐNG LỊCH SỬ
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>/</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#fde68a",
              letterSpacing: "0.06em",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {currentChapter.partLabel}: {currentChapter.title}
          </span>
        </div>

        {/* Niên đại lịch sử */}
        <div
          style={{
            backgroundColor: "rgba(20, 12, 5, 0.82)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            borderRadius: 8,
            padding: "5px 14px",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#fef08a",
            backdropFilter: "blur(8px)",
          }}
        >
          {currentChapter.historicalEra}
        </div>
      </div>

      {/* 3. Top Progress Bar (Tổng thể toàn bộ phim tài liệu) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(globalFrame / durationInFrames) * 100}%`,
            background: "linear-gradient(90deg, #d97706, #fbbf24, #f59e0b)",
            boxShadow: "0 0 10px rgba(251, 191, 36, 0.8)",
          }}
        />
      </div>

      {/* 4. Banner Intro Card lớn giữa màn hình đầu mỗi phần */}
      {isFullBanner && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            opacity: introProgress * bannerFadeOut,
            transform: `translateY(${(1 - introProgress) * 18}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(10, 6, 2, 0.88)",
              border: "1px solid rgba(245, 158, 11, 0.45)",
              borderRadius: 20,
              padding: "24px 56px",
              textAlign: "center",
              backdropFilter: "blur(20px)",
              boxShadow: "0 12px 48px rgba(0, 0, 0, 0.85)",
              maxWidth: 1100,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#f59e0b",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {currentChapter.partLabel} · {currentChapter.historicalEra}
            </div>
            <h1
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "0.02em",
                margin: "0 0 12px 0",
                textShadow: "0 4px 18px rgba(0, 0, 0, 0.9)",
              }}
            >
              {currentChapter.title}
            </h1>
            <p
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#fef08a",
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
