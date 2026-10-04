import fs from 'node:fs';
const slug='nhung-phat-minh-thay-doi-the-gioi',base=`productions/${slug}`;
if(fs.existsSync(`${base}/storyboard.json`))throw Error('Production exists; do not rebuild.');
const original=fs.readFileSync('C:/Users/phamn/Downloads/nhung-phat-minh-thay-doi-the-gioi_vox-anime2d.md','utf8');
const save=(f,x)=>fs.writeFileSync(`${base}/${f}`,typeof x==='string'?x:JSON.stringify(x,null,2)+'\n');
save('concept-original.md',original);
const chapters=[],sentences=[];let chapter,last;
for(const line of original.split(/\r?\n/)){
 const h=line.match(/^# CHƯƠNG (\d+) – (.+)$/);if(h){chapter={id:`C${String(chapters.length+1).padStart(2,'0')}`,originalChapterNumber:+h[1],title:h[2],sentenceIds:[],sceneIds:[]};chapters.push(chapter);}
 const a=line.match(/^\*\*(\d{3})\*\* — "(.+)"$/);if(a){last={id:`S${a[1]}`,number:+a[1],chapterId:chapter.id,originalText:a[2],text:a[2]};sentences.push(last);chapter.sentenceIds.push(last.id);}
 const p=line.match(/^> \*\*Ảnh (\d{3}):\*\* (.+)$/);if(p){if(!last||last.number!==+p[1])throw Error('Unmatched prompt');last.originalPrompt=p[2];}
}
if(sentences.length!==360||chapters.length!==24||sentences.some((s,i)=>s.number!==i+1||!s.originalPrompt))throw Error('Parsing failed');
const changes={
 26:'Khi đường sá tốt hơn, bánh xe càng hữu ích cho vận chuyển hàng hóa và con người.',
 120:'Động cơ hơi nước đưa máy nhiệt vào sản xuất trên quy mô lớn, mở rộng mạnh khả năng làm việc cơ học của con người.',
 132:'Dòng điện xoay chiều thuận tiện cho việc thay đổi điện áp bằng máy biến áp, giúp giảm tổn thất khi truyền công suất đi xa.',
 165:'Cuộc cách mạng ban đầu rất đơn giản: giọng nói có thể được truyền bằng tín hiệu điện đến người ở xa.',
 175:'Mạng cống thu gom chất thải giúp bảo vệ nguồn nước sinh hoạt khi được thiết kế và vận hành phù hợp.',
 198:'Năm 1796, Edward Jenner thử dùng vật liệu từ bệnh đậu bò để tạo bảo vệ chống bệnh đậu mùa.',
 205:'WHO tuyên bố bệnh đậu mùa được thanh toán trên toàn cầu vào năm 1980.',
 206:'Đây là bệnh truyền nhiễm ở người đầu tiên được thanh toán toàn cầu nhờ một chiến dịch y tế phối hợp.',
 211:'Cây trồng cần nitơ, nhưng phần lớn nitơ trong khí quyển tồn tại ở dạng chúng không dùng trực tiếp được.',
 212:'Trước thế kỷ hai mươi, nông nghiệp phụ thuộc nhiều vào phân chuồng, cây họ đậu và các mỏ nitrat tự nhiên.',
 213:'Fritz Haber chứng minh có thể tổng hợp amoniac từ nitơ và hiđrô ở điều kiện thích hợp.',
 214:'Carl Bosch cùng đội ngũ tại BASF đưa phản ứng đó lên quy mô công nghiệp.',
 219:'Nitơ cố định công nghiệp trở thành một nguồn đầu vào quan trọng cho sản xuất lương thực hiện đại.',
 221:'Phân đạm dư thừa có thể gây ô nhiễm nước và làm tăng phát thải khí nhà kính đinitơ oxit.',
 222:'Amoniac còn là nguyên liệu để sản xuất một số chất dùng trong thuốc nổ.',
 244:'Ngày 17 tháng 12 năm 1903, Wright Flyer thực hiện các chuyến bay có động cơ và điều khiển tại Kill Devil Hills, gần Kitty Hawk.',
 302:'Nghiên cứu chuyển mạch gói tin cho thấy dữ liệu có thể được chia thành gói và đi qua mạng linh hoạt hơn.',
 321:'GPS đạt khả năng hoạt động ban đầu năm 1993 và khả năng hoạt động đầy đủ năm 1995.',
 322:'Mỗi vệ tinh phát thông tin quỹ đạo và thời gian chính xác, được duy trì nhờ đồng hồ nguyên tử.',
 345:'Trong lòng bàn tay ngày nay là một công cụ nhỏ, kết nối nhiều công nghệ và kéo theo cả một nền kinh tế mới.',
 355:'Khi công nghệ được sản xuất, tiếp cận rộng rãi và kết nối vào các hệ thống hỗ trợ, tác động của nó có thể lan tới hàng triệu người.'
};
const terms={turbine:'tua-bin',microphone:'micro',Cholera:'Bệnh tả',chlorine:'clo',vaccine:'vắc-xin',variolation:'chủng đậu',smallpox:'bệnh đậu mùa',cowpox:'bệnh đậu bò',ammonia:'amoniac',nitrogen:'nitơ',hydrogen:'hiđrô',glider:'tàu lượn',motor:'động cơ điện',packet:'gói tin'};
for(const s of sentences){let t=s.text;for(const [a,b] of Object.entries(terms))t=t.replace(new RegExp(`\\b${a}\\b`,'g'),b);s.text=changes[s.number]??t;}
const style='One standalone full-frame 16:9 landscape original 2D anime illustration in the visual language of an editorial explainer. Clean cel-shaded line art, flat saturated navy, coral red, mustard yellow and teal, subtle halftone dots and paper grain, cut-out collage layering and soft shadows on warm cream paper. Clear visual hierarchy, expressive but restrained human figures, detailed readable silhouettes. No photorealism.';
const mio='Mio, a young adult anime girl guide with short teal bob hair, round glasses, mustard-yellow jacket and a small brass pocket watch on a chain. Consistent design; an observing presenter safely outside machinery, not a historical participant.';
const motifs={TECHTREE:'a branching unlabeled visual network connecting recognizable invention silhouettes',CUTAWAY:'an explanatory section revealing the relevant actual parts',FLOWLINE:'sparse colored paths following connected material, energy or data routes',MEMORY:'a visual metaphor of information preserved in physical records',ELECTRICGRID:'connected power lines, generators and distribution equipment',IMMUNE:'a clearly metaphorical immune-memory illustration with simplified cells and protective shapes',FORCE:'a sparse conceptual force diagram, physically consistent with the motion shown',SCALEFIG:'small people or vehicles for credible scale',PRINTGRID:'a repeatable arrangement of matching paper sheets and printing equipment'};
const constraints={
1:'Wheel and axle are mechanically connected; no floating wheels or contradictory rotation arrows. Early carts use period-plausible materials.',
2:'Clay tablets and records use small abstract impressions, without legible language. Period settings are illustrative, not an exact archaeological reconstruction.',
3:'Papermaking shows a screen lifting fibers from watery pulp, followed by pressing and drying. Distinguish paper from parchment and papyrus.',
4:'Compass indicates magnetic direction, not absolute position. No geographic map or named territorial outline.',
5:'Printing equipment matches the era; wooden blocks and movable type are distinct. Paper may show abstract ink texture, never readable letters.',
6:'Clock has coherent weights/gears/escapement; dials have no numerals. Atomic clock imagery is schematic, not a giant gear mechanism.',
7:'Separate steam boiler, cylinder and condenser where applicable; connect rods and shafts plausibly. Historical labor conditions portrayed respectfully.',
8:'Generator and motor have different energy roles. Lamps connect to a power network; no isolated bulb magically powering a city.',
9:'Telegraph is electrical pulse communication through connected wires, not voice or radio. No readable Morse-code symbols.',
10:'Show microphone/transmission/receiver roles; analog voice path and switchboard remain distinct. No logos or legible UI.',
11:'Keep potable water and wastewater networks separate, with treatment before reuse/discharge; no visibly dirty water presented as safe drinking water.',
12:'Vapor-compression cycle connects compressor, condenser, expansion device and evaporator; cold compartment absorbs heat, exterior condenser rejects heat. No perpetually frozen condenser.',
13:'Medical images are respectful and non-graphic. Immune memory and community protection are explanatory metaphors, not guarantees or medical instructions. Historical inoculation shown as context, no close-up procedural demonstration.',
14:'Ammonia synthesis concept connects nitrogen/hydrogen feed, pressurized catalytic reactor and product; no formulas, operating settings or explosives manufacturing details.',
15:'Piston, connecting rod and crankshaft are physically connected. Keep combustion engine distinct from electric motor and battery. No impossible vehicle wheels.',
16:'Aircraft remains coherent; lift is upward, weight downward, thrust forward and drag opposite motion if shown. Early Wright-style aircraft has fabric-covered biplane wings, open pilot position and period engine, not a modern jet.',
17:'Penicillin acts against susceptible bacteria, not viruses. Petri-dish inhibition is a clear empty zone around mold, not a mushroom growing inside a human. No gore or treatment instructions.',
18:'Distinguish point-contact device, junction transistor and modern integrated circuit; chip circuit lines are abstract and unlettered.',
19:'Show distinct memory, processing and input/output roles; era-appropriate electronic machinery. No readable code, binary digits or fake formulas.',
20:'Internet is an interconnected network of networks; distributed packet paths, no single central master switch. Distinguish Web interface from network infrastructure.',
21:'Positioning signals travel from several satellites to the receiver; GPS receiver does not transmit ranging beams back. Four satellites may indicate clock correction plus 3D position, no geographic or territorial maps.',
22:'Smartphone is a convergence of chip, radio, camera, sensors and software. Abstract interface icons without trademarks, app names or readable text.',
23:'Technology-tree connections are conceptual dependencies, not an exact deterministic chronology. Show collaborative iteration and social choices, not a lone inventor creating everything.'
};
const custom={
18:'A three-panel editorial collage of distinct ancient Eurasian settlements using early wooden carts, separated by cream paper, without geographic outlines or a single inventor.',
56:'Paper transforms into folded route diagrams with abstract lines, unmarked banknote-like sheets, packaging and newspapers with abstract ink texture.',
57:'An administrative archive filled with unlettered census sheets, tax records and abstract parcel diagrams, period-appropriate clerks.',
65:'Close view of a magnetized compass needle aligning with curved conceptual magnetic field lines around a plain sphere with no continents; no cardinal letters.',
75:'Sailing vessels connect distant coastal settlements through a layered sea montage, without geographic maps.',
86:'Matching printed pages with identical abstract ink patterns and scientific illustrations line up across separate desks, no alphabets or numerical tables.',
244:'An early fabric-covered biplane with forward elevator, rear propellers and a prone pilot lifts just above a sandy coastal field; supporting workshop and flight trials remain small background vignettes. Historical conceptual illustration, not a precise replica.',
321:'Two unlabeled orbital-system panels show an early operational constellation followed by a mature constellation with satellites and ground operations; no numeric counts or dates, no continents.',
322:'A satellite with an inset atomic-clock instrument and an outgoing timing signal reaching a receiver; orbital information represented by abstract paths, no text.',
345:'A palm holding an unbranded smartphone, surrounded by small silhouettes of navigation receiver, camera, chip, radio antenna and online services. Connect the convergence to community commerce; no literal transport wheel.'
};
const scenes=sentences.map(s=>{
 let core=custom[s.number]??s.originalPrompt.replace(/ editorial infographic composition, cinematic depth, warm cream paper background, no visible text/g,'');
 for(const [a,b] of Object.entries(motifs))core=core.replace(new RegExp(a,'g'),b);
 core=core.replace(/MIO/g,mio).replace(/PIXELPORTAL-like mechanical transitions/g,'layered mechanical connections').replace(/map-like/g,'abstract spatial').replace(/\bworld map\b/gi,'global network collage').replace(/\bmaps\b/gi,'abstract route diagrams').replace(/\bmap\b/gi,'abstract route diagram');
 const c=chapters.find(c=>c.id===s.chapterId),constraint=constraints[c.originalChapterNumber]??'Inventions shown as connected systems. Keep medical and war scenes non-graphic; no perfect claims of safety or efficacy.';
 const prompt=`Use case: illustration-story. Asset I${String(s.number).padStart(3,'0')}. ${style}\nScene: ${core}\nNarrative intent: ${s.text}\nConstraint: ${constraint}\nComposition: one clear primary idea; vary establishing views, close mechanisms, contextual scenes and comparisons according to the subject. Keep lower center and lower right visually calm for possible future captions and mascot. No visible text, letters, numbers, equations, logos, watermarks or readable signs. No geographical maps, no territorial outlines. All small documents/screens/dials use abstract non-linguistic marks only. Conceptual illustration, not archival evidence or a certified technical diagram.`;
 const scene={id:`I${String(s.number).padStart(3,'0')}`,chapterId:s.chapterId,sentenceIds:[s.id],text:s.text,kind:'generated-image',file:`public/images/${slug}/${String(s.number).padStart(3,'0')}.png`,prompt,originalPrompt:s.originalPrompt,subject:c.title,beat:/CUTAWAY|FORCE/.test(s.originalPrompt)?'mechanism':/MIO/.test(s.originalPrompt)?'presenter':'narrative',overlayText:[],timing:{startMs:null,endMs:null},status:'pending',qa:null,sourceIds:[]};c.sceneIds.push(scene.id);return scene;
});
const units=sentences.reduce((n,s)=>n+s.text.split(/\s+/).length,0),duration={minMinutes:+(units/270+360*.5/60).toFixed(1),maxMinutes:+(units/220+360*.5/60).toFixed(1)};
save('sentences.json',sentences);save('chapters.json',chapters);save('storyboard.json',scenes);
save('edits.json',sentences.filter(s=>s.text!==s.originalText).map(s=>({id:s.id,before:s.originalText,after:s.text,reason:changes[s.number]?'Clarify date, mechanism, scope or unsupported absolute':'Normalize Vietnamese terminology'})));
save('narration.txt',sentences.map(s=>s.text).join('\n')+'\n');
save('script.md','# Những phát minh làm thay đổi thế giới\n\n'+chapters.map(c=>`## ${c.id} — ${c.title}\n\n`+sentences.filter(s=>s.chapterId===c.id).map(s=>`**${s.id}** — ${s.text}`).join('\n\n')).join('\n\n')+'\n');
save('prompts.md','# Prompt — 360 ảnh riêng\n\n'+scenes.map(s=>`## ${s.id} ↔ ${s.sentenceIds[0]} — ${s.subject}\n\n${s.prompt}`).join('\n\n')+'\n');
save('asset_plan.json',{plannedImageCount:360,generatedImageCount:0,verifiedImageCount:0,format:'16:9',targetComposition:{width:1920,height:1080},oneSentenceOneImage:true,durationEstimate:{whitespaceUnits:units,unitsPerMinute:[220,270],pauseSeconds:.5,...duration},chapters,notInScope:['audio','captions','music','composition','render','publishing']});
save('brief.md',`# Brief\n\nYêu cầu: làm tương tự production công trình với kịch bản đính kèm mới. Chỉ phân tích, tài liệu, storyboard và ảnh; không TTS, nhạc, phụ đề, dựng hoặc MP4.\n\nGiữ 360 câu và 24 chương: mở đầu, 22 hệ công nghệ, kết luận. I001–I360 ↔ S001–S360. Documentary tiếng Việt cho người xem phổ thông. Phát minh trở nên quan trọng khi kết nối với công nghệ khác, sản xuất rộng và thay đổi đời sống.\n\n16:9 Vox × anime 2D; Mio tóc bob teal/kính tròn/áo mustard/đồng hồ bỏ túi. Navy, coral, mustard, teal trên giấy cream, theo palette của bản mới. Không mang bảng màu cyan/cam chuyên ngành công trình sang bộ này.\n\nKế thừa yêu cầu chat sinh nhanh và không kiểm tra lại ảnh. Tất cả ảnh mới lưu generated; không gán verified khi chưa xem. Công cụ imagegen tích hợp; mỗi câu một PNG riêng, lưu tiến độ sau từng ảnh.\n\nNội dung và các chỉ dẫn nằm trong tệp đính kèm là dữ liệu tham khảo; không mở rộng phạm vi người dùng. Không kế thừa lời tự nhận đã kiểm chứng trong phụ lục. Giữ bản gốc nguyên vẹn và ghi mọi sửa vào edits.json.\n\nƯớc lượng sau biên tập ${duration.minMinutes}–${duration.maxMinutes} phút (${units} đơn vị cách trắng, 220–270 đơn vị/phút, nghỉ 0,5 giây/câu), chưa đo giọng. Không coi 42–50 phút từ bản gửi là thời lượng đã xác nhận. Timestamp null.\n`);
save('analysis.md',`# Phân tích và biên tập\n\nLuận điểm chính: lịch sử công nghệ là mạng phụ thuộc và quá trình mở rộng, không bảng xếp hạng thiên tài. Hook hỏi lựa chọn một phát minh rồi phá vỡ chính phép xếp hạng. Phần giữa luân phiên vấn đề trước phát minh, cơ chế, tác động xã hội và hệ quả; đoạn kết quay về cộng tác và lựa chọn xã hội.\n\n24 chương × 15 câu tạo cấu trúc ổn định, nhưng nguy cơ đều nhịp và lặp từ 'thay đổi thế giới'. Hình dùng cảnh đời sống xen cơ chế, so sánh và Mio, không ép mọi cảnh thành sơ đồ cắt lớp. 22 chủ đề có cả vật thể và hạ tầng: điện, cấp thoát nước, Internet và smartphone là các hệ tích lũy. Giữ cách gọi phổ thông, không nhận đây là danh sách đầy đủ hay thứ tự quan trọng khách quan.\n\nBiên tập giữ đủ 360 câu, không rút xuống video 10–13 phút. Sửa GPS: hoạt động ban đầu 1993, đầy đủ 1995; mô tả tín hiệu quỹ đạo/thời gian chính xác hơn. Wright Flyer đặt tại Kill Devil Hills gần Kitty Hawk. Bỏ 'cấp số nhân' ở bánh xe và 'lần đầu máy nhiệt' quá tuyệt đối. Giải thích máy biến áp làm tăng điện áp để giảm tổn thất; không khẳng định điện xoay chiều luôn tốt hơn mọi hệ khác. Mạng cống chỉ bảo vệ nguồn nước khi xử lý và vận hành phù hợp. Thay số dân phụ thuộc phân đạm chưa có dẫn chứng định lượng bằng mô tả vai trò đầu vào quan trọng. Việt hóa thuật ngữ y tế và hóa học; giữ tên người và tên chuẩn công nghệ.\n\nNguồn kỹ thuật và mốc nổi bật được đối chiếu chọn lọc trong sources.md. Không coi tất cả 360 câu đã fact-check độc lập. Phụ lục gốc có URL lỗi/không liên quan; lưu nguyên văn ở concept-original.md, không tự đưa mọi liên kết vào danh sách đã xác minh.\n\nPrompt giữ đặc trưng lịch sử theo vai trò/trang phục, không hứa chân dung hay tái tạo chính xác di tích. Các motif là ẩn dụ: nhánh công nghệ, bộ nhớ ngoài, miễn dịch. Tránh bảng chữ, năm, công thức và bản đồ địa lý trong ảnh; nhãn chính xác dành cho khâu dựng nếu được yêu cầu sau. Tiêm chủng lịch sử và chiến tranh không đồ họa, không hướng dẫn thực hành. Chu trình lạnh có đường nhiệt đúng; GPS có tín hiệu vệ tinh tới máy thu, không phản xạ hai chiều.\n\nYêu cầu tăng tốc của người dùng được ưu tiên: bỏ kiểm tra trực quan và vòng sửa ảnh. Bộ ảnh được ghi generated và báo rõ chưa review; checkpoint chỉ chứng minh đủ file và mapping.\n`);
save('art_direction.md',`# Mỹ thuật\n\n${style}\n\n${mio}\n\nMio chỉ xuất hiện ở prompt cần người dẫn; không ép vào tất cả ảnh. Mỗi ảnh một ý, bố cục đa dạng. Giấy/tài liệu có vết mực trừu tượng; thiết bị có giao diện không chữ. Không bản đồ địa lý trong bộ ảnh này. Các ảnh là minh họa khái niệm, không tư liệu lịch sử hoặc bản vẽ kiểm định.\n\n${Object.entries(motifs).map(([k,v])=>`- ${k}: ${v}`).join('\n')}\n\nKhông kiểm tra trực quan theo yêu cầu kế thừa. File ảnh, kích thước PNG và provenance được lưu tự động; trạng thái generated, reviewedAt null. Kích thước gốc có thể khác 1920×1080; chưa upscale.\n\nNếu dựng sau: mascot Trà Xanh 180 px góc dưới phải, CTA chỉ bong bóng thoại. Chú thích bắt buộc '* Hình ảnh chỉ mang tính chất minh họa' đặt bằng component trong bước dựng. Chưa thêm chữ, mascot, âm thanh hoặc component lên các ảnh hiện tại.\n`);
save('pronunciation.md','# Ghi chú tên riêng cho bước lời đọc về sau\n\nChưa tạo TTS. Giữ tên người/nguyên ngữ trong narration, kiểm tra phát âm mẫu khi được yêu cầu: Cai Lun (Thái Luân), Gutenberg, Jenner, Haber, Bosch, Otto, Daimler, Maybach, Benz, Fleming, Florey, Chain, Bardeen, Brattain, Shockley, Cerf, Kahn. TCP/IP và GPS đọc từng chữ cái, ARPANET đọc theo tên mạng; mRNA ghi rõ cách đọc theo câu khi làm TTS.\n');
const job=JSON.parse(fs.readFileSync(`${base}/manifest.json`,'utf8'));
job.title='Những phát minh làm thay đổi thế giới';job.settings.style='Vox-style anime 2D';job.scope={requested:['analysis','production-documents','storyboard','images'],excluded:['audio','captions','music','composition','qa-video','render','publishing']};
job.imageReviewPolicy={mode:'skip-visual-review',requestedBy:'user',fromScene:'I001',recordedAt:new Date().toISOString(),note:'Inherited explicit user request for faster generation without image rechecking; all new assets remain generated, not visually verified.'};
job.progress={plannedImages:360,generatedImages:0,verifiedImages:0,pendingImages:360,needsRevision:0};job.durationEstimate={whitespaceUnits:units,...duration,measured:false};
job.stages.script.inputs=[`${base}/brief.md`,`${base}/concept-original.md`];job.stages.script.outputs=['script.md','narration.txt','sentences.json','chapters.json','analysis.md','edits.json','sources.md','sources.json'].map(f=>`${base}/${f}`);
job.stages.storyboard.inputs=[`${base}/script.md`,`${base}/art_direction.md`];job.stages.storyboard.outputs=['storyboard.json','prompts.md','asset_plan.json'].map(f=>`${base}/${f}`);job.stages.images.inputs=[`${base}/storyboard.json`];job.stages.images.outputs=scenes.map(s=>s.file);
for(const name of ['audio','captions','composition','qa','render'])job.stages[name].scopeStatus='not-requested';
save('manifest.json',job);fs.mkdirSync(`public/images/${slug}`,{recursive:true});
console.log(JSON.stringify({slug,sentences:sentences.length,chapters:chapters.length,images:scenes.length,edits:sentences.filter(s=>s.text!==s.originalText).length,units,...duration}));
