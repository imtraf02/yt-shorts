// Local production checkpoints. No API calls, media generation, or rendering.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dependencies = {
  script: [], storyboard: ['script'], images: ['storyboard'], audio: ['script'],
  captions: ['audio'], composition: ['storyboard', 'images', 'audio', 'captions'],
  qa: ['composition'], render: ['qa'],
};
const hash = (data) => crypto.createHash('sha256').update(data).digest('hex');
const digest = (data) => hash(JSON.stringify(data));

function hashFile(filename, cache) {
  if (cache?.has(filename)) return cache.get(filename);
  const fd = fs.openSync(filename, 'r');
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  const state = crypto.createHash('sha256');
  try {
    let length;
    while ((length = fs.readSync(fd, buffer, 0, buffer.length, null)) > 0) {
      state.update(buffer.subarray(0, length));
    }
  } finally { fs.closeSync(fd); }
  const result = state.digest('hex');
  cache?.set(filename, result);
  return result;
}

function slugCheck(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug ?? '') || slug.length > 80 ||
      /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i.test(slug)) {
    throw new Error('Slug must be a safe lowercase name, e.g. timezones-documentary.');
  }
}

export function safePath(root, relative) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative) ||
      relative.includes(':') || relative.split(/[\\/]/).some((x) => x === '..')) {
    throw new Error(`Unsafe project path: ${relative}`);
  }
  const base = fs.realpathSync(root);
  const target = path.resolve(base, relative);
  const inside = (candidate) => {
    const rel = path.relative(base, candidate);
    return rel !== '' && rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel);
  };
  if (!inside(target)) throw new Error(`Path outside project: ${relative}`);
  // Check existing ancestors as well as files to reject symlink/junction escapes.
  let ancestor = target;
  while (!fs.existsSync(ancestor)) ancestor = path.dirname(ancestor);
  const resolved = fs.realpathSync(ancestor);
  if (resolved !== base && !inside(resolved)) throw new Error(`Symlink outside project: ${relative}`);
  return target;
}

function jobPath(root, slug) {
  slugCheck(slug);
  return safePath(root, `productions/${slug}/manifest.json`);
}

export function initJob(root, slug, format = 'long') {
  if (!['long', 'short'].includes(format)) throw new Error('Format must be long or short.');
  const filename = jobPath(root, slug);
  const dir = path.dirname(filename);
  if (fs.existsSync(dir)) throw new Error('Job directory already exists; use status to resume.');
  const p = `productions/${slug}`;
  const stage = (inputs, outputs) => ({inputs, outputs, checkpoint: null});
  const job = {
    schemaVersion: 1, slug,
    settings: {
      format, width: format === 'long' ? 1920 : 1080,
      height: format === 'long' ? 1080 : 1920, fps: 30,
      voice: 'Trúc Ly', sampleRate: 48000, style: 'Vox-style anime 2D',
      backgroundMusic: false,
    },
    blockers: [],
    stages: {
      script: stage([`${p}/brief.md`], [`${p}/script.md`, `${p}/narration.txt`, `${p}/sources.md`]),
      storyboard: stage([`${p}/script.md`], [`${p}/storyboard.json`]),
      images: stage([`${p}/storyboard.json`], []),
      audio: stage([`${p}/narration.txt`, 'scripts/generate_tts.py'], [`public/audio/${slug}/narration.wav`]),
      captions: stage([`public/audio/${slug}/narration.wav`, `${p}/narration.txt`], [`src/data/${slug}/captions.json`]),
      composition: stage([`${p}/storyboard.json`], []),
      qa: stage([], [`${p}/qa.md`]),
      render: stage([`${p}/qa.md`], [`out/${slug}/${slug}.mp4`]),
    },
  };
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(filename, JSON.stringify(job, null, 2) + '\n', {flag: 'wx'});
  fs.writeFileSync(path.join(dir, 'brief.md'),
    `# ${slug}\n\nĐiền chủ đề, phạm vi sản phẩm, đối tượng, thời lượng, số ảnh đã chốt và các giả định trước khi checkpoint.\n`, {flag: 'wx'});
  return job;
}

function readJob(root, slug) {
  const job = JSON.parse(fs.readFileSync(jobPath(root, slug), 'utf8').replace(/^\uFEFF/, ''));
  if (job.schemaVersion !== 1 || job.slug !== slug || !job.settings || !Array.isArray(job.blockers)) {
    throw new Error('Invalid manifest schema, slug, settings or blockers.');
  }
  for (const name of Object.keys(dependencies)) {
    const stage = job.stages?.[name];
    if (!stage || !Array.isArray(stage.inputs) || !Array.isArray(stage.outputs)) {
      throw new Error(`Invalid stage: ${name}`);
    }
  }
  return job;
}

function snapshot(root, job, name, cache) {
  const stage = job.stages[name];
  if (!stage.outputs.length) throw new Error('Declare the actual output files first.');
  const files = {};
  for (const rel of [...stage.inputs, ...stage.outputs]) {
    const filename = safePath(root, rel);
    if (!fs.existsSync(filename) || !fs.statSync(filename).isFile() || fs.statSync(filename).size === 0) {
      throw new Error(`Missing or empty file: ${rel}`);
    }
    files[rel] = hashFile(filename, cache);
  }
  return {
    settings: digest(job.settings), inputs: stage.inputs, outputs: stage.outputs, files,
    dependencies: Object.fromEntries(dependencies[name].map((dep) => [dep, digest(job.stages[dep].checkpoint)])),
  };
}

export function inspectJob(root, slug) {
  const job = readJob(root, slug);
  const stages = {};
  const cache = new Map();
  for (const name of Object.keys(dependencies)) {
    const stage = job.stages[name];
    const issues = [];
    const upstream = dependencies[name].filter((dep) => stages[dep].state !== 'verified');
    if (upstream.length) issues.push(`Dependencies need verification: ${upstream.join(', ')}`);
    try {
      const now = snapshot(root, job, name, cache);
      if (!stage.checkpoint) issues.push('No checkpoint; existence alone does not mean reviewed.');
      else if (digest(now) !== digest(stage.checkpoint.snapshot)) issues.push('Inputs, outputs, settings or dependency checkpoints changed.');
    } catch (error) { issues.push(error.message); }
    const blockers = job.blockers.filter((b) => b.stage === name);
    for (const blocker of blockers) issues.push(`Blocked: ${blocker.reason}; retryAfter=${blocker.retryAfter ?? 'unknown'}`);
    stages[name] = {
      state: issues.length ? (blockers.length ? 'blocked' : stage.checkpoint ? 'stale' : 'pending') : 'verified',
      issues,
    };
  }
  return {job, stages};
}

export function checkpoint(root, slug, name, note) {
  if (!Object.hasOwn(dependencies, name)) throw new Error('Unknown stage.');
  if (typeof note !== 'string' || note.trim().length < 10) throw new Error('Provide a meaningful --note describing the verification evidence.');
  const {job, stages} = inspectJob(root, slug);
  if (job.blockers.some((b) => b.stage === name)) throw new Error('Resolve and remove the recorded blocker first.');
  const upstream = dependencies[name].filter((dep) => stages[dep].state !== 'verified');
  if (upstream.length) throw new Error(`Checkpoint dependencies first: ${upstream.join(', ')}`);
  const current = snapshot(root, job, name);
  job.stages[name].checkpoint = {at: new Date().toISOString(), note: note.trim(), snapshot: current};
  fs.writeFileSync(jobPath(root, slug), JSON.stringify(job, null, 2) + '\n');
  return job.stages[name].checkpoint;
}

function environment(root) {
  const checks = {
    remotionCli: 'node_modules/.bin/remotion.cmd',
    ttsPython: 'VieNeu-TTS/.venv/Scripts/python.exe',
    ttsScript: 'scripts/generate_tts.py',
    whisperExecutable: 'whisper.cpp/main.exe', whisperModel: 'whisper.cpp/ggml-base.bin',
  };
  return {node: process.version, filesPresent: Object.fromEntries(Object.entries(checks)
    .map(([key, rel]) => [key, fs.existsSync(safePath(root, rel))])),
  note: 'File presence only; GPU, models, API quota and media QA are not tested.'};
}

function main(args) {
  const [command, slug, ...rest] = args;
  if (!command || command === '--help') {
    console.log('video-job.mjs init <slug> [--format long|short]\nvideo-job.mjs status <slug>\nvideo-job.mjs checkpoint <slug> <stage> --note "Verification evidence"');
    return;
  }
  if (command === 'init') {
    if (rest.length && (rest.length !== 2 || rest[0] !== '--format')) throw new Error('Expected --format long|short.');
    initJob(repository, slug, rest[1] ?? 'long');
    console.log(`Created productions/${slug}/manifest.json. Fill brief and artifact paths before checkpointing.`);
  } else if (command === 'status') {
    if (rest.length) throw new Error('Unexpected status arguments.');
    const {job, stages} = inspectJob(repository, slug);
    console.log(JSON.stringify({slug, environment: environment(repository), stages, blockers: job.blockers,
      note: 'verified = unchanged recorded checkpoint, not automatic media or content QA.'}, null, 2));
  } else if (command === 'checkpoint') {
    if (rest.length !== 3 || rest[1] !== '--note') throw new Error('Expected <stage> --note "Verification evidence".');
    checkpoint(repository, slug, rest[0], rest[2]);
    console.log(`Checkpoint saved: ${slug}/${rest[0]}`);
  } else throw new Error(`Unknown command: ${command}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
