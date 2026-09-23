import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * YouTube Shorts Safe Zone Overlay.
 * Useful in Remotion Studio to ensure text and critical visuals
 * are not covered by YouTube Shorts mobile UI buttons:
 * - Right action rail: Like, Dislike, Comment, Share, Audio disk (~140px)
 * - Bottom info rail: Channel name, Subscribe button, Title/Desc (~380px)
 * - Top header rail: Search, Camera icon, Back button (~160px)
 */
export const ShortsSafeArea: React.FC<{
  readonly opacity?: number;
  readonly showGuideLines?: boolean;
}> = ({ opacity = 0.35, showGuideLines = true }) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {/* Top Header UI Zone */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          backgroundColor: `rgba(255, 0, 0, ${opacity * 0.5})`,
          borderBottom: showGuideLines ? "2px dashed #ff4444" : "none",
          display: "flex",
          alignItems: "center",
          paddingLeft: 40,
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        Top UI Danger Zone (Search / Camera)
      </div>

      {/* Right Action Rail UI Zone */}
      <div
        style={{
          position: "absolute",
          top: 160,
          right: 0,
          bottom: 380,
          width: 140,
          backgroundColor: `rgba(255, 0, 0, ${opacity * 0.4})`,
          borderLeft: showGuideLines ? "2px dashed #ff4444" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          writingMode: "vertical-rl",
          color: "white",
          fontSize: 22,
          fontWeight: "bold",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        Right Action Rail (Like / Comment / Share)
      </div>

      {/* Bottom Info UI Zone */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 380,
          backgroundColor: `rgba(255, 0, 0, ${opacity * 0.5})`,
          borderTop: showGuideLines ? "2px dashed #ff4444" : "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 40,
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        Bottom UI Danger Zone (Channel, Subscribe, Title)
      </div>

      {/* Center Safe Box */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          right: 160,
          bottom: 400,
          border: showGuideLines ? "3px solid #22c55e" : "none",
          borderRadius: 24,
          boxShadow: showGuideLines ? "0 0 20px rgba(34, 197, 94, 0.4)" : "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 20,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.85)",
            color: "white",
            padding: "6px 18px",
            borderRadius: 12,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Optimal Safe Zone for Captions & Content
        </div>
      </div>
    </AbsoluteFill>
  );
};
