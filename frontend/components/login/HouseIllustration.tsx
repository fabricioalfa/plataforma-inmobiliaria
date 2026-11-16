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

const LEFT_SLATS = [0, 1, 2, 3, 4];
const RIGHT_SLATS = [0, 1, 2, 3, 4];

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
        x: [0, -12, 12, -10, 10, -6, 6, 0],
        transition: { duration: 0.55, ease: 'easeInOut' as const },
      }
    : { x: 0 };

  const windowFill = isError && isLightOn ? '#f87171' : isLightOn ? '#fbbf24' : '#0b2a21';
  const lampFill = isError && isLightOn ? '#f87171' : isLightOn ? '#fbbf24' : '#334155';

  const doorLeaf = isSuccess
    ? 0.16
    : isError && !reduceMotion
      ? [1, 0.86, 1]
      : 1;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 900 560"
        fill="none"
        role="img"
        aria-label="Casa minimalista con una lámpara de exterior y un haz de luz hacia el formulario"
        className="h-auto w-full drop-shadow-[0_30px_80px_rgba(16,185,129,0.22)]"
      >
        <defs>
          <linearGradient id="house-stroke" x1="300" y1="110" x2="600" y2="405" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6ee7b7" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="beam-amber" x1="450" y1="260" x2="450" y2="560" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fde68a" stopOpacity="0.9" />
            <stop offset="0.55" stopColor="#fbbf24" stopOpacity="0.35" />
            <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-red" x1="450" y1="260" x2="450" y2="560" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fecaca" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="1" stopColor="#b91c1c" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#34d399" stopOpacity="0.35" />
            <stop offset="1" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx="450"
          cy="250"
          r="235"
          fill="url(#halo)"
          initial={false}
          animate={{ opacity: isLightOn ? 0.9 : 0.35 }}
          transition={{ duration: 0.7 }}
        />

        {[
          { x: 160, y: 110, delay: 0 },
          { x: 735, y: 145, delay: 0.5 },
          { x: 200, y: 300, delay: 1 },
          { x: 710, y: 70, delay: 0.2 },
          { x: 110, y: 220, delay: 0.8 },
          { x: 790, y: 310, delay: 1.2 },
        ].map((star) => (
          <motion.circle
            key={`${star.x}-${star.y}`}
            cx={star.x}
            cy={star.y}
            r={2.5}
            fill="#a7f3d0"
            initial={{ opacity: 0.2 }}
            animate={
              reduceMotion
                ? { opacity: 0.55 }
                : { opacity: [0.2, 1, 0.2], scale: [0.8, 1.25, 0.8] }
            }
            transition={{ duration: 3.2, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        <motion.g animate={shake}>
          <path d="M120 405H780" stroke="#34d399" strokeWidth="5" strokeLinecap="round" />
          <path
            d="M450 115 300 245M450 115l150 130"
            stroke="url(#house-stroke)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M330 245v160h240V245"
            stroke="url(#house-stroke)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            d="M525 190v-40h30v52"
            stroke="#6ee7b7"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <path d="M390 405h120" stroke="#a7f3d0" strokeWidth="5" strokeLinecap="round" />

          <g>
            <rect x="350" y="270" width="52" height="52" rx="7" stroke="#6ee7b7" strokeWidth="5" />
            <motion.rect
              x="356"
              y="276"
              width="40"
              height="40"
              rx="4"
              initial={false}
              animate={{ fill: windowFill, opacity: isLightOn ? 1 : 0.65 }}
              transition={{ duration: 0.5 }}
            />
            <path d="M376 270v52M350 296h52" stroke="#065f46" strokeWidth="2" opacity="0.4" />
            {LEFT_SLATS.map((index) => (
              <motion.rect
                key={index}
                x="356"
                y={276 + index * 8}
                width="40"
                height="5"
                rx="2"
                fill="#0f3b2f"
                initial={false}
                animate={{ scaleY: blindsClosed ? 1 : 0, opacity: blindsClosed ? 1 : 0 }}
                transition={{ duration: 0.2, delay: blindsClosed ? index * 0.04 : 0 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'top' }}
              />
            ))}
          </g>

          <g>
            <rect x="498" y="270" width="52" height="52" rx="7" stroke="#6ee7b7" strokeWidth="5" />
            <motion.rect
              x="504"
              y="276"
              width="40"
              height="40"
              rx="4"
              initial={false}
              animate={{ fill: windowFill, opacity: isLightOn ? 1 : 0.65 }}
              transition={{ duration: 0.5 }}
            />
            <path d="M524 270v52M498 296h52" stroke="#065f46" strokeWidth="2" opacity="0.4" />
            {RIGHT_SLATS.map((index) => (
              <motion.rect
                key={index}
                x="504"
                y={276 + index * 8}
                width="40"
                height="5"
                rx="2"
                fill="#0f3b2f"
                initial={false}
                animate={{ scaleY: blindsClosed ? 1 : 0, opacity: blindsClosed ? 1 : 0 }}
                transition={{ duration: 0.2, delay: blindsClosed ? index * 0.04 : 0 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'top' }}
              />
            ))}
          </g>

          <motion.rect
            x="425"
            y="302"
            width="50"
            height="100"
            rx="6"
            fill="#fbbf24"
            initial={false}
            animate={{ opacity: isSuccess ? 0.85 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
            animate={{ scaleX: doorLeaf }}
            transition={{ duration: isSuccess ? 0.75 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <path
              d="M415 402V312q0-10 10-10h25v100Z"
              fill="#064e3b"
              stroke="#a7f3d0"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="444" cy="355" r="3" fill="#fbbf24" />
          </motion.g>

          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'right center' }}
            animate={{ scaleX: doorLeaf }}
            transition={{ duration: isSuccess ? 0.75 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <path
              d="M485 402V312q0-10-10-10h-25v100Z"
              fill="#064e3b"
              stroke="#a7f3d0"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </motion.g>

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
            style={{ transformBox: 'fill-box', transformOrigin: '450px 120px' }}
          >
            <rect x="405" y="105" width="90" height="175" fill="transparent" pointerEvents="all" />
            <line
              x1="450"
              y1="120"
              x2="450"
              y2="244"
              stroke={isLightOn ? '#fef3c7' : '#a7f3d0'}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <motion.circle
              cx="450"
              cy="248"
              r="7"
              fill={isSuccess ? '#fde68a' : lampFill}
              animate={{ opacity: isLightOn ? 1 : 0.75 }}
            />
            <motion.path
              d="M428 252q22-19 44 0l7 12h-58Z"
              fill={lampFill}
              stroke={isLightOn ? '#fde68a' : '#6ee7b7'}
              strokeWidth="3"
              strokeLinejoin="round"
              animate={{ opacity: isLightOn ? 1 : 0.8 }}
            />
            {!isLightOn && !reduceMotion && (
              <motion.circle
                cx="450"
                cy="250"
                r="28"
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                initial={{ opacity: 0.6, scale: 0.85 }}
                animate={{ opacity: [0.6, 0, 0.6], scale: [0.85, 1.55, 0.85] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            )}
          </motion.g>
        </motion.g>

        <motion.path
          d="M414 260h72l344 300H70Z"
          fill="url(#beam-amber)"
          initial={false}
          animate={{ opacity: isLightOn ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ mixBlendMode: 'screen' }}
          pointerEvents="none"
        />
        <motion.path
          d="M414 260h72l344 300H70Z"
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
