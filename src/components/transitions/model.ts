export const TRANSITION_KINDS = [
  "dissolve",
  "fade-color",
  "wipe",
  "slide",
  "push",
  "iris",
  "diagonal",
  "blinds",
  "zoom",
  "blur",
  "light-leak",
  "clock",
] as const;
export type TransitionKind = (typeof TRANSITION_KINDS)[number];
export const DIRECTIONS = ["left", "right", "up", "down"] as const;
export type TransitionDirection = (typeof DIRECTIONS)[number];

export const TRANSITION_PRESETS: Record<
  TransitionKind,
  { label: string; frames: number; pack: string }
> = {
  dissolve: { label: "Hòa tan", frames: 24, pack: "Documentary" },
  "fade-color": { label: "Qua màu", frames: 24, pack: "Documentary" },
  wipe: { label: "Gạt khung", frames: 18, pack: "Editorial" },
  slide: { label: "Trượt phủ", frames: 20, pack: "Editorial" },
  push: { label: "Đẩy khung", frames: 20, pack: "Editorial" },
  iris: { label: "Mở vòng tròn", frames: 28, pack: "Organic" },
  diagonal: { label: "Cắt chéo", frames: 20, pack: "Editorial" },
  blinds: { label: "Mành ngang", frames: 24, pack: "Editorial" },
  zoom: { label: "Zoom nối cảnh", frames: 24, pack: "Cinematic" },
  blur: { label: "Nhòe mềm", frames: 28, pack: "Organic" },
  "light-leak": { label: "Vệt sáng ấm", frames: 26, pack: "Cinematic" },
  clock: { label: "Quét đồng hồ", frames: 30, pack: "Editorial" },
};

/** Durations include both endpoints. A one-frame transition is a hard cut. */
export function transitionProgress(
  frame: number,
  from: number,
  durationInFrames: number,
) {
  if (
    ![frame, from, durationInFrames].every(Number.isFinite) ||
    durationInFrames < 1 ||
    !Number.isInteger(durationInFrames)
  ) {
    throw new Error(
      "Transition requires finite frame/from and a positive integer durationInFrames.",
    );
  }
  if (durationInFrames === 1) return frame < from ? 0 : 1;
  const linear = Math.min(
    1,
    Math.max(0, (frame - from) / (durationInFrames - 1)),
  );
  return linear * linear * (3 - 2 * linear);
}

export function directionVector(direction: TransitionDirection) {
  // The incoming scene moves in the named direction.
  return { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] }[direction];
}

/** Conservative overlay half-window; opaque on the cut and zero at both ends. */
export function overlayEnvelope(
  frame: number,
  boundary: number,
  halfWindow: number,
) {
  if (!Number.isFinite(halfWindow) || halfWindow < 1)
    throw new Error("halfWindow must be at least one frame.");
  const distance = Math.abs(frame - boundary) / halfWindow;
  const value = Math.max(0, 1 - distance);
  return value * value * (3 - 2 * value);
}
