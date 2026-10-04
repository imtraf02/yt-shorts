import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const repo = fs.realpathSync(process.cwd());
const job = JSON.parse(fs.readFileSync('productions/long-video-outro/manifest.json', 'utf8'));
const brand = JSON.parse(fs.readFileSync('src/data/long-video-outro/brand.json', 'utf8'));
const inputs = job.stages.images.outputs.filter(f => f.endsWith('.png'));
if (brand.avatarSrc && !/^https?:\/\//.test(brand.avatarSrc)) {
  const avatar = `public/${brand.avatarSrc.replace(/^public\//, '')}`;
  if (!inputs.includes(avatar)) inputs.push(avatar);
}
const publicBase = path.join(repo, 'public');
const targetBase = path.join(repo, 'out/long-video-outro/render-public');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for (const relative of inputs) {
  const source = fs.realpathSync(path.resolve(repo, relative));
  const suffix = path.relative(publicBase, source);
  if (suffix.startsWith('..') || path.isAbsolute(suffix)) throw new Error(`Asset outside public: ${relative}`);
  const target = path.resolve(targetBase, suffix);
  if (!target.startsWith(targetBase + path.sep)) throw new Error('Asset staging path escapes output');
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.copyFileSync(source, target);
  if (hash(source) !== hash(target)) throw new Error(`Copy mismatch: ${relative}`);
}
console.log(`Staged and hash-verified ${inputs.length} image files.`);
