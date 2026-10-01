import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  BINARY_CHAPTERS,
  BinaryChapter,
} from "./data/binaryData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { BinaryOverlays } from "./components/BinaryOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import {
  ContinuousTraXanh,
  TraXanhCtaMoment,
  TraXanhTimelineSegment,
} from "./components/TraXanhCharacter";
import { BINARY_CAPTIONS } from "./data/binaryCaptions";

// Sub-component cho từng Chapter
const ChapterVisualAndAudio: React.FC<{ chapter: BinaryChapter }> = ({
  chapter,
}) => {
  const numImages = chapter.images.length;
  const baseImageFrames = Math.floor(chapter.durationInFrames / numImages);

  return (
    <AbsoluteFill style={{ backgroundColor: "#040914" }}>
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
const BINARY_TRA_XANH_CTA_MOMENTS: TraXanhCtaMoment[] = [
  {
    from: 3600,
    durationInFrames: 240,
    text: "Thế giới công nghệ thật kỳ diệu! Nhớ Like & Đăng ký kênh nhé! 💻✨",
  },
  {
    from: 8800,
    durationInFrames: 240,
    text: "Bấm Đăng ký kênh để không bỏ lỡ các tập khám phá công nghệ tiếp theo nha! 🔔",
  },
  {
    from: 14200,
    durationInFrames: 240,
    text: "Thả tim & Subscribe kênh để ủng hộ Trà Xanh nhé! ❤️",
  },
  {
    from: 17900,
    durationInFrames: 240,
    text: "Cảm ơn bạn đã xem! Nhớ bấm Like & Đăng ký kênh ủng hộ Trà Xanh nha! ✨",
  },
];

// Timeline trạng thái nhân vật Trà Xanh xuất hiện XUYÊN SUỐT video (18.291 frames):
// Tự động chuyển đổi mượt mà giữa các biểu cảm theo mạch khám phá lịch sử số nhị phân
const TRA_XANH_BINARY_TIMELINE: TraXanhTimelineSegment[] = [
  // 1. Mở đầu: Nghịch lý 0 và 1 (0 -> 832)
  { from: 0, pose: "ngoi-nghieng-vay-chao" },   // Mở đầu vẫy chào thân mật
  { from: 250, pose: "thuyet-minh" },           // Thuyết minh: Thác nước số 0 và 1 đổ xuống
  { from: 550, pose: "nay-y-tuong" },           // Nảy ý tưởng: Vạn vật số bắt đầu từ chiếc công tắc đơn giản

  // 2. Phần 1: Tiền đề lịch sử (832 -> 5398)
  { from: 832, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm quẻ Kinh Dịch cổ đại
  { from: 1800, pose: "lang-nghe" },            // Lắng nghe: Leibniz say mê nhị phân dưới ánh nến
  { from: 2800, pose: "khoanh-tay" },           // Khoanh tay: Cỗ máy cơ học Pascal bị kẹt bánh răng
  { from: 3800, pose: "ngoi-quy-hao-huc" },     // Ngồi quỳ háo hức: Khung cửi dệt Jacquard và thẻ đục lỗ
  { from: 4700, pose: "thuyet-minh" },          // Ada Lovelace viết thuật toán đầu tiên

  // 3. Phần 2: Ngôn ngữ của tư duy - George Boole (5398 -> 6841)
  { from: 5398, pose: "nay-y-tuong" },          // George Boole và đại số logic Đúng / Sai
  { from: 6200, pose: "suy-ngam" },             // Suy ngẫm: Biến tư duy con người thành phép tính

  // 4. Phần 3: Cú nhảy vọt Claude Shannon (6841 -> 8251)
  { from: 6841, pose: "thuyet-minh" },          // Claude Shannon: Nối logic Boole với công tắc điện
  { from: 7600, pose: "an-mung" },              // Vui mừng: Bước đột phá kết nối toán học với vật lý

  // 5. Phần 4: Cỗ máy đa năng Alan Turing (8251 -> 9467)
  { from: 8251, pose: "ngoi-xep-bang-suy-ngam" },// Alan Turing và mô hình máy tính vạn năng
  { from: 9000, pose: "khoanh-tay" },           // Khoanh tay: Bộ não cơ học giải mã thế giới

  // 6. Phần 5: Từ đèn điện tử đến Transistor (9467 -> 12061)
  { from: 9467, pose: "lo-lang" },              // Lo lắng: Máy tính bóng đèn ENIAC nóng rực
  { from: 10700, pose: "nay-y-tuong" },         // Bóng bán dẫn Transistor ra đời tại Bell Labs
  { from: 11500, pose: "ngoi-quy-hao-huc" },    // Hàng tỷ transistor thu nhỏ trên con chip vi mạch

  // 7. Phần 6: Giải mã thế giới số (12061 -> 15475)
  { from: 12061, pose: "thuyet-minh" },         // Cách số 0 và 1 biểu diễn chữ cái, màu sắc, âm thanh
  { from: 13800, pose: "lang-nghe" },           // Lắng nghe bản giao hưởng số trong chiếc tai nghe

  // 8. Phần 7: Vì sao không dùng hệ cơ số khác? (15475 -> 16681)
  { from: 15475, pose: "khoanh-tay" },          // Khoanh tay: Vì sao không dùng hệ thập phân? Độ tin cậy vật lý

  // 9. Phần 8: Tương lai máy tính lượng tử (16681 -> 17652)
  { from: 16681, pose: "ngoi-quy-hao-huc" },    // Ngồi quỳ háo hức: Qubit lượng tử vừa 0 vừa 1
  { from: 17400, pose: "suy-ngam" },            // Suy ngẫm: Giới hạn mới của công nghệ

  // 10. Lời kết: Vẻ đẹp của sự tối giản (17652 -> 18291)
  { from: 17652, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm vẻ đẹp của sự tối giản nhị phân
  { from: 18000, pose: "cam-on" },              // Cúi đầu cảm ơn khán giả chân thành
  { from: 18180, pose: "ngoi-nghieng-vay-chao" },// Ngồi nghiêng vẫy tay chào tạm biệt
];

export const BinaryDocumentary: React.FC = () => {
  const globalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa vào globalFrame
  const currentChapter =
    BINARY_CHAPTERS.find(
      (c) =>
        globalFrame >= c.startFrame &&
        globalFrame < c.startFrame + c.durationInFrames
    ) || BINARY_CHAPTERS[BINARY_CHAPTERS.length - 1];

  const chapterLocalFrame = globalFrame - currentChapter.startFrame;
  const chapterPhrases = (BINARY_CAPTIONS as any)[currentChapter.id] || [];

  return (
    <AbsoluteFill style={{ backgroundColor: "#040914" }}>
      {/* 1. Sequence cho từng chapter trong số 10 phần */}
      {BINARY_CHAPTERS.map((chapter) => (
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
      <BinaryOverlays
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
             - Tự động đổi biểu cảm theo timeline cảm xúc 10 chương
             - Tích hợp bong bóng thoại Like & Subscribe định kỳ ("lâu lâu hiện lên") */}
      <ContinuousTraXanh
        timeline={TRA_XANH_BINARY_TIMELINE}
        side="right"
        bottom={20}
        right={40}
        height={180}
        ctaMoments={BINARY_TRA_XANH_CTA_MOMENTS}
      />

      {/* 5. Text chú thích minh họa bắt buộc ở góc dưới trái (tránh đè lên HUD & Trà Xanh) */}
      <LeninDisclaimer left={40} bottom={24} text="* Hình ảnh chỉ mang tính chất minh họa" />
    </AbsoluteFill>
  );
};
