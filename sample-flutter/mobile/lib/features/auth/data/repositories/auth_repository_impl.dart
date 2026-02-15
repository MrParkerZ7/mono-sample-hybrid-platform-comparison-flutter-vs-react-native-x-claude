import 'package:dartz/dartz.dart';
import 'package:hive/hive.dart';

import '../../../../core/constants/storage_keys.dart';
import '../../../../core/errors/exceptions.dart';
import '../../../../core/errors/failures.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_datasource.dart';
import '../models/user_model.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource _remoteDataSource;

  AuthRepositoryImpl(this._remoteDataSource);

  @override
  Future<Either<Failure, User>> login(String email, String password) async {
    try {
      final response = await _remoteDataSource.login(email, password);
      await _saveTokens(response.accessToken, response.refreshToken);
      await _saveUser(response.user);
      return Right(response.user);
    } on ServerException catch (e) {
      return Left(ServerFailure(e.message));
    } catch (e) {
      return const Left(UnknownFailure());
    }
  }

  @override
  Future<Either<Failure, User>> register(String name, String email, String password) async {
    try {
      final response = await _remoteDataSource.register(name, email, password);
      await _saveTokens(response.accessToken, response.refreshToken);
      await _saveUser(response.user);
      return Right(response.user);
    } on ServerException catch (e) {
      return Left(ServerFailure(e.message));
    } catch (e) {
      return const Left(UnknownFailure());
    }
  }

  @override
  Future<Either<Failure, User>> getCurrentUser() async {
    try {
      final user = await _remoteDataSource.getCurrentUser();
      await _saveUser(user);
      return Right(user);
    } on ServerException catch (e) {
      return Left(ServerFailure(e.message));
    } catch (e) {
      return const Left(UnknownFailure());
    }
  }

  @override
  Future<Either<Failure, void>> logout() async {
    try {
      final box = await Hive.openBox(StorageKeys.authBox);
      await box.clear();
      return const Right(null);
    } catch (e) {
      return const Left(CacheFailure());
    }
  }

  @override
  Future<bool> isLoggedIn() async {
    try {
      final box = await Hive.openBox(StorageKeys.authBox);
      final token = box.get(StorageKeys.accessToken);
      return token != null;
    } catch (e) {
      return false;
    }
  }

  Future<void> _saveTokens(String accessToken, String refreshToken) async {
    final box = await Hive.openBox(StorageKeys.authBox);
    await box.put(StorageKeys.accessToken, accessToken);
    await box.put(StorageKeys.refreshToken, refreshToken);
  }

  Future<void> _saveUser(UserModel user) async {
    final box = await Hive.openBox(StorageKeys.authBox);
    await box.put(StorageKeys.user, user.toJson());
  }
}
