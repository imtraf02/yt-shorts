import fs from 'node:fs';
import path from 'node:path';

const base = 'productions/bia-vi-sinh';
const slug = 'bia-vi-sinh';
const read = (name) => fs.readFileSync(`${base}/${name}`, 'utf8').replace(/^\uFEFF/, '');
const write = (name, value) => fs.writeFileSync(`${base}/${name}`, value);
const json = (name, value) => write(name, JSON.stringify(value, null, 2) + '\n');
const style = 'One standalone 16:9 documentary illustration, 1920x1080 preferred. Original 2D anime editorial explainer, clean ink contours, precise cel shading, subtle paper texture, amber gold and emerald on dark teal. Educational, curious, never a beer advertisement. Quiet lower 18 percent for captions; bottom-right free for a separate Trà Xanh mascot added later. No text, labels, numerals, logos, watermark, borders, collage or contact sheet. No children drinking. No invented chemical formulas or maps. Scientific particles are conceptual metaphors, not exact molecular structures. Historically grounded materials for ancient scenes; modern technical scenes use sanitary equipment. Never portray an illustration as an actual artifact photograph.';
const sources = [
 ['R01','The Met — Model Bakery and Brewery','https://www.metmuseum.org/art/collection/search/544258','C02','Niên đại và mô tả hiện vật, quan hệ bánh mì–bia; tái dựng không phải ảnh hiện vật.','Nguồn bảo tàng trực tiếp'],
 ['R02','Brewing and the Chemical Composition of Amine-Containing Compounds in Beer','https://pmc.ncbi.nlm.nih.gov/articles/PMC8833903/','C03,C04,C09','Malting, sấy, mashing, wort và vai trò Maillard.','Tổng quan học thuật; chỉ diễn giải các bước cơ bản'],
 ['R03','Review on Recent Advances and Novel Approaches in Milling and Mashing','https://pmc.ncbi.nlm.nih.gov/articles/PMC12333336/','C04','Nghiền, enzyme amylase, ảnh hưởng điều kiện mash.','Tổng quan học thuật'],
 ['R04','Packing a punch: understanding how flavours are produced in lager fermentations','https://pmc.ncbi.nlm.nih.gov/articles/PMC8310685/','C03,C06,C10','Nguyên liệu, men, ester và hương trong lager.','Đã kiểm tra mô tả được lập chỉ mục; mở toàn văn gặp reCAPTCHA, cần đối chiếu lại chi tiết trước dựng'],
 ['R05','Effects of Dry-Hopping on Beer Chemistry and Sensory Properties','https://www.mdpi.com/1420-3049/28/18/6648','C05','Dry hopping nhấn hương nhưng có thể thay đổi độ đắng.','Tổng quan; nội dung lập chỉ mục, truy cập toàn văn lỗi'],
 ['R06','Hop bitter acids: resources, biosynthesis, and applications','https://pubmed.ncbi.nlm.nih.gov/34021813/','C05','Acid đắng của hoa bia và ứng dụng trong nấu bia.','Tổng quan học thuật'],
 ['R07','Microbe Profile: Saccharomyces eubayanus','https://pmc.ncbi.nlm.nih.gov/articles/PMC6230766/','C06,C07','Tổ tiên men lager, chịu lạnh.','Mô tả lập chỉ mục; mở toàn văn gặp reCAPTCHA'],
 ['R08','Lager-brewing yeasts in the era of modern genetics','https://pmc.ncbi.nlm.nih.gov/articles/PMC6790113/','C06,C07','S. pastorianus và nguồn gốc lai, tránh chốt một lần phát minh.','Tổng quan di truyền'],
 ['R09','Brewers Association — Beer Styles','https://www.brewersassociation.org/resource-hub/beer-styles/','C07','Nhiều phong cách bia; không tái bản bảng phân loại hoặc số liệu ABV.','Nguồn ngành trực tiếp, không sử dụng nội dung guideline nguyên văn'],
 ['R10','Comparative Study on Protein Composition and Foam Characteristics of Barley and Wheat Beer','https://pmc.ncbi.nlm.nih.gov/articles/PMC11545182/','C08','Protein/peptide và hợp chất hoa bia trong ổn định bọt.','Nghiên cứu gốc; toàn văn mở được'],
 ['R11','NIAAA — Alcohol and the Brain','https://www.niaaa.nih.gov/alcohols-effects-health/alcohol-topics/health-topics-alcohol-and-brain','C11','Đường truyền tín hiệu, phán đoán và phối hợp vận động.','Nguồn sức khỏe chính thức'],
 ['R12','NIAAA — Alcohol Metabolism','https://www.niaaa.nih.gov/publications/alcohol-metabolism','C11','ADH, acetaldehyde, ALDH, acetate; chuyển hóa chủ yếu ở gan.','Nguồn sức khỏe chính thức; toàn văn mở được'],
 ['R13','NIAAA — Alcohol Flush Reaction','https://www.niaaa.nih.gov/publications/alcohol-flush-reaction-does-drinking-alcohol-make-your-face-red','C12','Biến thể ADH1B/ALDH2, phản ứng đỏ mặt, ảnh hưởng thuốc và rủi ro.','Nguồn sức khỏe chính thức'],
 ['R14','NIAAA — The Truth About Holiday Spirits','https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/truth-about-holiday-spirits','C13','Cà phê không đảo ngược tác động alcohol; thời gian chuyển hóa.','Nguồn sức khỏe chính thức; toàn văn mở được'],
 ['R15','WHO — Alcohol and cancer','https://www.who.int/europe/news-room/fact-sheets/item/alcohol-and-cancer','C14','Không xác định mức hoàn toàn không có rủi ro ung thư.','Nguồn chính thức; toàn văn mở được'],
 ['R16','WHO — No level of alcohol consumption is safe for our health','https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health/','C14','Không dùng lợi ích quan sát để khuyên bắt đầu uống vì sức khỏe.','Nguồn chính thức'],
 ['R17','IARC — Reduction or Cessation of Alcohol Consumption, Volume 20A FAQ','https://www.iarc.who.int/faq/iarc-handbooks-of-cancer-prevention-volume-20a-reduction-or-cessation-of-alcohol-consumption/','C14','Đồ uống có cồn thuộc Group 1; cơ sở nhân quả.','Nguồn phân loại trực tiếp'],
 ['R18','Ethanol modulates the influence of beer constituents on foam stability and interfacial properties','https://pubmed.ncbi.nlm.nih.gov/42691658/','C15','Bọt không cồn không thể giải thích chỉ bằng thiếu ethanol.','Nghiên cứu gốc; chỉ dùng kết luận trong abstract'],
];
const chapters = [];
const scenes = [];
for (const line of read('content.tsv').split(/\r?\n/).filter(Boolean)) {
 if (/^C\d{2}\t/.test(line)) {
  const [id,title] = line.split('\t'); chapters.push({id,title,sentenceIds:[]}); continue;
 }
 const [text,description] = line.split('|');
 if (!text || !description) throw new Error('Invalid content line');
 const n=scenes.length+1, suffix=String(n).padStart(3,'0'), chapter=chapters.at(-1);
 chapter.sentenceIds.push(`S${suffix}`);
 scenes.push({id:`I${suffix}`,chapterId:chapter.id,sentenceIds:[`S${suffix}`],text,description,
  kind:'generated-image',file:`public/images/${slug}/${suffix}.png`,prompt:`${style}\nScene: ${description}. Asset I${suffix}.`,
  overlayText:[],sourceIds:sources.filter(s=>s[3].split(',').includes(chapter.id)).map(s=>s[0]),
  timing:{startMs:null,endMs:null},status:n===1?'verified':'pending',qa:n===1?{visualReview:'Glass, foam, microscope and no text checked; quiet subtitle area and narrator area.',aspectRatio:'16:9 within rounding',width:1672,height:941}:null});
}
if(scenes.length!==160 || chapters.length!==16 || chapters.some(c=>c.sentenceIds.length!==10)) throw new Error('Expected 16 chapters / 160 scenes');
const overlays={3:['NẤM MEN'],4:['Đường → Ethanol + CO₂'],17:['Khoảng 1981–1975 TCN','Tái dựng minh họa; nguồn: The Met'],21:['NƯỚC','MALT','HOA BIA','MEN'],39:['WORT · DỊCH NHA'],42:['Alpha acid → Iso alpha acid'],58:['Saccharomyces pastorianus'],59:['S. cerevisiae + S. eubayanus'],61:['ALE / LAGER'],73:['Áp suất giảm'],85:['MÀU ≠ NỒNG ĐỘ CỒN'],94:['Isoamyl acetate · Gợi mùi chuối'],107:['Ethanol —ADH→ Acetaldehyde'],108:['Acetaldehyde —ALDH→ Acetate'],113:['ALDH2'],121:['Tỉnh hơn ≠ Hết cồn'],135:['Không có mức hoàn toàn vô rủi ro ung thư'],136:['IARC · Nhóm 1: mức chắc chắn của bằng chứng'],140:['BIA KHÔNG PHẢI THUỐC'],148:['Đọc thông tin lượng cồn trên sản phẩm']};
for(const [n,text] of Object.entries(overlays)) scenes[Number(n)-1].overlayText=text;
const old=fs.existsSync(`${base}/storyboard.json`)?JSON.parse(read('storyboard.json')):[];
for(const s of scenes){const prev=old.find(x=>x.id===s.id);if(prev && prev.prompt===s.prompt){s.status=prev.status;s.qa=prev.qa;s.provenance=prev.provenance;}}
json('storyboard.json',scenes);
json('chapters.json',chapters);
write('narration.txt',scenes.map(s=>s.text).join('\n')+'\n');
write('script.md','# BIA: Bên trong một ly bia có gì?\n\nKịch bản lời đọc tiếng Việt; 16 chương, 160 câu. Chữ overlay và hình ẩn dụ không thuộc lời đọc.\n\n'+chapters.map(c=>`## ${c.id} — ${c.title}\n\n`+scenes.filter(s=>s.chapterId===c.id).map(s=>`**${s.sentenceIds[0]} · ${s.id}** ${s.text}`).join('\n\n')).join('\n\n')+'\n');
write('prompts.md','# Bộ prompt ảnh — 160 asset riêng\n\nTạo bằng công cụ imagegen tích hợp, một lệnh cho một ảnh. Không dùng contact sheet thay ảnh giao. Nhãn được thêm hậu kỳ bằng code.\n\n'+scenes.map(s=>`## ${s.id} · ${s.chapterId} · ${s.sentenceIds[0]}\n\nĐích: \`${s.file}\`\n\n${s.prompt}\n\nOverlay sau này: ${s.overlayText.length?s.overlayText.join(' / '):'Không'}`).join('\n\n')+'\n');
write('sources.md','# Nguồn và giới hạn kiểm chứng\n\nNgày kiểm tra: 2026-10-02, Asia/Saigon. Không sao chép lời nguồn; kịch bản là diễn giải tiếng Việt. Không gọi bản nháp là đã xác minh toàn bộ. Một số nguồn PMC bị reCAPTCHA; trạng thái truy cập được ghi thật. Các cảnh lịch sử chưa có niên đại cụ thể là tái dựng giả định, không dùng để khẳng định phát minh đầu tiên.\n\n'+sources.map(s=>`## ${s[0]} — ${s[1]}\n\n- URL: ${s[2]}\n- Chương: ${s[3]}\n- Claim: ${s[4]}\n- Bằng chứng / giới hạn: ${s[5]}\n- Ngày đối chiếu: 2026-10-02\n`).join('\n')+'\n## Claim cần đối chiếu bổ sung trước khi dựng\n\n- C01 S006–S007: lọc/xử lý nhiệt và men trong thành phẩm; không nói mọi sản phẩm đã tiệt trùng.\n- C03 S024: khoáng nước/pH; không đưa con số nếu chưa kiểm tra nguồn chuyên biệt.\n- C07 S066: nguồn gốc từ lagern cần nguồn từ nguyên độc lập.\n- C08 S071–S075: nạp CO₂, áp suất và điểm tạo mầm; cần nguồn vật lý chuyên biệt nếu dựng đồ thị định lượng.\n- C10 S094–S095: isoamyl acetate/phenol cần mở nguồn toàn văn thay bản lập chỉ mục.\n- C14 S132–S134: nghiên cứu quan sát và yếu tố gây nhiễu cần nguồn phương pháp độc lập nếu mở rộng thành luận điểm định lượng.\n- C15 S143–S146: công nghệ giảm ethanol cần đối chiếu tổng quan công nghệ; không ngụ ý công thức nào cũng áp dụng cùng phương pháp.\n- C15 S148: chưa chốt quốc gia hay quy định pháp lý; không đưa ngưỡng nhãn non-alcoholic hoặc 0.0 chung cho mọi nơi.\n');
const syllables=scenes.reduce((n,s)=>n+s.text.split(/\s+/).length,0);
const estimate={syllableLikeUnits:syllables,unitsPerMinuteAssumption:[260,300],pauseSeconds:0.5,estimatedMinutes:[+(syllables/300+160*0.5/60).toFixed(1),+(syllables/260+160*0.5/60).toFixed(1)],measured:false};
json('asset_plan.json',{imageTarget:160,imageMaximum:200,generatedImageCount:scenes.filter(s=>['generated','verified'].includes(s.status)).length,uniquePrompts:160,chapters:chapters.map(c=>({id:c.id,title:c.title,imageCount:10,firstSentence:c.sentenceIds[0],lastSentence:c.sentenceIds.at(-1)})),durationEstimate:estimate,policy:'No padding to 200. 40 unused slots reserved for necessary new shots; replacement variants are tracked separately and must not inflate delivered count.'});
const job=JSON.parse(read('manifest.json'));
job.title='BIA: Bên trong một ly bia có gì?';job.scope={requested:['production-documents','generated-images'],excluded:['tts','captions','composition','render'],imageTarget:160,imageMaximum:200};
job.settings.pauseSeconds=0.5;job.settings.character={name:'Trà Xanh',height:180,side:'right',bottom:20,right:40};
job.settings.backgroundMusic=false;job.durationEstimate=estimate;
job.stages.script.inputs=[`${base}/brief.md`,`${base}/concept-original.txt`,`${base}/content.tsv`];
job.stages.script.outputs=[`${base}/script.md`,`${base}/narration.txt`,`${base}/sources.md`,`${base}/analysis.md`];
job.stages.storyboard.inputs=[`${base}/script.md`,`${base}/build-production.mjs`];
job.stages.storyboard.outputs=[`${base}/storyboard.json`,`${base}/chapters.json`,`${base}/prompts.md`,`${base}/asset_plan.json`,`${base}/art_direction.md`];
job.stages.images.outputs=scenes.map(s=>s.file);
job.stages.audio.inputs=[`${base}/narration.txt`,'scripts/generate_tts_sentences.py'];
job.stages.audio.outputs=[`public/audio/${slug}/sentences_manifest.json`,...scenes.map(s=>`public/audio/${slug}/${s.sentenceIds[0]}.wav`)];
for(const stage of ['audio','captions','composition','render'])job.stages[stage].scopeStatus='not-requested';
job.progress={plannedImages:160,verifiedImages:scenes.filter(s=>s.status==='verified').length,pendingImages:scenes.filter(s=>s.status==='pending').length};
json('manifest.json',job);
console.log(JSON.stringify({chapters:chapters.length,scenes:scenes.length,estimate}));
