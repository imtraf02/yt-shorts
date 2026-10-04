import fs from 'node:fs';
import path from 'node:path';
const base='productions/ninja-su-that';
const [id,source,note]=process.argv.slice(2);
const file=`${base}/storyboard.json`;
const scenes=JSON.parse(fs.readFileSync(file,'utf8'));
const scene=scenes.find(s=>s.id===id);
if(!scene)throw new Error('Unknown scene');
if(source!=='review'){
 const target=path.resolve(scene.file);
 const root=path.resolve('public/images/ninja-su-that')+path.sep;
 if(!target.startsWith(root))throw new Error('Outside image destination');
 if(fs.existsSync(target))throw new Error('Destination already exists');
 fs.copyFileSync(source,target);
 scene.status='generated';
 scene.provenance={tool:'built-in image_gen.imagegen',sourcePath:source,generatedAt:new Date().toISOString()};
}
const bytes=fs.readFileSync(scene.file);
if(bytes.readUInt32BE(0)!==0x89504e47)throw new Error('Not PNG');
const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20);
const error=Math.abs(width/height-16/9)/(16/9);
if(error>0.002){scene.status='needs-revision';scene.qa={width,height,aspectRatioError:error,reason:'Wrong aspect ratio'};}
else if(source==='review'){
 if(!note)throw new Error('Review note required');
 scene.status='verified';scene.qa={width,height,aspectRatioError:error,visualReview:note,reviewedAt:new Date().toISOString()};
}
fs.writeFileSync(file,JSON.stringify(scenes,null,2)+'\n');
const job=JSON.parse(fs.readFileSync(`${base}/manifest.json`,'utf8'));
job.progress={plannedImages:170,generatedImages:scenes.filter(s=>['generated','verified'].includes(s.status)).length,verifiedImages:scenes.filter(s=>s.status==='verified').length,pendingImages:scenes.filter(s=>s.status==='pending').length,needsRevision:scenes.filter(s=>s.status==='needs-revision').length};
fs.writeFileSync(`${base}/manifest.json`,JSON.stringify(job,null,2)+'\n');
const plan=JSON.parse(fs.readFileSync(`${base}/asset_plan.json`,'utf8'));plan.generatedImageCount=job.progress.generatedImages;fs.writeFileSync(`${base}/asset_plan.json`,JSON.stringify(plan,null,2)+'\n');
fs.appendFileSync(`${base}/generation_log.jsonl`,JSON.stringify({id,source,status:scene.status,width,height,note:note??null,at:new Date().toISOString()})+'\n');
console.log(JSON.stringify({id,status:scene.status,width,height,progress:job.progress}));
