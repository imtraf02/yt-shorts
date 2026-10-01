import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  HISTORY_GAPS_CHAPTERS,
  HistoryGapsChapter,
} from "./data/historyGapsData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { HistoryGapsAtmosphere } from "./components/HistoryGapsAtmosphere";
import { HistoryGapsOverlays } from "./components/HistoryGapsOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { DocumentarySceneBadge } from "./components/DocumentarySceneBadge";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import { DocumentaryAiDisclaimerBadge } from "./components/DocumentaryAiDisclaimerBadge";
import { HISTORY_GAPS_CAPTIONS } from "./data/historyGapsCaptions";


// Sub-component cho từng Chapter
const ChapterVisualAndAudio: React.FC<{ chapter: HistoryGapsChapter }> = ({
  chapter,
}) => {
  const numImages = chapter.images.length;
  const baseImageFrames = Math.floor(chapter.durationInFrames / numImages);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0805" }}>
      {/* 1. File âm thanh thuyết minh (Trúc Ly 48kHz Hi-Fi) */}
      <Audio src={staticFile(chapter.audioSrc)} volume={1.0} />

      {/* 2. Nhạc nền documentary nhẹ nhàng (volume tối đa <= 0.4 theo yêu cầu) */}
      {chapter.bgmSrc && (
        <Audio
          src={staticFile(chapter.bgmSrc)}
          volume={chapter.bgmVolume ?? 0.25}
          loop
        />
      )}

      {/* 3. Dãy ảnh minh họa phân cảnh Ken Burns kèm mô tả ảnh theo nhịp audio */}
      {chapter.images.map((imgSrc, idx) => {
        const startFrames = chapter.imageStartFrames;
        const from =
          startFrames && startFrames[idx] !== undefined
            ? startFrames[idx]
            : idx * baseImageFrames;
        const nextFrom =
          startFrames &&
          idx < numImages - 1 &&
          startFrames[idx + 1] !== undefined
            ? startFrames[idx + 1]
            : chapter.durationInFrames;
        const duration = Math.max(1, nextFrom - from);
        const description = chapter.imageDescriptions?.[idx] || "";

        return (
          <Sequence
            key={`${imgSrc}-${idx}`}
            from={from}
            durationInFrames={duration}
            name={`Img-${idx + 1}`}
          >
            <DocumentaryKenBurns
              src={imgSrc}
              durationInFrames={duration}
              motionIndex={idx}
            />
            {description ? (
              <DocumentarySceneBadge description={description} />
            ) : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const HistoryGapsDocumentary: React.FC = () => {
  const globalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa vào globalFrame
  const currentChapter =
    HISTORY_GAPS_CHAPTERS.find(
      (c) =>
        globalFrame >= c.startFrame &&
        globalFrame < c.startFrame + c.durationInFrames
    ) || HISTORY_GAPS_CHAPTERS[HISTORY_GAPS_CHAPTERS.length - 1];

  const chapterLocalFrame = globalFrame - currentChapter.startFrame;
  const chapterPhrases = (HISTORY_GAPS_CAPTIONS as any)[currentChapter.id] || [];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0805" }}>
      {/* 1. Sequence cho từng chapter trong số 7 chương */}
      {HISTORY_GAPS_CHAPTERS.map((chapter) => (
        <Sequence
          key={chapter.id}
          from={chapter.startFrame}
          durationInFrames={chapter.durationInFrames}
          name={chapter.title}
        >
          <ChapterVisualAndAudio chapter={chapter} />
        </Sequence>
      ))}

      {/* 2. Hiệu ứng bụi trầm tích thời gian & ánh vàng cổ xưa */}
      <HistoryGapsAtmosphere />

      {/* 3. Phụ đề động kinetic nguyên vẹn câu/vế tự nhiên */}
      <DocumentaryCaptions
        phrases={chapterPhrases}
        chapterLocalFrame={chapterLocalFrame}
        maxWidth={1380}
        bottom={50}
      />

      {/* 4. Định kỳ xuất hiện badge thông báo ảnh do AI tái hiện */}
      <DocumentaryAiDisclaimerBadge globalFrame={globalFrame} />

      {/* 5. Chú thích nhỏ: "Hình ảnh chỉ mang tính chất minh họa" ở góc dưới trái (tránh đè lên HUD & Scene Badge) */}
      <LeninDisclaimer left={40} bottom={24} text="* Hình ảnh chỉ mang tính chất minh họa" />

      {/* 6. Lớp HUD, Progress Bar, và Intro Card đầu mỗi chương */}
      <HistoryGapsOverlays
        currentChapter={currentChapter}
        chapterLocalFrame={chapterLocalFrame}
      />

    </AbsoluteFill>
  );
};
