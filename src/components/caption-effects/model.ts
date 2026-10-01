import type { Caption } from "@remotion/captions";

export const CAPTION_EFFECTS = [
  "pop",
  "bounce",
  "slide-up",
  "fade",
  "karaoke",
  "typewriter",
  "underline",
  "spotlight",
  "tilt",
] as const;
export type CaptionEffect = (typeof CAPTION_EFFECTS)[number];
export const CAPTION_PRESETS: Record<
  CaptionEffect,
  { label: string; description: string }
> = {
  pop: { label: "Nhấn từng từ", description: "Phóng nhẹ khi bắt đầu đọc" },
  bounce: { label: "Nảy mềm", description: "Từ đang đọc nhảy một nhịp" },
  "slide-up": { label: "Trượt lên", description: "Từ nổi lên nhẹ nhàng" },
  fade: { label: "Hiện dần", description: "Chuyển độ sáng tinh tế" },
  karaoke: { label: "Karaoke", description: "Quét sáng theo thời lượng từ" },
  typewriter: {
    label: "Mở từng từ",
    description: "Hiện từ đúng lúc lời đọc tới",
  },
  underline: { label: "Gạch nhịp", description: "Gạch chân chạy theo lời đọc" },
  spotlight: { label: "Tiêu điểm", description: "Giảm sáng những từ còn lại" },
  tilt: { label: "Đóng dấu", description: "Nghiêng và hạ chữ nhẹ" },
};

export type CaptionPage = { startMs: number; endMs: number; words: Caption[] };

/** Keep real word timestamps; group pages without inventing per-word timing. */
export function makeCaptionPages(
  captions: readonly Caption[],
  maxWords = 7,
  maxCharacters = 44,
  gapMs = 600,
): CaptionPage[] {
  if (
    !Number.isInteger(maxWords) ||
    maxWords < 1 ||
    !Number.isInteger(maxCharacters) ||
    maxCharacters < 1 ||
    !Number.isFinite(gapMs) ||
    gapMs < 0
  ) {
    throw new Error(
      "Caption page limits must be positive integers and gapMs nonnegative.",
    );
  }
  const pages: CaptionPage[] = [];
  let words: Caption[] = [];
  let previous: Caption | undefined;
  const flush = () => {
    if (words.length)
      pages.push({
        startMs: words[0].startMs,
        endMs: words[words.length - 1].endMs,
        words,
      });
    words = [];
  };
  for (const caption of captions) {
    if (
      typeof caption.text !== "string" ||
      !Number.isFinite(caption.startMs) ||
      !Number.isFinite(caption.endMs) ||
      caption.startMs < 0 ||
      caption.endMs <= caption.startMs
    ) {
      throw new Error("Invalid caption text or timestamps.");
    }
    if (!caption.text.trim()) continue;
    if (previous && caption.startMs < previous.endMs)
      throw new Error(
        "Caption words must be sorted and non-overlapping; align timestamps first.",
      );
    const length = words.reduce(
      (sum, word) => sum + word.text.trim().length + 1,
      0,
    );
    if (
      words.length >= maxWords ||
      (words.length > 0 &&
        length + caption.text.trim().length > maxCharacters) ||
      (previous && caption.startMs - previous.endMs > gapMs)
    )
      flush();
    words.push(caption);
    previous = caption;
    if (caption.pageBreakAfter) flush();
  }
  flush();
  return pages;
}

export function findCaptionPage(pages: readonly CaptionPage[], timeMs: number) {
  let low = 0;
  let high = pages.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (timeMs < pages[mid].startMs) high = mid - 1;
    else if (timeMs >= pages[mid].endMs) low = mid + 1;
    else return pages[mid];
  }
  return null;
}

export function keywordKey(text: string) {
  return text
    .normalize("NFC")
    .toLocaleLowerCase("vi")
    .replace(/[^\p{L}\p{N}]/gu, "");
}

export function wordMotion(
  effect: CaptionEffect,
  elapsedMs: number,
  durationMs: number,
) {
  const t = Math.min(1, Math.max(0, elapsedMs / 180));
  const ease = 1 - (1 - t) ** 3;
  return {
    scale:
      effect === "pop"
        ? 1 + Math.sin(t * Math.PI) * 0.16
        : effect === "tilt"
          ? 0.9 + ease * 0.1
          : 1,
    y:
      effect === "bounce"
        ? -Math.sin(t * Math.PI) * 0.2
        : effect === "slide-up"
          ? (1 - ease) * 0.24
          : 0,
    rotation: effect === "tilt" ? -7 * (1 - ease) : 0,
    opacity: effect === "fade" || effect === "slide-up" ? 0.3 + ease * 0.7 : 1,
    progress: Math.min(1, Math.max(0, elapsedMs / Math.max(1, durationMs))),
  };
}

export type LegacyPhrase = {
  words: readonly { word: string; startMs: number; endMs: number }[];
};
/** Adapter only: preserves legacy word timing and forces breaks between phrases. */
export function fromLegacyPhrases(phrases: readonly LegacyPhrase[]): Caption[] {
  return phrases.flatMap((phrase) =>
    phrase.words.map((word, index) => ({
      text: `${index ? " " : ""}${word.word.trim()}`,
      startMs: word.startMs,
      endMs: word.endMs,
      timestampMs: null,
      confidence: null,
      pageBreakAfter: index === phrase.words.length - 1,
    })),
  );
}
