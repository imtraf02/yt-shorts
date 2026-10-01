import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'preschool-animals-whiteboard-demo';
const animals = {
  cat: {name: 'Bạn Mèo', hint: 'Tai nhọn · Ria mèo', color: '#bc671b', feature: 'Bạn Mèo có đôi tai nhọn và những sợi ria ở hai bên má.'},
  dog: {name: 'Bạn Chó', hint: 'Tai cụp · Đuôi cong', color: '#98642e', feature: 'Bạn Chó trong tranh có đôi tai cụp và chiếc đuôi cong.'},
  rabbit: {name: 'Bạn Thỏ', hint: 'Tai dài · Đuôi tròn', color: '#b75e79', feature: 'Bạn Thỏ có đôi tai dài và chiếc đuôi nhỏ tròn.'},
  duck: {name: 'Bạn Vịt', hint: 'Mỏ rộng · Chân có màng', color: '#b87819', feature: 'Bạn Vịt có chiếc mỏ rộng và bàn chân có màng để bơi.'},
  cow: {name: 'Bạn Bò', hint: 'Đốm đen trắng · Đuôi dài', color: '#6b665e', feature: 'Bạn Bò trong tranh có những đốm đen trắng và chiếc đuôi dài.'},
  pig: {name: 'Bạn Lợn', hint: 'Mũi tròn · Đuôi xoăn', color: '#b75e79', feature: 'Bạn Lợn có chiếc mũi tròn và chiếc đuôi xoăn xinh xắn.'},
  goat: {name: 'Bạn Dê', hint: 'Sừng cong · Râu nhỏ', color: '#98642e', feature: 'Bạn Dê trong tranh có đôi sừng cong và chòm râu nhỏ.'},
  hen: {name: 'Bạn Gà mái', hint: 'Mào đỏ · Đôi cánh', color: '#bc671b', feature: 'Bạn Gà mái trong tranh có chiếc mào đỏ và đôi cánh.'},
  elephant: {name: 'Bạn Voi', hint: 'Vòi dài · Tai to', color: '#627f87', feature: 'Bạn Voi có chiếc vòi dài và đôi tai to.'},
  giraffe: {name: 'Bạn Hươu cao cổ', hint: 'Cổ dài · Đốm nâu', color: '#98642e', feature: 'Bạn Hươu cao cổ có chiếc cổ dài và những đốm nâu trên mình.'},
  tortoise: {name: 'Bạn Rùa', hint: 'Chiếc mai · Bốn chân', color: '#68783e', feature: 'Bạn Rùa trong tranh có chiếc mai trên lưng và bốn chân.'},
  goldfish: {name: 'Bạn Cá vàng', hint: 'Đôi vây · Đuôi mềm', color: '#bc671b', feature: 'Bạn Cá vàng có những chiếc vây và chiếc đuôi mềm để bơi.'},
};
const groups = [['cat', 'dog', 'rabbit', 'duck'], ['cow', 'pig', 'goat', 'hen'], ['elephant', 'giraffe', 'tortoise', 'goldfish']];
const quizzes = [
  {animal: 'rabbit', options: ['cat', 'rabbit'], question: 'Bé tìm bạn có đôi tai dài nhé!'},
  {animal: 'pig', options: ['pig', 'hen'], question: 'Bé tìm bạn có chiếc đuôi xoăn nhé!'},
  {animal: 'giraffe', options: ['elephant', 'giraffe'], question: 'Bé tìm bạn có chiếc cổ dài nhé!'},
];
const scenes = [];
let chapter = 0;
const chapterId = () => `C${String(++chapter).padStart(2, '0')}`;
const add = (chapterId, group, animal, phase, text, holdFrames, extra = {}) => {
  const id = `S${String(scenes.length + 1).padStart(3, '0')}`;
  scenes.push({id, chapterId, sentenceIds: [id], group, animal, phase, text, holdFrames,
    kind: 'existing-image', file: `public/images/${slug}/cutouts/${animal}.png`,
    prompt: 'User-provided preschool cartoon; user-approved local transparent-background extraction.',
    overlayText: phase === 'name' ? [animals[animal].name] : [], status: 'verified',
    qa: 'Original illustration visually inspected; identify visible traits, no invented animal sounds.', ...extra});
};
const intro = chapterId();
add(intro, 'intro', 'cat', 'welcome', 'Chào các bé!', 15);
add(intro, 'intro', 'cat', 'intro', 'Chúng mình cùng nhìn nét vẽ và đoán tên các bạn động vật nhé!', 15);
add(intro, 'intro', 'cat', 'rules', 'Vẽ xong, bé sẽ có ba giây để đoán tên bạn.', 25);
const invitations = [
  'Bé nhìn nét vẽ nhé, người bạn đầu tiên là ai nhỉ?',
  'Một bạn mới đang xuất hiện, bé nhìn thật kỹ nhé!',
  'Chúng mình cùng khám phá người bạn tiếp theo nhé!',
  'Bé nhìn những nét vẽ này và thử đoán nhé!',
  'Bây giờ, chúng mình gặp những bạn ở nông trại nhé!',
  'Người bạn này trông thật đáng yêu, bé đoán xem nhé!',
  'Bé cùng nhìn nét vẽ để tìm người bạn mới nhé!',
  'Thêm một người bạn nữa đang xuất hiện rồi!',
  'Chúng mình cùng khám phá thêm những bạn mới nhé!',
  'Bé nhìn kỹ nhé, bạn nào đang dần hiện ra?',
  'Mình cùng tìm người bạn tiếp theo qua nét vẽ nhé!',
  'Bé thử đoán người bạn cuối cùng nhé!',
];
for (const [g, group] of groups.entries()) {
  for (const [i, animal] of group.entries()) {
    const id = chapterId();
    add(id, 'learn', animal, 'draw', invitations[g * 4 + i], 0,
      {drawingFrames: animal === 'tortoise' ? 210 : 180, lessonIndex: g * 4 + i + 1, section: g});
    add(id, 'learn', animal, 'name', `Đây là ${animals[animal].name.toLocaleLowerCase('vi')}!`, 24);
    add(id, 'learn', animal, 'feature', animals[animal].feature, 36);
  }
  const id = chapterId(), quiz = quizzes[g];
  add(id, 'quiz', quiz.animal, 'question', quiz.question, 0, quiz);
  add(id, 'quiz', quiz.animal, 'answer', `Đáp án là ${animals[quiz.animal].name.toLocaleLowerCase('vi')}!`, 36, quiz);
}
const outro = chapterId();
for (const group of groups) {
  const names = group.map(a => animals[a].name.toLocaleLowerCase('vi'));
  add(outro, 'outro', group[0], 'review', `Bé cùng gọi tên ${names.slice(0, 3).join(', ')} và ${names[3]} nhé!`, 40, {reviewAnimals: group});
}
add(outro, 'outro', 'goldfish', 'bye', 'Bé hãy cùng người lớn gọi tên các bạn lần nữa nhé!', 40, {reviewAnimals: groups[2]});
if (scenes.some(s => /\bcon\b/u.test(s.text))) throw new Error('Inconsistent friendly address');
const write = (file, value) => {fs.mkdirSync(path.dirname(path.join(root, file)), {recursive: true});fs.writeFileSync(path.join(root, file), value);};
write(`src/data/${slug}/animals.json`, JSON.stringify(animals, null, 2) + '\n');
write(`productions/${slug}/storyboard.json`, JSON.stringify({slug, fps: 30, scenes}, null, 2) + '\n');
write(`productions/${slug}/narration.txt`, scenes.map(s => s.text).join('\n') + '\n');
write(`productions/${slug}/script.md`, '# Bé làm quen với 12 bạn động vật\n\n' + scenes.map(s => `- ${s.id} · ${s.chapterId} · ${s.phase}: ${s.text}`).join('\n') + '\n');
console.log(`${Object.keys(animals).length} animals; ${scenes.length} separate sentences.`);
