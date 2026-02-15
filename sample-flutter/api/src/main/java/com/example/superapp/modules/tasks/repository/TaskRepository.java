package com.example.superapp.modules.tasks.repository;

import com.example.superapp.modules.tasks.model.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {

    Page<Task> findByUserId(String userId, Pageable pageable);

    List<Task> findByUserIdAndStatus(String userId, Task.Status status);

    List<Task> findByUserIdAndCategory(String userId, Task.Category category);

    Optional<Task> findByIdAndUserId(String id, String userId);

    @Query("{ 'userId': ?0, 'title': { $regex: ?1, $options: 'i' } }")
    Page<Task> searchByTitle(String userId, String keyword, Pageable pageable);

    void deleteByIdAndUserId(String id, String userId);
}
