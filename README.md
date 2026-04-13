# Vectoria

Simulador interativo de fenômenos físicos para universitários — construído com Next.js, Prisma, PostgreSQL e TailwindCSS, com autenticação OAuth via Google e GitHub.

> "A fronteira entre o rigor matemático e a visualização intuitiva."

---

## Visão geral

Vectoria é uma plataforma web educativa que permite explorar simulações de física ajustando parâmetros em tempo real via sliders, com as equações correspondentes atualizando ao vivo. A interface usa neumorfismo com suporte a modo claro e escuro.

A física roda inteiramente no frontend em TypeScript puro — sem engines externas. O backend (Next.js Route Handlers + Prisma) serve os metadados das simulações e persiste o progresso do utilizador.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend + Backend | Next.js 14 (App Router) + TypeScript |
| Estilização | TailwindCSS (tema neumórfico) |
| ORM | Prisma |
| Base de dados | PostgreSQL 16 |
| Autenticação | NextAuth.js v5 (Google + GitHub OAuth) |
| Infraestrutura | Docker + Docker Compose |

---

## Funcionalidades

- 15 simulações interativas em 5 áreas da física
- Sliders com atualização em tempo real da animação e das equações
- Autenticação OAuth com Google e GitHub
- Progresso do utilizador persistido por simulação
- Modo claro e escuro com design neumórfico
- API REST para áreas, simulações e progresso

---

## Áreas e simulações (Fase 1)

**Cinemática**
- Lançamento de projétil
- MRU e MRUV
- Queda livre

**Dinâmica**
- Plano inclinado
- Colisão 1D
- Força e atrito

**Ondas e oscilações**
- Pêndulo simples
- Onda transversal
- Interferência

**Óptica**
- Refração (Lei de Snell)
- Lente delgada
- Espelho côncavo/convexo

**Termodinâmica**
- Gás ideal (PV = nRT)
- Expansão isotérmica
- Condução de calor

---

## Estrutura do projeto

```
Vectoria/
├── docker-compose.yml
├── .env
├── Dockerfile
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
└── src/
    ├── lib/
    │   ├── prisma.ts          # singleton Prisma Client
    │   └── auth.ts            # configuração NextAuth
    │
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx           # home — lista de áreas
    │   ├── [area]/
    │   │   ├── page.tsx       # simulações da área
    │   │   └── [sim]/
    │   │       └── page.tsx   # página da simulação
    │   └── api/
    │       ├── auth/[...nextauth]/route.ts
    │       ├── areas/route.ts
    │       ├── simulations/route.ts
    │       ├── simulations/[id]/route.ts
    │       └── progress/route.ts
    │
    ├── components/
    │   ├── SimulationCanvas.tsx
    │   ├── SliderPanel.tsx
    │   └── EquationDisplay.tsx
    │
    └── simulations/           # física pura — TypeScript sem React
        ├── cinematica/
        ├── dinamica/
        ├── ondas/
        ├── optica/
        └── termodinamica/
```

---

## Schema do banco

O PostgreSQL armazena metadados — a física nunca vai para o banco.

```
User ──< Account        (OAuth providers)
User ──< Session        (NextAuth)
User ──< UserProgress ──< Simulation ──< Area
```

Tabelas de domínio: `Area`, `Simulation`, `UserProgress`  
Tabelas NextAuth (geradas pelo Prisma Adapter): `User`, `Account`, `Session`, `VerificationToken`

---

## API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/areas` | Lista todas as áreas publicadas |
| `GET` | `/api/simulations` | Lista simulações (filtra por `?areaId=`) |
| `GET` | `/api/simulations/:id` | Detalhes de uma simulação |
| `POST` | `/api/progress` | Salva parâmetros do utilizador (requer auth) |
| `GET/POST` | `/api/auth/[...nextauth]` | Endpoints NextAuth (OAuth) |

---

## Como rodar

### Pré-requisitos

- Docker e Docker Compose instalados
- Credenciais OAuth criadas no [Google Cloud Console](https://console.cloud.google.com) e no [GitHub Developer Settings](https://github.com/settings/developers)

### 1. Clonar e configurar variáveis de ambiente

```bash
git clone https://github.com/ShelbyEbo/Vectoria.git
cd Vectoria
cp .env.example .env
```

Preencher o `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/physim"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""        # gerar com: openssl rand -base64 32

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### 2. Subir os containers

```bash
docker compose up --build
```

### 3. Rodar migrations e seed

```bash
docker compose exec app npx prisma migrate dev --name init
docker compose exec app npx prisma db seed
```

### 4. Acessar

```
http://localhost:3000
```

---

## Desenvolvimento local (sem Docker)

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Requer PostgreSQL rodando localmente com `DATABASE_URL` configurado no `.env`.

---

## Adicionar uma nova simulação

1. Criar o arquivo de física em `src/simulations/<area>/nome.ts` com a função de cálculo
2. Adicionar o registro no `prisma/seed.ts`
3. Rodar `npx prisma db seed`

Nenhum componente existente precisa ser alterado.

---

## Adicionar uma nova área

1. Criar a pasta `src/simulations/<nova-area>/`
2. Adicionar a área e suas simulações no `prisma/seed.ts`
3. Rodar `npx prisma db seed`

As rotas `/[area]/[sim]` são dinâmicas — a nova área aparece automaticamente.

---

## Roadmap

**Fase 2**
- Dinâmica de rotação (torque, momento angular, pêndulo físico)
- Trabalho e energia (Hooke, conservação de energia)
- Eletrostática (Coulomb, campo elétrico, potencial)
- Eletrodinâmica (circuito RC, campo magnético, Faraday)

**Fase 3**
- Gravitação (órbitas de Kepler, velocidade de escape)
- Física moderna (efeito fotoelétrico, dilatação do tempo)

---
