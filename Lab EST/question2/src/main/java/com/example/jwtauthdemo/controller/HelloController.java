package com.example.jwtauthdemo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * A sample protected controller to demonstrate JWT authentication.
 * All endpoints here require a valid JWT token in the Authorization header.
 */
@RestController
public class HelloController {

    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hello! You are authenticated successfully.");
    }

    @GetMapping("/api/data")
    public Map<String, Object> getData() {
        return Map.of(
                "data", "This is protected data",
                "status", "success"
        );
    }
}
