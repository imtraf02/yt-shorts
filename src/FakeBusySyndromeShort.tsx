import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { PsychScene } from "./components/PsychScene";
import { PsychCaseHUD } from "./components/PsychCaseHUD";
import { PsychCaptions } from "./components/PsychCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { fakeBusySubtitles } from "./data/fakeBusySubtitles";

// Scene frame durations (30 FPS, total 2235 frames = 74.50s)
const SCENE_1_FRAMES = 162; // 0.00s - 5.40s: Dọn bàn sạch bong, xếp email, trả lời 20 tin nhắn
const SCENE_2_FRAMES = 120; // 5.40s - 9.40s: Báo cáo quan trọng treo lơ lửng 3 ngày
const SCENE_3_FRAMES = 84;  // 9.40s - 12.20s: Chúc mừng, mắc hội chứng giả vờ bận rộn
const SCENE_4_FRAMES = 189; // 12.20s - 18.50s: Não phân biệt bận vs hiệu quả nhưng cố tình lờ đi
const SCENE_5_FRAMES = 339; // 18.50s - 29.80s: Cảm giác việc nhỏ sướng hơn, tiết chút dopamine
const SCENE_6_FRAMES = 144; // 29.80s - 34.60s: Báo cáo vẫn y nguyên, deadline xích lại gần hơn
const SCENE_7_FRAMES = 276; // 34.60s - 43.80s: Càng nhiều việc nhỏ càng có lý do "hôm nay bận lắm"
const SCENE_8_FRAMES = 141; // 43.80s - 48.50s: Vỏ bọc hoàn hảo, nhìn từ ngoài giống hệt bận thật
const SCENE_9_FRAMES = 216; // 48.50s - 55.70s: Hoãn vô thời hạn chẳng ai chết, xếp file lần thứ 5
const SCENE_10_FRAMES = 120;// 55.70s - 59.70s: Trốn việc mặc áo giáp công việc
const SCENE_11_FRAMES = 333;// 59.70s - 70.80s: Tự hỏi 1 câu duy nhất, đóng hết tab quay lại việc lớn
const SCENE_12_FRAMES = 111;// 70.80s - 74.50s: Bận rộn không phải thành tích, làm đúng mới là thành tích

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
  "images/fake-busy-syndrome/01-tidy-desk-procrastination.png",
  "images/fake-busy-syndrome/02-important-task-untouched.png",
  "images/fake-busy-syndrome/03-fake-busy-diagnosis.png",
  "images/fake-busy-syndrome/04-busy-vs-effective.png",
  "images/fake-busy-syndrome/05-small-task-dopamine.png",
  "images/fake-busy-syndrome/06-deadline-creeping-closer.png",
  "images/fake-busy-syndrome/07-busywork-armor.png",
  "images/fake-busy-syndrome/08-real-vs-fake-busy.png",
  "images/fake-busy-syndrome/09-repeat-small-tasks.png",
  "images/fake-busy-syndrome/10-hide-behind-busywork.png",
  "images/fake-busy-syndrome/11-close-tabs-refocus.png",
  "images/fake-busy-syndrome/12-important-work-achievement.png",
];

export const FakeBusySyndromeShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#060911" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/fake-busy-syndrome.wav")} volume={1} />

      {/* Preload images so rendering is butter smooth */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 01: DỌN BÀN SẠCH BONG, XẾP EMAIL                       */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <PsychScene
          src="images/fake-busy-syndrome/01-tidy-desk-procrastination.png"
          motion="zoom-in"
          badgeText="✨ BÀN SẠCH BONG // EMAIL THEO MÀU"
          badgeColor="#38bdf8"
        >
          <PsychCaseHUD
            caseNumber="CASE #03"
            category="TÂM LÝ HỌC NĂNG SUẤT"
            tag="CẠM BẪY ĐẦU NGÀY"
            title="DỌN BÀN & TRẢ LỜI 20 TIN NHẮN"
            accentColor="#38bdf8"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 02: BÁO CÁO QUAN TRỌNG TREO LƠ LỬNG                    */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/02-important-task-untouched.png"
          motion="zoom-out"
          badgeText="⚠️ TREO LƠ LỬNG 3 NGÀY"
          badgeColor="#fbbf24"
        >
          <PsychCaseHUD
            caseNumber="CASE #03"
            category="VIỆC LỚN ĐÁNG SỢ"
            tag="TRÌ HOÃN BÁO CÁO"
            title="BÁO CÁO QUAN TRỌNG CHƯA ĐỘNG"
            accentColor="#fbbf24"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 03: CHẨN ĐOÁN: HỘI CHỨNG GIẢ VỜ BẬN RỘN                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/03-fake-busy-diagnosis.png"
          motion="zoom-in"
          badgeText="🏷️ CHẨN ĐOÁN TÂM LÝ"
          badgeColor="#f43f5e"
        >
          <PsychCaseHUD
            caseNumber="DIAGNOSIS"
            category="BẪY TỰ ĐÁNH LỪA"
            tag="CHÚC MỪNG BẠN"
            title="HỘI CHỨNG GIẢ VỜ BẬN RỘN"
            accentColor="#f43f5e"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 04: BẬN RỘN VS HIỆU QUẢ                                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/04-busy-vs-effective.png"
          motion="drift-up"
          badgeText="⚖️ BẬN RỘN ≠ HIỆU QUẢ"
          badgeColor="#a855f7"
        >
          <PsychCaseHUD
            caseNumber="MECHANISM"
            category="CƠ CHẾ NÃO BỘ"
            tag="CỐ TÌNH LỜ ĐI"
            title="NÃO PHÂN BIỆT ĐƯỢC NHƯNG LỜ ĐI"
            accentColor="#a855f7"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 05: 1 CHÚT DOPAMINE TỪ VIỆC NHỎ                        */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/05-small-task-dopamine.png"
          motion="zoom-in"
          badgeText="🧠 1 CHÚT DOPAMINE ẢO"
          badgeColor="#10b981"
        >
          <PsychCaseHUD
            caseNumber="REWARD TRAP"
            category="ẢO GIÁC HOÀN THÀNH"
            tag="VIỆC NHỎ SƯỚNG HƠN"
            title="TIẾT DOPAMINE NHƯ ĐÃ XONG VIỆC"
            accentColor="#10b981"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 06: BÁO CÁO Y NGUYÊN, DEADLINE XÍCH LẠI                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/06-deadline-creeping-closer.png"
          motion="drift-down"
          badgeText="⏳ DEADLINE ĐANG ÁP SÁT"
          badgeColor="#ef4444"
        >
          <PsychCaseHUD
            caseNumber="REALITY CHECK"
            category="SỰ THẬT TÀN NHẪN"
            tag="BÁO CÁO NẰM Y NGUYÊN"
            title="DEADLINE ĐANG XÍCH LẠI TỪNG PHÚT"
            accentColor="#ef4444"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 07: LÝ DO CHÍNH ĐÁNG "HÔM NAY MÌNH BẬN LẮM"           */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/07-busywork-armor.png"
          motion="zoom-out"
          badgeText="🛡️ LÝ DO CHÍNH ĐÁNG"
          badgeColor="#f59e0b"
        >
          <PsychCaseHUD
            caseNumber="EXCUSE ENGINE"
            category="LÝ DO HOÀN HẢO"
            tag="HÔM NAY BẬN LẮM"
            title="KHÔNG AI CHẤT VẤN ĐƯỢC BẠN"
            accentColor="#f59e0b"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 08: VỎ BỌC HOÀN HẢO                                   */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/08-real-vs-fake-busy.png"
          motion="zoom-in"
          badgeText="🎭 GIỐNG HỆT BẬN THẬT"
          badgeColor="#6366f1"
        >
          <PsychCaseHUD
            caseNumber="PERFECT CAMOUFLAGE"
            category="VỎ BỌC NGOẠI HÌNH"
            tag="BẬN RỘN GIẢ VỜ"
            title="NHÌN TỪ NGOÀI GIỐNG HỆT BẬN THẬT"
            accentColor="#6366f1"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 09: HOÃN VÔ THỜI HẠN & SẮP XẾP FILE LẦN 5              */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/09-repeat-small-tasks.png"
          motion="drift-right"
          badgeText="📁 SẮP XẾP FILE LẦN THỨ 5"
          badgeColor="#06b6d4"
        >
          <PsychCaseHUD
            caseNumber="IDENTIFICATION"
            category="DẤU HIỆU NHẬN BIẾT"
            tag="CHẲNG AI CHẾT VÌ NÓ"
            title="VIỆC HOÃN ĐƯỢC VÔ THỜI HẠN"
            accentColor="#06b6d4"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: TRỐN VIỆC MẶC ÁO GIÁP CÔNG VIỆC                   */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/10-hide-behind-busywork.png"
          motion="zoom-in"
          badgeText="🥷 TRỐN VIỆC MẶC ÁO GIÁP"
          badgeColor="#ec4899"
        >
          <PsychCaseHUD
            caseNumber="METAPHOR"
            category="BẢN CHẤT THẬT"
            tag="KHÔNG PHẢI CÔNG VIỆC"
            title="TRỐN VIỆC MẶC ÁO GIÁP CÔNG VIỆC"
            accentColor="#ec4899"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 11: ĐÓNG HẾT TAB, QUAY LẠI VIỆC LỚN                   */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/11-close-tabs-refocus.png"
          motion="zoom-out"
          badgeText="🛑 ĐÓNG HẾT TAB // RESET"
          badgeColor="#10b981"
        >
          <PsychCaseHUD
            caseNumber="EXIT STRATEGY"
            category="CÁCH THOÁT KHỎI BẪY"
            tag="1 CÂU HỎI DUY NHẤT"
            title="ĐÓNG HẾT TAB & ĐỐI MẶT VIỆC LỚN"
            accentColor="#10b981"
          />
        </PsychScene>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 12: LÀM ĐÚNG VIỆC QUAN TRỌNG MỚI LÀ THÀNH TÍCH        */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_12_START}
        durationInFrames={SCENE_12_FRAMES}
        premountFor={60}
      >
        <PsychScene
          src="images/fake-busy-syndrome/12-important-work-achievement.png"
          motion="zoom-in"
          badgeText="🏆 THÀNH TÍCH THẬT SỰ"
          badgeColor="#fbbf24"
        >
          <PsychCaseHUD
            caseNumber="FINAL TAKEAWAY"
            category="THÔNG ĐIỆP CỐT LÕI"
            tag="ĐÚNG VIỆC QUAN TRỌNG"
            title="LÀM ĐÚNG VIỆC MỚI LÀ THÀNH TÍCH"
            accentColor="#fbbf24"
          />
        </PsychScene>
      </Sequence>

      {/* Dynamic Kinetic Floating Subtitles */}
      <PsychCaptions phrases={fakeBusySubtitles} bottom={300} />

      {/* Top Video Progress Bar */}
      <ProgressBar
        color="#38bdf8"
        backgroundColor="rgba(255, 255, 255, 0.16)"
        height={9}
      />
    </AbsoluteFill>
  );
};
