import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";
import { PhraseCaption } from "../data/nobelSubtitles";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

const DANGER_WORDS = new Set([
  "buôn",
  "chết",
  "hủy",
  "diệt",
  "vũ",
  "khí",
  "chiến",
  "tranh",
  "sợ",
  "hãi",
  "bi",
  "quan",
  "mâu",
  "thuẫn",
]);

export const NobelCaptions: React.FC<{
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
          const isDanger = DANGER_WORDS.has(cleanWord);

          if (isActive) {
            if (isDanger) {
              return (
                <span
                  key={`${w.word}-${idx}`}
                  style={{
                    display: "inline-block",
                    background:
                      "linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)",
                    color: "#FFFFFF",
                    fontSize: 45,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    padding: "4px 18px",
                    borderRadius: 14,
                    transform: "scale(1.08)",
                    boxShadow:
                      "0 0 30px rgba(220, 38, 38, 0.85), 0 8px 24px rgba(0, 0, 0, 0.9)",
                    letterSpacing: "0.5px",
                    border: "1px solid rgba(254, 202, 202, 0.6)",
                  }}
                >
                  {w.word}
                </span>
              );
            }

            return (
              <span
                key={`${w.word}-${idx}`}
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #D4AF37 50%, #FFD700 100%)",
                  color: "#0B0904",
                  fontSize: 45,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  padding: "4px 18px",
                  borderRadius: 14,
                  transform: "scale(1.08)",
                  boxShadow:
                    "0 0 28px rgba(245, 158, 11, 0.8), 0 0 12px rgba(254, 240, 138, 0.9), 0 8px 24px rgba(0, 0, 0, 0.9)",
                  letterSpacing: "0.5px",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
              >
                {w.word}
              </span>
            );
          }

          let color = "#FDFBF7"; // Antique Ivory
          if (isKeyword) {
            color = "#FDE047"; // Soft Royal Gold
          }

          return (
            <span
              key={`${w.word}-${idx}`}
              style={{
                display: "inline-block",
                color,
                fontSize: 44,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                WebkitTextStroke: "8px #08070A",
                paintOrder: "stroke fill",
                textShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0,0,0,0.8)",
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
