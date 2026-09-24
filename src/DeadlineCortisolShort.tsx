import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CinematicScene } from "./components/CinematicScene";
import { CinematicHUDHeader } from "./components/CinematicHUDHeader";
import { CinematicCaptions } from "./components/CinematicCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { deadlineCortisolSubtitles } from "./data/deadlineCortisolSubtitles";

// Scene frame ranges (at 30 fps, total = 1884 frames = 62.80s)
// Audio duration: 62.76s (Speech finishes at 62.76s)
const SCENE_1_FRAMES = 230; // 0.00s - 7.64s: Phút chót sản phẩm ngon hơn? Không phải thiên tài
const SCENE_2_FRAMES = 307; // 7.64s - 17.88s: Cortisol & bị hổ đuổi chỉ chạy
const SCENE_3_FRAMES = 171; // 17.88s - 23.60s: 100 cách bắt đầu đứng chôn chân
const SCENE_4_FRAMES = 107; // 23.60s - 27.15s: Còn 2 tiếng hết giờ -> chỉ còn đúng 1 cách
const SCENE_5_FRAMES = 314; // 27.15s - 37.64s: Cú lừa thật: 100% vs vừa làm vừa pha trà, lướt điện thoại
const SCENE_6_FRAMES = 239; // 37.64s - 45.60s: Cortisol không miễn phí -> Burnout
const SCENE_7_FRAMES = 368; // 45.60s - 57.88s: Tạo deadline giả 25 phút & chọn 1 cách
const SCENE_8_FRAMES = 148; // 57.88s - 62.80s: Não không cần hổ thật, chỉ cần tin là có hổ thôi

const SCENE_1_START = 0;
const SCENE_2_START = SCENE_1_START + SCENE_1_FRAMES;
const SCENE_3_START = SCENE_2_START + SCENE_2_FRAMES;
const SCENE_4_START = SCENE_3_START + SCENE_3_FRAMES;
const SCENE_5_START = SCENE_4_START + SCENE_4_FRAMES;
const SCENE_6_START = SCENE_5_START + SCENE_5_FRAMES;
const SCENE_7_START = SCENE_6_START + SCENE_6_FRAMES;
const SCENE_8_START = SCENE_7_START + SCENE_7_FRAMES;

const ALL_IMAGES = [
  "images/deadline-cortisol/01-last-minute-project.png",
  "images/deadline-cortisol/02-cortisol-tiger-chase.png",
  "images/deadline-cortisol/03-choice-paralysis.png",
  "images/deadline-cortisol/04-one-viable-path.png",
  "images/deadline-cortisol/05-unfair-comparison.png",
  "images/deadline-cortisol/06-cortisol-burnout.png",
  "images/deadline-cortisol/07-create-fake-deadline.png",
  "images/deadline-cortisol/08-friendly-tiger-ending.png",
];

export const DeadlineCortisolShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#060a12" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/deadline-cortisol.wav")} volume={1} />

      {/* Preload all images so Chromium never drops frames on transitions */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 1: HOOK - ẢO TƯỞNG PHÚT CHÓT                          */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <CinematicScene
          src="images/deadline-cortisol/01-last-minute-project.png"
          zoomDirection="in"
          mood="golden"
          badgeText="✨ NGHĨ MÌNH THIÊN TÀI?"
          badgeColor="#fbbf24"
          badgePosition="bottom-right"
        >
          <CinematicHUDHeader
            title="ẢO TƯỞNG LÀM VIỆC PHÚT CHÓT"
            category="TÂM LÝ HỌC // BẪY NÃO BỘ"
            tag="SỰ THẬT #01"
            accentColor="#fbbf24"
          />
        </CinematicScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 2: CORTISOL & CON HỔ ĐUỔI                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <CinematicScene
          src="images/deadline-cortisol/02-cortisol-tiger-chase.png"
          zoomDirection="out"
          mood="danger"
          badgeText="🐯 CHỈ CHẠY, KHÔNG LĂN TĂN"
          badgeColor="#ef4444"
          badgePosition="bottom-right"
        >
          <CinematicHUDHeader
            title="CORTISOL & PHẢN XẠ BỊ HỔ ĐUỔI"
            category="KHOA HỌC NÃO BỘ"
            tag="BẢN NĂNG SINH TỒN"
            accentColor="#ef4444"
          />
        </CinematicScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 3: TÊ LIỆT VÌ 100 LỰA CHỌN                           */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <CinematicScene
          src="images/deadline-cortisol/03-choice-paralysis.png"
          zoomDirection="in"
          mood="normal"
          badgeText="🛑 ĐỨNG CHÔN CHÂN CẢ TIẾNG"
          badgeColor="#38bdf8"
          badgePosition="bottom-right"
        >
          <CinematicHUDHeader
            title="TÊ LIỆT VÌ QUÁ NHIỀU LỰA CHỌN"
            category="BẪY TRÌ HOÃN"
            tag="100 CON ĐƯỜNG"
            accentColor="#38bdf8"
          />
        </CinematicScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 4: CHỈ CÒN 1 CON ĐƯỜNG DUY NHẤT                      */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <CinematicScene
          src="images/deadline-cortisol/04-one-viable-path.png"
          zoomDirection="in"
          mood="golden"
          badgeText="⚡ 1 CON ĐƯỜNG DUY NHẤT"
          badgeColor="#facc15"
          badgePosition="bottom-right"
        >
          <CinematicHUDHeader
            title="CÁCH NHANH NHẤT ĐỂ VỀ ĐÍCH"
            category="SỨC ÉP DEADLINE"
            tag="TRIỆT TIÊU LỰA CHỌN"
            accentColor="#facc15"
          />
        </CinematicScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 5: CÚ LỪA SO SÁNH KHẬP KHIỄNG                         */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <CinematicScene
          src="images/deadline-cortisol/05-unfair-comparison.png"
          zoomDirection="out"
          mood="normal"
          badgeText="☕ VỪA LÀM VỪA LƯỚT MẠNG"
          badgeColor="#f97316"
          badgePosition="bottom-right"
        >
          <CinematicHUDHeader
            title="CÚ LỪA SO SÁNH KHẬP KHIỄNG"
            category="TỰ LỪA DỐI CHÍNH MÌNH"
            tag="100% VS VỪA LÀM VỪA CHƠI"
            accentColor="#f97316"
          />
        </CinematicScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 6: CÁI GIÁ CỦA CORTISOL: BURNOUT                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <CinematicScene
          src="images/deadline-cortisol/06-cortisol-burnout.png"
          zoomDirection="in"
          mood="burnout"
          badgeText="🪫 CẠN KIỆT NĂNG LƯỢNG"
          badgeColor="#f43f5e"
          badgePosition="bottom-right"
        >
          <CinematicHUDHeader
            title="DÙNG CORTISOL SẼ BỊ BURNOUT"
            category="CẢNH BÁO SỨC KHỎE"
            tag="KHÔNG MIỄN PHÍ"
            accentColor="#f43f5e"
          />
        </CinematicScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 7: TỰ TẠO DEADLINE GIẢ 25 PHÚT                        */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <CinematicScene
          src="images/deadline-cortisol/07-create-fake-deadline.png"
          zoomDirection="in"
          mood="focus"
          badgeText="⏱ HẸN GIỜ 25 PHÚT"
          badgeColor="#10b981"
          badgePosition="bottom-right"
        >
          <CinematicHUDHeader
            title="TỰ TẠO DEADLINE GIẢ 25 PHÚT"
            category="GIẢI PHÁP HÀNH ĐỘNG"
            tag="CHỌN 1 CÁCH & KHÔNG ĐỔI"
            accentColor="#10b981"
          />
        </CinematicScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 8: KHÔNG CẦN HỔ THẬT                                  */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <CinematicScene
          src="images/deadline-cortisol/08-friendly-tiger-ending.png"
          zoomDirection="in"
          mood="golden"
          badgeText="🐾 LÀM CHỦ BẢN NĂNG"
          badgeColor="#f59e0b"
          badgePosition="bottom-right"
        >
          <CinematicHUDHeader
            title="CHỈ CẦN TIN LÀ CÓ HỔ THÔI"
            category="THÔNG ĐIỆP Ý NGHĨA"
            tag="ĐỒNG HÀNH CÙNG BẢN NĂNG"
            accentColor="#f59e0b"
          />
        </CinematicScene>
      </Sequence>

      {/* Dynamic Full-Bleed Floating Kinetic Captions */}
      <CinematicCaptions phrases={deadlineCortisolSubtitles} bottom={300} />

      {/* Top Video Progress Bar */}
      <ProgressBar
        color="#f97316"
        backgroundColor="rgba(255, 255, 255, 0.18)"
        height={9}
      />
    </AbsoluteFill>
  );
};
