import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { PhraseCaption } from "../data/vangoghSubtitles";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

const DANGER_WORDS = new Set([
  "thất",
  "bại",
  "chết",
  "tai",
  "cắt",
  "súng",
  "tự",
  "tử",
  "khủng",
  "hoảng",
  "xung",
  "đột",
  "cãi",
  "vã",
  "bệnh",
  "tật",
  "cô",
  "độc",
  "nghèo",
  "khó",
  "bị",
  "thương",
]);

export const VanGoghCaptions: React.FC<{
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
                    boxShadow:
                      "0 0 25px rgba(220, 38, 38, 0.9), 0 4px 14px rgba(0,0,0,0.9)",
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

            // Glowing Sunflower Amber Active Pill
            return (
              <span
                key={`${w.word}-${idx}`}
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)",
                  color: "#0F0A02",
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

          // Inactive Word: Heavy contrast with thick shadow and keyword tint
          return (
            <span
              key={`${w.word}-${idx}`}
              style={{
                display: "inline-block",
                color: isKeyword ? "#FACC15" : "#FFFFFF",
                fontSize: 43,
                fontWeight: isKeyword ? 800 : 700,
                textShadow:
                  "0 3px 12px rgba(2, 6, 16, 0.98), 0 0 24px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)",
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
