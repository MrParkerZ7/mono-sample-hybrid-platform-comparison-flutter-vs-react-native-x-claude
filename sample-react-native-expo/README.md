# Sample React Native Expo Project

A complete React Native Expo mobile application demo with NestJS API backend and MongoDB database. Run everything with a single `docker-compose up` command.

## Tech Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| Mobile | React Native Expo (TypeScript) | Cross-platform mobile app |
| API | NestJS 10.x (TypeScript) | REST API backend |
| Database | MongoDB 7.0 | NoSQL database |
| Container | Docker Compose | Orchestration |

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
│   │  • React Query  │                                          │
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
├── README.md                    # This file
├── docker-compose.yml           # Docker orchestration
├── .env.example                 # Environment variables template
│
├── mobile/                      # React Native Expo Application
│   ├── src/
│   │   ├── app/                 # Expo Router (file-based routing)
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── (auth)/
│   │   │   └── (main)/
│   │   ├── core/
│   │   │   ├── api/             # Axios client
│   │   │   ├── config/
│   │   │   ├── hooks/
│   │   │   ├── storage/         # MMKV
│   │   │   └── theme/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── api/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── screens/
│   │   │   │   ├── stores/
│   │   │   │   └── types/
│   │   │   ├── home/
│   │   │   └── profile/
│   │   └── shared/
│   │       ├── components/
│   │       └── hooks/
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
│   │   │   ├── decorators/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── filters/
│   │   └── modules/
│   │       ├── auth/
│   │       └── users/
│   ├── test/
│   ├── Dockerfile
│   └── package.json
│
└── docker/
    └── mongo-init/
        └── init-db.js
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- (Optional for mobile development):
  - Node.js 20.x LTS
  - pnpm / npm / yarn
  - Expo Go app (for physical device)
  - Android Studio / Xcode (for emulators)

### Run with Docker

```bash
# Navigate to project
cd sample-react-native-expo

# Copy environment file
cp .env.example .env

# Start all services (API + MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Service Endpoints

| Service | URL | Description |
|---------|-----|-------------|
| NestJS API | http://localhost:3000/api/v1 | REST API |
| Swagger UI | http://localhost:3000/api | API Documentation |
| MongoDB | mongodb://localhost:27018 | Database |
| Mongo Express | http://localhost:8082 | DB Admin (optional) |

### Run React Native App Locally

```bash
cd mobile

# Install dependencies
pnpm install

# Start Expo development server
pnpm start

# Run on specific platform
pnpm android
pnpm ios
pnpm web
```

## Mobile App (React Native Expo)

### Architecture: Feature-Sliced Design

```
features/
└── auth/
    ├── api/                     # API calls (React Query)
    │   └── auth.api.ts
    │
    ├── components/              # Feature UI components
    │   ├── LoginForm.tsx
    │   └── RegisterForm.tsx
    │
    ├── hooks/                   # Custom hooks
    │   ├── useLogin.ts
    │   └── useRegister.ts
    │
    ├── screens/                 # Screen components
    │   ├── LoginScreen.tsx
    │   └── RegisterScreen.tsx
    │
    ├── stores/                  # Zustand stores
    │   └── auth.store.ts
    │
    └── types/                   # TypeScript types
        └── auth.types.ts
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
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",

    "react-native-mmkv": "^2.11.0",
    "nativewind": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "jest": "^29.7.0",
    "@testing-library/react-native": "^12.4.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.0"
  }
}
```

### State Management

```typescript
// Zustand for global state
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '@/core/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);

// React Query for server state
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      login(data.user, data.accessToken);
    },
  });
};
```

### Testing

```bash
cd mobile

# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

## API (NestJS)

### Architecture: Modular Architecture

```
modules/
└── auth/
    ├── auth.module.ts           # Module definition
    ├── auth.controller.ts       # REST endpoints
    ├── auth.service.ts          # Business logic
    ├── strategies/              # Passport strategies
    │   └── jwt.strategy.ts
    ├── guards/                  # Auth guards
    │   └── jwt-auth.guard.ts
    ├── dto/                     # Data Transfer Objects
    │   ├── login.dto.ts
    │   └── register.dto.ts
    └── schemas/                 # Mongoose schemas
        └── user.schema.ts
```

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
  },
  "devDependencies": {
    "@nestjs/testing": "^10.0.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.0",
    "typescript": "^5.3.0"
  }
}
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/users/me` | Get current user |
| PATCH | `/api/v1/users/me` | Update current user |

### Testing

```bash
cd api

# Run all tests
pnpm test

# Run with coverage
pnpm test:cov

# E2E tests
pnpm test:e2e
```

## Docker Configuration

### docker-compose.yml Services

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| mongodb | mongo:7.0 | 27018 | Database |
| api | custom build | 3000 | NestJS API |
| mongo-express | mongo-express | 8082 | DB Admin UI (optional) |

### Environment Variables

```env
# MongoDB
MONGODB_PORT=27018
MONGODB_ROOT_USERNAME=admin
MONGODB_ROOT_PASSWORD=admin123
MONGODB_DATABASE=react_native_db

# API
API_PORT=3000
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Mongo Express (optional)
MONGO_EXPRESS_PORT=8082
```

## Development Workflow

### 1. Start Backend Services

```bash
docker-compose up -d mongodb api
```

### 2. Develop React Native App

```bash
cd mobile
pnpm start
```

### 3. Run Tests

```bash
# React Native tests
cd mobile && pnpm test

# API tests
cd api && pnpm test
```

### 4. Build for Production

```bash
cd mobile

# EAS Build (recommended)
eas build --platform android --profile production
eas build --platform ios --profile production

# Local build
npx expo run:android --variant release
npx expo run:ios --configuration Release
```

## Code Quality Standards

### TypeScript

- Strict mode enabled
- ESLint with TypeScript rules
- Prettier for formatting

### Mobile

- React Native Testing Library
- Jest for unit tests
- 80%+ coverage target

### API

- NestJS testing utilities
- Jest + Supertest for E2E
- 80%+ coverage target

## Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/core/*": ["src/core/*"],
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}
```

## Troubleshooting

### API Connection from Expo

```typescript
// Development with Expo Go
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

// Android Emulator
// EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api/v1

// iOS Simulator
// EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1

// Physical Device (use your machine's IP)
// EXPO_PUBLIC_API_URL=http://192.168.x.x:3000/api/v1
```

### Reset Database

```bash
docker-compose down -v
docker-compose up -d
```

### Clear Expo Cache

```bash
pnpm start --clear
# or
npx expo start --clear
```

## Related Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Query Documentation](https://tanstack.com/query/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
