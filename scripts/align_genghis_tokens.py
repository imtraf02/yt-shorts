import json
import re

with open('whisper_genghis_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Thành Cát Tư Hãn là người sáng lập Đế quốc Mông Cổ, đế chế liền lãnh thổ lớn nhất lịch sử nhân loại, trải dài từ Thái Bình Dương đến tận Đông Âu. Nhưng ít ai biết rằng người đàn ông ấy bắt đầu cuộc đời từ đáy xã hội, bị chính bộ tộc của mình bỏ rơi.

Ông tên thật là Temüjin. Khi ông mới khoảng 9 tuổi, cha ông bị người Tatar đầu độc. Cả gia đình bị bộ tộc ruồng bỏ giữa thảo nguyên khắc nghiệt, phải sống sót bằng rễ cây, quả dại và những con thú nhỏ. Đây là khởi đầu của người sau này chinh phục nửa thế giới.

Ông lớn lên trong bị bắt giữ, phản bội và mất mát, đến cả vợ ông là Börte cũng từng bị bắt cóc. Nhưng chính những năm tháng ấy dạy ông một điều: sức mạnh không đến từ dòng máu, mà đến từ lòng trung thành. Năm 1206, sau khi thống nhất các bộ tộc Mông Cổ vốn thù địch nhau suốt nhiều thế hệ, ông được tôn làm Thành Cát Tư Hãn.

Điều khiến quân đội của ông bất bại không chỉ là ngựa và cung tên. Ông thăng chức theo năng lực chứ không theo xuất thân, nên một người chăn cừu hoàn toàn có thể trở thành tướng lĩnh. Ông lập hệ thống trạm dịch Yam để tin tức băng qua hàng nghìn cây số chỉ trong thời gian ngắn, ban hành bộ luật Yassa và cho phép các tôn giáo được tự do tín ngưỡng trong đế chế.

Nhưng mặt tối cũng khủng khiếp không kém. Khi các thành phố kháng cự, quân Mông Cổ san phẳng chúng, và nhiều nhà sử học ước tính hàng triệu người đã thiệt mạng trong các cuộc chinh phạt. Con số chính xác vẫn còn tranh cãi.

Ông qua đời năm 1227 trong chiến dịch chống Tây Hạ, nguyên nhân vẫn chưa ai chắc chắn. Nơi chôn cất ông cho đến nay vẫn là bí ẩn. Theo truyền thuyết, mộ ông được giấu kín, nhưng chi tiết này chưa được kiểm chứng.

Có một điều còn tồn tại đến tận hôm nay: một nghiên cứu di truyền năm 2003 cho thấy dòng gen Y hiếm gặp, có thể bắt nguồn từ ông hoặc gia tộc ông, hiện diện ở khoảng 16 triệu đàn ông trên khắp châu Á.

Người đàn ông bị bỏ rơi giữa thảo nguyên, để rồi dựng nên đế chế lớn nhất lịch sử, và còn để lại dấu vết trong gen của hàng triệu người, đó chính là Thành Cát Tư Hãn.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text)
words = [w for w in clean_script.split() if w]
print(f"Total script words: {len(words)}")
print(f"Total raw whisper tokens: {len(tokens)}")

# Merge the 4 split words in raw whisper tokens
merged_tokens = []
i = 0
while i < len(tokens):
    # Check for Temüjin at i=62
    if i == 62:
        merged_tokens.append({
            'text': 'Temüjin',
            'startMs': tokens[62]['startMs'],
            'endMs': tokens[64]['endMs']
        })
        i += 3
        continue
    # Check for Tatar at i=75
    if i == 75:
        merged_tokens.append({
            'text': 'Tatar',
            'startMs': tokens[75]['startMs'],
            'endMs': tokens[76]['endMs']
        })
        i += 2
        continue
    # Check for Börte at i=135
    if i == 135:
        merged_tokens.append({
            'text': 'Börte',
            'startMs': tokens[135]['startMs'],
            'endMs': tokens[136]['endMs']
        })
        i += 2
        continue
    # Check for Yassa at i=256
    if i == 256:
        merged_tokens.append({
            'text': 'Yassa',
            'startMs': tokens[256]['startMs'],
            'endMs': tokens[257]['endMs']
        })
        i += 2
        continue
    merged_tokens.append(tokens[i])
    i += 1

print(f"Total merged whisper tokens: {len(merged_tokens)}")
assert len(merged_tokens) == len(words)

# Now pair every word with its merged token, using script spelling
aligned_tokens = []
for idx in range(len(words)):
    aligned_tokens.append({
        'text': words[idx],
        'startMs': merged_tokens[idx]['startMs'],
        'endMs': merged_tokens[idx]['endMs']
    })

with open('scripts/aligned_genghis_tokens.json', 'w', encoding='utf-8') as f:
    json.dump(aligned_tokens, f, ensure_ascii=False, indent=2)

print("Saved scripts/aligned_genghis_tokens.json successfully!")
