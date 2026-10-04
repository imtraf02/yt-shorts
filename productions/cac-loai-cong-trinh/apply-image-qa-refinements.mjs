import fs from 'node:fs';
const file = 'productions/cac-loai-cong-trinh/storyboard.json';
const scenes = JSON.parse(fs.readFileSync(file, 'utf8'));
for (const s of scenes) {
  if (['I088', 'I089', 'I090'].includes(s.id) && !s.prompt.includes('Viaduct restraint:')) s.prompt += '\nViaduct restraint: Only repeated beam/box-girder viaduct spans on many concrete piers. No suspension bridge, no stayed bridge, no towers or cables, no unrelated force-detail insets. If rail, show rails and overhead electrification consistently; do not mix train with road traffic on the same deck. Cables for rail electrification are fine.';
  if (['I045', 'I046', 'I047'].includes(s.id) && !s.prompt.includes('No intake towers')) {
    s.prompt += '\nSpecific restraint: No intake towers, no turbines, no large pipes through the embankment. Continuous impermeable core bonded to the foundation, adjacent filter zones and small downstream toe drain only. Spillway, if present, is off to the side on concrete, never overtopping the earthfill crest.';
  }
  if (s.id === 'I047' && !s.prompt.includes('Camera distinction:')) s.prompt += '\nCamera distinction: Distant aerial exterior view emphasizing a broad artificial hill, with only a small material-section inset. Do not repeat the close cutaway view.';
  const n = Number(s.id.slice(1));
  if (n >= 101 && n <= 120) {
    let constraint;
    if (n <= 104) constraint = 'Engineering constraint: One shield TBM, cutterhead at the excavation front, spoil conveyor directed rearward, segment erector behind the shield and continuous completed circular lining behind it. Ground cover above; no immersed tubes or open trench. Comparison may show contrasting route geometry only.';
    else if (n <= 108) constraint = 'Engineering constraint: Only a drill-and-blast mountain tunnel with drill jumbo at a rock face, supported roof, rock bolts and sprayed concrete. Distinct work stages, no people beside active blasting, no visible explosive specifications. No TBM or underwater systems. Comparison may show differing rock and tunnel geometry.';
    else if (n <= 112) constraint = 'Engineering constraint: Immersed rectangular tunnel elements are fabricated on shore, sealed for floating transport, then lowered onto a prepared bed trench and joined watertight before protective backfill. Show distinct stages. Finished elements never hang unsupported in open water. No TBM or road trench.';
    else if (n <= 116) constraint = 'Engineering constraint: Rectangular concrete jacked box, reaction wall and hydraulic jacks behind it, controlled excavation immediately ahead, shallow active transport line above. Distinguish the launch pit from the final underground box. No TBM, immersed tube or unrelated machinery.';
    else constraint = 'Engineering constraint: Accessible dry utility corridor with pipes and cables on separate supports, clear maintenance walkway, ventilation and continuous lining. No trains, TBM, underwater tunnel or open trench. Utilities are conceptual, not a detailed installation drawing.';
    s.prompt = s.prompt.replace(/Engineering constraint:[^\n]*/, constraint);
  }
  if (['I061', 'I067', 'I068'].includes(s.id) && !s.prompt.includes('Subject lock:')) s.prompt += '\nSubject lock: Only a deck-above stone/concrete arch bridge with compression through the curved rib into strong abutments. No suspension cables, no tall towers, no cable-stayed forms. Keep arrows sparse.';
  if (['I063', 'I064', 'I065', 'I066'].includes(s.id) && !s.prompt.includes('Subject lock:')) s.prompt += '\nSubject lock: Main subject is a simple beam/girder bridge, parallel horizontal girders below road deck on short concrete piers and bearings. No suspension main cables, no vertical hangers, no tall cable towers, no arch or truss on main subject. Do not transform it into a suspension bridge. Force arrows, if any, limited to sparse downward deck-to-bearing-to-pier-to-foundation path. Comparison may show an unbuilt wider crossing site.';
}
fs.writeFileSync(file, JSON.stringify(scenes, null, 2) + '\n');
