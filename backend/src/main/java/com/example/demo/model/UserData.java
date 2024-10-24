package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserData {
    private Long id;
    private String email;
    private String firstname;
    private String lastname;
    private String role;
    private String password;
}
