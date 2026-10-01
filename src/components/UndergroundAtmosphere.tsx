import React from "react";
import {
  DriftingFog,
  FallingLeaves,
  GoldenDust,
  Fireflies,
  SunRays,
} from "./effects";

interface UndergroundAtmosphereProps {
  chapterId: string;
  startFrame?: number;
}

/**
 * Hiệu ứng không khí và hạt vi mô tự nhiên cho từng chương của phim tài liệu
 * 'Cuộc Sống Bí Mật Dưới Lòng Đất: Mạng Lưới Nấm'.
 * 
 * Lựa chọn 1-2 lớp hiệu ứng phù hợp bối cảnh sinh thái học:
 * - Rừng nguyên sinh & tán cây: Lá rơi (FallingLeaves), sương mờ (DriftingFog), tia nắng (SunRays)
 * - Lòng đất sâu & mạng sợi nấm: Bụi bào tử phát sáng (GoldenDust), năng lượng trao đổi chất (Fireflies)
 * - Mảng tối cạnh tranh độc tố: Sương u tối (DriftingFog), đốm sáng u linh (Fireflies)
 * 
 * Giữ zIndex thấp hơn HUD, phụ đề, nhân vật Trà Xanh và disclaimer.
 * Thiết lập safeBottom=180 để bảo vệ vùng phụ đề và nhân vật luôn rõ nét.
 */
export const UndergroundAtmosphere: React.FC<UndergroundAtmosphereProps> = ({
  chapterId,
  startFrame = 0,
}) => {
  const timeOffsetSeconds = startFrame / 30;

  switch (chapterId) {
    // 1. Mở đầu: Mạng lưới dưới chân bạn (Rừng nguyên sinh sớm mai, lá rơi & sương mờ)
    case "part1":
      return (
        <>
          <DriftingFog
            density={0.35}
            opacity={0.22}
            speed={0.4}
            safeBottom={180}
            zIndex={3}
            seed="underground-fog-part1"
            timeOffsetSeconds={timeOffsetSeconds}
          />
          <FallingLeaves
            density={0.4}
            opacity={0.32}
            wind={14}
            size={0.85}
            safeBottom={180}
            zIndex={4}
            seed="underground-leaves-part1"
            timeOffsetSeconds={timeOffsetSeconds}
          />
        </>
      );

    // 2. Phần 1: Cây nấm chỉ là phần nổi (Thế giới ngầm, sợi tơ nấm & bụi bào tử phát sáng ngọc lục bảo)
    case "part2":
      return (
        <>
          <GoldenDust
            density={0.5}
            opacity={0.4}
            speed={0.5}
            size={0.9}
            colors={["#34D399", "#A7F3D0", "#FDE68A", "#6EE7B7"]}
            safeBottom={180}
            zIndex={4}
            seed="underground-spores-part2"
            timeOffsetSeconds={timeOffsetSeconds}
          />
          <DriftingFog
            density={0.25}
            opacity={0.16}
            speed={0.3}
            safeBottom={180}
            zIndex={3}
            seed="underground-mist-part2"
            timeOffsetSeconds={timeOffsetSeconds}
          />
        </>
      );

    // 3. Phần 2: Một cuộc trao đổi dưới lòng đất (Đốm sáng sinh học trao đổi đường glucose & khoáng chất)
    case "part3":
      return (
        <>
          <Fireflies
            density={0.35}
            opacity={0.38}
            speed={0.55}
            size={0.8}
            colors={["#10B981", "#34D399", "#FBBF24"]}
            safeBottom={180}
            zIndex={4}
            seed="underground-energy-part3"
            timeOffsetSeconds={timeOffsetSeconds}
          />
          <GoldenDust
            density={0.35}
            opacity={0.3}
            speed={0.4}
            colors={["#FEF3C7", "#D1FAE5"]}
            safeBottom={180}
            zIndex={3}
            seed="underground-nutrients-part3"
            timeOffsetSeconds={timeOffsetSeconds}
          />
        </>
      );

    // 4. Phần 3: Khi mạng lưới nối liền cả khu rừng (Wood Wide Web, nắng xuyên tán lá rừng già)
    case "part4":
      return (
        <>
          <SunRays
            density={0.45}
            opacity={0.22}
            speed={0.4}
            safeBottom={180}
            zIndex={3}
            seed="underground-rays-part4"
            timeOffsetSeconds={timeOffsetSeconds}
          />
          <FallingLeaves
            density={0.32}
            opacity={0.28}
            wind={12}
            size={0.8}
            safeBottom={180}
            zIndex={4}
            seed="underground-leaves-part4"
            timeOffsetSeconds={timeOffsetSeconds}
          />
        </>
      );

    // 5. Phần 4: Mạng lưới cũng có thể mang tin xấu (Sương mù u tối, chất độc và lan ma ký sinh)
    case "part5":
      return (
        <>
          <DriftingFog
            density={0.5}
            opacity={0.28}
            speed={0.4}
            colors={["#1E293B", "#334155", "#0F172A"]}
            safeBottom={180}
            zIndex={3}
            seed="underground-darkfog-part5"
            timeOffsetSeconds={timeOffsetSeconds}
          />
          <Fireflies
            density={0.25}
            opacity={0.3}
            speed={0.35}
            colors={["#38BDF8", "#818CF8", "#34D399"]}
            safeBottom={180}
            zIndex={4}
            seed="underground-phantom-part5"
            timeOffsetSeconds={timeOffsetSeconds}
          />
        </>
      );

    // 6. Phần 5: Sinh vật lớn nhất từng được biết đến (Quái vật nấm Oregon hơn 2000 năm, bụi bào tử cổ đại)
    case "part6":
      return (
        <>
          <GoldenDust
            density={0.5}
            opacity={0.38}
            speed={0.45}
            colors={["#F59E0B", "#FBBF24", "#FEF3C7"]}
            safeBottom={180}
            zIndex={4}
            seed="underground-ancient-part6"
            timeOffsetSeconds={timeOffsetSeconds}
          />
          <DriftingFog
            density={0.3}
            opacity={0.18}
            speed={0.35}
            safeBottom={180}
            zIndex={3}
            seed="underground-fog-part6"
            timeOffsetSeconds={timeOffsetSeconds}
          />
        </>
      );

    // 7. Phần 6: Vì sao điều này quan trọng với chúng ta (Bảo vệ đất mẹ & nông nghiệp phục hồi, tia nắng hy vọng)
    case "part7":
      return (
        <>
          <SunRays
            density={0.5}
            opacity={0.22}
            speed={0.4}
            safeBottom={180}
            zIndex={3}
            seed="underground-future-part7"
            timeOffsetSeconds={timeOffsetSeconds}
          />
          <FallingLeaves
            density={0.3}
            opacity={0.28}
            wind={10}
            size={0.8}
            safeBottom={180}
            zIndex={4}
            seed="underground-leaves-part7"
            timeOffsetSeconds={timeOffsetSeconds}
          />
        </>
      );

    // 8. Lời kết: Thế giới dưới chân chúng ta (Tản bộ hoàng hôn rừng già, lá thu rơi và nắng chiều)
    case "part8":
      return (
        <>
          <FallingLeaves
            density={0.38}
            opacity={0.32}
            wind={8}
            size={0.85}
            safeBottom={180}
            zIndex={4}
            seed="underground-sunset-leaves-part8"
            timeOffsetSeconds={timeOffsetSeconds}
          />
          <SunRays
            density={0.4}
            opacity={0.2}
            speed={0.3}
            colors={["#F59E0B", "#FBBF24", "#FCD34D"]}
            safeBottom={180}
            zIndex={3}
            seed="underground-sunset-rays-part8"
            timeOffsetSeconds={timeOffsetSeconds}
          />
        </>
      );

    default:
      return null;
  }
};
