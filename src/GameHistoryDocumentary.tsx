import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  GAME_HISTORY_CHAPTERS,
  GameHistoryChapter,
} from "./data/gameHistoryData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { GameHistoryOverlays } from "./components/GameHistoryOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import {
  ContinuousTraXanh,
  TraXanhCtaMoment,
  TraXanhTimelineSegment,
} from "./components/TraXanhCharacter";
import { GAME_HISTORY_CAPTIONS } from "./data/game_historyCaptions";

// Sub-component cho từng Chapter
const ChapterVisualAndAudio: React.FC<{ chapter: GameHistoryChapter }> = ({
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
const GAME_HISTORY_TRA_XANH_CTA_MOMENTS: TraXanhCtaMoment[] = [
  {
    from: 3800,
    durationInFrames: 240,
    text: "Bạn thích chơi cờ hay game nào? Nhớ bấm Like & Đăng ký kênh nhé! 🎲✨",
  },
  {
    from: 9200,
    durationInFrames: 240,
    text: "Đăng ký kênh để cùng Trà Xanh khám phá thêm nhiều lịch sử kỳ thú nha! 🔔",
  },
  {
    from: 15200,
    durationInFrames: 240,
    text: "Thả tim & Đăng ký kênh ủng hộ Trà Xanh nhé! ❤️",
  },
  {
    from: 19400,
    durationInFrames: 240,
    text: "Cảm ơn bạn đã xem! Nhớ bấm Like & Đăng ký kênh ủng hộ Trà Xanh nha! ✨",
  },
];

// Timeline trạng thái nhân vật Trà Xanh xuất hiện XUYÊN SUỐT video (19.748 frames):
// Tự động chuyển đổi mượt mà giữa các biểu cảm theo hành trình 5.000 năm lịch sử trò chơi
const TRA_XANH_GAME_HISTORY_TIMELINE: TraXanhTimelineSegment[] = [
  // 1. Mở đầu: Bữa trưa của trí não (0 -> 1340)
  { from: 0, pose: "ngoi-nghieng-vay-chao" },   // Mở đầu vẫy chào thân mật
  { from: 300, pose: "thuyet-minh" },           // Thuyết minh: Vì sao chơi game không no bụng mà ai cũng chơi
  { from: 750, pose: "ngoi-quy-hao-huc" },      // Hào hứng bước vào hành trình 5.000 năm

  // 2. Phần 1: Bàn cờ hoàng gia Ur (1340 -> 4345)
  { from: 1340, pose: "nay-y-tuong" },          // Bàn cờ Ur 4.500 năm tuổi
  { from: 2200, pose: "lang-nghe" },            // Lắng nghe giải mã tấm bảng đất sét Babylon
  { from: 3100, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm luật chơi cổ xưa
  { from: 3800, pose: "an-mung" },              // Vui mừng: Chiến thuật xúc xắc và ăn quân

  // 3. Phần 2: Senet: Trò chơi của linh hồn (4345 -> 6655)
  { from: 4345, pose: "ngoi-quy-hao-huc" },     // Ai Cập và bàn cờ Senet của các Pharaoh
  { from: 5200, pose: "giat-minh" },            // Giật mình: Đánh cờ với đối thủ vô hình nơi thế giới ngầm
  { from: 6000, pose: "suy-ngam" },             // Suy ngẫm: Biểu tượng linh hồn vượt cõi vĩnh hằng

  // 4. Phần 3: Cờ vây: Trò chơi của các vị thần (6655 -> 9758)
  { from: 6655, pose: "thuyet-minh" },          // Cờ vây Trung Hoa cổ đại
  { from: 7800, pose: "khoanh-tay" },           // Khoanh tay: Sự uyên thâm, biến hóa vô tận
  { from: 8900, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm cờ vây & vũ trụ

  // 5. Phần 4: Cờ vua: Từ Ấn Độ đến châu Âu (9758 -> 12863)
  { from: 9758, pose: "nay-y-tuong" },          // Cờ vua bắt nguồn từ Chaturanga Ấn Độ
  { from: 11200, pose: "thuyet-minh" },         // Hành trình qua Ba Tư đến cung đình châu Âu
  { from: 12200, pose: "khoanh-tay" },          // Chiến lược quân vương thời trung cổ

  // 6. Phần 5: Xúc xắc: May rủi và toán học (12863 -> 14317)
  { from: 12863, pose: "ngoi-quy-hao-huc" },    // Xúc xắc và các nhà toán học Phục Hưng
  { from: 13600, pose: "an-mung" },             // Vui mừng: Khởi nguồn của lý thuyết xác suất

  // 7. Phần 6: Bài tây: Cơn sốt in ấn (14317 -> 16121)
  { from: 14317, pose: "thuyet-minh" },         // Bài tây và cuộc cách mạng công nghệ in ấn
  { from: 15300, pose: "e-the" },               // E thẹn: Lệnh cấm và thuế bài tây triều đình

  // 8. Phần 7: Trò chơi điện tử: Kỷ nguyên mới (16121 -> 18475)
  { from: 16121, pose: "nay-y-tuong" },         // Kỷ nguyên video game hiện đại
  { from: 17200, pose: "an-mung" },             // Sự bùng nổ của thế giới ảo

  // 9. Phần 8: Vì sao con người chơi game? (18475 -> 19440)
  { from: 18475, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm: Bản năng chơi đùa của nhân loại
  { from: 19100, pose: "khan-khoan" },          // Khẩn khoản: Cân bằng giữa thế giới game và cuộc sống thật

  // 10. Lời kết (19440 -> 19748)
  { from: 19440, pose: "cam-on" },              // Cúi đầu cảm ơn khán giả chân thành
  { from: 19620, pose: "ngoi-nghieng-vay-chao" },// Ngồi nghiêng vẫy tay chào tạm biệt
];

export const GameHistoryDocumentary: React.FC = () => {
  const globalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa vào globalFrame
  const currentChapter =
    GAME_HISTORY_CHAPTERS.find(
      (c) =>
        globalFrame >= c.startFrame &&
        globalFrame < c.startFrame + c.durationInFrames
    ) || GAME_HISTORY_CHAPTERS[GAME_HISTORY_CHAPTERS.length - 1];

  const chapterLocalFrame = globalFrame - currentChapter.startFrame;
  const chapterPhrases = (GAME_HISTORY_CAPTIONS as any)[currentChapter.id] || [];

  return (
    <AbsoluteFill style={{ backgroundColor: "#060D18" }}>
      {/* 1. Sequence cho từng chapter trong số 10 phần */}
      {GAME_HISTORY_CHAPTERS.map((chapter) => (
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
      <GameHistoryOverlays
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
        timeline={TRA_XANH_GAME_HISTORY_TIMELINE}
        side="right"
        bottom={20}
        right={40}
        height={180}
        ctaMoments={GAME_HISTORY_TRA_XANH_CTA_MOMENTS}
      />

      {/* 5. Text chú thích minh họa bắt buộc ở góc dưới trái (tránh đè lên HUD & Trà Xanh) */}
      <LeninDisclaimer left={40} bottom={24} text="* Hình ảnh chỉ mang tính chất minh họa" />
    </AbsoluteFill>
  );
};
