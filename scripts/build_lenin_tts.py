# -*- coding: utf-8 -*-
"""
Script phân tách kịch bản 'LENIN: TỪ CẬU BÉ SIMBIRSK ĐẾN NGƯỜI KIẾN TẠO LIÊN XÔ' thành 13 phần
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

LENIN_SECTIONS = [
    {
        "id": "part1",
        "chapter_num": 1,
        "title": "Mở Đầu: Bí Danh Làm Rung Chuyển Thế Giới",
        "subtitle": "Từ cậu bé Simbirsk đến kiến trúc sư nhà nước cộng sản đầu tiên",
        "historical_era": "1870 - 1924 · TỔNG QUAN",
        "image_range": (1, 7),
        "text": """Ngày 21 tháng 1 năm 1924, tại một ngôi làng nhỏ gần Moscow có tên Gorki, một người đàn ông năm mươi ba tuổi trút hơi thở cuối cùng sau nhiều tháng vật lộn với bệnh tật.

Chỉ vài ngày sau, thi thể ông được ướp xác, đặt vào một lăng mộ ngay giữa Quảng trường Đỏ — nơi đến tận ngày hôm nay, gần một trăm năm sau, hàng nghìn người vẫn xếp hàng mỗi năm để nhìn tận mắt gương mặt ông một lần.

Người đàn ông đó, khi sinh ra, mang một cái tên hoàn toàn khác: Vladimir Ilyich Ulyanov. Cái tên "Lenin" chỉ là một bí danh ông tự đặt cho mình khi còn hoạt động bí mật, trốn tránh cảnh sát mật của Sa hoàng.

Nhưng đến khi ông qua đời, cái bí danh đó đã trở thành một trong những cái tên có sức nặng nhất của thế kỷ 20 — người sáng lập ra nhà nước cộng sản đầu tiên trên thế giới, người mà chỉ trong vòng chưa đầy ba mươi năm, đã đi từ một cậu học sinh giỏi ở một tỉnh lẻ nước Nga, trở thành kiến trúc sư của một cuộc cách mạng làm rung chuyển toàn bộ trật tự thế giới.

Vậy điều gì đã biến một cậu bé ngoan, học giỏi, con trai của một quan chức giáo dục tỉnh lẻ, thành một trong những nhà cách mạng quyết liệt và gây tranh cãi nhất trong lịch sử nhân loại?

Câu trả lời, như chúng ta sẽ thấy, bắt đầu từ một bi kịch gia đình — và từ đó, không bao giờ dừng lại."""
    },
    {
        "id": "part2",
        "chapter_num": 2,
        "title": "Tuổi Thơ Bên Dòng Sông Volga",
        "subtitle": "Gia đình gia giáo và những năm tháng êm đềm ở Simbirsk",
        "historical_era": "1870 - 1885 · SIMBIRSK",
        "image_range": (8, 17),
        "text": """Vladimir Ilyich Ulyanov chào đời ngày 22 tháng 4 năm 1870, tại thị trấn Simbirsk, nằm bên dòng sông Volga — ngày nay thành phố này đã được đổi tên thành Ulyanovsk, để vinh danh chính ông.

Gia đình Ulyanov không phải là gia đình nghèo khó hay bị áp bức như hình ảnh nhiều người vẫn tưởng tượng về một nhà cách mạng cộng sản. Ngược lại, đây là một gia đình trung lưu khá giả, thậm chí có phần gốc gác quý tộc nhỏ. Cha ông, Ilya Nikolaevich Ulyanov, là một thanh tra trường học của tỉnh Simbirsk — một vị trí có địa vị đáng kể trong bộ máy quan liêu của Đế quốc Nga, đủ để đưa gia đình vào hàng ngũ quý tộc nhỏ. Mẹ ông, Maria Alexandrovna, xuất thân từ một gia đình bác sĩ thành đạt ở Saint Petersburg, và chính bà là người trực tiếp chăm lo việc học hành cho các con, gieo vào lòng tất cả những đứa trẻ trong nhà một tình yêu bền vững với tri thức và sách vở.

Gia đình Ulyanov có tới tám người con, trong đó ba người mất từ nhỏ, còn lại năm anh chị em lớn lên cùng nhau: người anh cả Aleksandr, chị gái Anna, rồi đến Vladimir, và sau đó là các em Olga, Maria và Dmitri.

Tuổi thơ của Vladimir, theo nhiều ghi chép, khá êm đềm và không có gì đặc biệt. Cậu là một học sinh xuất sắc, chăm chỉ, và ngôi nhà của gia đình Ulyanov thường xuyên tràn ngập những cuộc tranh luận sôi nổi về tình hình đất nước Nga — điều mà sau này người em gái của Vladimir còn nhớ lại rất rõ trong hồi ký của mình.

Không có bất kỳ dấu hiệu nào, ở giai đoạn này, cho thấy đứa trẻ này — hay bất kỳ ai trong số các anh chị em của cậu — sẽ từ bỏ con đường công chức yên ổn để bước vào hàng ngũ của phong trào cách mạng Nga, vốn đang âm ỉ phát triển dưới lòng đất trong suốt những năm 1880.

Nhưng rồi, giữa thập niên 1880, hai bi kịch liên tiếp ập đến, và không gì trong gia đình Ulyanov còn như cũ nữa."""
    },
    {
        "id": "part3",
        "chapter_num": 3,
        "title": "Bi Kịch Kép: Bước Ngoặt Sinh Tử",
        "subtitle": "Cái chết của người cha và giá treo cổ của anh trai Aleksandr",
        "historical_era": "1886 - 1887 · BẢN ÁN TỬ HÌNH",
        "image_range": (18, 29),
        "text": """Năm 1886, khi Vladimir mới mười sáu tuổi, cha ông, Ilya Ulyanov, đột ngột qua đời. Ngay trước đó, ông còn từng bị chính quyền Sa hoàng — vốn luôn nghi ngại về ảnh hưởng của giáo dục công đối với xã hội Nga — đe dọa buộc về hưu sớm.

Nỗi đau mất cha chưa kịp nguôi ngoai, thì chỉ một năm sau, năm 1887, một bi kịch còn lớn hơn nhiều ập xuống gia đình này.

Aleksandr — người anh trai cả mà Vladimir luôn ngưỡng mộ — khi đó đang là sinh viên tại Saint Petersburg, bị bắt giữ. Không ai trong gia đình hay biết, nhưng Aleksandr đã âm thầm tham gia vào một nhóm âm mưu ám sát Sa hoàng Alexander Đệ Tam, bằng một quả bom tự chế. Âm mưu bị phát hiện trước khi kịp thực hiện.

Aleksandr bị đưa ra xét xử. Anh nhận tội, và từ chối xin ân xá. Ngày 8 tháng 5 năm 1887, Aleksandr Ulyanov bị treo cổ.

Đây chính là khoảnh khắc bản lề trong toàn bộ cuộc đời Vladimir Ulyanov, dù sau này, chính ông không bao giờ công khai thừa nhận rằng cái chết của anh trai đã trực tiếp định hình con đường chính trị của mình. Nhưng gần như tất cả các nhà viết tiểu sử về sau đều đồng ý: hai cú sốc liên tiếp này — mất cha, rồi mất anh trai vì bản án tử hình chính trị — đã đóng vai trò quyết định trong việc định hình con đường tương lai của ông.

Gia đình Ulyanov, vốn từng được kính trọng trong xã hội Simbirsk, giờ đây bị hắt hủi, bị xa lánh bởi cả những vòng bạn bè tự do trước đây. Người ta tránh xa gia đình có một kẻ phản loạn bị hành quyết.

Có một chi tiết rất đáng chú ý, sau này được kể lại nhiều lần: trước khi anh trai bị bắt, Vladimir từng nghĩ rằng Aleksandr, với niềm say mê nghiên cứu sinh vật học, sẽ không bao giờ trở thành một nhà cách mạng. Vladimir từng nói, đại ý, một người dành quá nhiều thời gian nghiên cứu giun đất thì không thể nào là một nhà cách mạng được.

Ông đã nhầm. Và có lẽ chính sự nhầm lẫn đó, cộng với nỗi đau mất anh, đã khiến Vladimir quyết tâm không đi vào vết xe đổ của Aleksandr — không hành động đơn lẻ, bốc đồng, dễ bị đàn áp — mà phải tìm ra một con đường có tổ chức, có hệ thống, đủ sức mạnh để thực sự lật đổ cả một chế độ. Sau này, ông từng nói một câu được trích dẫn rất nhiều: con đường đã được người anh trai của ông mở lối.

Ngay năm anh trai bị hành quyết, Vladimir vẫn tốt nghiệp trung học với tấm huy chương vàng, và ghi danh vào Đại học Kazan để học luật — một phần nhờ sự bảo trợ của chính hiệu trưởng trường cũ của ông, người đã đứng ra bảo lãnh dù biết rõ thân phận em trai của kẻ phản loạn của Vladimir.

Nhưng ông không học được lâu."""
    },
    {
        "id": "part4",
        "chapter_num": 4,
        "title": "Bị Đuổi Học & Gặp Gỡ Tư Tưởng Marx",
        "subtitle": "Từ sinh viên luật bị cấm túc đến người Marxist kiên định",
        "historical_era": "1887 - 1893 · BƯỚC VÀO CON ĐƯỜNG MARX",
        "image_range": (30, 38),
        "text": """Chỉ vài tháng sau khi nhập học, Vladimir Ulyanov tham gia vào một cuộc biểu tình của sinh viên phản đối các quy định hà khắc của nhà trường. Ông bị bắt giữ, rồi bị đuổi học ngay lập tức. Lý do chính thức là tham gia biểu tình, nhưng gần như chắc chắn rằng cái bóng của người anh trai đã bị hành quyết cũng là một yếu tố quan trọng khiến nhà chức trách quyết định xử lý nghiêm khắc với ông — ông bị chính quyền coi là một trường hợp cần phải làm gương cho các sinh viên khác.

Bị đuổi khỏi trường đại học, Vladimir trở về sống cùng gia đình tại một trang trại nhỏ của gia đình bên dòng sông Volga. Và chính tại đây, trong quãng thời gian tưởng chừng là một bước lùi trong cuộc đời, ông lần đầu tiên đọc các tác phẩm của Karl Marx.

Ông đọc ngấu nghiến. Không chỉ Marx, mà cả những nhà tư tưởng cấp tiến Nga khác, cố gắng tìm hiểu xem điều gì đã khiến người anh trai của mình sẵn sàng hy sinh mạng sống cho một lý tưởng.

Đến đầu những năm 1890, Vladimir đã trở thành một người theo chủ nghĩa Marx đầy tâm huyết. Tháng 1 năm 1889, ông chính thức tuyên bố mình là một người Marxist.

Dù bị đuổi học, ông vẫn được phép tiếp tục theo học luật theo hình thức tự học từ xa, và cuối cùng đã vượt qua các kỳ thi để lấy bằng luật vào năm 1891 — với kết quả xuất sắc ngang bằng những sinh viên chính quy giỏi nhất.

Nhưng con đường sự nghiệp luật sư truyền thống không phải là điều Vladimir Ulyanov hướng tới. Đến năm 1893, ông chuyển đến Saint Petersburg, nơi ông nhanh chóng tìm được những nhóm hoạt động Marxist cùng chí hướng, kêu gọi lật đổ chế độ chuyên chế của Sa hoàng."""
    },
    {
        "id": "part5",
        "chapter_num": 5,
        "title": "Tù Đày Siberia & Bí Danh 'Lenin'",
        "subtitle": "Nghiên cứu Tư bản luận, thành lập tờ báo Iskra và ra đời phái Bolshevik",
        "historical_era": "1895 - 1903 · LƯU ĐÀY & ĐẢNG BOLSHEVIK",
        "image_range": (39, 50),
        "text": """Hoạt động cách mạng bí mật không thể kéo dài mãi mà không bị phát hiện. Cuối năm 1895, Vladimir Ulyanov bị bắt giữ và bị giam mười bốn tháng trong tù trước khi bị kết án.

Năm 1897, ông bị đày đến Siberia trong thời hạn ba năm — cụ thể là đến một ngôi làng có tên Shushenskoye. Có một chi tiết khá thú vị và ít người ngờ tới: chuyến đi đày ải đến Siberia của ông lại được thực hiện bằng toa tàu hạng nhất, và một khi đến nơi, ông được phép tự do viết lách, đọc sách, và tiếp tục các hoạt động lý luận chính trị của mình — một mức độ lưu đày khoan dung hơn nhiều so với những gì người ta thường hình dung.

Chính trong thời gian bị lưu đày ở Siberia, ông đã đọc kỹ và nghiên cứu sâu bộ Tư bản luận của Marx, và bắt đầu định hình nên học thuyết chính trị của riêng mình — thứ sau này sẽ được gọi là chủ nghĩa Lenin. Cũng chính trong giai đoạn này, ông kết hôn với Nadezhda Krupskaya, một nhà hoạt động cách mạng khác, người sẽ đồng hành cùng ông trong suốt quãng đời còn lại.

Sau khi mãn hạn lưu đày năm 1900, Vladimir rời nước Nga sang Tây Âu, nơi ông tiếp tục các hoạt động cách mạng của mình mà không bị cảnh sát mật Sa hoàng theo dõi sát sao như ở quê nhà. Ông cùng các đồng chí sáng lập tờ báo bí mật mang tên Iskra — nghĩa là Tia lửa — với mục tiêu thống nhất phong trào Marxist ở Nga và châu Âu.

Và chính trong giai đoạn sống lưu vong này, vào khoảng năm 1901, ông bắt đầu sử dụng bí danh "Lenin" — cái tên mà lịch sử sẽ nhớ đến ông nhiều nhất, hơn hẳn tên thật Ulyanov.

Năm 1903, tại Đại hội lần thứ hai của Đảng Công nhân Dân chủ Xã hội Nga, tổ chức một phần ở London, một phần ở Brussels, xảy ra một cuộc chia rẽ mang tính lịch sử. Phe của Lenin, sau khi giành được đa số phiếu trong một cuộc bỏ phiếu về tiêu chí kết nạp đảng viên, tự gọi mình là Bolshevik — nghĩa là phe đa số. Phe đối lập với ông trở thành Menshevik — nghĩa là phe thiểu số.

Đây chính là thời điểm ra đời của đảng Bolshevik — tổ chức mà mười bốn năm sau sẽ nắm quyền lực tối cao ở nước Nga."""
    },
    {
        "id": "part6",
        "chapter_num": 6,
        "title": "Cách Mạng 1905 & Thập Kỷ Lưu Vong Châu Âu",
        "subtitle": "Ngọn lửa bùng phát ở Nga và lập trường kiên quyết phản đối Thế chiến I",
        "historical_era": "1904 - 1916 · THẬP KỶ LƯU VONG",
        "image_range": (51, 60),
        "text": """Năm 1904, Nga bước vào cuộc chiến tranh với Nhật Bản — một cuộc chiến mà Nga thua thảm hại, làm bộc lộ rõ sự yếu kém và mục ruỗng của chế độ Sa hoàng.

Sự bất mãn tích tụ trong xã hội Nga bùng nổ thành cuộc Cách mạng năm 1905 — với các cuộc bạo loạn, đình công lan rộng khắp đất nước. Lenin trở về Nga trong giai đoạn này để trực tiếp tham gia phong trào.

Nhưng cuộc cách mạng 1905 cuối cùng thất bại. Sa hoàng Nicholas Đệ Nhị, dưới áp lực, ban đầu đã hứa hẹn một loạt cải cách — bao gồm việc thành lập một Duma, tức Nghị viện. Nhưng một khi trật tự được vãn hồi, phần lớn những cải cách đó bị chính Sa hoàng vô hiệu hóa hoặc rút lại. Đến năm 1907, Lenin buộc phải rời khỏi nước Nga một lần nữa, bắt đầu một giai đoạn lưu vong kéo dài suốt mười năm.

Trong suốt thập kỷ này, Lenin di chuyển khắp châu Âu — sống ở nhiều thành phố khác nhau — không ngừng viết lách, biên tập báo chí cách mạng, xây dựng và củng cố mạng lưới đảng Bolshevik, dù phần lớn thời gian ông sống trong cảnh thiếu thốn tài chính và luôn phải cảnh giác trước sự theo dõi của mật vụ.

Khi Thế chiến thứ nhất bùng nổ năm 1914, hầu hết các đảng xã hội chủ nghĩa lớn ở châu Âu — kể cả những đảng từng tuyên bố phản đối chiến tranh đế quốc — đều quay sang ủng hộ chính phủ nước mình tham chiến. Lenin cực lực phản đối lập trường này. Ông coi cuộc chiến chỉ đơn thuần là một cuộc chiến tranh đế quốc, tranh giành lợi ích giữa các tầng lớp tư bản cầm quyền, và kêu gọi binh lính ở khắp các quốc gia hãy quay súng chống lại chính giới cầm quyền đã đẩy họ vào chiến hào, biến chiến tranh đế quốc thành nội chiến giai cấp.

Lập trường cực đoan này khiến Lenin trở thành một trong những gương mặt cầm đầu của phe cánh tả cấp tiến nhất trong phong trào xã hội chủ nghĩa quốc tế — nhưng đồng thời cũng khiến ông bị cô lập với phần lớn các đồng minh cánh tả ôn hòa hơn ở châu Âu.

Đến năm 1917, phần lớn thời gian này, Lenin sống tại Zurich, Thụy Sĩ — tại một căn hộ nhỏ trên con phố Spiegelgasse. Không một ai vào thời điểm đó, kể cả chính Lenin, có thể ngờ rằng chỉ vài tháng sau, ông sẽ trở thành người đứng đầu một trong những quốc gia lớn nhất thế giới."""
    },
    {
        "id": "part7",
        "chapter_num": 7,
        "title": "Nước Nga Sụp Đổ & Chuyến Tàu Niêm Phong",
        "subtitle": "Sa hoàng thoái vị, hành trình xuyên Đức và Luận cương Tháng Tư",
        "historical_era": "1917 · CHUYẾN TÀU ĐỊNH MỆNH",
        "image_range": (61, 70),
        "text": """Đến năm 1917, nước Nga đã kiệt quệ hoàn toàn sau ba năm tham gia Thế chiến thứ nhất. Thương vong của quân đội Nga lớn hơn bất kỳ quốc gia nào khác trong cuộc chiến này. Nền kinh tế đình trệ nghiêm trọng vì gánh nặng chiến tranh, và đến tháng 3 năm 1917, các cuộc bạo loạn và đình công vì thiếu lương thực bùng nổ dữ dội tại thủ đô Petrograd.

Chỉ trong vài ngày, chế độ quân chủ tồn tại hơn ba trăm năm của dòng họ Romanov sụp đổ. Sa hoàng Nicholas Đệ Nhị buộc phải thoái vị. Một Chính phủ Lâm thời được thành lập để điều hành đất nước trong giai đoạn chuyển tiếp.

Đây chính là cơ hội mà Lenin đã chờ đợi suốt hơn hai mươi năm.

Nhưng có một vấn đề: ông đang ở Thụy Sĩ, cách nước Nga hàng nghìn cây số, và nước Đức — quốc gia mà Nga đang giao chiến — nằm chắn ngay giữa đường về.

Chính quyền Đức, dù đang là kẻ thù trực tiếp của Nga trên chiến trường, lại nhìn thấy một cơ hội chiến lược trong việc đưa Lenin trở về nước Nga. Logic của họ rất đơn giản: nếu Lenin — một người công khai phản đối chiến tranh và muốn Nga rút khỏi cuộc chiến — trở về và gây bất ổn chính trị, điều đó sẽ làm suy yếu nỗ lực chiến tranh của Nga, có lợi cho nước Đức.

Vì vậy, chính quyền Đức đã cho phép Lenin cùng một nhóm các nhà cách mạng khác đi qua lãnh thổ Đức trên một toa tàu được niêm phong kín — nghĩa là đoàn tàu này không được phép dừng lại hay có bất kỳ liên hệ nào với lãnh thổ Đức trong suốt hành trình, để tránh bị cáo buộc là gián điệp hay cấu kết với kẻ thù.

Ngày 3 tháng 4 năm 1917, Lenin đặt chân trở lại Petrograd sau mười năm lưu vong. Ông lập tức công bố một cương lĩnh chính trị gây chấn động, sau này được gọi là Luận cương Tháng Tư — kêu gọi chấm dứt ngay lập tức sự ủng hộ dành cho Chính phủ Lâm thời, rút Nga khỏi chiến tranh ngay lập tức, và chuyển giao toàn bộ quyền lực cho các Xô Viết — tức là các hội đồng công nhân và binh lính.

Nhiều đồng chí Bolshevik, ngay cả những người thân cận nhất, ban đầu cho rằng cương lĩnh này quá cực đoan, quá vội vàng. Nhưng Lenin kiên quyết bảo vệ lập trường của mình, và dần dần thuyết phục được toàn bộ đảng đi theo hướng đó.

Trong khi đó, Chính phủ Lâm thời, dưới sự lãnh đạo sau này của Aleksandr Kerensky, ngày càng suy yếu — vừa không giải quyết được khủng hoảng lương thực, vừa tiếp tục theo đuổi cuộc chiến tranh vốn đã khiến người dân Nga kiệt quệ và phẫn nộ."""
    },
    {
        "id": "part8",
        "chapter_num": 8,
        "title": "Cách Mạng Tháng Mười: Đêm Lịch Sử",
        "subtitle": "Hồng vệ binh chiếm giữ Petrograd và quyền lực về tay Xô Viết",
        "historical_era": "THÁNG 10/1917 · CÁCH MẠNG THÁNG MƯỜI",
        "image_range": (71, 79),
        "text": """Đến tháng 10 năm 1917 — theo lịch cũ của Nga, tức là đầu tháng 11 theo lịch phương Tây hiện đại — Lenin nhận thấy thời cơ đã chín muồi.

Trong khi Chính phủ Lâm thời ngày càng mất uy tín và mất kiểm soát, các Xô Viết — đặc biệt là Xô Viết Petrograd — ngày càng ngả về phía đảng Bolshevik. Lenin, dù phải trốn tránh và cải trang trong nhiều tuần vì lệnh truy nã của chính quyền, vẫn kiên trì thuyết phục Ban Chấp hành Trung ương đảng Bolshevik rằng đây chính là thời điểm để hành động, không thể trì hoãn thêm.

Đêm 24 rạng sáng 25 tháng 10 theo lịch cũ, các lực lượng Hồng vệ binh dưới sự chỉ đạo của đảng Bolshevik bắt đầu chiếm giữ các vị trí trọng yếu tại Petrograd — nhà ga, bưu điện, ngân hàng, các trạm điện thoại. Điều đáng kinh ngạc là giai đoạn đầu của cuộc chính biến này diễn ra gần như không đổ máu, không có giao tranh đáng kể nào. Chính phủ Lâm thời, vốn đã mất gần như toàn bộ sự ủng hộ và khả năng phòng thủ thực chất, sụp đổ nhanh chóng.

Cuộc chính biến này, sau này được biết đến rộng rãi với tên gọi Cách mạng Tháng Mười, thực chất — theo nhận định của nhiều nhà sử học — mang bản chất gần với một cuộc đảo chính có tổ chức hơn là một cuộc cách mạng quần chúng nổi dậy tự phát như hình ảnh tuyên truyền sau này vẫn thường mô tả.

Chỉ trong một đêm, Lenin — người đàn ông vài tháng trước còn phải sống lưu vong và trốn chui trốn lủi — giờ đây trở thành người đứng đầu chính phủ mới của nước Nga."""
    },
    {
        "id": "part9",
        "chapter_num": 9,
        "title": "Hiệp Ước Brest-Litovsk & Nguy Cơ Nội Xâm",
        "subtitle": "Cái giá đắt của hòa bình và sự trỗi dậy của phe Bạch vệ",
        "historical_era": "1918 · HIỆP ƯỚC BREST-LITOVSK",
        "image_range": (80, 87),
        "text": """Một trong những ưu tiên hàng đầu của Lenin ngay khi nắm quyền là thực hiện đúng lời hứa đã đưa ra: đưa nước Nga ra khỏi Thế chiến thứ nhất bằng mọi giá.

Tháng 3 năm 1918, chính quyền Bolshevik ký Hiệp ước Brest-Litovsk với Đức. Đây là một hiệp ước cực kỳ khắc nghiệt đối với nước Nga — Nga buộc phải nhượng lại những vùng lãnh thổ rộng lớn, bao gồm Ukraine, các nước vùng Baltic, và một phần Ba Lan, cùng với đó là mất đi một phần đáng kể dân số, đất nông nghiệp và năng lực công nghiệp.

Nhiều người trong nội bộ đảng Bolshevik, bao gồm cả những đồng chí thân cận của Lenin, phản đối kịch liệt các điều khoản nhục nhã này. Nhưng Lenin kiên quyết bảo vệ quyết định ký hiệp ước, với lý lẽ rất thực dụng: nhà nước Xô Viết non trẻ cần thời gian để tồn tại và củng cố, và không thể nào vừa chống lại quân Đức ở bên ngoài, vừa phải đối phó với vô số kẻ thù chính trị ở bên trong.

Và quả thật, kẻ thù bên trong không hề ít.

Gần như ngay khi vừa giành được chính quyền, chính phủ Bolshevik non trẻ đã phải đối mặt với sự phản kháng dữ dội từ nhiều phía — được gọi chung là phe Bạch vệ — bao gồm các cựu tướng lĩnh, đô đốc thời Sa hoàng, cùng nhiều lực lượng chính trị khác không chấp nhận chính quyền Bolshevik. Cuộc Nội chiến Nga chính thức bùng nổ, và sẽ kéo dài suốt ba năm đẫm máu, cho đến năm 1921 mới cơ bản kết thúc.

Điều đáng chú ý là phe Bạch vệ, trong cuộc nội chiến này, còn nhận được sự hỗ trợ về tài chính và quân sự từ chính các cường quốc từng là đồng minh của Nga trong Thế chiến thứ nhất — Anh, Pháp, và một số nước khác — những nước lo ngại sâu sắc trước sự trỗi dậy của một nhà nước cộng sản ngay giữa lòng châu Âu."""
    },
    {
        "id": "part10",
        "chapter_num": 10,
        "title": "Nội Chiến, Khủng Bố Đỏ & Cộng Sản Thời Chiến",
        "subtitle": "Vụ ám sát hụt, cảnh sát mật Cheka và thảm họa kinh tế",
        "historical_era": "1918 - 1921 · NỘI CHIẾN NGA",
        "image_range": (88, 97),
        "text": """Giữa cuộc nội chiến khốc liệt, đối mặt với kẻ thù ở khắp mọi phía và nguy cơ chính quyền non trẻ của mình có thể sụp đổ bất cứ lúc nào, Lenin đưa ra một loạt quyết định mà cho đến ngày nay vẫn còn gây tranh cãi dữ dội.

Tháng 8 năm 1918, sau một vụ ám sát hụt nhắm vào chính Lenin — ông bị bắn trọng thương nhưng may mắn sống sót — chính quyền Bolshevik chính thức phát động một chiến dịch trấn áp có hệ thống, được biết đến với cái tên Khủng bố Đỏ.

Chiến dịch này được thực hiện chủ yếu thông qua Cheka — lực lượng cảnh sát mật do chính Lenin thành lập ngay từ những ngày đầu sau Cách mạng Tháng Mười — với mục tiêu tiêu diệt bất kỳ ai bị coi là kẻ thù của cách mạng, hoặc thậm chí chỉ đơn thuần là thành phần phản cách mạng tiềm tàng dựa trên xuất thân giai cấp.

Trên thực tế, những hành vi bạo lực từ phía các lực lượng Hồng vệ binh, thủy thủ và binh lính Bolshevik đã âm ỉ diễn ra từ cuối năm 1917, ngay sau khi cách mạng thành công — chứ không phải đợi đến sự kiện ám sát hụt năm 1918 mới bắt đầu. Vụ ám sát chỉ là cái cớ để chính thức hóa và leo thang quy mô của chiến dịch trấn áp này.

Song song với Khủng bố Đỏ, chính quyền Lenin cũng áp dụng một chính sách kinh tế cực đoan trong thời chiến, được gọi là Chủ nghĩa Cộng sản thời chiến — quốc hữu hóa gần như toàn bộ công nghiệp, và đặc biệt là trưng thu lương thực bắt buộc từ nông dân để nuôi quân đội và các thành phố. Chính sách này, dù giúp chính quyền Bolshevik duy trì được cuộc chiến, lại gây ra sự oán giận sâu sắc trong tầng lớp nông dân, và góp phần không nhỏ vào nạn đói khủng khiếp diễn ra ngay sau đó.

Cuộc nội chiến cuối cùng kết thúc với chiến thắng thuộc về phe Bolshevik vào khoảng năm 1921, nhưng đất nước Nga khi đó đã kiệt quệ đến mức gần như sụp đổ hoàn toàn — công nghiệp đình trệ, nông nghiệp tan hoang, và nạn đói hoành hành ở nhiều vùng, cướp đi sinh mạng của hàng triệu người."""
    },
    {
        "id": "part11",
        "chapter_num": 11,
        "title": "Chính Sách Kinh Tế Mới (NEP): Lùi Để Tiến",
        "subtitle": "Nhân nhượng thị trường tự do để cứu vãn chính quyền non trẻ",
        "historical_era": "1921 - 1922 · CHÍNH SÁCH NEP",
        "image_range": (98, 103),
        "text": """Đối mặt với thực trạng kinh tế tan hoang và làn sóng bất mãn ngày càng lan rộng — bao gồm cả những cuộc nổi dậy từ chính những người từng ủng hộ nhiệt thành nhất cho cách mạng — Lenin đưa ra một quyết định khiến nhiều người trong nội bộ đảng kinh ngạc.

Năm 1921, ông công bố Chính sách Kinh tế Mới, thường được viết tắt là NEP. Đây là một sự thụt lùi có tính toán khỏi mô hình kinh tế cộng sản thuần túy: cho phép một mức độ thương mại tư nhân nhất định được hoạt động trở lại, cho phép nông dân bán một phần sản phẩm dư thừa của mình trên thị trường tự do thay vì bị trưng thu toàn bộ.

Đây là một quyết định mang tính thực dụng rất rõ rệt — Lenin sẵn sàng tạm thời nhân nhượng về mặt kinh tế, để đổi lấy sự ổn định chính trị cần thiết cho chính quyền Xô Viết còn non trẻ tồn tại và củng cố quyền lực.

Chính sách NEP, dù chỉ tồn tại trong một giai đoạn tương đối ngắn trước khi bị Stalin sau này loại bỏ hoàn toàn, đã giúp mang lại một mức độ ổn định nhất định cho nước Nga Xô Viết trong những năm đầu thập niên 1920, sau nhiều năm liên tục chìm trong chiến tranh và khủng hoảng."""
    },
    {
        "id": "part12",
        "chapter_num": 12,
        "title": "Những Năm Cuối Đời & Di Chúc Bị Che Giấu",
        "subtitle": "Cơn đột quỵ, lời cảnh báo về Stalin và nỗi day dứt quyền lực",
        "historical_era": "1922 - 1923 · DI CHÚC CHÍNH TRỊ",
        "image_range": (104, 112),
        "text": """Nhưng ngay khi đất nước bắt đầu có dấu hiệu ổn định trở lại, sức khỏe của chính Lenin lại bắt đầu suy sụp nghiêm trọng.

Năm 1922, ông trải qua cơn đột quỵ đầu tiên, khiến khả năng làm việc của ông bị ảnh hưởng nặng nề. Trong những tháng cuối đời, khi nhận thức rõ rằng mình sẽ không còn sống được bao lâu nữa, Lenin bắt đầu suy nghĩ nghiêm túc về việc ai sẽ là người kế nhiệm mình, lãnh đạo đảng và nhà nước Xô Viết sau khi ông qua đời.

Đầu năm 1923, ông soạn thảo một văn bản sau này được gọi là Di chúc chính trị của Lenin. Trong văn bản này, ông bày tỏ những đánh giá và lo ngại rất thẳng thắn về các nhân vật lãnh đạo cấp cao trong đảng — đặc biệt, ông cảnh báo về tính cách của Joseph Stalin, người khi đó đang giữ chức Tổng Bí thư đảng, và thậm chí còn đề nghị nên cân nhắc cách chức Stalin khỏi vị trí này.

Đáng chú ý, chính Lenin, trong những dòng chữ cuối cùng của cuộc đời chính trị mình, đã bộc lộ một nỗi day dứt sâu sắc — một sự hối tiếc về việc bộ máy quyền lực mà chính ông đã góp phần xây dựng nên lại đang mang dáng dấp độc đoán, tập trung quyền lực quá mức vào tay một số ít cá nhân, đi ngược lại với chính những lý tưởng ban đầu mà ông theo đuổi.

Nhưng bản di chúc đó, vì nhiều lý do chính trị phức tạp trong nội bộ đảng sau khi ông qua đời, đã không được công bố rộng rãi hay thực thi theo đúng nguyện vọng của ông. Stalin, thông qua khéo léo thao túng bộ máy đảng, dần dần củng cố quyền lực của mình trong những năm sau đó, và cuối cùng trở thành người kế nhiệm thực sự, bất chấp những cảnh báo Lenin đã để lại."""
    },
    {
        "id": "part13",
        "chapter_num": 13,
        "title": "Cái Chết, Lăng Mộ & Di Sản Thế Kỷ",
        "subtitle": "Sự thần thánh hóa thi thể và nghịch lý một cuộc đời cách mạng",
        "historical_era": "1924 - NAY · DI SẢN & TRANH LUẬN",
        "image_range": (113, 122),
        "text": """Sức khỏe của Lenin tiếp tục suy sụp trong suốt năm 1923, sau khi ông trải qua thêm nhiều cơn đột quỵ khác, khiến ông gần như mất hoàn toàn khả năng nói và làm việc trong những tháng cuối đời.

Ngày 21 tháng 1 năm 1924, tại ngôi làng Gorki gần Moscow, Vladimir Ilyich Lenin qua đời ở tuổi năm mươi ba.

Cái chết của ông gây ra một làn sóng thương tiếc rộng khắp trong nội bộ đảng và nhiều tầng lớp dân chúng Xô Viết. Nhưng điều đáng chú ý hơn cả là những gì diễn ra ngay sau đó: thay vì được chôn cất theo nghi thức thông thường, thi thể của Lenin được ướp xác theo một kỹ thuật đặc biệt, và được đặt trong một lăng mộ xây dựng ngay tại trung tâm Quảng trường Đỏ ở Moscow — nơi thi thể ông, qua nhiều lần bảo quản và tu sửa, vẫn được trưng bày cho công chúng chiêm ngưỡng cho đến tận ngày nay.

Việc ướp xác và tôn thờ thi thể Lenin như vậy, trên thực tế, đi ngược lại hoàn toàn với chính những nguyên tắc vô thần và duy vật mà bản thân ông từng theo đuổi suốt đời. Nhưng đối với những người kế nhiệm ông — đặc biệt là Stalin — hình ảnh Lenin được thần thánh hóa như vậy lại trở thành một công cụ chính trị vô cùng hiệu quả, để củng cố tính chính danh cho toàn bộ hệ thống quyền lực Xô Viết còn non trẻ.

Chỉ trong vòng chưa đầy một thập kỷ sau khi Lenin qua đời, Stalin đã củng cố quyền lực gần như tuyệt đối, và bắt đầu sử dụng chính những công cụ đàn áp mà Lenin từng thiết lập ra — như Cheka, sau này đổi tên nhiều lần và mở rộng quy mô, cùng hệ thống trại lao động cưỡng bức — để phát động những chiến dịch thanh trừng và đàn áp với quy mô còn lớn hơn rất nhiều so với những gì từng diễn ra dưới thời Lenin.

Di sản của Lenin, vì thế, mãi mãi gắn liền với một nghịch lý sâu sắc: một người khởi xướng ra một cuộc cách mạng với lời hứa giải phóng giai cấp công nhân khỏi áp bức, nhưng chính bộ máy quyền lực mà ông xây dựng nên, cuối cùng, lại trở thành nền móng cho một trong những chế độ toàn trị khắc nghiệt và đẫm máu nhất trong lịch sử thế kỷ 20.

Từ cậu bé học giỏi ở Simbirsk, đến người anh trai chứng kiến bản án tử hình của người mình yêu quý nhất, đến nhà cách mạng lưu vong hơn một thập kỷ trên khắp châu Âu, và cuối cùng là người đứng đầu một đế chế trải dài từ châu Âu đến Thái Bình Dương — cuộc đời Vladimir Ilyich Lenin là một hành trình mà đến tận ngày nay, sau tròn một thế kỷ kể từ khi ông qua đời, thế giới vẫn còn tiếp tục tranh luận, và có lẽ sẽ còn tiếp tục tranh luận rất lâu nữa."""
    }
]

IMAGE_DESCRIPTIONS = [
    # Phần 1 (1 - 7)
    "Lăng mộ Lenin trên Quảng trường Đỏ tại Moscow",
    "Đoàn người xếp hàng dài trong tuyết viếng Lăng",
    "Bức ảnh nhuốm màu thời gian & Bí mật thân thế",
    "Thị trấn Simbirsk bên dòng sông Volga cuối thế kỷ 19",
    "Ngã rẽ cuộc đời: Lựa chọn định mệnh của chàng trai trẻ",
    "Bản đồ Đế quốc Nga & Dấu mốc hành trình lịch sử",
    "Biểu tượng Búa Liềm hình thành từ những tia sáng",

    # Phần 2 (8 - 17)
    "Ngôi nhà hai tầng khang trang của gia đình Ulyanov",
    "Bức chân dung gia đình Ulyanov nền nếp quý tộc nhỏ",
    "Cha Ilya Ulyanov — Thanh tra trường học tỉnh Simbirsk",
    "Mẹ Maria Alexandrovna đọc sách cùng các con",
    "Phòng khách gia đình ngập tràn sách và tranh luận sôi nổi",
    "Vladimir chăm chỉ đọc sách bên ánh nến thời thơ ấu",
    "Lớp học trường trung học cổ điển Simbirsk cuối thế kỷ 19",
    "Hai anh em Aleksandr và Vladimir tản bộ bên bờ sông",
    "Khu vườn êm đềm thời thơ ấu bên cây cổ thụ",
    "Góc phố Simbirsk phủ tuyết trắng trong đêm mùa đông",

    # Phần 3 (18 - 29)
    "Bi kịch đầu tiên: Người cha đột ngột qua đời năm 1886",
    "Aleksandr bí mật chế tạo bom ám sát Sa hoàng",
    "Cảnh sát mật Sa hoàng bắt giữ Aleksandr trong đêm",
    "Phiên tòa xét xử các thành viên âm mưu ám sát Sa hoàng",
    "Sân nhà tù đá trong sương sớm trước giờ thi hành án",
    "Nỗi đau tột cùng của người mẹ và người em trai",
    "Chiếc ghế trống buồn bã trên bàn ăn gia đình Ulyanov",
    "Sự xa lánh, lạnh nhạt của bạn bè và xã hội Simbirsk",
    "Vladimir trầm ngâm bên ô cửa sổ trước ngã rẽ cuộc đời",
    "Những lá thư cũ buộc dây gai trên bậu cửa sổ",
    "Con đường độc hành rời khỏi thị trấn Simbirsk",
    "Lễ tốt nghiệp trung học xuất sắc với Huy chương Vàng",

    # Phần 4 (30 - 38)
    "Đại học Kazan — Nơi khởi đầu phong trào sinh viên",
    "Cuộc biểu tình của sinh viên phản đối quy chế hà khắc",
    "Vladimir bị đuổi học và rời khỏi cổng trường đại học",
    "Trang trại Kokushkino bên sông — Quãng thời gian cấm túc",
    "Lần đầu tiên tiếp cận các tác phẩm kinh điển của Karl Marx",
    "Đắm chìm trong kho tàng lý luận và tri thức tiến bộ",
    "Sự giác ngộ tư tưởng: Chuyển dịch sang lập trường Marxist",
    "Kỳ thi luật độc lập: Vượt qua với tấm bằng xuất sắc 1891",
    "Thủ đô Saint Petersburg 1893: Bước chân vào giới cách mạng",

    # Phần 5 (39 - 50)
    "Mười bốn tháng trong xà lim nhà tù Saint Petersburg",
    "Hành trình đày ải đến vùng đất băng giá Siberia",
    "Toa tàu hạng nhất trên chuyến đi đày năm 1897",
    "Ngôi nhà gỗ tại làng Shushenskoye — Nơi lưu đày 3 năm",
    "Miệt mài viết lách và nghiên cứu lý luận chính trị",
    "Hôn lễ giản dị với Nadezhda Krupskaya tại Siberia",
    "Bộ Tư bản luận của Marx đặt nền móng cho chủ nghĩa Lenin",
    "Xưởng in bí mật của tờ báo Tia lửa (Iskra)",
    "Vận chuyển những ấn bản Iskra giấu trong đáy vali",
    "Thành phố Tây Âu nơi Lenin bắt đầu những năm lưu vong",
    "Đại hội Đảng lần thứ II tại London & Brussels năm 1903",
    "Sự phân rẽ lịch sử: Đảng Bolshevik và phái Menshevik",

    # Phần 6 (51 - 60)
    "Chiến tranh Nga - Nhật 1904: Thất bại bộc lộ sự suy tàn",
    "Làn sóng đình công và biểu tình Cách mạng 1905 bùng nổ",
    "Lực lượng binh lính Sa hoàng đối đầu người biểu tình",
    "Điện Kremlin và Sa hoàng Nicholas II ban bố Nghị viện Duma",
    "Tuyên ngôn cải cách bị Sa hoàng xé bỏ và vô hiệu hóa",
    "Lenin lại rời nước Nga bắt đầu 10 năm lưu vong thứ hai",
    "Căn phòng trọ giản dị của Lenin tại các thành phố châu Âu",
    "Chiến hào đẫm máu của Thế chiến I năm 1914",
    "Lenin diễn thuyết kêu gọi biến chiến tranh thành cách mạng",
    "Căn hộ nhỏ trên phố Spiegelgasse tại Zurich, Thụy Sĩ",

    # Phần 7 (61 - 70)
    "Nạn đói và hàng dài người xếp hàng chờ bánh mì ở Petrograd",
    "Cách mạng Tháng Hai 1917: Quần chúng bao vây cung điện",
    "Sa hoàng Nicholas II ký văn bản thoái vị trong đau đớn",
    "Toa tàu bọc kín đặc biệt lăn bánh xuyên qua nước Đức",
    "Trạm kiểm soát biên giới của lính Đức trên đường sắt",
    "Lenin trở về ga Phần Lan tại Petrograd sau 10 năm lưu vong",
    "Lenin đứng trên xe bọc thép tuyên bố Luận cương Tháng Tư",
    "Cuộc tranh luận nảy lửa trong Ủy ban Trung ương Bolshevik",
    "Chính phủ Lâm thời Kerensky suy yếu và chia rẽ sâu sắc",
    "Người lính kiệt quệ nơi chiến hào chờ đợi hòa bình",

    # Phần 8 (71 - 79)
    "Lenin cải trang kín đáo di chuyển trong bóng đêm Petrograd",
    "Cuộc họp bí mật tại căn hầm quyết định thời điểm khởi nghĩa",
    "Hồng vệ binh vũ trang áp sát các vị trí trọng yếu thủ đô",
    "Chiếm lĩnh trạm điện thoại, nhà ga và ngân hàng nhà nước",
    "Bao vây Cung điện Mùa Đông trong đêm 25 tháng 10 năm 1917",
    "Bình minh Petrograd: Chính phủ Lâm thời chính thức sụp đổ",
    "Đại hội Xô Viết toàn Nga tuyên bố chính quyền về tay nhân dân",
    "Ngọn lửa cách mạng bùng lên từ hành động kiên quyết",
    "Lenin đứng bên cửa sổ viện Smolny đón chào chính quyền mới",

    # Phần 9 (80 - 87)
    "Lễ ký kết Hiệp ước Brest-Litovsk với phái đoàn Đức 1918",
    "Bản đồ phân chia lãnh thổ nhượng lại đất đai vì hòa bình",
    "Tranh luận gay gắt trong nội bộ Đảng về hiệp ước hòa bình",
    "Các tướng lĩnh Bạch vệ họp bàn chiến dịch phản công",
    "Chiến trường Nội chiến Nga ác liệt trên bình nguyên phủ tuyết",
    "Sự can thiệp quân sự của các cường quốc phương Tây",
    "Tàu vận tải cập cảng miền Bắc tiếp viện vũ khí cho Bạch vệ",
    "Làng mạc Nga tan hoang vì bom đạn cuộc Nội chiến",

    # Phần 10 (88 - 97)
    "Vụ ám sát hụt Lenin của Fanny Kaplan ngày 30 tháng 8 năm 1918",
    "Cảnh sát mật Cheka và Felix Dzerzhinsky trong văn phòng",
    "Sân trại giam thời kỳ Khủng bố Đỏ dưới thời Nội chiến",
    "Áp phích cổ động sức mạnh giai cấp công nông đập tan vương quyền",
    "Thủy thủ và binh lính Hồng quân tuần tra trên đường phố",
    "Chính sách Cộng sản thời chiến: Trưng thu lương thực ở nông thôn",
    "Cánh đồng lúa mì trơ trọi và chiếc cày bỏ hoang giữa mùa đói",
    "Gia đình nông dân đối mặt nạn đói thảm khốc năm 1921",
    "Nhà máy công nghiệp đóng băng, ống khói nguội lạnh",
    "Chỉ huy quân sự kiệt sức bên bản đồ chiến sự tàn khốc",

    # Phần 11 (98 - 103)
    "Chợ phiên nhộn nhịp trở lại với Chính sách Kinh tế Mới NEP",
    "Nông dân vui mừng bán nông sản dư thừa tại chợ tự do",
    "Cán cân thực dụng: Kết hợp quản lý nhà nước và thị trường tư nhân",
    "Các xí nghiệp nhỏ và nhà xưởng mở cửa đón công nhân trở lại",
    "Lenin nghiên cứu số liệu kinh tế và chỉ đạo phục hồi sản xuất",
    "Phố phường Moscow dần hồi sinh sau những năm dài chiến tranh",

    # Phần 12 (104 - 112)
    "Lenin nghỉ ngơi bên cửa sổ biệt thự Gorki sau cơn đột quỵ",
    "Bác sĩ chăm sóc sức khỏe cho Lenin trong những tháng cuối",
    "Bàn tay run rẩy cầm bút ghi lại những suy tư chính trị cuối cùng",
    "Bức Di chúc chính trị cảnh báo về Stalin bị cất kín",
    "Sự căng thẳng ngấm ngầm giữa các lãnh tụ kế cận trong Đảng",
    "Lenin trên xe lăn trong khu vườn biệt thự Gorki mùa thu 1923",
    "Bóng đen quyền lực tập trung bắt đầu trùm lên bộ máy nhà nước",
    "Biệt thự Gorki lặng lẽ trong mùa đông lạnh giá",
    "Bàn làm việc với tập tài liệu dang dở của vị lãnh tụ",

    # Phần 13 (113 - 122)
    "Ngôi làng Gorki phủ tuyết trắng trong đêm 21 tháng 1 năm 1924",
    "Đoàn người tiễn đưa Lenin qua các con phố phủ đầy tuyết Moscow",
    "Thợ xây dựng lăng mộ bằng đá trên Quảng trường Đỏ",
    "Không gian trang nghiêm bên trong Lăng mộ Lenin",
    "Bức chân dung khổng lồ của Lenin được treo trên tòa nhà nhà nước",
    "Stalin đứng trước bản đồ Liên Xô củng cố quyền lực tuyệt đối",
    "Bộ máy quan liêu nhà nước Xô Viết mở rộng quy mô khổng lồ",
    "Biểu tượng chuyển giao quyền lực và sự biến chuyển của lý tưởng",
    "Dòng thời gian một thế kỷ: Từ Simbirsk đến Quảng trường Đỏ",
    "Lăng Lenin trong sớm mai: Nghịch lý lịch sử vẫn tiếp diễn",
]

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--section", type=str, default="all", help="part1..part13 or 'all' or 'meta_only'")
    args = parser.parse_args()

    # Xuất metadata thành JSON
    meta_path = Path("src/data/lenin_chapters.json")
    meta_path.parent.mkdir(parents=True, exist_ok=True)

    chapters_export = []
    desc_idx = 0
    for sec in LENIN_SECTIONS:
        start_img, end_img = sec["image_range"]
        images = []
        descriptions = []
        for i in range(start_img, end_img + 1):
            images.append(f"images/lenin-documentary/{i:03d}.png")
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
            "audio_file": f"audio/lenin_{sec['id']}.wav"
        })

    meta_path.write_text(json.dumps(chapters_export, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Đã xuất metadata 13 chapters tại: {meta_path}")

    if args.section == "meta_only":
        return

    # Khởi tạo VieNeu-TTS
    from vieneu import Vieneu
    print("🚀 Khởi tạo VieNeu-TTS (mode='v3turbo', GPU RTX 3060, mặc định: Trúc Ly)...")
    tts = Vieneu()

    out_dir = Path("public/audio")
    out_dir.mkdir(parents=True, exist_ok=True)

    for sec in LENIN_SECTIONS:
        if args.section != "all" and args.section != sec["id"]:
            continue

        target_wav = out_dir / f"lenin_{sec['id']}.wav"
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
