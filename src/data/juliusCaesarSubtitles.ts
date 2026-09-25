import type { Caption } from "@remotion/captions";
import rawCaptions from "./juliusCaesarCaptions.json";

export interface JuliusCaesarPhrase extends Caption {
  sceneId: number;
  words: JuliusCaesarWordTiming[];
}

export interface JuliusCaesarWordTiming {
  word: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
}

export interface JuliusCaesarSceneMeta {
  id: number;
  image: string;
  badge: string;
  captionStartFrame: number;
  startFrame: number;
  durationInFrames: number;
}

export const JULIUS_CAESAR_FPS = 30;
export const JULIUS_CAESAR_AUDIO_PATH = "audio/julius-caesar-mix.mp3";
export const JULIUS_CAESAR_AUDIO_FRAMES = Math.ceil(69.024 * JULIUS_CAESAR_FPS);
export const JULIUS_CAESAR_TOTAL_FRAMES = JULIUS_CAESAR_AUDIO_FRAMES + 30;
export const JULIUS_CAESAR_TRANSITION_FRAMES = 18;

export const JULIUS_CAESAR_PHRASES =
  rawCaptions as JuliusCaesarPhrase[];

const SCENE_DEFINITIONS = [
  {
    id: 1,
    image: "01-senate-assassination.png",
    badge: "ÂM MƯU TRONG THƯỢNG VIỆN",
  },
  {
    id: 2,
    image: "02-pirate-capture.png",
    badge: "BỊ CƯỚP BIỂN BẮT CÓC",
  },
  {
    id: 3,
    image: "03-caesar-among-pirates.png",
    badge: "LỜI HỨA CỦA CON TIN",
  },
  {
    id: 4,
    image: "04-gaul-campaign.png",
    badge: "CHIẾN DỊCH GAUL",
  },
  {
    id: 5,
    image: "05-crossing-rubicon.png",
    badge: "49 TCN • VƯỢT RUBICON",
  },
  {
    id: 6,
    image: "06-dictator.png",
    badge: "ĐỘC TÀI TRỌN ĐỜI",
  },
  {
    id: 7,
    image: "07-senate-conspiracy.png",
    badge: "IDUS OF MARCH • 44 TCN",
  },
  {
    id: 8,
    image: "08-brutus-dagger.png",
    badge: "BRUTUS • NHÁT DAO CUỐI",
  },
  {
    id: 9,
    image: "09-legacy.png",
    badge: "DI SẢN CỦA CAESAR",
  },
];

export const JULIUS_CAESAR_SCENES: JuliusCaesarSceneMeta[] =
  SCENE_DEFINITIONS.map((scene, index) => {
    const firstPhrase = JULIUS_CAESAR_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextScene = SCENE_DEFINITIONS[index + 1];
    const nextPhrase = nextScene
      ? JULIUS_CAESAR_PHRASES.find(
          (phrase) => phrase.sceneId === nextScene.id,
        )
      : undefined;
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * JULIUS_CAESAR_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * JULIUS_CAESAR_FPS)
      : JULIUS_CAESAR_TOTAL_FRAMES;
    const halfTransition = Math.floor(JULIUS_CAESAR_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? JULIUS_CAESAR_TOTAL_FRAMES
        : nextCaptionStartFrame + halfTransition;

    return {
      ...scene,
      captionStartFrame,
      startFrame,
      durationInFrames: Math.max(1, endFrame - startFrame),
    };
  });
