import fs from 'node:fs';
const base='productions/the-loai-game';
const fixes=new Map([
 ['S034','Có thể thấy những nét ấy từ Contra đến Devil May Cry.'],
 ['S066','Có thể thấy những nét ấy từ cờ số hóa đến chiến tranh giả lập.'],
 ["S128","Open-world RPG kết hợp nhập vai với một không gian rộng cho phép bạn lang thang và tự chọn hướng đi."],
 ["S145","Tactical shooter ưu tiên thông tin và phối hợp đồng đội; một sai lầm cũng có thể trả giá lớn."],
 ["S148","Hero shooter cho mỗi nhân vật một bộ kỹ năng riêng và vai trò rõ rệt trong giao tranh."],
 ["S151","Arena shooter nhấn mạnh di chuyển nhanh, kiểm soát vật phẩm và kỹ năng cơ học."],
 ["S154","Battle royale đưa nhiều người vào một bản đồ lớn để cạnh tranh trở thành người hoặc đội sống sót cuối cùng."],
 ["S198","Survival crafting kết hợp sống sót với chế tạo, xây căn cứ và mở khóa công nghệ dần dần."],
 ["S246","Arcade racing ưu tiên cảm giác tốc độ phóng đại hơn tính chân thực cơ khí."],
 ["S255","Social deduction khiến người chơi nghi ngờ, thảo luận và suy luận ai đang lừa dối."],
 ["S284","Bullet heaven đặt nhân vật giữa biển kẻ địch, với sức mạnh tự động hoặc bán tự động bùng nổ khắp màn hình."],
 ["S293","Extraction survival hybrid kết hợp căng thẳng sinh tồn với mục tiêu rút lui an toàn cùng chiến lợi phẩm."],
 ["S219","Visual novel đặt trọng tâm vào văn bản, nhân vật và các ngã rẽ cảm xúc."],
 ["S226","Trong Detective / mystery, cảm giác nổi bật là chuyển từ mơ hồ sang hiểu ra nhờ manh mối và suy luận."],
 ["S228","Survival horror pha trộn sợ hãi với tài nguyên hiếm, kẻ địch nguy hiểm và cảm giác dễ tổn thương."],
 ["S243","Kart racing biến đua xe thành cuộc vui dễ tiếp cận với vật phẩm và tình huống bất ngờ."],
 ["S269","Roguelike xây trải nghiệm quanh tính ngẫu nhiên, cái chết kết thúc lượt chơi và những lần thử luôn khác nhau."],
 ["S272","Roguelite mượn vòng lặp chơi lại của roguelike nhưng cho phép tiến bộ lâu dài hoặc giảm mức mất mát sau thất bại."],
 ["S281","Deckbuilder biến việc xây bộ bài thành trung tâm của vòng lặp chiến đấu hoặc chiến thuật."],
 ["S287","Idle / incremental thưởng cho người chơi bằng sự tăng trưởng theo thời gian, đôi khi cả khi không trực tiếp thao tác nhiều."],
 ["S290","Cozy game giảm áp lực để nhấn mạnh sự thư giãn, dễ thương và nhịp sống nhẹ nhàng."],
]);
const read=f=>JSON.parse(fs.readFileSync(`${base}/${f}`,'utf8'));
const sentences=read('sentences.json'),scenes=read('storyboard.json'),edits=read('edits.json');
let script=fs.readFileSync(`${base}/script.md`,'utf8');
for(const [id,text] of fixes){
 const sentence=sentences.find(s=>s.id===id),scene=scenes.find(s=>s.sentenceIds.includes(id));
 if(!sentence||!scene)throw Error(`Missing ${id}`);
 if(sentence.text!==text){
  if(!script.includes(sentence.text))throw Error(`Script mismatch ${id}`);
  script=script.replace(sentence.text,text);
 }
 sentence.text=text;scene.text=text;
 const edit=edits.find(e=>e.id===id);
 if(edit)edit.revised=text;
 else edits.push({id,original:sentence.originalText,revised:text});
}
for(const [file,data] of [['sentences.json',sentences],['storyboard.json',scenes],['edits.json',edits]])fs.writeFileSync(`${base}/${file}`,JSON.stringify(data,null,2)+'\n');
fs.writeFileSync(`${base}/narration.txt`,sentences.map(s=>s.text).join('\n')+'\n');
fs.writeFileSync(`${base}/script.md`,script);
console.log(`Polished ${fixes.size} sentences; scene IDs and visual prompts unchanged.`);
