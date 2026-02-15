package com.example.superapp.modules.tasks.model.dto;

import com.example.superapp.modules.tasks.model.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {

    private String id;
    private String userId;
    private String title;
    private String description;
    private Task.Category category;
    private Task.Priority priority;
    private Task.Status status;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
