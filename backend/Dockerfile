FROM node:24-alpine

WORKDIR /app

ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/plataforma_inmobiliaria

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate dev && npm run start:dev"]
