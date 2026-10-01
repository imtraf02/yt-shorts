import fs from "node:fs";

const SCENE_SCRIPTS = [
  "Ở Ấn Độ, con bò được tôn kính hơn cả nhiều vị vua. Không ai được phép giết nó. Nhưng lý do đằng sau lại không chỉ đơn giản là tôn giáo.",
  "Trong Ấn Độ giáo, con bò được gọi là Gau Mata, nghĩa là Mẹ Bò, biểu tượng của sự nuôi dưỡng, hy sinh và lòng bao dung, vì nó cho sữa nuôi con người mà không đòi hỏi gì.",
  "Nhiều vị thần quan trọng gắn liền với hình ảnh con bò. Thần Krishna thời trẻ là một người chăn bò. Thần Shiva cưỡi con bò thần Nandi. Và Kamadhenu là con bò thần thoại có khả năng ban phát mọi điều ước.",
  "Nguyên tắc Ahimsa, bất bạo động, trong Ấn Độ giáo cũng đóng vai trò lớn. Bò được xem là loài vật hiền lành, không gây hại, nên việc sát hại nó bị coi là hành động đặc biệt tàn nhẫn.",
  "Nhưng đằng sau tín ngưỡng còn có lý do thực tiễn lịch sử. Trong xã hội nông nghiệp Ấn Độ hàng nghìn năm qua, bò là tài sản sống còn, kéo cày, cho sữa,",
  "và phân bò dùng làm nhiên liệu, phân bón. Giết một con bò đồng nghĩa với phá hủy sinh kế của cả gia đình.",
  "Ngày nay, việc bảo vệ bò không chỉ dừng ở tôn giáo mà còn trở thành vấn đề pháp lý và chính trị. Nhiều bang ở Ấn Độ ban hành luật cấm giết mổ bò, với hình phạt nghiêm khắc.",
  "Điều thú vị, không phải toàn bộ dân số Ấn Độ đều kiêng thịt bò. Nhiều cộng đồng như người Hồi giáo, Cơ đốc giáo, hay một số vùng ở Đông Bắc Ấn Độ vẫn tiêu thụ thịt bò bình thường, cho thấy đây là vấn đề đa dạng văn hóa phức tạp hơn nhiều người nghĩ.",
  "Không đơn thuần là một tín ngưỡng, đó là sự giao thoa giữa tâm linh, sinh tồn và bản sắc văn hóa suốt hàng nghìn năm. Đó là lý do Ấn Độ thờ bò."
];

let totalWords = 0;
SCENE_SCRIPTS.forEach((text, i) => {
  const w = text.match(/\S+/gu);
  console.log(`Scene ${i + 1}: ${w.length} words | Starts: "${w.slice(0, 3).join(' ')}" ... Ends: "${w.slice(-3).join(' ')}"`);
  totalWords += w.length;
});
console.log(`Total words: ${totalWords}`);
