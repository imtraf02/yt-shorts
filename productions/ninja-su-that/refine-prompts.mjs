import fs from 'node:fs';
const dir='productions/ninja-su-that';
const scenes=JSON.parse(fs.readFileSync(`${dir}/storyboard.json`,'utf8'));
for(const s of scenes) if(!s.includesMio && s.status==='pending')s.prompt=s.prompt.replace(/\nMio is the recurring modern editorial guide:[^\n]*\n/,'\n').replace('Fresh independent composition;','Do not include the modern guide Mio or any modern cartoon presenter. Fresh independent composition;');
fs.writeFileSync(`${dir}/storyboard.json`,JSON.stringify(scenes,null,2)+'\n');
const sources=JSON.parse(fs.readFileSync(`${dir}/sources.json`,'utf8'));const r=sources.find(s=>s.id==='R07');r.title='Iga-ryu Ninja Tourism Promotion Council — The History of Ninja';r.limit='Niên biểu hội đồng quảng bá văn hóa ninja thuộc bộ phận du lịch thành phố Iga, toàn văn mở được. Đối chiếu mốc 1579/1581/1582 với R01. Trang chứa truyền thuyết và số quân cần phê bình nguồn; không dùng chuyện quỷ hoặc các số ấy như lịch sử đã xác nhận.';fs.writeFileSync(`${dir}/sources.json`,JSON.stringify(sources,null,2)+'\n');
let md=fs.readFileSync(`${dir}/sources.md`,'utf8').replace('Iga heritage museum — The History of Ninja',r.title).replace('Niên biểu bảo tàng, toàn văn mở được; đối chiếu 1579, 1581, 1582. Trang cũng chứa truyền thuyết: không dùng chuyện quỷ đầu trang như lịch sử. Không đưa số quân/thương vong.',r.limit);fs.writeFileSync(`${dir}/sources.md`,md);
console.log('Non-guide prompts and source attribution refined.');
