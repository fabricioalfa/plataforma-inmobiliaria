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
      ? { scale: 1.045, opacity: 0.75 }
      : { scale: 1, opacity: 1 };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04110d] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ opacity: isLightOn ? 0.9 : 0.3 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-[34%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/20 blur-[140px]"
        />
        <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <motion.div
        animate={sceneAnimation}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-4 pb-10 pt-6 sm:px-6 sm:pt-8"
      >
        <header className="flex w-full max-w-3xl items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-300/20">
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
            <span className="text-sm font-semibold tracking-tight text-emerald-50">
              Plataforma Inmobiliaria
            </span>
          </div>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-emerald-100/80 backdrop-blur">
            Acceso seguro
          </span>
        </header>

        <div className="relative flex w-full max-w-3xl flex-1 flex-col items-center">
          <HouseIllustration
            className="w-full max-w-[44rem]"
            isLightOn={isLightOn}
            isPasswordFocused={isPasswordFocused}
            authStatus={authStatus}
            onToggleLight={handleToggleLight}
          />

          <div className="relative z-10 -mt-14 flex min-h-[27rem] w-full max-w-[26rem] flex-col justify-start sm:-mt-20">
            <AnimatePresence mode="wait" initial={false}>
              {isLightOn ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
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
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-1 flex-col items-center justify-center pb-10 text-center"
                >
                  <motion.button
                    type="button"
                    onClick={handleToggleLight}
                    animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-medium text-emerald-100 backdrop-blur transition-colors hover:border-emerald-300/40 hover:bg-emerald-400/15"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path
                        d="M12 3v2M5 8l1.5 1.5M19 8l-1.5 1.5M8 14a4 4 0 1 1 8 0c0 1.2-.6 2-1.4 2.8-.5.5-.6.8-.6 1.2h-4c0-.4-.1-.7-.6-1.2C8.6 16 8 15.2 8 14ZM10 21h4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Tira de la cuerda para entrar
                  </motion.button>
                  <p className="mt-3 max-w-xs text-xs leading-5 text-emerald-100/50">
                    La casa está a oscuras. Enciende la lámpara para ver el formulario.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <footer className="mt-4 text-center text-[11px] text-emerald-100/35">
          Un espacio seguro para encontrar y administrar tu próximo hogar.
        </footer>
      </motion.div>
    </main>
  );
}
