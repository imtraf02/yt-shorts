import fs from 'node:fs';
const base='productions/the-loai-game',slug='the-loai-game';
if(fs.existsSync(`${base}/storyboard.json`))throw Error('Existing production; do not rebuild');
const original=fs.readFileSync('C:/Users/phamn/Downloads/the-loai-game_vox-anime2d.md','utf8');
fs.writeFileSync(`${base}/concept-original.md`,original);
const pad=n=>String(n).padStart(3,'0'),save=(f,x)=>fs.writeFileSync(`${base}/${f}`,typeof x==='string'?x:JSON.stringify(x,null,2)+'\n');
const chapters=[],sentences=[];let chapter,last,genre='',coreByGenre={};
for(const line of original.split(/\r?\n/)){
 const h=line.match(/^# CHƯƠNG (\d+) – (.+)$/);if(h){chapter={id:`C${String(chapters.length+1).padStart(2,'0')}`,originalChapterNumber:+h[1],title:h[2],sentenceIds:[],sceneIds:[]};chapters.push(chapter);}
 const a=line.match(/^\*\*(\d{3})\*\* — "(.+)"$/);if(a){last={id:`S${a[1]}`,number:+a[1],chapterId:chapter.id,originalText:a[2],text:a[2]};sentences.push(last);chapter.sentenceIds.push(last.id);}
 const p=line.match(/^> \*\*Ảnh (\d{3}):\*\* (.+)$/);if(p&&last){last.originalPrompt=p[2];const g=p[2].match(/^MIO presents (.+?) through /);if(g){genre=g[1];coreByGenre[genre]=p[2].replace(/^MIO presents .+? through /,'').replace(/, using GENREWHEEL slices.*$/,'');}last.genre=genre;}
}
if(sentences.length!==340||chapters.length!==11||sentences.some(s=>!s.originalPrompt))throw Error('Input parsing failed');
const edits={
 5:'Trong sơ đồ này, các vòng lặp dễ nhận biết được đặt ở những nhánh gốc để giúp ta bắt đầu.',
 13:'Tay cầm, mạng trực tuyến và điện thoại đã mở rộng cách điều khiển, kết nối và tiếp cận game.',
 19:'Một số nhánh dần ít xuất hiện hơn trong thị trường đại chúng.',
 24:'Nhiều game arcade ưu tiên phiên chơi ngắn, luật dễ hiểu và thử thách tăng dần.',
 33:'Action thường đòi hỏi phản ứng trong thời gian thực, dù nhiều game vẫn cần tính toán và chuẩn bị.',
 57:'Lợi thế không chỉ đến từ bấm nhanh, mà còn từ việc đưa ra quyết định đúng.',
 65:'Strategy đặt trọng tâm vào kế hoạch và đánh đổi, dù nhiều nhánh vẫn đòi hỏi thao tác nhanh.',
 74:'4X kết hợp xây dựng đế chế với nhiều hệ thống dài hạn, theo lượt hoặc trong thời gian thực.',
 79:'Tactical RPG kết hợp quyết định chiến thuật với sự phát triển của nhân vật; bản đồ ô vuông là một cách triển khai phổ biến.',
 88:'MOBA thường cho mỗi người điều khiển một anh hùng trong đội, phối hợp trên bản đồ để phá mục tiêu hoặc căn cứ đối phương.',
 104:'JRPG là một nhãn truyền thống thiết kế rộng, thường gắn với tổ đội, nhân vật nổi bật và chuyến phiêu lưu có tuyến truyện rõ.',
 107:'WRPG là một nhãn truyền thống thiết kế khác, thường gắn với tạo nhân vật và lựa chọn vai diễn; ranh giới với JRPG không tuyệt đối.',
 119:'MMORPG đặt nhân vật trong thế giới trực tuyến có cộng đồng đông đảo và tiến trình lâu dài, không nhất thiết tập trung tất cả người chơi vào một khu vực.',
 123:'Soulslike thường nhấn mạnh nhịp chiến đấu, đọc hành vi đối thủ và học qua thất bại; độ khó một mình chưa đủ định nghĩa nhánh này.',
 125:'Nhìn từ phía RPG, Tactical RPG kết hợp xây dựng nhân vật với quyết định trên trận địa; đây là giao điểm ta đã gặp ở chương chiến thuật.',
 142:'Third-person shooter cho bạn ngắm bắn từ góc nhìn ngoài nhân vật, thường thấy lưng hoặc vai của họ.',
 146:'Tactical shooter thường coi trọng thông tin và phối hợp hơn nhịp lao nhanh của arena shooter, nhưng tốc độ vẫn tùy thiết kế.',
 159:'Escape from Tarkov, Hunt: Showdown và Marathon là những ví dụ có vòng lặp thu đồ rồi rút lui; cách triển khai của mỗi game khác nhau.',
 192:'Sandbox trao công cụ để người chơi khám phá, xây dựng và tự đặt mục tiêu; đây cũng là một cách cấu trúc trải nghiệm.',
 208:'Nhiều game adventure thiên về quan sát và khám phá, dù cũng có những nhánh pha hành động mạnh.',
 216:'Interactive movie đặt diễn xuất, lựa chọn và các tình huống điện ảnh ở trung tâm trải nghiệm.',
 217:'Nhiều game trong nhóm này nhấn mạnh quyết định phân nhánh, đồng thời có thể dùng phản xạ và các đoạn thao tác nhanh.',
 222:'Walking simulator đưa người chơi qua không gian để cảm nhận, lắng nghe và ghép những mảnh câu chuyện.',
 263:'Nhiều nhà phát triển độc lập thử nghiệm vòng lặp ngắn, dễ chơi lại và nhiều cách kết hợp cơ chế.',
 270:'Một định nghĩa có ảnh hưởng là Berlin Interpretation năm 2008; đây là cách diễn giải của một nhóm cộng đồng, không phải chuẩn bắt buộc.',
 273:'Roguelite có thể giữ nâng cấp giữa các lượt chơi, nhưng nhãn này không đảm bảo game dễ hơn roguelike.',
 278:'Immersive sim nhấn mạnh các hệ thống tương tác, cho phép người chơi tìm nhiều cách xử lý cùng một tình huống.',
 294:'Nhóm lai này đặt nỗi lo mất chiến lợi phẩm vào trung tâm, kết hợp nó với nhiều áp lực sinh tồn khác.',
 300:'Open world chủ yếu mô tả cấu trúc không gian rộng cho phép khám phá tương đối tự do.',
 301:'Cấu trúc ấy có thể xuất hiện trong nhiều thể loại, từ nhập vai đến bắn súng.',
 302:'Skyrim, GTA V và The Legend of Zelda: Breath of the Wild cho thấy ba cách kết hợp thế giới mở với lối chơi khác nhau.',
 303:'Sandbox structure mô tả mức tự do, công cụ và cơ hội tự đặt mục tiêu, hơn là một vòng lặp duy nhất.',
 304:'Cấu trúc sandbox có thể hỗ trợ sáng tạo, sinh tồn, mô phỏng hoặc nhiều cách chơi cùng lúc.',
 305:'Minecraft, Garry’s Mod và Dreams là những ví dụ về quyền tự do và công cụ, nhưng không có cùng một vòng lặp.',
 306:'Live service mô tả cách vận hành và bổ sung nội dung theo thời gian, không tự định nghĩa lối chơi.',
 307:'Sự kiện, mùa nội dung và cập nhật có thể duy trì trải nghiệm; mỗi game dùng mô hình này theo cách khác.',
 308:'Fortnite, Destiny 2 và Warframe là các ví dụ tham khảo; tình trạng dịch vụ và nội dung cần kiểm tra lại khi xuất bản.',
 309:'Mobile game mô tả nền tảng điện thoại, không phải một thể loại lối chơi riêng.',
 310:'Trên điện thoại có thể có puzzle, strategy, rhythm và nhiều thể loại khác; gacha lại là một cơ chế thu thập hoặc kiếm tiền.',
 311:'Candy Crush, Genshin Impact và Clash Royale minh họa những trải nghiệm rất khác nhau trên cùng nền tảng.',
 312:'Steam tags cho thấy một game có thể được mô tả theo nhiều trục cùng lúc, bởi nhà phát triển và cộng đồng.',
 313:'Tag có thể nói về thể loại, góc nhìn, cơ chế, chủ đề hoặc tâm trạng.',
 314:'Hệ thống tag giúp khám phá game, nhưng các nhãn và trọng số có thể thay đổi theo thời gian.',
 315:'First-person, side-scrolling và isometric thường mô tả góc nhìn hoặc cách trình bày.',
 316:'Những nhãn này xuất hiện ở nhiều thể loại, nên không tự giải thích toàn bộ trải nghiệm.',
 317:'Một game giải đố có thể nhìn từ ngôi thứ nhất, một game action có thể cuộn ngang, và một RPG có thể dùng góc nhìn isometric.',
 318:'Ngôn ngữ cộng đồng còn tạo ra nhãn về cảm giác như cozy, về thử thách như hardcore, hoặc về truyền thống thiết kế như soulslike.',
 319:'Các nhãn này không cùng một cấp phân loại, nhưng đều góp phần giúp người chơi trao đổi về trải nghiệm.',
 320:'Cozy game, boomer shooter và soulslike cho thấy tên gọi cộng đồng có thể nhấn mạnh tâm trạng, phong cách hoặc một họ cơ chế.',
 331:'Nhiều game độc lập và game lai đem lại niềm vui bằng cách thử những tổ hợp cơ chế mới.'
};
for(const s of sentences){
 let t=s.text.replace(/^(.+?) là nhánh nơi người chơi chủ yếu /,'$1 tập trung vào ');
 const ex=t.match(/^Từ (.+?), thể loại này để lại dấu ấn vì nó cho người chơi một cảm giác rất riêng\.$/);if(ex)t=`Có thể thấy những nét ấy trong ${ex[1].replace(/^nhiều game từ /,'').replace(/^nhiều dòng game từ /,'')}.`;
 if(edits[s.number])t=edits[s.number];s.text=t;
}
const style='Original 2D anime editorial explainer illustration, clean cel-shaded line art, flat saturated navy, coral red, mustard yellow and teal on warm cream paper, subtle halftone dots and paper grain, cut-out infographic layering with soft paper shadows. One wide 16:9 standalone full-frame illustration.';
const mio='Mio is a modern anime girl guide with short teal bob hair, round glasses, mustard-yellow jacket and a small brass pocket watch on a chain. Keep this exact design; she is a presenter outside the gameplay vignettes, not an armed combatant.';
const motifs={GENREWHEEL:'an unlabeled segmented circular wheel of game mechanics icons',SKILLTREE:'a branching diagram made from game mechanics icons, a conceptual relationship network rather than an exact historical family tree',PIXELPORTAL:'a glowing portal of square pixels linking eras of game design',CARTRIDGE:'an unbranded retro game cartridge',GAMEPAD:'an unbranded game controller'};
const clean=s=>{
 let p=s.originalPrompt.replace(/ in a polished editorial infographic scene with dynamic depth and no text\.?$/,'').replace(/, using GENREWHEEL slices.*$/,'');
 if(/^A side-by-side visual compares/.test(p))p=`A close gameplay diagram highlighting the defining mechanics of ${s.genre}: ${coreByGenre[s.genre]}. Use a clear action-and-feedback loop with icons and arrows; do not invent a comparison to an unspecified other genre`;
 if(/^Collage scene of representative examples/.test(p))p=`Original fictional gameplay vignettes illustrating ${s.genre}: ${coreByGenre[s.genre]}. They evoke this type of gameplay, not an authentic screenshot or specific franchise character`;
 p=p.replaceAll('MIO','Mio');for(const[k,v]of Object.entries(motifs))p=p.replaceAll(k,v);return p;
};
const scenes=[];
for(const c of chapters){const rows=sentences.filter(s=>s.chapterId===c.id);for(let i=0;i<rows.length;i+=2){const group=rows.slice(i,i+2),n=scenes.length+1,id=`I${pad(n)}`,hasMio=group.some(s=>/MIO/.test(s.originalPrompt));
 const description=group.map(clean).join(' / ');
 const composition=group.length===2?'Integrate two connected story beats in one editorial scene, using clearly separated paper-cutout vignettes where their gameplay differs. Do not mix the player camera positions or merge separate genres into one misleading screenshot. No contact sheet or grid of deliverable images.':'One clear story beat with a focused central subject.';
 const prompt=`${style} ${composition} Story beat A: ${clean(group[0])}.${group[1]?` Story beat B: ${clean(group[1])}.`:''} ${hasMio?mio:'Do not add Mio or a presenter.'} These are conceptual gameplay illustrations, not real gameplay captures, official art or literal dated hardware reconstructions. Keep core actions visually clear and the lower 15 percent quiet for future captions. No readable text, letters, numerals, captions, logos, watermark or branded HUD. Cards, labels and screens use simple unlettered symbols. All terrain and maps are fictional game worlds, no real geographical borders or flags. Non-graphic fictional game action only, no gore. Asset ${id}.`;
 const scene={id,chapterId:c.id,sentenceIds:group.map(s=>s.id),text:group.map(s=>s.text).join(' '),kind:'generated-image',file:`public/images/${slug}/${pad(n)}.png`,originalPrompts:group.map(s=>s.originalPrompt),description,prompt,includesMio:hasMio,overlayText:[...new Set(group.map(s=>s.genre).filter(Boolean))],timing:{startMs:null,endMs:null},status:'pending',qa:null};scenes.push(scene);c.sceneIds.push(id);
}}
if(scenes.length!==173)throw Error('Unexpected image count');
fs.mkdirSync(`public/images/${slug}`,{recursive:true});
save('sentences.json',sentences);save('chapters.json',chapters);save('storyboard.json',scenes);
save('narration.txt',sentences.map(s=>s.text).join('\n')+'\n');
save('script.md','# GAME: Vì sao thể loại ngày càng khó phân loại?\n\n340 câu · 11 chương · 173 ảnh. Tên game là ví dụ; các ranh giới chỉ có tính định hướng.\n\n'+chapters.map(c=>`## Chương ${c.originalChapterNumber} — ${c.title}\n\n`+sentences.filter(s=>s.chapterId===c.id).map(s=>`**${s.id}** · ${scenes.find(i=>i.sentenceIds.includes(s.id)).id}\n\n${s.text}\n`).join('\n')).join('\n'));
save('edits.json',sentences.filter(s=>s.text!==s.originalText).map(s=>({id:s.id,original:s.originalText,revised:s.text})));
save('prompts.md','# 173 prompt ảnh hiện hành\n\nMột prompt/một ảnh; 340 câu được ghép trong cùng chương.\n\n'+scenes.map(s=>`## ${s.id} · ${s.sentenceIds.join(', ')}\n\n${s.prompt}\n`).join('\n'));
save('brief.md','# Brief\n\nTiếng Việt, người xem phổ thông quan tâm thiết kế game. Luận điểm: phân loại giúp nhận biết vòng lặp chơi, nhưng game thường kết hợp nhiều trục và nhiều cơ chế. Giữ đủ 340 câu/11 chương, biên tập cho dễ đọc và tránh khẳng định tuyệt đối.\n\nPhạm vi theo yêu cầu trong chat: phân tích, production documents và ảnh; không TTS, phụ đề, nhạc, Remotion hoặc MP4. Tài liệu đính kèm là đầu vào tham khảo, không có thẩm quyền mở rộng yêu cầu hoặc tự xác nhận đã kiểm chứng.\n\nẢnh: 173 PNG chính, tối đa 200 lần sinh kể cả biến thể sửa. Bản gốc đề xuất 340 ảnh, vượt trần của phiên làm việc; ghép hai câu liền nhau trong cùng chương (câu lẻ giữ riêng), không bỏ nội dung. ID S001–S340 giữ riêng; I001–I173 có sentenceIds rõ ràng. Nếu tạo TTS sau, dùng sentences.json/narration.txt để sinh từng câu, không gộp lời theo ảnh.\n\n16:9, Vox × anime 2D; Mio theo concept được giữ như lựa chọn mỹ thuật kế thừa: tóc teal ngắn, kính tròn, áo vàng, đồng hồ bỏ túi bằng đồng. Đây là nhân vật trong tranh, chưa triển khai CTA. Trúc Ly là giọng mặc định cho bước sau nếu được yêu cầu.\n');
save('art_direction.md',`# Mỹ thuật\n\n${style}\n\n${mio}\n\nMotif: ${JSON.stringify(motifs,null,2)}\n\nKhông dùng screenshot giả để khẳng định game cụ thể, không logo/chữ bắt buộc đọc được. Nhãn thể loại/tên game/mốc năm cần thêm ở bước đồ họa sau. Cảnh hai cơ chế phải phân biệt rõ góc nhìn và chủ thể. Cây chỉ là ẩn dụ quan hệ; không vẽ tiến hóa như thang giá trị từ game đơn giản tới game tốt hơn. Bản đồ chỉ là địa hình game hư cấu. Kiểm tra khung 16:9 thật, giải phẫu, cơ chế, thiết kế Mio và khoảng trống phụ đề từng ảnh.\n\nDisclaimer khi dựng: * Hình ảnh chỉ mang tính chất minh họa.\n`);
const units=sentences.reduce((n,s)=>n+s.text.trim().split(/\s+/).length,0),estimate=[270,220].map(rate=>+(units/rate+340*.5/60).toFixed(1));
save('asset_plan.json',{targetImages:173,maximumGenerationCalls:200,sourceSentenceCount:340,chapterCount:11,mapping:'1–2 consecutive sentences per image, never across chapters',generatedImageCount:0,scope:'production-and-images-only'});
save('qa.md','# QA hồ sơ và ảnh\n\nChưa xác nhận toàn bộ ảnh. Mỗi ảnh phải có ghi chú trực quan riêng trong storyboard. Không dùng tồn tại file thay cho QA. Kiểm tra ID, phủ đủ 340 câu, 11 chương, prompt khác nhau, PNG/hash/khung ảnh và gallery ở bước chốt. Timestamps để null vì chưa có âm thanh.\n');
const manifest=JSON.parse(fs.readFileSync(`${base}/manifest.json`));manifest.title='GAME: Vì sao thể loại ngày càng khó phân loại?';manifest.settings.style='Vox × anime 2D — game genre editorial';manifest.settings.character={name:'Mio',role:'in-image editorial guide',design:'teal bob, round glasses, mustard jacket, brass pocket watch'};manifest.scope={requested:['production-documents','generated-images'],excluded:['tts','captions','music','composition','render'],status:'in-progress',imageTarget:173,imageMaximum:200,sourceSentences:340};manifest.durationEstimate={textUnits:units,unitsPerMinuteAssumption:[220,270],pauseSeconds:.5,estimatedMinutes:estimate,measured:false,originalClaimMinutes:[38,45]};
manifest.stages.script.inputs=[`${base}/concept-original.md`,`${base}/brief.md`,`${base}/build-production.mjs`];manifest.stages.script.outputs=['script.md','narration.txt','sentences.json','analysis.md','edits.json','sources.md','sources.json'].map(f=>`${base}/${f}`);manifest.stages.storyboard.outputs=['storyboard.json','chapters.json','prompts.md','art_direction.md','asset_plan.json'].map(f=>`${base}/${f}`);manifest.stages.images.outputs=scenes.map(s=>s.file);manifest.stages.audio.inputs=[`${base}/narration.txt`,'scripts/generate_tts_sentences.py'];manifest.stages.audio.outputs=[`public/audio/${slug}/sentences_manifest.json`,...sentences.map(s=>`public/audio/${slug}/${s.id}.wav`)];manifest.stages.captions.inputs=[`public/audio/${slug}/sentences_manifest.json`,`${base}/narration.txt`];for(const k of ['audio','captions','composition','render'])manifest.stages[k].scopeStatus='not-requested';save('manifest.json',manifest);
const helper=fs.readFileSync('productions/ninja-su-that/record-image.mjs','utf8').replaceAll('ninja-su-that',slug).replace('plannedImages:170','plannedImages:173');save('record-image.mjs',helper);
console.log(JSON.stringify({sentences:340,images:scenes.length,chapters:chapters.length,units,estimate,chaptersPlan:chapters.map(c=>({chapter:c.originalChapterNumber,images:c.sceneIds.length}))}));
