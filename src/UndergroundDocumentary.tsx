import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  UNDERGROUND_CHAPTERS,
  UndergroundChapter,
} from "./data/undergroundData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { UndergroundOverlays } from "./components/UndergroundOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { DocumentarySceneBadge } from "./components/DocumentarySceneBadge";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import {
  ContinuousTraXanh,
  TraXanhCtaMoment,
  TraXanhTimelineSegment,
} from "./components/TraXanhCharacter";
import { UNDERGROUND_CAPTIONS } from "./data/undergroundCaptions";
import { TransitionOverlay } from "./components/transitions";
import { UndergroundAtmosphere } from "./components/UndergroundAtmosphere";


// Sub-component cho từng Chapter
const ChapterVisualAndAudio: React.FC<{ chapter: UndergroundChapter }> = ({
  chapter,
}) => {
  const numImages = chapter.images.length;
  const baseImageFrames = Math.floor(chapter.durationInFrames / numImages);

  const startFrames = chapter.imageStartFrames;
  const imageBoundaries =
    startFrames && startFrames.length > 1
      ? startFrames.slice(1)
      : Array.from(
          { length: numImages - 1 },
          (_, i) => (i + 1) * baseImageFrames
        );

  // Phân bổ kiểu chuyển cảnh phù hợp cho các điểm cắt ảnh trong từng chương:
  // - part5 (cạnh tranh độc tố, lan ma): toàn bộ dùng fade-color trầm tối #010A06
  // - part3 (cuộc trao đổi năng lượng vi mô): toàn bộ dùng light-leak vệt sáng ấm #062E1A
  // - các phần khác: xen kẽ tự nhiên giữa fade-color và light-leak
  const isDarkChapter = chapter.id === "part5";
  const isLuminousChapter = chapter.id === "part3";

  const fadeBoundaries = isDarkChapter
    ? imageBoundaries
    : isLuminousChapter
      ? []
      : imageBoundaries.filter((_, idx) => idx % 2 === 0);

  const lightLeakBoundaries = isDarkChapter
    ? []
    : isLuminousChapter
      ? imageBoundaries
      : imageBoundaries.filter((_, idx) => idx % 2 === 1);

  return (
    <AbsoluteFill style={{ backgroundColor: "#030E08" }}>
      {/* 1. File âm thanh thuyết minh chương (Trúc Ly 48kHz Hi-Fi ngắt nghỉ tự nhiên) */}
      <Audio src={staticFile(chapter.audioSrc)} volume={1.0} />

      {/* 2. Dãy ảnh minh họa phân cảnh Ken Burns kèm mô tả ảnh */}
      {chapter.images.map((imgSrc, idx) => {
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
            name={`Scene-${idx + 1}`}
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

      {/* 3. Hiệu ứng chuyển cảnh giữa các bức ảnh minh họa trong chương (TransitionOverlay) */}
      {fadeBoundaries.length > 0 && (
        <TransitionOverlay
          boundaries={fadeBoundaries}
          kind="fade-color"
          color={isDarkChapter ? "#010A06" : "#02120B"}
          halfWindow={8}
          zIndex={5}
        />
      )}
      {lightLeakBoundaries.length > 0 && (
        <TransitionOverlay
          boundaries={lightLeakBoundaries}
          kind="light-leak"
          color="#062E1A"
          halfWindow={8}
          zIndex={5}
        />
      )}

      {/* 4. Hiệu ứng không khí và sinh thái học được thiết kế riêng cho từng chương */}
      <UndergroundAtmosphere
        chapterId={chapter.id}
        startFrame={chapter.startFrame}
      />
    </AbsoluteFill>
  );
};


// Các mốc xuất hiện bong bóng kêu gọi Like & Subscribe phát ra từ Trà Xanh ("lâu lâu hiện lên")
// Màu sắc chủ đạo: XANH LÁ (Emerald), thời lượng hiển thị: 240 frames (~8 giây)
const UNDERGROUND_TRA_XANH_CTA_MOMENTS: TraXanhCtaMoment[] = [
  {
    from: 2500,
    durationInFrames: 240,
    text: "Mạng lưới dưới chân thật kỳ diệu! Đừng quên Like & Đăng ký kênh nhé! 🌿✨",
  },
  {
    from: 5800,
    durationInFrames: 240,
    text: "Bấm Đăng ký kênh để cùng Trà Xanh khám phá thêm nhiều bí mật thiên nhiên nha! 🔔",
  },
  {
    from: 8800,
    durationInFrames: 240,
    text: "Thả tim & Đăng ký kênh để ủng hộ Trà Xanh nhé! 💚",
  },
  {
    from: 13700,
    durationInFrames: 240,
    text: "Cảm ơn bạn đã xem! Nhớ bấm Like & Đăng ký kênh ủng hộ Trà Xanh nha! 🌿✨",
  },
];

// Timeline trạng thái nhân vật Trà Xanh xuất hiện XUYÊN SUỐT video:
// Tự động chuyển đổi mượt mà giữa các biểu cảm theo hành trình khám phá mạng lưới nấm
const TRA_XANH_UNDERGROUND_TIMELINE: TraXanhTimelineSegment[] = [
  // 1. Mở đầu: Mạng lưới dưới chân bạn (part1: 0 -> 1600)
  { from: 0, pose: "ngoi-nghieng-vay-chao" },   // Mở đầu vẫy chào thân mật giữa rừng già
  { from: 350, pose: "nay-y-tuong" },          // Nảy ý tưởng về mạng lưới liên lạc dưới lòng đất
  { from: 720, pose: "giat-minh" },            // Giật mình: Một thìa đất chứa nhiều sinh vật hơn nhân loại
  { from: 1100, pose: "thuyet-minh" },         // Thuyết minh: Wood Wide Web và thế giới nấm kỳ lạ

  // 2. Phần 1: Cây nấm chỉ là phần nổi (part2: 1600 -> 3630)
  { from: 1600, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi suy ngẫm tảng băng chìm của cây nấm
  { from: 2150, pose: "khoanh-tay" },          // Khoanh tay: Nấm không phải cây cũng không phải động vật
  { from: 2600, pose: "lang-nghe" },           // Lắng nghe phát hiện của Albert Frank năm 1885
  { from: 3100, pose: "nay-y-tuong" },         // Nảy ý tưởng: Cuộc bắt tay cộng sinh nấm và rễ cây

  // 3. Phần 2: Một cuộc trao đổi dưới lòng đất (part3: 3630 -> 4677)
  { from: 3630, pose: "thuyet-minh" },         // Trao đổi đường ngọt lấy nước và khoáng chất
  { from: 4200, pose: "an-mung" },             // Vui mừng: Kỳ tích hợp tác 400 triệu năm đưa cây lên cạn

  // 4. Phần 3: Khi mạng lưới nối liền cả khu rừng (part4: 4677 -> 7452)
  { from: 4677, pose: "lang-nghe" },           // Nghiên cứu của GS Suzanne Simard và dòng dinh dưỡng
  { from: 5400, pose: "rung-rung" },           // Xúc động trước sự che chở của cây mẹ
  { from: 6000, pose: "lo-lang" },             // Lo lắng khi sâu rệp tấn công lá cây
  { from: 6500, pose: "an-mung" },             // Vui mừng khi tín hiệu kích hoạt phòng vệ toàn khu rừng
  { from: 7000, pose: "khoanh-tay" },          // Khoanh tay: Tranh luận khoa học về bản chất mạng lưới

  // 5. Phần 4: Mạng lưới cũng có thể mang tin xấu (part5: 7452 -> 10180)
  { from: 7452, pose: "khoanh-tay" },          // Cạnh tranh khốc liệt không phải cổ tích
  { from: 8100, pose: "giat-minh" },           // Giật mình: Kẻ đầu cơ chặn nguồn dinh dưỡng
  { from: 8700, pose: "lo-lang" },             // Lo lắng cây củ đen tiết chất độc triệt hạ láng giềng
  { from: 9300, pose: "e-the" },               // E thẹn: Hoa ống khói ma hút trộm dưỡng chất
  { from: 9750, pose: "ngoi-om-goi" },         // Ngồi ôm gối xót xa mầm bệnh lây lan ngầm
  { from: 10000, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi suy ngẫm tính hai mặt của tự nhiên

  // 6. Phần 5: Sinh vật lớn nhất từng được biết đến (part6: 10180 -> 11560)
  { from: 10180, pose: "giat-minh" },          // Giật mình: Quái vật nấm Oregon rộng 9 km²
  { from: 10650, pose: "ngoi-quy-hao-huc" },   // Ngồi quỳ háo hức: Cá thể nấm cổ xưa hơn 2.000 năm
  { from: 11150, pose: "nay-y-tuong" },        // Không phải cá voi xanh mà là nấm

  // 7. Phần 6: Vì sao điều này quan trọng với chúng ta (part7: 11560 -> 12634)
  { from: 11560, pose: "thuyet-minh" },        // Kho dự trữ carbon khổng lồ bảo vệ khí hậu
  { from: 11950, pose: "rung-rung" },          // Xót xa đất đai bị xới tung
  { from: 12300, pose: "nay-y-tuong" },        // Tương lai nông nghiệp tái sinh phục hồi đất

  // 8. Lời kết: Thế giới dưới chân chúng ta (part8: 12634 -> 14310)
  { from: 12634, pose: "ngoi-xep-bang-suy-ngam" },// Lặng ngắm khu rừng chiều tĩnh lặng
  { from: 13300, pose: "cam-on" },             // Cúi đầu cảm ơn thiên nhiên và khán giả
  { from: 13850, pose: "ngoi-nghieng-vay-chao" },// Ngồi nghiêng vẫy chào tạm biệt
];

export const UndergroundDocumentary: React.FC = () => {
  const globalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa vào globalFrame
  const currentChapter =
    UNDERGROUND_CHAPTERS.find(
      (c) =>
        globalFrame >= c.startFrame &&
        globalFrame < c.startFrame + c.durationInFrames
    ) || UNDERGROUND_CHAPTERS[UNDERGROUND_CHAPTERS.length - 1];

  const chapterLocalFrame = globalFrame - currentChapter.startFrame;
  const chapterPhrases = (UNDERGROUND_CAPTIONS as any)[currentChapter.id] || [];

  return (
    <AbsoluteFill style={{ backgroundColor: "#030E08" }}>
      {/* 1. Sequence cho từng chapter trong số 8 phần */}
      {UNDERGROUND_CHAPTERS.map((chapter) => (
        <Sequence
          key={chapter.id}
          from={chapter.startFrame}
          durationInFrames={chapter.durationInFrames}
          name={chapter.title}
        >
          <ChapterVisualAndAudio chapter={chapter} />
        </Sequence>
      ))}

      {/* 2. Chuyển cảnh giữa 8 chương phim tài liệu (TransitionOverlay)
             - fade-color: Mờ qua màu rêu sẫm đất sâu (#02140D) tại các mốc chuyển phần kịch tính
             - light-leak: Vệt sáng ấm áp tự nhiên (#052E1B) khi bước vào các khám phá kỳ diệu */}
      <TransitionOverlay
        boundaries={[1565, 4665, 7449, 11567]}
        kind="fade-color"
        color="#02140D"
        halfWindow={12}
        zIndex={7}
      />
      <TransitionOverlay
        boundaries={[3602, 10172, 12645]}
        kind="light-leak"
        color="#052E1B"
        halfWindow={12}
        zIndex={7}
      />

      {/* 3. Top Header HUD, Progress Bar & Intro Chapter Banner */}
      <UndergroundOverlays
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
             - Tích hợp bong bóng thoại Like & Subscribe tone XANH LÁ định kỳ ("lâu lâu hiện lên") */}
      <ContinuousTraXanh
        timeline={TRA_XANH_UNDERGROUND_TIMELINE}
        side="right"
        bottom={20}
        right={40}
        height={180}
        ctaMoments={UNDERGROUND_TRA_XANH_CTA_MOMENTS}
      />

      {/* 5. Text chú thích minh họa AI bắt buộc ở góc dưới trái (tránh đè lên HUD & Trà Xanh) */}
      <LeninDisclaimer left={40} bottom={24} text="* Hình ảnh chỉ mang tính chất minh họa" />
    </AbsoluteFill>
  );
};

// Alias phục vụ gọi bằng tên tiếng Việt
export const MangLuoiNamDocumentary = UndergroundDocumentary;
