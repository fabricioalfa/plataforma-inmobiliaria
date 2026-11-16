'use client';

import { motion, useReducedMotion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.3, delay },
    },
  }),
};

export default function HouseIllustration({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const float = reduceMotion
    ? {}
    : { y: [0, -8, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const } };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 0 420 380"
        fill="none"
        role="img"
        aria-label="Ilustración de una casa iluminada"
        className="h-full w-full drop-shadow-[0_30px_60px_rgba(16,185,129,0.25)]"
        animate={float}
      >
        <defs>
          <linearGradient id="house-glow" x1="210" y1="70" x2="210" y2="330" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="window-glow" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fef3c7" />
            <stop offset="1" stopColor="#fbbf24" />
          </linearGradient>
          <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#34d399" stopOpacity="0.35" />
            <stop offset="1" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx="210"
          cy="190"
          r="165"
          fill="url(#halo)"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: reduceMotion ? 1 : [0.95, 1.04, 0.95], opacity: 1 }}
          transition={{
            scale: reduceMotion
              ? { duration: 0.6 }
              : { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 1.1 },
          }}
          style={{ transformOrigin: '210px 190px' }}
        />

        {[
          { x: 78, y: 96, delay: 0 },
          { x: 332, y: 130, delay: 0.6 },
          { x: 110, y: 210, delay: 1.1 },
          { x: 318, y: 62, delay: 0.3 },
          { x: 64, y: 250, delay: 0.9 },
        ].map((star) => (
          <motion.circle
            key={`${star.x}-${star.y}`}
            cx={star.x}
            cy={star.y}
            r={2.5}
            fill="#a7f3d0"
            initial={{ opacity: 0.2 }}
            animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 3.2, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: `${star.x}px ${star.y}px` }}
          />
        ))}

        <motion.g>
          <motion.path
            d="M95 182 L210 82 L325 182"
            stroke="url(#house-glow)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            initial="hidden"
            animate="visible"
            custom={0.15}
          />
          <motion.path
            d="M210 82 L210 66"
            stroke="#6ee7b7"
            strokeWidth="4"
            strokeLinecap="round"
            variants={draw}
            initial="hidden"
            animate="visible"
            custom={0.5}
          />
          <motion.circle cx="210" cy="60" r="5" fill="#fbbf24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} />
        </motion.g>

        <motion.path
          d="M262 132 V102 H292 V156"
          stroke="#6ee7b7"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={0.55}
        />

        <motion.path
          d="M124 184 V312 H296 V184"
          stroke="url(#house-glow)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={0.35}
        />

        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <rect x="144" y="208" width="42" height="42" rx="8" stroke="#6ee7b7" strokeWidth="4" />
          <motion.rect
            x="149"
            y="213"
            width="32"
            height="32"
            rx="5"
            fill="url(#window-glow)"
            animate={reduceMotion ? { opacity: 0.85 } : { opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path d="M165 208 V250" stroke="#065f46" strokeWidth="2" opacity="0.45" />
          <path d="M144 229 H186" stroke="#065f46" strokeWidth="2" opacity="0.45" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
        >
          <rect x="234" y="208" width="42" height="42" rx="8" stroke="#6ee7b7" strokeWidth="4" />
          <motion.rect
            x="239"
            y="213"
            width="32"
            height="32"
            rx="5"
            fill="url(#window-glow)"
            animate={reduceMotion ? { opacity: 0.85 } : { opacity: [1, 0.55, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path d="M255 208 V250" stroke="#065f46" strokeWidth="2" opacity="0.45" />
          <path d="M234 229 H276" stroke="#065f46" strokeWidth="2" opacity="0.45" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scaleY: 0.85 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 1.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '210px 312px' }}
        >
          <path
            d="M186 312 V248 Q186 238 196 238 H224 Q234 238 234 248 V312"
            stroke="#a7f3d0"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <motion.path
            d="M186 312 V248 Q186 238 196 238 H224 Q234 238 234 248 V312"
            fill="#064e3b"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          />
          <circle cx="224" cy="278" r="3" fill="#fbbf24" />
        </motion.g>

        <motion.path
          d="M72 312 H348"
          stroke="#34d399"
          strokeWidth="5"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={0.9}
        />

        <motion.path
          d="M244 312 Q262 288 292 296 Q316 302 326 312"
          stroke="#6ee7b7"
          strokeWidth="4"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={1.1}
        />

        {!reduceMotion &&
          [0, 1, 2].map((index) => (
            <motion.circle
              key={index}
              cx={278 + index * 3}
              cy={98}
              r={5 + index * 1.5}
              fill="#a7f3d0"
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.7, 0], y: [-2, -38, -70], scale: [0.6, 1.1, 1.4] }}
              transition={{
                duration: 3.4,
                delay: index * 1.1,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
      </motion.svg>
    </motion.div>
  );
}
