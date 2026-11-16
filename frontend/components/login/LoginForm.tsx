'use client';

import { useActionState, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export type LoginState = { error?: string };
type LoginAction = (state: LoginState | void, formData: FormData) => LoginState | void | Promise<LoginState | void>;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function LoginForm({ action }: { action: LoginAction }) {
  const [state, formAction, pending] = useActionState(action, { error: undefined });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md"
    >
      <motion.div variants={item} className="mb-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path
                d="M3 11.5 12 4l9 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 10.5V20h13v-9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            Plataforma Inmobiliaria
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Bienvenido de vuelta</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Ingresa tus datos para administrar tus propiedades y encontrar tu próximo hogar.
        </p>
      </motion.div>

      <form action={formAction} className="space-y-5">
        <motion.div variants={item}>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700">
            Correo electrónico
          </label>
          <div className="group relative rounded-xl border border-zinc-200 bg-white transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 transition-colors group-focus-within:text-emerald-600">
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
              placeholder="tu@correo.com"
              className="w-full rounded-xl bg-transparent py-3.5 pr-4 pl-12 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
            />
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Contraseña
            </label>
            <span className="text-xs font-medium text-zinc-400">Mínimo 6 caracteres</span>
          </div>
          <div className="group relative rounded-xl border border-zinc-200 bg-white transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 transition-colors group-focus-within:text-emerald-600">
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
              placeholder="••••••••"
              className="w-full rounded-xl bg-transparent py-3.5 pr-12 pl-12 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 transition-colors hover:text-zinc-700"
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
                  <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {state?.error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45 }}
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              {state.error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div variants={item}>
          <motion.button
            type="submit"
            disabled={pending}
            whileHover={pending ? undefined : { scale: 1.015 }}
            whileTap={pending ? undefined : { scale: 0.985 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? (
              <>
                <motion.span
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                Ingresando...
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

      <motion.p variants={item} className="mt-8 text-center text-sm text-zinc-500">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="font-semibold text-emerald-700 underline-offset-4 hover:underline">
          Regístrate
        </Link>
      </motion.p>
    </motion.div>
  );
}
