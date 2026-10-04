import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const errorName=process.argv[2];
if(!/^image_generation_error-I\d{3}\.json$/.test(errorName))throw Error('Invalid error file');
const read=f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));
const write=(f,x)=>fs.writeFileSync(path.join(dir,f),JSON.stringify(x,null,2)+'\n');
const e=read(errorName),m=read('manifest.json'),b=read('storyboard.json');
if(!e.error.includes('usage_limit_reached')||!e.retryAfter)throw Error('Not a quota blocker');
if(fs.existsSync(path.join(dir,'image_generation_error.json'))){
  const prior=read('image_generation_error.json');
  const priorId=prior.id||prior.sceneId||'I052';
  const archive='image_generation_error-'+priorId+'.json';
  if(!fs.existsSync(path.join(dir,archive)))write(archive,prior);
  for(const h of m.blockerHistory||[])if(h.sceneId===priorId)h.errorFile='productions/'+m.slug+'/'+archive;
}
write('image_generation_error.json',e);
m.blockers=m.blockers.filter(x=>!(x.stage==='images'&&x.sceneId===e.id));
m.blockers.push({stage:'images',reason:'ImageGen usage_limit_reached (HTTP 429)',sceneId:e.id,observedAt:e.observedAt,retryAfter:e.retryAfter,resetLocal:e.resetLocal,errorFile:'productions/'+m.slug+'/'+errorName});
m.stages.images.status='blocked';m.updatedAt=new Date().toISOString();
const s=b.scenes.find(s=>s.id===e.id);s.status='blocked';s.generationError=e;
write('storyboard.json',b);write('manifest.json',m);
fs.appendFileSync(path.join(dir,'qa.md'),'\n- ImageGen quota blocker at '+e.id+' observed '+e.observedAt+'. Exact HTTP 429 preserved in '+errorName+'. Reset reported '+e.retryAfter+' / '+e.resetLocal+'. No further generation attempted after this error.\n');
console.log(JSON.stringify({blockedAt:e.id,retryAfter:e.retryAfter,resetLocal:e.resetLocal}));
