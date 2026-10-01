import React from "react";
import { AbsoluteFill } from "remotion";
import { Atmosphere, CinematicOverlay } from "./effects";

interface WorldTimeAtmosphereProps {
  currentChapterId: string;
}

/**
 * Hiệu ứng không khí & điện ảnh phù hợp nội dung Thời gian (World Time Documentary):
 * - Hạt bụi thời gian / vàng ấm (Golden Dust) trôi dạt nhẹ phản chiếu dòng lịch sử
 * - Ánh sao thiên văn (Twinkling Stars) ở các chương về hàng hải, thiên văn Greenwich, GPS
 * - Vòng sóng lan tỏa (Ripples) tượng trưng cho tín hiệu đồng bộ UTC & mạng viễn thông
 * - Chất phim tài liệu (Film Grain) giúp các tranh Vox Anime có chiều sâu điện ảnh
 * - An toàn 100%: safeBottom=220 bảo vệ phụ đề và nhân vật Trà Xanh
 */
export const WorldTimeAtmosphere: React.FC<WorldTimeAtmosphereProps> = ({
  currentChapterId,
}) => {
  // Các chương thiên văn học, đồng hồ nguyên tử hoặc vệ tinh không gian
  const isCosmicOrTech =
    currentChapterId === "part2" || // Hàng hải & thiên văn Greenwich
    currentChapterId === "part6" || // Nguyên tử & vũ trụ
    currentChapterId === "part8";   // Vệ tinh GPS

  // Các chương mạng lưới điện báo, truyền tín hiệu & cơ sở hạ tầng hiện đại
  const isNetworkOrModern =
    currentChapterId === "part3" || // Điện báo & tàu hỏa
    currentChapterId === "part9" || // Cơ sở dữ liệu IANA
    currentChapterId === "part10";  // Đúc kết mạng lưới toàn cầu

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 5 }}>
      {/* 1. Hạt bụi ánh sáng vàng / Bụi thời gian lịch sử (Golden Dust) */}
      <Atmosphere
        kind="dust"
        density={0.65}
        opacity={0.32}
        speed={0.6}
        safeBottom={220}
        colors={["#FBBF24", "#F59E0B", "#FEF08A", "#E2E8F0"]}
        seed="world-time-dust"
      />

      {/* 2. Ánh sao thiên văn lấp lánh ở các chương vũ trụ / thiên văn / GPS */}
      {isCosmicOrTech && (
        <Atmosphere
          kind="stars"
          density={0.45}
          opacity={0.28}
          speed={0.5}
          safeBottom={240}
          seed="cosmic-stars"
        />
      )}

      {/* 3. Lớp sóng tín hiệu thời gian lan tỏa (Ripples) ở các chương hạ tầng & viễn thông */}
      {isNetworkOrModern && (
        <CinematicOverlay
          kind="ripples"
          intensity={0.25}
          speed={0.8}
          safeBottom={220}
          color="#38BDF8"
        />
      )}

      {/* 4. Chất phim tài liệu điện ảnh nhẹ nhàng (Film Grain) */}
      <CinematicOverlay
        kind="film-grain"
        intensity={0.16}
        speed={0.8}
        seed="world-time-grain"
      />
    </AbsoluteFill>
  );
};
