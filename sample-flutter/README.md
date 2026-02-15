# Sample Flutter Project - Super App

A complete **Super App** demo built with Flutter and Spring Boot API, featuring 7 integrated modules: Auth, Profile, Tasks, E-commerce, Social Feed, Notes, and Event Map.

## Tech Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| Mobile | Flutter 3.x (Dart) | Cross-platform mobile app |
| API | Spring Boot 3.2 (Java 17) | REST API backend |
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
│                       FLUTTER PROJECT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐                                          │
│   │  Flutter App    │                                          │
│   │  (mobile/)      │                                          │
│   │                 │                                          │
│   │  • Clean Arch   │                                          │
│   │  • BLoC Pattern │                                          │
│   │  • 7 Modules    │                                          │
│   └────────┬────────┘                                          │
│            │                                                    │
│            ▼                                                    │
│   ┌─────────────────┐         ┌─────────────────┐              │
│   │  Spring Boot    │────────▶│    MongoDB      │              │
│   │  API (api/)     │         │                 │              │
│   │                 │         │  Port: 27017    │              │
│   │  Port: 8080     │         │                 │              │
│   └─────────────────┘         └─────────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
sample-flutter/
├── README.md
├── docker-compose.yml
├── .env.example
│
├── mobile/                      # Flutter Mobile Application
│   ├── lib/
│   │   ├── main.dart
│   │   ├── app/
│   │   │   ├── app.dart
│   │   │   └── routes/
│   │   ├── core/
│   │   │   ├── constants/
│   │   │   ├── errors/
│   │   │   ├── network/
│   │   │   ├── theme/
│   │   │   └── utils/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── profile/
│   │   │   ├── tasks/
│   │   │   ├── shop/
│   │   │   ├── feed/
│   │   │   ├── notes/
│   │   │   └── events/
│   │   ├── injection/
│   │   └── shared/
│   ├── test/
│   ├── pubspec.yaml
│   └── analysis_options.yaml
│
├── api/                         # Spring Boot REST API
│   ├── src/main/java/com/example/
│   │   ├── Application.java
│   │   ├── config/
│   │   ├── common/
│   │   ├── security/
│   │   └── modules/
│   │       ├── auth/
│   │       ├── users/
│   │       ├── tasks/
│   │       ├── products/
│   │       ├── orders/
│   │       ├── posts/
│   │       ├── notes/
│   │       └── events/
│   ├── Dockerfile
│   └── pom.xml
│
└── docker/
    └── mongo-init/
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- (Optional) Flutter SDK 3.19+, Android Studio / Xcode

### Run with Docker

```bash
cd sample-flutter
cp .env.example .env
docker-compose up -d

# API: http://localhost:8080
# Swagger: http://localhost:8080/swagger-ui.html
```

### Run Flutter App

```bash
cd mobile
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
flutter run
```

## Mobile App (Flutter)

### Architecture: Clean Architecture + BLoC

```
features/
└── [feature]/
    ├── data/
    │   ├── datasources/
    │   ├── models/
    │   └── repositories/
    ├── domain/
    │   ├── entities/
    │   ├── repositories/
    │   └── usecases/
    └── presentation/
        ├── bloc/
        ├── pages/
        └── widgets/
```

### Key Dependencies

```yaml
dependencies:
  flutter_bloc: ^8.1.0           # State management
  get_it: ^7.6.0                 # Dependency injection
  injectable: ^2.3.0             # DI code generation
  go_router: ^13.0.0             # Navigation
  dio: ^5.4.0                    # HTTP client
  hive: ^2.2.0                   # Local storage
  google_maps_flutter: ^2.5.0    # Maps
  image_picker: ^1.0.0           # Image selection
  flutter_quill: ^9.0.0          # Rich text editor
  dartz: ^0.10.0                 # Functional programming
  equatable: ^2.0.0              # Value equality

dev_dependencies:
  flutter_test:
    sdk: flutter
  bloc_test: ^9.1.0
  mockito: ^5.4.0
  build_runner: ^2.4.0
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

## API (Spring Boot)

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

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.3.0</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>1.5.5.Final</version>
    </dependency>
</dependencies>
```

## Docker Services

| Service | Port | Description |
|---------|------|-------------|
| mongodb | 27017 | Database |
| api | 8080 | Spring Boot API |
| mongo-express | 8081 | DB Admin (optional) |

## Testing

```bash
# Flutter
cd mobile && flutter test --coverage

# Spring Boot
cd api && mvn test jacoco:report
```

## Environment Variables

```env
MONGODB_PORT=27017
MONGODB_ROOT_USERNAME=admin
MONGODB_ROOT_PASSWORD=admin123
MONGODB_DATABASE=flutter_db
API_PORT=8080
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRATION=86400000
```

## API Connection

```dart
// Android Emulator
const baseUrl = 'http://10.0.2.2:8080/api/v1';

// iOS Simulator
const baseUrl = 'http://localhost:8080/api/v1';

// Physical Device
const baseUrl = 'http://192.168.x.x:8080/api/v1';
```

## Related Documentation

- [Flutter Documentation](https://docs.flutter.dev/)
- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [BLoC Library](https://bloclibrary.dev/)
- [FEATURES.md](../FEATURES.md) - Detailed feature specification
