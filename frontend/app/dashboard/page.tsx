import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from '@/app/actions/auth';

export const instant = false;

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let user: { id: string; name: string; email: string; role: string } | null = null;

  if (token) {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (res.ok) {
      user = (await res.json()) as { id: string; name: string; email: string; role: string };
    }
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-md bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
        <h1 className="text-2xl font-bold text-zinc-900">Panel de usuario</h1>
        <p className="text-zinc-600">
          Bienvenido, <span className="font-semibold">{user.name}</span> ({user.email})
        </p>
        <p className="text-zinc-500 text-sm">Rol: {user.role}</p>
        <form action={logout} className="mt-6">
          <button type="submit" className="text-zinc-600 hover:text-zinc-900 underline">
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
