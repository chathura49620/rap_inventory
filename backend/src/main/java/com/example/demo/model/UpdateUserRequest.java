package com.example.demo.model;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String email;
    private String firstname;
    private String lastname;
    private String role;
}
