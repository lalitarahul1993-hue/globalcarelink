import React, { useState } from 'react';

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
  const [useFallback, setUseFallback] = useState(false);
  const inlineStyle = size ? { width: size, height: size } : undefined;

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`} 
      style={inlineStyle}
    >
      {withGlow && (
        <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md pointer-events-none" />
      )}
      {!useFallback ? (
        <img
          src="/logo.svg"
          alt="Global Care Link Services LLP Logo"
          className="w-full h-full object-contain select-none drop-shadow-md pointer-events-none"
          loading="eager"
          onError={() => setUseFallback(true)}
        />
      ) : (
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full object-contain filter drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Global Care Link Services LLP Logo"
        >
        <defs>
          <linearGradient id="gcl-gold1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="30%" stopColor="#e8be4b" />
            <stop offset="70%" stopColor="#c59220" />
            <stop offset="100%" stopColor="#8a610f" />
          </linearGradient>

          <linearGradient id="gcl-gold2" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#ffeb99" />
            <stop offset="25%" stopColor="#f3c64a" />
            <stop offset="65%" stopColor="#d4a024" />
            <stop offset="90%" stopColor="#9a6e12" />
            <stop offset="100%" stopColor="#694806" />
          </linearGradient>

          <linearGradient id="gcl-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c6db8" />
            <stop offset="40%" stopColor="#154685" />
            <stop offset="85%" stopColor="#0a254f" />
            <stop offset="100%" stopColor="#051531" />
          </linearGradient>

          <radialGradient id="gcl-ocean" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#245d9f" />
            <stop offset="45%" stopColor="#133d73" />
            <stop offset="80%" stopColor="#0b2447" />
            <stop offset="100%" stopColor="#051226" />
          </radialGradient>

          <radialGradient id="gcl-light" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </radialGradient>

          <filter id="gcl-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#gcl-shadow)">
          {/* Orbital tracks & accents */}
          <circle cx="250" cy="245" r="215" fill="none" stroke="url(#gcl-gold1)" strokeWidth="3" opacity="0.85" strokeDasharray="140 20 80 15 200 30" />
          <circle cx="250" cy="245" r="228" fill="none" stroke="#1b4982" strokeWidth="3" opacity="0.9" strokeDasharray="90 35 180 50" />
          
          <path d="M 80 285 L 72 295 L 88 295 Z" fill="#1b4982" transform="rotate(-15 80 290)" />
          <path d="M 240 435 L 250 431 L 250 439 Z" fill="#1b4982" />

          {/* Upper Gold Ribbon Arrow */}
          <path d="M 100 230 C 95 150, 160 85, 275 80 L 277 115 C 190 120, 135 165, 138 230 Z" fill="url(#gcl-gold1)" />
          <polygon points="270,60 325,100 270,135 280,100" fill="url(#gcl-gold1)" />

          {/* Right Blue Ribbon Arrow */}
          <path d="M 330 120 C 375 145, 405 190, 408 245 L 375 250 C 372 205, 348 170, 312 148 Z" fill="url(#gcl-blue)" />
          <polygon points="418,225 400,285 365,232 393,242" fill="url(#gcl-blue)" />

          {/* Central 3D Globe with Gold Continents & Royal Blue Oceans */}
          <g>
            <circle cx="250" cy="240" r="96" fill="url(#gcl-ocean)" stroke="#091e3d" strokeWidth="2" />

            {/* Americas */}
            <path d="M 185 185 C 180 190, 190 205, 195 210 C 200 215, 205 220, 212 215 C 218 210, 225 212, 222 225 C 220 235, 228 250, 235 260 C 242 270, 240 285, 232 295 C 225 305, 215 315, 218 322 C 222 325, 228 320, 230 310 C 235 295, 245 285, 248 270 C 252 255, 242 245, 235 235 C 228 225, 225 215, 215 205 C 205 195, 195 180, 185 185 Z" fill="url(#gcl-gold2)" opacity="0.95" />

            {/* North America */}
            <path d="M 195 160 C 205 155, 220 152, 230 162 C 240 172, 235 180, 225 185 C 215 190, 202 185, 195 175 C 190 168, 188 162, 195 160 Z" fill="url(#gcl-gold2)" opacity="0.95" />

            {/* Greenland */}
            <path d="M 235 150 C 242 148, 255 152, 250 160 C 245 168, 232 165, 235 150 Z" fill="url(#gcl-gold2)" opacity="0.95" />

            {/* Europe */}
            <path d="M 265 162 C 275 158, 290 165, 295 175 C 300 185, 290 192, 280 190 C 270 188, 262 178, 265 162 Z" fill="url(#gcl-gold2)" opacity="0.95" />

            {/* Africa */}
            <path d="M 268 198 C 285 195, 305 205, 310 220 C 315 235, 312 255, 300 270 C 290 285, 285 295, 275 300 C 268 302, 265 295, 268 285 C 272 275, 265 260, 260 250 C 255 240, 258 225, 262 215 C 265 205, 262 200, 268 198 Z" fill="url(#gcl-gold2)" opacity="0.95" />

            {/* Asia */}
            <path d="M 305 168 C 320 165, 338 180, 342 200 C 345 220, 335 230, 325 225 C 315 220, 318 205, 310 195 C 305 185, 300 175, 305 168 Z" fill="url(#gcl-gold2)" opacity="0.95" />

            {/* Sphere highlight */}
            <circle cx="250" cy="240" r="96" fill="url(#gcl-light)" pointerEvents="none" />
          </g>

          {/* Left Golden Hand Cradling Globe */}
          <g>
            <path d="M 195 425 C 185 390, 160 355, 145 325 C 135 305, 120 280, 108 248 C 104 240, 108 235, 115 238 C 125 245, 138 275, 148 295 C 142 270, 130 250, 122 230 C 119 222, 124 218, 130 220 C 140 230, 155 265, 162 290 C 158 265, 148 240, 140 220 C 137 212, 142 208, 148 210 C 158 220, 172 260, 178 285 C 176 265, 168 242, 162 225 C 160 218, 165 214, 170 216 C 182 228, 195 270, 202 305 C 210 335, 230 365, 245 390 C 230 415, 215 428, 195 425 Z" fill="url(#gcl-gold2)" stroke="#9c7112" strokeWidth="1.5" />
            <path d="M 155 340 C 170 365, 195 385, 220 400" fill="none" stroke="#6e4d07" strokeWidth="3" opacity="0.45" strokeLinecap="round" />
            <path d="M 188 320 C 198 335, 208 348, 212 360" fill="none" stroke="#fff0a8" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
          </g>

          {/* Right Golden Hand Cradling Globe */}
          <g>
            <path d="M 305 425 C 315 390, 340 355, 355 325 C 365 305, 380 280, 392 248 C 396 240, 392 235, 385 238 C 375 245, 362 275, 352 295 C 358 270, 370 250, 378 230 C 381 222, 376 218, 370 220 C 360 230, 345 265, 338 290 C 342 265, 352 240, 360 220 C 363 212, 358 208, 352 210 C 342 220, 328 260, 322 285 C 324 265, 332 242, 338 225 C 340 218, 335 214, 330 216 C 318 228, 305 270, 298 305 C 290 335, 270 365, 255 390 C 270 415, 285 428, 305 425 Z" fill="url(#gcl-gold2)" stroke="#9c7112" strokeWidth="1.5" />
            <path d="M 345 340 C 330 365, 305 385, 280 400" fill="none" stroke="#6e4d07" strokeWidth="3" opacity="0.45" strokeLinecap="round" />
            <path d="M 312 320 C 302 335, 292 348, 288 360" fill="none" stroke="#fff0a8" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
          </g>
        </g>
      </svg>
      )}
    </div>
  );
};
