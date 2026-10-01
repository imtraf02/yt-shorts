import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  DINOSAUR_CHAPTERS,
  DinosaurChapter,
} from "./data/dinosaurData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { DinosaurAtmosphere } from "./components/DinosaurAtmosphere";
import { DinosaurOverlays } from "./components/DinosaurOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { DocumentarySceneBadge } from "./components/DocumentarySceneBadge";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import { DinosaurAiDisclaimerBadge } from "./components/DinosaurAiDisclaimerBadge";
import { DINOSAUR_CAPTIONS } from "./data/dinosaurCaptions";


// Sub-component cho từng Chapter của DinosaurDocumentary
const ChapterVisualAndAudio: React.FC<{ chapter: DinosaurChapter }> = ({
  chapter,
}) => {
  const numImages = chapter.images.length;
  const baseImageFrames = Math.floor(chapter.durationInFrames / numImages);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0604" }}>
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

export const DinosaurDocumentary: React.FC = () => {
  const globalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa vào globalFrame
  const currentChapter =
    DINOSAUR_CHAPTERS.find(
      (c) =>
        globalFrame >= c.startFrame &&
        globalFrame < c.startFrame + c.durationInFrames
    ) || DINOSAUR_CHAPTERS[DINOSAUR_CHAPTERS.length - 1];

  const chapterLocalFrame = globalFrame - currentChapter.startFrame;
  const chapterPhrases = (DINOSAUR_CAPTIONS as any)[currentChapter.id] || [];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0604" }}>
      {/* 1. Sequence cho từng chapter trong số 13 chương */}
      {DINOSAUR_CHAPTERS.map((chapter) => (
        <Sequence
          key={chapter.id}
          from={chapter.startFrame}
          durationInFrames={chapter.durationInFrames}
          name={chapter.title}
        >
          <ChapterVisualAndAudio chapter={chapter} />
        </Sequence>
      ))}

      {/* 3. Hiệu ứng tàn tro núi lửa, bào tử nguyên sinh & ánh rực tiền sử */}
      <DinosaurAtmosphere />

      {/* 4. Phụ đề động kinetic nguyên vẹn câu/vế tự nhiên */}
      <DocumentaryCaptions
        phrases={chapterPhrases}
        chapterLocalFrame={chapterLocalFrame}
        maxWidth={1380}
        bottom={50}
      />

      {/* 5. Định kỳ xuất hiện badge thông báo ảnh do AI tái hiện */}
      <DinosaurAiDisclaimerBadge globalFrame={globalFrame} />

      {/* 6. Text nhỏ ở góc dưới phải video: "Hình ảnh mang tính chất minh họa cổ sinh" */}
      <LeninDisclaimer text="* Hình ảnh phục dựng mô phỏng cổ sinh vật học" />

      {/* 7. Lớp HUD, Progress Bar, và Intro Card đầu mỗi chương */}
      <DinosaurOverlays
        currentChapter={currentChapter}
        chapterLocalFrame={chapterLocalFrame}
      />

    </AbsoluteFill>
  );
};
