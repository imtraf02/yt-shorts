import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { PhraseCaption } from "../data/worldcupSubtitles";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

const RED_CARD_WORDS = new Set([
  "thẻ",
  "đỏ",
  "việt",
  "vị",
  "phạt",
  "đền",
  "thua",
  "lộ",
  "khóc",
  "oan",
  "buồn",
  "hủy",
  "ngã",
]);

const GOLD_CARD_WORDS = new Set([
  "phép",
  "màu",
  "công",
  "bằng",
  "thắng",
  "mạnh",
  "tốt",
  "fifa",
  "hàn",
  "vũ",
  "trụ",
  "vàng",
  "tuyệt",
  "đối",
]);

export const WorldCupCaptions: React.FC<{
  readonly phrases: PhraseCaption[];
  readonly bottom?: number;
}> = ({ phrases, bottom = 290 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;

  // Find active phrase
  const activePhrase = phrases.find(
    (p) => currentMs >= p.startMs - 60 && currentMs <= p.endMs + 100
  );

  if (!activePhrase) {
    return null;
  }

  // Find active word index
  const activeWordIdx = activePhrase.words.findIndex(
    (w) => currentMs >= w.startMs - 30 && currentMs <= w.endMs + 50
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 48,
        right: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 130,
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 18px",
          textAlign: "center",
          maxWidth: 980,
        }}
      >
        {activePhrase.words.map((w, idx) => {
          const isActive = idx === activeWordIdx;
          const isKeyword = w.isKeyword;

          const cleanWord = w.word
            .toLowerCase()
            .replace(/['"“”,.—:!?;]/gu, "")
            .trim();

          const isRed = RED_CARD_WORDS.has(cleanWord);
          const isGold = GOLD_CARD_WORDS.has(cleanWord);

          if (isActive) {
            if (isRed) {
              return (
                <span
                  key={`${w.word}-${idx}`}
                  style={{
                    display: "inline-block",
                    background:
                      "linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)",
                    color: "#FFFFFF",
                    fontSize: 45,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    padding: "4px 18px",
                    borderRadius: 14,
                    boxShadow:
                      "0 0 25px rgba(239, 68, 68, 0.95), 0 4px 14px rgba(0,0,0,0.9)",
                    border: "2px solid #FCA5A5",
                    transform: "scale(1.08)",
                    letterSpacing: "0.8px",
                    lineHeight: 1.25,
                  }}
                >
                  {w.word}
                </span>
              );
            }

            if (isGold) {
              return (
                <span
                  key={`${w.word}-${idx}`}
                  style={{
                    display: "inline-block",
                    background:
                      "linear-gradient(135deg, #F59E0B 0%, #EAB308 50%, #CA8A04 100%)",
                    color: "#051A0E",
                    fontSize: 45,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    padding: "4px 18px",
                    borderRadius: 14,
                    boxShadow:
                      "0 0 25px rgba(245, 158, 11, 0.9), 0 4px 14px rgba(0,0,0,0.85)",
                    border: "2px solid #FEF08A",
                    transform: "scale(1.08)",
                    letterSpacing: "0.8px",
                    lineHeight: 1.25,
                  }}
                >
                  {w.word}
                </span>
              );
            }

            // Standard Neon Pitch Green Active Pill
            return (
              <span
                key={`${w.word}-${idx}`}
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
                  color: "#FFFFFF",
                  fontSize: 45,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  padding: "4px 18px",
                  borderRadius: 14,
                  boxShadow:
                    "0 0 25px rgba(16, 185, 129, 0.9), 0 4px 14px rgba(0,0,0,0.85)",
                  border: "2px solid #86EFAC",
                  transform: "scale(1.08)",
                  letterSpacing: "0.8px",
                  lineHeight: 1.25,
                }}
              >
                {w.word}
              </span>
            );
          }

          // Inactive Word
          return (
            <span
              key={`${w.word}-${idx}`}
              style={{
                display: "inline-block",
                color: isKeyword ? "#86EFAC" : "#F8FAFC",
                fontSize: 43,
                fontWeight: isKeyword ? 800 : 700,
                textShadow:
                  "0 3px 12px rgba(0, 0, 0, 0.98), 0 0 24px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)",
                letterSpacing: "0.5px",
                lineHeight: 1.25,
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
