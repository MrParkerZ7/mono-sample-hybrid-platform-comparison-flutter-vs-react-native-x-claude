# Spring Boot REST API

REST API backend for the Flutter mobile application.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | Java 17 |
| Framework | Spring Boot 3.2.x |
| Database | MongoDB |
| Security | Spring Security + JWT |
| Documentation | SpringDoc OpenAPI |
| Testing | JUnit 5 + Mockito + Testcontainers |

## Project Structure

```
src/
├── main/java/com/example/api/
│   ├── Application.java
│   ├── config/
│   │   ├── MongoConfig.java
│   │   ├── SecurityConfig.java
│   │   └── SwaggerConfig.java
│   ├── common/
│   │   ├── constants/
│   │   ├── exceptions/
│   │   └── utils/
│   ├── security/
│   │   └── jwt/
│   └── modules/
│       ├── auth/
│       │   ├── controller/
│       │   ├── service/
│       │   ├── repository/
│       │   └── model/
│       └── user/
└── test/
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/users/me` | Current user |
| PUT | `/api/v1/users/me` | Update user |

## Local Development

```bash
# With Maven
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# With Docker
docker build -t flutter-api .
docker run -p 8080:8080 flutter-api
```

## Testing

```bash
mvn test                    # Unit tests
mvn verify -Pintegration    # Integration tests
mvn test jacoco:report      # Coverage report
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| SPRING_DATA_MONGODB_URI | MongoDB connection | mongodb://localhost:27017/flutter_db |
| JWT_SECRET | JWT signing key | - |
| JWT_EXPIRATION | Token expiry (ms) | 86400000 |
