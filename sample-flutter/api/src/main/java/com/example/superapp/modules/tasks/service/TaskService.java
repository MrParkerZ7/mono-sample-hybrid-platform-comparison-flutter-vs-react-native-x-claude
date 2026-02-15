package com.example.superapp.modules.tasks.service;

import com.example.superapp.modules.tasks.model.dto.TaskRequest;
import com.example.superapp.modules.tasks.model.dto.TaskResponse;
import com.example.superapp.modules.tasks.model.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {

    TaskResponse create(String userId, TaskRequest request);

    TaskResponse getById(String userId, String taskId);

    Page<TaskResponse> getAll(String userId, Task.Status status, Task.Category category, String search, Pageable pageable);

    TaskResponse update(String userId, String taskId, TaskRequest request);

    TaskResponse updateStatus(String userId, String taskId, Task.Status status);

    void delete(String userId, String taskId);
}
