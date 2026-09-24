import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { GenghisScene } from "./components/GenghisScene";
import { GenghisHUD } from "./components/GenghisHUD";
import { GenghisCaptions } from "./components/GenghisCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { genghisSubtitles } from "./data/genghisSubtitles";

// Scene frame durations (30 FPS, total 3120 frames = 104.00s)
const SCENE_1_FRAMES = 208;  // 0.00s - 6.93s: Người sáng lập Đế quốc Mông Cổ
const SCENE_2_FRAMES = 150;  // 6.93s - 11.93s: Khởi đầu từ đáy xã hội, bị bỏ rơi
const SCENE_3_FRAMES = 241;  // 11.93s - 19.97s: Temüjin 9 tuổi, cha bị đầu độc
const SCENE_4_FRAMES = 178;  // 19.97s - 25.90s: Sống sót bằng rễ cây, quả dại
const SCENE_5_FRAMES = 508;  // 25.90s - 42.83s: Bắt giữ, vợ bị bắt cóc, năm 1206 Đại Hãn
const SCENE_6_FRAMES = 96;   // 42.83s - 46.03s: Kỵ binh cung nỏ bất bại
const SCENE_7_FRAMES = 145;  // 46.03s - 50.87s: Trọng dụng người tài, người chăn cừu
const SCENE_8_FRAMES = 134;  // 50.87s - 55.33s: Hệ thống trạm dịch hỏa tốc Yam
const SCENE_9_FRAMES = 123;  // 55.33s - 59.43s: Bộ luật Yassa & tự do tôn giáo
const SCENE_10_FRAMES = 100; // 59.43s - 62.77s: Mặt tối, các thành phố kháng cự
const SCENE_11_FRAMES = 231; // 62.77s - 70.47s: San phẳng thành trì, hàng triệu người
const SCENE_12_FRAMES = 167; // 70.47s - 76.03s: Qua đời năm 1227 ở Tây Hạ
const SCENE_13_FRAMES = 219; // 76.03s - 83.33s: Bí ẩn nơi an nghỉ giữa đất trời
const SCENE_14_FRAMES = 319; // 83.33s - 93.97s: Dòng gen Y ở 16 triệu đàn ông
const SCENE_15_FRAMES = 301; // 93.97s - 104.00s: Huyền thoại Thành Cát Tư Hãn

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
const SCENE_13_START = SCENE_12_START + SCENE_12_FRAMES;
const SCENE_14_START = SCENE_13_START + SCENE_13_FRAMES;
const SCENE_15_START = SCENE_14_START + SCENE_14_FRAMES;

const ALL_IMAGES = [
  "images/genghis-khan/01-genghis-khan-scene.png",
  "images/genghis-khan/02-genghis-khan-scene.png",
  "images/genghis-khan/03-genghis-khan-scene.png",
  "images/genghis-khan/04-genghis-khan-scene.png",
  "images/genghis-khan/05-genghis-khan-scene.png",
  "images/genghis-khan/06-genghis-khan-scene.png",
  "images/genghis-khan/07-genghis-khan-scene.png",
  "images/genghis-khan/08-genghis-khan-scene.png",
  "images/genghis-khan/09-genghis-khan-scene.png",
  "images/genghis-khan/10-genghis-khan-scene.png",
  "images/genghis-khan/11-genghis-khan-scene.png",
  "images/genghis-khan/12-genghis-khan-scene.png",
  "images/genghis-khan/13-genghis-khan-scene.png",
  "images/genghis-khan/14-genghis-khan-scene.png",
  "images/genghis-khan/15-genghis-khan-scene.png",
];

export const GenghisKhanShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0E17" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/genghis-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: ĐẾ CHẾ LỚN NHẤT LỊCH SỬ                            */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <GenghisScene
          src="images/genghis-khan/01-genghis-khan-scene.png"
          motion="zoom-in"
          badgeText="👑 ĐẾ CHẾ LỚN NHẤT LỊCH SỬ"
          badgeColor="#0284C7"
        >
          <GenghisHUD
            tag="ĐẾ QUỐC MÔNG CỔ"
            accentColor="#0284C7"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: KHỞI ĐẦU TỪ ĐÁY XÃ HỘI                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/02-genghis-khan-scene.png"
          motion="zoom-out"
          badgeText="🐺 KHỞI ĐẦU TỪ ĐÁY XÃ HỘI"
          badgeColor="#F59E0B"
        >
          <GenghisHUD
            tag="BỊ BỘ TỘC BỎ RƠI"
            accentColor="#F59E0B"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: CHA BỊ ĐẦU ĐỘC NĂM 9 TUỔI                          */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/03-genghis-khan-scene.png"
          motion="drift-down"
          badgeText="☠️ CHA BỊ ĐẦU ĐỘC TUỔI LÊN 9"
          badgeColor="#EF4444"
        >
          <GenghisHUD
            tag="TEMÜJIN NĂM 9 TUỔI"
            accentColor="#EF4444"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: SINH TỒN BẰNG RỄ CÂY                               */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/04-genghis-khan-scene.png"
          motion="drift-up"
          badgeText="🌿 SINH TỒN BẰNG RỄ CÂY"
          badgeColor="#10B981"
        >
          <GenghisHUD
            tag="SỐNG SÓT THẢO NGUYÊN"
            accentColor="#10B981"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: BẮT GIỮ, BÖRTE BỊ BẮT CÓC, NĂM 1206 ĐẠI HÃN        */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/05-genghis-khan-scene.png"
          motion="zoom-in"
          badgeText="👑 ĐẠI HÃN NĂM 1206"
          badgeColor="#F59E0B"
        >
          <GenghisHUD
            tag="THỐNG NHẤT MÔNG CỔ"
            accentColor="#F59E0B"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: KỴ BINH CUNG NỎ BẤT BẠI                            */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/07-genghis-khan-scene.png"
          motion="drift-left"
          badgeText="🏹 KỴ BINH CUNG NỎ BẤT BẠI"
          badgeColor="#38BDF8"
        >
          <GenghisHUD
            tag="QUÂN ĐỘI BẤT BẠI"
            accentColor="#38BDF8"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: TRỌNG DỤNG NGƯỜI TÀI (NGƯỜI CHĂN CỪU)             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/06-genghis-khan-scene.png"
          motion="zoom-out"
          badgeText="🐏 TRỌNG DỤNG NGƯỜI TÀI"
          badgeColor="#EAB308"
        >
          <GenghisHUD
            tag="KHÔNG THEO XUẤT THÂN"
            accentColor="#EAB308"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: TRẠM DỊCH HỎA TỐC YAM                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/08-genghis-khan-scene.png"
          motion="drift-right"
          badgeText="🐎 TRẠM DỊCH HỎA TỐC YAM"
          badgeColor="#0284C7"
        >
          <GenghisHUD
            tag="MẠNG LƯỚI TIN TỨC YAM"
            accentColor="#0284C7"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: BỘ LUẬT YASSA & TỰ DO TÔN GIÁO                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/09-genghis-khan-scene.png"
          motion="drift-up"
          badgeText="📜 BỘ LUẬT YASSA & TỰ DO TÔN GIÁO"
          badgeColor="#8B5CF6"
        >
          <GenghisHUD
            tag="BỘ LUẬT YASSA"
            accentColor="#8B5CF6"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: CÁC THÀNH PHỐ KHÁNG CỰ                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/10-genghis-khan-scene.png"
          motion="drift-right"
          badgeText="⚔️ CÁC THÀNH PHỐ KHÁNG CỰ"
          badgeColor="#F97316"
        >
          <GenghisHUD
            tag="MẶT TỐI KHỦNG KHIẾP"
            accentColor="#F97316"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: SAN PHẲNG THÀNH TRÌ                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/11-genghis-khan-scene.png"
          motion="zoom-in"
          badgeText="🔥 SAN PHẲNG THÀNH TRÌ"
          badgeColor="#DC2626"
        >
          <GenghisHUD
            tag="HÀNG TRIỆU NGƯỜI"
            accentColor="#DC2626"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: QUA ĐỜI NĂM 1227                                   */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/12-genghis-khan-scene.png"
          motion="drift-down"
          badgeText="⚔️ QUA ĐỜI NĂM 1227"
          badgeColor="#94A3B8"
        >
          <GenghisHUD
            tag="CHIẾN DỊCH TÂY HẠ"
            accentColor="#94A3B8"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 13: MỘ BÍ ẨN GIỮA ĐẤT TRỜI                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_13_START}
        durationInFrames={SCENE_13_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/13-genghis-khan-scene.png"
          motion="drift-left"
          badgeText="🏜️ MỘ BÍ ẨN GIỮA ĐẤT TRỜI"
          badgeColor="#D97706"
        >
          <GenghisHUD
            tag="BÍ ẨN NƠI AN NGHỈ"
            accentColor="#D97706"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 14: DẤU ẤN 16 TRIỆU HẬU DUỆ                            */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_14_START}
        durationInFrames={SCENE_14_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/14-genghis-khan-scene.png"
          motion="zoom-out"
          badgeText="🧬 DẤU ẤN 16 TRIỆU HẬU DUỆ"
          badgeColor="#10B981"
        >
          <GenghisHUD
            tag="DI TRUYỀN NĂM 2003"
            accentColor="#10B981"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 15: THÀNH CÁT TƯ HÃN HUYỀN THOẠI                       */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_15_START}
        durationInFrames={SCENE_15_FRAMES}
        premountFor={60}
      >
        <GenghisScene
          src="images/genghis-khan/15-genghis-khan-scene.png"
          motion="zoom-in"
          badgeText="👑 THÀNH CÁT TƯ HÃN HUYỀN THOẠI"
          badgeColor="#F59E0B"
        >
          <GenghisHUD
            tag="HUYỀN THOẠI MÔNG CỔ"
            accentColor="#F59E0B"
          />
        </GenghisScene>
      </Sequence>

      {/* ============================================================ */}
      {/* KINETIC SUBTITLES (Centered at bottom 290px)                 */}
      {/* ============================================================ */}
      <GenghisCaptions phrases={genghisSubtitles} bottom={290} />

      {/* ============================================================ */}
      {/* PROGRESS BAR                                                 */}
      {/* ============================================================ */}
      <ProgressBar color="#F59E0B" height={5} />
    </AbsoluteFill>
  );
};
