# Sample React Native Expo Project - Super App

A complete **Super App** demo built with React Native Expo and NestJS API, featuring 7 integrated modules: Auth, Profile, Tasks, E-commerce, Social Feed, Notes, and Event Map.

## Tech Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| Mobile | React Native Expo (TypeScript) | Cross-platform mobile app |
| API | NestJS 10.x (TypeScript) | REST API backend |
| Database | MongoDB 7.0 | NoSQL database |
| Container | Docker Compose | Orchestration |

## Features

| Module | Description |
|--------|-------------|
| **Authentication** | Register, Login, JWT, Password Reset |
| **Profile** | User profile, avatar upload, settings |
| **Task Management** | CRUD tasks, categories, priorities, due dates |
| **E-commerce** | Products, cart, checkout, orders, wishlist |
| **Social Feed** | Posts, comments, likes, follow/unfollow |
| **Notes/Journal** | Rich text notes, tags, pin, favorites |
| **Event Map** | Location-based events, map view, RSVP |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   REACT NATIVE EXPO PROJECT                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐                                          │
│   │  React Native   │                                          │
│   │  Expo (mobile/) │                                          │
│   │                 │                                          │
│   │  • Expo Router  │                                          │
│   │  • Zustand      │                                          │
│   │  • 7 Modules    │                                          │
│   └────────┬────────┘                                          │
│            │                                                    │
│            ▼                                                    │
│   ┌─────────────────┐         ┌─────────────────┐              │
│   │  NestJS API     │────────▶│    MongoDB      │              │
│   │  (api/)         │         │                 │              │
│   │                 │         │  Port: 27018    │              │
│   │  Port: 3000     │         │                 │              │
│   └─────────────────┘         └─────────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
sample-react-native-expo/
├── README.md
├── docker-compose.yml
├── .env.example
│
├── mobile/                      # React Native Expo Application
│   ├── src/
│   │   ├── app/                 # Expo Router
│   │   │   ├── _layout.tsx
│   │   │   ├── (auth)/
│   │   │   └── (tabs)/
│   │   ├── core/
│   │   │   ├── api/
│   │   │   ├── config/
│   │   │   ├── hooks/
│   │   │   ├── storage/
│   │   │   └── theme/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── profile/
│   │   │   ├── tasks/
│   │   │   ├── shop/
│   │   │   ├── feed/
│   │   │   ├── notes/
│   │   │   └── events/
│   │   └── shared/
│   ├── __tests__/
│   ├── package.json
│   └── tsconfig.json
│
├── api/                         # NestJS REST API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── config/
│   │   ├── common/
│   │   └── modules/
│   │       ├── auth/
│   │       ├── users/
│   │       ├── tasks/
│   │       ├── products/
│   │       ├── orders/
│   │       ├── posts/
│   │       ├── notes/
│   │       └── events/
│   ├── test/
│   ├── Dockerfile
│   └── package.json
│
└── docker/
    └── mongo-init/
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- (Optional) Node.js 20.x, pnpm, Expo Go app

### Run with Docker

```bash
cd sample-react-native-expo
cp .env.example .env
docker-compose up -d

# API: http://localhost:3000
# Swagger: http://localhost:3000/api
```

### Run React Native App

```bash
cd mobile
pnpm install
pnpm start

# Run on platform
pnpm android
pnpm ios
```

## Mobile App (React Native Expo)

### Architecture: Feature-Sliced Design

```
features/
└── [feature]/
    ├── api/           # API calls (React Query)
    ├── components/    # Feature UI
    ├── hooks/         # Custom hooks
    ├── screens/       # Screen components
    ├── stores/        # Zustand stores
    └── types/         # TypeScript types
```

### Key Dependencies

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.4.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.0",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.0",
    "react-native-maps": "^1.8.0",
    "expo-image-picker": "~14.7.0",
    "react-native-mmkv": "^2.11.0",
    "nativewind": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "jest": "^29.7.0",
    "@testing-library/react-native": "^12.4.0"
  }
}
```

### Navigation Structure

```
Bottom Tab Navigation:
├── Home (Tasks + Notes)
├── Feed (Social)
├── Map (Events)
├── Shop (E-commerce)
└── Profile (Settings)
```

## API (NestJS)

### Modules

| Module | Endpoints |
|--------|-----------|
| Auth | `/auth/register`, `/auth/login`, `/auth/refresh` |
| Users | `/users/me`, `/users/:id`, `/users/:id/follow` |
| Tasks | `/tasks` (CRUD), `/tasks?status=&category=` |
| Products | `/products`, `/products/:id`, `/products/categories` |
| Orders | `/orders`, `/orders/:id` |
| Cart | `/cart`, `/cart/items` |
| Posts | `/posts`, `/posts/:id/like`, `/posts/:id/comments` |
| Notes | `/notes`, `/notes/:id/pin`, `/notes/:id/favorite` |
| Events | `/events`, `/events/map`, `/events/:id/attend` |

### Key Dependencies

```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/mongoose": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/swagger": "^7.2.0",
    "mongoose": "^8.1.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1"
  }
}
```

## Docker Services

| Service | Port | Description |
|---------|------|-------------|
| mongodb | 27018 | Database |
| api | 3000 | NestJS API |
| mongo-express | 8082 | DB Admin (optional) |

## Testing

```bash
# React Native
cd mobile && pnpm test --coverage

# NestJS
cd api && pnpm test:cov
```

## Environment Variables

```env
MONGODB_PORT=27018
MONGODB_ROOT_USERNAME=admin
MONGODB_ROOT_PASSWORD=admin123
MONGODB_DATABASE=react_native_db
API_PORT=3000
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
```

## API Connection

```typescript
// .env.local for Expo

// Android Emulator
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api/v1

// iOS Simulator
EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1

// Physical Device
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000/api/v1
```

## Path Aliases

```json
{
  "@/*": ["src/*"],
  "@/core/*": ["src/core/*"],
  "@/features/*": ["src/features/*"],
  "@/shared/*": ["src/shared/*"]
}
```

## Related Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [FEATURES.md](../FEATURES.md) - Detailed feature specification
