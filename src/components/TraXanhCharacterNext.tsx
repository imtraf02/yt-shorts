import React from "react";
import { Bell, Check, Heart, Leaf, Sparkles } from "lucide-react";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { Audio } from "@remotion/media";
import {
  Easing,
  Img,
  Interactive,
  interpolate,
  random,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { TraXanhPose } from "./TraXanhCharacter";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin", "vietnamese"],
});

const poseFile = (pose: TraXanhPose) => `characters/tra-xanh-${pose}.png`;

export type TraXanhBubbleKind = "message" | "tip" | "cta";

export interface TraXanhNextBubbleMoment {
  from: number;
  durationInFrames?: number;
  kind?: TraXanhBubbleKind;
  badge?: string;
  eyebrow?: string;
  text?: string;
  primaryAction?: string;
  secondaryAction?: string;
  sound?: boolean;
}

export interface TraXanhSpeechBubbleNextProps {
  frame: number;
  durationInFrames: number;
  characterHeight?: number;
  side?: "left" | "right";
  bottomOffset?: number;
  kind?: TraXanhBubbleKind;
  badge?: string;
  eyebrow?: string;
  text?: string;
  primaryAction?: string;
  secondaryAction?: string;
  enableClickSound?: boolean;
}

const DEFAULT_BUBBLE_COPY: Record<
  TraXanhBubbleKind,
  { eyebrow: string; text: string }
> = {
  message: {
    eyebrow: "TRÀ XANH ĐANG NÓI",
    text: "Mình cùng xem chi tiết thú vị này nhé!",
  },
  tip: {
    eyebrow: "GỢI Ý NHỎ",
    text: "Hãy để ý chi tiết này — nó sẽ nối với phần sau.",
  },
  cta: {
    eyebrow: "ĐỒNG HÀNH CÙNG KÊNH",
    text: "Thấy nội dung hữu ích? Thả tim và đăng ký để gặp lại Trà Xanh nhé!",
  },
};

const IcePointerCursor: React.FC<{ frame: number; portrait: boolean }> = ({
  frame,
  portrait,
}) => {
  const { fps } = useVideoConfig();
  const likeX = portrait ? 44 : 39;
  const subscribeX = portrait ? 267 : 238;
  const targetY = portrait ? 18 : 15;
  const cursorX = interpolate(
    frame,
    [13, 26, 39, 55, 78],
    [portrait ? 208 : 184, likeX, likeX, subscribeX, subscribeX],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: [
        Easing.bezier(0.22, 1, 0.36, 1),
        Easing.linear,
        Easing.bezier(0.22, 1, 0.36, 1),
        Easing.linear,
      ],
    },
  );
  const cursorY = interpolate(
    frame,
    [13, 26, 39, 55, 78],
    [-18, targetY, targetY, targetY, targetY],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: [
        Easing.bezier(0.22, 1, 0.36, 1),
        Easing.linear,
        Easing.bezier(0.22, 1, 0.36, 1),
        Easing.linear,
      ],
    },
  );
  const cursorOpacity = interpolate(frame, [11, 17, 74, 82], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorScale = interpolate(
    frame,
    [0, 30, 33, 36, 56, 59, 62, 100],
    [1, 1, 0.82, 1, 1, 0.82, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const likeRipple = spring({
    frame: frame - 32,
    fps,
    config: { damping: 16, stiffness: 170, mass: 0.55 },
  });
  const subscribeRipple = spring({
    frame: frame - 58,
    fps,
    config: { damping: 16, stiffness: 170, mass: 0.55 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 12,
        pointerEvents: "none",
      }}
    >
      {[
        {
          progress: likeRipple,
          x: likeX,
          y: targetY,
          size: portrait ? 38 : 34,
        },
        {
          progress: subscribeRipple,
          x: subscribeX,
          y: targetY,
          size: portrait ? 42 : 38,
        },
      ].map((ripple, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            border: "2px solid rgba(165, 243, 252, 0.92)",
            boxShadow:
              "0 0 0 2px rgba(8, 47, 73, 0.62), 0 0 18px rgba(34, 211, 238, 0.62)",
            opacity:
              interpolate(ripple.progress, [0, 0.22, 1], [0, 0.9, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }) * cursorOpacity,
            scale: interpolate(ripple.progress, [0, 1], [0.35, 1.7], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      ))}

      <svg
        width={portrait ? 38 : 34}
        height={portrait ? 48 : 43}
        viewBox="0 0 38 48"
        fill="none"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          overflow: "visible",
          opacity: cursorOpacity,
          translate: `${cursorX}px ${cursorY}px`,
          scale: cursorScale,
          transformOrigin: "4px 4px",
          filter:
            "drop-shadow(0 4px 1px rgba(2, 6, 23, 0.62)) drop-shadow(0 0 8px rgba(103, 232, 249, 0.72))",
        }}
      >
        <path
          d="M4.4 3.5L31.8 25.1C33.7 26.6 32.6 29.7 30.2 29.7H20.8L26.2 39.2C27 40.7 26.5 42.5 25 43.3L21.3 45.3C19.8 46.1 18 45.6 17.2 44.1L12 34.6L6.7 42C5.3 44 2.2 43 2.2 40.6V5.3C2.2 3.5 3.1 2.5 4.4 3.5Z"
          fill="#E6FBFF"
          stroke="#071B35"
          strokeWidth="4.2"
          strokeLinejoin="round"
        />
        <path
          d="M5.7 7.5L27.5 25.1H18.2L23.1 34.2"
          stroke="#67E8F9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
        />
        <path
          d="M7.4 9.8L7.4 29.6"
          stroke="#FFFFFF"
          strokeWidth="2.3"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

/**
 * Bong bóng thế hệ mới, chủ động tránh vùng phụ đề ở khung dọc.
 * Component này chỉ được dùng khi composition mới import rõ ràng; video cũ vẫn
 * tiếp tục dùng TraXanhSpeechBubble trong TraXanhCharacter.tsx.
 */
export const TraXanhSpeechBubbleNext: React.FC<
  TraXanhSpeechBubbleNextProps
> = ({
  frame,
  durationInFrames,
  characterHeight = 180,
  side = "right",
  bottomOffset,
  kind = "cta",
  badge = "TRÀ XANH",
  eyebrow,
  text,
  primaryAction = "ĐĂNG KÝ",
  secondaryAction = "THÍCH",
  enableClickSound = true,
}) => {
  const { fps, width, height } = useVideoConfig();
  const portrait = height > width;
  const resolvedBottom =
    bottomOffset ?? (portrait ? 520 : characterHeight + 24);
  const connectorLength = Math.max(0, resolvedBottom - characterHeight - 20);
  const copy = DEFAULT_BUBBLE_COPY[kind];
  const resolvedText = text ?? copy.text;
  const resolvedEyebrow = eyebrow ?? copy.eyebrow;
  const textSize =
    resolvedText.length > 92
      ? portrait
        ? 22
        : 20
      : resolvedText.length > 64
        ? portrait
          ? 25
          : 22
        : portrait
          ? 28
          : 24;

  const enter = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 150, mass: 0.72 },
  });
  const exitStart = Math.max(0, durationInFrames - 18);
  const exit = interpolate(frame, [exitStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.55, 0, 1, 0.45),
  });
  const bubbleOpacity = interpolate(enter, [0, 1], [0, 1]) * (1 - exit);
  const bubbleScale =
    interpolate(enter, [0, 1], [0.82, 1]) *
    interpolate(exit, [0, 1], [1, 0.94]);
  const bubbleLift =
    interpolate(enter, [0, 1], [24, 0]) +
    interpolate(exit, [0, 1], [0, -12]) +
    Math.sin(frame / 19) * 1.6;

  const contentOpacity = interpolate(frame, [7, 17], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const actionsOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const likeSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 12, stiffness: 190, mass: 0.55 },
  });
  const subscribeSpring = spring({
    frame: frame - 58,
    fps,
    config: { damping: 13, stiffness: 175, mass: 0.6 },
  });
  const glowPulse = 0.2 + (Math.sin(frame / 13) + 1) * 0.08;
  const shimmerX = interpolate(
    frame % Math.max(1, Math.round(fps * 2.6)),
    [0, Math.max(1, Math.round(fps * 2.6))],
    [-120, 220],
  );

  const isCta = kind === "cta";

  return (
    <Interactive.Div
      name="Trà Xanh — Bong bóng Next"
      style={{
        position: "absolute",
        bottom: resolvedBottom,
        right: side === "right" ? 0 : undefined,
        left: side === "left" ? 0 : undefined,
        zIndex: 52,
        width: portrait ? 500 : 452,
        maxWidth: portrait
          ? "calc(100vw - 88px)"
          : "min(452px, calc(100vw - 88px))",
        pointerEvents: "none",
        fontFamily,
        opacity: bubbleOpacity,
        scale: bubbleScale,
        translate: `0 ${bubbleLift}px`,
        transformOrigin: side === "right" ? "bottom right" : "bottom left",
      }}
    >
      <div
        style={{
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          padding: portrait ? "22px 24px 20px" : "18px 20px 18px",
          borderRadius: portrait ? 28 : 24,
          color: "#F0FDF4",
          background:
            "linear-gradient(145deg, rgba(4, 27, 20, 0.96) 0%, rgba(5, 46, 34, 0.95) 58%, rgba(3, 35, 28, 0.97) 100%)",
          border: "1px solid rgba(110, 231, 183, 0.76)",
          boxShadow: `0 20px 56px rgba(0, 0, 0, 0.58), 0 0 34px rgba(16, 185, 129, ${glowPulse}), inset 0 1px 0 rgba(255, 255, 255, 0.14)`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {isCta && enableClickSound && (
          <>
            <Audio
              from={32}
              src={staticFile("audio/ui/ice-click.wav")}
              volume={0.86}
            />
            <Audio
              from={58}
              src={staticFile("audio/ui/ice-confirm.wav")}
              volume={0.9}
            />
          </>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            background:
              "radial-gradient(circle at 12% 0%, rgba(110, 231, 183, 0.18), transparent 42%), linear-gradient(115deg, transparent 0 72%, rgba(255, 255, 255, 0.055) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 11,
            opacity: contentOpacity,
            translate: `0 ${interpolate(frame, [7, 17], [7, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: portrait ? 31 : 28,
                height: portrait ? 31 : 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(145deg, #6EE7B7, #10B981)",
                boxShadow: "0 0 18px rgba(52, 211, 153, 0.5)",
              }}
            >
              <Leaf size={portrait ? 17 : 15} color="#052E25" strokeWidth={3} />
            </div>
            <div>
              <div
                style={{
                  fontSize: portrait ? 15 : 13,
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: 1.4,
                  color: "#A7F3D0",
                }}
              >
                {badge}
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: portrait ? 12 : 10.5,
                  lineHeight: 1,
                  fontWeight: 700,
                  letterSpacing: 1.1,
                  color: "rgba(209, 250, 229, 0.64)",
                }}
              >
                {resolvedEyebrow}
              </div>
            </div>
          </div>
          <Sparkles
            size={portrait ? 22 : 19}
            color="#FDE68A"
            style={{ rotate: `${Math.sin(frame / 18) * 7}deg`, flexShrink: 0 }}
          />
        </div>

        <div
          style={{
            fontSize: textSize,
            fontWeight: 700,
            lineHeight: 1.34,
            letterSpacing: -0.35,
            color: "#F0FDF4",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
            opacity: contentOpacity,
            translate: `0 ${interpolate(frame, [9, 19], [8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px`,
          }}
        >
          {resolvedText}
        </div>

        {isCta ? (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "stretch",
              gap: portrait ? 12 : 10,
              marginTop: portrait ? 18 : 15,
              opacity: actionsOpacity,
              translate: `0 ${interpolate(frame, [18, 30], [9, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}px`,
            }}
          >
            <IcePointerCursor frame={frame} portrait={portrait} />
            <div
              style={{
                minWidth: portrait ? 126 : 112,
                padding: portrait ? "12px 15px" : "10px 13px",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background:
                  likeSpring > 0.75
                    ? "rgba(244, 63, 94, 0.22)"
                    : "rgba(255, 255, 255, 0.07)",
                border:
                  likeSpring > 0.75
                    ? "1px solid rgba(251, 113, 133, 0.74)"
                    : "1px solid rgba(167, 243, 208, 0.24)",
                scale: 1 + Math.sin(likeSpring * Math.PI) * 0.08,
              }}
            >
              <Heart
                size={portrait ? 20 : 17}
                color={likeSpring > 0.75 ? "#FB7185" : "#D1FAE5"}
                fill={likeSpring > 0.75 ? "#FB7185" : "transparent"}
                strokeWidth={2.5}
              />
              <span
                style={{
                  fontSize: portrait ? 15 : 13,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                }}
              >
                {secondaryAction}
              </span>
            </div>

            <div
              style={{
                position: "relative",
                overflow: "hidden",
                flex: 1,
                padding: portrait ? "12px 18px" : "10px 16px",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                color: "#03251B",
                background:
                  subscribeSpring > 0.82
                    ? "linear-gradient(135deg, #A7F3D0, #34D399)"
                    : "linear-gradient(135deg, #6EE7B7, #10B981)",
                border: "1px solid rgba(236, 253, 245, 0.74)",
                boxShadow: "0 8px 22px rgba(16, 185, 129, 0.32)",
                scale: 1 + Math.sin(subscribeSpring * Math.PI) * 0.055,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -24,
                  bottom: -24,
                  left: shimmerX,
                  width: 58,
                  rotate: "18deg",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
                }}
              />
              {subscribeSpring > 0.82 ? (
                <Check size={portrait ? 20 : 17} strokeWidth={3.2} />
              ) : (
                <Bell
                  size={portrait ? 20 : 17}
                  strokeWidth={2.7}
                  style={{
                    rotate:
                      frame > 52 && frame < 78
                        ? `${Math.sin((frame - 52) * 0.82) * 11}deg`
                        : "0deg",
                  }}
                />
              )}
              <span
                style={{
                  position: "relative",
                  fontSize: portrait ? 16 : 14,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                }}
              >
                {primaryAction}
              </span>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: 3,
              marginTop: portrait ? 17 : 14,
              borderRadius: 99,
              overflow: "hidden",
              background: "rgba(167, 243, 208, 0.12)",
              opacity: actionsOpacity,
            }}
          >
            <div
              style={{
                width: `${interpolate(
                  frame,
                  [0, Math.max(1, durationInFrames - 12)],
                  [0, 100],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                )}%`,
                height: "100%",
                borderRadius: 99,
                background: "linear-gradient(90deg, #34D399, #A7F3D0)",
              }}
            />
          </div>
        )}
      </div>

      <svg
        style={{
          position: "absolute",
          bottom: -18,
          right: side === "right" ? 32 : undefined,
          left: side === "left" ? 32 : undefined,
          width: 32,
          height: 20,
          overflow: "visible",
        }}
        viewBox="0 0 32 20"
      >
        <defs>
          <linearGradient id="tra-xanh-tail-next" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#063B2C" />
            <stop offset="100%" stopColor="#03231C" />
          </linearGradient>
        </defs>
        <path d="M1 0H31L16 19Z" fill="url(#tra-xanh-tail-next)" />
        <path
          d="M1 0L16 19L31 0"
          fill="none"
          stroke="rgba(110, 231, 183, 0.76)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {connectorLength > 4 && (
        <div
          style={{
            position: "absolute",
            bottom: -connectorLength - 4,
            right: side === "right" ? 45 : undefined,
            left: side === "left" ? 45 : undefined,
            width: 2,
            height: connectorLength,
            background: portrait
              ? "linear-gradient(to bottom, rgba(110,231,183,0.62) 0%, rgba(110,231,183,0.3) 37%, transparent 38%, transparent 76%, rgba(110,231,183,0.18) 77%, rgba(110,231,183,0.06) 100%)"
              : "linear-gradient(to bottom, rgba(110,231,183,0.62), rgba(110,231,183,0.06))",
            boxShadow: portrait ? "none" : "0 0 8px rgba(52, 211, 153, 0.28)",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -4,
              left: -3,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#6EE7B7",
              boxShadow: "0 0 10px rgba(110, 231, 183, 0.72)",
            }}
          />
        </div>
      )}
    </Interactive.Div>
  );
};

export interface TraXanhTimelineSegmentNext {
  from: number;
  pose: TraXanhPose;
}

export interface ContinuousTraXanhNextProps {
  timeline: TraXanhTimelineSegmentNext[];
  side?: "left" | "right";
  bottom?: number;
  right?: number;
  left?: number;
  height?: number;
  flip?: boolean;
  showCta?: boolean;
  bubbleMoments?: TraXanhNextBubbleMoment[];
  autoCtaInterval?: number;
  /** Ghi đè khoảng cách bong bóng tính từ đáy cụm nhân vật. */
  bubbleBottomOffset?: number;
  /** Phát SFX click tự tạo cho nút Like và Đăng ký. */
  enableClickSound?: boolean;
  /** Hiện lớp lá rơi nhẹ quanh nhân vật. */
  showLeaves?: boolean;
}

const DEFAULT_CTA_MESSAGES = [
  "Nếu thấy hữu ích, thả tim và đăng ký để gặp lại Trà Xanh nhé!",
  "Đăng ký kênh để không bỏ lỡ câu chuyện tiếp theo nha!",
  "Cảm ơn bạn đã đồng hành — một lượt thích là động lực rất lớn đó!",
];

/**
 * Phiên bản opt-in cho các video mới. API gần với ContinuousTraXanh cũ để việc
 * chuyển đổi có chủ đích dễ dàng, nhưng không thay đổi bất kỳ composition cũ nào.
 */
export const ContinuousTraXanhNext: React.FC<ContinuousTraXanhNextProps> = ({
  timeline,
  side = "right",
  bottom = 20,
  right = 40,
  left,
  height = 180,
  flip = false,
  showCta = true,
  bubbleMoments,
  autoCtaInterval = 4500,
  bubbleBottomOffset,
  enableClickSound = true,
  showLeaves = true,
}) => {
  const frame = useCurrentFrame();
  const {
    fps,
    durationInFrames,
    width: compositionWidth,
    height: compositionHeight,
  } = useVideoConfig();
  const portrait = compositionHeight > compositionWidth;
  const safeTimeline =
    timeline.length > 0
      ? timeline
      : [{ from: 0, pose: "thuyet-minh" as const }];

  let activeIndex = 0;
  for (let index = 0; index < safeTimeline.length; index++) {
    if (frame >= safeTimeline[index].from) {
      activeIndex = index;
    } else {
      break;
    }
  }

  const current = safeTimeline[activeIndex];
  const previous = activeIndex > 0 ? safeTimeline[activeIndex - 1] : null;
  const framesSinceChange = frame - current.from;
  const transitionFrames = 16;
  const isChanging =
    previous !== null &&
    previous.pose !== current.pose &&
    framesSinceChange >= 0 &&
    framesSinceChange < transitionFrames;
  const poseProgress = isChanging
    ? interpolate(framesSinceChange, [0, transitionFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      })
    : 1;

  const effectiveMoments = React.useMemo<TraXanhNextBubbleMoment[]>(() => {
    if (bubbleMoments && bubbleMoments.length > 0) {
      return [...bubbleMoments].sort((a, b) => a.from - b.from);
    }
    if (!showCta) {
      return [];
    }

    // Shorts cần một CTA duy nhất, đủ muộn để không phá hook nhưng vẫn còn
    // khoảng thở trước đoạn kết. Video ngang giữ nhịp thưa 2,5–3,5 phút/lần.
    if (portrait && durationInFrames >= 900 && durationInFrames < 3000) {
      return [
        {
          from: Math.min(
            durationInFrames - 270,
            Math.max(450, Math.round(durationInFrames * 0.62)),
          ),
          durationInFrames: 210,
          kind: "cta",
          text: DEFAULT_CTA_MESSAGES[0],
        },
      ];
    }

    if (durationInFrames < 2400) {
      return [];
    }

    const result: TraXanhNextBubbleMoment[] = [];
    const step = Math.max(3000, autoCtaInterval);
    let from = 3600;
    let messageIndex = 0;
    while (from < durationInFrames - 900) {
      result.push({
        from,
        durationInFrames: 240,
        kind: "cta",
        text: DEFAULT_CTA_MESSAGES[messageIndex % DEFAULT_CTA_MESSAGES.length],
      });
      from += step;
      messageIndex++;
    }

    const outroFrom = Math.max(0, durationInFrames - 400);
    if (
      durationInFrames > 3000 &&
      !result.some((moment) => Math.abs(moment.from - outroFrom) < 1500)
    ) {
      result.push({
        from: outroFrom,
        durationInFrames: 240,
        kind: "cta",
        text: "Cảm ơn bạn đã xem! Hẹn gặp lại trong câu chuyện tiếp theo nhé.",
      });
    }
    return result;
  }, [autoCtaInterval, bubbleMoments, durationInFrames, portrait, showCta]);

  const activeBubble = showCta
    ? effectiveMoments.find(
        (moment) =>
          frame >= moment.from &&
          frame < moment.from + (moment.durationInFrames ?? 240),
      )
    : undefined;
  const bubbleFrame = activeBubble ? frame - activeBubble.from : 0;
  const bubbleDuration = activeBubble?.durationInFrames ?? 240;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 17, stiffness: 105, mass: 0.82 },
  });
  const exit = interpolate(
    frame,
    [Math.max(0, durationInFrames - 18), durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const idleFloat = Math.sin(frame / 18) * 2.6;
  const breathe = Math.sin(frame / 24);
  const reaction = activeBubble ? Math.sin(bubbleFrame / 6.5) * 1.35 : 0;
  const poseBounce = isChanging ? Math.sin(poseProgress * Math.PI) * 5 : 0;
  const characterStageWidth = Math.max(height, portrait ? 214 : 202);
  const edgePosition: React.CSSProperties =
    side === "left" ? { left: left ?? 40 } : { right: right ?? 40 };

  return (
    <Interactive.Div
      name="Trà Xanh — Character Next"
      style={{
        position: "absolute",
        bottom,
        ...edgePosition,
        zIndex: 40,
        width: characterStageWidth,
        height: height + 18,
        pointerEvents: "none",
        opacity: 1 - exit,
        translate: `0 ${
          interpolate(entrance, [0, 1], [height * 0.72, 0]) +
          idleFloat +
          reaction -
          poseBounce +
          interpolate(exit, [0, 1], [0, height * 0.55])
        }px`,
      }}
    >
      {activeBubble && (
        <Sequence
          from={activeBubble.from}
          durationInFrames={bubbleDuration}
          layout="none"
          name="Trà Xanh — CTA Next"
        >
          <TraXanhSpeechBubbleNext
            frame={bubbleFrame}
            durationInFrames={bubbleDuration}
            characterHeight={height}
            side={side}
            bottomOffset={bubbleBottomOffset}
            kind={activeBubble.kind}
            badge={activeBubble.badge}
            eyebrow={activeBubble.eyebrow}
            text={activeBubble.text}
            primaryAction={activeBubble.primaryAction}
            secondaryAction={activeBubble.secondaryAction}
            enableClickSound={activeBubble.sound ?? enableClickSound}
          />
        </Sequence>
      )}

      {showLeaves &&
        [0, 1, 2, 3, 4].map((index) => {
          const cycle = Math.max(
            1,
            Math.round(fps * (3.8 + random(`leaf-${index}-speed`) * 1.4)),
          );
          const phaseOffset = Math.round(random(`leaf-${index}-phase`) * cycle);
          const shiftedFrame = frame + phaseOffset;
          const cycleIndex = Math.floor(shiftedFrame / cycle);
          const leafProgress = (shiftedFrame % cycle) / cycle;
          const cycleSeed = `leaf-${index}-cycle-${cycleIndex}`;
          const leafOpacity = interpolate(
            leafProgress,
            [0, 0.12, 0.8, 1],
            [0, 0.72, 0.64, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const leafSize = 11 + random(`${cycleSeed}-size`) * 7;
          const baseX =
            8 +
            random(`${cycleSeed}-x`) * (characterStageWidth - leafSize - 16);
          const driftDirection = (random(`${cycleSeed}-drift`) - 0.5) * 76;
          const swayAmount = 8 + random(`${cycleSeed}-sway`) * 16;
          const swayCycles = 1.2 + random(`${cycleSeed}-sway-cycles`) * 1.4;
          const driftX =
            driftDirection * leafProgress +
            Math.sin(
              leafProgress * Math.PI * 2 * swayCycles +
                random(`${cycleSeed}-wave`) * Math.PI * 2,
            ) *
              swayAmount;
          const leafBottom = height * 1.28 - leafProgress * height * 1.2;
          const startRotation = -70 + random(`${cycleSeed}-rotation`) * 140;
          const rotationTurns = 190 + random(`${cycleSeed}-turns`) * 260;
          const colorIndex = Math.floor(random(`${cycleSeed}-color`) * 3);

          return (
            <svg
              key={index}
              viewBox="0 0 24 18"
              width={leafSize}
              height={leafSize * 0.75}
              style={{
                position: "absolute",
                left: baseX + driftX,
                bottom: leafBottom,
                zIndex: 1,
                overflow: "visible",
                opacity: leafOpacity,
                rotate: `${startRotation + leafProgress * rotationTurns}deg`,
                scale: `${0.78 + Math.sin(leafProgress * Math.PI) * 0.2} 1`,
                filter: "drop-shadow(0 2px 3px rgba(2, 44, 34, 0.48))",
              }}
            >
              <path
                d="M2 11C5 2 15 1 22 3C20 11 13 17 4 15C2.5 14.6 1.4 13 2 11Z"
                fill={
                  colorIndex === 0
                    ? "#86EFAC"
                    : colorIndex === 1
                      ? "#34D399"
                      : "#A7F3D0"
                }
                stroke="rgba(6, 78, 59, 0.78)"
                strokeWidth="1.1"
              />
              <path
                d="M4 14C9 10 13 7 20 4"
                stroke="rgba(6, 95, 70, 0.72)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          );
        })}

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: height * 0.72,
          height: 15,
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.38)",
          filter: "blur(7px)",
          opacity: 0.7 - idleFloat * 0.035,
          translate: "-50% 0",
          scale: `${1 - idleFloat * 0.014} 1`,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: side === "right" ? 0 : undefined,
          left: side === "left" ? 0 : undefined,
          width: "100%",
          height,
          transformOrigin: "bottom center",
          scale: `${flip ? -1 : 1} ${1 + breathe * 0.006}`,
          rotate: `${Math.sin(frame / 41) * 0.75 + (activeBubble ? Math.sin(bubbleFrame / 15) * 0.35 : 0)}deg`,
          filter:
            "drop-shadow(0 12px 22px rgba(0, 0, 0, 0.58)) drop-shadow(0 0 12px rgba(52, 211, 153, 0.16))",
        }}
      >
        {isChanging && previous && (
          <Img
            name="Trà Xanh — pose trước"
            src={staticFile(poseFile(previous.pose))}
            style={{
              position: "absolute",
              bottom: 0,
              right: side === "right" ? 0 : undefined,
              left: side === "left" ? 0 : undefined,
              height: "100%",
              width: "auto",
              objectFit: "contain",
              opacity: 1 - poseProgress,
              translate: `${interpolate(poseProgress, [0, 1], [0, side === "right" ? 10 : -10])}px 0`,
              scale: interpolate(poseProgress, [0, 1], [1, 0.965]),
            }}
          />
        )}
        <Img
          name="Trà Xanh — pose hiện tại"
          src={staticFile(poseFile(current.pose))}
          style={{
            position: "absolute",
            bottom: 0,
            right: side === "right" ? 0 : undefined,
            left: side === "left" ? 0 : undefined,
            height: "100%",
            width: "auto",
            objectFit: "contain",
            opacity: poseProgress,
            translate: `${interpolate(poseProgress, [0, 1], [side === "right" ? -12 : 12, 0])}px 0`,
            scale: interpolate(poseProgress, [0, 1], [0.965, 1]),
          }}
        />
      </div>
    </Interactive.Div>
  );
};
