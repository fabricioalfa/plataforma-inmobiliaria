'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import type { AuthStatus, LoginCredentials } from './types';

type LoginFormProps = {
  isLightOn: boolean;
  isPasswordFocused: boolean;
  authStatus: AuthStatus;
  errorMessage?: string;
  onPasswordFocusChange: (focused: boolean) => void;
  onSubmit: (credentials: LoginCredentials) => boolean | Promise<boolean>;
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function LoginForm({
  isLightOn,
  isPasswordFocused,
  authStatus,
  errorMessage,
  onPasswordFocusChange,
  onSubmit,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isBusy = authStatus === 'loading' || authStatus === 'success';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLightOn || isBusy) return;

    const ok = await onSubmit({ email, password });

    if (!ok) {
      setPassword('');
      setShowPassword(false);
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7">
        <motion.div variants={item} className="mb-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M3 11.5 12 4l9 7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.5 10.5V20h13v-9.5M10 20v-5h4v5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight text-zinc-700">
              Plataforma Inmobiliaria
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Bienvenido de vuelta
          </h1>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            La luz está encendida. Ingresa tus datos para entrar a tu cuenta.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={item}>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-700">
              Correo electrónico
            </label>
            <div className="group relative rounded-xl border border-zinc-200 bg-white transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 transition-colors group-focus-within:text-emerald-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu@correo.com"
                disabled={isBusy}
                className="w-full rounded-xl bg-transparent py-3 pr-4 pl-11 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 disabled:opacity-60"
              />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Contraseña
              </label>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isPasswordFocused ? 'private' : 'hint'}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 3 }}
                  className={`text-[11px] font-medium ${
                    isPasswordFocused ? 'text-emerald-600' : 'text-zinc-400'
                  }`}
                >
                  {isPasswordFocused ? 'Modo privado activado' : 'Mínimo 6 caracteres'}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="group relative rounded-xl border border-zinc-200 bg-white transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 transition-colors group-focus-within:text-emerald-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <rect x="4" y="10" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <circle cx="12" cy="15" r="1.4" fill="currentColor" />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onFocus={() => onPasswordFocusChange(true)}
                onBlur={() => onPasswordFocusChange(false)}
                placeholder="••••••••"
                disabled={isBusy}
                className="w-full rounded-xl bg-transparent py-3 pr-11 pl-11 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 disabled:opacity-60"
              />
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400 transition-colors hover:text-zinc-700"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path
                      d="M2.5 12S6 5.5 12 5.5c1.6 0 3 .5 4.2 1.2M21.5 12S18 18.5 12 18.5c-1.6 0-3-.5-4.2-1.2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>

          <AnimatePresence>
            {authStatus === 'error' && errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45 }}
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div variants={item} className="pt-1">
            <motion.button
              type="submit"
              disabled={isBusy || !isLightOn}
              whileHover={isBusy ? undefined : { scale: 1.015 }}
              whileTap={isBusy ? undefined : { scale: 0.985 }}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                authStatus === 'success'
                  ? 'bg-emerald-600 shadow-emerald-600/25'
                  : 'bg-zinc-900 shadow-zinc-900/10 hover:bg-zinc-800'
              }`}
            >
              {authStatus === 'loading' ? (
                <>
                  <motion.span
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  Ingresando...
                </>
              ) : authStatus === 'success' ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Abriendo la puerta...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.p variants={item} className="mt-5 text-center text-sm text-zinc-500">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="font-semibold text-emerald-700 underline-offset-4 hover:underline">
            Regístrate
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
}
