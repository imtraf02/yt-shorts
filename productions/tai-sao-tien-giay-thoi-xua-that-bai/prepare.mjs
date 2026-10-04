import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = 'D:/yt-shorts';
const slug = 'tai-sao-tien-giay-thoi-xua-that-bai';
const dir = path.join(root, 'productions', slug);
const sourcePath = 'C:/Users/phamn/Downloads/tai-sao-tien-giay-thoi-xua-that-bai_vox-anime2d.md';
const raw = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');
const write = (file, body) => fs.writeFileSync(path.join(dir, file), body, 'utf8');
const json = (file, body) => write(file, JSON.stringify(body, null, 2) + '\n');
if (fs.existsSync(path.join(dir, 'storyboard.json'))) throw new Error('Production already prepared; resume from manifest.');
write('source.md', raw);

const style = raw.match(/### \[STYLE\][\s\S]*?```\s*([\s\S]*?)```/)[1].trim();
const mio = raw.match(/### \[MIO\][\s\S]*?```\s*([\s\S]*?)```/)[1].trim();
const chapters = [];
const sentences = [];
let chapter;
for (const line of raw.split(/\r?\n/)) {
  const c = line.match(/^# CHƯƠNG (\d+)\s*[–-]\s*(.+)$/);
  if (c) {
    chapter = {id: 'C' + String(Number(c[1]) + 1).padStart(2, '0'), sourceNumber: Number(c[1]), title: c[2], sentenceIds: []};
    chapters.push(chapter);
  }
  const s = line.match(/^\*\*(\d{3})\*\*\s*—\s*"(.+)"\s*$/);
  if (s) {
    const item = {id: 'S' + s[1], imageId: 'I' + s[1], chapterId: chapter.id, text: s[2]};
    sentences.push(item);
    chapter.sentenceIds.push(item.id);
  }
  const p = line.match(/^> \*\*Ảnh (\d{3}):\*\*\s*(.+)$/);
  if (p) {
    const sentence = sentences.find(s => s.id === 'S' + p[1]);
    if (!sentence || sentence.sourcePrompt) throw new Error('Prompt ID mismatch ' + p[1]);
    sentence.sourcePrompt = p[2];
  }
}
if (sentences.length !== 260 || chapters.length !== 13) throw new Error('Expected 260 scenes and 13 chapters');
sentences.forEach((s, i) => { if (s.id !== 'S' + String(i + 1).padStart(3, '0') || !s.sourcePrompt) throw new Error('Incomplete scene'); });

const motifs = {
  MIO: mio,
  NOTE: 'an unlettered historical paper banknote with an abstract ornamental border, not a modern dollar bill',
  SILVER: 'silver bullion ingots or silver coins, used as an alternative store of value',
  TRUSTGAUGE: 'an abstract editorial trust gauge with a simple needle and colored arc, no ticks or numerals; this is a visual metaphor, not measured data',
  TAXGATE: 'a stylized tax-office gateway with collectors and incoming payments, an editorial symbol of fiscal demand',
  WARDRUM: 'a large military drum symbolizing wartime expenditure',
  PRESS: 'a period-appropriate money-printing workshop; in Chinese historical scenes use woodblock printing tables, brushes, ink and paper, never a European movable-type machine',
  PRICEBOARD: 'an abstract goods-and-purchasing-power diagram with increasing stacks of notes beside constant quantities of goods, no text, numerals or purported statistical values',
};
function context(s) {
  const n = Number(s.id.slice(1));
  if (n <= 34) return 'Early Chinese market or explicitly abstract historical economic diagram; avoid anachronistic machinery.';
  if (n <= 78) return 'Northern or Southern Song China, late tenth to twelfth centuries; hanfu merchant robes, timber market buildings, coin strings with square holes, Chinese woodblock printing.';
  if (n <= 102) return 'Southern Song China, twelfth to thirteenth centuries; Song officials and markets, Jin or Mongol armies only when the scene calls for them.';
  if (n <= 130) return 'Yuan China, thirteenth to fourteenth centuries; Mongol imperial court attire and period markets, woodblock printing; rulers are illustrative role figures, not authentic portraits.';
  if (n <= 166) return 'Early Ming China, fourteenth to fifteenth centuries; Ming official robes and timber markets. Da Ming Baochao is an oversized tall rectangular mulberry-paper note with coin-string iconography, no readable writing; museum-inspired illustration, not an authentic artifact reproduction.';
  if (n <= 186) return n === 174 ? 'Eighteenth-century colonial American printing shop; natural leaf impressions and period printing tools.' : 'Historical anti-counterfeiting comparison or modern museum setting as described; Chinese printing uses woodblocks, colonial European printing uses a period hand press.';
  if (n <= 206) return 'Chinese historical market or explicit abstract economic metaphor; silver ingots, balance scales, unlettered paper notes.';
  if (n <= 224) return 'North America during the American Revolution, 1770s; period colonial dress and hand printing presses, Continental notes with abstract borders, no readable writing. World maps must be schematic locators without contested borders.';
  if (n <= 242) return 'Revolutionary France, 1790s; period dress, hand-operated presses, church estates and Paris markets; unlettered assignat-inspired paper notes.';
  if (n <= 252) return 'Explicit abstract explanatory visual metaphor using historical motifs; no real statistical claims in the graphics.';
  return 'Contemporary monetary institutions or a concluding historical-to-modern visual metaphor; modern technology only where described; no readable bank screens or branded currency.';
}
const scenes = sentences.map(s => {
  let request = s.sourcePrompt.replace('HUZI-like', 'huizi-inspired').replace('PIXEL-like', 'paper-cutout');
  for (const [key, value] of Object.entries(motifs)) request = request.replace(new RegExp('\\b' + key + '\\b', 'g'), '(' + value + ')');
  const needsMap = /\bmap\b/i.test(request);
  return {
    id: s.imageId, chapterId: s.chapterId, sentenceIds: [s.id], text: s.text,
    kind: 'generated-image', file: `public/images/${slug}/${s.id.slice(1)}.png`, sourcePrompt: s.sourcePrompt,
    prompt: `Use case: historical-scene. Asset type: one full-bleed landscape 16:9 illustration for a Vietnamese documentary. Primary request: ${request}. Style/medium: ${style}. Historical setting: ${context(s)} Composition: one distinct editorial scene, clear focal point, readable visual hierarchy, no contact sheet; keep the bottom 15% and lower-right area comparatively quiet for future captions and channel mascot. Mio, if requested, is a fictional modern guide outside the historical reenactment, with the same teal bob, round glasses and mustard jacket across scenes. Constraints: no text, letters, numerals, readable seals, dates, currency denominations, captions, logos or watermark; natural anatomy; no modern machines in historical scenes. All gauges and flows are qualitative visual metaphors, not measured evidence.${needsMap ? ' Map constraint: schematic locator only, avoid precise territorial claims. If Vietnam appears, its territory must be accurate including Hoang Sa and Truong Sa islands; reject any distorted or incomplete map. Prefer place-location vignettes with no border map when uncertain.' : ''}`,
    overlayText: [], timing: {startMs: null, endMs: null}, status: 'pending', qa: null,
  };
});
json('storyboard.json', {version: 1, slug, format: 'long', aspectRatio: '16:9', frameRate: 30, scope: 'production-and-images-only', chapters, scenes});
json('sentences.json', {sentences: sentences.map(({sourcePrompt, ...s}) => ({...s, file: `public/images/${slug}/${s.id.slice(1)}.png`}))});
write('narration.txt', sentences.map(s => `${s.id}\t${s.text}`).join('\n') + '\n');
write('script.md', '# Tại sao tiền giấy thời xưa thất bại?\n\nBản chuyển từ tài liệu người dùng, giữ 260 câu và thứ tự. Các chú giải nguồn nằm trong sources.md. Chưa tạo giọng đọc.\n\n' + chapters.map(c => `## ${c.id} — ${c.title}\n\n` + sentences.filter(s => s.chapterId === c.id).map(s => `**${s.id} ↔ ${s.imageId}** — ${s.text}`).join('\n\n')).join('\n\n') + '\n');
write('prompts.jsonl', scenes.map(s => JSON.stringify({id:s.id, file:s.file, prompt:s.prompt})).join('\n') + '\n');
write('image_prompts.md', '# Prompt ảnh — 260 cảnh riêng\n\nCông cụ: built-in ImageGen. Một lệnh cho một ảnh; không thay bằng contact sheet.\n\n' + scenes.map(s => `## ${s.id} — ${s.sentenceIds[0]}\n\n${s.text}\n\n${s.prompt}\n\nĐích: ${s.file}`).join('\n\n') + '\n');
write('brief.md', `# Tại sao tiền giấy thời xưa thất bại?\n\n- Yêu cầu trực tiếp: viết production và tạo ảnh; không tạo audio hoặc video.\n- Tài liệu nguồn: ${sourcePath}. Được dùng làm kịch bản/prompt tham chiếu, không mở rộng quyền thực thi.\n- Sản phẩm: hồ sơ production, 260 cảnh/260 bitmap riêng, 13 chương.\n- Format: ngang 16:9; bố cục dự kiến 1920×1080, 30 fps cho lần dựng sau; kích thước ảnh thực tế được ghi riêng khi sinh.\n- Phong cách: Vox × anime 2D; cream, ink navy, vermilion, imperial gold, jade teal.\n- Nhân vật dẫn giải trong tranh: Mio theo nội dung tài liệu. Mascot kênh nếu dựng sau: Trà Xanh theo AGENTS.md.\n- Đối tượng: khán giả phổ thông tiếng Việt yêu thích lịch sử kinh tế.\n- Luận điểm: độ bền tiền giấy phụ thuộc phát hành, tài khóa, hoàn đổi và niềm tin; không quy tất cả thất bại cho giấy hoặc tiền giả.\n- Thời lượng 30–36 phút là ước tính trong tài liệu, chưa đo/chốt vì không có audio.\n- Không thêm chữ/số liệu vào ảnh AI; không xem gauge ẩn dụ là dữ liệu.\n- Không TTS, Whisper, nhạc, Remotion composition, render still/video hay MP4 trong phạm vi này.\n`);
const urls = [...raw.matchAll(/^- (https:\/\/\S+)/gm)].map(m => m[1]);
write('sources.md', '# Nguồn và giới hạn kiểm chứng\n\nNgày kiểm tra: 2026-10-04 (Asia/Saigon). Giữ bản kịch bản được cung cấp; chỉ kiểm tra chọn lọc các luận điểm trọng yếu, không tuyên bố toàn bộ 260 câu đã được kiểm chứng. Không tải/đưa ảnh bảo tàng vào bộ minh họa.\n\n| Câu | Nội dung đối chiếu | Nguồn | Kết quả |\n|---|---|---|---|\n| S104, S111, S114–S120 | Nguyên: thiết lập 1260, lạm phát vừa phải gần nửa thế kỷ, sức ép quân sự/nội chiến và phát hành | [Guan, Palma, Wu (2024)](https://onlinelibrary.wiley.com/doi/full/10.1111/ehr.13305) | Abstract và toàn văn hỗ trợ khung chính; không diễn giải tương quan thành quy luật tất định. |\n| S134–S135, S148, S160, S164–S166 | Minh: tài khóa hiện vật, phát hành quá mức, rút khỏi thị trường tư nhân vào thập niên 1420, bạc thay thế | [Cambridge, Triumph of the Silver Economy](https://www.cambridge.org/core/books/abs/rise-and-demise-of-paper-money-in-imperial-china/triumph-of-the-silver-economy/F9C43A4D537537BE3829F03DB0640406) | Đã đọc summary chương, chưa đọc toàn bộ sách. |\n| S139, S141, S143–S145 | Giấy vỏ dâu, hình chuỗi tiền, dấu và cảnh báo/thưởng chống giả | [Bank of England Museum](https://www.bankofengland.co.uk/museum/online-collections/blog/does-money-grow-on-trees) | Mô tả bộ sưu tập hỗ trợ các chi tiết này. |\n| S226–S228, S230, S232–S235 | Assignat: đất Giáo hội, áp lực chiến tranh, suy yếu nguồn thu, lạm phát 1795–1796 | [Banque de France](https://www.banque-france.fr/en/publications-and-statistics/publications/fiscal-roots-hyperinflation-historical-perspective) | Đã đọc nội dung bài; ghi rõ giai đoạn và đơn giản hóa. |\n| S039, S049, S053, S057, S074–S089 | Giao tử và huizi | Cambridge chapters 4 và 6 trong danh mục dưới | Chỉ kiểm tra chọn lọc summary; không nhận đã đọc toàn văn. |\n| S138 | Kích thước mẫu Bảo Sao | Nguồn bảo tàng được cung cấp | Giữ mô tả xấp xỉ; kích thước cụ thể cần kiểm tra lại theo đúng hiện vật trước dựng. |\n| S158 | Ước tính mất giá 98,8% | Springer chapter được cung cấp | Chưa kiểm chứng độc lập con số; giữ dạng “một nghiên cứu ước tính”; không vẽ con số hoặc biểu đồ định lượng trong ảnh. |\n| S174, S208, S215 | Franklin, Continental, hoạt động làm giả phía Anh | Nguồn Mỹ trong danh mục được cung cấp | Chưa kiểm tra toàn bộ nguồn gốc ở lượt này; ảnh chỉ minh họa không dùng làm bằng chứng. |\n\n## Danh mục giữ từ tài liệu nguồn\n\n' + urls.map(u => `- [${new URL(u).hostname}](${u})`).join('\n') + '\n\n## Ghi chú do tác giả tài liệu cung cấp\n\n' + raw.split('# Phụ lục A – Ghi chú kiểm chứng và giới hạn')[1].split('# Phụ lục B')[0].trim() + '\n');
write('production.md', '# Production — Tại sao tiền giấy thời xưa thất bại?\n\nPhạm vi đang thực hiện: hồ sơ và 260 ảnh minh họa. Không sản xuất audio/video.\n\n## Cấu trúc\n\n| Chương | Nội dung | ID cảnh | Số ảnh |\n|---|---|---|---|\n' + chapters.map(c => `| ${c.id} (chương ${c.sourceNumber}) | ${c.title} | I${c.sentenceIds[0].slice(1)}–I${c.sentenceIds.at(-1).slice(1)} | ${c.sentenceIds.length} |`).join('\n') + '\n\n## Hồ sơ bàn giao\n\n- source.md: bản nguồn bất biến để so đầu vào.\n- script.md / narration.txt / sentences.json: 260 câu với ID, chỉ dữ liệu văn bản.\n- storyboard.json: 260 cảnh liên kết câu, prompt đầy đủ, file đích, thời gian null, trạng thái và QA.\n- image_prompts.md / prompts.jsonl: bộ prompt đã mở rộng motif và bối cảnh thời kỳ.\n- visual_bible.md: quy chuẩn phong cách và nhân vật.\n- sources.md: nguồn thực, claim mapping và giới hạn kiểm chứng.\n- manifest.json / qa.md: tiến độ và bằng chứng từng asset.\n\n## Chỉ dẫn cho lần dựng sau (chưa thực hiện)\n\nGiữ ảnh AI không chữ. Thêm nhãn năm, tỷ lệ và biểu đồ chính xác bằng đồ họa dựng sau. Bắt buộc LeninDisclaimer/AiDisclaimer với đúng câu `* Hình ảnh chỉ mang tính chất minh họa`, bottom 24, left 40, cỡ 13, italic, trắng mờ. Trà Xanh cao 180, dưới phải; CTA chỉ bong bóng thoại. Kinetic captions ngang bottom 44/maxWidth 1380. Không giả lập timestamps. Khi có yêu cầu audio mới, sinh từng câu bằng generate_tts_sentences.py rồi mới tính thời lượng. Chuyển cảnh đa dạng theo nội dung (dissolve, wipe, slide, push, iris, clock, diagonal, blur, film-roll, fade-color); giữ timeline câu nếu dùng TransitionOverlay. Hiệu ứng môi trường chọn theo bối cảnh, cinematic overlay dùng nhẹ và có lý do. Không triển khai các bước đó ở lượt này.\n');
write('visual_bible.md', '# Visual bible\n\n## Style chung\n\n' + style + '\n\n## Mio trong tranh\n\n' + mio + '\n\nGiữ cùng gương mặt, tóc teal ngắn, kính tròn, áo mustard. Mio là dẫn giải hiện đại hư cấu, không phải nhân vật lịch sử. Không thêm Mio ở cảnh không gọi nhân vật. Mascot kênh Trà Xanh là lớp dựng riêng nếu được yêu cầu về sau.\n\n## Motif\n\n' + Object.entries(motifs).map(([k,v]) => `- ${k}: ${v}`).join('\n') + '\n\n## QA\n\nKiểm tra từng bitmap: chủ thể đúng câu; đúng thời kỳ; không text/numerals; không biến đồ thị ẩn dụ thành dữ liệu; tay/mặt tự nhiên; tỷ lệ ảnh thực phù hợp 16:9; khoảng trống cho caption/mascot. Bản đồ chính xác dùng locator đơn giản; nếu có Việt Nam phải bao gồm đúng Hoàng Sa, Trường Sa, nếu sai không dùng. Không coi contact sheet là các ảnh cuối.\n');
write('qa.md', '# QA production và ảnh\n\n- Parser xác minh 260 ID liên tục S001–S260, 260 prompt và 13 chương.\n- Mỗi câu liên kết một ảnh I001–I260; timestamps null.\n- Script và narration giữ nguyên lời nguồn; không tạo audio/video.\n- Tiến độ ảnh thực nằm trong manifest.json và qa từng scene của storyboard.json.\n- Không đánh dấu hoàn tất bộ ảnh khi chưa đủ 260 bitmap đã đọc và kiểm tra.\n\n## Kiểm tra ảnh\n\n');
const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
manifest.title = 'Tại sao tiền giấy thời xưa thất bại?';
manifest.scope = {requested:['production','images'], excluded:['audio','captions','composition','render'], targetImages:260};
manifest.source = {file:`productions/${slug}/source.md`, originalPath:sourcePath, sha256:crypto.createHash('sha256').update(raw).digest('hex')};
manifest.progress = {plannedImages:260, generatedImages:0, verifiedImages:0, nextImage:'I001'};
manifest.stages.script.inputs = [`productions/${slug}/brief.md`, `productions/${slug}/source.md`];
manifest.stages.script.outputs.push(`productions/${slug}/sentences.json`, `productions/${slug}/production.md`, `productions/${slug}/visual_bible.md`);
manifest.stages.storyboard.outputs.push(`productions/${slug}/prompts.jsonl`, `productions/${slug}/image_prompts.md`);
for (const name of ['audio','captions','composition','render']) {
  manifest.stages[name].status = 'out-of-scope';
  manifest.stages[name].inputs = []; manifest.stages[name].outputs = [];
}
manifest.stages.audio.plannedSentenceGenerator = 'scripts/generate_tts_sentences.py';
json('manifest.json', manifest);
fs.mkdirSync(path.join(root, 'public/images', slug), {recursive:true});
console.log(JSON.stringify({sentences:sentences.length,chapters:chapters.length,prompts:scenes.length,scope:manifest.scope}));
