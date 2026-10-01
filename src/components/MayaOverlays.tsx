import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { MayaChapter } from "../data/mayaData";

interface MayaOverlaysProps {
  currentChapter: MayaChapter;
  chapterLocalFrame: number;
}

export const MayaOverlays: React.FC<MayaOverlaysProps> = ({
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
      {/* 1. Lớp phủ Vignette rừng nhiệt đới & đá cổ điện ảnh */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(6, 18, 12, 0.72) 100%), linear-gradient(180deg, rgba(4, 12, 8, 0.78) 0%, transparent 18%, transparent 80%, rgba(3, 10, 6, 0.92) 100%)",
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
          color: "#ecfdf5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Đèn chỉ báo xanh ngọc bích Maya (Jade Pulse) */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 10px #10b981, 0 0 16px rgba(16, 185, 129, 0.7)",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#34d399",
            }}
          >
            HỒ SƠ KHẢO CỔ HỌC · BÍ ẨN LỊCH SỬ
          </span>
          <span style={{ color: "#065f46" }}>|</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#ecfdf5",
              letterSpacing: 1.2,
            }}
          >
            ĐẾ CHẾ MAYA SỤP ĐỔ
          </span>
        </div>

        {/* Góc trên bên phải: Tên phân đoạn đang phát */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(6, 22, 14, 0.92)",
            border: "1px solid rgba(52, 211, 153, 0.45)",
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
              backgroundColor: "#34d399",
              boxShadow: "0 0 10px #34d399",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#a7f3d0",
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
            background: "linear-gradient(90deg, #059669 0%, #10b981 50%, #6ee7b7 100%)",
            boxShadow: "0 0 12px rgba(16, 185, 129, 0.8)",
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
            backgroundColor: "rgba(6, 20, 14, 0.92)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            borderLeft: "5px solid #10b981",
            borderRadius: 14,
            padding: "18px 28px",
            backdropFilter: "blur(16px)",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.8)",
            maxWidth: 820,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#10b981",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              HỒ SƠ KHẢO CỔ
            </span>
            <span style={{ color: "#065f46" }}>•</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#a7f3d0",
                letterSpacing: 1.5,
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                padding: "2px 8px",
                borderRadius: 4,
                border: "1px solid rgba(16, 185, 129, 0.3)",
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
              color: "#f0fdf4",
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
              color: "#d1fae5",
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
