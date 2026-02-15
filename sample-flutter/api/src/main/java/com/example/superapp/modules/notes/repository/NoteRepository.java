package com.example.superapp.modules.notes.repository;

import com.example.superapp.modules.notes.model.entity.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoteRepository extends MongoRepository<Note, String> {

    Page<Note> findByUserId(String userId, Pageable pageable);

    Page<Note> findByUserIdAndIsPinned(String userId, boolean isPinned, Pageable pageable);

    Page<Note> findByUserIdAndIsFavorite(String userId, boolean isFavorite, Pageable pageable);

    Optional<Note> findByIdAndUserId(String id, String userId);

    @Query("{ 'userId': ?0, 'tags': ?1 }")
    Page<Note> findByUserIdAndTag(String userId, String tag, Pageable pageable);

    @Query("{ 'userId': ?0, $or: [ { 'title': { $regex: ?1, $options: 'i' } }, { 'content': { $regex: ?1, $options: 'i' } } ] }")
    Page<Note> searchByUserIdAndKeyword(String userId, String keyword, Pageable pageable);
}
