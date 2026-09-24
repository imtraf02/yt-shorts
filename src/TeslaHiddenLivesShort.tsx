import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { TeslaScene } from "./components/TeslaScene";
import { TeslaHUD } from "./components/TeslaHUD";
import { TeslaCaptions } from "./components/TeslaCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { teslaSubtitles } from "./data/teslaSubtitles";

// Scene frame durations (30 FPS, total 2820 frames = 94.00s)
const SCENE_1_FRAMES = 288; // 0.00s - 9.60s: Nikola Tesla phát minh dòng điện xoay chiều...
const SCENE_2_FRAMES = 134; // 9.60s - 14.07s: Chứng sợ vi khuẩn nặng, rửa tay liên tục
const SCENE_3_FRAMES = 238; // 14.07s - 22.00s: 18 chiếc khăn sạch, không bắt tay ai
const SCENE_4_FRAMES = 258; // 22.00s - 30.60s: Ám ảnh con số 3, đi bộ 3 vòng
const SCENE_5_FRAMES = 182; // 30.60s - 36.67s: Tính thể tích thức ăn, sợ tóc và bụi
const SCENE_6_FRAMES = 378; // 36.67s - 49.27s: Chuyện tình với con bồ câu trắng
const SCENE_7_FRAMES = 128; // 49.27s - 53.53s: Khi bồ câu chết, mất đi một phần bản thân
const SCENE_8_FRAMES = 272; // 53.53s - 62.60s: Cuộc chiến dòng điện với Edison
const SCENE_9_FRAMES = 147; // 62.60s - 67.50s: Edison giật điện chết voi
const SCENE_10_FRAMES = 180;// 67.50s - 73.50s: Tesla cho dòng điện chạy qua cơ thể
const SCENE_11_FRAMES = 272;// 73.50s - 82.57s: Ẩn dật, tia laser huỷ diệt và người ngoài hành tinh
const SCENE_12_FRAMES = 343;// 82.57s - 94.00s: Thắp sáng thế giới, huyền thoại Nikola Tesla

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
  "images/tesla-hidden-lives/01-lighting-the-world.png",
  "images/tesla-hidden-lives/02-obsessive-handwashing.png",
  "images/tesla-hidden-lives/03-eighteen-towels.png",
  "images/tesla-hidden-lives/04-rule-of-three.png",
  "images/tesla-hidden-lives/05-measuring-food-volume.png",
  "images/tesla-hidden-lives/06-white-dove-love.png",
  "images/tesla-hidden-lives/07-lost-dove.png",
  "images/tesla-hidden-lives/08-war-of-currents.png",
  "images/tesla-hidden-lives/09-electricity-fear-campaign.png",
  "images/tesla-hidden-lives/10-safe-electricity-stage.png",
  "images/tesla-hidden-lives/11-eccentric-final-years.png",
  "images/tesla-hidden-lives/12-lit-world-lonely-end.png",
];

export const TeslaHiddenLivesShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#04060E" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/tesla-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: PHÁT MINH DÒNG ĐIỆN XOAY CHIỀU                     */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <TeslaScene
          src="images/tesla-hidden-lives/01-lighting-the-world.png"
          motion="zoom-in"
          badgeText="💡 THẮP SÁNG THẾ GIỚI"
          badgeColor="#00F0FF"
        >
          <TeslaHUD
            tag="ĐIỆN XOAY CHIỀU"
            accentColor="#00F0FF"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: ÁM ẢNH SỢ VI KHUẨN                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/02-obsessive-handwashing.png"
          motion="zoom-out"
          badgeText="🧼 RỬA TAY LIÊN TỤC"
          badgeColor="#F59E0B"
        >
          <TeslaHUD
            tag="ÁM ẢNH SỢ VI KHUẨN"
            accentColor="#F59E0B"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: BÍ MẬT 18 CHIẾC KHĂN SẠCH                         */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/03-eighteen-towels.png"
          motion="drift-right"
          badgeText="🚫 TUYỆT ĐỐI KHÔNG BẮT TAY"
          badgeColor="#A855F7"
        >
          <TeslaHUD
            tag="BÍ MẬT 18 CHIẾC KHĂN"
            accentColor="#A855F7"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: ÁM ẢNH VỚI CON SỐ 3                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/04-rule-of-three.png"
          motion="drift-up"
          badgeText="3️⃣ PHẢI CHIA HẾT CHO 3"
          badgeColor="#00F0FF"
        >
          <TeslaHUD
            tag="ÁM ẢNH CON SỐ 3"
            accentColor="#00F0FF"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: TÍNH THỂ TÍCH THỨC ĂN                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/05-measuring-food-volume.png"
          motion="zoom-in"
          badgeText="🍲 SỢ TÓC & BỤI TRÊN ĐỒ ĂN"
          badgeColor="#10B981"
        >
          <TeslaHUD
            tag="TÍNH THỂ TÍCH THỨC ĂN"
            accentColor="#10B981"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: MỐI TÌNH VỚI CON BỒ CÂU TRẮNG                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/06-white-dove-love.png"
          motion="zoom-out"
          badgeText="🕊️ MỘT CON BỒ CÂU TRẮNG"
          badgeColor="#EC4899"
        >
          <TeslaHUD
            tag="TÌNH YÊU DUY NHẤT"
            accentColor="#EC4899"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: KHI CON BỒ CÂU QUA ĐỜI                            */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/07-lost-dove.png"
          motion="drift-left"
          badgeText="💔 MẤT ĐI 1 PHẦN BẢN THÂN"
          badgeColor="#8B5CF6"
        >
          <TeslaHUD
            tag="KHI BỒ CÂU QUA ĐỜI"
            accentColor="#8B5CF6"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: CUỘC CHIẾN DÒNG ĐIỆN                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/08-war-of-currents.png"
          motion="zoom-in"
          badgeText="⚡ ĐỐI ĐẦU THOMAS EDISON"
          badgeColor="#EF4444"
        >
          <TeslaHUD
            tag="CUỘC CHIẾN DÒNG ĐIỆN"
            accentColor="#EF4444"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: CHIẾN DỊCH HẠ BỆ TÀN NHẪN                         */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/09-electricity-fear-campaign.png"
          motion="drift-down"
          badgeText="🐘 GIẬT ĐIỆN CHẾT VOI"
          badgeColor="#F43F5E"
        >
          <TeslaHUD
            tag="CHIẾN DỊCH HẠ BỆ"
            accentColor="#F43F5E"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: MÀN ĐÁP TRẢ BẰNG CHÍNH CƠ THỂ                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/10-safe-electricity-stage.png"
          motion="zoom-in"
          badgeText="⚡ ĐIỆN CHẠY QUA CƠ THỂ"
          badgeColor="#00F0FF"
        >
          <TeslaHUD
            tag="MÀN ĐÁP TRẢ NGOẠN MỤC"
            accentColor="#00F0FF"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: NHỮNG NĂM THÁNG ẨN DẬT                            */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/11-eccentric-final-years.png"
          motion="zoom-out"
          badgeText="🛸 TIA HUỶ DIỆT & NGƯỜI NGOÀI HÀNH TINH"
          badgeColor="#F59E0B"
        >
          <TeslaHUD
            tag="NHỮNG NĂM THÁNG ẨN DẬT"
            accentColor="#F59E0B"
          />
        </TeslaScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: HUYỀN THOẠI NIKOLA TESLA                           */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <TeslaScene
          src="images/tesla-hidden-lives/12-lit-world-lonely-end.png"
          motion="zoom-in"
          badgeText="🌌 THAY ĐỔI CẢ THẾ GIỚI"
          badgeColor="#00F0FF"
        >
          <TeslaHUD
            tag="HUYỀN THOẠI NIKOLA TESLA"
            accentColor="#00F0FF"
          />
        </TeslaScene>
      </Sequence>

      {/* Top Animated Progress Bar */}
      <ProgressBar color="#00F0FF" height={8} />

      {/* Dynamic Word-by-Word Highlighted Subtitles */}
      <TeslaCaptions phrases={teslaSubtitles} bottom={290} />
    </AbsoluteFill>
  );
};
