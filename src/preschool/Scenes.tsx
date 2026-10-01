import React from 'react';
import {AbsoluteFill, Easing, Interactive, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Animal, ANIMALS, WhiteboardAnimal} from './WhiteboardAnimal';
import {Celebration} from './Celebration';
import timeline from '../data/preschool-animals-whiteboard-demo/timeline.json';

export type Chapter = typeof timeline.chapters[number];
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const list: Animal[] = ['cat', 'dog', 'rabbit', 'duck'];

const CountdownDigits: React.FC<{revealAt: number; top: number; left: number}> = ({revealAt, top, left}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = Math.ceil((revealAt - frame) / fps);
  const beat = ((frame - revealAt) % fps + fps) % fps;
  return <Interactive.Div name="Số đếm 3–2–1" style={{position: 'absolute', top, left, width: 190, height: 190,
    color: '#315947', fontSize: 176, fontWeight: 800, fontVariantNumeric: 'tabular-nums',
    textAlign: 'center', lineHeight: 1, zIndex: 5,
    scale: interpolate(beat, [0, 8, 29], [1.06, 1, 1], clamp)}}>{seconds}</Interactive.Div>;
};

const PhaseRail: React.FC<{phase: number}> = ({phase}) => <div style={{position: 'absolute', left: 120, top: 976,
  width: 1040, display: 'flex', justifyContent: 'center', gap: 30, zIndex: 4}}>
  {['Nhìn nét vẽ', 'Bé thử đoán', 'Gọi tên bạn'].map((label, index) => <div key={label}
    style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px', borderRadius: 24,
      background: index === phase ? '#dfecdf' : 'transparent', color: index === phase ? '#315947' : '#91978b',
      fontSize: 27, fontWeight: index === phase ? 800 : 600}}>
    <span style={{width: 10, height: 10, borderRadius: '50%', background: index <= phase ? '#77a489' : '#ccd7c8'}} />
    {label}
  </div>)}
</div>;

export const WelcomeScene: React.FC<{outro?: boolean; chapter: Chapter}> = ({outro = false, chapter}) => {
  const frame = useCurrentFrame();
  const reviews = timeline.sentences.filter(s => s.chapterId === chapter.id && s.start <= chapter.start + frame);
  const review = reviews[reviews.length - 1];
  const visible: Animal[] = outro && review && 'reviewAnimals' in review ? review.reviewAnimals as Animal[] : list;
  return <AbsoluteFill>
    <Interactive.Div name="Lời chào và ôn tập" style={{position: 'absolute', top: 238, left: 150, right: 150,
      fontSize: 80, fontWeight: 800, color: '#315947', textAlign: 'center', lineHeight: 1.15, zIndex: 4}}>
      {outro ? 'Bé cùng gọi tên các bạn nhé!' : 'Bạn nào đang ẩn mình?'}
      <div style={{fontSize: 34, fontWeight: 600, marginTop: 22, color: '#758170'}}>
        {outro ? 'Cùng người lớn ôn lại những người bạn mới' : 'Nhìn nét vẽ · Đoán tên bạn · Cùng khám phá'}
      </div>
    </Interactive.Div>
    {visible.map((animal, i) => <Interactive.Div key={animal} name="Thẻ động vật ôn tập" style={{
      position: 'absolute', top: 452, left: 215 + i * 380, width: 350, height: 388,
      background: '#fffdfa', border: '3px solid #dce6d4', borderRadius: 36, overflow: 'hidden',
      boxShadow: '0 10px 0 #e1e7d8', textAlign: 'center',
      opacity: interpolate(frame, [i * 6, i * 6 + 22], [0, 1], clamp),
      translate: interpolate(frame, [i * 6, i * 6 + 22], ['0px 20px', '0px 0px'], {...clamp, easing: Easing.out(Easing.cubic)})}}>
      <div style={{position: 'relative', height: 294, paddingTop: 8}}>
        <div style={{filter: outro ? undefined : 'brightness(0)', opacity: outro ? 1 : 0.12}}>
          <WhiteboardAnimal animal={animal} width={324} height={284} />
        </div>
        {!outro && <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
          fontSize: 128, fontWeight: 800, color: '#315947', textShadow: '0 4px 0 #fffdfa'}}>?</div>}
      </div>
      <div style={{fontSize: outro ? (ANIMALS[animal].name.length > 12 ? 29 : 38) : 29,
        fontWeight: 800, color: outro ? ANIMALS[animal].color : '#758170', marginTop: 18}}>
        {outro ? ANIMALS[animal].name : 'Bạn bí mật ' + (i + 1)}
      </div>
    </Interactive.Div>)}
  </AbsoluteFill>;
};

export const LearningScene: React.FC<{chapter: Chapter}> = ({chapter}) => {
  const frame = useCurrentFrame();
  const animal = chapter.animal as Animal;
  const answered = frame >= chapter.revealAt;
  const guessing = frame >= chapter.countdownAt && !answered;
  const color = interpolate(frame, [chapter.revealAt, chapter.revealAt + 24], [0, 1], clamp);
  const ink = interpolate(frame, [8, chapter.drawEndAt], [0, 1], clamp);
  const details = timeline.sentences.find(s => s.chapterId === chapter.id && s.phase === 'feature')!;
  const showDetail = frame >= details.start - chapter.start;
  return <AbsoluteFill>
    <Interactive.Div name="Câu dẫn quan sát" style={{position: 'absolute', top: 225, left: 120, right: 120,
      fontSize: 62, fontWeight: 800, color: '#315947', lineHeight: 1.15, zIndex: 4}}>
      {answered ? 'Cùng gọi tên người bạn mới!' : guessing ? 'Bé đoán đây là bạn nào?' : 'Bé nhìn nét vẽ nhé!'}
    </Interactive.Div>
    <div style={{position: 'absolute', top: 106, right: 90, display: 'flex', alignItems: 'center', gap: 14,
      color: '#758170', fontSize: 25, fontWeight: 700, zIndex: 4}}>
      {['Những bạn quen thuộc', 'Những bạn ở nông trại', 'Khám phá thêm bạn mới'][chapter.section]}
      <span style={{padding: '8px 16px', borderRadius: 20, background: '#e7eee0', color: '#315947'}}>
        {String(chapter.lessonIndex).padStart(2, '0')} / 12
      </span>
    </div>
    <Interactive.Div name="Bảng vẽ trắng" style={{position: 'absolute', top: 330, left: 120, width: 1040, height: 600,
      borderRadius: 36, background: '#fffdfa', border: '3px solid #dce6d4', boxShadow: '0 12px 0 #e1e7d8',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: 1}}>
      <WhiteboardAnimal animal={animal} width={990} height={556} ink={ink} color={color} pen />
    </Interactive.Div>
    <Interactive.Div name="Thẻ đoán và đáp án" style={{position: 'absolute', left: 1210, top: 330, width: 590, height: 600,
      borderRadius: 36, background: '#edf2e6', border: '2px solid #dce6d4', padding: '38px 42px', zIndex: 4}}>
      {!answered ? <>
        <div style={{fontSize: 25, fontWeight: 800, color: '#758170', letterSpacing: 1.2}}>
          {guessing ? 'BÉ THỬ ĐOÁN NHÉ' : 'CÙNG QUAN SÁT'}
        </div>
        <div style={{fontSize: 64, fontWeight: 800, lineHeight: 1.18, marginTop: 28}}>
          {guessing ? <>Bạn nào<br />vừa xuất hiện?</> : <>Nhìn thật kỹ<br />những nét vẽ!</>}
        </div>
        {!guessing && <div style={{fontSize: 160, fontWeight: 800, textAlign: 'center', color: '#99b5a0',
          lineHeight: 1, marginTop: 38}}>?</div>}
      </> : <div style={{
        opacity: interpolate(frame - chapter.revealAt, [0, 16], [0, 1], clamp),
        translate: interpolate(frame - chapter.revealAt, [0, 16], ['0px 16px', '0px 0px'], clamp)}}>
        <div style={{fontSize: 25, fontWeight: 800, color: '#758170', letterSpacing: 1.2}}>CHÀO NGƯỜI BẠN MỚI!</div>
        <div style={{fontSize: ANIMALS[animal].name.length > 9 ? 68 : 88, fontWeight: 800, lineHeight: 1.12,
          color: ANIMALS[animal].color, marginTop: 28}}>
          {ANIMALS[animal].name.length > 12 ? <>Bạn<br />{ANIMALS[animal].name.slice(4)}</> : ANIMALS[animal].name}
        </div>
        {showDetail && <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 36}}>
          {ANIMALS[animal].hint.split(' · ').map(hint => <div key={hint} style={{display: 'flex', alignItems: 'center', gap: 16,
            padding: '16px 18px', background: '#fffdfa', borderRadius: 18, fontSize: 34, fontWeight: 700, color: '#426d53'}}>
            <span style={{width: 10, height: 10, flexShrink: 0, borderRadius: '50%', background: '#86ad90'}} />{hint}
          </div>)}
        </div>}
      </div>}
    </Interactive.Div>
    {guessing && <CountdownDigits revealAt={chapter.revealAt} top={686} left={1410} />}
    <PhaseRail phase={answered ? 2 : guessing ? 1 : 0} />
    <Sequence from={chapter.revealAt} durationInFrames={73} name="Mừng mở đáp án">
      <Celebration seed={chapter.id + '-reveal'} />
    </Sequence>
  </AbsoluteFill>;
};

export const QuizScene: React.FC<{chapter: Chapter}> = ({chapter}) => {
  const frame = useCurrentFrame();
  const correct = chapter.animal as Animal;
  const options = chapter.options as Animal[];
  const answered = frame >= chapter.revealAt;
  const color = interpolate(frame, [chapter.revealAt, chapter.revealAt + 24], [0, 1], clamp);
  return <AbsoluteFill>
    <Interactive.Div name="Câu hỏi ôn tập" style={{position: 'absolute', top: 225, left: 120, right: 120,
      fontSize: 65, fontWeight: 800, color: '#315947', textAlign: 'center', lineHeight: 1.16, zIndex: 4}}>
      {answered ? 'Đáp án là ' + ANIMALS[correct].name.toLocaleLowerCase('vi') + '!' : chapter.question}
    </Interactive.Div>
    {options.map((animal, i) => <Interactive.Div key={animal} name="Lựa chọn ôn tập" style={{
      position: 'absolute', left: 260 + i * 760, top: 356, width: 640, height: 534,
      background: '#fffdfa', border: '3px solid', borderColor: answered && animal === correct ? '#79aa8a' : '#dce6d4',
      borderRadius: 36, boxShadow: '0 10px 0 #e1e7d8', overflow: 'hidden', textAlign: 'center', zIndex: 1,
      opacity: answered && animal !== correct ? 0.32 : 1}}>
      <div style={{paddingTop: 16}}>
        <WhiteboardAnimal animal={animal} width={596} height={418} color={animal === correct ? color : 0} />
      </div>
      <div style={{fontSize: 42, fontWeight: 800, color: '#386b49', marginTop: 22, position: 'relative', zIndex: 4}}>
        {answered && animal === correct ? '✓ ' + ANIMALS[animal].name : <span style={{fontSize: 25, color: '#758170'}}>BẠN {i + 1}</span>}
      </div>
    </Interactive.Div>)}
    {!answered && frame >= chapter.countdownAt && <CountdownDigits revealAt={chapter.revealAt} top={884} left={865} />}
    <Sequence from={chapter.revealAt} durationInFrames={73} name="Mừng đáp án ôn tập">
      <Celebration seed={chapter.id + '-quiz'} left={260 + options.indexOf(correct) * 760} top={356} width={640} height={534} />
    </Sequence>
  </AbsoluteFill>;
};
