import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root='D:/yt-shorts';
const slug='tai-sao-tien-giay-thoi-xua-that-bai';
const dir=path.join(root,'productions',slug);
const [id, source, review, promptFile] = process.argv.slice(2);
if (!/^I\d{3}$/.test(id)) throw new Error('Invalid image ID');
const board=JSON.parse(fs.readFileSync(path.join(dir,'storyboard.json'),'utf8'));
const scene=board.scenes.find(s=>s.id===id);
if (!scene) throw new Error('Unknown scene');
const target=path.resolve(root,scene.file);
if (!target.startsWith(path.resolve(root,'public/images',slug)+path.sep)) throw new Error('Unsafe destination');
if (source && source!=='-') {
  if (fs.existsSync(target)) throw new Error('Will not overwrite existing image');
  fs.copyFileSync(source,target,fs.constants.COPYFILE_EXCL);
  if (!fs.readFileSync(source).equals(fs.readFileSync(target))) throw new Error('Copy differs');
}
const b=fs.readFileSync(target);
if (b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a') throw new Error('Expected PNG');
const width=b.readUInt32BE(16),height=b.readUInt32BE(20);
const deviation=Math.abs(width/height/(16/9)-1);
if (deviation>0.01) throw new Error('Image aspect ratio differs by more than 1%');
if (promptFile) scene.prompt=fs.readFileSync(promptFile,'utf8').trim();
scene.status=review?'verified':'generated';
if (scene.generationError) {
  scene.generationHistory=[...(scene.generationHistory??[]),scene.generationError];
  delete scene.generationError;
}
scene.qa={...scene.qa,generatedAt:scene.qa?.generatedAt??new Date().toISOString(),reviewedAt:review?new Date().toISOString():null,notes:review??'Copied and PNG header validated; visual review pending.',width,height,aspectRatioDeviation:deviation,sha256:crypto.createHash('sha256').update(b).digest('hex')};
scene.source={provider:'built-in ImageGen',originalFile:source==='-'?scene.source?.originalFile:source};
fs.writeFileSync(path.join(dir,'storyboard.json'),JSON.stringify(board,null,2)+'\n');
const mf=path.join(dir,'manifest.json');
const m=JSON.parse(fs.readFileSync(mf,'utf8'));
m.stages.images.outputs=board.scenes.filter(s=>['generated','verified'].includes(s.status)).map(s=>s.file);
m.progress={...m.progress,plannedImages:260,generatedImages:m.stages.images.outputs.length,verifiedImages:board.scenes.filter(s=>s.status==='verified').length,remainingImages:260-m.stages.images.outputs.length,nextImage:board.scenes.find(s=>!['generated','verified'].includes(s.status))?.id??null};
if (m.blockers.some(b=>b.stage==='images'&&b.sceneId===id)) {
  m.blockerHistory=[...(m.blockerHistory??[]),...m.blockers.filter(b=>b.stage==='images'&&b.sceneId===id).map(b=>({...b,resolvedAt:new Date().toISOString()}))];
  m.blockers=m.blockers.filter(b=>!(b.stage==='images'&&b.sceneId===id));
}
m.stages.images.status=m.progress.verifiedImages===260?'complete':'in-progress';
m.updatedAt=new Date().toISOString();
fs.writeFileSync(mf,JSON.stringify(m,null,2)+'\n');
if (review) fs.appendFileSync(path.join(dir,'qa.md'),`- ${id}: ${width}×${height}; ${review}\n`);
console.log(JSON.stringify({id,width,height,...m.progress}));
