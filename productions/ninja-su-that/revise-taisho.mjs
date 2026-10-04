import fs from 'node:fs';
import path from 'node:path';
const base='productions/ninja-su-that';
const p=`${base}/storyboard.json`;
const scenes=JSON.parse(fs.readFileSync(p));
const ids=['I117','I118','I119'];
for(const id of ids){
 const s=scenes.find(x=>x.id===id);
 const target=path.resolve(s.file),root=path.resolve('public/images/ninja-su-that')+path.sep;
 if(!target.startsWith(root))throw new Error('Outside image directory');
 const rejected=target.replace(/\.png$/,'-v1-rejected.png');
 if(fs.existsSync(rejected))throw new Error('Rejected destination exists');
 fs.renameSync(target,rejected);
 const scene=id==='I117'?'A circa 1915 Japanese bookshop reader examines an adventure booklet; a clearly framed cover illustration shows an entirely original fictional red-cloaked ninja hero leaping over painted medieval rooftops.':id==='I118'?'Stacks of inexpensive adventure booklets on a circa 1915 Japanese bookshop counter, short-haired readers in kimono and one man in a Western suit read them; a floating printed cover vignette depicts a fictional masked ninja hero.':'A circa 1915 short-haired Japanese reader in a Western vest examines an adventure booklet at a desk. A translucent fictional masked hero floats inside a printed cover vignette on the left, while a blank cream archival paper on the right symbolizes missing historical evidence.';
 s.description=scene;
 s.prompt=`Fresh standalone original 2D anime editorial documentary illustration, ink line art, cel shading, warm cream washi paper, navy, vermilion, antique gold and jade. Single wide 16:9 full-frame illustration, quiet bottom 18 percent for future captions. Scene: ${scene} The real reading and publishing setting is Taisho Japan, around 1915, early twentieth century. All male readers have ordinary cropped short hair, NO chonmage, NO samurai topknots, NO shaved samurai foreheads, NO swords or armor on readers. Women if present have period early-twentieth-century hairstyles. Bookshop has glass display window, wooden counter, bound printed books and an electric pendant light. Fictional medieval clothing is permitted ONLY within the clearly framed cover illustration. No Mio, no modern electronics, no readable titles, letters, numerals, logos, national flags, watermarks or franchise character designs. Asset ${id}.`;
 s.status='pending';s.qa=null;delete s.provenance;
 fs.appendFileSync(`${base}/generation_log.jsonl`,JSON.stringify({id,source:'visual-rejection',status:'pending',reason:'Taisho readers incorrectly resembled Edo topknotted samurai',rejectedFile:rejected,at:new Date().toISOString()})+'\n');
}
fs.writeFileSync(p,JSON.stringify(scenes,null,2)+'\n');
console.log(JSON.stringify(scenes.filter(s=>ids.includes(s.id))));
