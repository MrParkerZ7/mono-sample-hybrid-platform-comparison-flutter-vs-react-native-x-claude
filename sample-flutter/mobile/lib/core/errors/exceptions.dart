class ServerException implements Exception {
  final String message;
  final int? statusCode;

  ServerException({this.message = 'Server error', this.statusCode});
}

class NetworkException implements Exception {
  final String message;

  NetworkException({this.message = 'No internet connection'});
}

class CacheException implements Exception {
  final String message;

  CacheException({this.message = 'Cache error'});
}

class AuthException implements Exception {
  final String message;

  AuthException({this.message = 'Authentication failed'});
}

class ValidationException implements Exception {
  final String message;
  final Map<String, String>? errors;

  ValidationException({this.message = 'Validation failed', this.errors});
}
