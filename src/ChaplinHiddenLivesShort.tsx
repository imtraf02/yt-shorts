import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { ChaplinScene } from "./components/ChaplinScene";
import { ChaplinHUD } from "./components/ChaplinHUD";
import { ChaplinCaptions } from "./components/ChaplinCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { chaplinSubtitles } from "./data/chaplinSubtitles";

// Scene frame durations (30 FPS, total 2000 frames = 66.67s)
const SCENE_1_FRAMES = 240; // 0.00s - 8.00s: Vua hài câm huyền thoại & đời thật không hài hước
const SCENE_2_FRAMES = 148; // 8.00s - 12.93s: Tuổi thơ nghèo đói ở London, mẹ vào trại tế bần
const SCENE_3_FRAMES = 88;  // 12.93s - 15.87s: Cậu bé Chaplin tự bươn chải trên đường phố
const SCENE_4_FRAMES = 128; // 15.87s - 20.13s: Giàu có bậc nhất Hollywood từng không có bữa ăn no
const SCENE_5_FRAMES = 194; // 20.13s - 26.60s: Bộ ria mép và chiếc gậy 'The Tramp' mặc vội
const SCENE_6_FRAMES = 143; // 26.60s - 31.37s: Ghép ngẫu nhiên và nhân vật biểu tượng ra đời
const SCENE_7_FRAMES = 158; // 31.37s - 36.63s: Kết hôn 4 lần, tranh cãi vì chênh lệch tuổi tác
const SCENE_8_FRAMES = 96;  // 36.63s - 39.83s: Cuộc hôn nhân cuối: ông 54 tuổi còn vợ mới 18
const SCENE_9_FRAMES = 105; // 39.83s - 43.33s: Trớ trêu thay, lại là cuộc hôn nhân hạnh phúc nhất
const SCENE_10_FRAMES = 113;// 43.33s - 47.10s: FBI theo dõi nhiều năm vì nghi ngờ cộng sản
const SCENE_11_FRAMES = 249;// 47.10s - 55.40s: 1952 thu hồi nhập cảnh, bị Hollywood đá văng
const SCENE_12_FRAMES = 338;// 55.40s - 66.67s: Người khiến cả thế giới cười sống đời không dễ dàng

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
  "images/chaplin-hidden-life/01-silent-comedy-legend.png",
  "images/chaplin-hidden-life/02-london-poverty.png",
  "images/chaplin-hidden-life/03-self-reliance.png",
  "images/chaplin-hidden-life/04-hollywood-wealth.png",
  "images/chaplin-hidden-life/05-tramp-costume.png",
  "images/chaplin-hidden-life/06-icon-born.png",
  "images/chaplin-hidden-life/07-four-marriages.png",
  "images/chaplin-hidden-life/08-final-marriage.png",
  "images/chaplin-hidden-life/09-happiest-marriage.png",
  "images/chaplin-hidden-life/10-under-surveillance.png",
  "images/chaplin-hidden-life/11-ocean-liner-exile.png",
  "images/chaplin-hidden-life/12-bittersweet-life.png",
];

export const ChaplinHiddenLivesShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0C0A09" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/chaplin-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: VUA HÀI CÂM HUYỀN THOẠI                            */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <ChaplinScene
          src="images/chaplin-hidden-life/01-silent-comedy-legend.png"
          motion="zoom-in"
          badgeText="🎩 VUA HÀI CÂM HUYỀN THOẠI"
          badgeColor="#F59E0B"
        >
          <ChaplinHUD
            tag="VUA HÀI CÂM"
            accentColor="#F59E0B"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: TUỔI THƠ NGHÈO ĐÓI CÙNG CỰC                        */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/02-london-poverty.png"
          motion="zoom-out"
          badgeText="🏚️ TRẠI TẾ BẦN LONDON"
          badgeColor="#EF4444"
        >
          <ChaplinHUD
            tag="NGHÈO ĐÓI CÙNG CỰC"
            accentColor="#EF4444"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: TỰ BƯƠN CHẢI ĐƯỜNG PHỐ                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/03-self-reliance.png"
          motion="drift-right"
          badgeText="🌧️ BƯƠN CHẢI TỪ RẤT NHỎ"
          badgeColor="#06B6D4"
        >
          <ChaplinHUD
            tag="BƯƠN CHẢI ĐƯỜNG PHỐ"
            accentColor="#06B6D4"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: GIÀU CÓ BẬC NHẤT HOLLYWOOD                         */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/04-hollywood-wealth.png"
          motion="zoom-in"
          badgeText="💰 GIÀU CÓ BẬC NHẤT HOLLYWOOD"
          badgeColor="#F59E0B"
        >
          <ChaplinHUD
            tag="ĐỈNH CAO HOLLYWOOD"
            accentColor="#F59E0B"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: TRANG PHỤC THE TRAMP MẶC VỘI                       */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/05-tramp-costume.png"
          motion="drift-up"
          badgeText="🪄 MẶC VỘI TRONG VÀI PHÚT"
          badgeColor="#8B5CF6"
        >
          <ChaplinHUD
            tag="TRANG PHỤC THE TRAMP"
            accentColor="#8B5CF6"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: NHÂN VẬT BIỂU TƯỢNG RA ĐỜI                         */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/06-icon-born.png"
          motion="zoom-out"
          badgeText="✨ BIỂU TƯỢNG BẤT TỬ RA ĐỜI"
          badgeColor="#F59E0B"
        >
          <ChaplinHUD
            tag="BIỂU TƯỢNG ĐIỆN ẢNH"
            accentColor="#F59E0B"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: KẾT HÔN 4 LẦN NHIỀU TRANH CÃI                      */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/07-four-marriages.png"
          motion="drift-left"
          badgeText="💍 4 LẦN KẾT HÔN TRANH CÃI"
          badgeColor="#F43F5E"
        >
          <ChaplinHUD
            tag="KẾT HÔN 4 LẦN"
            accentColor="#F43F5E"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: CUỘC HÔN NHÂN CUỐI: ÔNG 54, VỢ 18                  */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/08-final-marriage.png"
          motion="zoom-in"
          badgeText="⏳ ÔNG 54 TUỔI & VỢ MỚI 18"
          badgeColor="#EC4899"
        >
          <ChaplinHUD
            tag="CUỘC HÔN NHÂN CUỐI"
            accentColor="#EC4899"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: HẠNH PHÚC & BỀN LÂU NHẤT ĐỜI                       */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/09-happiest-marriage.png"
          motion="drift-right"
          badgeText="❤️ HẠNH PHÚC BỀN LÂU NHẤT"
          badgeColor="#10B981"
        >
          <ChaplinHUD
            tag="HẠNH PHÚC BỀN LÂU"
            accentColor="#10B981"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: FBI THEO DÕI VÌ NGHI NGỜ LIÊN HỆ CỘNG SẢN          */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/10-under-surveillance.png"
          motion="zoom-in"
          badgeText="🕵️ FBI THEO DÕI NHIỀU NĂM"
          badgeColor="#64748B"
        >
          <ChaplinHUD
            tag="FBI THEO DÕI"
            accentColor="#94A3B8"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: NĂM 1952 BỊ THU HỒI NHẬP CẢNH, ĐÁ VĂNG             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/11-ocean-liner-exile.png"
          motion="drift-down"
          badgeText="🚢 BỊ HOLLYWOOD ĐÁ VĂNG"
          badgeColor="#EF4444"
        >
          <ChaplinHUD
            tag="BỊ MỸ TRỤC XUẤT"
            accentColor="#EF4444"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: NGƯỜI KHIẾN CẢ THẾ GIỚI CƯỜI                       */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <ChaplinScene
          src="images/chaplin-hidden-life/12-bittersweet-life.png"
          motion="zoom-out"
          badgeText="🎭 KHIẾN CẢ THẾ GIỚI CƯỜI"
          badgeColor="#F59E0B"
        >
          <ChaplinHUD
            tag="HUYỀN THOẠI CHARLIE CHAPLIN"
            accentColor="#F59E0B"
          />
        </ChaplinScene>
      </Sequence>

      {/* ============================================================ */}
      {/* KINETIC SUBTITLES (Centered at bottom 290px)                 */}
      {/* ============================================================ */}
      <ChaplinCaptions phrases={chaplinSubtitles} bottom={290} />

      {/* ============================================================ */}
      {/* PROGRESS BAR                                                 */}
      {/* ============================================================ */}
      <ProgressBar color="#F59E0B" height={5} />
    </AbsoluteFill>
  );
};
