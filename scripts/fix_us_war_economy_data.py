# -*- coding: utf-8 -*-
"""
Script tạo lại hoàn chỉnh file src/data/usWarEconomyData.ts
đảm bảo 100% cú pháp TypeScript chuẩn xác, đầy đủ images, imageDescriptions, imageStartFrames.
"""

import sys
import json
from pathlib import Path
from reorder_and_time_images import SCHEDULE, get_part_words, find_word_index

CHAPTER_METAS = [
    {
        "id": "part1",
        "chapterNumber": 1,
        "partLabel": "PHẦN 1",
        "historicalEra": "1914 - NAY · TỔNG QUAN",
        "title": "Nước Mỹ & Cỗ Máy Kiếm Tiền Từ Chiến Tranh",
        "subtitle": "Nghịch lý 100 năm: Thế giới hoang tàn, một siêu cường liên tục giàu lên",
        "keyHighlight": "Sau mỗi cuộc chiến, đồng đô la mạnh hơn, phố Wall thống trị, và cổ phiếu vũ khí liên tục lập đỉnh mới.",
        "audioSrc": "audio/us_war_economy_part1.wav",
        "durationInFrames": 2625,
        "startFrame": 0,
    },
    {
        "id": "part2",
        "chapterNumber": 2,
        "partLabel": "PHẦN 2",
        "historicalEra": "1914 - 1918 · THẾ CHIẾN I",
        "title": "Mô Hình 1: Bán Vũ Khí Trước Khi Tham Chiến",
        "subtitle": "Đứng ngoài chiến trường, nhưng đứng giữa dòng tiền",
        "keyHighlight": "Thương mại vũ khí tăng vọt 30 lần, phố Wall cho vay 3 tỷ USD và New York thay thế London làm trung tâm tài chính.",
        "audioSrc": "audio/us_war_economy_part2.wav",
        "durationInFrames": 8802,
        "startFrame": 2625,
    },
    {
        "id": "part3",
        "chapterNumber": 3,
        "partLabel": "PHẦN 3",
        "historicalEra": "1939 - 1945 · THẾ CHIẾN II",
        "title": "Mô Hình 2: Cash & Carry và Lend-Lease",
        "subtitle": "Trung lập trên giấy tờ, kiếm tiền ngoài đời thực",
        "keyHighlight": "Viết ra luật chơi chỉ có lợi cho mình: thu tiền mặt ngay, đẩy hết rủi ro sang cho đối tác vận chuyển.",
        "audioSrc": "audio/us_war_economy_part3.wav",
        "durationInFrames": 7083,
        "startFrame": 11427,
    },
    {
        "id": "part4",
        "chapterNumber": 4,
        "partLabel": "PHẦN 4",
        "historicalEra": "1950 - 1975 · CHIẾN TRANH LẠNH",
        "title": "Mô Hình 3: Tổ Hợp Công Nghiệp - Quân Sự",
        "subtitle": "Bật công tắc vĩnh viễn: Biến chiến tranh thành ngành kinh doanh thường trực",
        "keyHighlight": "Ngân sách quốc phòng chiếm 10% GDP liên tục nhiều thập kỷ, nền kinh tế gắn chặt vào guồng máy vũ khí.",
        "audioSrc": "audio/us_war_economy_part4.wav",
        "durationInFrames": 7110,
        "startFrame": 18510,
    },
    {
        "id": "part5",
        "chapterNumber": 5,
        "partLabel": "PHẦN 5",
        "historicalEra": "1991 · CHIẾN TRANH VÙNG VỊNH",
        "title": "Chiến Trường Như Sàn Diễn Tiếp Thị Vũ Khí",
        "subtitle": "Buổi trình diễn trực tiếp trên CNN biến vũ khí Mỹ thành cơn sốt toàn cầu",
        "keyHighlight": "Dù tên lửa Patriot đánh chặn trượt mục tiêu, doanh số bán hàng cho các quốc gia Vùng Vịnh vẫn tăng vọt kỷ lục.",
        "audioSrc": "audio/us_war_economy_part5.wav",
        "durationInFrames": 3348,
        "startFrame": 25620,
    },
    {
        "id": "part6",
        "chapterNumber": 6,
        "partLabel": "PHẦN 6",
        "historicalEra": "2001 - 2021 · IRAQ & AFGHANISTAN",
        "title": "Mô Hình 4: Kiếm Tiền Cả Lúc Phá Và Lúc Xây",
        "subtitle": "Cỗ máy tái thiết nghìn tỷ đô la và sự tư nhân hóa chiến tranh",
        "keyHighlight": "14 nghìn tỷ USD chi tiêu quân sự. Một đồng kiếm từ bắn phá, một đồng kiếm từ dọn dẹp và tái thiết hạ tầng.",
        "audioSrc": "audio/us_war_economy_part6.wav",
        "durationInFrames": 11253,
        "startFrame": 28968,
    },
    {
        "id": "part7",
        "chapterNumber": 7,
        "partLabel": "PHẦN 7",
        "historicalEra": "KẾT LUẬN & SUY NGẪM",
        "title": "Cỗ Máy Không Bao Giờ Dừng Lại",
        "subtitle": "Khi nền kinh tế gắn liền với chiến tranh, liệu ai thực sự muốn hòa bình?",
        "keyHighlight": "Mô hình hơn 100 năm không hề thay đổi, chỉ có công cụ ngày càng tinh vi và lợi nhuận ngày càng khổng lồ hơn.",
        "audioSrc": "audio/us_war_economy_part7.wav",
        "durationInFrames": 1125,
        "startFrame": 40221,
    }
]

out_lines = [
    'export interface ChapterImage {',
    '  src: string;',
    '  id: number;',
    '}',
    '',
    'export interface DocumentaryChapter {',
    '  id: string;',
    '  chapterNumber: number;',
    '  partLabel: string;',
    '  historicalEra: string;',
    '  title: string;',
    '  subtitle: string;',
    '  keyHighlight: string;',
    '  audioSrc: string;',
    '  durationInFrames: number;',
    '  startFrame: number;',
    '  images: string[];',
    '  imageDescriptions?: string[];',
    '  imageStartFrames?: number[];',
    '}',
    '',
    'export const US_WAR_ECONOMY_CHAPTERS: DocumentaryChapter[] = ['
]

for meta in CHAPTER_METAS:
    part_id = meta["id"]
    entries = SCHEDULE[part_id]
    words = get_part_words(part_id)
    curr_idx = 0
    start_frames = []
    images = []
    descriptions = []

    for i, (img_filename, desc, tokens) in enumerate(entries):
        if i == 0:
            frame = 0
            w_idx = 0
        else:
            w_idx = find_word_index(words, tokens, curr_idx)
            if w_idx == -1:
                frame = start_frames[-1] + 120
            else:
                w = words[w_idx]
                frame = int(round((w["startMs"] / 1000) * 30))
                if frame <= start_frames[-1]:
                    frame = start_frames[-1] + 30
                curr_idx = w_idx + 1
        start_frames.append(frame)
        images.append(f"images/us-war-economy/{img_filename}")
        descriptions.append(desc)

    out_lines.append('  {')
    out_lines.append(f'    id: "{meta["id"]}",')
    out_lines.append(f'    chapterNumber: {meta["chapterNumber"]},')
    out_lines.append(f'    partLabel: "{meta["partLabel"]}",')
    out_lines.append(f'    historicalEra: "{meta["historicalEra"]}",')
    out_lines.append(f'    title: "{meta["title"]}",')
    out_lines.append(f'    subtitle: "{meta["subtitle"]}",')
    out_lines.append(f'    keyHighlight: "{meta["keyHighlight"]}",')
    out_lines.append(f'    audioSrc: "{meta["audioSrc"]}",')
    out_lines.append(f'    durationInFrames: {meta["durationInFrames"]},')
    out_lines.append(f'    startFrame: {meta["startFrame"]},')
    
    # images
    out_lines.append('    images: [')
    for img in images:
        out_lines.append(f'      "{img}",')
    out_lines.append('    ],')
    
    # imageDescriptions
    out_lines.append('    imageDescriptions: [')
    for d in descriptions:
        escaped_d = d.replace('"', '\\"')
        out_lines.append(f'      "{escaped_d}",')
    out_lines.append('    ],')
    
    # imageStartFrames
    out_lines.append('    imageStartFrames: [')
    for f in start_frames:
        out_lines.append(f'      {f},')
    out_lines.append('    ],')
    out_lines.append('  },')

out_lines.append('];')
out_lines.append('')

target_file = Path("src/data/usWarEconomyData.ts")
target_file.write_text("\n".join(out_lines), encoding="utf-8")
print(f"Generated clean {target_file} with {len(CHAPTER_METAS)} chapters!")
