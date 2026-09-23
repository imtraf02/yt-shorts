import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const VoxBackground: React.FC<{
  readonly showArchitecturalElements?: boolean;
}> = ({ showArchitecturalElements = true }) => {
  const frame = useCurrentFrame();

  // Very subtle camera float
  const panY = Math.sin(frame * 0.015) * 4;
  const panX = Math.cos(frame * 0.012) * 3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B1A2F", // Signature Deep Navy from reference
        overflow: "hidden",
      }}
    >
      {/* Background Graphic Layer */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          transform: `translate(${panX}px, ${panY}px)`,
        }}
      >
        {/* Subtle Screenprint / Halftone Texture */}
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, opacity: 0.35 }}
        >
          <defs>
            <pattern
              id="midcentury-grid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="rgba(91, 178, 196, 0.1)"
                strokeWidth="1"
              />
              <circle cx="32" cy="32" r="1" fill="rgba(242, 116, 56, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#midcentury-grid)" />
        </svg>

        {showArchitecturalElements && (
          <>
            {/* Top-Right Atomic Diagram Graphic (Like the poster in the reference image) */}
            <svg
              width="240"
              height="240"
              viewBox="0 0 200 200"
              style={{
                position: "absolute",
                top: 40,
                right: 30,
                opacity: 0.25,
                pointerEvents: "none",
              }}
            >
              {/* Atomic frame */}
              <rect
                x="15"
                y="15"
                width="170"
                height="170"
                fill="none"
                stroke="#FCF6E8"
                strokeWidth="3"
              />
              {/* Nucleus */}
              <circle cx="100" cy="100" r="18" fill="#196377" />
              {/* 3 Orbital Ellipses */}
              <ellipse
                cx="100"
                cy="100"
                rx="65"
                ry="24"
                fill="none"
                stroke="#FCF6E8"
                strokeWidth="2.5"
                transform="rotate(0 100 100)"
              />
              <ellipse
                cx="100"
                cy="100"
                rx="65"
                ry="24"
                fill="none"
                stroke="#FCF6E8"
                strokeWidth="2.5"
                transform="rotate(60 100 100)"
              />
              <ellipse
                cx="100"
                cy="100"
                rx="65"
                ry="24"
                fill="none"
                stroke="#FCF6E8"
                strokeWidth="2.5"
                transform="rotate(120 100 100)"
              />
              {/* Electrons */}
              <circle cx="165" cy="100" r="6" fill="#F27438" />
              <circle cx="67" cy="43" r="6" fill="#F27438" />
              <circle cx="67" cy="157" r="6" fill="#F27438" />
            </svg>

            {/* Arched Window Graphic Outline (Left Side) */}
            <svg
              width="180"
              height="360"
              viewBox="0 0 180 360"
              style={{
                position: "absolute",
                top: 80,
                left: 10,
                opacity: 0.18,
                pointerEvents: "none",
              }}
            >
              <path
                d="M 20 360 L 20 90 A 70 70 0 0 1 160 90 L 160 360"
                fill="#196377"
                stroke="#FCF6E8"
                strokeWidth="3"
              />
              <line x1="90" y1="20" x2="90" y2="360" stroke="#FCF6E8" strokeWidth="2.5" />
              <line x1="20" y1="90" x2="160" y2="90" stroke="#FCF6E8" strokeWidth="2.5" />
              <line x1="20" y1="180" x2="160" y2="180" stroke="#FCF6E8" strokeWidth="2.5" />
              <line x1="20" y1="270" x2="160" y2="270" stroke="#FCF6E8" strokeWidth="2.5" />
            </svg>

            {/* Mid-Century Hanging Pendant Lamp Graphic (Top Center) */}
            <svg
              width="180"
              height="160"
              viewBox="0 0 180 160"
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                opacity: 0.8,
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              {/* Lamp Cord */}
              <line x1="90" y1="0" x2="90" y2="70" stroke="#F27438" strokeWidth="3" />
              {/* Lamp Shade in Orange */}
              <path
                d="M 82 70 L 98 70 L 102 78 L 78 78 Z"
                fill="#F27438"
              />
              <path
                d="M 30 130 C 30 85 150 85 150 130 Z"
                fill="#F27438"
              />
              <ellipse cx="90" cy="130" rx="60" ry="10" fill="#FCF6E8" />
              {/* Subtle ambient light cone */}
              <polygon
                points="30,130 150,130 170,160 10,160"
                fill="rgba(245, 166, 35, 0.08)"
              />
            </svg>
          </>
        )}
      </div>

      {/* Top Header Label in Cream and Terracotta */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 55,
          color: "#FCF6E8",
          fontSize: 16,
          fontFamily: "'Courier New', Courier, monospace",
          fontWeight: 800,
          letterSpacing: 2,
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 10,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#F27438",
            boxShadow: "0 0 10px #F27438",
          }}
        />
        <span>KHOA HỌC GIẤC NGỦ // VOX EXPLAINER</span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 130,
          right: 55,
          color: "#0B1A2F",
          backgroundColor: "#F27438",
          fontSize: 15,
          fontFamily: "'Courier New', Courier, monospace",
          fontWeight: 900,
          letterSpacing: 1.5,
          padding: "5px 14px",
          borderRadius: 4,
          boxShadow: "0 4px 15px rgba(242, 116, 56, 0.4)",
          zIndex: 10,
        }}
      >
        EPISODE 01
      </div>

      {/* Soft Vignette Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(6, 14, 28, 0.75) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
