'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

async function setTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
  });
}

type LoginInput = {
  email: string;
  password: string;
};

type LoginResult = { ok: true } | { ok: false; error: string };

export async function login(input: LoginInput): Promise<LoginResult> {
  const parsed = LoginSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: 'Ingresa un correo válido y una clave de al menos 6 caracteres.' };
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as
        | { message?: string | string[] }
        | null;
      const apiMessage = Array.isArray(body?.message) ? body.message[0] : body?.message;

      return {
        ok: false,
        error:
          res.status === 401
            ? 'Correo o contraseña incorrectos.'
            : (apiMessage ?? 'No se pudo iniciar sesión.'),
      };
    }

    const { access_token } = (await res.json()) as { access_token?: string };

    if (!access_token) {
      return { ok: false, error: 'El servidor devolvió una respuesta inválida.' };
    }

    await setTokenCookie(access_token);
    return { ok: true };
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servidor. Intenta de nuevo.' };
  }
}

export async function register(_prev: { error?: string }, formData: FormData) {
  const parsed = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: 'Datos inválidos' };
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { error: body?.message ?? 'No se pudo crear la cuenta' };
  }

  redirect('/login');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('token', '', { httpOnly: true, path: '/', maxAge: 0 });
  redirect('/login');
}
