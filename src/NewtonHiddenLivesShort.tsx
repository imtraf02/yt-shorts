import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { NewtonScene } from "./components/NewtonScene";
import { NewtonHUD } from "./components/NewtonHUD";
import { NewtonCaptions } from "./components/NewtonCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { newtonSubtitles } from "./data/newtonSubtitles";

// Scene frame durations (30 FPS, total 2940 frames = 98.00s)
const SCENE_1_FRAMES = 261; // 0.00s - 8.70s: Isaac Newton ngồi dưới gốc táo...
const SCENE_2_FRAMES = 182; // 8.70s - 14.78s: Sự thật là Newton chỉ nhìn thấy táo rơi từ xa...
const SCENE_3_FRAMES = 292; // 14.78s - 24.50s: Ơ sao táo lại rơi xuống mà không bay ngang?
const SCENE_4_FRAMES = 385; // 24.50s - 37.34s: Tự chọc một cây kim vào mắt mình...
const SCENE_5_FRAMES = 67;  // 37.34s - 39.58s: Không ai bảo ông làm cả, ông tự nguyện.
const SCENE_6_FRAMES = 266; // 39.58s - 48.43s: Đam mê giả kim thuật, biến chì thành vàng
const SCENE_7_FRAMES = 67;  // 48.43s - 50.66s: Viết hàng ngàn trang ghi chú bí mật về nó
const SCENE_8_FRAMES = 190; // 50.66s - 57.01s: Sau khi chết mới phát hiện là nhà giả kim
const SCENE_9_FRAMES = 186; // 57.01s - 63.22s: Giám đốc Sở Đúc tiền Hoàng gia Anh -> thợ săn tiền giả
const SCENE_10_FRAMES = 300;// 63.22s - 73.20s: Cải trang điều tra, bắt tận tay, lên giá treo cổ
const SCENE_11_FRAMES = 412;// 73.20s - 86.94s: Chưa từng có bạn gái, mối tình với toán học
const SCENE_12_FRAMES = 332;// 86.94s - 98.00s: Tất cả trong cùng một cuộc đời

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
  "images/newton-hidden-lives/01-apple-myth.png",
  "images/newton-hidden-lives/02-watching-apple-fall.png",
  "images/newton-hidden-lives/03-silly-question-law.png",
  "images/newton-hidden-lives/04-optics-experiment.png",
  "images/newton-hidden-lives/05-nobody-asked.png",
  "images/newton-hidden-lives/06-alchemy-obsession.png",
  "images/newton-hidden-lives/07-secret-notebooks.png",
  "images/newton-hidden-lives/08-alchemy-discovered.png",
  "images/newton-hidden-lives/09-counterfeit-detective.png",
  "images/newton-hidden-lives/10-counterfeiter-caught.png",
  "images/newton-hidden-lives/11-love-of-math.png",
  "images/newton-hidden-lives/12-newton-many-roles.png",
];

export const NewtonHiddenLivesShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0C0804" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/newton-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: HUYỀN THOẠI QUẢ TÁO RƠI TRÚNG ĐẦU                 */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <NewtonScene
          src="images/newton-hidden-lives/01-apple-myth.png"
          motion="zoom-in"
          badgeText="🍎 TÁO RƠI TRÚNG ĐẦU?"
          badgeColor="#F59E0B"
        >
          <NewtonHUD
            tag="HUYỀN THOẠI QUẢ TÁO"
            accentColor="#F59E0B"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: SỰ THẬT TỪ KHOẢNG XA                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/02-watching-apple-fall.png"
          motion="zoom-out"
          badgeText="👀 SỰ THẬT TỪ KHOẢNG XA"
          badgeColor="#38BDF8"
        >
          <NewtonHUD
            tag="SỰ THẬT QUẢ TÁO"
            accentColor="#38BDF8"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: CÂU HỎI TƯỞNG NGỚ NGẨN                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/03-silly-question-law.png"
          motion="drift-up"
          badgeText="❓ CÂU HỎI TƯỞNG NGỚ NGẨN"
          badgeColor="#FBBF24"
        >
          <NewtonHUD
            tag="CÂU HỎI THIÊN TÀI"
            accentColor="#FBBF24"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: TỰ CHỌC KIM VÀO MẮT                               */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/04-optics-experiment.png"
          motion="zoom-in"
          badgeText="🪡 TỰ CHỌC KIM VÀO MẮT"
          badgeColor="#EF4444"
        >
          <NewtonHUD
            tag="TỰ CHỌC KIM VÀO MẮT"
            accentColor="#EF4444"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: HOÀN TOÀN TỰ NGUYỆN                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/05-nobody-asked.png"
          motion="drift-right"
          badgeText="🤷 HOÀN TOÀN TỰ NGUYỆN"
          badgeColor="#A855F7"
        >
          <NewtonHUD
            tag="RẢNH KIỂU BÁC HỌC"
            accentColor="#A855F7"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: ĐAM MÊ GIẢ KIM THUẬT                              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/06-alchemy-obsession.png"
          motion="zoom-in"
          badgeText="⚗️ ĐAM MÊ GIẢ KIM THUẬT"
          badgeColor="#F59E0B"
        >
          <NewtonHUD
            tag="ĐAM MÊ GIẢ KIM THUẬT"
            accentColor="#F59E0B"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: HÀNG NGÀN TRANG GHI CHÚ BÍ MẬT                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/07-secret-notebooks.png"
          motion="drift-left"
          badgeText="📜 HÀNG NGÀN TRANG BÍ MẬT"
          badgeColor="#D97706"
        >
          <NewtonHUD
            tag="HÀNG NGÀN TRANG GHI CHÚ"
            accentColor="#D97706"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: NHÀ GIẢ KIM ẨN DANH                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/08-alchemy-discovered.png"
          motion="zoom-out"
          badgeText="🧙‍♂️ NHÀ GIẢ KIM ẨN DANH"
          badgeColor="#10B981"
        >
          <NewtonHUD
            tag="NHÀ GIẢ KIM ẨN DANH"
            accentColor="#10B981"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: THỢ SĂN TIỀN GIẢ                                  */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/09-counterfeit-detective.png"
          motion="zoom-in"
          badgeText="🕵️ THỢ SĂN TIỀN GIẢ"
          badgeColor="#38BDF8"
        >
          <NewtonHUD
            tag="SỞ ĐÚC TIỀN HOÀNG GIA"
            accentColor="#38BDF8"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: BẮT TẬN TAY TỘI PHẠM                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/10-counterfeiter-caught.png"
          motion="drift-down"
          badgeText="⚖️ BẮT TẬN TAY TỘI PHẠM"
          badgeColor="#EF4444"
        >
          <NewtonHUD
            tag="THỢ SĂN TIỀN GIẢ"
            accentColor="#EF4444"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: MỐI TÌNH DUY NHẤT VỚI TOÁN HỌC                    */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/11-love-of-math.png"
          motion="zoom-out"
          badgeText="📐 MỐI TÌNH DUY NHẤT: TOÁN HỌC"
          badgeColor="#EC4899"
        >
          <NewtonHUD
            tag="ĐỘC THÂN TRỌN ĐỜI"
            accentColor="#EC4899"
          />
        </NewtonScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: TẤT CẢ TRONG CÙNG MỘT CUỘC ĐỜI                    */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <NewtonScene
          src="images/newton-hidden-lives/12-newton-many-roles.png"
          motion="zoom-in"
          badgeText="🌌 TẤT CẢ TRONG 1 CUỘC ĐỜI"
          badgeColor="#F59E0B"
        >
          <NewtonHUD
            tag="TẤT CẢ TRONG 1 CUỘC ĐỜI"
            accentColor="#F59E0B"
          />
        </NewtonScene>
      </Sequence>

      {/* Top Animated Progress Bar */}
      <ProgressBar color="#F59E0B" height={8} />

      {/* Dynamic Word-by-Word Highlighted Subtitles */}
      <NewtonCaptions phrases={newtonSubtitles} bottom={290} />
    </AbsoluteFill>
  );
};
