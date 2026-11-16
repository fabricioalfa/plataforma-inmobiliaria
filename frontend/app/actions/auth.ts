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

export async function login(_prev: { error?: string } | void, formData: FormData) {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: 'Datos inválidos' };
  }

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    return { error: 'Credenciales inválidas' };
  }

  const { access_token } = (await res.json()) as { access_token: string };
  await setTokenCookie(access_token);
  redirect('/dashboard');
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
