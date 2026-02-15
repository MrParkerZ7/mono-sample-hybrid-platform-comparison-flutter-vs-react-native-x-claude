import 'package:dio/dio.dart';
import 'package:hive/hive.dart';

import '../constants/storage_keys.dart';

class AuthInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    // Skip auth header for public endpoints
    final publicPaths = ['/auth/login', '/auth/register', '/auth/refresh'];
    final isPublic = publicPaths.any((path) => options.path.contains(path));

    if (!isPublic) {
      try {
        final box = await Hive.openBox(StorageKeys.authBox);
        final token = box.get(StorageKeys.accessToken);

        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
      } catch (e) {
        // Handle error silently
      }
    }

    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      // Token expired - attempt refresh
      // This is a simplified version. In production, implement proper token refresh
      try {
        final box = await Hive.openBox(StorageKeys.authBox);
        await box.delete(StorageKeys.accessToken);
        await box.delete(StorageKeys.refreshToken);
        // Redirect to login would happen here via event bus or similar
      } catch (e) {
        // Handle error
      }
    }

    handler.next(err);
  }
}
