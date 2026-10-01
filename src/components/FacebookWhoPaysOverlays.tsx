import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import type { FacebookWhoPaysChapter } from "../data/facebookWhoPaysData";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

interface FacebookWhoPaysOverlaysProps {
  currentChapter: FacebookWhoPaysChapter;
  chapterLocalFrame: number;
}

export const FacebookWhoPaysOverlays: React.FC<FacebookWhoPaysOverlaysProps> = ({
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
      {/* 1. Lớp phủ Vignette phim tài liệu công nghệ - kinh tế học */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(4, 8, 20, 0.72) 100%), linear-gradient(180deg, rgba(3, 7, 18, 0.82) 0%, transparent 16%, transparent 80%, rgba(3, 7, 18, 0.90) 100%)",
        }}
      />

      {/* 2. Top Header HUD */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 54,
          right: 54,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#f8fafc",
        }}
      >
        {/* Left: Auto-width pill badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(10, 15, 29, 0.85)",
            border: "1px solid rgba(56, 189, 248, 0.28)",
            borderRadius: 24,
            padding: "6px 18px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
            width: "fit-content",
          }}
        >
          {/* Đèn chỉ báo Cyan Pulse */}
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#38bdf8",
              boxShadow: "0 0 10px #38bdf8, 0 0 16px rgba(56, 189, 248, 0.75)",
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#38bdf8",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            AI ĐANG TRẢ TIỀN?
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 15 }}>/</span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "0.04em",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {currentChapter.partLabel}: {currentChapter.title}
          </span>
        </div>

        {/* Right: Góc nhìn kinh tế học */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 29, 0.85)",
            border: "1px solid rgba(250, 204, 21, 0.35)",
            borderRadius: 20,
            padding: "6px 16px",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.10em",
            color: "#facc15",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
          }}
        >
          {currentChapter.historicalEra}
        </div>
      </div>

      {/* 3. Top Progress Bar (Tổng thể toàn bộ video) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(globalFrame / durationInFrames) * 100}%`,
            background: "linear-gradient(90deg, #0284c7, #38bdf8, #10b981)",
            boxShadow: "0 0 12px rgba(56, 189, 248, 0.85)",
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
            transform: `translateY(${(1 - introProgress) * 16}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(6, 10, 24, 0.90)",
              border: "1px solid rgba(56, 189, 248, 0.40)",
              borderRadius: 24,
              padding: "28px 56px",
              textAlign: "center",
              backdropFilter: "blur(24px)",
              boxShadow: "0 16px 56px rgba(0, 0, 0, 0.85), 0 0 32px rgba(56, 189, 248, 0.20)",
              maxWidth: 1150,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#38bdf8",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 10,
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
                margin: "0 0 14px 0",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.95)",
              }}
            >
              {currentChapter.title}
            </h1>
            <p
              style={{
                fontSize: 21,
                fontWeight: 600,
                color: "#cbd5e1",
                margin: 0,
                lineHeight: 1.45,
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
