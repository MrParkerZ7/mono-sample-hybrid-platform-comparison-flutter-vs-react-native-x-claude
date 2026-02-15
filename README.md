# Hybrid Mobile Platform Comparison: Flutter vs React Native

A comprehensive **Super App** demo project comparing **Flutter** and **React Native (Expo)** mobile development frameworks. Each platform is fully self-contained with its own API and database.

## Project Overview

This repository contains two independent demo projects implementing the same **Super App** with 7 feature modules:

| Project | Mobile | API | Database |
|---------|--------|-----|----------|
| sample-flutter | Flutter (Dart) | Spring Boot (Java 17) | MongoDB |
| sample-react-native-expo | React Native Expo (TypeScript) | NestJS (TypeScript) | MongoDB |

## Super App Features

Both apps implement identical features for fair comparison:

| Module | Features |
|--------|----------|
| **Authentication** | Register, Login, Logout, Password Reset, JWT Token |
| **Profile** | View/Edit Profile, Avatar Upload, Settings, View Other Users |
| **Task Management** | CRUD Tasks, Categories, Priority, Due Dates, Status, Filter/Search |
| **E-commerce** | Products, Categories, Cart, Checkout, Orders, Wishlist |
| **Social Feed** | Posts, Comments, Likes, Follow/Unfollow, Timeline, Explore |
| **Notes/Journal** | Rich Text Notes, Tags, Search, Pin/Favorite |
| **Event Map** | Create Events, Map Location, Duration, RSVP, Map View |

## App Navigation

```
┌─────────────────────────────────────────────────────────────┐
│                        SUPER APP                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │  Home  │ │  Feed  │ │  Map   │ │  Shop  │ │Profile │    │
│  │        │ │        │ │        │ │        │ │        │    │
│  │ Tasks  │ │ Posts  │ │ Events │ │Products│ │Settings│    │
│  │ Notes  │ │ Create │ │ Create │ │ Cart   │ │ Edit   │    │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │
│                                                              │
│              [ Bottom Tab Navigation ]                       │
│         [Home] [Feed] [Map] [Shop] [Profile]                │
└─────────────────────────────────────────────────────────────┘
```

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
├── FEATURES.md                         # Detailed feature specification
│
├── sample-flutter/                     # Flutter Demo Project
│   ├── README.md                       # Project documentation
│   ├── docker-compose.yml              # Docker orchestration
│   ├── .env.example                    # Environment template
│   │
│   ├── mobile/                         # Flutter mobile app
│   │   ├── lib/
│   │   │   ├── core/                   # Core utilities
│   │   │   ├── features/               # Feature modules
│   │   │   │   ├── auth/
│   │   │   │   ├── profile/
│   │   │   │   ├── tasks/
│   │   │   │   ├── shop/
│   │   │   │   ├── feed/
│   │   │   │   ├── notes/
│   │   │   │   └── events/
│   │   │   └── shared/
│   │   ├── test/
│   │   └── pubspec.yaml
│   │
│   ├── api/                            # Spring Boot REST API
│   │   ├── src/main/java/.../modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── tasks/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── posts/
│   │   │   ├── notes/
│   │   │   └── events/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   └── docker/
│       └── mongo-init/
│
└── sample-react-native-expo/           # React Native Demo Project
    ├── README.md                       # Project documentation
    ├── docker-compose.yml              # Docker orchestration
    ├── .env.example                    # Environment template
    │
    ├── mobile/                         # React Native Expo app
    │   ├── src/
    │   │   ├── app/                    # Expo Router
    │   │   ├── core/                   # Core utilities
    │   │   ├── features/               # Feature modules
    │   │   │   ├── auth/
    │   │   │   ├── profile/
    │   │   │   ├── tasks/
    │   │   │   ├── shop/
    │   │   │   ├── feed/
    │   │   │   ├── notes/
    │   │   │   └── events/
    │   │   └── shared/
    │   ├── __tests__/
    │   └── package.json
    │
    ├── api/                            # NestJS REST API
    │   ├── src/modules/
    │   │   ├── auth/
    │   │   ├── users/
    │   │   ├── tasks/
    │   │   ├── products/
    │   │   ├── orders/
    │   │   ├── posts/
    │   │   ├── notes/
    │   │   └── events/
    │   ├── test/
    │   ├── Dockerfile
    │   └── package.json
    │
    └── docker/
        └── mongo-init/
```

## Database Schema

```
MongoDB Collections:

users
├── _id, email, password, name, avatar, bio
├── createdAt, updatedAt

tasks
├── _id, userId, title, description, category
├── priority, status, dueDate
├── createdAt, updatedAt

products
├── _id, name, description, price, images[]
├── category, stock, rating
├── createdAt, updatedAt

orders
├── _id, userId, items[], totalAmount
├── status, shippingAddress
├── createdAt, updatedAt

posts
├── _id, userId, content, images[]
├── likes[], commentsCount
├── createdAt, updatedAt

comments
├── _id, postId, userId, content
├── createdAt

notes
├── _id, userId, title, content
├── tags[], isPinned, isFavorite
├── createdAt, updatedAt

events
├── _id, userId, title, description
├── location { lat, lng, address }
├── startDate, endDate
├── attendees[], interestedUsers[]
├── createdAt, updatedAt

follows
├── _id, followerId, followingId
├── createdAt
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

## Tech Comparison Matrix

| Feature | Flutter | React Native |
|---------|---------|--------------|
| **Language** | Dart | TypeScript |
| **State Management** | BLoC / flutter_bloc | Zustand + React Query |
| **Navigation** | GoRouter | Expo Router |
| **HTTP Client** | Dio | Axios |
| **Form Validation** | flutter_form_builder | React Hook Form + Zod |
| **Local Storage** | Hive | MMKV |
| **Dependency Injection** | get_it + injectable | tsyringe |
| **Map Integration** | google_maps_flutter | react-native-maps |
| **Image Picker** | image_picker | expo-image-picker |
| **Rich Text Editor** | flutter_quill | react-native-pell-rich-editor |
| **Testing** | flutter_test + mockito | Jest + Testing Library |
| **API Framework** | Spring Boot (Java 17) | NestJS (TypeScript) |
| **API Testing** | JUnit 5 + Testcontainers | Jest + Supertest |

## API Endpoints

Both APIs implement the same endpoints:

| Module | Endpoints |
|--------|-----------|
| **Auth** | POST `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` |
| **Users** | GET `/users/me`, PUT `/users/me`, GET `/users/:id` |
| **Tasks** | CRUD `/tasks`, GET `/tasks?status=&category=` |
| **Products** | GET `/products`, GET `/products/:id`, GET `/products?category=` |
| **Orders** | POST `/orders`, GET `/orders`, GET `/orders/:id` |
| **Posts** | CRUD `/posts`, POST `/posts/:id/like`, GET `/posts/feed` |
| **Comments** | CRUD `/posts/:postId/comments` |
| **Notes** | CRUD `/notes`, GET `/notes?tag=&search=` |
| **Events** | CRUD `/events`, GET `/events/map?lat=&lng=&radius=` |
| **Follows** | POST `/users/:id/follow`, DELETE `/users/:id/unfollow` |

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
