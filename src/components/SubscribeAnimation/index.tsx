import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import {
  ThumbsUp,
  Bell,
  BellRing,
  Check,
  MousePointer2,
  Play,
  Sparkles,
} from "lucide-react";

export const subscribeAnimationSchema = z.object({
  channelName: z.string().default("Antigravity Dev"),
  channelHandle: z.string().default("@antigravity_dev"),
  subscribersCount: z.string().default("128K người đăng ký"),
  theme: z.enum(["dark", "light", "transparent"]).default("dark"),
  scale: z.number().default(1),
  accentColor: z.string().default("#ff0000"), // YouTube red
});

export type SubscribeAnimationProps = {
  channelName: string;
  channelHandle?: string;
  subscribersCount?: string;
  theme?: "dark" | "light" | "transparent";
  scale?: number;
  accentColor?: string;
};

export const SubscribeAnimation: React.FC<SubscribeAnimationProps> = ({
  channelName,
  channelHandle = "@kenhcuaban",
  subscribersCount = "100K người đăng ký",
  theme = "dark",
  scale = 1,
  accentColor = "#ff0000",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation (frames 0-25)
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Timeline keyframes:
  // 1. Like button clicked at frame 28-35
  const LIKE_CLICK_FRAME = 30;
  const isLiked = frame >= LIKE_CLICK_FRAME;
  const likeSpring = spring({
    frame: Math.max(0, frame - LIKE_CLICK_FRAME),
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const likeScale =
    frame < LIKE_CLICK_FRAME
      ? 1
      : interpolate(likeSpring, [0, 0.4, 1], [0.8, 1.35, 1]);

  // 2. Subscribe button clicked at frame 60-70
  const SUB_CLICK_FRAME = 62;
  const isSubscribed = frame >= SUB_CLICK_FRAME;
  const subSpring = spring({
    frame: Math.max(0, frame - SUB_CLICK_FRAME),
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const subScale =
    frame < SUB_CLICK_FRAME
      ? 1
      : interpolate(subSpring, [0, 0.4, 1], [0.88, 1.1, 1]);

  // 3. Bell clicked at frame 90
  const BELL_CLICK_FRAME = 92;
  const isBellActive = frame >= BELL_CLICK_FRAME;
  const bellSpring = spring({
    frame: Math.max(0, frame - BELL_CLICK_FRAME),
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const bellScale =
    frame < BELL_CLICK_FRAME
      ? 1
      : interpolate(bellSpring, [0, 0.4, 1], [0.85, 1.25, 1]);

  // Bell ringing wiggle animation after click
  const bellRingFrames = Math.max(0, frame - BELL_CLICK_FRAME);
  const bellRotate =
    isBellActive && bellRingFrames < 25
      ? Math.sin(bellRingFrames * 0.9) * (20 - bellRingFrames * 0.7)
      : 0;

  // Cursor movements and clicks
  // Start off-screen -> Like Button -> Subscribe Button -> Bell -> Fade out
  let cursorX = 350;
  let cursorY = 220;
  let cursorOpacity = 0;
  let cursorClickScale = 1;

  if (frame < 12) {
    cursorOpacity = 0;
  } else if (frame < 22) {
    // Entering towards Like button
    const p = interpolate(frame, [12, 22], [0, 1], { extrapolateRight: "clamp" });
    cursorOpacity = p;
    cursorX = interpolate(p, [0, 1], [300, -110]);
    cursorY = interpolate(p, [0, 1], [150, 4]);
  } else if (frame < 36) {
    // Clicking Like button
    cursorOpacity = 1;
    cursorX = -110;
    cursorY = 4;
    cursorClickScale =
      frame >= 28 && frame <= 32
        ? interpolate(frame, [28, 30, 32], [1, 0.75, 1])
        : 1;
  } else if (frame < 55) {
    // Moving from Like to Subscribe
    const p = interpolate(frame, [36, 55], [0, 1], { extrapolateRight: "clamp" });
    cursorOpacity = 1;
    cursorX = interpolate(p, [0, 1], [-110, 130]);
    cursorY = interpolate(p, [0, 1], [4, 4]);
  } else if (frame < 70) {
    // Clicking Subscribe button
    cursorOpacity = 1;
    cursorX = 130;
    cursorY = 4;
    cursorClickScale =
      frame >= 60 && frame <= 64
        ? interpolate(frame, [60, 62, 64], [1, 0.75, 1])
        : 1;
  } else if (frame < 85) {
    // Moving from Subscribe to Bell
    const p = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" });
    cursorOpacity = 1;
    cursorX = interpolate(p, [0, 1], [130, 270]);
    cursorY = interpolate(p, [0, 1], [4, 4]);
  } else if (frame < 100) {
    // Clicking Bell
    cursorOpacity = 1;
    cursorX = 270;
    cursorY = 4;
    cursorClickScale =
      frame >= 90 && frame <= 94
        ? interpolate(frame, [90, 92, 94], [1, 0.75, 1])
        : 1;
  } else {
    // Fading out
    cursorX = interpolate(frame, [100, 115], [270, 340], { extrapolateRight: "clamp" });
    cursorY = interpolate(frame, [100, 115], [4, 80], { extrapolateRight: "clamp" });
    cursorOpacity = interpolate(frame, [100, 115], [1, 0], { extrapolateRight: "clamp" });
  }

  // Styles based on theme
  const isDark = theme === "dark" || theme === "transparent";
  const bgCard = isDark
    ? "rgba(18, 18, 20, 0.92)"
    : "rgba(255, 255, 255, 0.95)";
  const textColor = isDark ? "#ffffff" : "#0f0f0f";
  const textMuted = isDark ? "#a1a1aa" : "#606060";
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.12)"
    : "rgba(0, 0, 0, 0.1)";

  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        transform: `scale(${scale * cardEntrance})`,
        opacity: cardEntrance,
        filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))",
        userSelect: "none",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Outer Card Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "20px 32px",
          backgroundColor: bgCard,
          border: `1.5px solid ${borderColor}`,
          borderRadius: 36,
          backdropFilter: "blur(20px)",
          minWidth: 880,
        }}
      >
        {/* Channel Avatar */}
        <div
          style={{
            position: "relative",
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accentColor}, #f97316)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 16px ${accentColor}66`,
            flexShrink: 0,
          }}
        >
          <Play size={38} color="#ffffff" fill="#ffffff" style={{ marginLeft: 4 }} />
          <div
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              backgroundColor: "#22c55e",
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: `3px solid ${bgCard}`,
            }}
          />
        </div>

        {/* Channel Info */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: textColor,
              lineHeight: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
          >
            <span>{channelName}</span>
            <Check
              size={20}
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                borderRadius: "50%",
                padding: 2,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 20,
              color: textMuted,
              fontWeight: 500,
              marginTop: 4,
              whiteSpace: "nowrap",
            }}
          >
            {channelHandle} • {subscribersCount}
          </div>
        </div>

        {/* Action Buttons Group */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          {/* Like Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 22px",
              borderRadius: 9999,
              backgroundColor: isLiked
                ? "rgba(59, 130, 246, 0.18)"
                : isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.06)",
              color: isLiked ? "#3b82f6" : textColor,
              border: isLiked
                ? "1.5px solid rgba(59, 130, 246, 0.4)"
                : `1px solid ${borderColor}`,
              transform: `scale(${likeScale})`,
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            <ThumbsUp
              size={24}
              style={{
                fill: isLiked ? "#3b82f6" : "none",
                transform: isLiked ? "rotate(-10deg)" : "none",
              }}
            />
            <span>{isLiked ? "Đã thích" : "Thích"}</span>
          </div>

          {/* Subscribe Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 9999,
              backgroundColor: isSubscribed
                ? isDark
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(0, 0, 0, 0.08)"
                : accentColor,
              color: isSubscribed ? textColor : "#ffffff",
              transform: `scale(${subScale})`,
              boxShadow: isSubscribed
                ? "none"
                : `0 4px 24px ${accentColor}88`,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: 0.5,
            }}
          >
            {isSubscribed ? (
              <>
                <Check size={22} color="#22c55e" strokeWidth={3} />
                <span>ĐÃ ĐĂNG KÝ</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>ĐĂNG KÝ</span>
              </>
            )}
          </div>

          {/* Notification Bell */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 54,
              height: 54,
              borderRadius: "50%",
              backgroundColor: isBellActive
                ? "rgba(234, 179, 8, 0.2)"
                : isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.06)",
              color: isBellActive ? "#eab308" : textColor,
              border: isBellActive
                ? "1.5px solid rgba(234, 179, 8, 0.5)"
                : `1px solid ${borderColor}`,
              transform: `rotate(${bellRotate}deg) scale(${bellScale})`,
              boxShadow: isBellActive ? "0 0 16px rgba(234, 179, 8, 0.4)" : "none",
            }}
          >
            {isBellActive ? (
              <BellRing size={26} fill="#eab308" />
            ) : (
              <Bell size={24} />
            )}
          </div>
        </div>
      </div>

      {/* Animated Mouse Cursor Pointer */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorClickScale})`,
          opacity: cursorOpacity,
          pointerEvents: "none",
          zIndex: 1000,
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6))",
        }}
      >
        <MousePointer2
          size={36}
          color="#ffffff"
          fill="#18181b"
          strokeWidth={2}
        />
        {/* Click ripple wave */}
        {(frame === LIKE_CLICK_FRAME ||
          frame === SUB_CLICK_FRAME ||
          frame === BELL_CLICK_FRAME) && (
          <div
            style={{
              position: "absolute",
              top: -10,
              left: -10,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "3px solid #3b82f6",
              animation: "none",
              transform: "scale(1.5)",
              opacity: 0.8,
            }}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Fullscreen Wrapper for standalone Composition / Preview
 */
export const SubscribeOverlay: React.FC<SubscribeAnimationProps> = (props) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: props.theme === "transparent" ? "transparent" : "#09090b",
      }}
    >
      <SubscribeAnimation {...props} />
    </AbsoluteFill>
  );
};
