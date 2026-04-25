package com.example.jwtauthdemo.model;

/**
 * Response body for the /auth/login endpoint.
 * Contains the JWT token on successful authentication.
 */
public class LoginResponse {

    private String token;

    public LoginResponse() {
    }

    public LoginResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
