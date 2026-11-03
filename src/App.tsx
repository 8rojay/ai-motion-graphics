
import React, { useEffect, useState } from "react";

const scenes = [
  { duration: 5, type: "intro" },
  { duration: 8, type: "orange" },
  { duration: 8, type: "dark" },
  { duration: 12, type: "desk" },
  { duration: 14, type: "character" },
  { duration: 18, type: "stage" },
  { duration: 15, type: "grid" },
  { duration: 18, type: "fix" },
  { duration: 12, type: "ending" },
];

const totalDuration = scenes.reduce(
  (sum, scene) => sum + scene.duration,
  0
);

const captions: Record<string, string[]> = {
  intro: ["EVERYTHING", "STARTS WITH AN IDEA"],
  orange: ["TAPI ADA", "SATU HAL", "YANG SERING DILUPAKAN"],
  dark: ["BUKAN CUMA", "SOAL PROMPT"],
  desk: ["PROSESNYA", "JAUH LEBIH BESAR"],
  character: ["IDEA", "DESIGN", "ANIMATION"],
  stage: ["BUILD", "CREATE", "REFINE"],
  grid: ["SETIAP DETAIL", "PUNYA PERAN"],
  fix: ["REVISI", "OPTIMASI", "PERFECT"],
  ending: ["LET'S CREATE", "SOMETHING DIFFERENT"],
};

function PixelCharacter({ pose = "idle" }: { pose?: string }) {
  return (
    <div className={`pixel-character pose-${pose}`}>
      <svg viewBox="0 0 100 140" shapeRendering="crispEdges">
        {/* Hair */}
        <rect x="25" y="5" width="48" height="12" fill="#30272b" />
        <rect x="17" y="17" width="64" height="13" fill="#30272b" />
        <rect x="13" y="30" width="15" height="20" fill="#30272b" />
        <rect x="70" y="28" width="14" height="17" fill="#30272b" />

        {/* Face */}
        <rect x="25" y="25" width="50" height="45" fill="#f2bd91" />
        <rect x="20" y="35" width="8" height="25" fill="#f2bd91" />
        <rect x="72" y="35" width="8" height="25" fill="#f2bd91" />

        {/* Hair fringe */}
        <rect x="25" y="22" width="48" height="10" fill="#30272b" />
        <rect x="38" y="30" width="15" height="8" fill="#30272b" />

        {/* Eyes */}
        <rect x="34" y="43" width="7" height="8" fill="#25232a" />
        <rect x="60" y="43" width="7" height="8" fill="#25232a" />

        {/* Mouth */}
        <rect x="45" y="59" width="12" height="3" fill="#9d5151" />

        {/* Neck */}
        <rect x="43" y="70" width="15" height="9" fill="#e5a879" />

        {/* Body */}
        <rect x="27" y="78" width="48" height="36" fill="#34313d" />
        <rect x="39" y="78" width="20" height="32" fill="#48414d" />

        {/* Arms */}
        <rect x="12" y="82" width="15" height="27" fill="#34313d" />
        <rect x="75" y="82" width="14" height="27" fill="#34313d" />

        {/* Hands */}
        <rect x="10" y="106" width="17" height="9" fill="#f2bd91" />
        <rect x="76" y="106" width="16" height="9" fill="#f2bd91" />

        {/* Legs */}
        <rect x="30" y="114" width="17" height="19" fill="#24232c" />
        <rect x="56" y="114" width="17" height="19" fill="#24232c" />

        {/* Shoes */}
        <rect x="25" y="132" width="25" height="7" fill="#16151a" />
        <rect x="55" y="132" width="25" height="7" fill="#16151a" />
      </svg>
    </div>
  );
}

function FloatingCube() {
  return (
    <div className="cube-wrap">
      <div className="cube">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Scene({ type }: { type: string }) {
  const words = captions[type] || [];

  return (
    <div className={`scene scene-${type}`} key={type}>
      <div className="ambient-light" />

      {type === "intro" && (
        <>
          <div className="sky" />
          <div className="grass" />
          <div className="monitor">
            <div className="monitor-screen">
              <div className="screen-content">
                <span>CREATIVE STUDIO</span>
                <div className="screen-lines" />
                <div className="screen-card" />
              </div>
            </div>
            <div className="monitor-stand" />
          </div>
          <h1 className="intro-title">CREATIVE<br />PROCESS</h1>
        </>
      )}

      {type === "orange" && (
        <>
          <div className="orange-glow" />
          <PixelCharacter pose="talk" />
          <div className="text-stack">
            {words.map((word, i) => (
              <div key={i} className={`word word-${i}`}>
                {word}
              </div>
            ))}
          </div>
        </>
      )}

      {type === "dark" && (
        <>
          <div className="dark-desk" />
          <div className="red-glow" />
          <div className="center-text">
            <span>THE DIFFERENCE</span>
            <h1>IS IN THE PROCESS.</h1>
          </div>
        </>
      )}

      {type === "desk" && (
        <>
          <div className="bookshelf">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="book" />
            ))}
          </div>
          <div className="desk">
            <div className="desk-monitor">
              <div className="code-lines">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} />
                ))}
              </div>
            </div>
            <div className="lamp" />
            <div className="keyboard" />
          </div>
          <PixelCharacter />
        </>
      )}

      {type === "character" && (
        <>
          <div className="bookshelf" />
          <div className="character-focus">
            <PixelCharacter pose="talk" />
          </div>
          <div className="character-text">
            {words.map((word, i) => (
              <div key={i} style={{ animationDelay: `${i * 0.3}s` }}>
                {word}
              </div>
            ))}
          </div>
        </>
      )}

      {type === "stage" && (
        <>
          <div className="red-platform" />
          <PixelCharacter pose="point" />
          <FloatingCube />
          <div className="stage-card">
            <span>CREATIVE WORKFLOW</span>
            <h1>FROM IDEA<br />TO EXECUTION</h1>
          </div>
        </>
      )}

      {type === "grid" && (
        <>
          <div className="grid-floor" />
          <div className="grid-content">
            <PixelCharacter />
            <FloatingCube />
          </div>
          <div className="grid-label">BUILD / TEST / REFINE</div>
        </>
      )}

      {type === "fix" && (
        <>
          <div className="bookshelf" />
          <div className="red-platform" />
          <PixelCharacter pose="point" />
          <div className="fix-card">
            <span>QUALITY CONTROL</span>
            <h1>EVERY<br />DETAIL<br /><b>MATTERS.</b></h1>
          </div>
        </>
      )}

      {type === "ending" && (
        <>
          <div className="bookshelf" />
          <PixelCharacter pose="talk" />
          <div className="ending-text">
            <span>THE CREATIVE JOURNEY</span>
            <h1>STARTS<br />HERE.</h1>
            <div className="ending-button">LET'S BUILD SOMETHING</div>
          </div>
        </>
      )}

      <div className="scene-grain" />
    </div>
  );
}

export default function App() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);

  const currentScene = (() => {
    let elapsed = 0;

    for (let i = 0; i < scenes.length; i++) {
      if (time < elapsed + scenes[i].duration) {
        return { ...scenes[i], index: i, elapsed };
      }
      elapsed += scenes[i].duration;
    }

    return { ...scenes[scenes.length - 1], index: scenes.length - 1, elapsed };
  })();

  useEffect(() => {
    if (!playing) return;

    let frame = 0;
    let last = 0;

    const animate = (timestamp: number) => {
      if (!last) last = timestamp;
      const delta = Math.min((timestamp - last) / 1000, 0.05);
      last = timestamp;

      setTime((previous) => {
        if (previous >= totalDuration) {
          return 0;
        }
        return previous + delta;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const seek = (value: number) => {
    setTime(value);
  };

  const progress = (time / totalDuration) * 100;

  return (
    <main className="app">
      <style>{styles}</style>

      <div className="preview">
        <Scene type={currentScene.type} />
        <div className="top-label">CREATIVE STUDIO / VISUAL EXPERIMENT</div>
        <div className="scene-number">
          SCENE {String(currentScene.index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="controls">
        <div className="control-top">
          <span>PREVIEW TIMELINE</span>
          <span>
            {time.toFixed(1)}s / {totalDuration}s
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={totalDuration}
          step={0.1}
          value={Math.min(time, totalDuration)}
          onChange={(e) => seek(Number(e.target.value))}
        />

        <div className="control-bottom">
          <button onClick={() => setPlaying(!playing)}>
            {playing ? "PAUSE" : "PLAY"}
          </button>
          <button onClick={() => seek(0)}>RESTART</button>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </main>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #090909;
  font-family: Arial, sans-serif;
  color: white;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  gap: 20px;
}

.preview {
  width: min(100%, 1100px);
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  background: #160d12;
  border: 1px solid #333;
  box-shadow: 0 20px 80px #000;
}

.scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  animation: scene-in 0.7s ease both;
  background:
    radial-gradient(ellipse at 50% 50%, #38201e, #100b10 80%);
}

@keyframes scene-in {
  from { opacity: 0; transform: scale(1.04); }
  to { opacity: 1; transform: scale(1); }
}

.ambient-light {
  position: absolute;
  width: 50%;
  height: 60%;
  left: 25%;
  top: 10%;
  background: #ff6530;
  filter: blur(100px);
  opacity: 0.12;
}

.scene-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
}

.top-label, .scene-number {
  position: absolute;
  z-index: 10;
  top: 18px;
  font-size: 9px;
  letter-spacing: 3px;
  color: #aaa;
}

.top-label { left: 20px; }
.scene-number { right: 20px; }

.pixel-character {
  position: absolute;
  z-index: 4;
  bottom: 8%;
  left: 20%;
  width: 120px;
  image-rendering: pixelated;
  animation: character-float 2s ease-in-out infinite;
}

.pixel-character svg {
  width: 100%;
  overflow: visible;
}

@keyframes character-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.pose-talk {
  animation: character-talk 0.5s ease-in-out infinite alternate;
}

@keyframes character-talk {
  from { transform: translateY(0) rotate(-1deg); }
  to { transform: translateY(-4px) rotate(1deg); }
}

.scene-intro {
  background: linear-gradient(#72b9ee 0%, #d9eaff 45%, #527b37 46%, #152b17 100%);
}

.sky {
  position: absolute;
  inset: 0 0 45%;
  background: linear-gradient(#65b9f0, #d7eaff);
}

.grass {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 45%;
  background: repeating-linear-gradient(90deg, #3c702b 0 20px, #527d32 20px 40px);
}

.monitor {
  position: absolute;
  width: 38%;
  height: 48%;
  top: 20%;
  left: 32%;
  perspective: 500px;
  animation: monitor-in 2s ease both;
}

.monitor-screen {
  height: 85%;
  background: #101319;
  border: 8px solid #272a30;
  border-radius: 5px;
  box-shadow: 0 10px 30px #1118;
}

.monitor-stand {
  margin: auto;
  width: 15%;
  height: 15%;
  background: #444;
}

.screen-content {
  padding: 15px;
  font-size: 10px;
  color: white;
}

.screen-lines {
  margin-top: 15px;
  height: 35px;
  background: repeating-linear-gradient(#777 0 2px, transparent 2px 8px);
}

.screen-card {
  margin-top: 10px;
  width: 60%;
  height: 30px;
  background: #b92c25;
}

@keyframes monitor-in {
  from { transform: scale(.7) translateY(40px); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.intro-title {
  position: absolute;
  right: 7%;
  bottom: 10%;
  font-size: clamp(24px, 5vw, 65px);
  line-height: .9;
  text-align: right;
  text-shadow: 0 4px 20px #000;
}

.scene-orange {
  background: radial-gradient(circle at 50% 50%, #ff9b34, #d64c0d 80%);
}

.orange-glow {
  position: absolute;
  width: 400px;
  height: 400px;
  background: #ffd08b;
  filter: blur(150px);
  opacity: .3;
  left: 25%;
}

.text-stack {
  position: absolute;
  top: 25%;
  left: 50%;
  font-size: clamp(24px, 5vw, 62px);
  font-weight: 900;
  line-height: .95;
}

.word {
  animation: word-in .6s cubic-bezier(.2,.8,.2,1) both;
}

.word-1 { color: #fff; }
.word-2 { color: #ffddd0; }

@keyframes word-in {
  from { opacity: 0; transform: translateX(80px) scale(.8); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

.scene-dark {
  background: radial-gradient(ellipse at center, #241719, #030304 70%);
}

.dark-desk {
  position: absolute;
  bottom: 20%;
  left: 20%;
  width: 60%;
  height: 18%;
  background: linear-gradient(#292020, #070707);
  transform: perspective(400px) rotateX(20deg);
}

.red-glow {
  position: absolute;
  bottom: 20%;
  left: 30%;
  width: 40%;
  height: 20px;
  background: #ff2929;
  filter: blur(35px);
}

.center-text {
  position: absolute;
  top: 35%;
  width: 100%;
  text-align: center;
}

.center-text span {
  color: #aaa;
  letter-spacing: 5px;
  font-size: 12px;
}

.center-text h1 {
  font-size: clamp(22px, 5vw, 60px);
  color: #ff4545;
}

.scene-desk, .scene-character, .scene-fix, .scene-ending {
  background:
    radial-gradient(ellipse at 50% 60%, #48251b, transparent 65%),
    linear-gradient(90deg, #130c0b, #30201b, #100a09);
}

.bookshelf {
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 30%;
  border-top: 8px solid #603c26;
  border-bottom: 8px solid #603c26;
  background: repeating-linear-gradient(
    90deg,
    transparent 0 35px,
    #45271d 35px 43px
  );
  opacity: .8;
}

.book {
  display: inline-block;
  width: 15px;
  height: 65px;
  margin: 10px 8px;
  background: #91472e;
}

.book:nth-child(3n) { background: #a66b37; }
.book:nth-child(4n) { background: #354a4a; }

.desk {
  position: absolute;
  bottom: 10%;
  left: 20%;
  width: 60%;
  height: 18%;
  background: #653c25;
  transform: perspective(400px) rotateX(10deg);
  box-shadow: 0 30px 30px #000;
}

.desk-monitor {
  position: absolute;
  width: 45%;
  height: 180%;
  bottom: 70%;
  left: 25%;
  background: #13171c;
  border: 8px solid #39383a;
}

.code-lines {
  padding: 12px;
}

.code-lines div {
  height: 3px;
  width: 80%;
  margin: 8px 0;
  background: #55c9bd;
}

.code-lines div:nth-child(2n) {
  width: 55%;
  background: #e8a45d;
}

.lamp {
  position: absolute;
  right: 8%;
  bottom: 100%;
  width: 45px;
  height: 45px;
  background: #ffb64d;
  border-radius: 50%;
  box-shadow: 0 0 45px #ffb64d;
}

.keyboard {
  position: absolute;
  width: 30%;
  height: 10px;
  background: #171717;
  bottom: 10%;
  left: 35%;
}

.scene-character .pixel-character {
  left: 38%;
  width: 190px;
}

.character-text {
  position: absolute;
  left: 65%;
  top: 30%;
  font-size: clamp(20px, 4vw, 48px);
  font-weight: 900;
}

.character-text div {
  animation: word-in .6s ease both;
}

.scene-stage, .scene-grid {
  background: radial-gradient(ellipse at center, #48201d, #10090d);
}

.red-platform {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35%;
  background:
    repeating-linear-gradient(90deg, transparent 0 30px, #ffffff0a 30px 31px),
    repeating-linear-gradient(0deg, #9c141c 0 15px, #6e1018 15px 17px);
  transform: perspective(300px) rotateX(20deg);
  transform-origin: bottom;
  box-shadow: 0 -20px 70px #c00a;
}

.stage-card {
  position: absolute;
  top: 25%;
  right: 10%;
  font-size: 30px;
}

.stage-card span, .fix-card span {
  font-size: 10px;
  letter-spacing: 4px;
  color: #aaa;
}

.stage-card h1 {
  color: #fff;
  font-size: clamp(25px, 4vw, 48px);
}

.cube-wrap {
  position: absolute;
  right: 25%;
  bottom: 25%;
  perspective: 500px;
}

.cube {
  width: 65px;
  height: 65px;
  background: #ec713e;
  border: 4px solid #9b3b24;
  animation: cube-float 3s ease-in-out infinite;
  box-shadow: 0 0 30px #ff6d3d66;
}

@keyframes cube-float {
  0%,100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-25px) rotate(8deg); }
}

.grid-floor {
  position: absolute;
  bottom: 0;
  height: 55%;
  width: 100%;
  background:
    linear-gradient(#0a3c3c66 1px, transparent 1px),
    linear-gradient(90deg, #0a3c3c66 1px, transparent 1px);
  background-size: 45px 45px;
  transform: perspective(250px) rotateX(45deg) scale(1.5);
  transform-origin: bottom;
}

.grid-content {
  position: absolute;
  inset: 0;
}

.grid-label {
  position: absolute;
  top: 20%;
  right: 10%;
  color: #42e8d1;
  letter-spacing: 4px;
  font-size: 13px;
}

.fix-card {
  position: absolute;
  top: 25%;
  right: 12%;
}

.fix-card h1 {
  font-size: clamp(30px, 5vw, 65px);
  line-height: .9;
}

.fix-card b {
  color: #ff4141;
}

.ending-text {
  position: absolute;
  right: 10%;
  top: 25%;
}

.ending-text span {
  color: #aaa;
  letter-spacing: 3px;
  font-size: 10px;
}

.ending-text h1 {
  font-size: clamp(35px, 6vw, 75px);
  line-height: .85;
}

.ending-button {
  border: 1px solid #ff4b4b;
  padding: 12px 18px;
  font-size: 10px;
  letter-spacing: 3px;
  color: #ff6565;
}

.scene-ending .pixel-character {
  left: 15%;
  width: 150px;
}

.controls {
  width: min(100%, 1100px);
  padding: 15px 20px;
  background: #151515;
  border: 1px solid #333;
}

.control-top, .control-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  letter-spacing: 2px;
  color: #aaa;
}

.controls input {
  width: 100%;
  margin: 18px 0;
  accent-color: #ff4545;
  cursor: pointer;
}

.control-bottom button {
  border: 1px solid #555;
  background: transparent;
  color: white;
  padding: 9px 18px;
  cursor: pointer;
  font-size: 10px;
  letter-spacing: 2px;
}

.control-bottom button:hover {
  background: #ff4545;
  border-color: #ff4545;
}

@media (max-width: 600px) {
  .app { padding: 10px; }
  .pixel-character { width: 80px; }
  .scene-character .pixel-character { width: 120px; }
  .bookshelf { height: 25%; }
}
`;

