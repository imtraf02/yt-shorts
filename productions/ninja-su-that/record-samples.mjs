import fs from 'node:fs';
const p='productions/ninja-su-that';const scenes=JSON.parse(fs.readFileSync(`${p}/storyboard.json`,'utf8'));
const prompts=JSON.parse(fs.readFileSync(`${p}/sample-prompts-used.json`,'utf8'));
for(const {id,prompt} of prompts){const scene=scenes.find(s=>s.id===id);scene.prompt=prompt;scene.includesMio=true;scene.observedVariation=id==='I002'?'Four stereotype panels rather than four isolated props; accepted.':'Mio added as editorial cutout in sample; accepted, absent from non-guide scene prompts going forward.';}
fs.writeFileSync(`${p}/storyboard.json`,JSON.stringify(scenes,null,2)+'\n');
