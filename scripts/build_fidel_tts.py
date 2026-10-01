# -*- coding: utf-8 -*-
"""
Script phân tách kịch bản 'FIDEL CASTRO: NGƯỜI BẠN LỚN Ở BÊN KIA ĐẠI DƯƠNG' thành 12 phần
và sinh audio TTS 48kHz chuẩn giọng Trúc Ly (VieNeu-TTS) cho từng phần.
"""

import os
import sys
import time
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

FIDEL_SECTIONS = [
    {
        "id": "part1",
        "chapter_num": 1,
        "title": "Mở Đầu: Người Bạn Lớn Bên Kia Đại Dương",
        "subtitle": "Chuyến thăm lịch sử vượt vĩ tuyến 17 và hành trình một huyền thoại",
        "historical_era": "1926 - 2016 · TỔNG QUAN",
        "image_range": (1, 8),
        "text": """Tháng 9 năm 1973, khi cuộc kháng chiến chống Mỹ ở miền Nam vẫn còn đang trong giai đoạn ác liệt nhất, có một vị nguyên thủ nước ngoài đã làm một việc mà trước đó, và cả sau này, không một nhà lãnh đạo nào khác trên thế giới dám làm.

Ông vượt sông Bến Hải, vượt qua vĩ tuyến 17 — ranh giới chia cắt hai miền Nam Bắc — để đặt chân đến vùng đất Quảng Trị, ngay khi bom đạn vẫn còn cày xới nơi đây, khi chiến tranh vẫn chưa hề kết thúc.

Người đó là Fidel Castro, Chủ tịch nước Cuba.

Với nhiều thế hệ người Việt Nam, cái tên Fidel Castro không chỉ đơn thuần là một nhà lãnh đạo nước ngoài. Đó là một người bạn, một biểu tượng của tình đoàn kết quốc tế, gắn liền với câu nói nổi tiếng mà ông từng phát biểu để bày tỏ sự ủng hộ dành cho Việt Nam trong những năm tháng chiến tranh gian khổ nhất.

Nhưng đằng sau hình ảnh người bạn lớn ấy, là một cuộc đời đầy biến động — một cuộc đời bắt đầu từ một cậu bé con nhà điền chủ giàu có ở một thị trấn nhỏ của Cuba, rồi trở thành người lãnh đạo một cuộc cách mạng lật đổ cả một chế độ độc tài, đối đầu trực diện với siêu cường số một thế giới ngay sát nách mình trong suốt hơn nửa thế kỷ, sống sót qua hơn sáu trăm âm mưu ám sát, và cuối cùng qua đời một cách thanh thản ở tuổi chín mươi.

Hôm nay, chúng ta sẽ cùng nhau đi qua toàn bộ cuộc đời của Fidel Castro — từ những ngày thơ ấu ở Biran, cho đến giây phút cuối cùng ở La Habana."""
    },
    {
        "id": "part2",
        "chapter_num": 2,
        "title": "Cậu Bé Con Nhà Điền Chủ Ở Biran",
        "subtitle": "Xuất thân giàu có và những bước chân đầu tiên đến giảng đường luật",
        "historical_era": "1926 - 1945 · TUỔI THƠ & HỌC VẤN",
        "image_range": (9, 17),
        "text": """Fidel Alejandro Castro Ruz sinh ngày 13 tháng 8 năm 1926, tại một thị trấn nhỏ có tên Biran, thuộc tỉnh Oriente ở miền đông Cuba.

Có một điều mà nhiều người, khi lần đầu tìm hiểu về Fidel Castro, thường khá bất ngờ: ông không hề xuất thân từ một gia đình nghèo khó, bị áp bức, như hình dung quen thuộc về những nhà cách mạng cộng sản. Ngược lại, gia đình Castro khá giả, thậm chí có thể gọi là giàu có. Cha ông, Angel Castro, là một điền chủ lớn, sở hữu một đồn điền mía đường rộng lớn ở Biran, sử dụng hàng trăm công nhân làm việc.

Fidel là một trong bảy người con trong gia đình. Thuở nhỏ, ông theo học tại các trường dòng Công giáo — nơi kỷ luật khắt khe được đặt lên hàng đầu. Ngay từ khi còn đi học, Fidel đã bộc lộ rõ những tố chất sẽ theo ông suốt cuộc đời: thể hiện năng khiếu thể thao nổi bật, đặc biệt là môn bóng chày, và một tinh thần tranh luận, hùng biện sắc bén hiếm có ở tuổi thiếu niên.

Sau khi hoàn thành chương trình phổ thông, Fidel Castro theo học ngành luật tại Đại học Havana — ngôi trường đại học danh giá bậc nhất Cuba, đồng thời cũng là một trong những trung tâm sục sôi nhất của các phong trào sinh viên và chính trị cấp tiến vào thời điểm đó.

Và chính tại giảng đường đại học này, chàng sinh viên luật xuất thân từ một gia đình điền chủ giàu có đã bắt đầu bước những bước chân đầu tiên vào con đường chính trị — một con đường mà, như sau này lịch sử đã chứng minh, sẽ đưa ông đi rất xa so với xuất thân ban đầu của mình."""
    },
    {
        "id": "part3",
        "chapter_num": 3,
        "title": "Tấn Công Pháo Đài Moncada",
        "subtitle": "Bản án 15 năm tù và lời tuyên ngôn Lịch sử sẽ xá tội cho tôi",
        "historical_era": "1945 - 1953 · PHONG TRÀO 26 THÁNG 7",
        "image_range": (18, 30),
        "text": """Ngay từ những năm còn ngồi trên ghế giảng đường đại học, Fidel Castro đã tích cực tham gia vào các hoạt động của Đảng Nhân dân Cuba — thường được gọi tắt là Đảng Chính thống — một đảng phái chính trị theo xu hướng dân tộc chủ nghĩa, chống tham nhũng, khá được lòng dân chúng Cuba thời bấy giờ.

Sau khi tốt nghiệp và lấy bằng luật, Fidel Castro hành nghề luật sư trong một thời gian ngắn, đồng thời vẫn tiếp tục dấn thân sâu hơn vào chính trường. Ông có kế hoạch tham gia tranh cử vào Quốc hội Cuba — theo con đường chính trị hợp pháp, thông qua bầu cử.

Nhưng kế hoạch đó đã không bao giờ trở thành hiện thực.

Năm 1952, tướng Fulgencio Batista — một chính khách kỳ cựu từng nắm quyền ở Cuba trước đó — đã phát động một cuộc đảo chính quân sự, lật đổ chính quyền dân sự đương nhiệm và tự mình nắm giữ quyền lực tuyệt đối, hủy bỏ luôn cả cuộc bầu cử mà Fidel Castro dự định tham gia.

Đây chính là bước ngoặt đẩy Fidel Castro từ con đường đấu tranh chính trị nghị trường sang con đường đấu tranh vũ trang.

Ngày 26 tháng 7 năm 1953, Fidel Castro, khi đó mới hai mươi sáu tuổi, đã trực tiếp chỉ huy một nhóm khoảng hơn một trăm người tấn công vào Pháo đài Moncada — một trong những căn cứ quân sự lớn nhất của chính quyền Batista, đặt tại thành phố Santiago de Cuba.

Cuộc tấn công này, xét về mặt quân sự, là một thất bại gần như hoàn toàn. Lực lượng của Fidel Castro bị áp đảo hoàn toàn về quân số và vũ khí, nhiều người trong nhóm bị bắt giữ và sau đó bị tra tấn, hành quyết dã man. Bản thân Fidel Castro cũng bị bắt giữ ngay sau đó.

Nhưng đây lại chính là sự kiện khởi đầu cho toàn bộ phong trào cách mạng Cuba sau này — đến mức ngày tháng của cuộc tấn công này, 26 tháng 7, sau này đã trở thành tên gọi chính thức của phong trào cách mạng do Fidel Castro lãnh đạo: Phong trào 26 tháng 7.

Tại phiên tòa xét xử sau đó, thay vì chọn cách im lặng hay xin khoan hồng, Fidel Castro đã tự mình đứng ra bào chữa — vì ông vốn là một luật sư — và có một bài phát biểu trước tòa kéo dài, sau này được biết đến rộng rãi với tên gọi "Lịch sử sẽ xá tội cho tôi". Bài phát biểu này, dù không giúp ông thoát khỏi bản án, nhưng đã trở thành một trong những văn kiện chính trị quan trọng nhất, đặt nền móng tư tưởng cho toàn bộ cuộc cách mạng Cuba sau này.

Fidel Castro bị kết án mười lăm năm tù giam."""
    },
    {
        "id": "part4",
        "chapter_num": 4,
        "title": "Gặp Gỡ Che Guevara & Con Tàu Granma",
        "subtitle": "Lưu vong Mexico, đổ bộ trở về và ngọn lửa du kích Sierra Maestra",
        "historical_era": "1955 - 1958 · KHỞI NGHĨA SIERRA MAESTRA",
        "image_range": (31, 42),
        "text": """May mắn thay cho Fidel Castro — và cũng có thể nói là một sai lầm chiến lược nghiêm trọng của chính quyền Batista — ông không phải thụ án đầy đủ mười lăm năm tù.

Năm 1955, trước áp lực của dư luận trong nước, chính quyền Batista đã ban hành lệnh ân xá, trả tự do cho Fidel Castro cùng những người đồng đội của ông sau chưa đầy hai năm ngồi tù.

Ngay sau khi được trả tự do, Fidel Castro lập tức rời khỏi Cuba, sang Mexico. Ông hiểu rất rõ rằng ở lại trong nước lúc này, dưới sự giám sát gắt gao của chính quyền Batista, sẽ không thể nào tổ chức được một lực lượng cách mạng đủ mạnh.

Và chính tại Mexico, một trong những cuộc gặp gỡ định mệnh nhất trong lịch sử cách mạng thế kỷ 20 đã diễn ra: Fidel Castro gặp Ernesto "Che" Guevara — một bác sĩ trẻ người Argentina, người đã đi khắp Mỹ Latinh và tận mắt chứng kiến cảnh nghèo đói, bất công, để rồi từ đó nung nấu một lý tưởng cách mạng mãnh liệt.

Cùng với em trai của Fidel là Raul Castro, và tổng cộng khoảng tám mươi hai người khác, nhóm cách mạng này bắt đầu quá trình huấn luyện quân sự bí mật ngay trên đất Mexico, chuẩn bị cho một cuộc đổ bộ trở lại Cuba để lật đổ chính quyền Batista bằng vũ lực.

Tháng 11 năm 1956, nhóm của Fidel Castro lên một con tàu nhỏ mang tên Granma, vượt biển trở về Cuba. Cuộc đổ bộ ban đầu diễn ra không hề suôn sẻ — con tàu cập bến sai vị trí, lực lượng của Fidel Castro ngay lập tức bị quân đội Batista phát hiện và tấn công phủ đầu. Trong số khoảng tám mươi hai người ban đầu, chỉ còn lại một nhóm rất nhỏ — theo nhiều ghi chép chỉ còn khoảng hơn chục người — sống sót và trốn thoát được vào vùng núi Sierra Maestra hiểm trở.

Từ một nhóm nhỏ tưởng chừng như đã bị xóa sổ hoàn toàn ngay từ đầu, lực lượng du kích của Fidel Castro dần dần được củng cố, mở rộng, nhờ vào sự ủng hộ ngày càng lớn của người dân địa phương vốn đã quá chán ngán với chế độ tham nhũng, độc đoán của Batista. Từ vài chục người ban đầu, đến năm 1958, lực lượng kháng chiến đã phát triển lên đến khoảng tám trăm người, đủ sức tổ chức các cuộc tấn công quy mô lớn hơn nhằm vào quân đội chính phủ."""
    },
    {
        "id": "part5",
        "chapter_num": 5,
        "title": "Chiến Thắng Lịch Sử: Ngày 1 Tháng 1 Năm 1959",
        "subtitle": "Tiến vào La Habana, chế độ Batista sụp đổ và kỷ nguyên mới bắt đầu",
        "historical_era": "1958 - 1959 · CÁCH MẠNG THÀNH CÔNG",
        "image_range": (43, 51),
        "text": """Tháng 5 năm 1958, chính quyền Batista, nhận thấy rõ mối đe dọa ngày càng lớn từ lực lượng du kích của Fidel Castro, đã huy động nhiều tiểu đoàn quân chính quy mở một chiến dịch quy mô lớn nhằm tiêu diệt tận gốc lực lượng cách mạng đang trú ẩn tại vùng núi Sierra Maestra.

Nhưng chiến dịch này đã thất bại hoàn toàn. Quân đội chính quy của Batista, dù đông hơn và trang bị tốt hơn rất nhiều, lại tỏ ra kém hiệu quả và mất tinh thần chiến đấu nghiêm trọng trước lối đánh du kích linh hoạt của lực lượng Fidel Castro, vốn đã am hiểu địa hình rừng núi và có được sự hậu thuẫn vững chắc từ dân chúng địa phương.

Sau thất bại này, cục diện chiến trường thay đổi hoàn toàn. Lực lượng cách mạng bắt đầu chuyển từ thế phòng thủ sang thế tấn công, dần dần mở rộng vùng kiểm soát ra khỏi khu vực núi rừng, tiến về các thành phố lớn.

Đến cuối năm 1958, chính quyền Batista đã hoàn toàn mất kiểm soát tình hình. Ngày 1 tháng 1 năm 1959, khi lực lượng cách mạng của Fidel Castro tiến vào thủ đô La Habana, quân đội của Batista đã đào ngũ hàng loạt, gần như không có bất kỳ sự kháng cự đáng kể nào. Chính Batista, nhận thấy tình thế đã hoàn toàn vô vọng, đã lặng lẽ rời bỏ đất nước, chạy trốn ra nước ngoài ngay trong đêm giao thừa.

Cuộc Cách mạng Cuba, sau hơn năm năm đấu tranh kể từ cuộc tấn công thất bại vào Pháo đài Moncada, cuối cùng đã giành thắng lợi hoàn toàn.

Fidel Castro, ở tuổi ba mươi hai, trở thành nhà lãnh đạo trên thực tế của Cuba. Đến tháng 2 năm 1959, ông chính thức đảm nhiệm chức vụ Thủ tướng."""
    },
    {
        "id": "part6",
        "chapter_num": 6,
        "title": "Từ Khách Mời Washington Đến Đối Đầu Toàn Diện",
        "subtitle": "Quốc hữu hóa, cấm vận kinh tế và bài phát biểu 4 tiếng tại Liên Hợp Quốc",
        "historical_era": "1959 - 1961 · ĐỐI ĐẦU CUBA - MỸ",
        "image_range": (52, 60),
        "text": """Điều thú vị, mà không phải ai cũng biết, là quan hệ giữa Fidel Castro và nước Mỹ, ngay từ những ngày đầu, không hề khởi đầu bằng sự thù địch tuyệt đối như những gì diễn ra sau này.

Tháng 4 năm 1959, chỉ vài tháng sau khi cách mạng thành công, Fidel Castro đã có chuyến thăm chính thức tới nước Mỹ, thậm chí đến cả Nhà Trắng. Tuy nhiên, Tổng thống Mỹ lúc đó, Dwight D. Eisenhower, đã không trực tiếp tiếp đón ông, mà cử Phó Tổng thống khi đó là Richard Nixon ra tiếp chuyện thay.

Sự lạnh nhạt này, cùng với những chính sách kinh tế mà chính quyền cách mạng Cuba bắt đầu triển khai ngay sau đó — đặc biệt là chương trình quốc hữu hóa hàng loạt các doanh nghiệp, đồn điền, nhà máy vốn thuộc sở hữu của các công ty Mỹ tại Cuba mà không có sự bồi thường thỏa đáng — đã nhanh chóng đẩy quan hệ hai nước vào vòng xoáy đối đầu không thể cứu vãn.

Nước Mỹ đáp trả bằng các biện pháp trừng phạt kinh tế ngày càng gắt gao — đầu tiên là cắt giảm hạn ngạch nhập khẩu đường từ Cuba, mặt hàng xuất khẩu chủ lực của đảo quốc này, sau đó tiến tới cấm vận toàn diện gần như mọi mặt hàng xuất khẩu sang Cuba.

Ngày 28 tháng 9 năm 1960, Fidel Castro đã có một bài phát biểu kéo dài tới bốn tiếng đồng hồ trước Đại hội đồng Liên Hợp Quốc tại New York, chỉ trích gay gắt các chính sách của Mỹ đối với Cuba và toàn khu vực Mỹ Latinh. Đây cũng chính là dấu hiệu cho thấy khả năng hùng biện phi thường của Fidel Castro — một khả năng mà sau này, trong suốt sự nghiệp chính trị của mình, ông thường xuyên thể hiện qua những bài diễn văn có khi kéo dài đến sáu, bảy tiếng đồng hồ liên tục trước công chúng Cuba.

Đến tháng 1 năm 1961, chỉ ít lâu trước khi rời nhiệm sở, Tổng thống Eisenhower chính thức cắt đứt hoàn toàn quan hệ ngoại giao giữa Mỹ và Cuba."""
    },
    {
        "id": "part7",
        "chapter_num": 7,
        "title": "Chiến Thắng Vịnh Con Lợn (Playa Girón)",
        "subtitle": "Ba ngày bẻ gãy cuộc xâm lược của CIA và tuyên bố chủ nghĩa xã hội",
        "historical_era": "1961 · PLAYA GIRÓN",
        "image_range": (61, 69),
        "text": """Chính quyền Mỹ, dưới thời Tổng thống mới nhậm chức John F. Kennedy, không chấp nhận để một chính quyền theo xu hướng cộng sản tồn tại ngay sát nách mình, chỉ cách bờ biển bang Florida chưa đầy một trăm dặm.

Cơ quan Tình báo Trung ương Mỹ — CIA — đã bí mật huấn luyện và trang bị vũ khí cho khoảng một nghìn ba trăm người Cuba lưu vong chống đối chính quyền Castro, với kế hoạch đổ bộ vào Cuba để châm ngòi cho một cuộc nổi dậy lật đổ chính quyền cách mạng.

Ngày 17 tháng 4 năm 1961, lực lượng này đổ bộ lên khu vực Vịnh Con Lợn — hay còn được người Cuba gọi theo tên địa phương là Playa Girón — nằm ở bờ biển phía tây nam của Cuba.

Nhưng kế hoạch này đã thất bại thảm hại. Cuộc nổi dậy quần chúng mà CIA kỳ vọng đã không hề xảy ra — trái lại, người dân Cuba phần lớn vẫn ủng hộ chính quyền cách mạng. Chính Fidel Castro đã đích thân có mặt tại hiện trường để trực tiếp chỉ đạo lực lượng vũ trang Cuba phản công. Chỉ trong vòng chưa đầy ba ngày, toàn bộ lực lượng đổ bộ đã bị đánh bại hoàn toàn, phần lớn bị bắt sống hoặc tiêu diệt.

Đây là một thất bại nhục nhã đối với chính quyền Mỹ, và ngược lại, lại là một chiến thắng vang dội, củng cố vững chắc thêm vị thế và uy tín của Fidel Castro trong lòng người dân Cuba.

Chỉ hai tuần sau chiến thắng này, ngày 1 tháng 5 năm 1961, Fidel Castro chính thức tuyên bố Cuba là một quốc gia theo con đường xã hội chủ nghĩa, đồng thời bãi bỏ hoàn toàn chế độ bầu cử đa đảng."""
    },
    {
        "id": "part8",
        "chapter_num": 8,
        "title": "13 Ngày Thế Giới Nín Thở: Khủng Hoảng Tên Lửa",
        "subtitle": "Bờ vực chiến tranh hạt nhân, đàm phán Xô - Mỹ và sự kiên định của Cuba",
        "historical_era": "1962 · KHỦNG HOẢNG TÊN LỬA CUBA",
        "image_range": (70, 79),
        "text": """Sau thất bại cay đắng tại Vịnh Con Lợn, Fidel Castro ngày càng lo ngại sâu sắc về nguy cơ Mỹ sẽ tiếp tục tổ chức một cuộc xâm lược quy mô lớn hơn, lần này có thể là trực tiếp bằng quân đội chính quy Mỹ, chứ không chỉ thông qua lực lượng lưu vong được CIA hậu thuẫn.

Để đối phó với mối đe dọa này, Fidel Castro đã chủ động yêu cầu sự trợ giúp quân sự từ Liên Xô.

Nhà lãnh đạo Liên Xô lúc đó, Nikita Khrushchev, đã đáp ứng lời đề nghị này — nhưng theo một cách còn vượt xa những gì Fidel Castro có lẽ đã hình dung ban đầu. Từ tháng 9 năm 1962, Liên Xô bắt đầu bí mật triển khai kế hoạch mang tên "Chiến dịch Anadyr" — vận chuyển và lắp đặt các tên lửa đạn đạo tầm trung có khả năng mang đầu đạn hạt nhân, ngay trên lãnh thổ Cuba, đủ sức vươn tới hầu hết các mục tiêu trên lãnh thổ nước Mỹ.

Điều đáng chú ý, theo một số tài liệu và phỏng vấn được công bố sau này, chính Fidel Castro ban đầu không hoàn toàn mặn mà với việc triển khai tên lửa hạt nhân trên đất nước mình — mà chính Khrushchev mới là người gây sức ép để thuyết phục Castro chấp nhận kế hoạch này.

Tháng 10 năm 1962, máy bay do thám của Mỹ phát hiện ra các bệ phóng tên lửa đang được xây dựng trên đất Cuba. Thế giới ngay lập tức rơi vào cuộc khủng hoảng căng thẳng nhất trong toàn bộ thời kỳ Chiến tranh Lạnh — mười ba ngày mà nhân loại có lẽ đã tiến gần hơn bao giờ hết đến bờ vực của một cuộc chiến tranh hạt nhân toàn diện.

Cuối cùng, sau nhiều ngày đàm phán căng thẳng và bí mật giữa Washington và Moscow, cuộc khủng hoảng đã được giải quyết vào ngày 28 tháng 10 năm 1962: Liên Xô đồng ý rút toàn bộ tên lửa khỏi Cuba, đổi lại Mỹ cam kết sẽ không xâm lược Cuba trong tương lai, và bí mật đồng ý rút các tên lửa của Mỹ đang đặt tại Thổ Nhĩ Kỳ.

Nhưng có một chi tiết rất đáng chú ý, và phần nào cho thấy sự phức tạp trong mối quan hệ giữa Cuba và Liên Xô: toàn bộ quá trình đàm phán để giải quyết cuộc khủng hoảng này diễn ra hoàn toàn giữa Kennedy và Khrushchev — Fidel Castro gần như đứng ngoài lề, không được tham vấn trực tiếp. Ông đặc biệt tức giận vì những lợi ích và mối quan ngại riêng của Cuba — như việc Mỹ vẫn tiếp tục duy trì căn cứ quân sự tại Vịnh Guantanamo ngay trên lãnh thổ Cuba — hoàn toàn không được đề cập đến trong các thỏa thuận cuối cùng.

Dù vậy, kết quả cuối cùng vẫn mang lại cho Cuba một sự đảm bảo quan trọng: cam kết không xâm lược từ phía Mỹ — điều mà lệnh cấm vận kinh tế toàn diện, chính thức được công bố chỉ vài tháng trước đó vào tháng 2 năm 1962, vẫn tiếp tục kéo dài cho đến tận nhiều thập kỷ sau."""
    },
    {
        "id": "part9",
        "chapter_num": 9,
        "title": "Người Bạn Lớn Của Việt Nam: Vượt Qua Vĩ Tuyến 17",
        "subtitle": "Chuyến thăm Quảng Trị 1973 và tình đoàn kết sắt son xuyên nửa vòng Trái Đất",
        "historical_era": "1973 - 2003 · ĐOÀN KẾT VIỆT NAM - CUBA",
        "image_range": (80, 94),
        "text": """Trong bối cảnh đối đầu căng thẳng với nước Mỹ ngay sát nách mình, Fidel Castro đã tìm thấy ở Việt Nam — một quốc gia xa xôi nửa vòng trái đất, nhưng cũng đang phải đối đầu trực diện với chính siêu cường mà ông coi là kẻ thù chung — một sự đồng cảm sâu sắc và tự nhiên.

Trong suốt những năm tháng cuộc kháng chiến chống Mỹ của nhân dân Việt Nam diễn ra ác liệt nhất, Fidel Castro đã nhiều lần công khai bày tỏ sự ủng hộ mạnh mẽ, cả về mặt tinh thần lẫn vật chất, dành cho Việt Nam. Người dân Việt Nam nhiều thế hệ vẫn còn nhớ và nhắc lại câu nói nổi tiếng của ông, thể hiện quyết tâm đoàn kết tuyệt đối với cuộc đấu tranh của nhân dân Việt Nam.

Nhưng đỉnh cao của mối quan hệ đặc biệt này chính là chuyến thăm của Fidel Castro tới Việt Nam vào tháng 9 năm 1973 — ngay khi Hiệp định Paris vừa được ký kết chưa lâu, nhưng chiến sự ở miền Nam vẫn còn tiếp diễn quyết liệt.

Từ Hà Nội, Fidel Castro đã di chuyển về hướng Quảng Bình — khu vực khi đó vẫn còn nằm dưới làn bom đạn ác liệt — rồi vượt qua sông Bến Hải, đặt chân đến vùng đất giải phóng tại tỉnh Quảng Trị. Đây là một hành động mang tính biểu tượng vô cùng lớn lao: Fidel Castro đã trở thành nhà lãnh đạo nước ngoài đầu tiên, và cho đến nay vẫn là duy nhất, trực tiếp vượt qua vĩ tuyến 17 để đến thăm vùng giải phóng ở miền Nam Việt Nam, ngay khi chiến tranh vẫn còn chưa kết thúc.

Tại đây, Fidel Castro đã cùng Thủ tướng Phạm Văn Đồng tham dự một cuộc mít tinh lớn của nhân dân Quảng Trị, chào mừng đoàn đại biểu Cuba đến thăm. Hình ảnh vị lãnh tụ Cuba đứng giữa vùng đất vừa mới được giải phóng, giữa những đổ nát còn chưa kịp dọn dẹp của chiến tranh, đã trở thành một trong những biểu tượng sâu đậm nhất của tình đoàn kết quốc tế trong ký ức của nhiều thế hệ người Việt Nam.

Về sau, Fidel Castro còn có thêm hai chuyến thăm chính thức khác tới Việt Nam, vào tháng 12 năm 1995 và tháng 2 năm 2003 — duy trì mối quan hệ gắn bó đặc biệt giữa hai quốc gia trong suốt nhiều thập kỷ, ngay cả khi bối cảnh thế giới đã thay đổi rất nhiều so với thời kỳ chiến tranh."""
    },
    {
        "id": "part10",
        "chapter_num": 10,
        "title": "Nửa Thế Kỷ Cầm Quyền & 600 Âm Mưu Ám Sát",
        "subtitle": "Kỳ tích y tế giáo dục, lệnh cấm vận khắc nghiệt và bản lĩnh kiên cường",
        "historical_era": "1962 - 2000 · XÂY DỰNG & THỬ THÁCH",
        "image_range": (95, 106),
        "text": """Trong suốt gần năm mươi năm nắm quyền lãnh đạo đất nước — từ năm 1959 cho đến khi chính thức trao lại quyền lực vào năm 2008 — Fidel Castro đã đưa Cuba đi theo con đường xây dựng chủ nghĩa xã hội, trong bối cảnh phải chịu đựng lệnh cấm vận kinh tế toàn diện và gần như liên tục từ phía Mỹ, kéo dài hơn nửa thế kỷ.

Bất chấp những khó khăn kinh tế chồng chất do lệnh cấm vận gây ra, chính quyền Fidel Castro vẫn đạt được những thành tựu đáng kể trong các lĩnh vực y tế và giáo dục — những lĩnh vực mà cho đến nay, ngay cả những người phê phán gay gắt nhất đối với di sản chính trị của ông cũng phải thừa nhận. Cuba xây dựng được một hệ thống y tế công cộng được đánh giá vào hàng đầu thế giới so với quy mô và nguồn lực kinh tế hạn hẹp của một quốc đảo nhỏ bé. Tỷ lệ người dân biết đọc, biết viết ở Cuba đạt tới 98%, và toàn bộ trẻ em trong độ tuổi đi học đều được đến trường, với chế độ giáo dục hoàn toàn miễn phí.

Cuba, dưới sự lãnh đạo của Fidel Castro, cũng thường xuyên cử các đoàn bác sĩ, chuyên gia y tế đi hỗ trợ nhiều quốc gia đang phát triển khác trên thế giới, bất chấp những khó khăn kinh tế của chính đất nước mình. Chính vì những nỗ lực hỗ trợ quốc tế không ngừng nghỉ này, đã từng có ý kiến đề cử tên tuổi Fidel Castro cho giải Nobel Hòa bình.

Tất nhiên, đi kèm với những thành tựu đó, là một hệ thống chính trị độc đảng, tập trung quyền lực cao độ vào tay Đảng Cộng sản Cuba, với rất ít không gian cho các tiếng nói đối lập chính thức — đây chính là điểm gây tranh cãi lớn nhất và kéo dài nhất xung quanh di sản chính trị của Fidel Castro, và cũng là lý do chính khiến cộng đồng người Cuba lưu vong, đặc biệt tại Mỹ, vẫn duy trì một thái độ phản đối gay gắt đối với ông cho đến tận ngày nay.

Trong suốt nửa thế kỷ cầm quyền đó, Fidel Castro cũng phải đối mặt với một con số đáng kinh ngạc: theo nhiều thống kê, ông đã sống sót qua hơn sáu trăm âm mưu ám sát khác nhau, phần lớn được cho là do CIA trực tiếp hoặc gián tiếp thực hiện, với đủ mọi phương thức, từ những kế hoạch tinh vi cho đến những âm mưu có phần kỳ quặc. Khi được hỏi về vấn đề này trong một lần trả lời phỏng vấn, Fidel Castro từng nói một câu đầy tự tin và có phần hài hước: dù họ có xe tăng, có máy bay, nhưng cuối cùng vẫn phải bỏ chạy."""
    },
    {
        "id": "part11",
        "chapter_num": 11,
        "title": "Những Năm Cuối Đời & Chuyển Giao Quyền Lực",
        "subtitle": "Trao quyền cho Raul Castro, ngòi bút chính luận và lời chia tay thanh thản",
        "historical_era": "2004 - 2016 · CHUYỂN GIAO & SUY NGẪM",
        "image_range": (107, 114),
        "text": """Bước sang những năm 2000, sức khỏe của Fidel Castro, khi đó đã ở độ tuổi ngoài bảy mươi, bắt đầu có những dấu hiệu suy giảm đáng kể.

Ngày 20 tháng 10 năm 2004, ông lâm bệnh nặng. Đến năm 2006, sau một cuộc phẫu thuật liên quan đến vấn đề tiêu hóa, tình trạng sức khỏe của Fidel Castro trở nên nghiêm trọng đến mức ông buộc phải tạm thời trao lại quyền điều hành đất nước cho người em trai của mình — Raul Castro, người đã từng kề vai sát cánh cùng ông từ những ngày đầu gian khổ nhất của cuộc cách mạng, từ căn cứ địa Sierra Maestra cho đến những năm tháng dựng xây đất nước sau này.

Đến tháng 2 năm 2008, Fidel Castro chính thức tuyên bố từ chức khỏi tất cả các vị trí lãnh đạo cao nhất của đất nước, chính thức chuyển giao toàn bộ quyền lực cho Raul Castro sau gần năm mươi năm liên tục nắm quyền.

Dù đã chính thức rút lui khỏi các vị trí lãnh đạo chính thức, Fidel Castro vẫn tiếp tục là một nhân vật có tầm ảnh hưởng vô cùng lớn đối với đời sống chính trị Cuba, cũng như trên trường quốc tế, cho đến tận những năm tháng cuối đời. Ông vẫn thường xuyên viết các bài phản ánh, bình luận về những sự kiện lớn trên thế giới — từ vụ Mỹ tiêu diệt trùm khủng bố Bin Laden, cho đến cuộc khủng hoảng nợ công ở Mỹ và châu Âu, hay các cuộc chiến tranh của Mỹ tại Iraq và Afghanistan.

Tháng 4 năm 2016, tại Đại hội đại biểu toàn quốc lần thứ bảy của Đảng Cộng sản Cuba, Fidel Castro — khi đó đã gần chín mươi tuổi, sức khỏe rất yếu — đã có một trong những lần xuất hiện hiếm hoi cuối cùng trước công chúng. Trong bài phát biểu đầy xúc động của mình, ông đã nói với các thế hệ đảng viên trẻ hơn rằng chẳng còn bao lâu nữa ông sẽ bước sang tuổi chín mươi, và rồi ông cũng sẽ như tất cả mọi người khác mà thôi — một câu nói giản dị, nhưng cho thấy sự chấp nhận thanh thản trước quy luật tất yếu của cuộc đời."""
    },
    {
        "id": "part12",
        "chapter_num": 12,
        "title": "Ngày 25 Tháng 11 Năm 2016 & Di Sản Bất Tử",
        "subtitle": "Tiễn biệt người bạn lớn của nhân dân Việt Nam và thế giới",
        "historical_era": "2016 · DI SẢN LỊCH SỬ",
        "image_range": (115, 125),
        "text": """Tối ngày 25 tháng 11 năm 2016, Đài Truyền hình Quốc gia Cuba chính thức thông báo: cựu Chủ tịch Fidel Castro đã qua đời, hưởng thọ chín mươi tuổi.

Sau khi sống sót qua hơn sáu trăm âm mưu ám sát trong suốt cuộc đời hoạt động chính trị đầy sóng gió của mình, cuối cùng, Fidel Castro đã ra đi một cách thanh thản, vì tuổi già và bệnh tật, ngay tại thủ đô La Habana — nơi ông đã lãnh đạo cuộc cách mạng tiến vào giải phóng gần sáu mươi năm về trước.

Tin tức về sự ra đi của ông lập tức gây ra một làn sóng phản ứng trái chiều rất rõ rệt trên khắp thế giới — một sự phản ánh chân thực nhất cho di sản đầy tranh cãi mà ông để lại. Trong khi đông đảo người dân Cuba, cùng nhiều quốc gia có quan hệ gắn bó lâu dài với Cuba, bày tỏ sự thương tiếc sâu sắc, thì tại thành phố Miami của Mỹ — nơi tập trung đông đảo cộng đồng người Cuba lưu vong — nhiều người đã xuống đường ăn mừng, coi đây là sự kết thúc của một chương đen tối trong lịch sử đất nước họ.

Tại Việt Nam, tin tức Fidel Castro qua đời cũng gây ra một nỗi tiếc thương sâu sắc và lan rộng. Việt Nam đã gửi điện chia buồn chính thức. Lễ viếng được tổ chức trang trọng tại Đại sứ quán Cuba ở Hà Nội, thu hút đông đảo người dân và các thế hệ lãnh đạo đến viếng thăm, tưởng nhớ người bạn lớn đã từng không quản hiểm nguy, vượt qua lằn ranh chiến tranh để sát cánh cùng nhân dân Việt Nam trong những năm tháng gian khổ nhất.

Từ một cậu bé con nhà điền chủ ở thị trấn nhỏ Biran, đến chàng sinh viên luật đầy nhiệt huyết tại Đại học Havana, đến người chỉ huy một cuộc tấn công thất bại vào Pháo đài Moncada, rồi trở thành nhà lãnh đạo một cuộc cách mạng thành công, đối đầu trực diện với siêu cường mạnh nhất thế giới trong suốt gần năm mươi năm, và cuối cùng là người bạn lớn không bao giờ quên tình nghĩa với một dân tộc xa xôi đang chiến đấu vì độc lập tự do — cuộc đời Fidel Castro đã khép lại, nhưng dấu ấn mà ông để lại, trong lòng người dân Cuba cũng như trong ký ức của biết bao thế hệ người Việt Nam, vẫn còn nguyên vẹn cho đến hôm nay."""
    }
]

IMAGE_DESCRIPTIONS = [
    # Phần 1 (1 - 8)
    "Đoàn xe quân sự tiến vào trạm gác bên bờ sông vĩ tuyến 17 trong hoàng hôn 1973",
    "Fidel Castro trong quân phục ô liu nhìn về bờ nam sông Bến Hải còn vương khói đạn",
    "Bờ biển Caribe rực rỡ buổi bình minh với hàng dừa và thuyền đánh cá trên làn nước xanh",
    "Kỷ vật hoài niệm: Bức ảnh nhuốm màu thời gian, điếu xì gà Cuba và ly rượu trên bàn gỗ",
    "Đồn điền mía bạt ngàn tại Oriente dưới ráng chiều hoàng hôn đầu thế kỷ 20",
    "Bóng hình vị lãnh tụ tương lai đơn độc đứng trên đỉnh đồi nhìn về thung lũng nhiệt đới",
    "Sợi chỉ đỏ hữu nghị kết nối hòn đảo Caribe với bán đảo Đông Nam Á xa xôi",
    "Quảng trường thuộc địa rực rỡ sắc màu với tháp chuông nhà thờ tại miền đông Cuba",

    # Phần 2 (9 - 17)
    "Dinh thự điền trang gia đình Castro giữa bạt ngàn nương mía tại Biran",
    "Công nhân thu hoạch mía dưới ánh nắng nhiệt đới trên đồn điền của Angel Castro",
    "Gia đình Angel Castro quây quần bên hiên nhà điền trang êm đềm",
    "Lớp học nghiêm cẩn trong trường dòng Công giáo với kỷ luật thép",
    "Cậu bé Fidel năng động và cừ khôi trên sân bóng chày trường học",
    "Chàng thiếu niên Fidel hùng biện đầy nhiệt huyết trong phòng tranh luận học sinh",
    "Giảng đường cổ kính Đại học La Habana rực sáng dưới ánh nắng thập niên 1940",
    "Sinh viên luật chăm chú ghi chép trong giảng đường luật Đại học La Habana",
    "Đại lộ La Habana sầm uất với xe cổ điển và những tòa nhà thuộc địa rực rỡ",

    # Phần 3 (18 - 30)
    "Cuộc biểu tình rực lửa của Đảng Chính thống tại quảng trường trung tâm La Habana",
    "Chàng luật sư trẻ Fidel Castro trước cổng tòa án La Habana thập niên 1950",
    "Đêm đảo chính quân sự năm 1952: Binh lính chiếm giữ các công sở trọng yếu",
    "Tướng Fulgencio Batista trong quân phục duyệt đội danh dự thiết lập chế độ độc tài",
    "Nhóm cách mạng trẻ bí mật nghiên cứu bản đồ Pháo đài Moncada trong căn phòng mờ tối",
    "Pháo đài quân sự Moncada sừng sững dưới nắng gắt Santiago de Cuba",
    "Bình minh rực lửa ngày 26 tháng 7 năm 1953: Cuộc tấn công mở màn vào Pháo đài Moncada",
    "Khói súng bốc lên từ chân tường pháo đài sau trận đánh quả cảm nhưng bất thành",
    "Binh sĩ giải Fidel Castro trong còng số 8 dọc hành lang nhà tù sau vụ tấn công",
    "Fidel Castro tự bào chữa trước tòa: 'Lịch sử sẽ xá tội cho tôi'",
    "Những trang bào chữa viết tay nảy lửa bên ngọn nến le lói trong phòng giam",
    "Căn phòng giam đá lạnh lẽo nơi Fidel Castro nghiền ngẫm tri thức và lý tưởng",
    "Ngọn lửa cách mạng bừng sáng trong bão táp, biểu tượng của Phong trào 26 tháng 7",

    # Phần 4 (31 - 42)
    "Cánh cổng nhà tù mở rộng năm 1955: Fidel Castro bước ra đón ánh bình minh tự do",
    "Đường phố Mexico City nhộn nhịp dưới chân những đỉnh núi lửa phủ tuyết",
    "Cuộc gặp gỡ định mệnh: Fidel Castro và Ernesto Che Guevara siết chặt tay nhau",
    "Bác sĩ trẻ Che Guevara với chiếc mũ nồi và túi cứu thương trên nẻo đường châu Mỹ",
    "Trại huấn luyện quân sự bí mật của các chiến sĩ cách mạng trên đất Mexico",
    "Bàn tay kiên định lau chùi và lắp ráp từng khẩu súng chuẩn bị ngày trở về",
    "Con tàu Granma chật chội vượt qua những đợt sóng biển đêm tối tăm gầm thét",
    "Tàu Granma cập bờ đá nhiệt đới Cuba trong màn sương mờ ảo lúc rạng đông",
    "Cuộc phục kích bất ngờ tại vùng đầm lầy ven biển khiến lực lượng bị phân tán",
    "Nhóm chiến sĩ ít ỏi kiệt sức nhưng kiên cường vượt qua cánh rừng rậm hiểm trở",
    "Trại du kích bí mật ẩn sâu trong sương mờ đỉnh núi rừng Sierra Maestra",
    "Người nông dân địa phương mang gùi lương thực tiếp tế cho nghĩa quân du kích",

    # Phần 5 (43 - 51)
    "Đoàn xe tải quân đội chính quy Batista tiến sâu vào hẻm núi Sierra Maestra",
    "Nghĩa quân du kích phục kích từ vách đá rừng rậm bẻ gãy chiến dịch của Batista",
    "Binh lính quân chính phủ rệu rã bỏ lại vũ khí, sụp đổ tinh thần chiến đấu",
    "Đoàn quân cách mạng tiến bước hùng dũng trong sự reo hò đón chào của nhân dân",
    "Thủ đô La Habana rực rỡ pháo hoa mừng chiến thắng trong đêm giao thừa 1959",
    "Chiếc máy bay bí mật cất cánh đưa nhà độc tài Batista chạy trốn trong đêm",
    "Biển người tràn ngập đại lộ trung tâm La Habana đón chào đoàn quân giải phóng",
    "Fidel Castro đứng trên xe bọc thép diễn thuyết trước hàng vạn người dân rực lửa",
    "Chính quyền cách mạng tiếp quản trụ sở chính phủ, mở ra trang sử mới cho Cuba",

    # Phần 6 (52 - 60)
    "Cuộc gặp xã giao đầy căng thẳng giữa Fidel Castro và Phó Tổng thống Nixon tại Washington",
    "Công nhân giương cờ mới trước cửa nhà máy đường: Khởi đầu công cuộc quốc hữu hóa",
    "Tàu chở hàng bị chặn ngoài khơi: Lệnh bao vây cấm vận thương mại bắt đầu siết chặt",
    "Bài phát biểu lịch sử kéo dài 4 tiếng của Fidel Castro tại Đại hội đồng Liên Hợp Quốc",
    "Biểu tượng hai bàn tay đứt đoạn phản ánh quan hệ ngoại giao Mỹ - Cuba rạn nứt",
    "Những kệ hàng trống trơn tại La Habana phản ánh thử thách khắc nghiệt của lệnh cấm vận",
    "Mỹ chính thức ký văn bản cắt đứt hoàn toàn quan hệ ngoại giao với Cuba tháng 1/1961",
    "Vết nứt chia cắt trên bản đồ biểu trưng cho cuộc đối đầu thế kỷ giữa hai quốc gia",
    "Vị lãnh tụ hùng biện hàng giờ đồng hồ dưới nắng gắt trước quảng trường vạn người",

    # Phần 7 (61 - 69)
    "Trại huấn luyện bí mật của lữ đoàn lính lưu vong do CIA bảo trợ trong rừng rậm",
    "Đội xuồng đổ bộ áp sát bờ biển đầm lầy Vịnh Con Lợn lúc rạng đông 17/4/1961",
    "Bãi biển Playa Girón chìm trong khói lửa khi lực lượng đổ bộ vấp phải hỏa lực chống trả",
    "Fidel Castro trực tiếp chỉ huy trên xe tăng dẫn đầu cuộc phản công quyết định",
    "Lực lượng dân quân cách mạng Cuba rầm rộ tiến ra tuyến đầu bảo vệ bờ cõi",
    "Binh lính đổ bộ giơ tay đầu hàng trên bãi cát Playa Girón sau 72 giờ giao tranh",
    "Vị tổng tư lệnh đứng hiên ngang trên bờ biển ngập khói súng trong chiều hoàng hôn chiến thắng",
    "Hàng triệu người dân Cuba tuần hành rực rỡ cờ hoa mừng chiến thắng Playa Girón",
    "Cây cọ kiên cường đứng vững giữa cuồng phong bão táp, biểu tượng bản lĩnh Cuba",

    # Phần 8 (70 - 79)
    "Cuộc gặp gỡ chiến lược cấp cao giữa phái đoàn Cuba và Liên Xô trong đại sảnh",
    "Tàu hàng Liên Xô bí mật bốc dỡ các khối thiết bị quân sự bọc kín dưới trăng",
    "Công binh dựng bệ phóng tên lửa ngụy trang trong rừng rậm nhiệt đới Cuba",
    "Máy bay trinh sát U-2 của Mỹ bay lượn trên bầu trời Cuba chụp ảnh các trận địa bí mật",
    "Phòng Tình huống Nhà Trắng căng thẳng tột độ nghiên cứu không ảnh tên lửa hạt nhân",
    "Hàng rào tàu chiến Hải quân Mỹ phong tỏa vùng biển Caribe ngăn chặn tàu Liên Xô",
    "Đồng hồ hạt nhân đếm ngược từng giây: Đỉnh điểm cuộc khủng hoảng 13 ngày nghẹt thở",
    "Gia đình Mỹ nín thở theo dõi bản tin phát thanh trực tiếp về nguy cơ thế chiến",
    "Washington và Moscow đạt thỏa thuận hạ nhiệt khủng hoảng vào ngày 28/10/1962",
    "Đoàn xe chuyển các tên lửa hạt nhân trở lại tàu hàng rút khỏi đất nước Cuba",

    # Phần 9 (80 - 94)
    "Cái bắt tay lịch sử thắm tình đồng chí giữa Fidel Castro và lãnh đạo Việt Nam",
    "Khung cảnh xóm làng Việt Nam hằn sâu vết bom đạn trong những năm kháng chiến ác liệt",
    "Mít tinh rực lửa tại La Habana ủng hộ cuộc đấu tranh vì độc lập của nhân dân Việt Nam",
    "Hàng hóa y tế và lương thực từ Cuba được khẩn trương bốc lên máy bay chi viện Việt Nam",
    "Đoàn xe chở phái đoàn Cuba vượt qua cầu phao dã chiến trên dòng sông giới tuyến 1973",
    "Vị nguyên thủ nước ngoài duy nhất rảo bước giữa vùng đất lửa Quảng Trị còn vương hố bom",
    "Cuộc mít tinh xúc động giữa đại ngàn Quảng Trị giải phóng chào đón Fidel Castro",
    "Fidel Castro và Thủ tướng Phạm Văn Đồng giương cao ngọn cờ giải phóng trên lễ đài",
    "Cái bắt tay ấm áp và nụ cười rạng rỡ của Fidel với những người lính và nông dân Việt Nam",
    "Khoảnh khắc lịch sử: Vị lãnh tụ vượt sông Bến Hải tiến vào vùng giải phóng miền Nam",
    "Lán họp dã chiến đơn sơ trong vùng giải phóng: Tình đồng chí keo sơn không khoảng cách",
    "Thiếu nhi Việt Nam hân hoan vẫy cờ hoa đón chào người bạn lớn bên kia đại dương",
    "Hai lá cờ Việt Nam và Cuba tung bay sát cánh bên nhau trước gió đại ngàn",
    "Chuyến thăm chính thức Việt Nam năm 1995: Tình hữu nghị bền chặt qua nhiều thập kỷ",
    "Tượng đài hữu nghị Việt Nam - Cuba sừng sững giữa đất trời Quảng Trị thanh bình",

    # Phần 10 (95 - 106)
    "Trạm xá y tế nông thôn hiện đại và tận tụy phục vụ người dân trên đảo quốc Cuba",
    "Lớp học sáng rực nụ cười trẻ thơ: Xóa mù chữ toàn dân và giáo dục hoàn toàn miễn phí",
    "Đoàn y bác sĩ Cuba khoác áo blouse lên đường thực hiện sứ mệnh nhân đạo quốc tế",
    "Vinh danh những đóng góp to lớn của Cuba cho phong trào hòa bình và giải phóng dân tộc",
    "Đại hội đại biểu toàn quốc: Trung tâm lãnh đạo và định hướng phát triển đất nước",
    "Cán cân lịch sử: Thành tựu y tế giáo dục rực rỡ song hành cùng những thách thức thời đại",
    "Những góc nhìn đối lập về mô hình phát triển chính trị xã hội của đảo quốc",
    "Bóng đêm gián điệp và mạng lưới điệp viên rình rập quanh đảo quốc suốt nửa thế kỷ",
    "Kế hoạch ám sát bất thành: Xì gà phát nổ và những âm mưu kỳ quái của đối phương",
    "Nụ cười sảng khoái và phong thái tự tin của Fidel khi trả lời phỏng vấn báo chí quốc tế",
    "Làng chài ven biển thanh bình: Cuộc sống người dân vẫn kiên cường vượt khó",
    "Chiếc xe hơi cổ điển chạy bon bon trên đại lộ Malecón, biểu tượng bền bỉ của La Habana",

    # Phần 11 (107 - 114)
    "Vị lãnh tụ tuổi xế chiều an nhiên ngồi nghỉ bên hiên nhà rợp bóng cây xanh",
    "Căn phòng bệnh viện năm 2006: Giờ phút sinh tử và quyết định chuyển giao quyền lực",
    "Hai người đồng chí trọn đời: Fidel chuyển giao trọng trách điều hành cho người em Raul Castro",
    "Ngòi bút chính luận sắc sảo của Fidel trong những năm tháng tĩnh dưỡng tuổi già",
    "Bài phát biểu xúc động tại Đại hội Đảng 2016: Lời từ biệt thanh thản của vị đại thụ",
    "Dòng sông thời gian: Cuộc đời 90 năm cống hiến trọn vẹn cho lý tưởng cách mạng",
    "Bước chân chậm rãi trên con đường rực sắc hoa nhiệt đới lúc xế chiều",
    "Chiếc ghế bành đơn sơ và ngọn đèn bàn trầm mặc trong phòng làm việc quen thuộc",

    # Phần 12 (115 - 125)
    "Bản tin truyền hình đặc biệt tối 25/11/2016: Trân trọng thông báo Fidel Castro từ trần",
    "Người dân La Habana nghẹn ngào thắp nến trắng tiếc thương vị tổng tư lệnh kính yêu",
    "Hai luồng cảm xúc: Nỗi tiếc thương sâu sắc ở quê nhà đối lập tiếng reo hò nơi hải ngoại",
    "Lễ quốc tang trang nghiêm: Hàng triệu người tiễn đưa Fidel trên chặng đường cuối",
    "Cổng Đại sứ quán Cuba tại Hà Nội ngập tràn hoa tươi và những dòng tưởng niệm",
    "Lãnh đạo và nhân dân Việt Nam trang trọng đặt bút ký vào sổ tang tưởng nhớ Fidel",
    "Khối đá giản dị tại nghĩa trang Santa Ifigenia: Nơi an nghỉ vĩnh hằng của người anh hùng",
    "Bức tranh toàn cảnh lịch sử: Từ cậu bé Biran đến tượng đài bất tử của thế kỷ 20",
    "Đôi bàn tay gìn giữ bức ảnh lịch sử: Minh chứng cho tình bạn thủy chung Việt Nam - Cuba",
    "Ánh bình minh rạng rỡ kết nối biển trời Caribe và bờ biển phương Đông",
    "Bầu trời La Habana bình yên trong sớm mai: Bản hùng ca về người bạn lớn sống mãi",
]

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--section", type=str, default="all", help="part1..part12 or 'all' or 'meta_only'")
    args = parser.parse_args()

    # Xuất metadata thành JSON
    meta_path = Path("src/data/fidel_chapters.json")
    meta_path.parent.mkdir(parents=True, exist_ok=True)

    chapters_export = []
    desc_idx = 0
    for sec in FIDEL_SECTIONS:
        start_img, end_img = sec["image_range"]
        images = []
        descriptions = []
        for i in range(start_img, end_img + 1):
            images.append(f"images/fidel-castro/{i:03d}.png")
            descriptions.append(IMAGE_DESCRIPTIONS[desc_idx])
            desc_idx += 1

        chapters_export.append({
            "id": sec["id"],
            "chapter_num": sec["chapter_num"],
            "title": sec["title"],
            "subtitle": sec["subtitle"],
            "historical_era": sec["historical_era"],
            "images": images,
            "image_descriptions": descriptions,
            "word_count": len(sec["text"].split()),
            "audio_file": f"audio/fidel_{sec['id']}.wav"
        })

    meta_path.write_text(json.dumps(chapters_export, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Đã xuất metadata 12 chapters tại: {meta_path}")

    if args.section == "meta_only":
        return

    # Khởi tạo VieNeu-TTS
    from vieneu import Vieneu
    print("🚀 Khởi tạo VieNeu-TTS (mode='v3turbo', GPU RTX 3060, mặc định: Trúc Ly)...")
    tts = Vieneu()

    out_dir = Path("public/audio")
    out_dir.mkdir(parents=True, exist_ok=True)

    for sec in FIDEL_SECTIONS:
        if args.section != "all" and args.section != sec["id"]:
            continue

        target_wav = out_dir / f"fidel_{sec['id']}.wav"
        if target_wav.exists() and args.section == "all":
            print(f"⏩ Đã tồn tại {target_wav}, bỏ qua.")
            continue

        print(f"\n==================================================")
        print(f"🎙️ Đang sinh audio cho [{sec['id']}] - {sec['title']}")
        print(f"📝 Số từ: {len(sec['text'].split())} từ")
        t0 = time.time()
        audio = tts.infer(sec["text"], voice="Trúc Ly")
        t_gen = time.time() - t0
        tts.save(audio, str(target_wav))

        sr = 48000
        dur_s = len(audio) / sr if hasattr(audio, "__len__") else 0
        rtf = t_gen / dur_s if dur_s > 0 else 0
        print(f"✅ Đã lưu: {target_wav}")
        print(f"📊 Thời lượng: {dur_s:.1f}s ({dur_s/60:.2f} phút) | Thời gian sinh: {t_gen:.1f}s | RTF: {rtf:.3f}x")

if __name__ == "__main__":
    main()
