export const TRANSITION_KINDS = [
  "dissolve",
  "fade-color",
  "film-roll",
  "tv-snap",
  "burn",
  "wipe",
  "slide",
  "push",
  "diagonal",
  "aperture",
  "blinds",
  "stripes",
  "door",
  "clock",
  "checkerboard",
  "iris",
  "blur",
  "diamond",
  "heart",
  "star",
  "zoom",
  "light-leak",
  "flash",
  "cross-zoom",
  "whip",
  "spin",
  "glitch",
  "flip",
  "cube",
  "shake",
] as const;
export type TransitionKind = (typeof TRANSITION_KINDS)[number];
export const DIRECTIONS = ["left", "right", "up", "down"] as const;
export type TransitionDirection = (typeof DIRECTIONS)[number];

export const TRANSITION_PRESETS: Record<
  TransitionKind,
  { label: string; frames: number; pack: string }
> = {
  // 1. Documentary
  dissolve: { label: "Hòa tan", frames: 24, pack: "Documentary" },
  "fade-color": { label: "Qua màu", frames: 24, pack: "Documentary" },
  "film-roll": { label: "Cuộn phim", frames: 22, pack: "Documentary" },
  "tv-snap": { label: "Màn hình TV", frames: 20, pack: "Documentary" },
  burn: { label: "Cháy phim", frames: 22, pack: "Documentary" },

  // 2. Editorial
  wipe: { label: "Gạt khung", frames: 18, pack: "Editorial" },
  slide: { label: "Trượt phủ", frames: 20, pack: "Editorial" },
  push: { label: "Đẩy khung", frames: 20, pack: "Editorial" },
  diagonal: { label: "Cắt chéo", frames: 20, pack: "Editorial" },
  aperture: { label: "Khẩu máy ảnh", frames: 24, pack: "Editorial" },

  // 3. Graphic & Reveal
  blinds: { label: "Mành ngang", frames: 24, pack: "Graphic" },
  stripes: { label: "Mành dọc", frames: 22, pack: "Graphic" },
  door: { label: "Cửa mở đôi", frames: 22, pack: "Graphic" },
  clock: { label: "Quét đồng hồ", frames: 30, pack: "Graphic" },
  checkerboard: { label: "Ma trận ô cờ", frames: 24, pack: "Graphic" },

  // 4. Organic & Shapes
  iris: { label: "Mở vòng tròn", frames: 28, pack: "Organic" },
  blur: { label: "Nhòe mềm", frames: 28, pack: "Organic" },
  diamond: { label: "Mở kim cương", frames: 26, pack: "Organic" },
  heart: { label: "Mở trái tim", frames: 28, pack: "Organic" },
  star: { label: "Mở ngôi sao", frames: 28, pack: "Organic" },

  // 5. Cinematic
  zoom: { label: "Zoom nối cảnh", frames: 24, pack: "Cinematic" },
  "light-leak": { label: "Vệt sáng ấm", frames: 26, pack: "Cinematic" },
  flash: { label: "Chớp sáng", frames: 16, pack: "Cinematic" },
  "cross-zoom": { label: "Xuyên không", frames: 22, pack: "Cinematic" },
  whip: { label: "Lia máy nhanh", frames: 16, pack: "Cinematic" },

  // 6. Dynamic & 3D
  spin: { label: "Xoay nối cảnh", frames: 22, pack: "Dynamic" },
  glitch: { label: "Nhiễu số", frames: 18, pack: "Dynamic" },
  flip: { label: "Lật thẻ 3D", frames: 22, pack: "Dynamic" },
  cube: { label: "Khối hộp 3D", frames: 24, pack: "Dynamic" },
  shake: { label: "Rung chấn", frames: 18, pack: "Dynamic" },
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
