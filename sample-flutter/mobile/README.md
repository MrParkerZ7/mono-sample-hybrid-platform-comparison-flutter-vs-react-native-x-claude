# Flutter Mobile App

Cross-platform mobile application built with Flutter and Dart.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | Dart 3.x |
| Framework | Flutter 3.19+ |
| State Management | BLoC + flutter_bloc |
| DI | get_it + injectable |
| Navigation | GoRouter |
| HTTP | Dio |
| Storage | Hive |

## Architecture: Clean Architecture

```
lib/
├── main.dart
├── app/
│   ├── app.dart
│   └── routes/
├── core/
│   ├── constants/
│   ├── errors/
│   ├── network/
│   ├── theme/
│   └── utils/
├── features/
│   └── [feature]/
│       ├── data/
│       │   ├── datasources/
│       │   ├── models/
│       │   └── repositories/
│       ├── domain/
│       │   ├── entities/
│       │   ├── repositories/
│       │   └── usecases/
│       └── presentation/
│           ├── bloc/
│           ├── pages/
│           └── widgets/
├── injection/
└── shared/
```

## Getting Started

```bash
# Install dependencies
flutter pub get

# Generate code
flutter pub run build_runner build --delete-conflicting-outputs

# Run app
flutter run
```

## Testing

```bash
flutter test                    # Run tests
flutter test --coverage         # With coverage
```

## Build

```bash
flutter build apk --release     # Android APK
flutter build appbundle         # Android Bundle
flutter build ios --release     # iOS
```

## API Configuration

Update `lib/core/constants/api_constants.dart`:

```dart
class ApiConstants {
  // Android Emulator
  static const String baseUrl = 'http://10.0.2.2:8080/api/v1';

  // iOS Simulator
  // static const String baseUrl = 'http://localhost:8080/api/v1';
}
```
