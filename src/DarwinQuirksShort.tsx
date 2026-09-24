import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { DarwinScene } from "./components/DarwinScene";
import { DarwinHUD } from "./components/DarwinHUD";
import { DarwinCaptions } from "./components/DarwinCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { darwinSubtitles } from "./data/darwinSubtitles";

// Scene frame durations (30 FPS, total 2880 frames = 96.00s)
const SCENE_1_FRAMES = 323; // 0.00s - 10.77s: Thuyết tiến hóa & sở thích ăn tạp
const SCENE_2_FRAMES = 255; // 10.77s - 19.27s: Hội Ăn Tạp thời sinh viên Cambridge
const SCENE_3_FRAMES = 216; // 19.27s - 26.47s: Cú, chim ưng, cáo già trên bàn ăn
const SCENE_4_FRAMES = 139; // 26.47s - 31.10s: Hành trình tàu Beagle vòng quanh thế giới
const SCENE_5_FRAMES = 176; // 31.10s - 36.97s: Ăn thịt rùa khổng lồ Galapagos
const SCENE_6_FRAMES = 147; // 36.97s - 41.87s: Vừa nghiên cứu vừa dùng bữa với mẫu vật
const SCENE_7_FRAMES = 434; // 41.87s - 56.33s: 8 năm ròng rã nghiên cứu con hà biển
const SCENE_8_FRAMES = 372; // 56.33s - 68.73s: Sợ hãi tôn giáo, trì hoãn suốt 20 năm
const SCENE_9_FRAMES = 127; // 68.73s - 72.97s: Đối thủ Alfred Russel Wallace xuất hiện
const SCENE_10_FRAMES = 67; // 72.97s - 75.20s: Vội vã công bố thuyết trước khi bị nẫng tay trên
const SCENE_11_FRAMES = 335;// 75.20s - 86.37s: Danh sách ưu/nhược điểm cưới người em họ
const SCENE_12_FRAMES = 289;// 86.37s - 96.00s: Người đàn ông ăn rùa, trì hoãn 2 thập kỷ

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
  "images/darwin-quirks/01-evolutionary-theory.png",
  "images/darwin-quirks/02-gourmet-club.png",
  "images/darwin-quirks/03-exotic-menu.png",
  "images/darwin-quirks/04-beagle-voyage.png",
  "images/darwin-quirks/05-galapagos-tortoise-dish.png",
  "images/darwin-quirks/06-study-and-eat.png",
  "images/darwin-quirks/07-barnacle-years.png",
  "images/darwin-quirks/08-delayed-publication.png",
  "images/darwin-quirks/09-wallace-urgency.png",
  "images/darwin-quirks/10-rushed-publication.png",
  "images/darwin-quirks/11-marriage-pros-cons.png",
  "images/darwin-quirks/12-darwin-quirky-hero.png",
];

export const DarwinQuirksShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#040D09" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/darwin-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: THUYẾT TIẾN HÓA & SỞ THÍCH ĂN TẠP                   */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <DarwinScene
          src="images/darwin-quirks/01-evolutionary-theory.png"
          motion="zoom-in"
          badgeText="🧬 THUYẾT TIẾN HÓA"
          badgeColor="#10B981"
        >
          <DarwinHUD
            tag="THUYẾT TIẾN HÓA"
            accentColor="#10B981"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: HỘI ĂN TẠP CAMBRIDGE                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/02-gourmet-club.png"
          motion="zoom-out"
          badgeText="🍽️ HỘI ĂN TẠP CAMBRIDGE"
          badgeColor="#F59E0B"
        >
          <DarwinHUD
            tag="HỘI ĂN TẠP CAMBRIDGE"
            accentColor="#F59E0B"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: THỰC ĐƠN DỊ THƯỜNG                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/03-exotic-menu.png"
          motion="drift-up"
          badgeText="🦉 CÚ, CHIM ƯNG & CÁO GIÀ"
          badgeColor="#EF4444"
        >
          <DarwinHUD
            tag="THỰC ĐƠN DỊ THƯỜNG"
            accentColor="#EF4444"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: HÀNH TRÌNH TÀU BEAGLE                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/04-beagle-voyage.png"
          motion="drift-right"
          badgeText="⛵ TÀU BEAGLE VÒNG QUANH TG"
          badgeColor="#06B6D4"
        >
          <DarwinHUD
            tag="HÀNH TRÌNH TÀU BEAGLE"
            accentColor="#06B6D4"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: ĂN THỊT RÙA KHỔNG LỒ GALAPAGOS                    */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/05-galapagos-tortoise-dish.png"
          motion="zoom-in"
          badgeText="🐢 ĂN THỊT RÙA GALAPAGOS"
          badgeColor="#10B981"
        >
          <DarwinHUD
            tag="RÙA KHỔNG LỒ GALAPAGOS"
            accentColor="#10B981"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: VỪA NGHIÊN CỨU VỪA DÙNG BỮA                       */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/06-study-and-eat.png"
          motion="drift-left"
          badgeText="🥣 DÙNG BỮA VỚI MẪU VẬT"
          badgeColor="#F59E0B"
        >
          <DarwinHUD
            tag="NGHIÊN CỨU & DÙNG BỮA"
            accentColor="#F59E0B"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: 8 NĂM NGHIÊN CỨU HÀ BIỂN                          */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/07-barnacle-years.png"
          motion="zoom-out"
          badgeText="🔍 8 NĂM SOI HÀ BIỂN"
          badgeColor="#3B82F6"
        >
          <DarwinHUD
            tag="8 NĂM NGHIÊN CỨU HÀ BIỂN"
            accentColor="#3B82F6"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: SỢ HÃI, TRÌ HOÃN SUỐT 20 NĂM                      */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/08-delayed-publication.png"
          motion="drift-down"
          badgeText="⏳ SỢ HÃI GIẤU KÍN 20 NĂM"
          badgeColor="#F43F5E"
        >
          <DarwinHUD
            tag="TRÌ HOÃN SUỐT 20 NĂM"
            accentColor="#F43F5E"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: ĐỐI THỦ ALFRED RUSSEL WALLACE                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/09-wallace-urgency.png"
          motion="zoom-in"
          badgeText="⚡ ĐỐI THỦ WALLACE XUẤT HIỆN"
          badgeColor="#EC4899"
        >
          <DarwinHUD
            tag="ĐỐI THỦ WALLACE"
            accentColor="#EC4899"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: CÔNG BỐ GẤP RÚT VÌ SỢ NẪNG TAY TRÊN               */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/10-rushed-publication.png"
          motion="zoom-in"
          badgeText="💥 VỘI VÃ CÔNG BỐ TRƯỚC"
          badgeColor="#F59E0B"
        >
          <DarwinHUD
            tag="CÔNG BỐ GẤP RÚT"
            accentColor="#F59E0B"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: DANH SÁCH ƯU / NHƯỢC ĐIỂM CƯỚI VỢ                 */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/11-marriage-pros-cons.png"
          motion="drift-up"
          badgeText="⚖️ CÂN ĐO ĐONG ĐẾM CƯỚI"
          badgeColor="#8B5CF6"
        >
          <DarwinHUD
            tag="DANH SÁCH CƯỚI VỢ"
            accentColor="#8B5CF6"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: HUYỀN THOẠI KHOA HỌC DỊ BIỆT                      */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <DarwinScene
          src="images/darwin-quirks/12-darwin-quirky-hero.png"
          motion="zoom-out"
          badgeText="🏆 HUYỀN THOẠI TIẾN HÓA"
          badgeColor="#10B981"
        >
          <DarwinHUD
            tag="HUYỀN THOẠI TIẾN HÓA"
            accentColor="#10B981"
          />
        </DarwinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* KINETIC SUBTITLES (Centered at bottom 290px)                 */}
      {/* ============================================================ */}
      <DarwinCaptions phrases={darwinSubtitles} bottom={290} />

      {/* ============================================================ */}
      {/* MINIMAL PROGRESS BAR AT TOP OR BOTTOM                        */}
      {/* ============================================================ */}
      <ProgressBar color="#10B981" height={5} />
    </AbsoluteFill>
  );
};
