# 36 prompt nhạc nền cho video tiếng Việt

Bộ prompt dành cho documentary explainer, lịch sử, khoa học, bí ẩn và Shorts. Các prompt độc lập, có thể copy nguyên khối sang model tạo nhạc. Đây là thư viện prompt, chưa phải file nhạc đã được tạo hoặc kiểm tra bản quyền.

## Cách sử dụng

1. Chọn prompt theo cảm xúc của cảnh, không chỉ theo tên chủ đề. Nhạc nên nâng đỡ lời kể, không biến diễn giải thành bi kịch hoặc giật gân.
2. Nếu model có trường Lyrics, để trống hoặc chọn Instrumental. Nếu có Duration, BPM, Seed và Negative prompt, đặt chúng ở đúng trường; yêu cầu trong văn bản không bảo đảm model thực hiện chính xác.
3. Nhạc documentary: ưu tiên bản 90–120 giây có đoạn giữa dễ loop. Shorts: tạo 45–60 giây. Chuyển chương: 4–8 giây. Nếu model giới hạn ngắn hơn, chọn thời lượng hỗ trợ và kiểm tra điểm nối bằng tai.
4. Tạo trước 3 mẫu khác nhau: P01, P07 và P13. Nghe cùng một đoạn giọng Trúc Ly có sẵn để xác nhận nhạc không lấn lời, sau đó mới tạo cả bộ.
5. Xuất WAV ở độ phân giải gốc cao nhất model cung cấp. Ưu tiên 48 kHz stereo cho bản dùng dựng nếu hỗ trợ; đổi container/sample rate không khôi phục chi tiết đã mất từ nguồn nén.
6. Lưu tên dạng `P01_ancient-archive_v01.wav`, kèm prompt, model, ngày tạo và điều khoản sử dụng áp dụng. Kiểm tra quyền dùng thương mại/YouTube của model và gói tài khoản; nhạc AI không tự động bảo đảm tránh Content ID.

Ưu tiên 11 WAV AI người dùng đã thêm tại `public/music/`: nghe/chọn từ kho trước, bộ prompt này dùng khi cần bổ sung, không bắt buộc gen lại. Kiểm tra quyền dùng trước xuất bản. MP3 cũ từng ở `mp3/` / `public/music/legacy-content-id/` nếu xuất hiện lại vẫn không tự dùng; cảnh báo không áp dụng mặc nhiên cho WAV mới. Video dài dùng nhiều track theo chương/cảm xúc; volume BGM tối đa `0.5` kể cả tổng gain crossfade. Bộ này không thay đổi video hiện có. Quy trình bắt buộc: [BACKGROUND_MUSIC_GUIDE.md](BACKGROUND_MUSIC_GUIDE.md).

## Negative prompt dùng chung

Nếu model có trường riêng, dùng khối này cho P01–P30. Với P31–P36 vẫn giữ các mục cấm, nhưng bỏ `abrupt endings` vì cue cần kết thúc rõ ràng.

```text
Vocals, lyrics, spoken words, humming, choir, vocal chops, screams, recognizable existing melodies, imitation of a named artist, trailer braams, explosive impacts, aggressive risers, harsh cymbals, piercing lead instruments, dense midrange, distorted bass, heavy sidechain pumping, clipping, sudden loudness jumps, abrupt endings.
```

## A. Lịch sử và nền văn minh — P01–P06

### P01 — Kho tư liệu cổ | 76 BPM | 120 giây

```text
Create an original instrumental background score for a Vietnamese historical documentary. Aim for 120 seconds at 76 BPM. Use soft felt piano, warm low strings, sparse wooden percussion and an understated plucked motif. Convey careful research, ancient records and thoughtful discovery, without heroic spectacle. Keep musical activity restrained beneath spoken narration, especially in the midrange. Introduce gentle variation every 16 bars. Include a stable loop-friendly middle section, a short unobtrusive opening and a soft ending. No vocals or sound effects.
```

### P02 — Công trình và đế chế cổ | 80 BPM | 120 giây

```text
Compose an original instrumental narration bed about ancient engineering, pyramids and the organization of a civilization. Aim for 120 seconds at 80 BPM. Combine rounded frame-drum pulses, muted low strings, sparse plucked strings and occasional breathy flute notes. Suggest scale through spacious harmony rather than loud brass or huge drums. Keep flute phrases brief and leave room for Vietnamese voiceover. Maintain steady energy, a clean loopable middle and a gentle release. Avoid stereotypical exotic scales, vocals and cinematic impacts.
```

### P03 — Triều đại và quyền lực | 72 BPM | 120 giây

```text
Write an original instrumental underscore for a documentary exploring dynasties, political power and institutional change. Aim for 120 seconds at 72 BPM. Use quiet viola and cello layers, distant piano notes, restrained bass pulses and very light mallet percussion. The mood is dignified, reflective and slightly uncertain, not triumphant or villainous. Avoid dominant melodies and dramatic crescendos. Support clear Vietnamese narration with sparse arrangements. Provide an even-volume loop-friendly central passage and a restrained, unresolved ending. No voices, choir or effects.
```

### P04 — Thương cảng và giao lưu | 88 BPM | 120 giây

```text
Create an original instrumental documentary bed about trading ports, routes and cultural exchange. Aim for 120 seconds at 88 BPM. Blend gentle acoustic plucks, warm marimba, low bowed strings and soft hand percussion into a flowing, curious rhythm. Let the music suggest movement across maps without becoming travel-advertising music. Keep melodies short, dynamics moderate and the speech-frequency region uncluttered. Build a loop-friendly middle with subtle texture changes and a soft ending. No vocals, ethnic caricatures, waves or harbor sound effects.
```

### P05 — Chiến tranh và hệ quả | 66 BPM | 120 giây

```text
Compose an original instrumental narration bed about the human consequences of war. Aim for 120 seconds at 66 BPM. Use subdued cello, sparse felt-piano chords, low sustained strings and occasional quiet percussion. Convey gravity, loss and historical distance without glorifying combat or forcing an emotional climax. Keep the arrangement thin and the volume consistent beneath Vietnamese voiceover. Include a stable central section suitable for careful looping and a gentle final decay. No military marches, gunshots, explosions, heroic brass, vocals or choir.
```

### P06 — Khai quật và mảnh ghép thất lạc | 78 BPM | 120 giây

```text
Produce an original instrumental underscore about archaeology, incomplete evidence and rediscovered cities. Aim for 120 seconds at 78 BPM. Use dusty piano textures, muted plucked strings, warm low pads and delicate wooden clicks played as percussion. Create patient curiosity rather than supernatural fear. Keep motifs small and repetitive with subtle harmonic movement, leaving generous space for Vietnamese narration. Design a seamless-feeling central loop with low-key opening and ending sections. Avoid horror drones, startling hits, recognizable melodies, voices and environmental effects.
```

## B. Khoa học, dữ liệu và công nghệ — P07–P12

### P07 — Explainer rõ ràng | 96 BPM | 120 giây

```text
Create an original instrumental background track for a clear Vietnamese science explainer. Aim for 120 seconds at 96 BPM. Use soft rounded synth plucks, warm electric piano, a gentle bass pulse and minimal dry percussion. Convey curiosity and analytical clarity, with a modest two-note motif instead of a catchy lead. Keep the midrange sparse and avoid bright transients that compete with consonants. Maintain stable energy and a loop-friendly middle with subtle variation. No vocals, corporate-advertising climax, dramatic drops or sound effects.
```

### P08 — Hệ nhị phân và logic | 104 BPM | 120 giây

```text
Compose an original instrumental narration bed about binary numbers, logic and computation. Aim for 120 seconds at 104 BPM. Build a quiet interlocking rhythm from soft digital plucks, muted mallets and a rounded synth bass. Use repeating patterns that evolve gradually like a simple algorithm. The mood is precise, approachable and lightly playful. Keep the melody understated and leave space for Vietnamese speech. Include a stable central loop and a clean, quiet ending. Avoid arcade sound effects, vocals, glitch bursts and aggressive electronic drums.
```

### P09 — Thời gian và bản đồ thế giới | 92 BPM | 120 giây

```text
Write an original instrumental documentary bed about time zones, calendars and systems that connect the world. Aim for 120 seconds at 92 BPM. Use warm marimba, soft piano, restrained electronic bass and gentle rhythmic textures with a measured clock-like musical pulse. Make the atmosphere thoughtful and expansive without actual ticking recordings. Keep the arrangement transparent under Vietnamese narration. Add small changes every 8 or 16 bars while preserving an easy central loop. No vocals, alarm sounds, abrupt tempo shifts or piercing bells.
```

### P10 — Sinh học và thế giới vi mô | 86 BPM | 120 giây

```text
Create an original instrumental underscore for a biology explainer about cells, microbes and unseen mechanisms. Aim for 120 seconds at 86 BPM. Combine soft organic synth textures, muted pizzicato strings, warm mallets and a small bass pulse. Suggest intricate movement and quiet wonder without turning the subject into danger. Keep the music low-density and speech-friendly, with restrained dynamics and no dominant melody. Include a loopable middle and gentle fade-like ending. No medical alarm effects, bubbling recordings, vocals or heavy percussion.
```

### P11 — Vũ trụ và đa vũ trụ | 70 BPM | 120 giây

```text
Compose an original instrumental narration bed for a documentary about cosmic scale and speculative models of the universe. Aim for 120 seconds at 70 BPM. Use deep soft pads, sparse distant piano, restrained analog arpeggios and warm low strings. Evoke spacious wonder and intellectual uncertainty, not an epic space battle. Keep bass controlled and avoid dense shimmering highs under Vietnamese voiceover. Provide a slowly evolving central loop and an understated beginning and ending. No choir, vocals, huge risers, explosions or recognizable film-score motifs.
```

### P12 — Mạng xã hội và kinh tế số | 100 BPM | 120 giây

```text
Produce an original instrumental background track about online platforms, advertising incentives and digital economics. Aim for 120 seconds at 100 BPM. Use muted electric piano, dry restrained percussion, a soft synth bass and sparse repeating plucks. The mood is investigative, contemporary and mildly skeptical without becoming sinister. Keep rhythmic momentum gentle and the midrange open for Vietnamese speech. Create a consistent loop-friendly central section with slight harmonic variation. No vocals, notification sounds, cash-register effects, hard dance beats or dramatic bass drops.
```

## C. Bí ẩn và khám phá — P13–P18

### P13 — Câu hỏi chưa có lời giải | 74 BPM | 120 giây

```text
Create an original instrumental narration bed for an evidence-based mystery documentary. Aim for 120 seconds at 74 BPM. Use low felt piano, muted cello, subtle analog pulses and sparse mallet accents. Convey an unanswered question and careful investigation rather than horror or conspiracy. Keep tension gentle and continuous, with no sudden hits or emotional climax. Leave generous space for Vietnamese voiceover. Include a stable loop-friendly middle and a softly unresolved ending. No vocals, whispering, frightening effects or recognizable suspense themes.
```

### P14 — Thế giới dưới lòng đất | 68 BPM | 120 giây

```text
Compose an original instrumental documentary underscore about underground cities, tunnels and hidden layers of history. Aim for 120 seconds at 68 BPM. Combine warm low strings, sparse deep piano, subtle plucked textures and quiet rounded percussion. Suggest depth through spacious musical texture, while keeping bass controlled and narration clear. The mood is exploratory and patient, not claustrophobic or terrifying. Provide a restrained central loop and a soft release. No cave-drip recordings, rumbling sound effects, distorted drones, voices or loud impacts.
```

### P15 — Biển sâu và hành trình | 64 BPM | 120 giây

```text
Write an original instrumental narration bed about ocean exploration and maritime mysteries. Aim for 120 seconds at 64 BPM. Use slowly shifting warm pads, sparse piano, low strings and very gentle musical swells. Evoke depth, distance and discovery without making the sea sound threatening. Keep melodic phrases minimal and avoid bass build-ups that mask Vietnamese speech. Include a broad loop-friendly middle with subtle texture movement and a soft tail. No actual ocean recordings, sonar pings, whale sounds, vocals or trailer percussion.
```

### P16 — So sánh các giả thuyết | 90 BPM | 120 giây

```text
Create an original instrumental background score for comparing explanations and examining evidence. Aim for 120 seconds at 90 BPM. Use dry pizzicato strings, soft electric piano, restrained bass and light brushed percussion. Make the music attentive, neutral and methodical, allowing the narrator to guide the conclusion. Avoid assigning a menacing character to any theory. Keep the midrange uncluttered, energy stable and phrases easy to cut. Include a clean central loop. No vocals, dramatic stingers, ticking effects or large crescendos.
```

### P17 — Nghịch lý và thí nghiệm tư duy | 82 BPM | 120 giây

```text
Compose an original instrumental narration bed for paradoxes, time travel questions and philosophical thought experiments. Aim for 120 seconds at 82 BPM. Use warm electric piano, soft reversed musical textures, sparse plucks and quiet bass pulses. Introduce gentle harmonic ambiguity and slightly asymmetric phrasing while keeping the beat steady. The mood is curious and contemplative, never unsettling. Leave room for Vietnamese speech and create a loop-friendly central passage. No voices, reversed speech, disorienting effects, abrupt changes or recognizable melodies.
```

### P18 — Lời giải dần xuất hiện | 88 BPM | 120 giây

```text
Produce an original instrumental documentary bed for a chapter where scattered clues begin to form an explanation. Aim for 120 seconds at 88 BPM. Begin with sparse piano and soft low strings, then gradually add warm mallets and a restrained pulse. Let the harmony become slightly clearer without a triumphant reveal or a loud climax. Keep narration dominant throughout. Include a stable middle suitable for looping and a calm resolving ending. No vocals, brass fanfares, impacts, whooshes or oversized cinematic drums.
```

## D. Đời sống, văn hóa và thiên nhiên — P19–P24

### P19 — Văn hóa Việt và ký ức | 78 BPM | 120 giây

```text
Create an original instrumental narration bed about Vietnamese everyday culture and shared memories. Aim for 120 seconds at 78 BPM. Blend delicate dan tranh phrases with soft acoustic guitar, warm piano and very light brushed percussion. Keep the traditional instrument understated and conversational rather than virtuosic. Convey familiarity and gentle affection without sentimentality. Leave clear space for Vietnamese narration, using modest dynamics and short melodic phrases. Include a loop-friendly middle and soft ending. No vocals, quoted folk melodies or street sound effects.
```

### P20 — Lịch sử trò chơi | 102 BPM | 120 giây

```text
Compose an original instrumental documentary bed about board games, play and human ingenuity. Aim for 120 seconds at 102 BPM. Use warm marimba, muted pizzicato strings, light acoustic plucks and restrained percussion. Create a clever, lightly playful rhythm that works equally well beneath history and explanation. Avoid cartoon comedy and overly memorable hooks. Keep musical density low around Vietnamese speech. Include a stable loopable middle with subtle variations and a tidy ending. No vocals, dice recordings, game sound effects or familiar game melodies.
```

### P21 — Trà và nhịp sống chậm | 62 BPM | 120 giây

```text
Write an original instrumental narration bed about tea, rituals and mindful daily life. Aim for 120 seconds at 62 BPM. Use delicate acoustic plucks, soft felt piano, occasional breathy flute notes and warm sustained textures, with little or no percussion. Convey quiet attention and human warmth rather than spa advertising. Keep melodies sparse, reverberation controlled and Vietnamese speech clearly in front. Provide a gently evolving loop-friendly central section and a natural ending. No vocals, water recordings, birdsong or ringing meditation bowls.
```

### P22 — Động vật và thích nghi | 94 BPM | 120 giây

```text
Create an original instrumental background score for an animal-behavior explainer. Aim for 120 seconds at 94 BPM. Use rounded wooden mallets, muted plucked strings, gentle acoustic guitar and light percussion. Suggest small discoveries and the cleverness of adaptation without childish comedy. Maintain moderate energy and short, understated motifs, keeping the midrange clear for Vietnamese narration. Include a steady central loop with small changes in texture and a soft ending. No animal calls, vocals, cartoon effects, heavy drums or dramatic chase music.
```

### P23 — Tiến hóa và thời gian địa chất | 72 BPM | 120 giây

```text
Compose an original instrumental documentary underscore about evolution, fossils and deep geological time. Aim for 120 seconds at 72 BPM. Use warm low strings, restrained piano, slowly developing pads and occasional quiet mallet notes. Create a sense of patient transformation and large timescales through gradual harmonic movement. Avoid monster-movie tension or prehistoric battle music. Keep narration dominant and dynamics even. Include a spacious loop-friendly middle and a reflective ending. No dinosaur sounds, vocals, choir, loud brass or huge percussion.
```

### P24 — Con người và suy ngẫm | 68 BPM | 120 giây

```text
Produce an original instrumental narration bed for a reflective documentary conclusion about people, memory and meaning. Aim for 120 seconds at 68 BPM. Use soft felt piano, warm acoustic guitar and a thin layer of low strings. Convey gratitude and open-ended reflection without melodrama or a strong emotional instruction. Keep phrases modest and leave silence between musical gestures for Vietnamese speech. Include a stable central section and a gentle, complete final cadence. No vocals, choir, sentimental violin solos or large swells.
```

## E. Shorts — P25–P30

### P25 — Hook tò mò | 108 BPM | 60 giây

```text
Create an original 60-second instrumental background track for a Vietnamese educational Short at 108 BPM. Start immediately with a soft two-note plucked motif, rounded bass and minimal crisp percussion. Establish curiosity in the first two seconds without a loud hit. Keep energy steady beneath rapid narration, with small texture changes around 15, 30 and 45 seconds. Leave the midrange open and finish cleanly without a long fade. No vocals, catchy lead melody, EDM drop, harsh cymbals or sound effects.
```

### P26 — Lịch sử nhanh | 100 BPM | 60 giây

```text
Compose an original 60-second instrumental narration bed for a fast historical Short at 100 BPM. Use muted strings, soft wooden percussion, understated piano and a gentle low pulse. Make the opening engaging immediately, with a dignified sense of discovery rather than epic drama. Support clear Vietnamese speech with restrained musical density and stable loudness. Add subtle development near 20 and 40 seconds, then a short quiet resolution. No vocals, marching drums, trailer brass, impacts, quoted historical tunes or aggressive bass.
```

### P27 — Khoa học bất ngờ | 114 BPM | 60 giây

```text
Write an original 60-second instrumental background track for a surprising science fact Short at 114 BPM. Use rounded digital plucks, muted mallets, a warm synth bass and light dry percussion. The rhythm should feel nimble and curious without rushing the narrator. Begin with usable musical material immediately and maintain consistent volume. Introduce a small harmonic lift around 35 seconds, not a dramatic drop. End cleanly. No vocals, glitch effects, piercing synth leads, familiar melodies or dense midrange.
```

### P28 — Bí ẩn ngắn | 96 BPM | 60 giây

```text
Create an original 60-second instrumental underscore for an evidence-based mystery Short at 96 BPM. Use sparse low piano, soft synth pulses, restrained plucked strings and delicate percussion. Build gentle curiosity from the first second, sustaining mild tension while leaving space for Vietnamese narration. Keep the track controlled rather than frightening. Offer a subtle change around the halfway point and a softly unresolved ending. No voices, whispers, jump scares, ticking recordings, horror drones, aggressive risers or large impacts.
```

### P29 — Đời thường dí dỏm | 106 BPM | 60 giây

```text
Compose an original 60-second instrumental background track for an approachable Short about everyday habits at 106 BPM. Combine light acoustic guitar, warm mallets, soft electric piano and understated percussion. Make the mood observant and gently witty, avoiding cartoon comedy and exaggerated bounce. Keep motifs short and leave room for Vietnamese voiceover. Start promptly, maintain even energy and add one subtle variation around 30 seconds. End with a modest cadence. No vocals, whistles, claps, comedy effects or advertising-style chorus.
```

### P30 — Cảm xúc nhẹ nhàng | 84 BPM | 60 giây

```text
Produce an original 60-second instrumental narration bed for a thoughtful Vietnamese Short at 84 BPM. Use soft felt piano, restrained acoustic guitar and warm low strings with a very light pulse. Begin gently but promptly, allowing the narrator to establish the emotion. Keep dynamics even and melodies unobtrusive. Introduce a small warm harmonic change in the final third and finish with a short natural resolution. No vocals, choir, swelling violin solos, loud drums, dramatic sadness or recognizable melodies.
```

## F. Cue ngắn cho chuyển chương và kết — P31–P36

Các cue này không phải nhạc loop. Đặt trong khoảng nghỉ lời đọc; tránh chồng thêm cue lên một đoạn BGM đang có nhiều nhạc cụ.

### P31 — Mở chương lịch sử | Khoảng 6 giây

```text
Create an original instrumental chapter-opening cue lasting approximately 6 seconds. Use one soft felt-piano gesture, a muted low-string chord and a restrained wooden percussion accent. The mood is dignified historical discovery. Give the cue a clear but gentle beginning, a small harmonic opening and a short clean decay. Leave the last second quiet enough for Vietnamese narration to enter. No vocals, choir, trailer impacts, risers, huge drums, quoted melodies or environmental sound effects.
```

### P32 — Chuyển sang câu hỏi mới | Khoảng 5 giây

```text
Compose an original instrumental transition cue lasting approximately 5 seconds. Use three soft rounded synth-pluck notes over a warm low pad, with a tiny muted rhythmic accent. Suggest a new question and a shift in attention, not a shocking reveal. Keep the transient gentle and the volume modest. Make the ending slightly open harmonically, with a clean short decay that leaves room for narration. No vocals, whooshes, alarms, harsh bells, dramatic hits or recognizable melodies.
```

### P33 — Đồ thị và dữ liệu | Khoảng 4 giây

```text
Write an original instrumental cue lasting approximately 4 seconds for the appearance of a chart or an explanatory diagram. Use warm mallets and soft electric-piano tones in a simple ascending three-note figure, with no strong drum beat. Convey clarity and a small discovery. Keep the cue compact, clean and moderate in level, with a short final decay. It should support Vietnamese narration rather than interrupt it. No vocals, notification sounds, cash-register effects, piercing tones or dramatic risers.
```

### P34 — Manh mối quan trọng | Khoảng 6 giây

```text
Create an original instrumental documentary cue lasting approximately 6 seconds for a meaningful clue. Use sparse low piano, a soft cello note and a restrained harmonic shift that becomes slightly clearer. Communicate attention and understanding rather than danger. Avoid a loud attack or forced climax. Finish with a short warm decay, allowing a clean transition back to the narration bed. No vocals, whispers, horror stingers, impacts, aggressive bass, whooshes or recognizable suspense motifs.
```

### P35 — Kết luận ấm áp | Khoảng 8 giây

```text
Compose an original instrumental closing cue lasting approximately 8 seconds. Use gentle felt piano, a warm acoustic-guitar note and quiet low strings. Create a modest resolving cadence that feels thoughtful and grateful, suitable for the last lines of a Vietnamese documentary. Keep the melody short and dynamics restrained, with a natural final decay rather than a cut-off. No vocals, choir, celebratory brass, swelling drums, applause, sentimental solos or recognizable melodies.
```

### P36 — CTA xanh nhẹ nhàng | Khoảng 5 giây

```text
Produce an original instrumental cue lasting approximately 5 seconds for a small character speech-bubble call to action. Use soft rounded mallets, warm electric piano and a gentle two-note harmonic lift. Make it friendly, light and brief, leaving space for separate mouse-click sounds and Vietnamese speech. Avoid sharp accents at the exact start. End cleanly with a short decay. No vocals, slogans, whistles, clapping, interface clicks, notification bells, loud percussion or advertising jingles.
```

## Tạo các phiên bản để dựng linh hoạt

Sau khi chọn được mẫu tốt, yêu cầu biến thể dựa trên chính bản đó nếu model hỗ trợ tham chiếu audio hoặc chức năng variation. Seed giống nhau chỉ nên dùng khi model thực sự có tính năng seed; không giả định nó giữ nguyên giai điệu.

### Bản nhẹ hơn cho đoạn nhiều lời

```text
Using the selected track as the musical reference, make a lower-density variation. Preserve its tempo, key, harmonic progression, instrument palette and general mood. Reduce percussion activity and remove the most prominent melodic phrases. Leave more gaps between gestures and keep the midrange open for spoken narration. Maintain a stable level and a loop-friendly central section. Instrumental only. Do not add new sound effects or a dramatic climax.
```

### Bản có nhịp hơn cho bản đồ và infographic

```text
Using the selected track as the musical reference, create a slightly more rhythmic variation. Preserve the tempo, key, harmony and overall mood. Add restrained soft percussion and a quiet repeating bass pulse without increasing peak intensity. Keep the lead melody understated and leave clear space for narration. Maintain a loop-friendly middle and clean editing points. Instrumental only. No vocals, hard drums, drops or sound effects.
```

### Bản không trống

```text
Create a percussion-free variation of the selected track while preserving its tempo feel, key, harmony, melodic identity and mood. Keep piano, plucked instruments, soft pads and low strings as appropriate. Maintain gentle motion through musical phrasing rather than drum hits. Leave generous space for narration and preserve a stable central section suitable for looping. Instrumental only. No vocals, new sound effects or strong crescendos.
```

Nếu model có xuất stems, lấy riêng percussion, bass, harmony và melody. Có thể giảm hoặc bỏ melody khi lời đọc dày; không yêu cầu stems trong prompt rồi mặc định model đã tách đúng, cần kiểm tra file đầu ra.

## Chọn nhanh theo chủ đề trong repo

| Nhóm video | Nhạc nền khởi đầu | Cue có thể phối |
| --- | --- | --- |
| Pharaoh, Maya, triều đại | P01, P02, P03, P06 | P31, P35 |
| Khoảng trống lịch sử | P06, P13, P16 | P32, P34 |
| Thế giới ngầm | P14, P13 | P32, P34 |
| Thời gian thế giới | P09, P07 | P33, P35 |
| Nhị phân, công nghệ | P08, P07 | P33 |
| Mạng xã hội, kinh tế | P12, P16 | P32, P33 |
| Lịch sử trò chơi | P20, P04, P19 | P31, P35 |
| Sinh học, động vật | P10, P22, P23 | P33, P35 |
| Shorts | P25–P30 theo sắc thái | Chỉ thêm cue nếu còn khoảng nghỉ |

## Khi nhận được nhạc thật

- Nghe riêng nhạc và nghe cùng giọng Trúc Ly: nhận diện vocal/humming không mong muốn, nốt chói, nhạc lấn lời, lỗi lặp và đầu/cuối bị cắt.
- Kiểm tra duration, sample rate, số kênh và clipping trên file thật; các chỉ dẫn trong prompt chưa phải bằng chứng đầu ra đạt chuẩn.
- Với voiceover `1.0`, bắt đầu nhạc `0.08`; lời dày dùng `0.04–0.06`. Chỉnh từng track sau QA nhưng **không vượt `0.5`**, kể cả tổng gain khi chuyển bài. `0.5` là trần, không phải mặc định; ducking mượt, không tăng nhạc ở mỗi pause ngắn. Theo [quy trình mix](BACKGROUND_MUSIC_GUIDE.md), không coi preset là bảo đảm phù hợp mọi track.
- Video dài chọn nhiều track nhất quán theo chương/cảm xúc, lưu cue sheet (from/duration/trim/gain/fade/loop), crossfade 1–3 giây và nghe từng cặp chuyển. Không loop một bài toàn video theo thói quen hoặc đổi bài mỗi ảnh.
- Căn loop theo nhịp/hòa âm, kiểm tra crossfade bằng tai; một track được yêu cầu loop-friendly vẫn có thể có điểm nối không đạt.
- Ghi nguồn, điều khoản và phiên bản nhạc vào hồ sơ video. Lưu audio gốc, bản chỉnh và mức gain để có thể sửa lại.
- Phối nhạc dưới một clip thử có voiceover, phụ đề và CTA trước khi render video dài.
