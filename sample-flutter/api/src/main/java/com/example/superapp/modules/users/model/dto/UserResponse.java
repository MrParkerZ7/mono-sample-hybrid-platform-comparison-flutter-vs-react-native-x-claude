package com.example.superapp.modules.users.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String id;
    private String email;
    private String name;
    private String bio;
    private String avatar;
    private int followersCount;
    private int followingCount;
    private LocalDateTime createdAt;
}
