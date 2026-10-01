/** Frame-addressable particle motion: no timers, mutable simulation or global random state. */
export const EFFECT_KINDS = [
  "leaves",
  "snow",
  "rain",
  "petals",
  "dust",
  "embers",
  "fireflies",
  "bubbles",
  "confetti",
  "stars",
  "fog",
  "sunrays",
] as const;
export type EffectKind = (typeof EFFECT_KINDS)[number];
export type EffectPreset = {
  label: string;
  count: number;
  colors: readonly string[];
  size: number;
  velocity: number;
  sway: number;
  spin: number;
  background: string;
};

export const EFFECT_PRESETS: Record<EffectKind, EffectPreset> = {
  leaves: {
    label: "Lá mùa thu",
    count: 42,
    colors: ["#EAA343", "#C46A35", "#DA7648", "#91A94F"],
    size: 32,
    velocity: 76,
    sway: 62,
    spin: 45,
    background: "#34261D",
  },
  snow: {
    label: "Tuyết rơi",
    count: 115,
    colors: ["#FFFFFF", "#D5EBFA", "#ABCBE6"],
    size: 9,
    velocity: 64,
    sway: 25,
    spin: 10,
    background: "#183044",
  },
  rain: {
    label: "Mưa nghiêng",
    count: 140,
    colors: ["#B4DCF3", "#83B5DB"],
    size: 35,
    velocity: 890,
    sway: 0,
    spin: 0,
    background: "#162B37",
  },
  petals: {
    label: "Cánh hoa",
    count: 48,
    colors: ["#FFD4E3", "#F09FBD", "#FBE8EA"],
    size: 23,
    velocity: 52,
    sway: 70,
    spin: 58,
    background: "#3D2639",
  },
  dust: {
    label: "Bụi ánh sáng",
    count: 68,
    colors: ["#FFE9AB", "#EDCE85", "#FFF7DC"],
    size: 5,
    velocity: -14,
    sway: 20,
    spin: 0,
    background: "#30302B",
  },
  embers: {
    label: "Tàn lửa",
    count: 62,
    colors: ["#FF7F3F", "#FFD18A", "#EB4434"],
    size: 7,
    velocity: -88,
    sway: 42,
    spin: 40,
    background: "#301E27",
  },
  fireflies: {
    label: "Đom đóm",
    count: 36,
    colors: ["#D3EF8A", "#AAF6C0", "#F6E69F"],
    size: 8,
    velocity: -8,
    sway: 95,
    spin: 0,
    background: "#12332F",
  },
  bubbles: {
    label: "Bong bóng",
    count: 32,
    colors: ["#B3EDF2", "#7ECBDC", "#DDFAF6"],
    size: 36,
    velocity: -58,
    sway: 34,
    spin: 0,
    background: "#153440",
  },
  confetti: {
    label: "Giấy kim tuyến",
    count: 88,
    colors: ["#EEAC63", "#74D9C6", "#E999BE", "#B3A3ED"],
    size: 18,
    velocity: 115,
    sway: 52,
    spin: 145,
    background: "#252540",
  },
  stars: {
    label: "Sao lấp lánh",
    count: 90,
    colors: ["#F6EACB", "#B4DBFF", "#FFFFFF"],
    size: 8,
    velocity: 0,
    sway: 0,
    spin: 0,
    background: "#151E38",
  },
  fog: {
    label: "Sương trôi",
    count: 7,
    colors: ["#D3E4E5", "#A9C2C6"],
    size: 1,
    velocity: 0,
    sway: 0,
    spin: 0,
    background: "#28363B",
  },
  sunrays: {
    label: "Tia nắng",
    count: 6,
    colors: ["#FFE3A6", "#FFF4D2"],
    size: 1,
    velocity: 0,
    sway: 0,
    spin: 0,
    background: "#353827",
  },
};

export function bounded(
  value: number,
  min: number,
  max: number,
  fallback: number,
) {
  return Number.isFinite(value)
    ? Math.max(min, Math.min(max, value))
    : fallback;
}

export function seeded(seed: string, index: number, channel: number) {
  const text = `${seed}:${index}:${channel}`;
  let value = 2166136261;
  for (let i = 0; i < text.length; i++) {
    value = Math.imul(value ^ text.charCodeAt(i), 16777619);
  }
  value ^= value >>> 16;
  value = Math.imul(value, 0x7feb352d);
  value ^= value >>> 15;
  return (value >>> 0) / 4294967296;
}

export function particleCount(kind: EffectKind, density: number) {
  return Math.min(
    300,
    Math.round(EFFECT_PRESETS[kind].count * bounded(density, 0, 3, 1)),
  );
}

const wrap = (n: number, span: number) => ((n % span) + span) % span;

export function particleAt({
  kind,
  index,
  seed,
  seconds,
  width,
  height,
  wind,
  size,
}: {
  kind: EffectKind;
  index: number;
  seed: string;
  seconds: number;
  width: number;
  height: number;
  wind: number;
  size: number;
}) {
  const preset = EFFECT_PRESETS[kind];
  const r = (channel: number) => seeded(seed, index, channel);
  const unit = Math.min(width, height) / 1080;
  const depth = 0.5 + r(0) * 1.2;
  const radius = preset.size * depth * size * unit;
  const pad = Math.max(60 * unit, radius * 2);
  const phase = r(1) * Math.PI * 2;
  const vy = preset.velocity * depth * unit;
  const vx = kind === "stars" ? 0 : wind * unit * depth;
  const x =
    wrap(
      r(2) * (width + pad * 2) +
        seconds * vx +
        Math.sin(seconds * (0.35 + r(3)) + phase) * preset.sway * unit,
      width + pad * 2,
    ) - pad;
  const y =
    wrap(r(4) * (height + pad * 2) + seconds * vy, height + pad * 2) - pad;
  const fade = Math.max(
    0,
    Math.min(
      1,
      (x + pad) / pad,
      (width + pad - x) / pad,
      (y + pad) / pad,
      (height + pad - y) / pad,
    ),
  );
  const twinkle =
    kind === "fireflies" || kind === "stars"
      ? 0.22 +
        0.78 * (0.5 + 0.5 * Math.sin(seconds * (0.7 + r(5)) + phase)) ** 2
      : 1;
  return {
    x,
    y,
    size: radius,
    colorIndex: Math.floor(r(6) * preset.colors.length),
    opacity: (0.3 + r(7) * 0.6) * fade * twinkle,
    rotation:
      kind === "rain"
        ? (-Math.atan2(vx, vy) * 180) / Math.PI
        : r(8) * 360 + seconds * preset.spin * (r(9) > 0.5 ? 1 : -1),
    flip: ["leaves", "petals", "confetti"].includes(kind)
      ? 0.22 + 0.78 * Math.abs(Math.sin(seconds * (1 + r(10)) + phase))
      : 1,
  };
}
