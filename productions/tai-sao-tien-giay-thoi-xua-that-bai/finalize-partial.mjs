import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {checkpoint} from '../../scripts/video-job.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(dir,'../..');
const read=f=>fs.readFileSync(path.join(dir,f),'utf8');
const write=(f,v)=>fs.writeFileSync(path.join(dir,f),JSON.stringify(v,null,2)+'\n');
const reviews=[
  'Small reserve chest contrasted with oversized paper claims; qualitative metaphor, clear historical counter.',
  'Calm redemption counter and limited customers; reserve motif and period clothing consistent.',
  'Crowd rush and falling trust gauge clearly show a run; gauge has no numerical claim.',
  'Queue, reserve depletion and period lantern reviewed; infographic flows remain qualitative.',
  'Closed private counters and distressed holders; stylized storefronts, no readable signage.',
  'Mio contrasts intact paper with an empty reserve chest; fictional guide and historical objects kept distinct.',
  'Tilted balance contrasts oversized paper claims with small reserves; decorative ledger marks carry no measured data.'
];
for(let i=45;i<=51;i++){
  const r=spawnSync(process.execPath,[path.join(dir,'record-image.mjs'),'I'+String(i).padStart(3,'0'),'-',reviews[i-45]],{encoding:'utf8'});
  if(r.status!==0)throw new Error(r.stderr||r.stdout);
}
const board=JSON.parse(read('storyboard.json'));
const failure=JSON.parse(read('image_generation_error.json'));
const interrupted=board.scenes.find(s=>s.id===failure.id);
interrupted.status='blocked';
interrupted.generationError={reason:'usage_limit_reached',observedAt:failure.observedAt,retryAfter:failure.retryAfter,errorFile:'image_generation_error.json'};
write('storyboard.json',board);
const sentences=JSON.parse(read('sentences.json'));
const prompts=read('prompts.jsonl').trim().split('\n').map(JSON.parse);
board.scenes.forEach((s,i)=>{sentences.sentences[i].file=s.file;prompts[i].file=s.file;});
write('sentences.json',sentences);
fs.writeFileSync(path.join(dir,'prompts.jsonl'),prompts.map(p=>JSON.stringify(p)).join('\n')+'\n');
fs.writeFileSync(path.join(dir,'image_prompts.md'),read('image_prompts.md').replace('Đích: public/images/tai-sao-tien-giay-thoi-xua-that-bai/038.png','Đích: public/images/tai-sao-tien-giay-thoi-xua-that-bai/038-v2.png'));
const selected=board.scenes.filter(s=>s.status==='verified');
assert.equal(selected.length,51);
const hashes=new Set();
for(const s of selected){
  const data=fs.readFileSync(path.join(root,s.file));
  const hash=crypto.createHash('sha256').update(data).digest('hex');
  assert.equal(hash,s.qa.sha256);
  assert.equal(data.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.ok(Math.abs(data.readUInt32BE(16)/data.readUInt32BE(20)/(16/9)-1)<.01);
  hashes.add(hash);
}
assert.equal(hashes.size,51);
const m=JSON.parse(read('manifest.json'));
m.stages.script.status='complete';m.stages.storyboard.status='complete';
m.stages.images.status='blocked';
m.stages.images.outputs=selected.map(s=>s.file);
m.blockers=[{stage:'images',reason:'ImageGen usage_limit_reached (HTTP 429)',sceneId:failure.id,observedAt:failure.observedAt,retryAfter:failure.retryAfter,resetLocal:failure.resetLocal,errorFile:'productions/'+m.slug+'/image_generation_error.json'}];
m.progress={plannedImages:260,generatedImages:51,verifiedImages:51,remainingImages:209,nextImage:'I052',productionComplete:true};
m.updatedAt=new Date().toISOString();
write('manifest.json',m);
const status='## Trạng thái bàn giao — 04/10/2026\n\nHồ sơ production, kịch bản, storyboard và prompt: đủ 260 cảnh / 13 chương. Ảnh đã sinh và kiểm tra: **51/260**, I001–I051; còn 209 ảnh. I038 dùng bản sửa 038-v2.png, bản đầu giữ riêng trong lịch sử QA.\n\nImageGen trả HTTP 429 usage_limit_reached khi sinh I052 lúc 13:03:30 giờ Việt Nam. Dịch vụ báo đặt lại hạn mức lúc **16:24:30 ngày 04/10/2026 (giờ Việt Nam)**. Xem manifest.json và image_generation_error.json; tiếp tục từ I052 khi hạn mức khả dụng. Không tự lên lịch chạy tiếp.\n\nẢnh gốc xấp xỉ 16:9, 1672×941 (I028: 1672×940); 1920×1080 chỉ là thông số dự kiến cho lần dựng sau. Không tạo audio, phụ đề, composition hoặc video. Xem gallery.html để duyệt 51 ảnh đã chọn.\n\n';
fs.writeFileSync(path.join(dir,'production.md'),read('production.md').replace('## Cấu trúc',status+'## Cấu trúc'));
fs.appendFileSync(path.join(dir,'qa.md'),'\n## Kiểm tra bàn giao phần ảnh\n\n51 scene assets có PNG hợp lệ, checksum trùng bản ghi, không trùng file nội dung; tất cả đã xem trực quan. Liên kết file của storyboard, sentences và prompts đã đồng bộ, bao gồm I038 bản sửa. 209 ảnh chưa sinh; I052 bị chặn bởi hạn mức ImageGen. Không checkpoint bước images là hoàn tất. Không tạo audio/video.\n');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const cards=selected.map(s=>'<article><a href="../../'+s.file+'"><img loading="lazy" src="../../'+s.file+'" alt="'+s.id+'"></a><h2>'+s.id+' · '+s.chapterId+'</h2><p>'+esc(s.text)+'</p></article>').join('\n');
fs.writeFileSync(path.join(dir,'gallery.html'),'<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>51 ảnh — Tiền giấy thời xưa</title><style>body{margin:0;padding:32px;background:#101726;color:#e7edf6;font:16px system-ui}h1{font-size:28px}header{max-width:1000px;margin-bottom:28px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:22px}article{background:#1d293c;border-radius:12px;overflow:hidden}img{width:100%;aspect-ratio:16/9;object-fit:contain;display:block}h2,p{margin:16px}h2{font-size:18px}p{line-height:1.6}</style><header><h1>Tại sao tiền giấy thời xưa thất bại?</h1><p>51/260 ảnh đã sinh và kiểm tra · Vox × anime 2D · 16:9. Chưa tạo audio/video. Còn 209 ảnh, tiếp tục từ I052 sau khi hạn mức ImageGen khả dụng. I038 hiển thị bản sửa v2.</p></header><main>'+cards+'</main></html>');
const v=spawnSync(process.execPath,[path.join(dir,'validate.mjs')],{encoding:'utf8'});
if(v.status!==0)throw new Error(v.stderr||v.stdout);
checkpoint(root,m.slug,'script','Complete text-only production for 260 sentences; references selectively checked and partial image delivery documented. No audio/video.');
checkpoint(root,m.slug,'storyboard','All 260 scene IDs, prompts and asset paths validated; 51 verified selected images recorded; I052 quota blocker with exact reset time.');
console.log(v.stdout.trim());
console.log(JSON.stringify({productionComplete:true,selectedImages:51,remainingImages:209,nextImage:'I052',blocked:'usage_limit_reached',checksumsUnique:true}));
