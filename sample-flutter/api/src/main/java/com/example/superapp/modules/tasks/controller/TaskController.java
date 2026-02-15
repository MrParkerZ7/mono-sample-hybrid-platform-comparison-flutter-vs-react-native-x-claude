package com.example.superapp.modules.tasks.controller;

import com.example.superapp.common.dto.ApiResponse;
import com.example.superapp.common.dto.PageResponse;
import com.example.superapp.modules.tasks.model.dto.TaskRequest;
import com.example.superapp.modules.tasks.model.dto.TaskResponse;
import com.example.superapp.modules.tasks.model.entity.Task;
import com.example.superapp.modules.tasks.service.TaskService;
import com.example.superapp.modules.users.model.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@Tag(name = "Tasks", description = "Task management endpoints")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @Operation(summary = "Create a new task")
    public ResponseEntity<ApiResponse<TaskResponse>> create(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody TaskRequest request) {
        TaskResponse response = taskService.create(user.getId(), request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Task created successfully", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID")
    public ResponseEntity<ApiResponse<TaskResponse>> getById(
            @AuthenticationPrincipal User user,
            @PathVariable String id) {
        TaskResponse response = taskService.getById(user.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping
    @Operation(summary = "Get all tasks with filters")
    public ResponseEntity<ApiResponse<PageResponse<TaskResponse>>> getAll(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) Task.Status status,
            @RequestParam(required = false) Task.Category category,
            @RequestParam(required = false) String search,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<TaskResponse> tasks = taskService.getAll(user.getId(), status, category, search, pageable);
        return ResponseEntity.ok(ApiResponse.success(PageResponse.from(tasks)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update task")
    public ResponseEntity<ApiResponse<TaskResponse>> update(
            @AuthenticationPrincipal User user,
            @PathVariable String id,
            @Valid @RequestBody TaskRequest request) {
        TaskResponse response = taskService.update(user.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success("Task updated successfully", response));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update task status")
    public ResponseEntity<ApiResponse<TaskResponse>> updateStatus(
            @AuthenticationPrincipal User user,
            @PathVariable String id,
            @RequestParam Task.Status status) {
        TaskResponse response = taskService.updateStatus(user.getId(), id, status);
        return ResponseEntity.ok(ApiResponse.success("Task status updated", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task")
    public ResponseEntity<ApiResponse<Void>> delete(
            @AuthenticationPrincipal User user,
            @PathVariable String id) {
        taskService.delete(user.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Task deleted successfully"));
    }
}
