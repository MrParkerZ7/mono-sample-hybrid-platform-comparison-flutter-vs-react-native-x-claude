package com.example.superapp.modules.events.repository;

import com.example.superapp.modules.events.model.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    Page<Event> findByUserId(String userId, Pageable pageable);

    Optional<Event> findByIdAndUserId(String id, String userId);

    @Query("{ 'startDate': { $gte: ?0, $lte: ?1 } }")
    Page<Event> findByDateRange(LocalDateTime start, LocalDateTime end, Pageable pageable);

    Page<Event> findByStartDateGreaterThanEqualOrderByStartDateAsc(LocalDateTime date, Pageable pageable);

    @Query("{ 'location.lat': { $gte: ?0, $lte: ?1 }, 'location.lng': { $gte: ?2, $lte: ?3 }, 'startDate': { $gte: ?4 } }")
    List<Event> findEventsInBounds(double minLat, double maxLat, double minLng, double maxLng, LocalDateTime after);
}
