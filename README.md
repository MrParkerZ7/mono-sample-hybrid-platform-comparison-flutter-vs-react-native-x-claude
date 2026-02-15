# Hybrid Mobile Platform Comparison: Flutter vs React Native

A comprehensive demo project comparing **Flutter** and **React Native (Expo)** mobile development frameworks. Each platform is fully self-contained with its own API and database.

## Project Overview

This repository contains two independent demo projects for comparing mobile development approaches:

| Project | Mobile | API | Database |
|---------|--------|-----|----------|
| sample-flutter | Flutter (Dart) | Spring Boot (Java 17) | MongoDB |
| sample-react-native-expo | React Native Expo (TypeScript) | NestJS (TypeScript) | MongoDB |

## Architecture

Each project is completely self-contained with its own `docker-compose.yml`:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SAMPLE-FLUTTER                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐        │
│   │  Flutter App    │───▶│  Spring Boot    │───▶│    MongoDB      │        │
│   │  (Dart)         │    │  API (Java 17)  │    │    Port: 27017  │        │
│   │                 │    │  Port: 8080     │    │                 │        │
│   └─────────────────┘    └─────────────────┘    └─────────────────┘        │
│                                                                             │
│   docker-compose up                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         SAMPLE-REACT-NATIVE-EXPO                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐        │
│   │  React Native   │───▶│  NestJS API     │───▶│    MongoDB      │        │
│   │  Expo (TS)      │    │  (TypeScript)   │    │    Port: 27018  │        │
│   │                 │    │  Port: 3000     │    │                 │        │
│   └─────────────────┘    └─────────────────┘    └─────────────────┘        │
│                                                                             │
│   docker-compose up                                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
mono-sample-hybrid-platform/
├── README.md                           # This file
│
├── sample-flutter/                     # Flutter Demo Project
│   ├── README.md                       # Project documentation
│   ├── docker-compose.yml              # Docker orchestration
│   ├── .env.example                    # Environment template
│   │
│   ├── mobile/                         # Flutter mobile app
│   │   ├── lib/
│   │   ├── test/
│   │   └── pubspec.yaml
│   │
│   ├── api/                            # Spring Boot REST API
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   └── docker/                         # Docker configurations
│       └── mongo-init/
│
└── sample-react-native-expo/           # React Native Demo Project
    ├── README.md                       # Project documentation
    ├── docker-compose.yml              # Docker orchestration
    ├── .env.example                    # Environment template
    │
    ├── mobile/                         # React Native Expo app
    │   ├── src/
    │   ├── __tests__/
    │   └── package.json
    │
    ├── api/                            # NestJS REST API
    │   ├── src/
    │   ├── test/
    │   ├── Dockerfile
    │   └── package.json
    │
    └── docker/                         # Docker configurations
        └── mongo-init/
```

## Quick Start

### Prerequisites

- Docker & Docker Compose

### Run Flutter Demo

```bash
cd sample-flutter
cp .env.example .env
docker-compose up -d

# API available at http://localhost:8080
# Swagger docs at http://localhost:8080/swagger-ui.html
```

### Run React Native Demo

```bash
cd sample-react-native-expo
cp .env.example .env
docker-compose up -d

# API available at http://localhost:3000
# Swagger docs at http://localhost:3000/api
```

## Feature Comparison Matrix

Both projects implement identical features for fair comparison:

| Feature | Flutter | React Native |
|---------|---------|--------------|
| **Language** | Dart | TypeScript |
| **State Management** | BLoC / Riverpod | Zustand / React Query |
| **Navigation** | GoRouter | Expo Router |
| **HTTP Client** | Dio | Axios |
| **Form Validation** | flutter_form_builder | React Hook Form + Zod |
| **Local Storage** | Hive | MMKV |
| **Dependency Injection** | get_it + injectable | tsyringe |
| **Testing** | flutter_test + mockito | Jest + Testing Library |
| **API Framework** | Spring Boot (Java) | NestJS (TypeScript) |
| **API Testing** | JUnit + Testcontainers | Jest + Supertest |

## Development Standards

### Code Quality

- **Linting**: ESLint, Flutter Analyzer, Checkstyle
- **Formatting**: Prettier, dart format, google-java-format
- **Type Safety**: Strict mode enabled in all projects

### Testing Strategy

| Layer | Type | Coverage Target |
|-------|------|-----------------|
| Mobile Apps | Unit Tests | 80%+ |
| Mobile Apps | Widget/Component Tests | 70%+ |
| APIs | Unit Tests | 80%+ |
| APIs | Integration Tests | 60%+ |

### Architecture Patterns

- **Flutter**: Clean Architecture + BLoC Pattern
- **React Native**: Feature-Sliced Design + Zustand
- **Spring Boot**: Layered Architecture (Controller → Service → Repository)
- **NestJS**: Modular Architecture with Dependency Injection

## Service Ports Summary

| Project | Service | Port |
|---------|---------|------|
| sample-flutter | Spring Boot API | 8080 |
| sample-flutter | MongoDB | 27017 |
| sample-flutter | Mongo Express (optional) | 8081 |
| sample-react-native-expo | NestJS API | 3000 |
| sample-react-native-expo | MongoDB | 27018 |
| sample-react-native-expo | Mongo Express (optional) | 8082 |

## Contributing

1. Follow the coding standards defined in each project's README
2. Write tests for new features
3. Ensure all tests pass before submitting PR
4. Follow conventional commit messages

## License

MIT License - See [LICENSE](LICENSE) for details
