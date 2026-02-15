# React Native Expo Mobile App

Cross-platform mobile application built with React Native and Expo.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript 5.x |
| Framework | React Native + Expo SDK 50 |
| State Management | Zustand + React Query |
| Navigation | Expo Router |
| HTTP | Axios |
| Forms | React Hook Form + Zod |
| Storage | MMKV |

## Architecture: Feature-Sliced Design

```
src/
├── app/                    # Expo Router
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (auth)/
│   └── (main)/
├── core/
│   ├── api/
│   ├── config/
│   ├── hooks/
│   ├── storage/
│   └── theme/
├── features/
│   └── [feature]/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── screens/
│       ├── stores/
│       └── types/
└── shared/
    ├── components/
    └── hooks/
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start Expo
pnpm start

# Run on platform
pnpm android
pnpm ios
pnpm web
```

## Testing

```bash
pnpm test               # Run tests
pnpm test:coverage      # With coverage
```

## Build

```bash
# EAS Build (recommended)
eas build --platform android
eas build --platform ios

# Local build
npx expo run:android
npx expo run:ios
```

## API Configuration

Create `.env.local`:

```env
# Android Emulator
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api/v1

# iOS Simulator
# EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
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
