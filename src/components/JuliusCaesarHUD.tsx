import React from "react";

export const JuliusCaesarHUD: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 96,
      left: 36,
      width: "fit-content",
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 22px",
      borderRadius: 9999,
      background: "rgba(21, 13, 12, 0.94)",
      border: "2px solid #E6CDA1",
      boxShadow: "0 5px 0 #702323, 0 8px 18px rgba(28, 15, 10, 0.35)",
      zIndex: 150,
      fontFamily: "Georgia, serif",
    }}
  >
    <span
      style={{
        width: 11,
        height: 11,
        borderRadius: "50%",
        backgroundColor: "#F4543D",
        boxShadow: "0 0 8px #F4543D, 0 0 16px rgba(244, 84, 61, 0.8)",
        flexShrink: 0,
      }}
    />
    <span
      style={{
        color: "#F4E6C9",
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "1.5px",
        lineHeight: 1,
      }}
    >
      HỒ SƠ LA MÃ • JULIUS CAESAR
    </span>
  </div>
);
