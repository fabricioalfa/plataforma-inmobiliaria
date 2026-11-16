import type { Metadata } from 'next';
import { login } from '@/app/actions/auth';
import HouseIllustration from '@/components/login/HouseIllustration';
import LoginForm from '@/components/login/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar sesión | Plataforma Inmobiliaria',
  description: 'Accede a tu cuenta para gestionar propiedades en la plataforma inmobiliaria.',
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-emerald-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 h-[26rem] w-[26rem] rounded-full bg-amber-100/60 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 p-10 text-white lg:flex lg:flex-col lg:justify-between lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-50 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Bienes raíces, sin complicaciones
            </span>
          </div>

          <HouseIllustration className="relative mx-auto w-full max-w-md" />

          <div className="relative max-w-md">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              Tu próximo hogar empieza con un clic.
            </h2>
            <p className="mt-3 text-sm leading-6 text-emerald-100/80">
              Publica, administra y encuentra propiedades desde un solo lugar. Seguro, rápido y
              pensado para ti.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-emerald-50/90">
              {['Propiedades verificadas', 'Gestión centralizada', 'Soporte local'].map((feature) => (
                <span key={feature} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex justify-center lg:hidden">
              <HouseIllustration className="w-52" />
            </div>
            <LoginForm action={login} />
          </div>
        </section>
      </div>
    </main>
  );
}
