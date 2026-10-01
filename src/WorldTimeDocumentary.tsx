import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  WORLD_TIME_CHAPTERS,
  WorldTimeChapter,
} from "./data/worldTimeData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { WorldTimeOverlays } from "./components/WorldTimeOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import {
  ContinuousTraXanh,
  TraXanhCtaMoment,
  TraXanhTimelineSegment,
} from "./components/TraXanhCharacter";
import { WORLD_TIME_CAPTIONS } from "./data/worldTimeCaptions";
import { TransitionOverlay } from "./components/transitions";
import { WorldTimeAtmosphere } from "./components/WorldTimeAtmosphere";

// Sub-component cho từng Chapter
const ChapterVisualAndAudio: React.FC<{ chapter: WorldTimeChapter }> = ({
  chapter,
}) => {
  const numImages = chapter.images.length;
  const baseImageFrames = Math.floor(chapter.durationInFrames / numImages);

  return (
    <AbsoluteFill style={{ backgroundColor: "#060D18" }}>
      {/* 1. File âm thanh thuyết minh (Trúc Ly 48kHz Hi-Fi ngắt nghỉ tự nhiên) */}
      <Audio src={staticFile(chapter.audioSrc)} volume={1.0} />

      {/* 2. Dãy ảnh minh họa phân cảnh Ken Burns kèm mô tả ảnh chuẩn theo nội dung audio */}
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
          </Sequence>
        );
      })}

      {/* 3. Chuyển cảnh fade-color mềm mại giữa các ảnh trong chương */}
      {chapter.imageStartFrames.length > 1 && (
        <TransitionOverlay
          boundaries={chapter.imageStartFrames.slice(1)}
          kind="fade-color"
          halfWindow={6}
          color="#060D18"
          zIndex={4}
        />
      )}
    </AbsoluteFill>
  );
};

// Các mốc xuất hiện bong bóng kêu gọi Like & Subscribe phát ra từ Trà Xanh ("lâu lâu hiện lên")
const WORLD_TIME_TRA_XANH_CTA_MOMENTS: TraXanhCtaMoment[] = [
  {
    from: 2500,
    durationInFrames: 240,
    text: "Bạn có thấy thú vị khi cả thế giới cùng một giây? Bấm Like & Đăng ký kênh nhé! ⏰✨",
  },
  {
    from: 6800,
    durationInFrames: 240,
    text: "Đăng ký kênh để cùng Trà Xanh khám phá thêm nhiều kiến thức khoa học kỳ thú nha! 🔔",
  },
  {
    from: 11000,
    durationInFrames: 240,
    text: "Thả tim & Đăng ký kênh ủng hộ Trà Xanh nhé! ❤️",
  },
  {
    from: 14500,
    durationInFrames: 240,
    text: "Cảm ơn bạn đã xem! Nhớ bấm Like & Đăng ký kênh ủng hộ Trà Xanh nha! ✨",
  },
];

// Timeline biểu cảm nhân vật Trà Xanh phong phú, đa dạng trạng thái xuyên suốt video (15.036 frames)
const TRA_XANH_WORLD_TIME_TIMELINE: TraXanhTimelineSegment[] = [
  // Phần 1: Giờ địa phương xưa & Mặt Trời
  { from: 0, pose: "vay-chao" },
  { from: 142, pose: "ngoi-nghieng-vay-chao" },
  { from: 284, pose: "ngoi-quy-hao-huc" },
  { from: 575, pose: "suy-ngam" },
  { from: 717, pose: "ngoi-doc-sach" },
  { from: 895, pose: "ngoi-ghi-chep" },
  { from: 1191, pose: "giat-minh" },
  { from: 1388, pose: "ngoi-thu-gian" },
  { from: 1578, pose: "quyet-tam" },

  // Phần 2: Hàng hải & Kinh tuyến Greenwich
  { from: 1778, pose: "thuyet-minh" },
  { from: 1915, pose: "ngoi-xep-bang-suy-ngam" },
  { from: 2200, pose: "nay-y-tuong" },
  { from: 2470, pose: "ngoi-thuyet-minh" },
  { from: 2686, pose: "ngoi-doc-sach" },
  { from: 2883, pose: "khoanh-tay" },
  { from: 3100, pose: "ngac-nhien" },
  { from: 3345, pose: "lang-nghe" },

  // Phần 3: Tàu hỏa & Điện báo
  { from: 3564, pose: "giat-minh" },
  { from: 3687, pose: "lo-lang" },
  { from: 3950, pose: "khoanh-tay" },
  { from: 4180, pose: "quyet-tam" },
  { from: 4425, pose: "thuyet-minh" },
  { from: 4660, pose: "nay-y-tuong" },
  { from: 4860, pose: "ngoi-thuyet-minh" },
  { from: 5040, pose: "an-mung" },

  // Phần 4: Vùng giờ & Sandford Fleming
  { from: 5202, pose: "ngoi-lo-lang" },
  { from: 5476, pose: "ngoi-xep-bang-suy-ngam" },
  { from: 5690, pose: "nay-y-tuong" },
  { from: 5930, pose: "an-mung" },
  { from: 6180, pose: "vui-suong" },
  { from: 6420, pose: "khoanh-tay" },
  { from: 6630, pose: "ngoi-doc-sach" },
  { from: 6810, pose: "thuyet-minh" },

  // Phần 5: Hội nghị Washington 1884
  { from: 6943, pose: "ngoi-chap-tay" },
  { from: 7241, pose: "suy-ngam" },
  { from: 7470, pose: "nay-y-tuong" },
  { from: 7720, pose: "an-mung" },
  { from: 7980, pose: "giat-minh" },
  { from: 8200, pose: "ngoi-thuyet-minh" },
  { from: 8440, pose: "ngoi-ghi-chep" },
  { from: 8650, pose: "ngoi-quy-hao-huc" },

  // Phần 6: Sự quay Trái Đất & Đồng hồ nguyên tử
  { from: 8797, pose: "suy-ngam" },
  { from: 9006, pose: "ngac-nhien" },
  { from: 9342, pose: "nay-y-tuong" },
  { from: 9650, pose: "ngoi-doc-sach" },
  { from: 10050, pose: "quyet-tam" },
  { from: 10350, pose: "thuyet-minh" },

  // Phần 7: Giờ UTC & Giây nhuận
  { from: 10671, pose: "ngoi-xep-bang-suy-ngam" },
  { from: 10962, pose: "nay-y-tuong" },
  { from: 11193, pose: "ngac-nhien" },
  { from: 11481, pose: "lo-lang" },
  { from: 11745, pose: "suy-ngam" },
  { from: 12156, pose: "ngoi-thuyet-minh" },

  // Phần 8: UTC(k) & Vệ tinh GPS
  { from: 12589, pose: "khoanh-tay" },
  { from: 12868, pose: "ngoi-ghi-chep" },
  { from: 13118, pose: "ngoi-quy-hao-huc" },
  { from: 13354, pose: "thuyet-minh" },

  // Phần 9: Bản đồ múi giờ & Database IANA
  { from: 13585, pose: "lo-lang" },
  { from: 13750, pose: "suy-ngam" },
  { from: 13950, pose: "ngoi-doc-sach" },
  { from: 14100, pose: "nay-y-tuong" },

  // Phần 10: Tương lai thời gian & Đúc kết
  { from: 14265, pose: "ngoi-xep-bang-suy-ngam" },
  { from: 14450, pose: "quyet-tam" },
  { from: 14650, pose: "cam-on" },
  { from: 14850, pose: "vay-chao" },
];

// Các điểm ranh giới chuyển tiếp giữa 10 chương lớn
const WORLD_TIME_CHAPTER_BOUNDARIES = WORLD_TIME_CHAPTERS.slice(1).map(
  (c) => c.globalStartFrame
);

export const WorldTimeDocumentary: React.FC = () => {
  const currentGlobalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa trên globalStartFrame và durationInFrames
  let activeChapterIndex = 0;
  for (let i = 0; i < WORLD_TIME_CHAPTERS.length; i++) {
    const ch = WORLD_TIME_CHAPTERS[i];
    if (
      currentGlobalFrame >= ch.globalStartFrame &&
      currentGlobalFrame < ch.globalStartFrame + ch.durationInFrames
    ) {
      activeChapterIndex = i;
      break;
    }
    if (i === WORLD_TIME_CHAPTERS.length - 1 && currentGlobalFrame >= ch.globalStartFrame) {
      activeChapterIndex = i;
    }
  }

  const activeChapter = WORLD_TIME_CHAPTERS[activeChapterIndex];
  const chapterLocalFrame = Math.max(0, currentGlobalFrame - activeChapter.globalStartFrame);
  const activeCaptions = WORLD_TIME_CAPTIONS[activeChapter.id] || [];

  return (
    <AbsoluteFill style={{ backgroundColor: "#060D18" }}>
      {/* A. Các Chapter tuần tự nối tiếp nhau */}
      {WORLD_TIME_CHAPTERS.map((chapter) => (
        <Sequence
          key={chapter.id}
          from={chapter.globalStartFrame}
          durationInFrames={chapter.durationInFrames}
          name={`Chapter-${chapter.id}`}
        >
          <ChapterVisualAndAudio chapter={chapter} />
        </Sequence>
      ))}

      {/* B. Chuyển cảnh ánh sáng ấm (Light Leak) báo hiệu bước sang một thời kỳ/chương mới */}
      <TransitionOverlay
        boundaries={WORLD_TIME_CHAPTER_BOUNDARIES}
        kind="light-leak"
        halfWindow={12}
        color="#060D18"
        zIndex={7}
      />

      {/* C. Lớp hiệu ứng không khí & điện ảnh theo chủ đề thời gian (Bụi vàng, sao đêm, sóng tín hiệu, hạt phim) */}
      <WorldTimeAtmosphere currentChapterId={activeChapter.id} />

      {/* D. Lớp giao diện UI (Vignette, Tiêu đề chương, Header) */}
      <WorldTimeOverlays
        currentChapter={activeChapter}
        chapterLocalFrame={chapterLocalFrame}
      />

      {/* E. Phụ đề Kinetic Subtitles song ngữ (Tiếng Anh trên, Tiếng Việt dưới có gradient pill) */}
      <DocumentaryCaptions
        phrases={activeCaptions}
        chapterLocalFrame={chapterLocalFrame}
        maxWidth={1380}
        bottom={44}
      />

      {/* F. Nhân vật Trà Xanh Chibi (cao 180, góc dưới phải, có bong bóng CTA) */}
      <ContinuousTraXanh
        timeline={TRA_XANH_WORLD_TIME_TIMELINE}
        showCta={true}
        ctaMoments={WORLD_TIME_TRA_XANH_CTA_MOMENTS}
        side="right"
      />

      {/* G. Bắt buộc có Disclaimer Minh Họa AI ở góc trên phải */}
      <LeninDisclaimer top={36} right={48} text="* Hình ảnh chỉ mang tính chất minh họa" />
    </AbsoluteFill>
  );
};
