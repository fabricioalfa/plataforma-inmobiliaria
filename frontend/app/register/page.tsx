'use client'

import { useActionState } from 'react';
import { register } from '@/app/actions/auth';
import Link from 'next/link';

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, {
    error: undefined,
  } as { error: string | undefined });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-sm border border-zinc-200">
        <h2 className="text-2xl font-bold text-center text-zinc-900">Crear cuenta</h2>

        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 p-2 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 p-2 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 p-2 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 text-center">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-70"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-sm text-center text-zinc-600">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold text-zinc-900 underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
