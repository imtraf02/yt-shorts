# -*- coding: utf-8 -*-
"""
Script phân tích kịch bản 8 phần cho phim tài liệu
'ĐẾ CHẾ MAYA SỤP ĐỔ: BÍ ẨN LỚN NHẤT CỦA NGÀNH KHẢO CỔ HỌC'
và tạo src/data/maya_chapters.json
"""

import sys
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from maya_descriptions import MAYA_DESCRIPTIONS

# Danh sách 82 file ảnh thực tế trong public/images/maya-collapse
IMAGE_FILES = [
    "01-explorers-discover-root-covered-ruin.png",
    "02-jungle-reclaims-stone-pyramid.png",
    "03-mossy-hieroglyphic-stela-closeup.png",
    "04-temples-above-jungle-canopy.png",
    "05-thriving-city-to-abandoned-ruins.png",
    "06-abandoned-stone-plaza.png",
    "07-maya-glyph-mystery-symbol.png",
    "08-competing-collapse-theories.png",
    "09-sunset-pyramid-over-jungle.png",
    "10-bustling-city-plaza.png",
    "11-grand-city-skyline-sunset.png",
    "12-king-overlooks-city.png",
    "13-maya-metropolis-aerial.png",
    "14-workers-build-pyramid.png",
    "15-astronomer-studies-night-sky.png",
    "16-scribe-paints-hieroglyphs.png",
    "17-ceremonial-ball-game.png",
    "18-rival-kings-border-meeting.png",
    "19-raised-fields-and-canals.png",
    "20-royal-palace-courtyard.png",
    "21-pyramid-completion-ceremony.png",
    "22-market-cacao-textiles-obsidian.png",
    "23-city-states-trade-network-map.png",
    "24-stela-carvers-workshop-declines.png",
    "25-abandoned-stelae-plaza.png",
    "26-declining-stela-monuments.png",
    "27-worried-king-and-advisors.png",
    "28-maya-warriors-jungle-battle.png",
    "29-raid-aftermath-burning-village.png",
    "30-captured-warriors-procession.png",
    "31-neglected-city-plaza.png",
    "32-family-leaves-city.png",
    "33-migration-from-abandoned-city.png",
    "34-parched-land-and-dead-crops.png",
    "35-scientists-study-sediment-core.png",
    "36-cave-stalagmites-research.png",
    "37-dry-lakebed-dead-tree.png",
    "38-rainfall-decline-data-visual.png",
    "39-turquoise-cenote-water-source.png",
    "40-water-carriers-empty-reservoir.png",
    "41-dry-stone-reservoir.png",
    "42-withered-corn-fields.png",
    "43-farmer-holds-dry-soil.png",
    "44-blazing-sun-over-drought.png",
    "45-workers-cut-jungle-trees.png",
    "46-limestone-kiln-burns-wood.png",
    "47-jungle-clearing-before-after.png",
    "48-deforestation-feedback-loop.png",
    "49-farmland-encroaches-on-city.png",
    "50-erosion-on-deforested-hillside.png",
    "51-thinning-temple-roof-beams.png",
    "52-lone-tree-cleared-field.png",
    "53-workers-carry-timber.png",
    "54-king-performs-rain-ritual.png",
    "55-skeptical-commoners-watch.png",
    "56-armies-clash-jungle-battlefield.png",
    "57-conquerors-burn-temple.png",
    "58-disrupted-trade-caravan.png",
    "59-fragmenting-city-states-map.png",
    "60-south-empty-north-thriving.png",
    "61-thriving-chichen-itza-city.png",
    "62-abandoned-royal-throne-room.png",
    "63-crumbling-stone-crown.png",
    "64-overgrown-ceremonial-plaza.png",
    "65-thriving-chichen-itza-pyramid.png",
    "66-coastal-maya-trading-port.png",
    "67-north-survives-south-fades-map.png",
    "68-nojpeten-lake-island-city.png",
    "69-spanish-ships-near-lake-city.png",
    "70-maya-woman-weaving-loom.png",
    "71-modern-maya-village-market.png",
    "72-golden-thread-past-to-present.png",
    "73-grandmother-teaches-weaving.png",
    "74-modern-ceremony-at-ruins.png",
    "75-collapse-factors-converge.png",
    "76-scientist-connects-data-and-ruins.png",
    "77-ancient-modern-deforestation-parallel.png",
    "78-visitor-before-ruined-pyramid.png",
    "79-roots-reclaim-temple-wall.png",
    "80-birds-rise-from-pyramid-dawn.png",
    "81-temples-across-endless-canopy.png",
    "82-sunrise-on-hieroglyphs.png",
]

CHAPTER_CONFIGS = [
    {
        "num": 1,
        "title": "Bí Ẩn Giữa Rừng Già",
        "subtitle": "Phát hiện chấn động năm 1839 và sự biến mất không dấu vết",
        "historical_era": "NĂM 1839 · KHÁM PHÁ BAN ĐẦU",
        "image_range": (1, 9),
        "text": """Năm 1839, một nhà thám hiểm người Mỹ tên John Lloyd Stephens, cùng người bạn đồng hành là họa sĩ Frederick Catherwood, len lỏi qua những cánh rừng rậm rạp ở Trung Mỹ, và tình cờ phát hiện ra điều khiến cả hai phải sững sờ: những kim tự tháp đá khổng lồ, những quảng trường rộng lớn, những bức phù điêu tinh xảo — tất cả đều bị nuốt chửng bởi rừng già, rễ cây xuyên thủng qua từng phiến đá, im lìm suốt hàng trăm năm mà gần như không ai trên thế giới hiện đại biết đến sự tồn tại của chúng.
Đó chính là những gì còn sót lại của nền văn minh Maya — một trong những nền văn minh rực rỡ nhất từng tồn tại ở châu Mỹ, với chữ viết riêng, hệ thống lịch pháp và thiên văn học chính xác đến kinh ngạc, cùng những thành phố có dân số lên tới hàng chục nghìn người.
Nhưng điều khiến các nhà khảo cổ học đau đầu suốt gần hai trăm năm qua, kể từ phát hiện của Stephens, không phải là sự huy hoàng của nền văn minh này, mà chính là cách nó biến mất.
Trong khoảng thời gian chỉ hơn một trăm năm — từ khoảng năm 800 đến năm 900 sau Công nguyên — hàng loạt thành phố Maya vĩ đại nhất ở vùng đất thấp phía nam, nơi từng có tới hàng triệu người sinh sống, lần lượt bị bỏ hoang. Không phải bị phá hủy bởi ngoại xâm rõ ràng, không có bằng chứng về một thảm họa duy nhất và tức thời. Người dân đơn giản là... ngừng xây dựng, ngừng dựng bia đá ghi công các vị vua, và rồi dần dần rời đi, để lại phía sau những thành phố nguy nga cho rừng già nuốt chửng.
Đây được coi là một trong những bí ẩn lớn nhất chưa có lời giải trọn vẹn trong toàn bộ lịch sử ngành khảo cổ học. Tính đến nay, các nhà nghiên cứu đã đưa ra hơn tám mươi giả thuyết khác nhau để cố gắng lý giải điều gì thực sự đã xảy ra.
Hôm nay, chúng ta sẽ cùng nhau lần theo dấu vết của bí ẩn này — từ thời kỳ hoàng kim rực rỡ của nền văn minh Maya, cho đến những manh mối khoa học hiện đại đang dần hé lộ câu trả lời."""
    },
    {
        "num": 2,
        "title": "Thời Kỳ Hoàng Kim: Những Đô Thị Giữa Rừng",
        "subtitle": "Kỷ nguyên Cổ điển, đại đô thị Tikal và đỉnh cao thiên văn học",
        "historical_era": "THẾ KỶ 3 - 9 SCN · THỜI KỲ CỔ ĐIỂN",
        "image_range": (10, 23),
        "text": """Trước khi tìm hiểu về sự sụp đổ, chúng ta cần hiểu được nền văn minh Maya đã từng vĩ đại đến mức nào.
Giai đoạn được các nhà khảo cổ gọi là "thời kỳ Cổ điển" của nền văn minh Maya kéo dài từ khoảng năm 250 đến năm 900 sau Công nguyên. Đây là thời kỳ đỉnh cao của sự phát triển đô thị, kiến trúc hoành tráng, nghệ thuật tinh xảo, và cả những cuộc tranh giành quyền lực chính trị phức tạp giữa hàng chục thành bang khác nhau.
Ở thời kỳ đỉnh cao, nền văn minh Maya trải rộng trên một khu vực địa lý mênh mông, gần một trăm hai mươi lăm nghìn dặm vuông, bao trùm lên lãnh thổ ngày nay thuộc về nhiều quốc gia Trung Mỹ. Các nhà nghiên cứu ước tính, có tới hơn bốn mươi thành phố lớn nhỏ khác nhau, mỗi thành phố có dân số dao động từ năm nghìn cho đến năm mươi nghìn người. Tổng dân số Maya vào thời kỳ đỉnh cao có thể đã lên tới khoảng hai triệu người, thậm chí một số ước tính còn đưa ra con số cao hơn nhiều.
Trong số những thành phố nổi bật nhất, không thể không nhắc đến Tikal — nằm ở khu vực rừng rậm phía bắc Guatemala ngày nay. Vào thời kỳ hoàng kim, kéo dài khoảng từ năm 600 đến năm 900, Tikal trải rộng trên một diện tích khoảng năm mươi dặm vuông, với hơn ba nghìn công trình bằng đá, và dân số có lúc được ước tính vượt quá sáu mươi nghìn người — một con số khổng lồ đối với một thành phố nằm giữa rừng nhiệt đới thời cổ đại.
Một thành phố quan trọng khác là Copán, nằm ở khu vực ngày nay thuộc Honduras, với dân số ở thời kỳ đỉnh cao đạt hơn hai mươi nghìn người. Cùng với đó là hàng loạt các trung tâm quyền lực lớn khác như Palenque, Calakmul, hay Caracol — mỗi thành phố đều có những vị vua riêng, những đội quân riêng, và thường xuyên tranh giành ảnh hưởng, tài nguyên, thậm chí cả chiến tranh lẫn nhau.
Người Maya đã phát triển một hệ thống chữ viết tượng hình phức tạp, được coi là hệ thống chữ viết phát triển đầy đủ nhất từng xuất hiện tại châu Mỹ thời tiền Colombo. Họ cũng sở hữu một hệ thống lịch pháp và kiến thức thiên văn học vô cùng tinh vi, đủ khả năng tính toán chính xác các chu kỳ của mặt trăng, sao Kim, và nhiều hiện tượng thiên văn khác.
Nhưng có một điều đáng chú ý: đằng sau sự huy hoàng này là một xã hội đang ngày càng chịu áp lực nặng nề — dân số bùng nổ, các công trình xây dựng ngày càng đồ sộ và tốn kém, và một cuộc chạy đua chiến tranh không ngừng nghỉ giữa các thành bang, để giành giật tài nguyên và uy quyền chính trị."""
    },
    {
        "num": 3,
        "title": "Những Triệu Chứng Suy Tàn Đầu Tiên",
        "subtitle": "Bia đá Stela ngừng dựng và những cuộc chiến tranh hủy diệt",
        "historical_era": "THẾ KỶ 8 - 9 SCN · RẠN NỨT BAN ĐẦU",
        "image_range": (24, 33),
        "text": """Đến khoảng cuối thế kỷ thứ 8, những dấu hiệu đầu tiên của khủng hoảng bắt đầu xuất hiện — dù vào thời điểm đó, hẳn không một người Maya nào có thể lường trước được quy mô của những gì sắp xảy ra.
Người Maya cổ đại có một truyền thống rất đặc biệt: họ thường xuyên dựng lên những tấm bia đá lớn, được gọi là stela, để ghi lại các sự kiện quan trọng, đặc biệt là để tôn vinh chiến công và quyền lực của các vị vua đang trị vì. Đây chính là một trong những nguồn tư liệu quý giá nhất mà các nhà khảo cổ học ngày nay dựa vào để tái dựng lại dòng thời gian lịch sử Maya.
Nhưng điều đáng chú ý là: số lượng những tấm bia đá mới được dựng lên bắt đầu giảm dần một cách rõ rệt trong suốt thế kỷ thứ 9, và đến khoảng năm 800, con số này sụt giảm nhanh chóng — chỉ còn khoảng mười tấm bia mới được dựng vào năm 800, và gần như không còn tấm bia nào được dựng lên nữa vào năm 900.
Đối với các nhà khảo cổ học, đây là một tín hiệu vô cùng quan trọng. Việc dựng bia đá đòi hỏi một hệ thống chính trị vận hành ổn định — cần có vua để tôn vinh, cần có thợ điêu khắc lành nghề, cần có nguồn lực kinh tế để duy trì các nghi lễ liên quan. Khi số lượng bia đá sụt giảm mạnh, điều đó cho thấy chính hệ thống quyền lực, hệ thống "vương quyền thần thánh" vốn là nền tảng cốt lõi của xã hội Maya, đang bắt đầu rạn nứt và tan rã.
Đồng thời, các nhà khảo cổ cũng ghi nhận sự gia tăng đáng kể của các hoạt động chiến tranh giữa các thành bang Maya trong giai đoạn này. Trước đó, chiến tranh giữa các thành bang Maya thường chỉ mang tính biểu tượng — với mục tiêu chủ yếu là bắt giữ một số nhân vật quan trọng của đối phương để làm tù binh, chứ không nhằm hủy diệt hoàn toàn. Nhưng đến thế kỷ thứ 8, tính chất của các cuộc chiến tranh đã thay đổi hẳn — trở nên tàn khốc hơn, mang tính hủy diệt nhiều hơn, với mục tiêu chiếm đoạt tài nguyên và lãnh thổ trực tiếp, thay vì chỉ đơn thuần phô diễn uy quyền.
Một thành phố sụp đổ, rồi một thành phố khác. Cứ như vậy, hết thành bang này đến thành bang khác ở khu vực đất thấp phía nam lần lượt bị bỏ hoang trong suốt hơn một thế kỷ, cho đến khi gần như toàn bộ những trung tâm quyền lực vĩ đại nhất của thời kỳ Cổ điển đều trở thành phế tích."""
    },
    {
        "num": 4,
        "title": "Giả Thuyết Đầu Tiên: Hạn Hán Khốc Liệt",
        "subtitle": "Bằng chứng từ thạch nhũ, lõi trầm tích và nghịch lý nguồn nước",
        "historical_era": "THẾ KỶ 9 SCN · BIẾN ĐỔI KHÍ HẬU CỔ ĐẠI",
        "image_range": (34, 44),
        "text": """Trong số hơn tám mươi giả thuyết từng được đưa ra để giải thích cho sự sụp đổ này, giả thuyết về hạn hán khốc liệt hiện đang được giới khoa học coi là lời giải thích có sức nặng và được ủng hộ rộng rãi nhất, đặc biệt là trong khoảng hai mươi lăm năm trở lại đây, khi các công nghệ nghiên cứu khí hậu cổ đại ngày càng phát triển tinh vi hơn.
Bằng chứng cho giả thuyết này đến từ nhiều nguồn dữ liệu khoa học độc lập với nhau — các nhà nghiên cứu đã phân tích lõi trầm tích lấy từ đáy các hồ nước trong khu vực từng là lãnh thổ Maya, nghiên cứu thạch nhũ trong các hang động, cùng nhiều dấu vết địa chất khác — để tái dựng lại điều kiện khí hậu của khu vực này trong hàng nghìn năm qua.
Kết quả nghiên cứu cho thấy một điều đáng kinh ngạc: giai đoạn diễn ra sự sụp đổ của nền văn minh Maya, tức là khoảng thế kỷ thứ 9, trùng khớp với một trong những giai đoạn hạn hán nghiêm trọng và kéo dài nhất trong suốt hàng nghìn năm lịch sử khí hậu của khu vực này — khắc nghiệt hơn hẳn so với bất kỳ đợt hạn hán nào từng xảy ra trong toàn bộ giai đoạn nền văn minh Maya phát triển rực rỡ trước đó.
Đây không phải là một đợt hạn hán ngắn ngủi, mà là một chuỗi những đợt khô hạn kéo dài, xen kẽ nhau, tấn công liên tục vào khu vực này trong suốt nhiều thập kỷ.
Điều này có ý nghĩa đặc biệt nghiêm trọng đối với nền văn minh Maya, bởi vì khác với các nền văn minh cổ đại lớn khác thường phát triển dọc theo các dòng sông lớn — như sông Nile của Ai Cập hay sông Tigris và Euphrates của Lưỡng Hà — phần lớn lãnh thổ Maya ở khu vực đất thấp lại gần như không có nguồn nước mặt tự nhiên đáng kể nào. Người Maya buộc phải phụ thuộc gần như hoàn toàn vào nước mưa, được tích trữ trong các bể chứa nhân tạo và các hố sụt tự nhiên gọi là cenote.
Khi hạn hán kéo dài xảy ra, những thành phố phụ thuộc nặng nề vào nguồn nước mưa dự trữ — như Tikal — sẽ bị ảnh hưởng đặc biệt nghiêm trọng. Mùa màng thất bát liên tục, nguồn nước sinh hoạt cạn kiệt, và toàn bộ hệ thống nông nghiệp vốn đã phải nuôi sống một dân số khổng lồ, tập trung đông đúc, bắt đầu sụp đổ theo."""
    },
    {
        "num": 5,
        "title": "Giả Thuyết Thứ Hai: Nạn Phá Rừng & Vòng Xoáy Sinh Thái",
        "subtitle": "Nung vôi trát đền đài, xói mòn đất và vòng phản hồi tiêu cực",
        "historical_era": "THẾ KỶ 8 - 9 SCN · KHỦNG HOẢNG MÔI TRƯỜNG",
        "image_range": (45, 53),
        "text": """Nhưng nếu chỉ đơn thuần là hạn hán tự nhiên, tại sao nền văn minh Maya, vốn đã tồn tại và phát triển rực rỡ qua nhiều thế kỷ, với không ít lần từng phải đối mặt với những đợt hạn hán trước đó trong lịch sử của mình, lại không thể vượt qua được đợt khủng hoảng lần này?
Đây chính là lúc giả thuyết thứ hai bước vào bức tranh toàn cảnh: nạn phá rừng quy mô lớn do chính con người gây ra.
Để nuôi sống một dân số khổng lồ, lên tới hàng triệu người, cùng với nhu cầu xây dựng không ngừng nghỉ những công trình đền đài, cung điện đồ sộ, người Maya đã phải khai thác một khối lượng gỗ khổng lồ từ những cánh rừng nhiệt đới bao quanh các thành phố của họ — vừa để làm vật liệu xây dựng, vừa để làm chất đốt phục vụ cho việc nung vôi trát, một nguyên liệu thiết yếu trong hầu hết các công trình kiến trúc Maya.
Các nghiên cứu khảo cổ và mô phỏng khí hậu khu vực đã chỉ ra rằng: nạn phá rừng quy mô lớn do con người gây ra, tích lũy qua hàng trăm năm, rất có thể đã tự nó làm thay đổi điều kiện khí hậu vi mô của khu vực — khiến lượng mưa giảm đi, nhiệt độ tăng lên, đất đai xói mòn nghiêm trọng hơn, tạo ra một dạng điều kiện tương tự như hạn hán, ngay cả khi không có tác động của biến đổi khí hậu tự nhiên trên quy mô lớn hơn.
Điều này tạo ra một vòng xoáy nguy hiểm, mà các nhà khoa học gọi là "vòng phản hồi tiêu cực": rừng bị chặt phá để lấy đất canh tác và vật liệu xây dựng, khiến khí hậu địa phương trở nên khô hạn hơn; khí hậu khô hạn hơn lại khiến mùa màng càng khó khăn hơn, buộc người Maya phải mở rộng thêm diện tích canh tác, dẫn đến việc chặt phá thêm nhiều rừng hơn nữa để bù đắp.
Một nghiên cứu quan trọng đã đưa ra kết luận rất đáng chú ý: cả hạn hán tự nhiên đơn thuần, lẫn tình trạng khô hạn do chính con người gây ra thông qua nạn phá rừng, đều không đủ sức, nếu đứng riêng lẻ, để gây ra một sự sụp đổ quy mô lớn như vậy. Nhưng khi nạn phá rừng đã đạt đến một mức độ gần như triệt để, và ngay sau đó lại xảy ra thêm một đợt hạn hán tự nhiên đủ nghiêm trọng, thì người Maya đã không còn khả năng thích ứng được nữa — và tình trạng khan hiếm nước nghiêm trọng đã nhanh chóng châm ngòi cho làn sóng bất ổn xã hội và khủng hoảng chính trị lan rộng.
Có một chi tiết khảo cổ rất thú vị liên quan đến vấn đề này: các nhà nghiên cứu phát hiện ra rằng, loại gỗ chất lượng cao mà người Maya thường sử dụng để làm những thanh xà đỡ mái trong các công trình quan trọng — gỗ cây sapodilla — dần dần trở nên khan hiếm qua thời gian. Dù sau đó, việc sử dụng loại gỗ này có phần phục hồi trở lại, nhưng kích thước các thanh xà gỗ được sử dụng lại nhỏ hơn hẳn so với trước đây — một dấu hiệu gián tiếp nhưng khá thuyết phục, cho thấy nguồn cung gỗ chất lượng cao của khu vực này đã bị suy giảm đáng kể qua nhiều thế kỷ khai thác liên tục."""
    },
    {
        "num": 6,
        "title": "Giả Thuyết Thứ Ba: Chiến Tranh & Tan Rã Chính Trị",
        "subtitle": "Sự sụp đổ của vương quyền thần thánh và huyết mạch thương mại",
        "historical_era": "THẾ KỶ 8 - 9 SCN · NỘI CHIẾN & KHỦNG HOẢNG",
        "image_range": (54, 64),
        "text": """Bên cạnh các yếu tố môi trường, có một yếu tố hoàn toàn do con người tạo ra cũng đóng vai trò vô cùng quan trọng: chiến tranh liên miên giữa các thành bang Maya, và sự tan rã của toàn bộ hệ thống chính trị vốn dựa trên quyền lực thần thánh của các vị vua.
Xã hội Maya thời kỳ Cổ điển vận hành dựa trên một hệ thống chính trị phân mảnh — không có một đế chế thống nhất duy nhất, mà là hàng chục thành bang độc lập, mỗi nơi do một vị vua đứng đầu, người được coi là có mối liên hệ trực tiếp và thiêng liêng với các vị thần. Tính chính danh của mỗi vị vua phụ thuộc rất lớn vào khả năng của ông ta trong việc duy trì sự thịnh vượng, chiến thắng trong các cuộc chiến, và tổ chức thành công các nghi lễ tôn giáo quan trọng.
Khi khủng hoảng môi trường bắt đầu xảy ra — mùa màng thất bát, nguồn nước khan hiếm — hệ thống quyền lực dựa trên "vương quyền thần thánh" này lại đặc biệt dễ bị tổn thương. Bởi vì, nếu các vị vua không còn khả năng chứng minh được mối liên hệ hiệu quả của mình với thần linh — thông qua việc mang lại mưa thuận gió hòa, mùa màng bội thu như đã từng hứa hẹn — thì toàn bộ tính chính danh cai trị của họ cũng sẽ nhanh chóng bị đặt dấu hỏi.
Cùng lúc đó, sự cạnh tranh ngày càng khốc liệt giữa các thành bang để giành giật những nguồn tài nguyên đang ngày càng khan hiếm — đất canh tác màu mỡ, nguồn nước, và các tuyến đường thương mại quan trọng — đã đẩy tần suất và mức độ tàn khốc của chiến tranh lên một tầm cao mới chưa từng có trong lịch sử Maya trước đó.
Chiến tranh, đến lượt nó, lại tiếp tục tàn phá thêm đất đai canh tác, gây thêm áp lực lên hệ thống lương thực vốn đã mong manh, đồng thời làm gián đoạn hoàn toàn các mạng lưới thương mại và cống nạp phức tạp — vốn là huyết mạch giúp duy trì hoạt động của những thành phố lớn, đông dân. Khi hệ thống cống nạp và thương mại này sụp đổ, toàn bộ nền tảng kinh tế nâng đỡ các thành phố lớn cũng sụp đổ theo — không còn đủ nguồn lực để tiếp tục nuôi sống một dân số đông đảo tập trung tại một địa điểm duy nhất nữa.
Đáng chú ý, không phải tất cả các khu vực Maya đều sụp đổ cùng lúc, hay thậm chí đều sụp đổ theo cùng một cách. Trong khi các thành phố ở khu vực đất thấp phía nam như Tikal, Calakmul, Copán, Palenque lần lượt bị bỏ hoang trong giai đoạn từ thế kỷ 8 đến thế kỷ 9, thì một số thành phố khác ở khu vực phía bắc bán đảo Yucatan — như Chichen Itza — thực tế lại tiếp tục phát triển thịnh vượng, thậm chí còn hưng thịnh hơn trong giai đoạn ngay sau đó."""
    },
    {
        "num": 7,
        "title": "Sự Sụp Đổ Hay Là Một Sự Chuyển Dịch?",
        "subtitle": "Chichen Itza, Nojpetén 1697 và hàng triệu hậu duệ ngày nay",
        "historical_era": "THỜI KỲ HẬU CỔ ĐIỂN ĐẾN ĐƯƠNG ĐẠI",
        "image_range": (65, 74),
        "text": """Đây chính là lúc chúng ta cần làm rõ một hiểu lầm rất phổ biến — thứ mà rất nhiều tài liệu đại chúng, phim ảnh, và cả những thuyết âm mưu vô căn cứ, vẫn thường xuyên truyền tải sai lệch: nền văn minh Maya, trên thực tế, không hề "biến mất hoàn toàn" như nhiều người vẫn lầm tưởng.
Điều thực sự sụp đổ, một cách chính xác hơn, chỉ là hệ thống chính trị và mạng lưới đô thị lớn tại khu vực đất thấp phía nam — nơi từng là trung tâm quyền lực và văn hóa rực rỡ nhất của thời kỳ Cổ điển. Đây là lý do vì sao rất nhiều nhà khảo cổ học ngày nay không hoàn toàn thoải mái với việc sử dụng từ "sụp đổ" để mô tả hiện tượng này, vì nó dễ gây hiểu lầm.
Trong khi các thành phố phía nam suy tàn, thì ở khu vực bán đảo Yucatan phía bắc, cũng như dọc vùng duyên hải vịnh Mexico và khu vực cao nguyên trung tâm Mexico, nhiều cộng đồng Maya khác vẫn tiếp tục tồn tại, thậm chí còn phát triển hưng thịnh hơn trong giai đoạn tiếp theo — được gọi là thời kỳ Hậu Cổ điển. Thành phố Chichen Itza, ví dụ điển hình nhất, đã trở thành một trung tâm quyền lực hùng mạnh mới, tiếp tục thịnh vượng cho đến tận thế kỷ 12.
Thậm chí, nền văn minh Maya độc lập vẫn tiếp tục tồn tại dưới nhiều hình thức khác nhau cho đến tận rất lâu về sau — mãi cho đến năm 1697, khi người Tây Ban Nha cuối cùng mới chinh phục được thành bang độc lập cuối cùng còn sót lại của người Maya, mang tên Nojpetén.
Và cho đến tận ngày nay, hậu duệ trực tiếp của người Maya cổ đại vẫn đang sinh sống, với dân số lên tới hàng triệu người, tại các quốc gia Trung Mỹ như Guatemala, Mexico, Belize và Honduras — vẫn gìn giữ được nhiều nét văn hóa, và ở một số cộng đồng, thậm chí cả ngôn ngữ có nguồn gốc trực tiếp từ tổ tiên Maya cổ đại của họ.
Vì vậy, câu chuyện chính xác hơn không phải là "một nền văn minh hoàn toàn biến mất", mà là "một hệ thống chính trị và mạng lưới đô thị cụ thể, tại một khu vực địa lý cụ thể, đã sụp đổ và không bao giờ được tái lập lại với quy mô tương tự nữa" — trong khi bản thân dân tộc Maya, văn hóa Maya, vẫn tiếp tục dòng chảy của mình, dù ở những hình thái khác, cho đến tận hôm nay."""
    },
    {
        "num": 8,
        "title": "Những Bài Học Khoa Học Hiện Đại",
        "subtitle": "Sự cộng hưởng đa yếu tố và hồi chuông cảnh tỉnh cho thế giới",
        "historical_era": "KẾT LUẬN & BÀI HỌC THỜI ĐẠI",
        "image_range": (75, 82),
        "text": """Ngày nay, giới khoa học khí hậu và các nhà khảo cổ học đã đi đến một sự đồng thuận tương đối rộng rãi: sự sụp đổ của các thành bang Maya cổ điển không đến từ một nguyên nhân duy nhất, mà là kết quả của một sự cộng hưởng nguy hiểm giữa nhiều yếu tố khác nhau, tác động qua lại và khuếch đại lẫn nhau.
Hạn hán đã gây áp lực nghiêm trọng lên toàn bộ hệ thống nông nghiệp vốn đã căng thẳng vì dân số quá đông. Chiến tranh liên miên giữa các thành bang đã tàn phá thêm những gì còn sót lại của nguồn lực đó. Nạn phá rừng quy mô lớn đã khuếch đại thêm mức độ nghiêm trọng của tình trạng khô hạn. Và cuối cùng, sự thất bại của hệ thống "vương quyền thần thánh" — vốn không còn khả năng đưa ra được bất kỳ giải pháp thực chất nào cho cuộc khủng hoảng đang leo thang — đã phá hủy hoàn toàn sự gắn kết chính trị vốn từng giữ cho toàn bộ hệ thống xã hội Maya vận hành trơn tru suốt hàng trăm năm trước đó.
Điều đáng chú ý, và cũng phần nào khiến câu chuyện này trở nên đáng suy ngẫm hơn đối với thế giới hiện đại, là các nhà khoa học khí hậu ngày nay thường xuyên đưa ra những sự so sánh rất rõ ràng giữa sự sụp đổ của nền văn minh Maya cổ đại, với những nguy cơ mà xã hội hiện đại đang phải đối mặt trước biến đổi khí hậu, suy thoái môi trường, và sự cạnh tranh ngày càng gay gắt về tài nguyên thiên nhiên trên quy mô toàn cầu.
Nền văn minh Maya, xét cho cùng, đã từng là một trong những xã hội tinh vi, phát triển rực rỡ nhất mà con người từng xây dựng nên — với hệ thống chữ viết riêng, kiến thức thiên văn học vượt trội, kiến trúc đồ sộ đáng kinh ngạc. Nhưng chính sự tinh vi và quy mô đồ sộ đó, đi kèm cùng với việc khai thác tài nguyên môi trường một cách không bền vững qua nhiều thế hệ, cuối cùng cũng đã khiến họ trở nên đặc biệt dễ bị tổn thương trước một cú sốc khí hậu đủ lớn và đủ kéo dài.
Rừng già, sau khi nuốt chửng những thành phố từng một thời huy hoàng ấy trong suốt hơn một nghìn năm, giờ đây, thông qua bàn tay kiên nhẫn của các nhà khảo cổ học, đang dần dần hé lộ trở lại câu chuyện về một trong những chương bi tráng và đầy tính cảnh tỉnh nhất trong toàn bộ lịch sử văn minh nhân loại."""
    }
]

def main():
    out_json = Path("src/data/maya_chapters.json")
    out_json.parent.mkdir(parents=True, exist_ok=True)

    chapters_export = []
    desc_idx = 0

    for cfg in CHAPTER_CONFIGS:
        p_num = cfg["num"]
        s_img, e_img = cfg["image_range"]

        images = []
        descriptions = []
        for i in range(s_img - 1, e_img):
            images.append(f"images/maya-collapse/{IMAGE_FILES[i]}")
            descriptions.append(MAYA_DESCRIPTIONS[i])

        body_clean = cfg["text"].strip()
        word_count = len(body_clean.split())

        chapters_export.append({
            "id": f"part{p_num}",
            "chapter_num": p_num,
            "title": cfg["title"],
            "subtitle": cfg["subtitle"],
            "historical_era": cfg["historical_era"],
            "images": images,
            "image_descriptions": descriptions,
            "word_count": word_count,
            "audio_file": f"audio/maya_part{p_num}.wav",
            "text": body_clean
        })

    out_json.write_text(json.dumps(chapters_export, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Đã tạo cấu hình 8 chương tại: {out_json}")
    total_words = sum(c["word_count"] for c in chapters_export)
    print(f"📊 Tổng số từ 8 chương: {total_words} từ")
    print(f"🖼️ Tổng số ảnh: {sum(len(c['images']) for c in chapters_export)} ảnh")
    for c in chapters_export:
        print(f"   - {c['id']}: {c['title']} ({c['word_count']} từ, {len(c['images'])} ảnh)")

if __name__ == "__main__":
    main()
