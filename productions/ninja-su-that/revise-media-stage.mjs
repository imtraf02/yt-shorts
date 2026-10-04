import fs from 'node:fs';
import path from 'node:path';
const base='productions/ninja-su-that',p=`${base}/storyboard.json`,a=JSON.parse(fs.readFileSync(p));
for(const id of ['I123','I128']){
 const s=a.find(x=>x.id===id),target=path.resolve(s.file),root=path.resolve('public/images/ninja-su-that')+path.sep;
 if(!target.startsWith(root))throw new Error('Outside image directory');
 const rejected=target.replace(/\.png$/,'-v1-rejected.png');if(fs.existsSync(rejected))throw new Error('Exists');fs.renameSync(target,rejected);
 const scene=id==='I123'?'An editorial collage grows from a tiny anonymous medieval traveler at bottom center: exactly three clearly framed modern media panels above him show a cinema screen with an original masked ninja stunt actor, a paper comic with an original ninja hero, and a generic video-game screen with an original masked ninja avatar. Only human ninja-related figures, NO monsters, NO robots, NO mecha, NO famous characters. Modern cinema audience and gamer wear ordinary modern clothing with cropped hair. Medieval traveler stays in a separate small ink silhouette.':'Single interior view of an Edo Japanese theater. A wooden stage clearly bounded by red curtains, painted flat village backdrop and footlights. One actor dressed as a perfectly ordinary unmasked merchant with brown kimono and cloth parcel stands calmly at center stage. Below the stage, several seated Edo spectators peer around in confusion searching for the ninja character. NO black masked ninja anywhere, NO person on a rooftop. Visible theater musicians at the side and clear indoor wooden ceiling.';
 s.description=scene;
 s.prompt=`Fresh standalone original 2D anime editorial documentary illustration, ink line art, cel shading, washi texture, cream, navy, vermilion, gold and jade palette. Single wide 16:9 full-frame image; quiet lower 18 percent for future captions. ${scene} No Mio, no readable text, letters, numbers, logos, watermark, national flags, franchise identifiers or graphic wounds. Fictional ninja figures belong only inside media panels. Asset ${id}.`;
 s.status='pending';s.qa=null;delete s.provenance;
 fs.appendFileSync(`${base}/generation_log.jsonl`,JSON.stringify({id,source:'visual-rejection',status:'pending',reason:id==='I123'?'Unrequested monster and mecha in media montage':'Street scene instead of explicit theater setting',rejectedFile:rejected,at:new Date().toISOString()})+'\n');
}
fs.writeFileSync(p,JSON.stringify(a,null,2)+'\n');console.log(JSON.stringify(a.filter(s=>['I123','I128'].includes(s.id))));
