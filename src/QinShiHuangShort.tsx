import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { QinScene } from "./components/QinScene";
import { QinHUD } from "./components/QinHUD";
import { QinCaptions } from "./components/QinCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { qinSubtitles } from "./data/qinSubtitles";

// Scene frame durations (30 FPS, total 2640 frames = 88.00s)
const SCENE_1_FRAMES = 176;  // 0.00s - 5.87s: Thống nhất Trung Hoa, đế chế 2000 năm
const SCENE_2_FRAMES = 156;  // 5.87s - 11.07s: Nỗi ám ảnh lớn nhất: cái chết
const SCENE_3_FRAMES = 126;  // 11.07s - 15.27s: Điên cuồng tìm kiếm thuốc trường sinh
const SCENE_4_FRAMES = 251;  // 15.27s - 23.63s: Đoàn thám hiểm ra khơi, không ai trở về
const SCENE_5_FRAMES = 301;  // 23.63s - 33.67s: Viên thuốc chứa thủy ngân lỏng lánh bạc
const SCENE_6_FRAMES = 200;  // 33.67s - 40.33s: Bị đầu độc tuổi 49, chết vì sợ chết
const SCENE_7_FRAMES = 299;  // 40.33s - 50.30s: 8000 tượng đất nung sơn màu rực rỡ
const SCENE_8_FRAMES = 88;   // 50.30s - 53.23s: 2000 năm chôn vùi, màu sơn phai mờ
const SCENE_9_FRAMES = 184;  // 53.23s - 59.37s: Lăng mộ với sông suối thủy ngân lỏng
const SCENE_10_FRAMES = 290; // 59.37s - 69.03s: Bẫy nỏ tự động, chưa dám khai quật
const SCENE_11_FRAMES = 342; // 69.03s - 80.43s: Đốt sách chôn nho, thanh trừng tri thức
const SCENE_12_FRAMES = 227; // 80.43s - 88.00s: Vạn Lý Trường Thành, Tần Thủy Hoàng

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
  "images/qin-shi-huang/01-unified-empire.png",
  "images/qin-shi-huang/02-fear-of-death.png",
  "images/qin-shi-huang/03-immortal-island-fleet.png",
  "images/qin-shi-huang/04-no-return.png",
  "images/qin-shi-huang/05-mercury-elixir.png",
  "images/qin-shi-huang/06-ironic-downfall.png",
  "images/qin-shi-huang/07-painted-terracotta-army.png",
  "images/qin-shi-huang/08-terracotta-colors-fade.png",
  "images/qin-shi-huang/09-mercury-rivers-tomb.png",
  "images/qin-shi-huang/10-tomb-crossbow-traps.png",
  "images/qin-shi-huang/11-scroll-bonfire.png",
  "images/qin-shi-huang/12-crown-and-great-wall.png",
];

export const QinShiHuangShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0C0604" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/qin-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: THỐNG NHẤT ĐẾ CHẾ                                  */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <QinScene
          src="images/qin-shi-huang/01-unified-empire.png"
          motion="zoom-in"
          badgeText="👑 THỐNG NHẤT ĐẾ CHẾ"
          badgeColor="#F59E0B"
        >
          <QinHUD
            tag="ĐẾ CHẾ 2000 NĂM"
            accentColor="#F59E0B"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: NỖI ÁM ẢNH CÁI CHẾT                                 */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/02-fear-of-death.png"
          motion="zoom-out"
          badgeText="💀 NỖI ÁM ẢNH LỚN NHẤT"
          badgeColor="#EF4444"
        >
          <QinHUD
            tag="NỖI SỢ CÁI CHẾT"
            accentColor="#EF4444"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: TÌM THUỐC TRƯỜNG SINH                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/03-immortal-island-fleet.png"
          motion="drift-up"
          badgeText="⚡ TÌM THUỐC TRƯỜNG SINH"
          badgeColor="#EAB308"
        >
          <QinHUD
            tag="TRƯỜNG SINH BẤT TỬ"
            accentColor="#EAB308"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: ĐOÀN THÁM HIỂM RA KHƠI                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/04-no-return.png"
          motion="drift-right"
          badgeText="🌊 ĐOÀN THÁM HIỂM RA KHƠI"
          badgeColor="#06B6D4"
        >
          <QinHUD
            tag="KHÔNG AI TRỞ VỀ"
            accentColor="#06B6D4"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: PHƯƠNG THUỐC THỦY NGÂN                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/05-mercury-elixir.png"
          motion="zoom-in"
          badgeText="🧪 PHƯƠNG THUỐC THỦY NGÂN"
          badgeColor="#94A3B8"
        >
          <QinHUD
            tag="VIÊN THUỐC THỦY NGÂN"
            accentColor="#94A3B8"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: BỊ ĐẦU ĐỘC TUỔI 49                                 */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/06-ironic-downfall.png"
          motion="drift-down"
          badgeText="⚰️ BỊ ĐẦU ĐỘC TUỔI 49"
          badgeColor="#DC2626"
        >
          <QinHUD
            tag="CHẾT VÌ NỖI SỢ"
            accentColor="#DC2626"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: 8000 TƯỢNG ĐẤT NUNG                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/07-painted-terracotta-army.png"
          motion="zoom-in"
          badgeText="🎨 8000 TƯỢNG ĐẤT NUNG"
          badgeColor="#F97316"
        >
          <QinHUD
            tag="SẮC MÀU RỰC RỠ"
            accentColor="#F97316"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: 2000 NĂM CHÔN VÙI                                 */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/08-terracotta-colors-fade.png"
          motion="zoom-out"
          badgeText="⏳ 2000 NĂM CHÔN VÙI"
          badgeColor="#EAB308"
        >
          <QinHUD
            tag="PHAI MỜ THEO THỜI GIAN"
            accentColor="#EAB308"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: SÔNG THỦY NGÂN LỎNG                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/09-mercury-rivers-tomb.png"
          motion="drift-left"
          badgeText="🌊 SÔNG THỦY NGÂN LỎNG"
          badgeColor="#38BDF8"
        >
          <QinHUD
            tag="LĂNG MỘ KHỔNG LỒ"
            accentColor="#38BDF8"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: BẪY NỎ TỰ ĐỘNG                                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/10-tomb-crossbow-traps.png"
          motion="drift-up"
          badgeText="🏹 BẪY NỎ TỰ ĐỘNG"
          badgeColor="#EF4444"
        >
          <QinHUD
            tag="CHƯA THỂ KHAI QUẬT"
            accentColor="#EF4444"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: ĐỐT SÁCH CHÔN NHO                                  */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/11-scroll-bonfire.png"
          motion="drift-right"
          badgeText="🔥 ĐỐT SÁCH CHÔN NHO"
          badgeColor="#F97316"
        >
          <QinHUD
            tag="THANH TRỪNG TRI THỨC"
            accentColor="#F97316"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: VẠN LÝ TRƯỜNG THÀNH                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <QinScene
          src="images/qin-shi-huang/12-crown-and-great-wall.png"
          motion="zoom-out"
          badgeText="👑 VẠN LÝ TRƯỜNG THÀNH"
          badgeColor="#F59E0B"
        >
          <QinHUD
            tag="TẦN THỦY HOÀNG"
            accentColor="#F59E0B"
          />
        </QinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* KINETIC SUBTITLES (Centered at bottom 290px)                 */}
      {/* ============================================================ */}
      <QinCaptions phrases={qinSubtitles} bottom={290} />

      {/* ============================================================ */}
      {/* PROGRESS BAR                                                 */}
      {/* ============================================================ */}
      <ProgressBar color="#F59E0B" height={5} />
    </AbsoluteFill>
  );
};
