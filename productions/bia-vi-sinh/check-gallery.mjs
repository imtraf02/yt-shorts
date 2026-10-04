import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('productions/bia-vi-sinh/gallery.html','utf8');
new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
const images=[...html.matchAll(/src="\.\.\/\.\.\/(public[^"]+)"/g)];
if(images.length!==160 || images.some(m=>!fs.existsSync(m[1]))) throw new Error('Invalid gallery links');
console.log('Gallery: 160 existing image paths; embedded JavaScript syntax valid.');
