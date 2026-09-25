import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { JuliusCaesarPhrase } from "../data/juliusCaesarSubtitles";

const EMPHASIS_WORDS = new Set([
  "2000",
  "44",
  "49",
  "23",
  "brutus",
  "caesar",
  "chết",
  "đâm",
  "độc",
  "gaul",
  "julius",
  "la",
  "mã",
  "quyền",
  "rubicon",
  "sụp",
  "thượng",
  "viện",
]);

const normalize = (word: string) =>
  word
    .toLocaleLowerCase("vi-VN")
    .replace(/[.,!?;:”“"'…()]/gu, "")
    .trim();

export const JuliusCaesarCaptions: React.FC<{
  readonly phrases: JuliusCaesarPhrase[];
  readonly bottom?: number;
}> = ({ phrases, bottom = 290 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;
  const phrase = phrases.find(
    (candidate) =>
      currentMs >= candidate.startMs && currentMs < candidate.endMs,
  );

  if (!phrase) {
    return null;
  }

  const words = phrase.words;
  const activeWordIndex = words.findIndex(
    (word) => currentMs >= word.startMs && currentMs < word.endMs,
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
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "7px 11px",
          textAlign: "center",
          maxWidth: 980,
        }}
      >
        {words.map((word, index) => {
          const isActive = index === activeWordIndex;
          const isKeyword = EMPHASIS_WORDS.has(normalize(word.word));

          return (
            <span
              key={`${phrase.startMs}-${index}`}
              style={
                isActive
                  ? {
                      display: "inline-block",
                      background:
                        "linear-gradient(130deg, #F2C46D 0%, #EAA64E 42%, #D74735 100%)",
                      color: "#140A02",
                      fontSize: 38,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      padding: "3px 13px",
                      borderRadius: 12,
                      boxShadow:
                        "0 0 25px rgba(215, 71, 53, 0.78), 0 0 10px rgba(242, 196, 109, 0.7)",
                      border: "2px solid #FFE3A5",
                      scale: "1.08",
                      letterSpacing: "0.6px",
                      lineHeight: 1.25,
                    }
                  : {
                      display: "inline-block",
                      color: isKeyword ? "#FACC15" : "#FFFFFF",
                      fontSize: 36,
                      fontWeight: isKeyword ? 800 : 700,
                      WebkitTextStroke: "10px #000000",
                      paintOrder: "stroke fill",
                      textShadow:
                        "0 3px 12px rgba(2, 2, 8, 0.9), 0 0 20px rgba(0, 0, 0, 0.8)",
                      letterSpacing: "0.4px",
                      lineHeight: 1.25,
                    }
              }
            >
              {word.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
