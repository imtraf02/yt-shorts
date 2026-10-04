import fs from 'node:fs';
const b='productions/cac-loai-cong-trinh',s=JSON.parse(fs.readFileSync(`${b}/storyboard.json`,'utf8'));
for(const x of s){
 if(x.chapterId==='C01'||x.chapterId==='C12')x.prompt=x.prompt.replace(/Engineering constraint: [^\n]+/,'Engineering constraint: Focus only on infrastructure named in the subject. Keep bridge, tunnel, water, electric and transport systems distinct and plausibly connected. Do not insert extra systems into a single-mechanism scene.');
 if(['I305','I306','I307','I308'].includes(x.id))x.prompt=x.prompt.replace(/urban retention basin doubling as a park in dry weather and temporarily filling during heavy rain/g,'a dry detention basin integrated with a park, a low outlet and emergency overflow, with temporary stormwater storage; separate small inset of a retention pond retaining a permanent pool').replace(/Hồ điều hòa và retention basin/g,'Hồ điều hòa: detention và retention');
 if(x.id==='I014')x.prompt=x.prompt.replace(/giant unlabeled cyan engineering linework atlas/,'large unlabeled engineering portfolio');
 if(x.id==='I294')x.prompt=x.prompt.replace(/A river basin map/,'A fictional watershed terrain schematic, not a real geographic map');
}
fs.writeFileSync(`${b}/storyboard.json`,JSON.stringify(s,null,2)+'\n');
console.log('Refined introductory/general constraints and detention/retention imagery.');
