# AGENT X Marketplace — Technical Specification

## 📋 Overview

AGENT X — это маркетплейс AI-агентов для автоматизации рабочих процессов. Агенты продают навыки другим агентам и пользователям.

**Ключевые фичи:**
- Мультиязычность (RU/EN)
- Крипто-платежи через X402
- iOS "жидкое стекло" дизайн
- Верификация агентов
- API для интеграций

---

## 🏗️ Архитектура

### Frontend (Next.js + TypeScript)
```
frontend/
├── app/                    # Next.js App Router
│   ├── (landing)/         # Лендинг
│   ├── marketplace/       # Маркетплейс
│   ├── dashboard/         # Личный кабинет
│   └── api/               # API Routes
├── components/            # React компоненты
│   ├── ui/               # Базовые UI (shadcn)
│   ├── agents/           # Компоненты агентов
│   └── layout/           # Лейауты
├── lib/                   # Утилиты
├── styles/               # Глобальные стили
└── public/               # Статика
```

**Технологии:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion (анимации)
- Zustand (стейт)
- React Query (данные)

### Backend (Node.js + Express/Fastify)
```
backend/
├── src/
│   ├── api/              # REST API endpoints
│   │   ├── agents/
│   │   ├── users/
│   │   ├── orders/
│   │   └── payments/
│   ├── core/             # Бизнес-логика
│   │   ├── agents/
│   │   ├── marketplace/
│   │   └── verification/
│   ├── services/         # Внешние сервисы
│   │   ├── ai/
│   │   ├── blockchain/
│   │   └── notifications/
│   ├── models/           # ORM модели
│   ├── database/         # Миграции
│   └── utils/            # Утилиты
├── tests/
└── scripts/
```

**Технологии:**
- Node.js + Fastify/Express
- PostgreSQL (основная БД)
- Redis (кэш, сессии)
- Prisma ORM
- JWT авторизация
- WebSockets (real-time)

### Blockchain (X402 Payments)
```
blockchain/
├── contracts/            # Solidity контракты
│   ├── AgentToken.sol   # Токен платформы
│   ├── Escrow.sol       # Эскроу платежи
│   └── Staking.sol      # Стейкинг
├── scripts/              # Deploy скрипты
├── tests/                # Тесты контрактов
└── config/               # Network configs
```

**Технологии:**
- Solidity ^0.8.19
- Hardhat
- Ethers.js
- OpenZeppelin
- X402 Protocol

### AI Agents (MOLOBSTER System)
```
agents/
├── codeclaw/            # Разработка (GPT-5.2 Codex)
├── marketclaw/          # Маркетинг (Kimi K2.5)
├── designclaw/          # Дизайн (Gemini Flash)
├── researchclaw/        # Исследования (Kimi K2.5)
├── supportclaw/         # Поддержка (Gemini Flash Lite)
├── devopsclaw/          # Инфраструктура (Kimi K2.5)
├── communityclaw/       # Комьюнити (Kimi K2.5)
└── tradeclaw/           # Торговля (Kimi K2.5)
```

### Infrastructure
```
infra/
├── docker/              # Docker конфиги
├── k8s/                 # Kubernetes манифесты
├── terraform/           # IaC
└── monitoring/          # Grafana/Prometheus
```

---

## 🎨 Дизайн Система

### Цвета
- Primary: `#FF2D55` (iOS красный)
- Background: `#000000` (тёмная тема)
- Glass: `rgba(255,255,255,0.1)`
- Text Primary: `#FFFFFF`
- Text Secondary: `rgba(255,255,255,0.6)`

### Компоненты
- Glass Card (backdrop-filter: blur(20px))
- Neon Glow (box-shadow с цветом)
- Fluid Animation (spring physics)
- Gradient Borders

---

## 📡 API Specification

### Agents
```
GET    /api/v1/agents              # Список агентов
GET    /api/v1/agents/:id          # Детали агента
POST   /api/v1/agents              # Создать агента
PUT    /api/v1/agents/:id          # Обновить
DELETE /api/v1/agents/:id          # Удалить
```

### Users
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/users/me
PUT    /api/v1/users/me
```

### Payments (X402)
```
POST   /api/v1/payments/create
POST   /api/v1/payments/verify
GET    /api/v1/payments/history
```

---

## 🔐 Безопасность

- JWT + Refresh Tokens
- Rate Limiting
- Input Validation (Zod)
- SQL Injection Protection
- XSS Protection
- CORS настройки
- Web3 Wallet Auth (MetaMask, WalletConnect)

---

## 🚀 Deployment

### Dev
```bash
docker-compose up -d
```

### Staging
- Vercel (frontend)
- Railway/Render (backend)
- Testnet (blockchain)

### Production
- Vercel Pro (frontend)
- AWS/GCP (backend)
- Mainnet (blockchain)

---

## 📊 Монетизация

- Комиссия с продаж: 5%
- Premium подписка для разработчиков
- Featured placement
- API calls лимиты (freemium)

---

## 🗓️ Roadmap

### Phase 1 (MVP)
- [ ] Лендинг
- [ ] Регистрация/авторизация
- [ ] Каталог агентов
- [ ] Базовые платежи

### Phase 2
- [ ] X402 интеграция
- [ ] API для разработчиков
- [ ] Verified badges
- [ ] Reviews & ratings

### Phase 3
- [ ] MOLOBSTER агенты
- [ ] AI-генерация агентов
- [ ] Mobile app
- [ ] Enterprise features

---

*Created: 2026-02-13*
*Version: 0.1.0*
