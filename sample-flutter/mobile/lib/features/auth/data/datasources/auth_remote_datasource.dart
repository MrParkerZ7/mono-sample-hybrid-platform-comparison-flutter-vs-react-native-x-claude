import '../../../../core/constants/api_constants.dart';
import '../../../../core/errors/exceptions.dart';
import '../../../../core/network/dio_client.dart';
import '../models/auth_response_model.dart';
import '../models/user_model.dart';

abstract class AuthRemoteDataSource {
  Future<AuthResponseModel> login(String email, String password);
  Future<AuthResponseModel> register(String name, String email, String password);
  Future<AuthResponseModel> refreshToken(String refreshToken);
  Future<UserModel> getCurrentUser();
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final DioClient _client;

  AuthRemoteDataSourceImpl(this._client);

  @override
  Future<AuthResponseModel> login(String email, String password) async {
    try {
      final response = await _client.post(
        ApiConstants.login,
        data: {'email': email, 'password': password},
      );

      final data = response.data as Map<String, dynamic>;
      if (data['success'] == true) {
        return AuthResponseModel.fromJson(data['data'] as Map<String, dynamic>);
      } else {
        throw ServerException(message: data['message'] ?? 'Login failed');
      }
    } catch (e) {
      if (e is ServerException) rethrow;
      throw ServerException(message: 'Login failed');
    }
  }

  @override
  Future<AuthResponseModel> register(String name, String email, String password) async {
    try {
      final response = await _client.post(
        ApiConstants.register,
        data: {'name': name, 'email': email, 'password': password},
      );

      final data = response.data as Map<String, dynamic>;
      if (data['success'] == true) {
        return AuthResponseModel.fromJson(data['data'] as Map<String, dynamic>);
      } else {
        throw ServerException(message: data['message'] ?? 'Registration failed');
      }
    } catch (e) {
      if (e is ServerException) rethrow;
      throw ServerException(message: 'Registration failed');
    }
  }

  @override
  Future<AuthResponseModel> refreshToken(String refreshToken) async {
    try {
      final response = await _client.post(
        ApiConstants.refreshToken,
        data: {'refreshToken': refreshToken},
      );

      final data = response.data as Map<String, dynamic>;
      if (data['success'] == true) {
        return AuthResponseModel.fromJson(data['data'] as Map<String, dynamic>);
      } else {
        throw AuthException(message: 'Token refresh failed');
      }
    } catch (e) {
      throw AuthException(message: 'Token refresh failed');
    }
  }

  @override
  Future<UserModel> getCurrentUser() async {
    try {
      final response = await _client.get(ApiConstants.currentUser);

      final data = response.data as Map<String, dynamic>;
      if (data['success'] == true) {
        return UserModel.fromJson(data['data'] as Map<String, dynamic>);
      } else {
        throw ServerException(message: 'Failed to get user');
      }
    } catch (e) {
      throw ServerException(message: 'Failed to get user');
    }
  }
}
