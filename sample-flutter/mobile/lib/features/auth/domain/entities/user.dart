import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String id;
  final String email;
  final String name;
  final String? bio;
  final String? avatar;
  final int followersCount;
  final int followingCount;
  final DateTime? createdAt;

  const User({
    required this.id,
    required this.email,
    required this.name,
    this.bio,
    this.avatar,
    this.followersCount = 0,
    this.followingCount = 0,
    this.createdAt,
  });

  @override
  List<Object?> get props => [id, email, name, bio, avatar, followersCount, followingCount];
}
