# Plataforma Inmobiliaria

Login animado con Next.js + Framer Motion y API NestJS para gestión de propiedades.

## Estructura

```
plataforma-inmobiliaria/
├── backend/    # NestJS + Prisma + PostgreSQL
├── frontend/   # Next.js + Tailwind + Framer Motion
└── docker-compose.yml
```

- `frontend/app/login/page.tsx`: pantalla principal del login.
- `frontend/components/login/HouseIllustration.tsx`: casa SVG animada.
- `frontend/components/login/LoginForm.tsx`: formulario animado.
- `frontend/app/actions/auth.ts`: conexión con la API NestJS.

## Requisitos

- Node.js 20 o superior
- npm
- Docker y Docker Compose (opcional, recomendado)

## Opción 1: todo con Docker (más fácil)

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Abre [http://localhost:3000/login](http://localhost:3000/login).

Para detenerlo:

```bash
docker compose down
```

## Opción 2: manual (Windows, Linux o macOS)

### 1. Base de datos

Puedes levantar solo PostgreSQL con Docker:

```bash
docker compose up -d postgres
```

O usar un PostgreSQL local en el puerto `5432`.

### 2. Backend

Windows (PowerShell) y Linux/macOS:

```bash
cd backend
npm install
copy .env.example .env   # Windows
# cp .env.example .env   # Linux/macOS
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

La API queda en [http://localhost:3001](http://localhost:3001).

### 3. Frontend

En otra terminal:

```bash
cd frontend
npm install
```

Crea `frontend/.env.local` con:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
API_URL=http://localhost:3001
JWT_SECRET=dev-secret-change-in-production
```

Luego:

```bash
npm run dev
```

Abre [http://localhost:3000/login](http://localhost:3000/login).

## Scripts útiles

```bash
# Frontend
cd frontend
npm run dev
npm run lint
npm run build

# Backend
cd backend
npm run start:dev
npm run lint
npm test
```

## Regístrate primero

Si es la primera vez, entra a [http://localhost:3000/register](http://localhost:3000/register), crea una cuenta y luego inicia sesión.
