import React from "react";
import {AbsoluteFill, Easing, Img, Interactive, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {loadFont} from "@remotion/google-fonts/Montserrat";
import {z} from "zod";
import {CharacterFrameAnimation} from "./components/CharacterFrameAnimation";
import {Atmosphere} from "./components/effects";
import traBow from "../public/characters/animations/tra-xanh-cui-cam-on-v2/animation.json";
import lamBow from "../public/characters/animations/lam-lam-cui-cam-on-v1/animation.json";

const {fontFamily} = loadFont("normal", {weights: ["400", "500", "600", "700", "800"], subsets: ["latin", "vietnamese"]});
export const LONG_OUTRO_FRAMES = 150;
export const longOutroSchema = z.object({
  channelName: z.string().min(1).max(80),
  avatarSrc: z.string().describe("Đường dẫn trong public hoặc URL https; để trống dùng biểu tượng mẫu"),
  tagline: z.string().max(140),
});
type OutroProps = z.infer<typeof longOutroSchema>;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const CenteredBrand: React.FC<OutroProps> = ({channelName, avatarSrc, tagline}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const avatarEnter = spring({frame: frame - 2, fps, config: {damping: 17, stiffness: 125, mass: 0.75}});
  const letters = Array.from(channelName);
  const nameSize = Math.min(92, 1320 / (letters.length * 0.72));
  const source = /^https?:\/\//.test(avatarSrc) ? avatarSrc : staticFile(avatarSrc.replace(/^public\//, ""));
  return <>
    <Interactive.Div name="Avatar kênh — tâm khung hình" style={{position: "absolute", left: "50%", top: 188,
      width: 284, height: 284, marginLeft: -142, opacity: interpolate(frame, [0, 10], [0, 1], clamp),
      scale: interpolate(avatarEnter, [0, 1], [0.62, 1]),
      translate: `0 ${(1 - avatarEnter) * 32 + Math.sin(frame / 27) * 2}px`}}>
      {[0, 7].map((delay) => <div key={delay} style={{position: "absolute", inset: -12,
        borderRadius: "50%", border: "1px solid rgba(167,243,208,0.6)",
        opacity: interpolate(frame, [12 + delay, 19 + delay, 41 + delay], [0, 0.48, 0], clamp),
        scale: interpolate(frame, [12 + delay, 43 + delay], [0.85, 1.7], {...clamp, easing: ease})}} />)}
      <svg viewBox="0 0 260 260" style={{position: "absolute", inset: -12, width: 308, height: 308,
        overflow: "visible", rotate: `${interpolate(frame, [0, 50, 149], [-125, -85, -55], clamp)}deg`}}>
        <circle cx="130" cy="130" r="123" fill="none" stroke="rgba(110,231,183,0.85)" strokeWidth="2.2"
          pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(frame, [2, 29], [1, 0.12], {...clamp, easing: ease})} />
        <circle cx="130" cy="130" r="113" fill="none" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="72 638"
          opacity={interpolate(frame, [12, 30], [0, 0.65], clamp)} />
        <circle cx="130" cy="7" r="4" fill="#D1FAE5" />
      </svg>
      <div style={{position: "absolute", inset: 8, borderRadius: "50%", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid rgba(167,243,208,0.35)", background: "linear-gradient(145deg, #215348, #062920)",
        boxShadow: "0 12px 50px rgba(0,0,0,0.28), 0 0 65px rgba(52,211,153,0.12)",
        rotate: interpolate(frame, [0, 30], ["-12deg", "0deg"], {...clamp, easing: ease})}}>
        {avatarSrc ? <Img name="Avatar tùy chỉnh" src={source} style={{width: "100%", height: "100%", objectFit: "cover"}} />
          : <svg viewBox="0 0 100 100" style={{width: "54%", height: "54%"}}>
            <path d="M25 20L80 50L25 80Z" fill="#D1FAE5" />
            <path d="M8 18H18M13 13V23M76 79H90M83 72V86" fill="none" stroke="#FCD34D" strokeWidth="2.6" strokeLinecap="round" />
          </svg>}
      </div>
    </Interactive.Div>
    <Interactive.Div name="Tên kênh — căn giữa, spring từng chữ" style={{position: "absolute", top: 517,
      left: 240, right: 240, textAlign: "center", whiteSpace: "nowrap", color: "#F0F6E9",
      fontWeight: 800, fontSize: nameSize, letterSpacing: nameSize > 60 ? -2 : -0.5, lineHeight: 1.2}}>
      {letters.map((letter, i) => {
        const enter = spring({frame: frame - 10 - i * Math.min(1.3, 15 / letters.length), fps,
          config: {damping: 19, stiffness: 170, mass: 0.6}});
        return <span key={i} style={{display: "inline-block", whiteSpace: "pre", opacity: Math.min(1, enter),
          translate: `0 ${(1 - enter) * 24}px`, scale: 0.96 + enter * 0.04}}>{letter}</span>;
      })}
    </Interactive.Div>
    <div style={{position: "absolute", top: 646, left: "50%", width: 420, height: 2, marginLeft: -210,
      scale: `${interpolate(frame, [20, 42], [0, 1], {...clamp, easing: ease})} 1`,
      background: "linear-gradient(90deg, transparent, #6EE7B7 30%, #FCD34D 70%, transparent)"}} />
    <Interactive.Div name="Tagline — căn giữa" style={{position: "absolute", top: 676, left: 280, right: 280,
      textAlign: "center", fontSize: tagline.length > 75 ? 27 : 34, lineHeight: 1.45, color: "#A5C3B7",
      fontWeight: 400, opacity: interpolate(frame, [25, 43], [0, 1], clamp),
      translate: interpolate(frame, [25, 45], ["0px 12px", "0px 0px"], {...clamp, easing: ease})}}>
      {tagline}
    </Interactive.Div>
    <Interactive.Div name="Lời cảm ơn — căn giữa" style={{position: "absolute", top: 797, left: 360, right: 360,
      textAlign: "center", fontSize: 18, fontWeight: 500, letterSpacing: 3.5, color: "#7BA494",
      opacity: interpolate(frame, [43, 59], [0, 1], clamp)}}>
      CẢM ƠN BẠN ĐÃ ĐỒNG HÀNH
    </Interactive.Div>
  </>;
};

const CornerCharacters: React.FC = () => {
  const frame = useCurrentFrame();
  return <>
    <div style={{position: "absolute", bottom: 20, left: 40, width: 180, height: 180,
      opacity: interpolate(frame, [0, 12], [0, 1], clamp),
      translate: interpolate(frame, [0, 20], ["-45px 14px", "0px 0px"], {...clamp, easing: ease})}}>
      <CharacterFrameAnimation directory="characters/animations/lam-lam-cui-cam-on-v1" animation={lamBow} characterName="Lam Lam" />
    </div>
    <div style={{position: "absolute", bottom: 20, right: 40, width: 180, height: 180,
      opacity: interpolate(frame, [0, 12], [0, 1], clamp),
      translate: interpolate(frame, [0, 20], ["45px 14px", "0px 0px"], {...clamp, easing: ease})}}>
      <CharacterFrameAnimation directory="characters/animations/tra-xanh-cui-cam-on-v2" animation={traBow} />
    </div>
  </>;
};

const AnimatedBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{overflow: "hidden", background: "linear-gradient(115deg, #082B3B, #071F23 47%, #12392A)"}}>
    {[{left: -270, top: 70, color: "rgba(34,211,238,0.24)"}, {left: 1220, top: 290, color: "rgba(110,231,183,0.25)"},
      {left: 500, top: -380, color: "rgba(250,204,21,0.1)"}].map((orb, i) => <div key={i} style={{position: "absolute",
      left: orb.left, top: orb.top, width: 980, height: 800, borderRadius: "50%", filter: "blur(50px)",
      background: `radial-gradient(ellipse, ${orb.color}, transparent 68%)`,
      translate: `${Math.sin(frame / 43 + i * 2) * 95}px ${Math.cos(frame / 57 + i) * 65}px`,
      scale: 1 + Math.sin(frame / 60 + i) * 0.12}} />)}
    <svg viewBox="0 0 1920 1080" style={{position: "absolute", inset: 0, width: "100%", height: "100%"}}>
      <defs>
        <linearGradient id="outro-ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#67E8F9" stopOpacity="0.6" /><stop offset="0.48" stopColor="#6EE7B7" stopOpacity="0.02" />
          <stop offset="1" stopColor="#A3E635" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => {
        const drift = Math.sin(frame / 38 + i * 0.7) * 65;
        return <path key={i} d={`M-160 ${190 + i * 155 + drift} C340 ${-100 + i * 150 - drift}, 430 ${1000 + i * 48 + drift}, 1010 ${850 + i * 90} S1550 ${120 + i * 100 - drift}, 2080 ${390 + i * 165 + drift}`}
          fill="none" stroke="url(#outro-ribbon)" strokeWidth={i === 0 ? 2.5 : 1.2} opacity={0.3 - i * 0.035} />;
      })}
      {[0, 1].map(i => <ellipse key={i} cx="960" cy="480" rx={530 + i * 120} ry={280 + i * 65}
        fill="none" stroke={i ? "#6EE7B7" : "#67E8F9"} strokeOpacity="0.09" strokeWidth="1"
        style={{rotate: `${(i ? -1 : 1) * (12 + frame * 0.055)}deg`, transformOrigin: "960px 480px"}} />)}
    </svg>
    <Atmosphere kind="petals" density={0.45} opacity={0.4} speed={1.3} wind={28} size={0.7}
      colors={["#E9F5D3", "#A7F3D0", "#FDE68A"]} seed="outro-avatar-petals" safeBottom={200} zIndex={1} />
    <Atmosphere kind="fireflies" density={0.65} opacity={0.5} speed={1.6} size={0.85}
      colors={["#67E8F9", "#6EE7B7", "#FDE68A"]} seed="outro-avatar-fireflies" safeBottom={200} zIndex={2} />
    <div style={{position: "absolute", inset: 0, zIndex: 3,
      background: "radial-gradient(ellipse 540px 490px at 50% 48%, rgba(5,24,24,0.68), transparent 95%)"}} />
  </AbsoluteFill>;
};

/** Five-second channel signature; original avatar, bow-only mascots, animated backdrop. */
export const LongVideoOutro: React.FC<OutroProps> = (props) => <AbsoluteFill style={{overflow: "hidden", fontFamily}}>
  <AnimatedBackdrop />
  <AbsoluteFill style={{zIndex: 10}}><CenteredBrand {...props} /><CornerCharacters /></AbsoluteFill>
</AbsoluteFill>;
