'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { login } from '@/app/actions/auth';
import HouseIllustration from '@/components/login/HouseIllustration';
import LoginForm from '@/components/login/LoginForm';
import type { AuthStatus, LoginCredentials } from '@/components/login/types';

const ease = [0.22, 1, 0.36, 1] as const;

export default function LoginPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [isLightOn, setIsLightOn] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>();

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  const handleToggleLight = () => {
    if (isLightOn) {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      setIsPasswordFocused(false);

      if (authStatus === 'error') {
        setAuthStatus('idle');
        setErrorMessage(undefined);
      }
    }

    setIsLightOn((value) => !value);
  };

  const handleLogin = useCallback(
    async ({ email, password }: LoginCredentials) => {
      if (authStatus === 'loading' || authStatus === 'success') return false;

      if (resetTimer.current) clearTimeout(resetTimer.current);
      setErrorMessage(undefined);
      setAuthStatus('loading');

      try {
        const result = await login({ email, password });

        if (result.ok) {
          setAuthStatus('success');
          redirectTimer.current = setTimeout(() => router.push('/dashboard'), 800);
          return true;
        }

        setAuthStatus('error');
        setErrorMessage(result.error);

        resetTimer.current = setTimeout(() => {
          setAuthStatus((current) => (current === 'error' ? 'idle' : current));
          setErrorMessage(undefined);
        }, 1500);

        return false;
      } catch {
        setAuthStatus('error');
        setErrorMessage('No se pudo conectar con el servidor. Intenta de nuevo.');

        resetTimer.current = setTimeout(() => {
          setAuthStatus((current) => (current === 'error' ? 'idle' : current));
          setErrorMessage(undefined);
        }, 1500);

        return false;
      }
    },
    [authStatus, router],
  );

  const sceneAnimation =
    authStatus === 'success' && !reduceMotion
      ? { scale: 1.02, opacity: 0.7 }
      : { scale: 1, opacity: 1 };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06110d] p-3 text-white sm:p-5 lg:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-emerald-500/10 blur-[120px]" />
        <motion.div
          initial={false}
          animate={{ opacity: isLightOn ? 0.75 : 0.18 }}
          transition={{ duration: 0.8 }}
          className="absolute right-[8%] top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-amber-300/20 blur-[140px]"
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)',
            backgroundSize: '38px 38px',
          }}
        />
      </div>

      <motion.div
        animate={sceneAnimation}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 mx-auto grid min-h-[calc(100svh-1.5rem)] w-full min-w-0 max-w-6xl grid-cols-1 overflow-hidden rounded-[28px] border border-white/10 bg-[#0a1f19] shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:min-h-[calc(100svh-2.5rem)] lg:min-h-[680px] lg:grid-cols-[1.12fr_0.88fr]"
      >
        <section className="relative min-h-[340px] min-w-0 overflow-hidden sm:min-h-[440px] lg:min-h-0">
          <HouseIllustration
            className="absolute inset-0 h-full w-full"
            isLightOn={isLightOn}
            isPasswordFocused={isPasswordFocused}
            authStatus={authStatus}
            onToggleLight={handleToggleLight}
          />

          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#04110d]/75 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04110d]/90 via-[#04110d]/40 to-transparent" />

          <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-between p-5 sm:min-h-[440px] sm:p-7 lg:min-h-0 lg:p-9">
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-emerald-50 ring-1 ring-white/20 backdrop-blur">
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
                <span className="text-sm font-semibold tracking-tight text-white drop-shadow">
                  Plataforma Inmobiliaria
                </span>
              </div>
            </header>

            <div className="max-w-md">
              <motion.p
                initial={false}
                animate={{ opacity: isLightOn ? 1 : 0.75 }}
                className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Encuentra tu próximo hogar
              </motion.p>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-sm sm:text-3xl">
                Tu próximo hogar empieza aquí.
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
                Enciende la lámpara, entra a tu cuenta y administra tus propiedades desde un solo
                lugar.
              </p>
            </div>
          </div>
        </section>

        <section className="relative flex min-w-0 flex-col items-center justify-center bg-[#f7f2e8] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.9),transparent_45%)]" />
            <motion.div
              initial={false}
              animate={{ opacity: isLightOn ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-amber-300/35 to-transparent"
            />
            <motion.div
              initial={false}
              animate={{ opacity: authStatus === 'error' ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-red-400/30 to-transparent"
            />
            <div className="absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-emerald-700/5 blur-3xl" />
          </div>

          <span className="absolute top-5 right-5 z-10 hidden rounded-full border border-stone-300/70 bg-white/60 px-3 py-1.5 text-[11px] font-medium text-stone-500 backdrop-blur sm:inline-flex">
            Acceso seguro
          </span>

          <div className="relative z-10 w-full max-w-[25rem]">
            <AnimatePresence mode="wait" initial={false}>
              {isLightOn ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 26, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 18, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55, ease }}
                >
                  <LoginForm
                    isLightOn={isLightOn}
                    isPasswordFocused={isPasswordFocused}
                    authStatus={authStatus}
                    errorMessage={errorMessage}
                    onPasswordFocusChange={setIsPasswordFocused}
                    onSubmit={handleLogin}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[26px] border border-stone-200 bg-white p-7 text-center shadow-[0_24px_70px_rgba(41,37,36,0.12)] sm:p-8"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900 text-amber-200 shadow-lg shadow-emerald-900/20">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                      <path
                        d="M12 3v2M5 8l1.5 1.5M19 8l-1.5 1.5M8 14a4 4 0 1 1 8 0c0 1.2-.6 2-1.4 2.8-.5.5-.6.8-.6 1.2h-4c0-.4-.1-.7-.6-1.2C8.6 16 8 15.2 8 14ZM10 21h4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h2 className="mt-5 text-xl font-bold tracking-tight text-stone-900">
                    La casa está a oscuras
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Tira de la cuerda de la lámpara o pulsa el botón para iluminar la entrada y ver
                    el formulario.
                  </p>
                  <motion.button
                    type="button"
                    onClick={handleToggleLight}
                    whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-emerald-800"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path
                        d="M12 3v2M5 8l1.5 1.5M19 8l-1.5 1.5M8 14a4 4 0 1 1 8 0c0 1.2-.6 2-1.4 2.8-.5.5-.6.8-.6 1.2h-4c0-.4-.1-.7-.6-1.2C8.6 16 8 15.2 8 14ZM10 21h4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Encender la luz
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <footer className="relative z-10 mt-7 text-center text-[11px] text-stone-400">
            © 2026 Plataforma Inmobiliaria. Todos los derechos reservados.
          </footer>
        </section>
      </motion.div>
    </main>
  );
}
