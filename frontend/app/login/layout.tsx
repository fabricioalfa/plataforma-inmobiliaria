import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar sesión | Plataforma Inmobiliaria',
  description: 'Enciende la luz y accede a tu cuenta para gestionar propiedades.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
