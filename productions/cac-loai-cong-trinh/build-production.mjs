import fs from 'node:fs';
const slug='cac-loai-cong-trinh',base=`productions/${slug}`;
if(fs.existsSync(`${base}/storyboard.json`))throw Error('Production exists; do not rebuild.');
const original=fs.readFileSync('C:/Users/phamn/Downloads/cac-loai-cong-trinh_vox-anime2d.md','utf8');
const save=(f,x)=>fs.writeFileSync(`${base}/${f}`,typeof x==='string'?x:JSON.stringify(x,null,2)+'\n');
save('concept-original.md',original);
const chapters=[],sentences=[];let chapter,last,group=null;
for(const line of original.split(/\r?\n/)){
 const h=line.match(/^# CHƯƠNG (\d+) – (.+)$/);if(h){chapter={id:`C${String(chapters.length+1).padStart(2,'0')}`,originalChapterNumber:+h[1],title:h[2],sentenceIds:[],sceneIds:[]};chapters.push(chapter);group=null;}
 const a=line.match(/^\*\*(\d{3})\*\* — "(.+)"$/);if(a){last={id:`S${a[1]}`,number:+a[1],chapterId:chapter.id,originalText:a[2],text:a[2]};sentences.push(last);chapter.sentenceIds.push(last.id);}
 const p=line.match(/^> \*\*Ảnh (\d{3}):\*\* (.+)$/);if(p){if(!last||last.number!==+p[1])throw Error('Unmatched prompt');last.originalPrompt=p[2];const g=p[2].match(/^MIO presents (.+?) through (.+?), shown as /);if(g)group={name:g[1],core:g[2],start:last.number};last.group=group;}
}
if(sentences.length!==360||chapters.length!==12||sentences.some((s,i)=>s.number!==i+1||!s.originalPrompt))throw Error('Parsing failed');
const changes={
16:'Đập là một trong những nhóm công trình thể hiện rõ nhất khả năng điều khiển nước của con người.',
27:'Hoover Dam là một ví dụ quen thuộc về thủy điện sử dụng hồ chứa.',
66:'Cầu dầm xuất hiện rất phổ biến trên đường bộ nhờ cấu tạo tương đối đơn giản và khả năng chuẩn hóa.',
76:'Tải mặt cầu đi qua dây treo vào cáp chính; tháp chịu lực nén, còn khối neo tiếp nhận lực kéo của cáp.',
90:'Nhiều tuyến đường sắt cao tốc dùng cầu cạn để giữ hình học tuyến và tách khỏi giao cắt.',
102:'Đầu cắt phá đất đá, còn hệ thống phía sau đưa vật liệu ra ngoài và, ở nhiều loại TBM, lắp các đốt vỏ hầm.',
123:'Đường sắt cần nền ổn định, ray, tà vẹt và tín hiệu; kết cấu đường ray có thể dùng đá ba lát hoặc bản bê tông.',
124:'Tốc độ càng cao, yêu cầu về hình học tuyến, độ êm thuận và bán kính cong càng nghiêm ngặt.',
136:'Nút giao khác mức tách các dòng xe theo cao độ để giảm giao cắt trực tiếp, dù vẫn cần xử lý nhập và tách làn.',
194:'Bê tông chịu nén tốt, còn cốt thép bổ sung khả năng chịu kéo; khả năng chịu lửa phụ thuộc cấu tạo và thiết kế.',
196:'Những khung bê tông lặp lại qua nhiều tầng tạo nên một phần lớn cảnh quan của nhiều đô thị hiện đại.',
210:'Giàn và hệ không gian khai thác chiều sâu kết cấu; mái vỏ và lưới cáp lại truyền tải theo hình học bề mặt.',
213:'Bệnh viện và công trình thiết yếu cần mức độ an toàn và khả năng duy trì dịch vụ phù hợp với nhiệm vụ của chúng.',
214:'Kết cấu phù hợp, điện dự phòng, nước, khí y tế và phân khu chức năng cùng hỗ trợ khả năng duy trì hoạt động.',
215:'Thiết kế phải xét tình huống khẩn cấp, nhưng khả năng tiếp tục hoạt động còn tùy mức sự cố và hệ thống dự phòng.',
220:'Một tòa nhà ít cửa sổ có thể là mắt xích quan trọng của hạ tầng số phía sau thành phố.',
249:'Điện gió ngoài khơi đưa tua-bin ra những vùng biển có tài nguyên gió phù hợp, thường mạnh hơn ở nhiều vị trí trên bờ.',
254:'Tùy công nghệ, hơi hoặc nước nóng tạo điện trực tiếp hay qua trao đổi nhiệt; nhiều hệ thống tái bơm chất lưu xuống đất.',
256:'Địa nhiệt có thể cung cấp điện cả ngày lẫn đêm, nếu nguồn nhiệt, hệ chứa và vận hành cho phép.',
278:'Tháp nước giống một bộ đệm thủy lực: nó dự trữ nước và tạo áp lực nhờ cao độ.',
279:'Mạng thoát nước đưa nước thải và nước mưa ra khỏi khu dân cư; chúng có thể dùng hệ riêng hoặc hệ chung.',
284:'Tùy yêu cầu, nước thải qua xử lý cơ học, sinh học và có thể khử trùng; bùn được tách để xử lý riêng.',
294:'Một công trình chống lũ có thể thay đổi dòng chảy và rủi ro ở nơi khác, nên cần xem xét cả lưu vực.',
305:'Hồ điều hòa có thể giữ nước thường xuyên hoặc chỉ tạm thời; loại chứa tạm rồi xả chậm thường gọi là detention basin.',
306:'Nước mưa được giữ lại để giảm đỉnh dòng chảy, rồi xả theo chế độ kiểm soát phù hợp với loại hồ.',
338:'Công trình khai thác ngoài khơi bố trí thiết bị khoan, khai thác hoặc xử lý trên biển, tùy nhiệm vụ của từng hệ.',
339:'Hệ có thể cố định như giàn chân đế, hoặc nổi và neo giữ; mỗi loại ứng phó với sóng, gió và độ sâu theo cách khác.',
341:'Một số giàn tích hợp thiết bị sản xuất, khu sinh hoạt và sân trực thăng trong cùng một hệ công trình biển.'
};
const terms={penstock:'ống áp lực',turbine:'tua-bin',masonry:'khối xây',intake:'cửa lấy nước',spillway:'tràn xả lũ',silhouette:'hình dáng',ballast:'đá ba lát','slab track':'đường ray trên bản bê tông',ramp:'nhánh nối',interchange:'nút giao',platform:'sân ga',depot:'khu bảo dưỡng','quay crane':'cẩu bờ',runway:'đường băng',taxiway:'đường lăn',apron:'sân đỗ',terminal:'nhà ga','check-in':'làm thủ tục',boarding:'lên máy bay',bowl:'hệ',reactor:'lò phản ứng',coolant:'chất làm mát',module:'mô-đun',inverter:'bộ nghịch lưu',receiver:'bộ thu nhiệt',rotor:'rô-to',generator:'máy phát',farm:'trang trại điện gió',transformer:'máy biến áp',switchgear:'thiết bị đóng cắt',busbar:'thanh cái',aeration:'sục khí',clarifier:'lắng','reverse osmosis':'thẩm thấu ngược',levee:'đê',floodwall:'tường chống lũ',seawall:'kè biển',refinery:'nhà máy lọc dầu',furnace:'lò công nghiệp',vessel:'bình công nghệ','pipe rack':'giá đỡ ống',utility:'hệ phụ trợ',dock:'cửa xuất nhập hàng',rack:'giá kệ',conveyor:'băng tải',bench:'bậc khai thác',compressor:'máy nén',pipeline:'đường ống',FLOWLINE:'dòng vật chất'};
for(const s of sentences){
 let t=s.text.replace(/ cho thấy cùng một nhu cầu có thể dẫn tới một hình dạng công trình rất khác\.$/,'.').replace(' là loại công trình được tạo ra chủ yếu để ',' giúp ').replace(/^Nó hoạt động bằng cách /,'Hệ thống ').replace(/^Kỹ sư thường chọn giải pháp này khi /,'Giải pháp này thường phù hợp khi ');
 for(const [a,b] of Object.entries(terms))t=t.replace(new RegExp(`\\b${a}\\b`,'g'),b);
 t=t.replace(/^./,c=>c.toLocaleUpperCase('vi'));s.text=changes[s.number]??t;
}
const style='One standalone full-frame 16:9 landscape original 2D anime editorial engineering illustration. Clean cel-shaded line art, flat saturated blueprint cyan, deep navy, safety orange, concrete gray and teal on warm cream paper, restrained halftone dots and paper grain, cut-out collage layering with soft shadows. Clear hierarchy, readable engineering shapes, avoid photorealistic rendering.';
const mio='Mio, young anime girl guide, short teal bob hair, round glasses, mustard-yellow jacket, small brass pocket watch on a chain; white safety helmet on construction sites. Keep this design consistent; place her as a small presenter safely outside machinery and hazards.';
const motifs={BLUEPRINT:'unlabeled cyan engineering linework',CUTAWAY:'an explanatory section revealing actual structural layers and machinery',LOADPATH:'sparse orange arrows showing a plausible force path from applied load through connected members to foundation',FLOWLINE:'sparse cyan arrows following a physically connected water, power, vehicle or passenger route',SCALEFIG:'small credible human or vehicle silhouettes for scale'};
const guards=[
 'Show plausible head difference, intakes and tailwater. Water pressure pushes sideways; never draw water moving uphill without a pump. Separate structural dam types from hydropower operating types. Pumped storage has upper/lower reservoirs and distinct pump/generation directions.',
 'Bridge decks continuously connect approach roads; supports reach foundations. Suspension bridges have curved main cables, vertical hangers and anchorages; cable-stayed bridges have inclined stays directly to towers. Compression and tension diagrams are conceptual, not calculated.',
 'Keep excavation front distinct from completed lining; show credible support and geology. Immersed tubes are placed in a prepared bed trench, not hanging in open water. TBM representation must match ground and lining concept.',
 'Connect ramps to lanes; no impossible grade crossings. Rail wheels sit on two rails with plausible gauge; road/rail drainage stays outside traffic clearance. Comparison conveys function, not precise dimensions.',
 'Keep ship channel accessible and cranes on quay; runway distinct from taxiway and apron. Separate arriving and departing passenger routes. No fake runway numbers or signs.',
 'Connect columns and slabs to foundations. Outriggers physically connect core to perimeter columns; long-span roof avoids pitch-interior columns. Emergency utilities are schematic, not guarantees of continued operation.',
 'PV uses panels and inverter, not turbine. CSP uses mirrors, receiver and thermal machinery. Nuclear steam/coolant circuits remain distinct for chosen reactor concept. Show three-blade rotors for conventional wind turbines; geothermal production and reinjection wells distinct.',
 'Separate drinking-water and wastewater pipes. Show sequential treatment and sludge route, not decorative random basins. Desalination includes freshwater and brine outlets. No suggestion untreated discharge is drinking water.',
 'Show residual flood risk; do not imply permanent total protection. Differentiate detention basin temporary storage from permanent retention pond. Protect city side and show flood source coherently; gates and pumps coordinate with level difference.',
 'Provide plausible access, process zoning and separate personnel routes. Mine benches supported with roads reaching levels. Floating platforms have moorings; fixed platforms have seabed supports; do not merge incompatible systems.'
];
const shots=['wide establishing view','three-quarter isometric view','close engineering section','elevated contextual view'];
const scenes=sentences.map(s=>{
 let core=s.originalPrompt.replace(/ in a polished cinematic engineering infographic with clear scale and no visible text\./g,'').replace(/GENERIC /g,'');
 const beat=s.group?s.number-s.group.start:null;
 if(s.group&&beat>0&&beat<4){
  const focus=s.text;
  core=beat===1?`A close explanatory engineering view of ${s.group.core}. Mechanism to communicate: ${focus}. Reveal only parts relevant to that mechanism; do not add every force/flow motif.`:beat===2?`A two-option unlabeled editorial comparison centered on ${s.group.core}. Visually show only the site constraints relevant to this statement: ${focus}. Other option is a contrasting site condition, not a universally inferior design.`:`A contextual wide view of ${s.group.core}. Communicate this observation: ${focus}. Human/vehicle silhouettes for scale; avoid repeating the overview camera.`;
 }
 for(const [a,b]of Object.entries(motifs))core=core.replace(new RegExp(a,'g'),b);
 core=core.replace(/MIO/g,mio);
 if(s.number===359)core='The everyday city overlaid with sparse unlabeled cyan design layers, orange structural force paths, water routes and construction stages. No equations or mathematical symbols.';
 const guard=guards[Math.max(0,Math.min(9,chapters.findIndex(c=>c.id===s.chapterId)-1))];
 const prompt=`Use case: scientific-educational. Asset I${String(s.number).padStart(3,'0')}. ${style}\nSubject: ${core}\nEngineering constraint: ${guard}\nComposition: ${beat===null?shots[(s.number-1)%4]:['wide establishing view','close mechanism/section view','unlabeled comparison','wide contextual view'][beat]}. Leave lower center and lower right visually calm for future subtitles and mascot; preserve main structure. No letters, text, numbers, equations, logos, watermark or readable signs. No geographical maps. Illustration is conceptual, not a construction drawing or documentary photograph.`;
 const scene={id:`I${String(s.number).padStart(3,'0')}`,chapterId:s.chapterId,sentenceIds:[s.id],text:s.text,kind:'generated-image',file:`public/images/${slug}/${String(s.number).padStart(3,'0')}.png`,prompt,originalPrompt:s.originalPrompt,subject:s.group?.name??chapters.find(c=>c.id===s.chapterId).title,beat:beat===null?'narrative':['overview','mechanism','selection','context'][beat],overlayText:[],timing:{startMs:null,endMs:null},status:'pending',qa:null,sourceIds:[]};chapters.find(c=>c.id===s.chapterId).sceneIds.push(scene.id);return scene;
});
const words=sentences.reduce((n,s)=>n+s.text.split(/\s+/).length,0),duration={minMinutes:+(words/270+360*.5/60).toFixed(1),maxMinutes:+(words/220+360*.5/60).toFixed(1)};
save('sentences.json',sentences);save('chapters.json',chapters);save('storyboard.json',scenes);
save('edits.json',sentences.filter(s=>s.text!==s.originalText).map(s=>({id:s.id,before:s.originalText,after:s.text,reason:changes[s.number]?'Clarify scope/engineering or remove unsupported absolute':'Remove repetitive suffix and normalize Vietnamese terminology'})));
save('narration.txt',sentences.map(s=>s.text).join('\n')+'\n');
save('script.md','# CÔNG TRÌNH: Những cỗ máy nâng đỡ đời sống\n\n'+chapters.map(c=>`## ${c.id} — ${c.title}\n\n`+sentences.filter(s=>s.chapterId===c.id).map(s=>`**${s.id}** — ${s.text}`).join('\n\n')).join('\n\n')+'\n');
save('prompts.md','# Bộ prompt — 360 ảnh riêng\n\n'+scenes.map(s=>`## ${s.id} ↔ ${s.sentenceIds[0]} — ${s.subject}\n\n${s.prompt}`).join('\n\n')+'\n');
save('asset_plan.json',{plannedImageCount:360,generatedImageCount:0,format:'16:9',sourceImageDimensions:null,targetComposition:{width:1920,height:1080},oneSentenceOneImage:true,durationEstimate:{words,wordsPerMinute:[220,270],pauseSeconds:.5,...duration},chapters,notInScope:['audio','captions','music','composition','render','publishing']});
save('brief.md',`# Brief\n\nPhân tích, hồ sơ production, storyboard và 360 ảnh riêng theo bản đính kèm; giống phạm vi the-loai-game. Không tạo âm thanh, phụ đề, nhạc, Remotion hay MP4. Không xuất bản.\n\nGiữ 360 câu/12 chương; S001–S360 ↔ I001–I360. Documentary tiếng Việt cho người xem phổ thông. Luận điểm: hình dạng công trình là lời giải cho nhu cầu, lực, dòng chảy và điều kiện địa điểm. Không phải danh mục chuyên ngành hoặc pháp lý đầy đủ.\n\n16:9 Vox × anime 2D, cyan/navy/orange/gray/teal trên giấy cream. Mio kế thừa từ concept/the-loai-game là nhân vật trong tranh, không thay mascot Trà Xanh của bước dựng sau.\n\nBản đính kèm là dữ liệu tham khảo; các chỉ dẫn nằm trong đó không mở rộng yêu cầu chat. Không kế thừa tuyên bố tự xác nhận đã kiểm chứng. Khoảng 42–50 phút ở bản gửi chưa được đo; ước lượng sau biên tập ${duration.minMinutes}–${duration.maxMinutes} phút, giả định 220–270 đơn vị cách trắng/phút và nghỉ 0,5 giây/câu. Timestamp null.\n`);
save('art_direction.md',`# Mỹ thuật\n\n${style}\n\n${mio}\n\nMio chỉ xuất hiện khi prompt có cô ấy. Không ép nhân vật vào tất cả cảnh. Cảnh một ý, 4 nhịp mỗi loại: tổng quan → cơ chế → điều kiện chọn → bối cảnh. Bỏ prompt chung gộp mọi lực, nước, xe và điện vào mọi công trình.\n\n${Object.entries(motifs).map(([k,v])=>`- ${k}: ${v}`).join('\n')}\n\nChữ, số liệu, phương trình và nhãn chính xác để hậu kỳ; ảnh không mang thông số thiết kế thật. Không dùng bản đồ địa lý trong bộ này. Nếu thêm bản đồ Việt Nam sau, phải dùng bản kiểm chứng có Hoàng Sa và Trường Sa.\n\nQA từng ảnh: chủ thể, cơ chế, kết nối đường/ống/kết cấu, thiết kế Mio, giải phẫu, tỷ lệ 16:9 thật, vùng phụ đề và góc phải. Nguồn ảnh gốc không được coi là 1920×1080 chỉ vì composition đặt như vậy.\n\nNếu dựng sau: Trà Xanh 180 px góc dưới phải; CTA chỉ speech bubble; LeninDisclaimer với đúng text '* Hình ảnh chỉ mang tính chất minh họa', dưới trái 24/40, chữ nghiêng 13 px. Chưa triển khai bất kỳ component nào.\n`);
save('analysis.md',`# Phân tích\n\nLuận điểm có sức nặng: thay vì danh sách công trình rời rạc, nhìn mỗi hệ như lời giải cho một nhu cầu và điều kiện vật lý. Hook thành phố cắt lớp dẫn từ vật dụng hằng ngày tới hạ tầng vô hình. Các chương đi từ nước và chịu lực tới giao thông, không gian, năng lượng, môi trường và sản xuất; kết nối lại bằng lựa chọn hệ phù hợp địa điểm.\n\n## Biên tập\n\nGiữ đủ 360 câu và 12 chương, không áp thời lượng 10–13 phút lên bản dài này. Bỏ hậu tố lặp 'cho thấy cùng một nhu cầu...' ở các ví dụ, giảm công thức 'là loại công trình được tạo ra chủ yếu', Việt hóa thuật ngữ quen dùng. changes/edits ghi từng sửa. Bản gốc được lưu nguyên vẹn.\n\nPhân loại chồng trục: hồ chứa/run-of-river/tích năng là chế độ thủy điện; trọng lực/vòm/đắp là kết cấu đập. TBM/khoan nổ/cut-and-cover là phương pháp thi công, còn utility tunnel là công năng. Cầu cạn là tổ chức tuyến, không một cơ chế chịu lực riêng. Bệnh viện/data center là công năng, khung bê tông/thép/core-outrigger là hệ kết cấu. Nhấn rằng đây là hành trình giải thích, không taxonomy độc quyền.\n\nSửa các điểm quan trọng: tháp cầu treo chịu nén, khối neo tiếp nhận kéo; TBM không phải mọi loại đều lắp cùng một vỏ; đường ray có ballast hoặc slab; nút khác mức còn xung đột nhập/tách làn; chống cháy bê tông tùy cấu tạo; mái vỏ/cáp không cùng nguyên lý chiều sâu với giàn; bệnh viện không bảo đảm hoạt động qua mọi động đất; phân biệt retention với detention; nước thải không phải mọi trường hợp đều khử trùng; ngoài khơi không gộp hệ cố định/nổi.\n\n## Nhịp hình\n\nMỗi cụm bốn câu dùng bốn bố cục khác nhau. Prompt cơ chế giữ đúng cơ chế được nói, không dùng cutaway cho mọi cảnh một cách máy móc. Không biến hình AI thành chứng cứ kỹ thuật. Hoover được giữ trong lời nhưng minh họa khái niệm không khẳng định tái tạo đúng hình học di tích. Tranh phức tạp cần kiểm tra kết nối thật.\n\n## Thời lượng và phát âm\n\n${words} đơn vị cách trắng; ${duration.minMinutes}–${duration.maxMinutes} phút theo tốc độ 220–270/phút và nghỉ 0,5 giây/câu. Chưa xác nhận thời lượng. TBM đọc từng chữ hoặc 'máy đào hầm'; PV đọc từng chữ hoặc 'quang điện'; UPS 'bộ lưu điện'; outrigger có thể đọc 'hệ giằng tầng nối lõi với cột biên'; cut-and-cover 'đào mở rồi lấp'; immersed tube 'hầm dìm'; jacked box 'hầm hộp đẩy'. TTS tương lai phải theo từng câu với generate_tts_sentences.py; hiện không sinh audio.\n\n## Giới hạn kiểm chứng\n\nĐối chiếu theo nhóm nguồn chính thức, không tuyên bố đã xác minh mọi câu hay thông số kết cấu. sources.md phân biệt nguồn đã đọc, nguồn tham khảo và claim chưa đối chiếu. Đây là explainer phổ thông, không tài liệu thiết kế hay hướng dẫn xây công trình.\n`);
const job=JSON.parse(fs.readFileSync(`${base}/manifest.json`,'utf8'));
job.scope={requested:['analysis','production-documents','storyboard','images'],excluded:['audio','captions','music','composition','render','publishing']};
job.progress={plannedImages:360,generatedImages:0,verifiedImages:0,pendingImages:360};
job.stages.script.inputs=[`${base}/brief.md`,`${base}/concept-original.md`];job.stages.script.outputs=['script.md','narration.txt','sentences.json','chapters.json','analysis.md','edits.json','sources.md','sources.json'].map(f=>`${base}/${f}`);
job.stages.storyboard.inputs=[`${base}/script.md`,`${base}/art_direction.md`];job.stages.storyboard.outputs=['storyboard.json','prompts.md','asset_plan.json'].map(f=>`${base}/${f}`);
job.stages.images.outputs=scenes.map(s=>s.file);
for(const k of job.scope.excluded)if(job.stages[k])job.stages[k].scopeStatus='not-requested';
job.stages.audio.inputs=[`${base}/narration.txt`,'scripts/generate_tts_sentences.py'];job.stages.audio.outputs=[];
save('manifest.json',job);fs.mkdirSync(`public/images/${slug}`,{recursive:true});
console.log(JSON.stringify({sentences:sentences.length,chapters:chapters.length,scenes:scenes.length,words,duration,edits:sentences.filter(s=>s.text!==s.originalText).length}));
