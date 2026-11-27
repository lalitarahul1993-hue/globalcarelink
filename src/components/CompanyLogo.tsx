import React, { useId } from 'react';

interface CompanyLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'full' | 'icon' | 'badge';
  withGlow?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = 'w-12 h-12',
  size,
  withGlow = false
}) => {
  // Unique SVG IDs per rendered instance prevent gradient/filter collisions across Header, Hero, Card, Modals & Footer
  const uid = useId().replace(/:/g, '');
  const goldGrad1 = `gcl-gold1-${uid}`;
  const goldGrad2 = `gcl-gold2-${uid}`;
  const goldGlobe = `gcl-gglobe-${uid}`;
  const blueArrow = `gcl-barrow-${uid}`;
  const blueLand = `gcl-bland-${uid}`;
  const globeShine = `gcl-shine-${uid}`;
  const globeClip = `gcl-clip-${uid}`;
  const shadowFilter = `gcl-shadow-${uid}`;

  const inlineStyle = size ? { width: size, height: size } : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white shadow-lg ring-2 ring-sky-400/50 ${className}`}
      style={inlineStyle}
      role="img"
      aria-label="Global Care Link Services LLP Official Logo"
    >
      {withGlow && (
        <div className="absolute -inset-1 rounded-full bg-sky-400/35 blur-md pointer-events-none" />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        className="relative z-10 w-full h-full p-[3%] select-none pointer-events-none"
      >
        <defs>
          <linearGradient id={goldGrad1} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff4b8" />
            <stop offset="35%" stopColor="#f2c44c" />
            <stop offset="72%" stopColor="#c9931b" />
            <stop offset="100%" stopColor="#825b0b" />
          </linearGradient>

          <linearGradient id={goldGrad2} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#fff1a6" />
            <stop offset="28%" stopColor="#f5c644" />
            <stop offset="62%" stopColor="#d1991c" />
            <stop offset="88%" stopColor="#94670e" />
            <stop offset="100%" stopColor="#634205" />
          </linearGradient>

          <radialGradient id={goldGlobe} cx="42%" cy="34%" r="65%">
            <stop offset="0%" stopColor="#fff8d4" />
            <stop offset="40%" stopColor="#f5cd63" />
            <stop offset="75%" stopColor="#cf9621" />
            <stop offset="100%" stopColor="#855b0b" />
          </radialGradient>

          <linearGradient id={blueArrow} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#0284c7" />
            <stop offset="78%" stopColor="#0b4a8f" />
            <stop offset="100%" stopColor="#062754" />
          </linearGradient>

          <linearGradient id={blueLand} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f5ea8" />
            <stop offset="55%" stopColor="#083d78" />
            <stop offset="100%" stopColor="#04244d" />
          </linearGradient>

          <radialGradient id={globeShine} cx="36%" cy="28%" r="58%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="75%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
          </radialGradient>

          <clipPath id={globeClip}>
            <circle cx="250" cy="236" r="102" />
          </clipPath>

          <filter id={shadowFilter} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>

        <g filter={`url(#${shadowFilter})`}>
          {/* Thin Outer Blue & Gold Concentric Arcs */}
          <path
            d="M 170 434 A 210 210 0 0 1 282 40"
            fill="none"
            stroke={`url(#${blueArrow})`}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 332 58 A 210 210 0 0 1 430 162"
            fill="none"
            stroke={`url(#${blueArrow})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 448 238 A 210 210 0 0 1 334 434"
            fill="none"
            stroke={`url(#${goldGrad1})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 166 434 A 210 210 0 0 1 54 275"
            fill="none"
            stroke={`url(#${goldGrad1})`}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Top Golden Curved Arrow */}
          <path
            d="M 76 226 C 72 132, 152 62, 286 58 L 288 94 C 188 98, 120 150, 114 226 C 102 214, 88 214, 76 226 Z"
            fill={`url(#${goldGrad1})`}
            stroke="#825b0b"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="278,38 336,84 276,118 289,80"
            fill={`url(#${goldGrad1})`}
            stroke="#825b0b"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Right Sky-Blue Curved Downward Arrow */}
          <path
            d="M 342 104 C 388 130, 418 176, 424 232 L 388 236 C 384 190, 358 154, 318 132 C 332 126, 338 118, 342 104 Z"
            fill={`url(#${blueArrow})`}
            stroke="#062754"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="440,174 416,244 366,204 404,208"
            fill={`url(#${blueArrow})`}
            stroke="#062754"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Central 3D Golden Globe with Royal-Blue Continents */}
          <g>
            <circle cx="250" cy="236" r="102" fill={`url(#${goldGlobe})`} stroke="#855b0b" strokeWidth="2.2" />

            <g clipPath={`url(#${globeClip})`}>
              {/* Greenland */}
              <path
                d="M 222 138 C 236 136, 256 142, 254 156 C 250 172, 234 178, 224 166 C 218 156, 214 142, 222 138 Z"
                fill={`url(#${blueLand})`}
              />
              {/* North America */}
              <path
                d="M 142 170 C 160 156, 194 148, 212 162 C 224 172, 216 190, 200 198 C 186 206, 174 222, 184 238 C 176 248, 162 240, 152 222 C 142 204, 134 184, 142 170 Z"
                fill={`url(#${blueLand})`}
              />
              {/* South America */}
              <path
                d="M 186 246 C 204 244, 226 260, 232 276 C 238 294, 220 326, 204 338 C 194 342, 190 328, 192 310 C 192 292, 178 272, 180 256 Z"
                fill={`url(#${blueLand})`}
              />
              {/* Europe */}
              <path
                d="M 278 152 C 296 146, 326 154, 338 174 C 344 186, 330 200, 314 198 C 296 196, 282 188, 276 174 C 272 164, 272 156, 278 152 Z"
                fill={`url(#${blueLand})`}
              />
              {/* Africa & Middle East */}
              <path
                d="M 272 206 C 294 200, 324 206, 344 224 C 354 236, 346 268, 332 288 C 318 308, 304 322, 294 316 C 284 308, 286 286, 282 268 C 276 254, 260 242, 262 224 C 264 214, 266 208, 272 206 Z"
                fill={`url(#${blueLand})`}
              />
              {/* Asia / India Edge */}
              <path
                d="M 332 186 C 348 182, 362 198, 358 222 C 354 240, 342 246, 336 232 C 330 218, 326 196, 332 186 Z"
                fill={`url(#${blueLand})`}
              />
            </g>

            {/* Glossy 3D Highlight Overlay */}
            <circle cx="250" cy="236" r="102" fill={`url(#${globeShine})`} />
          </g>

          {/* Left Cradling Golden Hand */}
          <g>
            <path
              d="M 192 444 C 184 406, 152 372, 130 340 C 110 310, 92 276, 84 240 C 82 230, 88 224, 96 228 C 106 236, 114 268, 124 294 C 118 266, 108 242, 102 222 C 100 214, 107 210, 114 214 C 124 226, 136 264, 144 292 C 142 266, 134 244, 130 226 C 128 218, 135 215, 141 220 C 152 234, 162 274, 168 304 C 176 334, 206 364, 236 392 C 242 406, 240 434, 232 448 C 216 450, 202 448, 192 444 Z"
              fill={`url(#${goldGrad2})`}
              stroke="#785208"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M 134 328 C 154 358, 184 384, 214 402"
              fill="none"
              stroke="#6b4705"
              strokeWidth="3.2"
              opacity="0.45"
              strokeLinecap="round"
            />
            <path
              d="M 164 316 C 178 334, 194 352, 204 366"
              fill="none"
              stroke="#fff4b8"
              strokeWidth="2.8"
              opacity="0.72"
              strokeLinecap="round"
            />
          </g>

          {/* Right Cradling Golden Hand */}
          <g>
            <path
              d="M 308 444 C 316 406, 348 372, 370 340 C 390 310, 408 276, 416 240 C 418 230, 412 224, 404 228 C 394 236, 386 268, 376 294 C 382 266, 392 242, 398 222 C 400 214, 393 210, 386 214 C 376 226, 364 264, 356 292 C 358 266, 366 244, 370 226 C 372 218, 365 215, 359 220 C 348 234, 338 274, 332 304 C 324 334, 294 364, 264 392 C 258 406, 260 434, 268 448 C 284 450, 298 448, 308 444 Z"
              fill={`url(#${goldGrad2})`}
              stroke="#785208"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M 366 328 C 346 358, 316 384, 286 402"
              fill="none"
              stroke="#6b4705"
              strokeWidth="3.2"
              opacity="0.45"
              strokeLinecap="round"
            />
            <path
              d="M 336 316 C 322 334, 306 352, 296 366"
              fill="none"
              stroke="#fff4b8"
              strokeWidth="2.8"
              opacity="0.72"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
