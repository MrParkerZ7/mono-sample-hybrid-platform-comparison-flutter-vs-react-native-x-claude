package com.example.superapp.modules.posts.repository;

import com.example.superapp.modules.posts.model.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    Page<Post> findByUserId(String userId, Pageable pageable);

    @Query("{ 'userId': { $in: ?0 } }")
    Page<Post> findByUserIdIn(List<String> userIds, Pageable pageable);

    Optional<Post> findByIdAndUserId(String id, String userId);

    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
