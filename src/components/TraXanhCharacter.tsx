import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Heart, Bell, Sparkles } from "lucide-react";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin", "vietnamese"],
});

export type TraXanhPose =
  | "suy-ngam"
  | "khoanh-tay"
  | "rung-rung"
  | "giat-minh"
  | "e-the"
  | "khan-khoan"
  | "lo-lang"
  | "vay-chao"
  | "thuyet-minh"
  | "an-mung"
  | "nay-y-tuong"
  | "lang-nghe"
  | "cam-on"
  | "ngoi-xep-bang-suy-ngam"
  | "ngoi-nghieng-vay-chao"
  | "ngoi-om-goi"
  | "ngoi-quy-hao-huc"
  | "ngoi-doc-sach"
  | "ngoi-thu-gian"
  | "ngoi-gio-tay"
  | "ngoi-thuyet-minh"
  | "ngoi-ghi-chep"
  | "ngoi-chap-tay"
  | "ngoi-an-mung"
  | "ngoi-lang-nghe"
  | "ngoi-nay-y-tuong"
  | "ngoi-thien"
  | "ngoi-e-the"
  | "ngoi-lo-lang"
  | "ngoi-ngu-gat"
  | "tuc-gian"
  | "ngac-nhien"
  | "vui-suong"
  | "xau-ho"
  | "quyet-tam"
  | "nam-xem-tivi-goc-sau"
  | "bep-cam-chao"
  | "bep-dao-chao"
  | "bep-phuc-vu";

const poseFile = (pose: TraXanhPose) => `characters/tra-xanh-${pose}.png`;

export interface TraXanhCtaMoment {
  from: number;
  durationInFrames?: number;
  title?: string;
  text?: string;
  badge?: string;
}

export interface TraXanhSpeechBubbleProps {
  frame: number; // local frame relative to bubble start
  durationInFrames: number;
  text?: string;
  badge?: string;
  side?: "left" | "right";
  bottomOffset?: number;
}

/**
 * Bong bóng thoại (Speech Bubble) tinh tế phát ra từ nhân vật Trà Xanh:
 * - Kêu gọi Like & Đăng ký kênh tự nhiên, không che phụ đề hay hình ảnh chính
 * - Tone màu chủ đạo XANH LÁ (Emerald / Mint / Forest Green) sang trọng, tươi mát
 * - Hiệu ứng Spring pop-in, nhấp nhô lơ lửng, chuyển động vi mô (tim đập, chuông rung)
 * - Mũi tên chỉ chuẩn xác vào đỉnh đầu nhân vật
 */
export const TraXanhSpeechBubble: React.FC<TraXanhSpeechBubbleProps> = ({
  frame,
  durationInFrames,
  text = "Nếu thấy hay, đừng quên Like & Đăng ký kênh nhé! ✨",
  badge = "TRÀ XANH",
  side = "right",
  bottomOffset = 14,
}) => {
  const { fps } = useVideoConfig();

  // 1. Spring Pop-in lúc xuất hiện (0 -> 18 frames)
  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 135,
      mass: 0.8,
    },
  });

  const scaleEnter = interpolate(enterSpring, [0, 1], [0.35, 1]);
  const opacityEnter = interpolate(enterSpring, [0, 1], [0, 1]);
  const translateYEnter = interpolate(enterSpring, [0, 1], [16, 0]);

  // 2. Chuyển động lơ lửng nhẹ nhàng (idle float)
  const floatY = Math.sin(frame / 14) * 3;

  // 3. Hiệu ứng thu lại & mờ dần ở 15 frames cuối
  const exitFrames = 15;
  const exitProgress = interpolate(
    frame,
    [durationInFrames - exitFrames, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const scaleExit = interpolate(exitProgress, [0, 1], [1, 0.65]);
  const opacityExit = interpolate(exitProgress, [0, 1], [1, 0]);
  const translateYExit = interpolate(exitProgress, [0, 1], [0, -10]);

  // 4. Micro-animations cho icon Heart & Bell
  const heartScale =
    frame > 22 && frame < 45
      ? 1 + Math.sin((frame - 22) * 0.45) * 0.22
      : 1;
  const isHeartActive = frame >= 26;

  const isBellRinging = frame > 42 && frame < 72;
  const bellRotate = isBellRinging
    ? Math.sin((frame - 42) * 0.8) * 16
    : 0;
  const isBellActive = frame >= 46;

  const totalTranslateY = translateYEnter + translateYExit + floatY;
  const totalScale = scaleEnter * scaleExit;
  const totalOpacity = opacityEnter * opacityExit;

  return (
    <div
      style={{
        position: "absolute",
        bottom: bottomOffset,
        right: side === "right" ? 0 : undefined,
        left: side === "left" ? 0 : undefined,
        zIndex: 50,
        pointerEvents: "none",
        fontFamily,
        transform: `translateY(${totalTranslateY}px) scale(${totalScale})`,
        transformOrigin: side === "right" ? "bottom right" : "bottom left",
        opacity: totalOpacity,
        minWidth: 280,
        maxWidth: 325,
      }}
    >
      {/* Thân bong bóng thoại glassmorphic tone XANH LÁ chủ đạo */}
      <div
        style={{
          position: "relative",
          background:
            "linear-gradient(135deg, rgba(5, 28, 19, 0.95) 0%, rgba(9, 38, 26, 0.96) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1.5px solid rgba(52, 211, 153, 0.65)",
          borderRadius: 18,
          padding: "12px 16px 14px",
          boxShadow:
            "0 14px 34px rgba(0, 0, 0, 0.8), 0 0 24px rgba(16, 185, 129, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.22)",
          color: "#FFFFFF",
        }}
      >
        {/* Header: Tag Trà Xanh + Icon lấp lánh */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#22C55E",
                boxShadow: "0 0 8px #22C55E",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#4ADE80",
                letterSpacing: 0.6,
                textTransform: "uppercase",
              }}
            >
              {badge}
            </span>
          </div>
          <Sparkles size={14} color="#FBBF24" style={{ flexShrink: 0 }} />
        </div>

        {/* Nội dung lời nhắn */}
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 700,
            lineHeight: 1.38,
            color: "#F0FDF4",
            textShadow: "0 2px 5px rgba(0, 0, 0, 0.9)",
            marginBottom: 10,
          }}
        >
          {text}
        </div>

        {/* Cụm nút tương tác mini (Like & Đăng ký tone xanh lá) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Mini Nút Like */}
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 20,
              background: isHeartActive
                ? "linear-gradient(135deg, rgba(239, 68, 68, 0.28) 0%, rgba(220, 38, 38, 0.18) 100%)"
                : "rgba(52, 211, 153, 0.12)",
              border: isHeartActive
                ? "1px solid rgba(239, 68, 68, 0.65)"
                : "1px solid rgba(52, 211, 153, 0.3)",
              boxShadow: isHeartActive ? "0 0 10px rgba(239, 68, 68, 0.4)" : "none",
              transform: `scale(${heartScale})`,
              transition: "transform 0.15s ease",
            }}
          >
            <Heart
              size={13}
              color={isHeartActive ? "#EF4444" : "#A7F3D0"}
              fill={isHeartActive ? "#EF4444" : "none"}
              strokeWidth={2.2}
            />
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 800,
                color: isHeartActive ? "#FCA5A5" : "#D1FAE5",
              }}
            >
              Thích
            </span>
          </div>

          {/* Mini Nút Đăng ký tone XANH LÁ tươi sáng nổi bật */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 20,
              background: isBellActive
                ? "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                : "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              boxShadow: isBellActive
                ? "0 2px 10px rgba(239, 68, 68, 0.5)"
                : "0 2px 10px rgba(16, 185, 129, 0.45)",
            }}
          >
            <Bell
              size={13}
              color="#FFFFFF"
              fill={isBellActive ? "#FFFFFF" : "none"}
              style={{
                transform: `rotate(${bellRotate}deg)`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: 0.3,
              }}
            >
              Đăng ký
            </span>
          </div>
        </div>

        {/* Mũi tên (Tail) của bong bóng thoại trỏ xuống đỉnh đầu Trà Xanh */}
        <svg
          style={{
            position: "absolute",
            bottom: -9,
            right: side === "right" ? 44 : undefined,
            left: side === "left" ? 44 : undefined,
            width: 16,
            height: 10,
            overflow: "visible",
          }}
          viewBox="0 0 16 10"
        >
          <path
            d="M0 0 L8 10 L16 0 Z"
            fill="rgba(7, 32, 22, 0.97)"
            stroke="rgba(52, 211, 153, 0.65)"
            strokeWidth="1.5"
          />
          {/* Đường viền đè lên nối liền khớp viền đáy */}
          <path
            d="M1 0 L15 0"
            stroke="rgba(7, 32, 22, 0.97)"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
};

export interface TraXanhCharacterProps {
  pose: TraXanhPose;
  side?: "left" | "right";
  bottom?: number;
  right?: number;
  left?: number;
  height?: number;
  flip?: boolean;
}

export const TraXanhCharacter: React.FC<TraXanhCharacterProps> = ({
  pose,
  side = "right",
  bottom = 20,
  right = 40,
  left,
  height = 180, // Kích thước gọn nhẹ mặc định mới (180px)
  flip = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Hiệu ứng trồi lên (Pop-in spring) mượt mà
  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.8,
    },
  });

  // 2. Hiệu ứng lặn xuống (Slide-out) ở 18 frames cuối
  const exitFrames = 18;
  const exitProgress = interpolate(
    frame,
    [durationInFrames - exitFrames, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateYEnter = interpolate(enterSpring, [0, 1], [140, 0]);
  const translateYExit = interpolate(exitProgress, [0, 1], [0, 160]);
  const opacityExit = interpolate(exitProgress, [0, 1], [1, 0]);

  // 3. Chuyển động thở nhẹ & nhấp nhô sống động (Idle breathing & float)
  const floatY = Math.sin(frame / 16) * 4;
  const tiltDeg = Math.sin(frame / 32) * 1.2;

  const totalTranslateY = translateYEnter + translateYExit + floatY;

  const positionStyle: React.CSSProperties =
    side === "left"
      ? { left: left ?? 40 }
      : { right: right ?? 40 };

  const scaleX = flip ? -1 : 1;

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        ...positionStyle,
        zIndex: 35,
        display: "flex",
        flexDirection: "column",
        alignItems: side === "left" ? "flex-start" : "flex-end",
        pointerEvents: "none",
        transform: `translateY(${totalTranslateY}px)`,
        opacity: opacityExit,
      }}
    >
      {/* Nhân vật Trà Xanh (cắt nền trong suốt, nhỏ gọn tinh tế ở góc dưới phải) */}
      <div
        style={{
          height,
          display: "flex",
          alignItems: "flex-end",
          transform: `scaleX(${scaleX}) rotate(${tiltDeg}deg)`,
          transformOrigin: "bottom center",
          filter:
            "drop-shadow(0 10px 22px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.15))",
        }}
      >
        <Img
          src={staticFile(poseFile(pose))}
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

export interface TraXanhTimelineSegment {
  from: number;
  pose: TraXanhPose;
}

export interface ContinuousTraXanhProps {
  timeline: TraXanhTimelineSegment[];
  side?: "left" | "right";
  bottom?: number;
  right?: number;
  left?: number;
  height?: number;
  flip?: boolean;
  /** Bật/tắt hiển thị bong bóng thoại kêu gọi Like & Subscribe định kỳ */
  showCta?: boolean;
  /** Danh sách các mốc thời gian xuất hiện bong bóng thoại tùy biến */
  ctaMoments?: TraXanhCtaMoment[];
  /** Khoảng cách tự động xuất hiện bong bóng nếu không truyền ctaMoments (mặc định 4500 frames ~ 2.5 phút) */
  autoCtaInterval?: number;
}

const DEFAULT_CTA_MESSAGES = [
  "Thích nội dung này? Bấm Like & Đăng ký kênh nhé! ✨",
  "Đừng quên Like & Đăng ký để ủng hộ Trà Xanh nha! ❤️",
  "Bấm Đăng ký kênh để không bỏ lỡ video tiếp theo! 🔔",
  "Thả tim và Subscribe để cùng Trà Xanh khám phá nha! 👍",
  "Cảm ơn bạn đã xem! Nhớ Đăng ký kênh ủng hộ nhé! 🌿",
];

/**
 * Nhân vật Trà Xanh hiện diện XUYÊN SUỐT toàn bộ video:
 * - Xuất hiện liên tục từ đầu đến cuối không bao giờ biến mất
 * - Tự động chuyển đổi mượt mà (crossfade + micro-bounce) giữa các biểu cảm theo timeline
 * - Chuyển động thở nhẹ & lơ lửng (idle breathing float) tự nhiên
 * - Tích hợp sẵn bong bóng thoại Like & Subscribe tone XANH LÁ định kỳ ("lâu lâu hiện lên")
 * - Thời lượng xuất hiện lâu hơn (240 frames ~ 8s) để người xem kịp đọc và tương tác
 * - Size chuẩn nhỏ gọn (180px), không che phụ đề hay khung hình chính
 */
export const ContinuousTraXanh: React.FC<ContinuousTraXanhProps> = ({
  timeline,
  side = "right",
  bottom = 20,
  right = 40,
  left,
  height = 180, // Size nhỏ gọn tinh tế mặc định
  flip = false,
  showCta = true,
  ctaMoments,
  autoCtaInterval = 4500,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Hiệu ứng trồi lên (Pop-in spring) mượt mà lúc video bắt đầu (frame 0 -> 25)
  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.8,
    },
  });
  const translateYEnter = interpolate(enterSpring, [0, 1], [140, 0]);

  // 2. Chuyển động thở nhẹ & nhấp nhô sống động liên tục toàn video (Idle breathing & float)
  const floatY = Math.sin(frame / 16) * 4;
  const tiltDeg = Math.sin(frame / 32) * 1.2;
  const totalTranslateY = translateYEnter + floatY;

  // 3. Tìm trạng thái (pose) hiện tại từ timeline
  let activeIdx = 0;
  for (let i = 0; i < timeline.length; i++) {
    if (frame >= timeline[i].from) {
      activeIdx = i;
    } else {
      break;
    }
  }

  const currentSeg = timeline[activeIdx];
  const prevSeg = activeIdx > 0 ? timeline[activeIdx - 1] : null;

  // 4. Hiệu ứng chuyển trạng thái mượt mà (Crossfade 12 frames ~ 0.4s)
  const FADE_FRAMES = 12;
  const framesSinceChange = frame - currentSeg.from;
  const isTransitioning =
    prevSeg !== null &&
    framesSinceChange < FADE_FRAMES &&
    currentSeg.pose !== prevSeg.pose;

  const transitionProgress = isTransitioning
    ? interpolate(framesSinceChange, [0, FADE_FRAMES], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Nhịp nảy nhẹ (subtle bounce) mô phỏng cử chỉ đổi tư thế tự nhiên
  const shiftBounce = isTransitioning
    ? Math.sin(transitionProgress * Math.PI) * 0.04
    : 0;

  // 5. Quản lý hiển thị Bong Bóng Thoại (Call-To-Action Bubble)
  // Nếu không truyền ctaMoments thì tự động tạo định kỳ dựa trên durationInFrames
  const effectiveCtaMoments: TraXanhCtaMoment[] = React.useMemo(() => {
    if (ctaMoments && ctaMoments.length > 0) {
      return ctaMoments;
    }
    if (!showCta || durationInFrames < 2400) {
      return [];
    }

    const moments: TraXanhCtaMoment[] = [];
    const step = Math.max(3000, autoCtaInterval);
    let startAt = 3600; // Xuất hiện lần đầu sau ~2 phút

    let idx = 0;
    while (startAt < durationInFrames - 900) {
      moments.push({
        from: startAt,
        durationInFrames: 240, // 8 giây
        text: DEFAULT_CTA_MESSAGES[idx % DEFAULT_CTA_MESSAGES.length],
      });
      startAt += step;
      idx++;
    }

    // Luôn có một mốc gần kết thúc (Outro) nếu video đủ dài
    if (durationInFrames > 3000) {
      const outroFrom = Math.max(0, durationInFrames - 400);
      if (!moments.some((m) => Math.abs(m.from - outroFrom) < 1500)) {
        moments.push({
          from: outroFrom,
          durationInFrames: 240, // 8 giây
          text: "Cảm ơn bạn đã xem! Nhớ bấm Like & Đăng ký kênh ủng hộ Trà Xanh nha! ✨",
        });
      }
    }

    return moments;
  }, [ctaMoments, showCta, durationInFrames, autoCtaInterval]);

  // Kiểm tra frame hiện tại có thuộc CTA moment nào không
  const activeCta = showCta
    ? effectiveCtaMoments.find(
        (m) =>
          frame >= m.from &&
          frame < m.from + (m.durationInFrames ?? 240)
      )
    : undefined;

  const ctaLocalFrame = activeCta ? frame - activeCta.from : 0;
  const ctaDuration = activeCta?.durationInFrames ?? 240;

  // Micro-reaction của nhân vật khi nói chuyện trong bong bóng (hơi nhún nhảy vui vẻ)
  const ctaBounce = activeCta ? Math.sin(ctaLocalFrame / 8) * 1.5 : 0;

  const positionStyle: React.CSSProperties =
    side === "left" ? { left: left ?? 40 } : { right: right ?? 40 };

  const scaleX = flip ? -1 : 1;

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        ...positionStyle,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: side === "left" ? "flex-start" : "flex-end",
        pointerEvents: "none",
        transform: `translateY(${totalTranslateY + ctaBounce}px)`,
      }}
    >
      {/* Bong bóng thoại kêu gọi Like & Đăng ký nổi bật phía trên đầu Trà Xanh */}
      {activeCta && (
        <TraXanhSpeechBubble
          frame={ctaLocalFrame}
          durationInFrames={ctaDuration}
          text={activeCta.text}
          badge={activeCta.badge ?? "TRÀ XANH"}
          side={side}
          bottomOffset={height + 14}
        />
      )}

      {/* Nhân vật Trà Xanh hiển thị mượt mà */}
      <div
        style={{
          height,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: side === "left" ? "flex-start" : "flex-end",
          transform: `scaleX(${scaleX}) scale(${1 + shiftBounce}) rotate(${tiltDeg}deg)`,
          transformOrigin: "bottom center",
          filter:
            "drop-shadow(0 10px 22px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.15))",
        }}
      >
        {isTransitioning && prevSeg && (
          <Img
            src={staticFile(poseFile(prevSeg.pose))}
            style={{
              position: "absolute",
              bottom: 0,
              right: side === "right" ? 0 : undefined,
              left: side === "left" ? 0 : undefined,
              height: "100%",
              width: "auto",
              objectFit: "contain",
              opacity: 1 - transitionProgress,
            }}
          />
        )}
        <Img
          src={staticFile(poseFile(currentSeg.pose))}
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
            opacity: isTransitioning ? transitionProgress : 1,
          }}
        />
      </div>
    </div>
  );
};
