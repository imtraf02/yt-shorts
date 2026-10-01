import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  VACXIN_CHAPTERS,
  VacxinChapter,
} from "./data/vacxinData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { VacxinOverlays } from "./components/VacxinOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import {
  ContinuousTraXanh,
  TraXanhCtaMoment,
  TraXanhTimelineSegment,
} from "./components/TraXanhCharacter";
import { VACXIN_CAPTIONS } from "./data/vacxinCaptions";

// Sub-component cho từng Chapter
const ChapterVisualAndAudio: React.FC<{ chapter: VacxinChapter }> = ({
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
    </AbsoluteFill>
  );
};

// Các mốc xuất hiện bong bóng kêu gọi Like & Subscribe phát ra từ Trà Xanh ("lâu lâu hiện lên")
const VACXIN_TRA_XANH_CTA_MOMENTS: TraXanhCtaMoment[] = [
  {
    from: 3400,
    durationInFrames: 240,
    text: "Khoa học thật kỳ diệu! Đừng quên Like & Đăng ký kênh nhé! 💉✨",
  },
  {
    from: 8700,
    durationInFrames: 240,
    text: "Bấm Đăng ký kênh để cùng Trà Xanh khám phá thêm nhiều câu chuyện y học nha! 🔔",
  },
  {
    from: 14200,
    durationInFrames: 240,
    text: "Thả tim & Đăng ký kênh để ủng hộ Trà Xanh nhé! ❤️",
  },
  {
    from: 17200,
    durationInFrames: 240,
    text: "Cảm ơn bạn đã theo dõi! Nhớ bấm Like & Đăng ký kênh ủng hộ Trà Xanh nha! ✨",
  },
];

// Timeline trạng thái nhân vật Trà Xanh xuất hiện XUYÊN SUỐT video (17.589 frames):
// Tự động chuyển đổi mượt mà giữa các biểu cảm theo mạch cảm xúc lịch sử vắc xin
const TRA_XANH_VACXIN_TIMELINE: TraXanhTimelineSegment[] = [
  // 1. Mở đầu: Nghịch lý con bò (0 -> 1223)
  { from: 0, pose: "ngoi-nghieng-vay-chao" },   // Mở đầu vẫy chào thân mật
  { from: 300, pose: "thuyet-minh" },           // Thuyết minh: Bí ẩn về những cô gái vắt sữa bò
  { from: 850, pose: "nay-y-tuong" },           // Nảy ý tưởng: Vết sẹo cứu rỗi con người

  // 2. Phần 1: Kẻ thù mang tên đậu mùa (1223 -> 2949)
  { from: 1223, pose: "lo-lang" },              // Lo lắng: Nỗi kinh hoàng của bệnh đậu mùa cổ đại
  { from: 1800, pose: "rung-rung" },            // Rưng rưng: Hàng trăm triệu sinh mạng bị cướp đi
  { from: 2400, pose: "ngoi-om-goi" },          // Ngồi ôm gối: Bóng tối dịch bệnh bao trùm nhân loại

  // 3. Phần 2: Thử nghiệm lịch sử (2949 -> 5774)
  { from: 2949, pose: "ngoi-quy-hao-huc" },     // Hào hứng: Bác sĩ nông thôn Edward Jenner bắt đầu
  { from: 3800, pose: "lang-nghe" },            // Lắng nghe câu chuyện dân gian từ người chăn bò
  { from: 4600, pose: "suy-ngam" },             // Suy ngẫm: Thử nghiệm lịch sử trên cậu bé Phipps
  { from: 5300, pose: "an-mung" },              // Vui mừng: Kỳ tích thành công, kháng thể xuất hiện

  // 4. Phần 3: Cuộc chiến hoài nghi (5774 -> 8172)
  { from: 5774, pose: "khoanh-tay" },           // Khoanh tay: Sự nghi ngờ và chế giễu của giới học thuật
  { from: 6800, pose: "giat-minh" },            // Giật mình: Tranh biếm họa người mọc sừng bò
  { from: 7600, pose: "thuyet-minh" },          // Chân lý khoa học dần được chứng minh

  // 5. Phần 4: Bước nhảy vọt Louis Pasteur (8172 -> 10944)
  { from: 8172, pose: "nay-y-tuong" },          // Louis Pasteur tìm ra nguyên lý làm suy yếu mầm bệnh
  { from: 9200, pose: "lo-lang" },              // Lo lắng: Cậu bé Joseph Meister bị chó dại cắn
  { from: 10200, pose: "an-mung" },             // Vui mừng: Cứu sống mạng người, vắc xin bệnh dại ra đời

  // 6. Phần 5: Kỷ nguyên miễn dịch hiện đại (10944 -> 15172)
  { from: 10944, pose: "thuyet-minh" },         // Cơ chế bạch cầu và hệ miễn dịch tinh vi
  { from: 12500, pose: "ngoi-quy-hao-huc" },    // Khám phá kháng thể và trí nhớ miễn dịch
  { from: 14000, pose: "khoanh-tay" },          // Khoanh tay: Vắc xin mRNA và công nghệ thế hệ mới

  // 7. Phần 6: Bài học miễn dịch cộng đồng (15172 -> 17281)
  { from: 15172, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm: Lá chắn miễn dịch cộng đồng
  { from: 16400, pose: "khan-khoan" },          // Khẩn khoản: Trân trọng sức khỏe và bảo vệ người xung quanh

  // 8. Lời kết (17281 -> 17589)
  { from: 17281, pose: "cam-on" },              // Cúi đầu cảm ơn tri ân các nhà khoa học
  { from: 17460, pose: "ngoi-nghieng-vay-chao" },// Ngồi nghiêng vẫy tay chào tạm biệt
];

export const VacxinDocumentary: React.FC = () => {
  const globalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa vào globalFrame
  const currentChapter =
    VACXIN_CHAPTERS.find(
      (c) =>
        globalFrame >= c.startFrame &&
        globalFrame < c.startFrame + c.durationInFrames
    ) || VACXIN_CHAPTERS[VACXIN_CHAPTERS.length - 1];

  const chapterLocalFrame = globalFrame - currentChapter.startFrame;
  const chapterPhrases = (VACXIN_CAPTIONS as any)[currentChapter.id] || [];

  return (
    <AbsoluteFill style={{ backgroundColor: "#060D18" }}>
      {/* 1. Sequence cho từng chapter trong số 8 phần */}
      {VACXIN_CHAPTERS.map((chapter) => (
        <Sequence
          key={chapter.id}
          from={chapter.startFrame}
          durationInFrames={chapter.durationInFrames}
          name={chapter.title}
        >
          <ChapterVisualAndAudio chapter={chapter} />
        </Sequence>
      ))}

      {/* 2. Top Header HUD, Progress Bar & Intro Chapter Banner */}
      <VacxinOverlays
        currentChapter={currentChapter}
        chapterLocalFrame={chapterLocalFrame}
      />

      {/* 3. Phụ đề Kinetic (Whisper AI căn chỉnh từ vựng chính xác, bù trừ 250ms lead-in) */}
      <DocumentaryCaptions
        phrases={chapterPhrases}
        chapterLocalFrame={chapterLocalFrame}
        maxWidth={1380}
        bottom={44}
        offsetMs={250}
      />

      {/* 4. Nhân vật Trà Xanh (tách nền) hiện diện XUYÊN SUỐT video ở góc dưới phải:
             - Size nhỏ gọn tinh tế (height = 180)
             - Tự động đổi biểu cảm theo timeline cảm xúc 8 chương
             - Tích hợp bong bóng thoại Like & Subscribe định kỳ ("lâu lâu hiện lên") */}
      <ContinuousTraXanh
        timeline={TRA_XANH_VACXIN_TIMELINE}
        side="right"
        bottom={20}
        right={40}
        height={180}
        ctaMoments={VACXIN_TRA_XANH_CTA_MOMENTS}
      />

      {/* 5. Text chú thích minh họa bắt buộc ở góc dưới trái (tránh đè lên HUD & Trà Xanh) */}
      <LeninDisclaimer left={40} bottom={24} text="* Hình ảnh chỉ mang tính chất minh họa" />
    </AbsoluteFill>
  );
};
