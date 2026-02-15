package com.example.superapp.modules.auth.service;

import com.example.superapp.modules.auth.model.dto.*;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(RefreshTokenRequest request);
}
