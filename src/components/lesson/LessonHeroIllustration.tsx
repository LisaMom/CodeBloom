import React from 'react';

export const LessonHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[5/4] flex items-center justify-center select-none">
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="laptopScreenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          <linearGradient id="laptopBodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="keyboardGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="cardGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="cardGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Glow */}
        <circle cx="360" cy="180" r="140" fill="#38bdf8" opacity="0.15" filter="url(#glowEffect)" />

        {/* Isometric Laptop Screen Body */}
        {/* Screen back outer */}
        <polygon
          points="250,90 390,15 440,110 300,185"
          fill="#0f172a"
          stroke="#475569"
          strokeWidth="3"
        />

        {/* Screen inner display */}
        <polygon
          points="260,95 385,27 430,112 305,180"
          fill="url(#laptopScreenGrad)"
        />

        {/* Code on screen: < / > brackets */}
        <g transform="translate(340, 105) skewY(-27) rotate(10)" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
          {/* Left chevron */}
          <path d="M-40 -15 L-65 0 L-40 15" />
          {/* Slash */}
          <line x1="-12" y1="20" x2="12" y2="-20" strokeWidth="10" />
          {/* Right chevron */}
          <path d="M40 -15 L65 0 L40 15" />
        </g>

        {/* Screen reflection highlight */}
        <polygon
          points="260,95 330,55 365,145 305,180"
          fill="#ffffff"
          opacity="0.12"
        />

        {/* Laptop Hinge & Base */}
        {/* Base top surface (keyboard area) */}
        <polygon
          points="300,185 440,110 320,60 180,135"
          fill="#1e293b"
          opacity="0.9"
        />
        {/* Keyboard perspective plate */}
        <polygon
          points="295,188 150,265 290,340 435,263"
          fill="url(#laptopBodyGrad)"
          stroke="#334155"
          strokeWidth="3"
        />

        {/* Laptop Base Thickness / Front lip */}
        <polygon
          points="150,265 290,340 290,356 150,281"
          fill="#090d16"
        />
        <polygon
          points="290,340 435,263 435,279 290,356"
          fill="#0f172a"
        />

        {/* Keyboard keys grid (isometric projection) */}
        <g fill="#334155" opacity="0.8">
          {/* Key row 1 */}
          <polygon points="190,250 215,237 235,248 210,261" />
          <polygon points="220,234 245,221 265,232 240,245" />
          <polygon points="250,218 275,205 295,216 270,229" />
          <polygon points="280,202 305,189 325,200 300,213" />
          <polygon points="310,186 335,173 355,184 330,197" />
          <polygon points="340,170 365,157 385,168 360,181" />

          {/* Key row 2 */}
          <polygon points="205,268 230,255 250,266 225,279" />
          <polygon points="235,252 260,239 280,250 255,263" />
          <polygon points="265,236 290,223 310,234 285,247" />
          <polygon points="295,220 320,207 340,218 315,231" />
          <polygon points="325,204 350,191 370,202 345,215" />

          {/* Key row 3 */}
          <polygon points="220,286 245,273 265,284 240,297" />
          <polygon points="250,270 275,257 295,268 270,281" />
          <polygon points="280,254 305,241 325,252 300,265" />
          <polygon points="310,238 335,225 355,236 330,249" />

          {/* Trackpad */}
          <polygon
            points="260,312 305,288 335,304 290,328"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1.5"
          />
        </g>

        {/* Floating Code Card 1 (Top Left) with "01" */}
        <g transform="translate(145, 90)">
          <rect
            x="0"
            y="0"
            width="65"
            height="44"
            rx="10"
            fill="url(#cardGrad1)"
            stroke="#ffffff"
            strokeWidth="1.5"
            transform="skewY(-15) rotate(5)"
            filter="drop-shadow(0 6px 12px rgba(14, 165, 233, 0.25))"
          />
          <text
            x="32"
            y="26"
            fill="#0369a1"
            fontSize="18"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
            transform="skewY(-15) rotate(5)"
          >
            01
          </text>
        </g>

        {/* Floating Window Card (Mid Left) with code lines */}
        <g transform="translate(130, 160)">
          <rect
            x="0"
            y="0"
            width="80"
            height="55"
            rx="12"
            fill="#ffffff"
            stroke="#bae6fd"
            strokeWidth="1.5"
            transform="skewY(-14) rotate(4)"
            filter="drop-shadow(0 8px 16px rgba(14, 165, 233, 0.2))"
          />
          {/* Window control dots */}
          <circle cx="14" cy="14" r="3" fill="#f43f5e" transform="skewY(-14) rotate(4)" />
          <circle cx="23" cy="14" r="3" fill="#f59e0b" transform="skewY(-14) rotate(4)" />
          <circle cx="32" cy="14" r="3" fill="#10b981" transform="skewY(-14) rotate(4)" />
          {/* Skeleton code lines */}
          <rect x="14" y="24" width="50" height="4" rx="2" fill="#38bdf8" transform="skewY(-14) rotate(4)" />
          <rect x="14" y="32" width="35" height="4" rx="2" fill="#94a3b8" transform="skewY(-14) rotate(4)" />
          <rect x="14" y="40" width="42" height="4" rx="2" fill="#cbd5e1" transform="skewY(-14) rotate(4)" />
        </g>

        {/* Floating Card (Right) with "< / >" code emblem */}
        <g transform="translate(410, 185)">
          <rect
            x="0"
            y="0"
            width="75"
            height="70"
            rx="14"
            fill="url(#cardGrad2)"
            stroke="#ffffff"
            strokeWidth="2"
            transform="skewY(-15) rotate(5)"
            filter="drop-shadow(0 8px 18px rgba(3, 105, 161, 0.35))"
          />
          {/* Small inner screen frame */}
          <rect
            x="10"
            y="10"
            width="55"
            height="50"
            rx="8"
            fill="#0f172a"
            transform="skewY(-15) rotate(5)"
          />
          {/* Code symbol */}
          <text
            x="37"
            y="42"
            fill="#38bdf8"
            fontSize="20"
            fontWeight="900"
            fontFamily="monospace"
            textAnchor="middle"
            transform="skewY(-15) rotate(5)"
          >
            &lt;/&gt;
          </text>
        </g>

        {/* Floating Tag (Top Right) */}
        <g transform="translate(390, 50)">
          <rect
            x="0"
            y="0"
            width="50"
            height="32"
            rx="8"
            fill="#e0f2fe"
            stroke="#7dd3fc"
            strokeWidth="1.2"
            transform="skewY(-18)"
          />
          <text
            x="25"
            y="20"
            fill="#0284c7"
            fontSize="12"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
            transform="skewY(-18)"
          >
            0110
          </text>
        </g>
      </svg>
    </div>
  );
};
