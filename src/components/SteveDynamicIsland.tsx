import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const SteveDynamicIsland: React.FC<{
  readonly tag?: string;
  readonly era?: string;
  readonly accentColor?: string;
}> = ({
  tag = "APPLE & NHỮNG ĐỘT PHÁ THẾ KỶ",
  era = "1955 - 2011",
  accentColor = "#0071E3", // Apple Iconic Blue
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 200 },
  });

  const translateY = interpolate(entrance, [0, 1], [-40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 84,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        pointerEvents: "none",
        zIndex: 120,
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
      }}
    >
      {/* Cupertino Dynamic Island Capsule */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          backgroundColor: "rgba(10, 10, 14, 0.88)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          borderRadius: 30,
          padding: "8px 22px",
          boxShadow:
            "0 12px 36px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
        }}
      >
        {/* Authentic Apple Logo in Crisp SVG */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <svg
            width={16}
            height={20}
            viewBox="0 0 170 170"
            fill="#FFFFFF"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
            }}
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.74-11.64-14.1-5.77-9.04-10.33-19.16-13.68-30.34-3.35-11.18-5.03-21.67-5.03-31.48 0-13.52 3.48-24.8 10.45-33.84 6.96-9.04 15.7-13.67 26.22-13.88 4.9.11 10.33 1.34 16.29 3.69 5.96 2.35 10.02 3.6 12.18 3.75 1.74-.15 6.09-1.46 13.05-3.92 6.96-2.46 12.87-3.55 17.73-3.27 13.29.65 23.47 5.37 30.55 14.16-11.75 7.08-17.52 16.89-17.3 29.43.22 9.79 3.97 17.96 11.25 24.52 7.28 6.56 16.03 10.28 26.25 11.15-2.28 6.75-4.89 13.43-7.83 20.03zM119.22 31.84c0-7.39 2.67-14.19 8.01-20.4 5.33-6.21 11.85-10.47 19.56-12.78-.33 1.95-.54 3.69-.65 5.22-.33 7.61-3.16 14.61-8.5 21-5.33 6.39-11.85 10.28-19.56 11.67.11-1.63.14-3.2.14-4.71z" />
          </svg>
        </div>

        {/* Vertical Divider */}
        <div
          style={{
            width: 1,
            height: 18,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
        />

        {/* Dynamic Chapter / Topic Title */}
        <span
          style={{
            color: "#FFFFFF",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {tag}
        </span>

        {/* Era Badge Capsule */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderRadius: 14,
            padding: "2px 10px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <span
            style={{
              color: "#A1A1A6",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.8px",
            }}
          >
            {era}
          </span>
        </div>
      </div>
    </div>
  );
};
