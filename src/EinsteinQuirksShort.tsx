import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { EinsteinScene } from "./components/EinsteinScene";
import { EinsteinHUD } from "./components/EinsteinHUD";
import { EinsteinCaptions } from "./components/EinsteinCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { einsteinSubtitles } from "./data/einsteinSubtitles";

// Scene frame durations (30 FPS, total 2910 frames = 97.00s)
const SCENE_1_FRAMES = 296; // 0.00s - 9.87s: Albert Einstein phát minh thuyết tương đối...
const SCENE_2_FRAMES = 352; // 9.87s - 21.60s: Bộ não vĩ đại nhưng quên địa chỉ nhà...
const SCENE_3_FRAMES = 154; // 21.60s - 26.73s: Tính ra E=mc² nhưng không nhớ nổi số nhà
const SCENE_4_FRAMES = 209; // 26.73s - 33.70s: Nổi tiếng ghét đi tất...
const SCENE_5_FRAMES = 258; // 33.70s - 42.30s: Ghét ngón chân chọc thủng lỗ tất, cắt tận gốc
const SCENE_6_FRAMES = 187; // 42.30s - 48.53s: Mái tóc bạc dựng đứng, không bao giờ chải tóc
const SCENE_7_FRAMES = 327; // 48.53s - 59.43s: Lãng phí thời gian, tóc rối đổi lấy vật lý
const SCENE_8_FRAMES = 218; // 59.43s - 66.70s: Lời mời làm Tổng thống Israel năm 1952
const SCENE_9_FRAMES = 201; // 66.70s - 73.40s: Từ chối thẳng thừng, thích phương trình hơn chính trị
const SCENE_10_FRAMES = 130;// 73.40s - 77.73s: Sự thật gây sốc: thi trượt đại học lần đầu
const SCENE_11_FRAMES = 305;// 77.73s - 87.90s: Xuất sắc toán/lý nhưng trượt các môn còn lại
const SCENE_12_FRAMES = 273;// 87.90s - 97.00s: Thiên tài lộn xộn nhất lịch sử khoa học

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
  "images/einstein-quirks/01-changing-the-universe.png",
  "images/einstein-quirks/02-forgot-home-address.png",
  "images/einstein-quirks/03-genius-forgets-house-number.png",
  "images/einstein-quirks/04-no-socks.png",
  "images/einstein-quirks/05-sock-hole-solution.png",
  "images/einstein-quirks/06-legendary-messy-hair.png",
  "images/einstein-quirks/07-physics-over-grooming.png",
  "images/einstein-quirks/08-presidential-invitation.png",
  "images/einstein-quirks/09-equations-over-politics.png",
  "images/einstein-quirks/10-first-exam-setback.png",
  "images/einstein-quirks/11-strengths-and-blindspots.png",
  "images/einstein-quirks/12-messy-science-genius.png",
];

export const EinsteinQuirksShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#06050E" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/einstein-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: THUYẾT TƯƠNG ĐỐI & QUÊN CHÌA KHÓA                  */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <EinsteinScene
          src="images/einstein-quirks/01-changing-the-universe.png"
          motion="zoom-in"
          badgeText="🌌 THAY ĐỔI VŨ TRỤ"
          badgeColor="#A855F7"
        >
          <EinsteinHUD
            tag="THUYẾT TƯƠNG ĐỐI"
            accentColor="#A855F7"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: BỘ NÃO VĨ ĐẠI QUÊN ĐỊA CHỈ NHÀ                    */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/02-forgot-home-address.png"
          motion="zoom-out"
          badgeText="📞 GỌI VĂN PHÒNG HỎI NHÀ"
          badgeColor="#F59E0B"
        >
          <EinsteinHUD
            tag="QUÊN ĐỊA CHỈ NHÀ"
            accentColor="#F59E0B"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: TÍNH RA E=MC² NHƯNG QUÊN SỐ NHÀ                   */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/03-genius-forgets-house-number.png"
          motion="drift-up"
          badgeText="🔢 KHÔNG NHỚ NỔI SỐ NHÀ"
          badgeColor="#06B6D4"
        >
          <EinsteinHUD
            tag="E=MC² NHƯNG QUÊN SỐ NHÀ"
            accentColor="#06B6D4"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: NỔI TIẾNG GHÉT ĐI TẤT                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/04-no-socks.png"
          motion="zoom-in"
          badgeText="🧦 TỪ CHỐI MANG TẤT CẢ ĐỜI"
          badgeColor="#F43F5E"
        >
          <EinsteinHUD
            tag="NỔI TIẾNG GHÉT ĐI TẤT"
            accentColor="#F43F5E"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: LÝ DO CẮT BỎ VẤN ĐỀ TẬN GỐC                        */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/05-sock-hole-solution.png"
          motion="drift-right"
          badgeText="✂️ KHÔNG MANG LÀ XONG"
          badgeColor="#FBBF24"
        >
          <EinsteinHUD
            tag="LÝ DO CẮT TẬN GỐC"
            accentColor="#FBBF24"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: MÁI TÓC BẠC DỰNG ĐỨNG HUYỀN THOẠI                 */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/06-legendary-messy-hair.png"
          motion="zoom-out"
          badgeText="⚡ KHÔNG BAO GIỜ CHẢI TÓC"
          badgeColor="#C084FC"
        >
          <EinsteinHUD
            tag="MÁI TÓC HUYỀN THOẠI"
            accentColor="#C084FC"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: TÓC RỐI LÀ CÁI GIÁ DÀNH CHO VẬT LÝ                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/07-physics-over-grooming.png"
          motion="drift-left"
          badgeText="🌌 SUY NGHĨ VỀ VŨ TRỤ"
          badgeColor="#10B981"
        >
          <EinsteinHUD
            tag="THỜI GIAN CHO VẬT LÝ"
            accentColor="#10B981"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: LỜI MỜI LÀM TỔNG THỐNG ISRAEL 1952                 */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/08-presidential-invitation.png"
          motion="zoom-in"
          badgeText="🏛️ TỔNG THỐNG ISRAEL 1952"
          badgeColor="#38BDF8"
        >
          <EinsteinHUD
            tag="LỜI MỜI LÀM TỔNG THỐNG"
            accentColor="#38BDF8"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: THÍCH PHƯƠNG TRÌNH HƠN CHÍNH TRỊ                   */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/09-equations-over-politics.png"
          motion="drift-up"
          badgeText="📐 THÍCH TOÁN HƠN CHÍNH TRỊ"
          badgeColor="#EC4899"
        >
          <EinsteinHUD
            tag="TỪ CHỐI THẲNG THỪNG"
            accentColor="#EC4899"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: SỰ THẬT GÂY SỐC: THI TRƯỢT ĐẠI HỌC                 */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/10-first-exam-setback.png"
          motion="zoom-out"
          badgeText="❌ THI TRƯỢT ĐẠI HỌC LẦN ĐẦU"
          badgeColor="#EF4444"
        >
          <EinsteinHUD
            tag="SỰ THẬT GÂY SỐC"
            accentColor="#EF4444"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: ĐỊNH NGHĨA LẠI VŨ TRỤ TỪNG BỊ ĐÁNH GỤC             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/11-strengths-and-blindspots.png"
          motion="drift-down"
          badgeText="📖 ĐỊNH NGHĨA LẠI VŨ TRỤ"
          badgeColor="#F59E0B"
        >
          <EinsteinHUD
            tag="XUẤT SẮC TOÁN VÀ LÝ"
            accentColor="#F59E0B"
          />
        </EinsteinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: THIÊN TÀI LỘN XỘN NHẤT LỊCH SỬ KHOA HỌC            */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <EinsteinScene
          src="images/einstein-quirks/12-messy-science-genius.png"
          motion="zoom-in"
          badgeText="🌌 THIÊN TÀI LỘN XỘN NHẤT"
          badgeColor="#A855F7"
        >
          <EinsteinHUD
            tag="ALBERT EINSTEIN"
            accentColor="#A855F7"
          />
        </EinsteinScene>
      </Sequence>

      {/* Top Animated Progress Bar */}
      <ProgressBar color="#A855F7" height={8} />

      {/* Dynamic Word-by-Word Highlighted Subtitles */}
      <EinsteinCaptions phrases={einsteinSubtitles} bottom={290} />
    </AbsoluteFill>
  );
};
