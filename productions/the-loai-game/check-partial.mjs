import fs from 'node:fs';
import crypto from 'node:crypto';
const base='productions/the-loai-game';
const read=f=>JSON.parse(fs.readFileSync(`${base}/${f}`,'utf8'));
const scenes=read('storyboard.json'),sentences=read('sentences.json'),chapters=read('chapters.json');
const errors=[],assets=[],pending=scenes.filter(s=>s.status==='pending').map(s=>s.id);
if(scenes.length!==340||sentences.length!==340||chapters.length!==11)errors.push('Counts');
const narration=fs.readFileSync(`${base}/narration.txt`,'utf8').trim().split(/\r?\n/);
for(let i=0;i<340;i++){
 const s=scenes[i],t=sentences[i];
 if(s.id!==`I${String(i+1).padStart(3,'0')}`||s.sentenceIds[0]!==t.id||s.text!==t.text||narration[i]!==t.text)errors.push(`Mapping ${i+1}`);
 if(s.status==='pending'){if(fs.existsSync(s.file))errors.push(`Unexpected file ${s.id}`);continue;}
 if(s.status!=='verified'||!s.qa||!s.provenance?.sourcePath)errors.push(`QA ${s.id}`);
 const b=fs.readFileSync(s.file),width=b.readUInt32BE(16),height=b.readUInt32BE(20);
 if(b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||Math.abs(width/height/(16/9)-1)>.002)errors.push(`PNG ${s.id}`);
 assets.push({id:s.id,file:s.file,width,height,sha256:crypto.createHash('sha256').update(b).digest('hex')});
}
if(new Set(assets.map(a=>a.sha256)).size!==assets.length)errors.push('Duplicate image');
if(new Set(scenes.map(s=>s.prompt)).size!==340)errors.push('Duplicate prompt');
const result={passed:!errors.length,checkedAt:new Date().toISOString(),scope:'partial-production-and-images-only',complete:false,plannedImages:340,verifiedImages:assets.length,pending,errors,assets};
fs.writeFileSync(`${base}/validation-partial.json`,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({passed:result.passed,verified:assets.length,pending:pending.length,errors}));
if(errors.length)process.exitCode=1;
