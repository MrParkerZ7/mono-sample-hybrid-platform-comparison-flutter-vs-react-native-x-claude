# Sample Flutter Project

A complete Flutter mobile application demo with Spring Boot API backend and MongoDB database. Run everything with a single `docker-compose up` command.

## Tech Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| Mobile | Flutter 3.x (Dart) | Cross-platform mobile app |
| API | Spring Boot 3.2 (Java 17) | REST API backend |
| Database | MongoDB 7.0 | NoSQL database |
| Container | Docker Compose | Orchestration |

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
│   │  • Dio HTTP     │                                          │
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
├── README.md                    # This file
├── docker-compose.yml           # Docker orchestration
├── .env.example                 # Environment variables template
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
│   │   │   │   ├── data/
│   │   │   │   ├── domain/
│   │   │   │   └── presentation/
│   │   │   ├── home/
│   │   │   └── profile/
│   │   ├── injection/
│   │   └── shared/
│   ├── test/
│   ├── pubspec.yaml
│   └── analysis_options.yaml
│
├── api/                         # Spring Boot REST API
│   ├── src/
│   │   ├── main/java/com/example/
│   │   │   ├── Application.java
│   │   │   ├── config/
│   │   │   ├── common/
│   │   │   ├── security/
│   │   │   └── modules/
│   │   │       ├── auth/
│   │   │       └── user/
│   │   └── resources/
│   │       ├── application.yml
│   │       └── application-docker.yml
│   ├── Dockerfile
│   └── pom.xml
│
└── docker/
    └── mongo-init/
        └── init-db.js
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- (Optional for mobile development):
  - Flutter SDK 3.19+
  - Android Studio / Xcode

### Run with Docker

```bash
# Navigate to project
cd sample-flutter

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
| Spring Boot API | http://localhost:8080/api/v1 | REST API |
| Swagger UI | http://localhost:8080/swagger-ui.html | API Documentation |
| MongoDB | mongodb://localhost:27017 | Database |
| Mongo Express | http://localhost:8081 | DB Admin (optional) |

### Run Flutter App Locally

```bash
cd mobile

# Install dependencies
flutter pub get

# Generate code (injectable, json_serializable)
flutter pub run build_runner build --delete-conflicting-outputs

# Run on device/emulator
flutter run
```

## Mobile App (Flutter)

### Architecture: Clean Architecture + BLoC

```
features/
└── auth/
    ├── data/                    # Data Layer
    │   ├── datasources/         # API calls, local storage
    │   ├── models/              # DTOs, JSON serialization
    │   └── repositories/        # Repository implementations
    │
    ├── domain/                  # Domain Layer
    │   ├── entities/            # Business objects
    │   ├── repositories/        # Repository interfaces
    │   └── usecases/            # Business logic
    │
    └── presentation/            # Presentation Layer
        ├── bloc/                # BLoC state management
        ├── pages/               # Screens
        └── widgets/             # UI components
```

### Key Dependencies

```yaml
dependencies:
  # State Management
  flutter_bloc: ^8.1.0

  # Dependency Injection
  get_it: ^7.6.0
  injectable: ^2.3.0

  # Navigation
  go_router: ^13.0.0

  # Network
  dio: ^5.4.0

  # Local Storage
  hive: ^2.2.0
  hive_flutter: ^1.1.0

  # Utilities
  dartz: ^0.10.0           # Functional programming (Either)
  equatable: ^2.0.0        # Value equality
  json_annotation: ^4.8.0  # JSON serialization

dev_dependencies:
  flutter_test:
    sdk: flutter
  bloc_test: ^9.1.0
  mockito: ^5.4.0
  build_runner: ^2.4.0
  injectable_generator: ^2.4.0
  json_serializable: ^6.7.0
```

### Testing

```bash
cd mobile

# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Generate HTML report
genhtml coverage/lcov.info -o coverage/html
```

## API (Spring Boot)

### Architecture: Layered Architecture

```
modules/
└── auth/
    ├── controller/          # REST endpoints
    │   └── AuthController.java
    ├── service/             # Business logic
    │   ├── AuthService.java
    │   └── impl/
    ├── repository/          # Data access
    │   └── UserRepository.java
    └── model/
        ├── entity/          # MongoDB documents
        ├── dto/             # Request/Response DTOs
        └── mapper/          # Entity-DTO mappers
```

### Key Dependencies

```xml
<dependencies>
    <!-- Spring Boot -->
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
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>

    <!-- Swagger -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.3.0</version>
    </dependency>

    <!-- Utilities -->
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

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/users/me` | Get current user |
| PUT | `/api/v1/users/me` | Update current user |

### Testing

```bash
cd api

# Run all tests
mvn test

# Run with coverage
mvn test jacoco:report

# Integration tests
mvn verify -Pintegration-test
```

## Docker Configuration

### docker-compose.yml Services

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| mongodb | mongo:7.0 | 27017 | Database |
| api | custom build | 8080 | Spring Boot API |
| mongo-express | mongo-express | 8081 | DB Admin UI (optional) |

### Environment Variables

```env
# MongoDB
MONGODB_PORT=27017
MONGODB_ROOT_USERNAME=admin
MONGODB_ROOT_PASSWORD=admin123
MONGODB_DATABASE=flutter_db

# API
API_PORT=8080
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRATION=86400000

# Mongo Express (optional)
MONGO_EXPRESS_PORT=8081
```

## Development Workflow

### 1. Start Backend Services

```bash
docker-compose up -d mongodb api
```

### 2. Develop Flutter App

```bash
cd mobile
flutter run
```

### 3. Run Tests

```bash
# Flutter tests
cd mobile && flutter test

# API tests
cd api && mvn test
```

### 4. Build for Production

```bash
# Flutter APK
cd mobile && flutter build apk --release

# Flutter iOS
cd mobile && flutter build ios --release
```

## Code Quality Standards

### Flutter

- Analyzer rules in `analysis_options.yaml`
- Format with `dart format`
- Generate code with `build_runner`

### Java

- Checkstyle for code style
- JaCoCo for coverage (min 80%)
- SpotBugs for static analysis

## Troubleshooting

### API Connection from Emulator

```dart
// Android Emulator
const baseUrl = 'http://10.0.2.2:8080/api/v1';

// iOS Simulator
const baseUrl = 'http://localhost:8080/api/v1';

// Physical Device (use your machine's IP)
const baseUrl = 'http://192.168.x.x:8080/api/v1';
```

### Reset Database

```bash
docker-compose down -v
docker-compose up -d
```

## Related Documentation

- [Flutter Documentation](https://docs.flutter.dev/)
- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [BLoC Library](https://bloclibrary.dev/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
