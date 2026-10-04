import fs from 'node:fs';
const p='productions/bia-vi-sinh/storyboard.json';
const a=JSON.parse(fs.readFileSync(p));
const fixes={
 I133:'Minimal editorial conceptual diagram on dark teal: two parallel horizontal gold and emerald ribbons in the upper half, each with three neutral round nodes; a large empty gap separates them. No connection arrow between the ribbons. No equipment, no vessels, no beer, no grain, no yeast, no people. This represents correlation without assuming causation.',
 I135:'Modern clean medical research room. One small plain capped sample vial containing pale amber fluid on the left of the desk, microscope behind it. A large rectangular monitor on the right is completely blank matte dark teal. Absolutely no graphs, no bars, no axes, no lines, no data, no numbers, no letters on screen. No full beer glass, no brewing machinery.',
 I137:'Editorial evidence-classification metaphor: three equally sized plain closed research dossiers stand upright on a desk; their covers are identical blank emerald rectangles, no labels. Above each dossier is a different abstract cluster of simple gold dots, with no graph, no scale and no connecting arrows. No people, no drinking, no vegetables, no water faucet, no skin exposure, no brewing equipment. Quiet lower quarter.'
};
for(const [id,scene] of Object.entries(fixes)){
 const s=a.find(x=>x.id===id);
 fs.renameSync(s.file,s.file.replace('.png','-v1-rejected.png'));
 s.description=scene;s.prompt=s.prompt.split('\nScene:')[0]+'\nScene: '+scene+' Fresh independent illustration. Depict exactly this scene; ignore prior images. Asset '+id;
 s.status='pending';s.qa=null;
}
fs.writeFileSync(p,JSON.stringify(a,null,2)+'\n');
