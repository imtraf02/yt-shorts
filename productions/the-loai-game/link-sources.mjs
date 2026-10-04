import fs from 'node:fs';
const p='productions/the-loai-game/storyboard.json',a=JSON.parse(fs.readFileSync(p));
const links={R01:[7,8,14,296,297,298,299,300,301,303,304,306,309,310,312,313,314,315,316,317,318,319,320],R02:[269,270,271],R03:[55],R04:[37],R05:[272,273,274],R06:[192,193,194,300,301,303,304,305],R07:[88,89,90],R08:[157,158,159],R09:[94],R10:[281,282,283],R11:[119,120,121]};
for(const s of a){s.sourceIds=Object.entries(links).filter(([,ids])=>ids.includes(+s.id.slice(1))).map(([id])=>id);s.evidenceType=s.sourceIds.length?'targeted source check plus editorial interpretation':'editorial gameplay overview; not individually source-verified';}
fs.writeFileSync(p,JSON.stringify(a,null,2)+'\n');
