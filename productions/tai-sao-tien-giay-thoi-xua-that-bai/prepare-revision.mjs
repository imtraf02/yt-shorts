import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const read=f=>fs.readFileSync(path.join(dir,f),'utf8');
const write=(f,v)=>fs.writeFileSync(path.join(dir,f),JSON.stringify(v,null,2)+'\n');
const b=JSON.parse(read('storyboard.json'));
const s=b.scenes.find(s=>s.id==='I059');
if(s.file.endsWith('/059.png')){
  s.versions=[...(s.versions??[]),{file:s.file,status:'rejected',reason:'European-style screw printing presses are inappropriate for Song hand-rubbed woodblock printing.',source:s.source,qa:s.qa}];
  s.file=s.file.replace('/059.png','/059-v2.png');
  s.status='needs-revision';s.qa=null;s.source=null;
  s.revisionPromptFile='productions/'+b.slug+'/I059.revision-prompt.txt';
}
const extra=' Additional period constraints: Chinese woodblock printing must be shown as hand brushing or hand rubbing a sheet on a flat carved woodblock resting on a low table. No European screw printing press, roller press, mechanized printer, glass-chimney kerosene lamp or modern machinery. Use simple ceramic oil bowls or opaque paper lanterns when lighting is needed.';
for(const s of b.scenes)if(Number(s.id.slice(1))>=65&&Number(s.id.slice(1))<=206&&s.status==='pending'&&!s.prompt.includes('Additional period constraints:'))s.prompt+=extra;
write('storyboard.json',b);
const sentences=JSON.parse(read('sentences.json'));
b.scenes.forEach((s,i)=>{sentences.sentences[i].file=s.file;});
write('sentences.json',sentences);
fs.writeFileSync(path.join(dir,'prompts.jsonl'),b.scenes.map(s=>JSON.stringify({id:s.id,file:s.file,prompt:s.prompt})).join('\n')+'\n');
fs.writeFileSync(path.join(dir,'image_prompts.md'),'# Prompt ảnh — 260 cảnh riêng\n\nCông cụ: built-in ImageGen. Một lệnh cho một ảnh; không thay bằng contact sheet. Prompt sửa riêng được ghi tại revisionPromptFile trong storyboard.\n\n'+b.scenes.map(s=>'## '+s.id+' — '+s.sentenceIds.join(', ')+'\n\n'+s.text+'\n\n'+s.prompt+'\n\nĐích: '+s.file+'\n').join('\n'));
const m=JSON.parse(read('manifest.json'));
m.stages.images.outputs=b.scenes.filter(s=>['generated','verified'].includes(s.status)).map(s=>s.file);
m.progress={...m.progress,generatedImages:m.stages.images.outputs.length,verifiedImages:b.scenes.filter(s=>s.status==='verified').length,remainingImages:260-m.stages.images.outputs.length,nextImage:'I059'};
write('manifest.json',m);
fs.appendFileSync(path.join(dir,'qa.md'),'\n- I059 first version rejected: European-style screw presses; targeted edit replaces them with hand-rubbed woodblock tables. Additional period constraints added to remaining Chinese-history prompts.\n');
