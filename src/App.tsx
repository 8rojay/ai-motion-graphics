import React from "react";
import { Player } from "@remotion/player";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

// ======================================================
// CONFIGURATION
// ======================================================

const FPS = 30;
const DURATION = 445;
const WIDTH = 1920;
const HEIGHT = 1080;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const smooth = Easing.bezier(0.22, 1, 0.36, 1);

const fade = (
  frame: number,
  start: number,
  end: number,
  from = 0,
  to = 1
) => interpolate(frame, [start, end], [from, to], clamp);

const springIn = (
  frame: number,
  fps: number,
  delay: number,
  stiffness = 100,
  damping = 15
) =>
  spring({
    frame: frame - delay,
    fps,
    config: { stiffness, damping, mass: 0.8 },
  });

// ======================================================
// BACKGROUND
// ======================================================

const DarkBackground = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 75%, #164D69 0%, #082C3B 42%, #03141D 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 700,
          left: -400,
          top: -250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,150,190,.27), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 900,
          height: 650,
          right: -350,
          bottom: -300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,130,120,.17), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 700,
          height: 500,
          left: -300,
          bottom: -350,
          background:
            "radial-gradient(circle, rgba(244,119,106,.22), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse, transparent 35%, rgba(0,0,0,.4) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const BrightBackground = () => {
  const frame = useCurrentFrame();

  const movement = Math.sin(frame * 0.018) * 70;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #087BFA 0%, #0871F4 45%, #1687EF 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 800,
          left: -250 + movement,
          top: -400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(105,190,255,.8), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 900,
          height: 700,
          right: -250 - movement,
          bottom: -350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(31,255,155,.6), transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 650,
          height: 500,
          left: -250,
          bottom: -250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,132,115,.75), transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 700,
          height: 500,
          right: 100,
          top: -350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(160,213,255,.5), transparent 70%)",
          filter: "blur(90px)",
        }}
      />
    </AbsoluteFill>
  );
};

// ======================================================
// FLOATING PARTICLES
// ======================================================

const Particles = ({ count = 25 }: { count?: number }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = (i * 173) % WIDTH;
        const y = (i * 113) % HEIGHT;

        const movement = Math.sin(frame * 0.035 + i) * 35;
        const rotation = frame * (i % 2 === 0 ? 1 : -1);

        const colors = [
          "#FDE047",
          "#FF83D4",
          "#FFFFFF",
          "#38EF78",
        ];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y + movement,
              width: i % 3 === 0 ? 15 : 9,
              height: i % 3 === 0 ? 15 : 9,
              background: colors[i % colors.length],
              transform: `rotate(${rotation}deg)`,
              opacity: 0.85,
              borderRadius: i % 3 === 0 ? 2 : 0,
              boxShadow: "0 0 12px rgba(255,255,255,.3)",
            }}
          />
        );
      })}
    </>
  );
};

// ======================================================
// SCENE 01: WAITLIST INPUT
// FRAME 0 - 140
// ======================================================

const WaitlistInput = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = springIn(frame, fps, 12, 80, 14);

  const width = interpolate(
    entrance,
    [0, 1],
    [90, 850]
  );

  const opacity = fade(frame, 5, 25);

  const inputText = "nama@email.com";

  const visibleCharacters = Math.floor(
    interpolate(frame, [32, 75], [0, inputText.length], clamp)
  );

  const buttonEntrance = springIn(frame, fps, 75, 100, 16);

  const buttonOpacity = fade(frame, 75, 95);

  const buttonScale = interpolate(
    buttonEntrance,
    [0, 1],
    [0.7, 1]
  );

  const playEntrance = springIn(frame, fps, 90);

  const playScale = interpolate(
    playEntrance,
    [0, 1],
    [0, 1]
  );

  const glow = 0.7 + Math.sin(frame * 0.13) * 0.2;

  return (
    <AbsoluteFill>
      <DarkBackground />

      {/* Camera framing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${interpolate(frame, [0, 130], [1.1, 1.22], clamp)})`,
        }}
      >
        {/* Central input container */}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "47%",
            width,
            height: 155,
            transform: "translate(-50%, -50%)",
            borderRadius: 100,
            border: "2px solid rgba(135,215,255,.8)",
            background:
              "linear-gradient(100deg, rgba(36,113,175,.3), rgba(107,203,239,.2), rgba(42,147,180,.2))",
            backdropFilter: "blur(25px)",
            boxShadow: `
              0 0 20px rgba(66,190,255,.5),
              0 0 60px rgba(43,173,255,.25),
              inset 0 0 30px rgba(164,230,255,.18)
            `,
            opacity,
            overflow: "hidden",
          }}
        >
          {/* Inner reflection */}

          <div
            style={{
              position: "absolute",
              inset: 5,
              borderRadius: 100,
              background:
                "linear-gradient(110deg, rgba(255,255,255,.06), transparent 45%, rgba(255,255,255,.12))",
            }}
          />

          {/* Email text */}

          <div
            style={{
              position: "absolute",
              left: 75,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#FFFFFF",
              fontSize: 42,
              fontWeight: 500,
              letterSpacing: -1,
              whiteSpace: "nowrap",
            }}
          >
            {inputText.slice(0, visibleCharacters)}
            {visibleCharacters < inputText.length && (
              <span
                style={{
                  opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
                }}
              >
                |
              </span>
            )}
          </div>

          {/* Button */}

          <div
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: `translateY(-50%) scale(${buttonScale})`,
              opacity: buttonOpacity,
              padding: "22px 38px",
              borderRadius: 70,
              background:
                "linear-gradient(135deg, #C8F7FF, #8CE3F9)",
              color: "#155779",
              fontSize: 25,
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: "0 0 30px rgba(157,237,255,.6)",
            }}
          >
            Gabung
          </div>
        </div>

        {/* Mouse cursor */}

        <div
          style={{
            position: "absolute",
            left: "73%",
            top: "49%",
            transform: `translateY(${Math.sin(frame * 0.1) * 5}px) scale(${playScale})`,
            opacity: fade(frame, 70, 95) * fade(frame, 110, 125, 1, 0),
            fontSize: 75,
            color: "#FFFFFF",
            filter: "drop-shadow(0 0 12px #7CEAFF)",
          }}
        >
          ➤
        </div>
      </div>

      {/* Transition glow */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(90,215,255,.9), transparent 60%)",
          opacity: fade(frame, 112, 140, 0, 1),
        }}
      />
    </AbsoluteFill>
  );
};

// ======================================================
// MASCOT
// ======================================================

const Mascot = ({
  size = 230,
}: {
  size?: number;
}) => {
  const frame = useCurrentFrame();

  const floating = Math.sin(frame * 0.07) * 15;
  const rotation = Math.sin(frame * 0.035) * 7;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "linear-gradient(145deg, #91C9FF, #378CF5 65%, #2467DC)",
        boxShadow:
          "inset -12px -15px 25px rgba(20,67,180,.35), inset 8px 8px 20px rgba(255,255,255,.4), 0 20px 60px rgba(0,40,150,.25)",
        transform: `translateY(${floating}px) rotate(${rotation}deg)`,
      }}
    >
      {/* Shine */}

      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "16%",
          width: "22%",
          height: "11%",
          background: "rgba(255,255,255,.65)",
          borderRadius: 100,
          filter: "blur(3px)",
          transform: "rotate(-35deg)",
        }}
      />

      {/* Eyes */}

      <div
        style={{
          position: "absolute",
          left: "26%",
          top: "38%",
          width: "12%",
          height: "20%",
          borderRadius: "50%",
          background: "#173E9C",
          transform: "rotate(15deg)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "26%",
          top: "38%",
          width: "12%",
          height: "20%",
          borderRadius: "50%",
          background: "#173E9C",
          transform: "rotate(-15deg)",
        }}
      />

      {/* Mouth */}

      <svg
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          width: "28%",
          height: "25%",
          left: "36%",
          top: "52%",
        }}
      >
        <path
          d="M 10 15 Q 50 65 90 15"
          stroke="#173E9C"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Cheeks */}

      <div
        style={{
          position: "absolute",
          left: "10%",
          top: "57%",
          width: "15%",
          height: "9%",
          borderRadius: "50%",
          background: "rgba(255,150,180,.65)",
          filter: "blur(8px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "57%",
          width: "15%",
          height: "9%",
          borderRadius: "50%",
          background: "rgba(255,150,180,.65)",
          filter: "blur(8px)",
        }}
      />

      {/* Hands */}

      <div
        style={{
          position: "absolute",
          left: "-16%",
          top: "38%",
          width: "24%",
          height: "13%",
          background: "#FFFFFF",
          borderRadius: 100,
          transform: "rotate(-35deg)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "-16%",
          top: "38%",
          width: "24%",
          height: "13%",
          background: "#FFFFFF",
          borderRadius: 100,
          transform: "rotate(35deg)",
        }}
      />
    </div>
  );
};

// ======================================================
// SCENE 02: WAITLIST REVEAL
// FRAME 130 - 220
// ======================================================

const WaitlistReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - 130;

  const cameraScale = interpolate(
    local,
    [0, 50, 90],
    [1.3, 1, 1.12],
    clamp
  );

  const cameraX = interpolate(
    local,
    [0, 60, 90],
    [0, -45, 0],
    clamp
  );

  const mascotEntrance = springIn(local, fps, 5, 80, 12);

  const mascotX = interpolate(
    mascotEntrance,
    [0, 1],
    [-300, 0]
  );

  const titleEntrance = springIn(local, fps, 22, 110, 17);

  const titleY = interpolate(
    titleEntrance,
    [0, 1],
    [100, 0]
  );

  const titleOpacity = fade(local, 15, 35);

  return (
    <AbsoluteFill>
      <BrightBackground />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${cameraX}px) scale(${cameraScale})`,
        }}
      >
        <Particles count={28} />

        {/* Mascot */}

        <div
          style={{
            position: "absolute",
            left: 150 + mascotX,
            bottom: -35,
            transform: `scale(${interpolate(mascotEntrance, [0, 1], [0.3, 1])})`,
            transformOrigin: "bottom center",
          }}
        >
          <Mascot size={370} />
        </div>

        {/* Floating green shape */}

        <div
          style={{
            position: "absolute",
            right: 220,
            top: 360,
            width: 90,
            height: 90,
            background: "#35DB50",
            transform: `rotate(${local * 1.4}deg)`,
            clipPath:
              "polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)",
            boxShadow: "0 0 30px rgba(0,255,100,.4)",
          }}
        />

        {/* Small mascot floating */}

        <div
          style={{
            position: "absolute",
            right: 320,
            top: 180,
            transform: `scale(.28) rotate(${Math.sin(local * .06) * 15}deg)`,
            transformOrigin: "center",
          }}
        >
          <Mascot size={180} />
        </div>

        {/* Main text */}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            transform: `translate(-50%, -50%) translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: "center",
            width: 750,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            Bergabunglah dalam
          </div>

          <div
            style={{
              fontSize: 104,
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#FFF1A8",
              textShadow: "0 5px 35px rgba(255,255,255,.25)",
            }}
          >
            Daftar Tunggu
          </div>

          <div
            style={{
              fontSize: 49,
              fontWeight: 600,
              color: "#FFFFFF",
              marginTop: 12,
            }}
          >
            Sekarang
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ======================================================
// PHONE MOCKUP
// ======================================================

const Phone = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - 220;

  const entrance = springIn(local, fps, 0, 75, 13);

  const rotation = interpolate(
    entrance,
    [0, 1],
    [12, -8]
  );

  const phoneX = interpolate(
    entrance,
    [0, 1],
    [650, 0]
  );

  const phoneY = interpolate(
    entrance,
    [0, 1],
    [450, 0]
  );

  const growth = fade(local, 35, 90);

  return (
    <div
      style={{
        position: "absolute",
        left: "55%",
        top: "50%",
        width: 440,
        height: 850,
        transform: `
          translate(-50%, -50%)
          translate(${phoneX}px, ${phoneY}px)
          rotate(${rotation}deg)
          scale(${interpolate(entrance, [0, 1], [.65, 1])})
        `,
        borderRadius: 65,
        background: "linear-gradient(135deg, #FFFFFF, #AEB8C8)",
        border: "5px solid #20252D",
        boxShadow: "0 40px 100px rgba(0,0,0,.4)",
        padding: 12,
        boxSizing: "border-box",
      }}
    >
      {/* Screen */}

      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 48,
          background: "#FAFAFA",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Notch */}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 145,
            height: 35,
            borderRadius: "0 0 25px 25px",
            background: "#151A21",
            zIndex: 2,
          }}
        />

        {/* App header */}

        <div
          style={{
            marginTop: 100,
            fontSize: 25,
            fontWeight: 800,
            color: "#222",
          }}
        >
          Pertumbuhan Harian
        </div>

        {/* Plant illustration */}

        <div
          style={{
            position: "relative",
            marginTop: 80,
            width: 300,
            height: 310,
          }}
        >
          {/* Sun */}

          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: 65,
              height: 65,
              borderRadius: "50%",
              transform: "translateX(-50%)",
              background: "#FFE88B",
              boxShadow: "0 0 35px #FFE88B",
              opacity: growth,
            }}
          />

          {/* Stem */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 85,
              width: 9,
              height: growth * 155,
              transform: "translateX(-50%)",
              background: "#4AAE55",
              borderRadius: 20,
            }}
          />

          {/* Leaves */}

          <div
            style={{
              position: "absolute",
              left: "27%",
              top: 95,
              width: 105,
              height: 60,
              background: "#4EBE60",
              borderRadius: "100% 0 100% 0",
              transform: `rotate(-20deg) scale(${growth})`,
              opacity: growth,
            }}
          />

          <div
            style={{
              position: "absolute",
              right: "27%",
              top: 60,
              width: 105,
              height: 60,
              background: "#79D66B",
              borderRadius: "0 100% 0 100%",
              transform: `rotate(20deg) scale(${growth})`,
              opacity: growth,
            }}
          />

          {/* Soil */}

          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 10,
              width: 280,
              height: 75,
              borderRadius: "50%",
              background:
                "linear-gradient(#9B5632, #67361F)",
              boxShadow: "0 8px 15px rgba(0,0,0,.15)",
            }}
          />

          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: 55 + (i % 3) * 12,
                left: 25 + i * 21,
                width: 24,
                height: 17,
                borderRadius: "50%",
                background: i % 2 ? "#A55B32" : "#794022",
              }}
            />
          ))}
        </div>

        {/* App text */}

        <div
          style={{
            marginTop: 20,
            fontSize: 31,
            fontWeight: 800,
            color: "#222",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Raih Hadiah,
          <br />
          Setiap Hari
        </div>

        <div
          style={{
            fontSize: 19,
            color: "#777",
            textAlign: "center",
            marginTop: 18,
            lineHeight: 1.5,
          }}
        >
          Pantau perkembanganmu
          <br />
          dan kumpulkan hadiah.
        </div>

        {/* Button */}

        <div
          style={{
            position: "absolute",
            bottom: 65,
            width: "75%",
            height: 65,
            background: "#15191F",
            borderRadius: 50,
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          Mulai Sekarang
        </div>
      </div>
    </div>
  );
};

// ======================================================
// SCENE 03: PRODUCT SHOWCASE
// FRAME 220 - 325
// ======================================================

const ProductShowcase = () => {
  const frame = useCurrentFrame();

  const local = frame - 220;

  const textOpacity = fade(local, 25, 50);

  const textY = interpolate(
    local,
    [25, 60],
    [70, 0],
    clamp
  );

  const cameraScale = interpolate(
    local,
    [0, 70, 105],
    [1.2, 1, 1.08],
    clamp
  );

  const cameraX = interpolate(
    local,
    [0, 70, 105],
    [100, -30, -80],
    clamp
  );

  return (
    <AbsoluteFill>
      <BrightBackground />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${cameraX}px) scale(${cameraScale})`,
        }}
      >
        <Particles count={22} />

        {/* Left copy */}

        <div
          style={{
            position: "absolute",
            left: 170,
            top: "43%",
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
            width: 650,
            color: "#FFFFFF",
          }}
        >
          <div
            style={{
              fontSize: 65,
              fontWeight: 500,
              lineHeight: 1.25,
            }}
          >
            Mulai Tumbuh
            <br />
            <span
              style={{
                fontWeight: 900,
                color: "#FFF19A",
              }}
            >
              Bersama Kami
            </span>
          </div>

          <div
            style={{
              fontSize: 38,
              fontWeight: 500,
              marginTop: 25,
              lineHeight: 1.4,
              opacity: 0.95,
            }}
          >
            Tanam langkah kecil.
            <br />
            Raih hasil yang lebih besar.
          </div>
        </div>

        {/* Phone */}

        <Phone />
      </div>
    </AbsoluteFill>
  );
};

// ======================================================
// FINAL BRAND ICON
// ======================================================

const BrandIcon = () => {
  const frame = useCurrentFrame();

  const smile = Math.sin(frame * 0.08) * 3;

  return (
    <div
      style={{
        width: 135,
        height: 110,
        borderRadius: "48% 48% 43% 43%",
        background: "#FFFFFF",
        position: "relative",
        boxShadow: "0 10px 45px rgba(0,0,0,.12)",
        transform: `rotate(${smile}deg)`,
      }}
    >
      {/* Left eye */}

      <div
        style={{
          position: "absolute",
          left: 32,
          top: 30,
          width: 17,
          height: 25,
          borderRadius: "50%",
          background: "#1684ED",
        }}
      />

      {/* Right eye */}

      <div
        style={{
          position: "absolute",
          right: 32,
          top: 30,
          width: 17,
          height: 25,
          borderRadius: "50%",
          background: "#1684ED",
        }}
      />

      {/* Smile */}

      <div
        style={{
          position: "absolute",
          left: 43,
          bottom: 19,
          width: 49,
          height: 20,
          borderRadius: "0 0 30px 30px",
          background: "#1684ED",
        }}
      />
    </div>
  );
};

// ======================================================
// SCENE 04: BRAND REVEAL
// FRAME 325 - 445
// ======================================================

const BrandReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - 325;

  const iconEntrance = springIn(local, fps, 5, 80, 12);

  const iconScale = interpolate(
    iconEntrance,
    [0, 1],
    [0.1, 1]
  );

  const logoEntrance = springIn(local, fps, 60, 100, 17);

  const logoOpacity = fade(local, 55, 85);

  const logoY = interpolate(
    logoEntrance,
    [0, 1],
    [45, 0]
  );

  const finalFade = fade(local, 100, 120, 1, 0);

  return (
    <AbsoluteFill>
      <BrightBackground />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${interpolate(local, [0, 115], [1.2, 1], clamp)})`,
          opacity: finalFade,
        }}
      >
        <Particles count={16} />

        {/* Center logo */}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "47%",
            transform: `translate(-50%, -50%) scale(${iconScale})`,
          }}
        >
          <BrandIcon />
        </div>

        {/* Wordmark */}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "66%",
            transform: `translate(-50%, -50%) translateY(${logoY}px)`,
            opacity: logoOpacity,
            display: "flex",
            alignItems: "center",
            gap: 22,
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: -3,
            }}
          >
            sanctum
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ======================================================
// MASTER COMPOSITION
// ======================================================

const MainComposition = () => {
  const frame = useCurrentFrame();

  const scene1 = fade(frame, 0, 10) * fade(frame, 125, 145, 1, 0);
  const scene2 = fade(frame, 128, 150) * fade(frame, 210, 235, 1, 0);
  const scene3 = fade(frame, 215, 240) * fade(frame, 315, 340, 1, 0);
  const scene4 = fade(frame, 315, 345);

  return (
    <AbsoluteFill
      style={{
        background: "#03141D",
        overflow: "hidden",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Scene 01 */}

      <AbsoluteFill style={{ opacity: scene1 }}>
        <WaitlistInput />
      </AbsoluteFill>

      {/* Scene 02 */}

      <AbsoluteFill style={{ opacity: scene2 }}>
        <WaitlistReveal />
      </AbsoluteFill>

      {/* Scene 03 */}

      <AbsoluteFill style={{ opacity: scene3 }}>
        <ProductShowcase />
      </AbsoluteFill>

      {/* Scene 04 */}

      <AbsoluteFill style={{ opacity: scene4 }}>
        <BrandReveal />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ======================================================
// PLAYER
// ======================================================

const App: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#020D15",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: 12,
          boxShadow: "0 25px 100px rgba(0,0,0,.6)",
        }}
      >
        <Player
          component={MainComposition}
          durationInFrames={DURATION}
          compositionWidth={WIDTH}
          compositionHeight={HEIGHT}
          fps={FPS}
          controls
          autoPlay
          loop
          clickToPlay
          doubleClickToFullscreen
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default App;