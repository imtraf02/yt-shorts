import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CaligulaScene } from "./components/CaligulaScene";
import { CaligulaHUD } from "./components/CaligulaHUD";
import { CaligulaCaptions } from "./components/CaligulaCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { caligulaSubtitles } from "./data/caligulaSubtitles";

// Scene frame durations (30 FPS, total 2670 frames = 89.00s)
const SCENE_1_FRAMES = 256; // 0.00s - 8.53s: Hoàng đế La Mã ở tuổi 24, đi chệch hướng
const SCENE_2_FRAMES = 379; // 8.53s - 21.17s: Biệt danh 'đôi bốt nhỏ' từ khi còn bé
const SCENE_3_FRAMES = 149; // 21.17s - 26.13s: Vị hoàng đế khét tiếng tàn bạo nhất lịch sử
const SCENE_4_FRAMES = 258; // 26.13s - 34.73s: Định phong con ngựa cưng Incitatus làm quan
const SCENE_5_FRAMES = 456; // 34.73s - 49.93s: Chuồng đá cẩm thạch, máng ngà voi, người hầu riêng
const SCENE_6_FRAMES = 180; // 49.93s - 55.93s: Tự xưng thần sống, xây tượng cho dân thờ cúng
const SCENE_7_FRAMES = 86;  // 55.93s - 58.80s: Ra lệnh chặt đầu tượng thần Zeus tại Hy Lạp
const SCENE_8_FRAMES = 134; // 58.80s - 63.27s: Thay bằng đầu chính mình, dân chúng choáng váng
const SCENE_9_FRAMES = 246; // 63.27s - 71.47s: Tuyên chiến biển cả, tấn công những con sóng
const SCENE_10_FRAMES = 166;// 71.47s - 77.00s: Nhặt vỏ sò làm chiến lợi phẩm trước thần Neptune
const SCENE_11_FRAMES = 205;// 77.00s - 83.83s: Sau 4 năm trị vì, bị cận vệ ám sát trong cung điện
const SCENE_12_FRAMES = 155;// 83.83s - 89.00s: Hoàng đế gây tranh cãi và khó đoán nhất La Mã

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
  "images/caligula-quirks/01-emperor-at-24.png",
  "images/caligula-quirks/02-little-boots-childhood.png",
  "images/caligula-quirks/03-cute-name-cruel-emperor.png",
  "images/caligula-quirks/04-horse-for-consul.png",
  "images/caligula-quirks/05-marble-horse-stable.png",
  "images/caligula-quirks/06-living-god.png",
  "images/caligula-quirks/07-statue-among-gods.png",
  "images/caligula-quirks/08-zeus-head-swap.png",
  "images/caligula-quirks/09-war-on-the-sea.png",
  "images/caligula-quirks/10-seashell-trophies.png",
  "images/caligula-quirks/11-palace-corridor.png",
  "images/caligula-quirks/12-fallen-crown.png",
];

export const CaligulaQuirksShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0608" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/caligula-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: HOÀNG ĐẾ LA MÃ TUỔI 24                             */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <CaligulaScene
          src="images/caligula-quirks/01-emperor-at-24.png"
          motion="zoom-in"
          badgeText="🏛️ HOÀNG ĐẾ LA MÃ TUỔI 24"
          badgeColor="#DC2626"
        >
          <CaligulaHUD
            tag="HOÀNG ĐẾ LA MÃ"
            accentColor="#DC2626"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: BIỆT DANH 'ĐÔI BỐT NHỎ'                            */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/02-little-boots-childhood.png"
          motion="zoom-out"
          badgeText="👢 BIỆT DANH 'ĐÔI BỐT NHỎ'"
          badgeColor="#F59E0B"
        >
          <CaligulaHUD
            tag="ĐÔI BỐT NHỎ"
            accentColor="#F59E0B"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: TÀN BẠO NHẤT LỊCH SỬ                               */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/03-cute-name-cruel-emperor.png"
          motion="drift-down"
          badgeText="👑 TÀN BẠO NHẤT LỊCH SỬ"
          badgeColor="#EF4444"
        >
          <CaligulaHUD
            tag="BẠO CHÚA KHÉT TIẾNG"
            accentColor="#EF4444"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: PHONG NGỰA LÀM QUAN CHẤP CHÍNH                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/04-horse-for-consul.png"
          motion="zoom-in"
          badgeText="🐴 PHONG NGỰA LÀM QUAN"
          badgeColor="#8B5CF6"
        >
          <CaligulaHUD
            tag="QUAN CHẤP CHÍNH INCITATUS"
            accentColor="#8B5CF6"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: CHUỒNG NGỰA CẨM THẠCH & MÁNG NGÀ VOI              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/05-marble-horse-stable.png"
          motion="drift-left"
          badgeText="💎 CHUỒNG NGỰA CẨM THẠCH"
          badgeColor="#06B6D4"
        >
          <CaligulaHUD
            tag="CHUỒNG NGỰA CẨM THẠCH"
            accentColor="#06B6D4"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: TỰ XƯNG LÀ THẦN SỐNG                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/06-living-god.png"
          motion="zoom-out"
          badgeText="⚡ TỰ XƯNG LÀ THẦN SỐNG"
          badgeColor="#F59E0B"
        >
          <CaligulaHUD
            tag="TỰ XƯNG THẦN SỐNG"
            accentColor="#F59E0B"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: RA LỆNH CHẶT ĐẦU TƯỢNG ZEUS                        */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/07-statue-among-gods.png"
          motion="drift-up"
          badgeText="🏛️ CHẶT ĐẦU TƯỢNG ZEUS"
          badgeColor="#EF4444"
        >
          <CaligulaHUD
            tag="CHẶT ĐẦU TƯỢNG ZEUS"
            accentColor="#EF4444"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: THAY BẰNG ĐẦU CỦA CHÍNH MÌNH                       */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/08-zeus-head-swap.png"
          motion="zoom-in"
          badgeText="🗿 THAY BẰNG ĐẦU MÌNH"
          badgeColor="#DC2626"
        >
          <CaligulaHUD
            tag="THAY ĐẦU CHÍNH MÌNH"
            accentColor="#DC2626"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: TUYÊN CHIẾN VỚI BIỂN CẢ                           */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/09-war-on-the-sea.png"
          motion="drift-right"
          badgeText="🌊 TUYÊN CHIẾN VỚI BIỂN"
          badgeColor="#06B6D4"
        >
          <CaligulaHUD
            tag="TUYÊN CHIẾN BIỂN CẢ"
            accentColor="#06B6D4"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: NHẶT VỎ SÒ LÀM CHIẾN LỢI PHẨM                      */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/10-seashell-trophies.png"
          motion="zoom-out"
          badgeText="🐚 CHIẾN THẮNG THẦN NEPTUNE"
          badgeColor="#10B981"
        >
          <CaligulaHUD
            tag="VỎ SÒ CHIẾN LỢI PHẨM"
            accentColor="#10B981"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: BỊ ĐỘI CẬN VỆ ÁM SÁT TRONG CUNG ĐIỆN              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/11-palace-corridor.png"
          motion="drift-down"
          badgeText="🗡️ ÁM SÁT TRONG CUNG ĐIỆN"
          badgeColor="#EF4444"
        >
          <CaligulaHUD
            tag="BỊ CẬN VỆ ÁM SÁT"
            accentColor="#EF4444"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: HOÀNG ĐẾ KHÓ ĐOÁN NHẤT LỊCH SỬ                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <CaligulaScene
          src="images/caligula-quirks/12-fallen-crown.png"
          motion="zoom-out"
          badgeText="👑 VỊ HOÀNG ĐẾ KHÓ ĐOÁN NHẤT"
          badgeColor="#F59E0B"
        >
          <CaligulaHUD
            tag="HOÀNG ĐẾ LA MÃ BẤT HẢO"
            accentColor="#F59E0B"
          />
        </CaligulaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* KINETIC SUBTITLES (Centered at bottom 290px)                 */}
      {/* ============================================================ */}
      <CaligulaCaptions phrases={caligulaSubtitles} bottom={290} />

      {/* ============================================================ */}
      {/* PROGRESS BAR                                                 */}
      {/* ============================================================ */}
      <ProgressBar color="#DC2626" height={5} />
    </AbsoluteFill>
  );
};
