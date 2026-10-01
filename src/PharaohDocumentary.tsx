import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { PHARAOH_CHAPTERS, PharaohChapter } from "./data/pharaohData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { DocumentaryAtmosphere } from "./components/DocumentaryAtmosphere";
import { PharaohOverlays } from "./components/PharaohOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { DocumentarySceneBadge } from "./components/DocumentarySceneBadge";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import { DocumentaryAiDisclaimerBadge } from "./components/DocumentaryAiDisclaimerBadge";
import { PHARAOH_CAPTIONS } from "./data/pharaohCaptions";

// Sub-component cho từng Chapter
const ChapterVisualAndAudio: React.FC<{ chapter: PharaohChapter }> = ({
  chapter,
}) => {
  const numImages = chapter.images.length;
  const baseImageFrames = Math.floor(chapter.durationInFrames / numImages);

  return (
    <AbsoluteFill style={{ backgroundColor: "#060402" }}>
      {/* 1. File âm thanh thuyết minh (Trúc Ly 48kHz Hi-Fi) */}
      <Audio src={staticFile(chapter.audioSrc)} volume={1.0} />

      {/* 2. Dãy ảnh minh họa phân cảnh Ken Burns kèm mô tả ảnh theo nhịp audio */}
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
            key={imgSrc}
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

export const PharaohDocumentary: React.FC = () => {
  const globalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa vào globalFrame
  const currentChapter =
    PHARAOH_CHAPTERS.find(
      (c) =>
        globalFrame >= c.startFrame &&
        globalFrame < c.startFrame + c.durationInFrames
    ) || PHARAOH_CHAPTERS[PHARAOH_CHAPTERS.length - 1];

  const chapterLocalFrame = globalFrame - currentChapter.startFrame;
  const chapterPhrases = (PHARAOH_CAPTIONS as any)[currentChapter.id] || [];

  return (
    <AbsoluteFill style={{ backgroundColor: "#060402" }}>
      {/* 1. Sequence cho từng chapter trong số 14 chương */}
      {PHARAOH_CHAPTERS.map((chapter) => (
        <Sequence
          key={chapter.id}
          from={chapter.startFrame}
          durationInFrames={chapter.durationInFrames}
          name={chapter.title}
        >
          <ChapterVisualAndAudio chapter={chapter} />
        </Sequence>
      ))}

      {/* 3. Hiệu ứng hạt bụi tro sa mạc và luồng sáng điện ảnh */}
      <DocumentaryAtmosphere />

      {/* 4. Phụ đề động kinetic nguyên vẹn câu/vế tự nhiên */}
      <DocumentaryCaptions
        phrases={chapterPhrases}
        chapterLocalFrame={chapterLocalFrame}
        maxWidth={1380}
        bottom={50}
      />

      {/* 5. Định kỳ xuất hiện badge thông báo ảnh do AI tái hiện (có thể có sai khác lịch sử) */}
      <DocumentaryAiDisclaimerBadge globalFrame={globalFrame} />

      {/* 6. Text nhỏ ở góc dưới trái: "Hình ảnh chỉ mang tính chất minh họa" (tránh đè lên HUD & Scene Badge) */}
      <LeninDisclaimer left={40} bottom={24} text="* Hình ảnh chỉ mang tính chất minh họa" />

      {/* 7. Lớp HUD, Progress Bar, và Intro Card đầu mỗi chương */}
      <PharaohOverlays
        currentChapter={currentChapter}
        chapterLocalFrame={chapterLocalFrame}
      />
    </AbsoluteFill>
  );
};
