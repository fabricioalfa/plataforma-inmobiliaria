'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { AuthStatus } from './types';

type HouseIllustrationProps = {
  className?: string;
  isLightOn: boolean;
  isPasswordFocused: boolean;
  authStatus: AuthStatus;
  onToggleLight: () => void;
};

const UPPER_WINDOWS = [
  { x: 213, y: 238, width: 88, height: 74 },
  { x: 309, y: 238, width: 88, height: 74 },
  { x: 405, y: 238, width: 90, height: 74 },
];

const LOWER_WINDOWS = [
  { x: 343, y: 398, width: 52, height: 119 },
  { x: 401, y: 398, width: 52, height: 119 },
  { x: 459, y: 398, width: 48, height: 119 },
];

const STARS = [
  { x: 90, y: 92, delay: 0 },
  { x: 182, y: 58, delay: 0.5 },
  { x: 310, y: 110, delay: 1.1 },
  { x: 470, y: 62, delay: 0.2 },
  { x: 612, y: 170, delay: 0.8 },
  { x: 830, y: 84, delay: 1.4 },
  { x: 760, y: 260, delay: 0.4 },
  { x: 60, y: 250, delay: 1.2 },
];

export default function HouseIllustration({
  className,
  isLightOn,
  isPasswordFocused,
  authStatus,
  onToggleLight,
}: HouseIllustrationProps) {
  const reduceMotion = useReducedMotion();
  const isError = authStatus === 'error';
  const isSuccess = authStatus === 'success';
  const blindsClosed = isPasswordFocused || isError;

  const shake = isError && !reduceMotion
    ? {
        x: [0, -10, 10, -8, 8, -5, 5, 0],
        transition: { duration: 0.55, ease: 'easeInOut' as const },
      }
    : { x: 0 };

  const glow = isError ? '#ef4444' : '#fbbf24';
  const glowSoft = isError ? '#fca5a5' : '#fde68a';
  const doorLeaf = isSuccess
    ? 0.14
    : isError && !reduceMotion
      ? [1, 0.86, 1]
      : 1;

  const windowGlass = (window: { x: number; y: number; width: number; height: number }) => (
    <>
      <motion.rect
        x={window.x - 10}
        y={window.y - 10}
        width={window.width + 20}
        height={window.height + 20}
        fill={glow}
        filter="url(#soft-glow)"
        initial={false}
        animate={{ opacity: isLightOn ? 0.4 : 0 }}
        transition={{ duration: 0.55 }}
        pointerEvents="none"
      />
      <rect
        x={window.x}
        y={window.y}
        width={window.width}
        height={window.height}
        fill="url(#glass-off)"
      />
      <motion.rect
        x={window.x}
        y={window.y}
        width={window.width}
        height={window.height}
        fill="url(#glass-on)"
        initial={false}
        animate={{ opacity: isLightOn ? 0.95 : 0 }}
        transition={{ duration: 0.55 }}
      />
      <motion.rect
        x={window.x}
        y={window.y}
        width={window.width}
        height={window.height}
        fill="#ef4444"
        initial={false}
        animate={{ opacity: isError && isLightOn ? 0.5 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <path
        d={`M${window.x} ${window.y + window.height / 2}h${window.width}`}
        stroke="#0c100f"
        strokeWidth="2"
        opacity="0.5"
      />
      <polygon
        points={`${window.x + 8},${window.y + window.height - 8} ${window.x + 30},${window.y + 8} ${window.x + 44},${window.y + 8} ${window.x + 18},${window.y + window.height - 8}`}
        fill="#ffffff"
        opacity="0.1"
      />
    </>
  );

  return (
    <motion.div
      className={`min-w-0 ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 900 700"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Casa moderna en perspectiva con jardín, ventanales iluminados y una lámpara exterior"
        className="h-full w-full max-w-full"
      >
        <defs>
          <linearGradient id="sky-day" x1="450" y1="0" x2="450" y2="700" gradientUnits="userSpaceOnUse">
            <stop stopColor="#174a3d" />
            <stop offset="0.42" stopColor="#2d7054" />
            <stop offset="0.72" stopColor="#b4774b" />
            <stop offset="1" stopColor="#f4c78e" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#ffe9b8" stopOpacity="0.75" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lawn" x1="450" y1="530" x2="450" y2="700" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5f8f4a" />
            <stop offset="1" stopColor="#284d31" />
          </linearGradient>
          <linearGradient id="stone-front" x1="355" y1="355" x2="355" y2="565" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f0e4d2" />
            <stop offset="1" stopColor="#cdbba5" />
          </linearGradient>
          <linearGradient id="stone-side" x1="560" y1="320" x2="610" y2="530" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c2b09b" />
            <stop offset="1" stopColor="#8e7b64" />
          </linearGradient>
          <linearGradient id="stone-front-2" x1="312" y1="205" x2="312" y2="355" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f6ebdb" />
            <stop offset="1" stopColor="#dbc9b3" />
          </linearGradient>
          <linearGradient id="stone-side-2" x1="530" y1="170" x2="570" y2="355" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d0bea8" />
            <stop offset="1" stopColor="#9a876f" />
          </linearGradient>
          <linearGradient id="wood" x1="260" y1="355" x2="260" y2="565" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b87a42" />
            <stop offset="1" stopColor="#7a4823" />
          </linearGradient>
          <linearGradient id="door-wood" x1="260" y1="446" x2="304" y2="565" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a86434" />
            <stop offset="1" stopColor="#603317" />
          </linearGradient>
          <linearGradient id="roof" x1="360" y1="165" x2="360" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#555c57" />
            <stop offset="1" stopColor="#262b28" />
          </linearGradient>
          <linearGradient id="glass-off" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#173b35" />
            <stop offset="1" stopColor="#0a211d" />
          </linearGradient>
          <linearGradient id="glass-on" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ffe4a3" />
            <stop offset="0.55" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="path" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#e2d1af" />
            <stop offset="1" stopColor="#b7a17c" />
          </linearGradient>
          <linearGradient id="beam-amber" x1="500" y1="380" x2="900" y2="380" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe3a3" stopOpacity="0.6" />
            <stop offset="0.55" stopColor="#fbbf24" stopOpacity="0.18" />
            <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-red" x1="500" y1="380" x2="900" y2="380" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fecaca" stopOpacity="0.55" />
            <stop offset="0.55" stopColor="#ef4444" stopOpacity="0.18" />
            <stop offset="1" stopColor="#b91c1c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hedge" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#4d8a4e" />
            <stop offset="1" stopColor="#24502f" />
          </linearGradient>
          <radialGradient id="moon-glow" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#e6f0d8" stopOpacity="0.5" />
            <stop offset="1" stopColor="#e6f0d8" stopOpacity="0" />
          </radialGradient>
          <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <rect width="900" height="700" fill="url(#sky-day)" />
        <circle cx="735" cy="118" r="120" fill="url(#sun-glow)" />
        <circle cx="735" cy="118" r="52" fill="#ffe7b0" opacity="0.95" />

        <g fill="#fff7e8" opacity="0.13">
          <ellipse cx="650" cy="205" rx="95" ry="20" />
          <ellipse cx="720" cy="196" rx="55" ry="15" />
          <ellipse cx="225" cy="150" rx="120" ry="22" />
          <ellipse cx="290" cy="140" rx="62" ry="15" />
        </g>

        <path d="M0 520Q160 458 330 500T660 472T900 506V700H0Z" fill="#24523a" opacity="0.72" />
        <path d="M0 555Q220 525 420 545T900 520V700H0Z" fill="url(#lawn)" />

        <path
          d="M250 566c88 24 185 54 286 82 72 20 140 38 214 52h72c-150-16-286-48-402-86-72-24-138-44-198-56Z"
          fill="url(#path)"
          opacity="0.6"
        />
        {[300, 372, 448, 530, 616, 704].map((cx, index) => (
          <ellipse
            key={cx}
            cx={cx}
            cy={596 + index * 18}
            rx={26 - index * 1.4}
            ry={8 - index * 0.3}
            fill="#d7c39d"
            opacity="0.45"
          />
        ))}

        <g>
          <path d="M76 520v-92" stroke="#5c3b21" strokeWidth="12" strokeLinecap="round" />
          <circle cx="76" cy="408" r="42" fill="#3f7a45" />
          <circle cx="42" cy="438" r="30" fill="#356c3d" />
          <circle cx="108" cy="440" r="32" fill="#4b8a4d" />
          <circle cx="76" cy="462" r="30" fill="#2f6038" />
          <ellipse cx="76" cy="524" rx="55" ry="10" fill="#10281d" opacity="0.35" />
        </g>

        <g>
          <path d="M812 548v-78" stroke="#5c3b21" strokeWidth="9" strokeLinecap="round" />
          <circle cx="812" cy="450" r="32" fill="#356c3d" />
          <circle cx="786" cy="474" r="24" fill="#2f6038" />
          <circle cx="838" cy="476" r="24" fill="#3f7a45" />
          <ellipse cx="812" cy="550" rx="42" ry="8" fill="#10281d" opacity="0.3" />
        </g>

        <ellipse cx="410" cy="570" rx="315" ry="32" fill="#10281d" opacity="0.42" />

        <motion.g animate={shake}>
          <polygon
            points="520,355 635,320 635,530 520,565"
            fill="url(#stone-side)"
            stroke="#8c7961"
            strokeWidth="2"
          />
          <rect x="190" y="355" width="330" height="210" fill="url(#stone-front)" />

          <polygon
            points="520,205 635,170 635,320 520,355"
            fill="url(#stone-side-2)"
            stroke="#a38f76"
            strokeWidth="2"
          />
          <rect x="190" y="205" width="330" height="150" fill="url(#stone-front-2)" />

          <rect x="190" y="355" width="330" height="12" fill="#000000" opacity="0.12" />
          <rect x="190" y="355" width="330" height="10" fill="#000000" opacity="0.1" />

          <g opacity="0.12" stroke="#5f5140" strokeWidth="1.5">
            <path d="M192 390h326M192 426h326M192 462h326M192 498h326M192 534h326" />
            <path d="M530 375l95-28M530 410l95-28M530 445l95-28M530 480l95-28" />
            <path d="M194 230h322M194 265h322M194 300h322M194 335h322" />
          </g>

          <polygon points="170,200 540,200 655,165 285,165" fill="url(#roof)" />
          <polygon points="170,200 540,200 540,218 170,218" fill="#1f2421" />
          <polygon points="540,200 655,165 655,183 540,218" fill="#151917" />
          <path d="M285 165h370" stroke="#7a837d" strokeWidth="2" opacity="0.55" />
          <motion.path
            d="M176 221h360"
            stroke={glow}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#soft-glow)"
            initial={false}
            animate={{ opacity: isLightOn ? 0.6 : 0 }}
            transition={{ duration: 0.6 }}
          />
          <g>
            <polygon points="330,193 430,193 462,180 362,180" fill="#1f2421" stroke="#6b7570" strokeWidth="2" />
            <polygon points="336,190 424,190 451,182 363,182" fill="url(#glass-off)" />
            <motion.polygon
              points="336,190 424,190 451,182 363,182"
              fill="url(#glass-on)"
              initial={false}
              animate={{ opacity: isLightOn ? 0.55 : 0 }}
              transition={{ duration: 0.55 }}
            />
            <polygon points="340,188 360,188 390,183 370,183" fill="#ffffff" opacity="0.08" />
          </g>
          <g>
            <rect x="590" y="148" width="8" height="24" rx="3" fill="#4b5550" />
            <ellipse cx="594" cy="148" rx="4" ry="2" fill="#7a837d" />
          </g>

          <polygon points="180,345 530,345 530,365 180,365" fill="#2d3330" />
          <polygon
            points="190,315 520,315 520,345 190,345"
            fill="#cfe4dc"
            opacity="0.16"
            stroke="#dcebe5"
            strokeWidth="2"
          />
          <path
            d="M193 345v-30M270 345v-30M350 345v-30M430 345v-30M518 345v-30"
            stroke="#dcebe5"
            strokeWidth="3"
            opacity="0.55"
          />
          <g>
            <rect x="200" y="326" width="15" height="19" rx="3" fill="#7a4823" />
            <circle cx="207" cy="320" r="10" fill="#4d8a4e" />
            <rect x="495" y="326" width="15" height="19" rx="3" fill="#7a4823" />
            <circle cx="502" cy="319" r="11" fill="#3f7a45" />
          </g>

          <rect x="205" y="230" width="300" height="90" fill="#202522" />
          {UPPER_WINDOWS.map((window) => (
            <g key={window.x}>
              {windowGlass(window)}
              <rect
                x={window.x}
                y={window.y}
                width={window.width}
                height={window.height}
                stroke="#0c100f"
                strokeWidth="3"
              />
            </g>
          ))}
          <g opacity="0.35" fill="#3f2a19">
            <rect x="323" y="282" width="46" height="22" rx="4" />
            <circle cx="387" cy="270" r="10" />
            <path d="M387 282v18" stroke="#3f2a19" strokeWidth="3" />
          </g>

          <polygon points="540,232 610,214 610,292 540,310" fill="#202522" />
          <polygon points="545,238 605,223 605,287 545,303" fill="url(#glass-off)" />
          <motion.polygon
            points="545,238 605,223 605,287 545,303"
            fill="url(#glass-on)"
            initial={false}
            animate={{ opacity: isLightOn ? 0.9 : 0 }}
            transition={{ duration: 0.55 }}
          />
          <motion.polygon
            points="545,238 605,223 605,287 545,303"
            fill="#ef4444"
            initial={false}
            animate={{ opacity: isError && isLightOn ? 0.5 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <polygon points="549,293 589,286 589,231 549,238" fill="#ffffff" opacity="0.08" />

          <g>
            <polygon points="552,392 618,372 618,470 552,490" fill="#202522" />
            <motion.polygon
              points="558,398 612,381 612,463 558,482"
              fill={glow}
              filter="url(#soft-glow)"
              initial={false}
              animate={{ opacity: isLightOn ? 0.4 : 0 }}
              transition={{ duration: 0.55 }}
            />
            <polygon points="558,398 612,381 612,463 558,482" fill="url(#glass-off)" />
            <motion.polygon
              points="558,398 612,381 612,463 558,482"
              fill="url(#glass-on)"
              initial={false}
              animate={{ opacity: isLightOn ? 0.9 : 0 }}
              transition={{ duration: 0.55 }}
            />
            <motion.polygon
              points="558,398 612,381 612,463 558,482"
              fill="#ef4444"
              initial={false}
              animate={{ opacity: isError && isLightOn ? 0.5 : 0 }}
              transition={{ duration: 0.25 }}
            />
            <path d="M584 390v84M558 432l54-19" stroke="#0c100f" strokeWidth="3" />
            <polygon points="562,480 600,468 600,390 562,402" fill="#ffffff" opacity="0.08" />
          </g>

          <rect x="190" y="355" width="145" height="210" fill="url(#wood)" />
          <g stroke="#5b3319" strokeWidth="2" opacity="0.55">
            <path d="M198 355v210M210 355v210M222 355v210M234 355v210M246 355v210M258 355v210M270 355v210M282 355v210M294 355v210M306 355v210M318 355v210M330 355v210" />
            <path d="M190 390h145M190 430h145M190 470h145M190 510h145M190 550h145" opacity="0.35" />
          </g>

          <rect x="335" y="390" width="180" height="135" fill="#202522" />
          {LOWER_WINDOWS.map((window) => (
            <g key={window.x}>
              {windowGlass(window)}
              <rect
                x={window.x}
                y={window.y}
                width={window.width}
                height={window.height}
                stroke="#0c100f"
                strokeWidth="3"
              />
            </g>
          ))}
          <g opacity="0.35" fill="#3f2a19">
            <rect x="355" y="488" width="62" height="22" rx="4" />
            <rect x="366" y="476" width="40" height="14" rx="4" />
            <circle cx="480" cy="466" r="11" />
            <path d="M480 478v26" stroke="#3f2a19" strokeWidth="3" />
          </g>

          <rect x="232" y="440" width="72" height="125" fill="#202522" />
          <motion.rect
            x="238"
            y="446"
            width="60"
            height="119"
            fill="url(#glass-on)"
            initial={false}
            animate={{ opacity: isSuccess ? 0.95 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
            animate={{ scaleX: doorLeaf }}
            transition={{ duration: isSuccess ? 0.8 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect x="238" y="446" width="60" height="119" fill="url(#door-wood)" stroke="#3f2410" strokeWidth="2" />
            <rect x="248" y="456" width="40" height="76" fill="url(#glass-off)" stroke="#2b1608" strokeWidth="2" />
            <motion.rect
              x="248"
              y="456"
              width="40"
              height="76"
              fill="url(#glass-on)"
              initial={false}
              animate={{ opacity: isLightOn ? 0.8 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <path d="M248 494h40M268 456v76" stroke="#3f2410" strokeWidth="2" opacity="0.6" />
            <path d="M248 548h40" stroke="#3f2410" strokeWidth="3" opacity="0.5" />
            <circle cx="292" cy="516" r="3" fill="#fbbf24" />
          </motion.g>

          <rect x="222" y="565" width="92" height="12" rx="2" fill="#d8c6a8" />
          <rect x="210" y="577" width="116" height="12" rx="2" fill="#bfae90" />

          {UPPER_WINDOWS.map((window) => (
            <g key={`upper-blind-${window.x}`}>
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <motion.rect
                  key={index}
                  x={window.x + 2}
                  y={window.y + 3 + index * 10}
                  width={window.width - 4}
                  height="6"
                  rx="1.5"
                  fill="#253a32"
                  initial={false}
                  animate={{ scaleY: blindsClosed ? 1 : 0, opacity: blindsClosed ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: blindsClosed ? index * 0.03 : 0 }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'top' }}
                />
              ))}
            </g>
          ))}
          {LOWER_WINDOWS.map((window) => (
            <g key={`lower-blind-${window.x}`}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <motion.rect
                  key={index}
                  x={window.x + 2}
                  y={window.y + 3 + index * 10}
                  width={window.width - 4}
                  height="6"
                  rx="1.5"
                  fill="#253a32"
                  initial={false}
                  animate={{ scaleY: blindsClosed ? 1 : 0, opacity: blindsClosed ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: blindsClosed ? index * 0.03 : 0 }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'top' }}
                />
              ))}
            </g>
          ))}

          <g fill="url(#hedge)" stroke="#1d4027" strokeWidth="2">
            <ellipse cx="200" cy="558" rx="26" ry="17" />
            <ellipse cx="244" cy="565" rx="28" ry="15" />
            <ellipse cx="350" cy="562" rx="26" ry="15" />
            <ellipse cx="392" cy="568" rx="24" ry="13" />
            <ellipse cx="470" cy="556" rx="28" ry="17" />
            <ellipse cx="516" cy="548" rx="24" ry="15" />
            <ellipse cx="558" cy="538" rx="22" ry="14" />
          </g>
          <g fill="#6fae5d" opacity="0.7">
            <circle cx="192" cy="552" r="4" />
            <circle cx="206" cy="548" r="3" />
            <circle cx="238" cy="558" r="4" />
            <circle cx="356" cy="556" r="3" />
            <circle cx="468" cy="550" r="4" />
            <circle cx="512" cy="542" r="3" />
          </g>

          <motion.ellipse
            cx="405"
            cy="582"
            rx="128"
            ry="22"
            fill="#fbbf24"
            filter="url(#soft-glow)"
            initial={false}
            animate={{ opacity: isLightOn ? 0.2 : 0 }}
            transition={{ duration: 0.6 }}
            pointerEvents="none"
          />
          <motion.ellipse
            cx="270"
            cy="580"
            rx="52"
            ry="13"
            fill="#fbbf24"
            filter="url(#soft-glow)"
            initial={false}
            animate={{ opacity: isLightOn ? 0.25 : 0 }}
            transition={{ duration: 0.6 }}
            pointerEvents="none"
          />
          {[
            { x: 412, y: 602 },
            { x: 494, y: 626 },
            { x: 582, y: 650 },
          ].map((light) => (
            <g key={`${light.x}-${light.y}`}>
              <path d={`M${light.x} ${light.y + 15}v-13`} stroke="#253a32" strokeWidth="4" strokeLinecap="round" />
              <motion.circle
                cx={light.x}
                cy={light.y - 2}
                r="4"
                fill="#fbbf24"
                initial={false}
                animate={{ opacity: isLightOn ? 1 : 0.25 }}
                transition={{ duration: 0.5 }}
              />
            </g>
          ))}
        </motion.g>

        <motion.rect
          width="900"
          height="700"
          fill="#03110d"
          initial={false}
          animate={{ opacity: isLightOn ? 0.05 : 0.74 }}
          transition={{ duration: 0.8 }}
        />

        <motion.g
          initial={false}
          animate={{ opacity: isLightOn ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <circle cx="735" cy="118" r="92" fill="url(#moon-glow)" />
          <circle cx="735" cy="118" r="36" fill="#e8f0d8" />
          <circle cx="724" cy="108" r="7" fill="#c8d4b8" opacity="0.45" />
          <circle cx="746" cy="130" r="5" fill="#c8d4b8" opacity="0.4" />
          {STARS.map((star) => (
            <motion.circle
              key={`${star.x}-${star.y}`}
              cx={star.x}
              cy={star.y}
              r={2.2}
              fill="#e8f0d8"
              animate={
                reduceMotion
                  ? { opacity: 0.55 }
                  : { opacity: [0.18, 0.9, 0.18], scale: [0.8, 1.2, 0.8] }
              }
              transition={{ duration: 3.4, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}
        </motion.g>

        <motion.g animate={shake}>
          <motion.g
            role="button"
            tabIndex={0}
            aria-label={isLightOn ? 'Apagar la lámpara' : 'Tirar de la cuerda para encender la lámpara'}
            onClick={onToggleLight}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onToggleLight();
              }
            }}
            className="cursor-pointer focus:outline-none"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            style={{ transformBox: 'fill-box', transformOrigin: '315px 420px' }}
          >
            <rect x="292" y="410" width="48" height="98" fill="transparent" pointerEvents="all" />
            <motion.path
              d="M303 430 292 476h46l-11-46Z"
              fill={glowSoft}
              initial={false}
              animate={{ opacity: isLightOn ? 0.22 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <path d="M304 430h22l5 13h-32Z" fill={glow} stroke="#6b4a1c" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="315" cy="434" r="4" fill="#fff3c4" />
            <line
              x1="315"
              y1="445"
              x2="315"
              y2="486"
              stroke={isLightOn ? '#fff3c4' : '#d8e6d8'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="315" cy="491" r="4" fill={isLightOn ? '#fbbf24' : '#d8e6d8'} />
            {!isLightOn && !reduceMotion && (
              <motion.circle
                cx="315"
                cy="458"
                r="26"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                initial={{ opacity: 0.55, scale: 0.85 }}
                animate={{ opacity: [0.55, 0, 0.55], scale: [0.85, 1.5, 0.85] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            )}
          </motion.g>
        </motion.g>

        <motion.path
          d="M500 358 900 220v430L500 398Z"
          fill="url(#beam-amber)"
          initial={false}
          animate={{ opacity: isLightOn ? 1 : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ mixBlendMode: 'screen' }}
          pointerEvents="none"
        />
        <motion.path
          d="M500 358 900 220v430L500 398Z"
          fill="url(#beam-red)"
          initial={false}
          animate={{ opacity: isError && isLightOn ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ mixBlendMode: 'screen' }}
          pointerEvents="none"
        />
      </svg>
    </motion.div>
  );
}
