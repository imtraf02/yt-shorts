import fs from 'node:fs';
import path from 'node:path';
const base='productions/cac-loai-cong-trinh';
const [id,source,status,note]=process.argv.slice(2);
const scenes=JSON.parse(fs.readFileSync(`${base}/storyboard.json`,'utf8')),scene=scenes.find(s=>s.id===id);
if(!scene||!['generated','verified','needs-revision'].includes(status)||!note)throw Error('ID/source/status/review note required');
if(source!=='review'){
 const target=path.resolve(scene.file),root=path.resolve('public/images/cac-loai-cong-trinh')+path.sep;
 if(!target.startsWith(root)||fs.existsSync(target))throw Error('Unsafe or existing destination');
 fs.copyFileSync(source,target);scene.provenance={tool:'built-in image_gen.imagegen',sourcePath:source,generatedAt:new Date().toISOString()};
}
const b=fs.readFileSync(scene.file);if(b.readUInt32BE(0)!==0x89504e47)throw Error('Not PNG');
const width=b.readUInt32BE(16),height=b.readUInt32BE(20),aspectRatioError=Math.abs(width/height-16/9)/(16/9);
scene.status=aspectRatioError>.002?'needs-revision':status;scene.qa={width,height,aspectRatioError,visualReview:note,reviewedAt:new Date().toISOString()};
fs.writeFileSync(`${base}/storyboard.json`,JSON.stringify(scenes,null,2)+'\n');
const job=JSON.parse(fs.readFileSync(`${base}/manifest.json`,'utf8'));
job.progress={plannedImages:360,generatedImages:scenes.filter(s=>fs.existsSync(s.file)).length,verifiedImages:scenes.filter(s=>s.status==='verified').length,pendingImages:scenes.filter(s=>s.status==='pending').length,needsRevision:scenes.filter(s=>s.status==='needs-revision').length};
fs.writeFileSync(`${base}/manifest.json`,JSON.stringify(job,null,2)+'\n');
fs.appendFileSync(`${base}/generation_log.jsonl`,JSON.stringify({id,source,status:scene.status,width,height,note,at:new Date().toISOString()})+'\n');
console.log(JSON.stringify({id,status:scene.status,width,height,progress:job.progress}));
