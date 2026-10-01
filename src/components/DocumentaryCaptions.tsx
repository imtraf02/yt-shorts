import React from "react";
import { useVideoConfig, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
export interface CaptionWord {
  word: string;
  startMs: number;
  endMs: number;
}

export interface CaptionPhrase {
  id?: number;
  startMs: number;
  endMs: number;
  words: CaptionWord[];
  text?: string;
  textEn?: string;
}

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

const cleanDisplayWord = (raw: string) => {
  return raw.trim();
};

interface DocumentaryCaptionsProps {
  phrases: CaptionPhrase[];
  chapterLocalFrame: number;
  maxWidth?: number;
  bottom?: number;
  offsetMs?: number;
  bgOpacity?: number;
}

export const DocumentaryCaptions: React.FC<DocumentaryCaptionsProps> = ({
  phrases,
  chapterLocalFrame,
  maxWidth = 1380,
  bottom = 50,
  offsetMs = 0,
  bgOpacity = 0.52,
}) => {
  const { fps } = useVideoConfig();
  const currentMs = (chapterLocalFrame / fps) * 1000 - offsetMs;

  if (!phrases || phrases.length === 0 || currentMs < 0) {
    return null;
  }

  // Tìm cụm phụ đề hiện tại
  const currentPhrase = phrases.find(
    (p) => currentMs >= p.startMs && currentMs < p.endMs
  );

  if (!currentPhrase) {
    return null;
  }

  // Tìm từ đang được đọc (active word)
  const activeWordIndex = currentPhrase.words.findIndex(
    (w) => currentMs >= w.startMs && currentMs < w.endMs
  );

  const phraseElapsedMs = currentMs - currentPhrase.startMs;
  const phraseOpacity = interpolate(phraseElapsedMs, [0, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phraseY = interpolate(phraseElapsedMs, [0, 80], [6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 1. Tính toán độ dài câu phụ đề (Tiếng Việt & Tiếng Anh)
  const vnText = currentPhrase.words.map((w) => cleanDisplayWord(w.word)).join(" ");
  const vnCharLength = vnText.length;
  const enCharLength = currentPhrase.textEn ? currentPhrase.textEn.length : 0;
  const wordCount = currentPhrase.words.length;

  // Điểm đánh giá độ dài câu kết hợp giữa số ký tự và số từ
  const lengthScore = Math.max(vnCharLength, enCharLength * 0.95, wordCount * 5.2);

  // 2. Tự động điều chỉnh kích thước text (Auto-shrink for long sentences)
  let activeFontSize = 26;
  let normalFontSize = 24;
  let enFontSize = 18;
  let wordGap = "8px 12px";
  let strokeWidth = "6px";
  let boxPadding = currentPhrase.textEn ? "10px 28px 12px" : "10px 28px";
  let activeWordPadding = "3px 12px";

  if (lengthScore > 140) {
    // Câu rất dài (>140 ký tự hoặc >27 từ): thu nhỏ rõ rệt để không choán màn hình
    activeFontSize = 18;
    normalFontSize = 16.5;
    enFontSize = 13.5;
    wordGap = "4px 8px";
    strokeWidth = "4px";
    boxPadding = currentPhrase.textEn ? "6px 20px 8px" : "6px 20px";
    activeWordPadding = "2px 8px";
  } else if (lengthScore > 100) {
    // Câu dài (100 - 140 ký tự hoặc 20 - 27 từ)
    activeFontSize = 20.5;
    normalFontSize = 19;
    enFontSize = 15;
    wordGap = "5px 9px";
    strokeWidth = "5px";
    boxPadding = currentPhrase.textEn ? "7px 22px 10px" : "7px 22px";
    activeWordPadding = "2.5px 9px";
  } else if (lengthScore > 70) {
    // Câu hơi dài (70 - 100 ký tự hoặc 14 - 20 từ)
    activeFontSize = 23;
    normalFontSize = 21.5;
    enFontSize = 16.5;
    wordGap = "6px 10px";
    strokeWidth = "5.5px";
    boxPadding = currentPhrase.textEn ? "8px 24px 10px" : "8px 24px";
    activeWordPadding = "3px 10px";
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 15,
        fontFamily,
        opacity: phraseOpacity,
        transform: `translateY(${phraseY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth,
          backgroundColor: `rgba(3, 7, 18, ${bgOpacity})`,
          border: "1px solid rgba(255, 255, 255, 0.10)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.50)",
          padding: boxPadding,
          borderRadius: 18,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        {/* Dòng phụ đề Tiếng Anh (song ngữ: ở TRÊN và nhỏ hơn tiếng Việt một chút) */}
        {currentPhrase.textEn ? (
          <div
            style={{
              marginBottom: activeFontSize < 20 ? 4 : 6,
              fontSize: enFontSize,
              fontWeight: 600,
              fontStyle: "italic",
              color: "#E2E8F0",
              textAlign: "center",
              lineHeight: 1.35,
              letterSpacing: "0.2px",
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.95)",
            }}
          >
            {currentPhrase.textEn}
          </div>
        ) : null}

        {/* Dòng phụ đề Tiếng Việt (Kinetic word highlight) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: wordGap,
          }}
        >
          {currentPhrase.words.map((w, idx) => {
            const displayWord = cleanDisplayWord(w.word);
            if (!displayWord) return null;

            const isActive = idx === activeWordIndex;

            const wordElapsedMs = currentMs - w.startMs;
            const popScale = isActive
              ? interpolate(wordElapsedMs, [0, 50, 120], [0.95, 1.10, 1.05], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 1;

            return (
              <span
                key={`${currentPhrase.startMs}-${idx}`}
                style={
                  isActive
                    ? {
                        display: "inline-block",
                        background:
                          "linear-gradient(135deg, #FEF08A 0%, #F59E0B 50%, #D97706 100%)",
                        color: "#0F172A",
                        fontSize: activeFontSize,
                        fontWeight: 900,
                        padding: activeWordPadding,
                        borderRadius: activeFontSize < 20 ? 6 : 8,
                        border: "1.5px solid #FEF3C7",
                        boxShadow:
                          "0 0 18px rgba(245, 158, 11, 0.7), 0 2px 8px rgba(0, 0, 0, 0.7)",
                        transform: `scale(${popScale})`,
                        letterSpacing: "0.5px",
                        lineHeight: 1.25,
                      }
                    : {
                        display: "inline-block",
                        color: "#FFFFFF",
                        fontSize: normalFontSize,
                        fontWeight: 700,
                        WebkitTextStroke: `${strokeWidth} #020617`,
                        paintOrder: "stroke fill",
                        textShadow:
                          "0 2px 8px rgba(0, 0, 0, 0.95), 0 0 16px rgba(0, 0, 0, 0.8)",
                        letterSpacing: "0.4px",
                        lineHeight: 1.25,
                      }
                }
              >
                {displayWord}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
