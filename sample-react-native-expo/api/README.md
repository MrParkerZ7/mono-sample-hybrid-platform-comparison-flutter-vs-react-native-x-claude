# NestJS REST API

REST API backend for the React Native Expo mobile application.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript 5.x |
| Framework | NestJS 10.x |
| Database | MongoDB + Mongoose |
| Security | Passport.js + JWT |
| Documentation | Swagger (OpenAPI) |
| Testing | Jest + Supertest |

## Project Structure

```
src/
├── main.ts
├── app.module.ts
├── config/
│   ├── database.config.ts
│   └── jwt.config.ts
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   └── filters/
└── modules/
    ├── auth/
    │   ├── auth.module.ts
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   ├── dto/
    │   └── strategies/
    └── users/
        ├── users.module.ts
        ├── users.controller.ts
        ├── users.service.ts
        └── schemas/
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/users/me` | Current user |
| PATCH | `/api/v1/users/me` | Update user |

## Local Development

```bash
# Install dependencies
pnpm install

# Development mode
pnpm start:dev

# Production mode
pnpm build && pnpm start:prod

# With Docker
docker build -t react-native-api .
docker run -p 3000:3000 react-native-api
```

## Testing

```bash
pnpm test           # Unit tests
pnpm test:e2e       # E2E tests
pnpm test:cov       # Coverage report
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/react_native_db |
| JWT_SECRET | JWT signing key | - |
| JWT_EXPIRES_IN | Token expiry | 24h |
| JWT_REFRESH_EXPIRES_IN | Refresh expiry | 7d |
