import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { ZeigarnikScene } from "./components/ZeigarnikScene";
import { ZeigarnikHUD } from "./components/ZeigarnikHUD";
import { ZeigarnikCaptions } from "./components/ZeigarnikCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { zeigarnikSubtitles } from "./data/zeigarnikSubtitles";

// Scene frame durations (30 FPS, total 2370 frames = 79.00s)
const SCENE_1_FRAMES = 101; // 0.00s - 3.36s: Nhắn tin cho bạn thân "Mai tao gọi..."
const SCENE_2_FRAMES = 125; // 3.36s - 7.54s: Tắt điện thoại, thấy nhẹ hẳn người
const SCENE_3_FRAMES = 160; // 7.54s - 12.88s: Ngày mai chưa tới, chuyện vẫn y nguyên: Zeigarnik ngược
const SCENE_4_FRAMES = 259; // 12.88s - 21.52s: Cơ chế não khó chịu việc dang dở
const SCENE_5_FRAMES = 255; // 21.52s - 30.00s: Lỗ hổng: chỉ cần nói ra, não coi như đã xử lý
const SCENE_6_FRAMES = 174; // 30.00s - 35.82s: Dopamine không phân biệt "hẹn làm" vs "đã làm"
const SCENE_7_FRAMES = 253; // 35.82s - 44.24s: Hẹn để tuần sau, để mai tính cả chục lần
const SCENE_8_FRAMES = 235; // 44.24s - 52.08s: Nghe rất có trách nhiệm, được tin là chu đáo
const SCENE_9_FRAMES = 122; // 52.08s - 56.14s: Thực chất chỉ mua thời gian để trì hoãn
const SCENE_10_FRAMES = 319;// 56.14s - 66.78s: Nhận diện: nói để mai từ 2 lần -> trốn việc bằng lời hứa
const SCENE_11_FRAMES = 227;// 66.78s - 74.35s: Cách thoát: làm luôn 5 phút, xong tính tiếp
const SCENE_12_FRAMES = 140;// 74.35s - 79.00s: Hẹn không phải làm, nói ra không xóa được việc dang dở

const SCENE_1_START = 0;
const SCENE_2_START = SCENE_1_START + SCENE_1_FRAMES;
const SCENE_3_START = SCENE_2_START + SCENE_2_FRAMES;
const SCENE_4_START = SCENE_3_START + SCENE_3_FRAMES;
const SCENE_5_START = SCENE_4_START + SCENE_4_FRAMES;
const SCENE_6_START = SCENE_5_START + SCENE_5_FRAMES;
const SCENE_7_START = SCENE_6_START + SCENE_6_FRAMES;
const SCENE_8_START = SCENE_7_START + SCENE_7_FRAMES;
const SCENE_9_START = SCENE_8_START + SCENE_8_FRAMES;
const SCENE_10_START = SCENE_9_START + SCENE_9_FRAMES;
const SCENE_11_START = SCENE_10_START + SCENE_10_FRAMES;
const SCENE_12_START = SCENE_11_START + SCENE_11_FRAMES;

const ALL_IMAGES = [
  "images/talking-is-not-doing/01-message-friend-at-night.png",
  "images/talking-is-not-doing/02-relief-after-sending.png",
  "images/talking-is-not-doing/03-task-still-untouched.png",
  "images/talking-is-not-doing/04-unfinished-task-brain.png",
  "images/talking-is-not-doing/05-saying-feels-like-doing.png",
  "images/talking-is-not-doing/06-dopamine-cannot-tell.png",
  "images/talking-is-not-doing/07-postpone-all-day.png",
  "images/talking-is-not-doing/08-trustworthy-appearance.png",
  "images/talking-is-not-doing/09-buying-time-hourglass.png",
  "images/talking-is-not-doing/10-repeated-tomorrow-warning.png",
  "images/talking-is-not-doing/11-start-for-five-minutes.png",
  "images/talking-is-not-doing/12-real-completion.png",
];

export const ZeigarnikEffectShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#060814" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/zeigarnik-effect.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: TIN NHẮN "MAI TAO GỌI ĐỂ BÀN CHUYỆN NHA"          */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <ZeigarnikScene
          src="images/talking-is-not-doing/01-message-friend-at-night.png"
          motion="zoom-in"
          badgeText="📱 1 TIN NHẮN ĐÊM MUỘN"
          badgeColor="#38bdf8"
        >
          <ZeigarnikHUD
            badgeNumber="TRAP #04"
            category="BẪY NHẬN THỨC"
            tag="LỜI HẸN TRƯỚC"
            title="NHẮN TIN: MAI TAO GỌI NHA"
            accentColor="#38bdf8"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: TẮT ĐIỆN THOẠI, THẤY NHẸ HẲN NGƯỜI                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/02-relief-after-sending.png"
          motion="zoom-out"
          badgeText="😮‍💨 THẤY NHẸ HẲN NGƯỜI"
          badgeColor="#a855f7"
        >
          <ZeigarnikHUD
            badgeNumber="TRAP #04"
            category="ẢO GIÁC HOÀN THÀNH"
            tag="CẢM GIÁC NHẸ NHÕM"
            title="NHƯ THỂ CHUYỆN ĐÃ ĐƯỢC XỬ LÝ"
            accentColor="#a855f7"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: HIỆU ỨNG ZEIGARNIK NGƯỢC                          */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/03-task-still-untouched.png"
          motion="zoom-in"
          badgeText="⏳ CHUYỆN VẪN Y NGUYÊN"
          badgeColor="#ef4444"
        >
          <ZeigarnikHUD
            badgeNumber="DIAGNOSIS"
            category="TÂM LÝ HỌC HÀNH VI"
            tag="CHƯA XẢY RA"
            title="HIỆU ỨNG ZEIGARNIK NGƯỢC"
            accentColor="#ef4444"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: CƠ CHẾ NÃO KHÓ CHỊU VIỆC DANG DỞ                  */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/04-unfinished-task-brain.png"
          motion="drift-up"
          badgeText="🧠 BẢN NĂNG KHÓ CHỊU"
          badgeColor="#06b6d4"
        >
          <ZeigarnikHUD
            badgeNumber="MECHANISM"
            category="CƠ CHẾ BẢN NĂNG"
            tag="VIỆC DANG DỞ"
            title="NÃO RẤT KHÓ CHỊU KHI CHƯA XONG"
            accentColor="#06b6d4"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: LỖ HỔNG: NÓI RA NÃO TƯỞNG ĐÃ XỬ LÝ                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/05-saying-feels-like-doing.png"
          motion="zoom-in"
          badgeText="⚠️ TÍN HIỆU ĐÃ XỬ LÝ ẢO"
          badgeColor="#f59e0b"
        >
          <ZeigarnikHUD
            badgeNumber="THE LOOPHOLE"
            category="LỖ HỔNG TÂM TRÍ"
            tag="CHỈ CẦN NÓI RA"
            title="NÃO COI NHƯ ĐÃ GỬI ĐI XỬ LÝ"
            accentColor="#f59e0b"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: DOPAMINE KHÔNG PHÂN BIỆT ĐƯỢC                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/06-dopamine-cannot-tell.png"
          motion="drift-down"
          badgeText="🧪 BẪY DOPAMINE ĐỒNG HÓA"
          badgeColor="#ec4899"
        >
          <ZeigarnikHUD
            badgeNumber="CHEMISTRY"
            category="HÓA CHẤT THƯỞNG"
            tag="NGUY HIỂM NHẤT"
            title="DOPAMINE KHÔNG PHÂN BIỆT ĐƯỢC"
            accentColor="#ec4899"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: HẸN "ĐỂ MAI TÍNH" CẢ CHỤC LẦN                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/07-postpone-all-day.png"
          motion="drift-left"
          badgeText="🔁 ĐỂ MAI TÍNH CẢ CHỤC LẦN"
          badgeColor="#fbbf24"
        >
          <ZeigarnikHUD
            badgeNumber="ILLUSION"
            category="ẢO TƯỞNG KIỂM SOÁT"
            tag="KHÔNG NHÚC NHÍCH"
            title="HẸN CẢ CHỤC LẦN MỘT NGÀY"
            accentColor="#fbbf24"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: NGHE RẤT CÓ TRÁCH NHIỆM                           */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/08-trustworthy-appearance.png"
          motion="zoom-out"
          badgeText="🤝 VỎ BỌC ĐÁNG TIN CẬY"
          badgeColor="#10b981"
        >
          <ZeigarnikHUD
            badgeNumber="CAMOUFLAGE"
            category="VỎ BỌC XÃ HỘI"
            tag="NGƯỜI CHU ĐÁO"
            title="CÂU HẸN NGHE RẤT TRÁCH NHIỆM"
            accentColor="#10b981"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: MUA THỜI GIAN ĐỂ TRÌ HOÃN                         */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/09-buying-time-hourglass.png"
          motion="drift-down"
          badgeText="⌛ MUA THỜI GIAN TRÌ HOÃN"
          badgeColor="#f97316"
        >
          <ZeigarnikHUD
            badgeNumber="REALITY"
            category="BẢN CHẤT SỰ THẬT"
            tag="THÊM MỘT NHỊP"
            title="CHỈ ĐANG MUA THỜI GIAN TRÌ HOÃN"
            accentColor="#f97316"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: NHẬN DIỆN: NÓI "ĐỂ MAI" TỪ 2 LẦN TRỞ LÊN          */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/10-repeated-tomorrow-warning.png"
          motion="zoom-in"
          badgeText="🚩 TRỐN VIỆC BẰNG LỜI HỨA"
          badgeColor="#ef4444"
        >
          <ZeigarnikHUD
            badgeNumber="RED FLAG"
            category="DẤU HIỆU CẢNH BÁO"
            tag="TỪ 2 LẦN TRỞ LÊN"
            title="BẠN ĐANG TRỐN VIỆC BẰNG LỜI HỨA"
            accentColor="#ef4444"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: LÀM LUÔN 5 PHÚT, XONG TÍNH TIẾP                   */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/11-start-for-five-minutes.png"
          motion="drift-up"
          badgeText="⚡ LÀM LUÔN 5 PHÚT"
          badgeColor="#10b981"
        >
          <ZeigarnikHUD
            badgeNumber="ACTION RULE"
            category="GIẢI PHÁP HÀNH ĐỘNG"
            tag="ĐỪNG HẸN LÀM"
            title="LÀM LUÔN 5 PHÚT, XONG TÍNH TIẾP"
            accentColor="#10b981"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: HẸN KHÔNG PHẢI LÀ LÀM                            */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <ZeigarnikScene
          src="images/talking-is-not-doing/12-real-completion.png"
          motion="zoom-in"
          badgeText="🎯 HÀNH ĐỘNG THỰC TẾ"
          badgeColor="#8b5cf6"
        >
          <ZeigarnikHUD
            badgeNumber="CORE LESSON"
            category="THÔNG ĐIỆP BẢN LĨNH"
            tag="KHÔNG XÓA ĐƯỢC VIỆC"
            title="HẸN KHÔNG PHẢI LÀ LÀM"
            accentColor="#8b5cf6"
          />
        </ZeigarnikScene>
      </Sequence>

      {/* Dynamic Kinetic Floating Subtitles */}
      <ZeigarnikCaptions phrases={zeigarnikSubtitles} bottom={300} />

      {/* Top Video Progress Bar */}
      <ProgressBar
        color="#8b5cf6"
        backgroundColor="rgba(255, 255, 255, 0.16)"
        height={9}
      />
    </AbsoluteFill>
  );
};
