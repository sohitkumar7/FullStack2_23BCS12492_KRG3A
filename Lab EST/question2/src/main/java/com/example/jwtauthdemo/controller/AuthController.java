package com.example.jwtauthdemo.controller;

import com.example.jwtauthdemo.config.JwtUtil;
import com.example.jwtauthdemo.model.LoginRequest;
import com.example.jwtauthdemo.model.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller for authentication endpoints.
 * Provides login functionality with hardcoded credentials.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    // Hardcoded credentials
    private static final String HARDCODED_USERNAME = "admin";
    private static final String HARDCODED_PASSWORD = "admin123";

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    /**
     * POST /auth/login
     * Accepts username and password in JSON body.
     * Returns a JWT token if credentials match the hardcoded values.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        // Validate credentials against hardcoded values
        if (HARDCODED_USERNAME.equals(loginRequest.getUsername())
                && HARDCODED_PASSWORD.equals(loginRequest.getPassword())) {

            String token = jwtUtil.generateToken(loginRequest.getUsername());
            return ResponseEntity.ok(new LoginResponse(token));
        }

        // Invalid credentials
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid username or password"));
    }
}
