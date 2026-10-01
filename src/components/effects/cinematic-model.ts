export const CINEMATIC_KINDS = [
  "bokeh",
  "light-leak",
  "film-grain",
  "film-scratches",
  "scanlines",
  "vignette",
  "speed-lines",
  "ripples",
] as const;
export type CinematicKind = (typeof CINEMATIC_KINDS)[number];
export const CINEMATIC_PRESETS: Record<
  CinematicKind,
  { label: string; color: string; hint: string }
> = {
  bokeh: {
    label: "Bokeh trôi",
    color: "#FADCA3",
    hint: "Ánh sáng ngoài vùng nét",
  },
  "light-leak": {
    label: "Hắt sáng ống kính",
    color: "#EEAA75",
    hint: "Ánh sáng ấm ở mép hình",
  },
  "film-grain": {
    label: "Hạt phim",
    color: "#FFFFFF",
    hint: "Chất phim tư liệu",
  },
  "film-scratches": {
    label: "Vết xước phim",
    color: "#EADBC4",
    hint: "Tư liệu cổ, hồi tưởng",
  },
  scanlines: {
    label: "Đường quét CRT",
    color: "#8BE5D1",
    hint: "Màn hình công nghệ",
  },
  vignette: {
    label: "Tối viền mềm",
    color: "#020810",
    hint: "Tập trung vào chủ thể",
  },
  "speed-lines": {
    label: "Vệt tốc độ",
    color: "#CDEFFF",
    hint: "Nhấn chuyển động anime",
  },
  ripples: {
    label: "Vòng sóng",
    color: "#9CF1E2",
    hint: "Tín hiệu, tác động lan tỏa",
  },
};

export function cycleProgress(seconds: number, period: number, phase = 0) {
  if (![seconds, period, phase].every(Number.isFinite) || period <= 0)
    throw new Error("Cycle needs finite values and a positive period.");
  const value = seconds / period + phase;
  return ((value % 1) + 1) % 1;
}

export function cycleFade(progress: number) {
  return Math.sin(Math.PI * Math.min(1, Math.max(0, progress))) ** 2;
}
