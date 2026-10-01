import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  FACEBOOK_WHO_PAYS_CHAPTERS,
  FacebookWhoPaysChapter,
} from "./data/facebookWhoPaysData";
import { DocumentaryKenBurns } from "./components/DocumentaryKenBurns";
import { FacebookWhoPaysOverlays } from "./components/FacebookWhoPaysOverlays";
import { DocumentaryCaptions } from "./components/DocumentaryCaptions";
import { DocumentarySceneBadge } from "./components/DocumentarySceneBadge";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import {
  ContinuousTraXanh,
  TraXanhCtaMoment,
  TraXanhTimelineSegment,
} from "./components/TraXanhCharacter";
import { FACEBOOK_WHO_PAYS_CAPTIONS } from "./data/facebookWhoPaysCaptions";

// Sub-component cho từng Chapter
const ChapterVisualAndAudio: React.FC<{ chapter: FacebookWhoPaysChapter }> = ({
  chapter,
}) => {
  const numImages = chapter.images.length;
  const baseImageFrames = Math.floor(chapter.durationInFrames / numImages);

  return (
    <AbsoluteFill style={{ backgroundColor: "#040814" }}>
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

// Các mốc xuất hiện bong bóng kêu gọi Like & Subscribe phát ra từ Trà Xanh ("lâu lâu hiện lên")
const FACEBOOK_TRA_XANH_CTA_MOMENTS: TraXanhCtaMoment[] = [
  {
    from: 3600,
    durationInFrames: 240,
    text: "Bạn thấy phân tích hay chứ? Đừng quên Like & Đăng ký kênh nhé! ✨",
  },
  {
    from: 8500,
    durationInFrames: 240,
    text: "Bấm Đăng ký kênh để không bỏ lỡ các phân tích kinh tế tiếp theo nha! 🔔",
  },
  {
    from: 15500,
    durationInFrames: 240,
    text: "Thả tim & Đăng ký để ủng hộ Trà Xanh nhé! ❤️",
  },
  {
    from: 22100,
    durationInFrames: 240,
    text: "Cùng Trà Xanh khám phá thêm nhiều bài học thú vị nhé! 🌿",
  },
  {
    from: 27750,
    durationInFrames: 240,
    text: "Cảm ơn bạn đã xem! Nhớ bấm Like & Đăng ký kênh ủng hộ Trà Xanh nha! ✨",
  },
];

// Timeline trạng thái nhân vật Trà Xanh xuất hiện XUYÊN SUỐT video (28.130 frames):
// Tự động chuyển đổi mượt mà giữa toàn bộ 17 biểu cảm theo nhịp cảm xúc bài thuyết minh
const TRA_XANH_FULL_DOCUMENTARY_TIMELINE: TraXanhTimelineSegment[] = [
  // 1. Mở đầu: Bữa trưa miễn phí đắt nhất hành tinh (0 -> 1350)
  { from: 0, pose: "ngoi-nghieng-vay-chao" },   // Ngồi nghiêng vẫy chào thân mật mở đầu video
  { from: 260, pose: "thuyet-minh" },           // Thuyết minh: Hai ứng dụng không tốn một xu
  { from: 590, pose: "giat-minh" },             // Giật mình: Ví rỗng đối chiếu kho vàng nghìn tỷ đô
  { from: 840, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm: Ai đang thực sự trả tiền?
  { from: 1150, pose: "e-the" },                // E thẹn: Sự thật hơi... nhột

  // 2. Phần 1: Vì sao mọi thứ trên mạng đều về giá không (1350 -> 3784)
  { from: 1350, pose: "thuyet-minh" },          // Chi phí biên bánh mì vs sản phẩm số
  { from: 1850, pose: "khoanh-tay" },           // Cạnh tranh gay gắt kéo giá về 0
  { from: 2280, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi suy ngẫm quán rượu kiểu Mỹ & đĩa đồ ăn mặn
  { from: 2750, pose: "lang-nghe" },            // Lắng nghe: Rót bia liên tục, tiền xu rơi leng keng
  { from: 3200, pose: "khoanh-tay" },           // Quán cafe wifi 4 tiếng 1 ly nước
  { from: 3580, pose: "nay-y-tuong" },          // Nảy ý tưởng: Vậy món ăn mặn của Facebook là gì?

  // 3. Phần 2: Cái chợ có hai mặt (3784 -> 6375)
  { from: 3784, pose: "ngoi-quy-hao-huc" },     // Ngồi quỳ háo hức: Jean Tirole & thị trường 2 mặt
  { from: 4468, pose: "thuyet-minh" },          // Nghệ thuật trợ cấp chéo giữa 2 bờ cầu
  { from: 5200, pose: "khoanh-tay" },           // Hai cán cân: Người dùng thích thú và nhà quảng cáo
  { from: 5650, pose: "lang-nghe" },            // Lắng nghe bài học: 10 euro định giá quyền riêng tư ở EU
  { from: 6188, pose: "giat-minh" },            // Giật mình: Bạn chính là cái chợ, là sản phẩm!

  // 4. Phần 3: Vì sao kẻ đến trước thường thắng lớn (6375 -> 9764)
  { from: 6375, pose: "thuyet-minh" },          // Hiệu ứng mạng lưới & chiếc điện thoại đầu tiên
  { from: 7100, pose: "nay-y-tuong" },          // Nảy ý tưởng: Chiếc điện thoại thứ 2, thứ 3...
  { from: 7650, pose: "an-mung" },              // Vui mừng: Quả cầu tuyết lăn bánh, kẻ thắng ăn hầu hết
  { from: 8250, pose: "lo-lang" },              // Lo lắng: Đốt tiền mặt giành giật từng người dùng
  { from: 8800, pose: "e-the" },                // E thẹn: Chi phí rời bỏ, nhóm chat gia đình giữ chân
  { from: 9350, pose: "suy-ngam" },             // Suy ngẫm: Thâu tóm Instagram & WhatsApp

  // 5. Phần 4: Thứ họ thật sự bán (9764 -> 12508)
  { from: 9764, pose: "lang-nghe" },            // Lắng nghe Herbert Simon: Sự khan hiếm của chú ý
  { from: 10450, pose: "thuyet-minh" },         // Thuyết minh: Chiếc đồng hồ cát & lát cắt thời gian
  { from: 11050, pose: "khoanh-tay" },          // Khoanh tay: Bát snack không đáy, infinite scroll
  { from: 11550, pose: "lo-lang" },             // Lo lắng: Máy đánh bạc rút kẹo tự động trong túi bạn
  { from: 12150, pose: "ngoi-om-goi" },         // Ngồi ôm gối: 2 giờ sáng lướt video ngắn vô thức

  // 6. Phần 5: Họ biết bạn hơn cả bạn (12508 -> 16244)
  { from: 12508, pose: "thuyet-minh" },         // Thợ may đo từng chi tiết sở thích người dùng
  { from: 13350, pose: "lang-nghe" },           // Lắng nghe: Bình thủy tinh chứa sở thích và hành vi
  { from: 14100, pose: "lo-lang" },             // Lo lắng: Phiên đấu giá dữ liệu trong 1 phần nghìn giây
  { from: 14850, pose: "giat-minh" },           // Giật mình: Bấm 'Đồng ý' điều khoản dài dằng dặc
  { from: 15620, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm: Giá trị thật của thông tin cá nhân

  // 7. Phần 6: Vậy rốt cuộc, ai được lợi? (16244 -> 18717)
  { from: 16244, pose: "ngoi-quy-hao-huc" },    // Ngồi quỳ háo hức: Thặng dư tiêu dùng và tiện ích số
  { from: 17050, pose: "vay-chao" },            // Vẫy tay chào: Kết nối gia đình, bạn bè khắp năm châu
  { from: 17750, pose: "thuyet-minh" },         // Thí nghiệm 100 USD sẵn sàng từ bỏ mạng xã hội
  { from: 18300, pose: "suy-ngam" },            // Suy ngẫm: Khoảng trống vô hình trong cách tính GDP

  // 8. Phần 7: Hóa đơn không ai gửi (18717 -> 21194)
  { from: 18717, pose: "rung-rung" },           // Rưng rưng: Ngoại tác tiêu cực, 730 giờ/năm trôi qua
  { from: 19450, pose: "lo-lang" },             // Lo lắng: Giảm tập trung, giấc ngủ chập chờn
  { from: 20050, pose: "ngoi-om-goi" },         // Ngồi ôm gối: Bất an trước áp lực so sánh trên mạng
  { from: 20650, pose: "giat-minh" },           // Giật mình: Cạm bẫy phẫn nộ kích hoạt từ thuật toán

  // 9. Phần 8: Người thuê đất trồng lúa (21194 -> 24370)
  { from: 21194, pose: "thuyet-minh" },         // Creator và hiện tượng thị trường siêu sao
  { from: 22150, pose: "lo-lang" },             // Lo lắng: Người thuê đất đối mặt bão đổi thuật toán
  { from: 22850, pose: "khoanh-tay" },          // Khoanh tay: Chủ tiệm nhỏ bị ép giá đấu thầu quảng cáo
  { from: 23550, pose: "suy-ngam" },            // Suy ngẫm: Vòng xoáy thoái hóa Enshittification

  // 10. Phần 9: Tương lai sẽ ra sao? (24370 -> 26712)
  { from: 24370, pose: "thuyet-minh" },         // Đạo luật thị trường số DMA & chống độc quyền
  { from: 25150, pose: "nay-y-tuong" },         // Nảy ý tưởng: Mô hình thuê bao trả phí & chia cổ phần dữ liệu
  { from: 25800, pose: "ngoi-quy-hao-huc" },    // Ngồi quỳ háo hức: Khởi đầu của sân chơi công bằng hơn
  { from: 26400, pose: "khoanh-tay" },          // Khoanh tay: Cuộc giằng co thể chế còn rất dài

  // 11. Phần 10: Vậy bạn nên làm gì? (26712 -> 27676)
  { from: 26712, pose: "khan-khoan" },          // Khẩn khoản: Hãy đặt ngân sách thời gian cho chính mình
  { from: 27100, pose: "nay-y-tuong" },         // Nảy ý tưởng: Chủ động tắt thông báo, dùng app có ý thức
  { from: 27420, pose: "thuyet-minh" },         // Đa dạng hóa nguồn tin và bảo vệ sự tự do tinh thần

  // 12. Lời kết: Ai đang trả tiền? (27676 -> 28130)
  { from: 27676, pose: "ngoi-xep-bang-suy-ngam" },// Ngồi xếp bằng suy ngẫm đọng lại giá trị
  { from: 27920, pose: "cam-on" },              // Cúi đầu cảm ơn khán giả chân thành
  { from: 28040, pose: "ngoi-nghieng-vay-chao" },// Ngồi nghiêng vẫy tay chào tạm biệt hẹn gặp lại
];

export const FacebookWhoPaysDocumentary: React.FC = () => {
  const globalFrame = useCurrentFrame();

  // Xác định chapter hiện tại dựa vào globalFrame
  const currentChapter =
    FACEBOOK_WHO_PAYS_CHAPTERS.find(
      (c) =>
        globalFrame >= c.startFrame &&
        globalFrame < c.startFrame + c.durationInFrames
    ) || FACEBOOK_WHO_PAYS_CHAPTERS[FACEBOOK_WHO_PAYS_CHAPTERS.length - 1];

  const chapterLocalFrame = globalFrame - currentChapter.startFrame;
  const chapterPhrases = (FACEBOOK_WHO_PAYS_CAPTIONS as any)[currentChapter.id] || [];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#040814",
      }}
    >
      {/* 1. Sequence cho từng chapter trong số 12 phần */}
      {FACEBOOK_WHO_PAYS_CHAPTERS.map((chapter) => (
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
      <FacebookWhoPaysOverlays
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
             - Tự động đổi biểu cảm theo timeline cảm xúc 12 chương
             - Tích hợp bong bóng thoại Like & Subscribe định kỳ ("lâu lâu hiện lên") */}
      <ContinuousTraXanh
        timeline={TRA_XANH_FULL_DOCUMENTARY_TIMELINE}
        side="right"
        bottom={20}
        right={40}
        height={180}
        ctaMoments={FACEBOOK_TRA_XANH_CTA_MOMENTS}
      />

      {/* 5. Text chú thích minh họa AI bắt buộc ở góc dưới trái (tránh đè lên HUD & Trà Xanh) */}
      <LeninDisclaimer left={40} bottom={24} text="* Hình ảnh chỉ mang tính chất minh họa" />
    </AbsoluteFill>
  );
};
