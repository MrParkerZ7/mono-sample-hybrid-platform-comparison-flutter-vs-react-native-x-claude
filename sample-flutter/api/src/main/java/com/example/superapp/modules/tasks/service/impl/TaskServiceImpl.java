package com.example.superapp.modules.tasks.service.impl;

import com.example.superapp.common.exception.ResourceNotFoundException;
import com.example.superapp.modules.tasks.model.dto.TaskRequest;
import com.example.superapp.modules.tasks.model.dto.TaskResponse;
import com.example.superapp.modules.tasks.model.entity.Task;
import com.example.superapp.modules.tasks.repository.TaskRepository;
import com.example.superapp.modules.tasks.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public TaskResponse create(String userId, TaskRequest request) {
        Task task = Task.builder()
                .userId(userId)
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory() != null ? request.getCategory() : Task.Category.OTHER)
                .priority(request.getPriority() != null ? request.getPriority() : Task.Priority.MEDIUM)
                .status(Task.Status.PENDING)
                .dueDate(request.getDueDate())
                .build();

        task = taskRepository.save(task);
        log.info("Task created: {} for user: {}", task.getId(), userId);
        return toResponse(task);
    }

    @Override
    public TaskResponse getById(String userId, String taskId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
        return toResponse(task);
    }

    @Override
    public Page<TaskResponse> getAll(String userId, Task.Status status, Task.Category category,
                                      String search, Pageable pageable) {
        List<Criteria> criteriaList = new ArrayList<>();
        criteriaList.add(Criteria.where("userId").is(userId));

        if (status != null) {
            criteriaList.add(Criteria.where("status").is(status));
        }
        if (category != null) {
            criteriaList.add(Criteria.where("category").is(category));
        }
        if (search != null && !search.isBlank()) {
            criteriaList.add(Criteria.where("title").regex(search, "i"));
        }

        Query query = new Query(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        query.with(pageable);

        List<Task> tasks = mongoTemplate.find(query, Task.class);
        long total = mongoTemplate.count(Query.of(query).limit(-1).skip(-1), Task.class);

        Page<Task> taskPage = PageableExecutionUtils.getPage(tasks, pageable, () -> total);
        return taskPage.map(this::toResponse);
    }

    @Override
    public TaskResponse update(String userId, String taskId, TaskRequest request) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getCategory() != null) {
            task.setCategory(request.getCategory());
        }
        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }
        task.setDueDate(request.getDueDate());

        task = taskRepository.save(task);
        log.info("Task updated: {}", taskId);
        return toResponse(task);
    }

    @Override
    public TaskResponse updateStatus(String userId, String taskId, Task.Status status) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        task.setStatus(status);
        task = taskRepository.save(task);
        log.info("Task status updated: {} to {}", taskId, status);
        return toResponse(task);
    }

    @Override
    public void delete(String userId, String taskId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
        taskRepository.delete(task);
        log.info("Task deleted: {}", taskId);
    }

    private TaskResponse toResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .userId(task.getUserId())
                .title(task.getTitle())
                .description(task.getDescription())
                .category(task.getCategory())
                .priority(task.getPriority())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
