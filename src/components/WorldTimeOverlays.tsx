import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import type { WorldTimeChapter } from "../data/worldTimeData";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

interface WorldTimeOverlaysProps {
  currentChapter: WorldTimeChapter;
  chapterLocalFrame: number;
}

export const WorldTimeOverlays: React.FC<WorldTimeOverlaysProps> = ({
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

      {/* 2. Thanh tiến trình video tinh tế trên đỉnh (Progress Bar) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(globalFrame / Math.max(1, durationInFrames)) * 100}%`,
            background: "linear-gradient(90deg, #0284C7, #38BDF8, #FACC15)",
            boxShadow: "0 0 10px rgba(56, 189, 248, 0.7)",
          }}
        />
      </div>

      {/* 3. Top Header: Auto-width Pill Badge (Chuẩn AGENTS.md Rule 3.2: top: 96, left: 36) */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 48,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 18px",
            borderRadius: 30,
            backgroundColor: "rgba(6, 13, 24, 0.75)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#38BDF8",
              boxShadow: "0 0 8px #38BDF8",
            }}
          />
          <span
            style={{
              color: "#F8FAFC",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            VÌ SAO CẢ THẾ GIỚI CÙNG MỘ THỜI ĐIỂM?
          </span>
        </div>

        {/* Badge chương hiện tại */}
        <div
          style={{
            padding: "8px 14px",
            borderRadius: 30,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(10px)",
            color: "#94A3B8",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.8,
            textTransform: "uppercase",
          }}
        >
          {currentChapter.badge}
        </div>
      </div>

      {/* 4. Chapter Intro Card (Xuất hiện mượt mà đầu mỗi chương) */}
      {isFullBanner && (
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 48,
            opacity: introProgress * bannerFadeOut,
            transform: `translateY(${(1 - introProgress) * 16}px)`,
            maxWidth: 720,
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderRadius: 16,
              backgroundColor: "rgba(3, 7, 18, 0.82)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              style={{
                color: "#38BDF8",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              CHƯƠNG {currentChapter.id.replace("part", "")}: {currentChapter.badge}
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: 900,
                lineHeight: 1.3,
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {currentChapter.title}
            </div>
            {currentChapter.subtitle && (
              <div
                style={{
                  color: "#CBD5E1",
                  fontSize: 14,
                  fontWeight: 600,
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {currentChapter.subtitle}
              </div>
            )}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
