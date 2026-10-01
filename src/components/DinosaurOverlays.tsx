import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { DinosaurChapter } from "../data/dinosaurData";

interface DinosaurOverlaysProps {
  currentChapter: DinosaurChapter;
  chapterLocalFrame: number;
}

export const DinosaurOverlays: React.FC<DinosaurOverlaysProps> = ({
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
      {/* 1. Lớp phủ Vignette rừng nguyên sinh & đất đá kỷ Jura điện ảnh */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(18, 12, 6, 0.72) 100%), linear-gradient(180deg, rgba(14, 8, 4, 0.80) 0%, transparent 18%, transparent 80%, rgba(12, 6, 3, 0.94) 100%)",
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
          color: "#fffbeb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Đèn chỉ báo hổ phách hóa thạch (Amber Fossil Pulse) */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              boxShadow: "0 0 10px #f59e0b, 0 0 18px rgba(245, 158, 11, 0.8)",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#fbbf24",
            }}
          >
            KHOA HỌC CỔ SINH · HỒ SƠ TIỀN SỬ
          </span>
          <span style={{ color: "#78350f" }}>|</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fef3c7",
              letterSpacing: 1.2,
            }}
          >
            TOÀN CẢNH KHỦNG LONG
          </span>
        </div>

        {/* Góc trên bên phải: Tên chương đang phát */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(22, 14, 8, 0.92)",
            border: "1px solid rgba(245, 158, 11, 0.45)",
            borderRadius: 8,
            padding: "6px 18px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
            maxWidth: 680,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              boxShadow: "0 0 10px #f59e0b",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#fde68a",
              letterSpacing: 1.2,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentChapter.title}
          </span>
        </div>
      </div>

      {/* 3. Top Progress Bar xuyên suốt toàn bộ thời lượng video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(globalFrame / Math.max(1, durationInFrames)) * 100}%`,
            background: "linear-gradient(90deg, #b45309 0%, #f59e0b 50%, #fde68a 100%)",
            boxShadow: "0 0 12px rgba(245, 158, 11, 0.8)",
          }}
        />
      </div>

      {/* 4. Animated Chapter Intro Card (Xuất hiện 6.5s đầu mỗi chương) */}
      {isFullBanner && (
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 54,
            opacity: introProgress * bannerFadeOut,
            transform: `translateY(${interpolate(introProgress, [0, 1], [18, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            backgroundColor: "rgba(20, 12, 6, 0.94)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            borderLeft: "5px solid #f59e0b",
            borderRadius: 14,
            padding: "18px 28px",
            backdropFilter: "blur(16px)",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.8)",
            maxWidth: 840,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#f59e0b",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              HỒ SƠ CỔ SINH
            </span>
            <span style={{ color: "#78350f" }}>•</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#fde68a",
                letterSpacing: 1.5,
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                padding: "2px 8px",
                borderRadius: 4,
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              {currentChapter.historicalEra}
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 800,
              color: "#fffbeb",
              letterSpacing: 0.5,
              lineHeight: 1.25,
            }}
          >
            {currentChapter.title}
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 500,
              color: "#fef3c7",
              lineHeight: 1.4,
            }}
          >
            {currentChapter.subtitle}
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
