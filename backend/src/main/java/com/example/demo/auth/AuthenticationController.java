package com.example.demo.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserData;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // Proceed with registration if no conflict
            var response = service.register(request);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            // Handle email conflict
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }

     // Get all users
     @GetMapping("/users")
     public ResponseEntity<List<UserData>> getAllUsers() {
         var users = service.getAllUsers();
         return ResponseEntity.ok(users);
     }
 
    //  // Create a new user
    //  @PostMapping("/users")
    //  public ResponseEntity<?> createUser(@RequestBody UserData user) {
    //      service.createUser(user);
    //      return ResponseEntity.ok("User created successfully.");
    //  }
 
     // Update an existing user
     @PutMapping("/users/{id}")
     public ResponseEntity<?> updateUser(
         @PathVariable Long id, 
         @RequestBody UserData user
     ) {
         service.updateUser(id, user);
         return ResponseEntity.ok("User updated successfully.");
     }
 
     // Delete a user
     @DeleteMapping("/users/{id}")
     public ResponseEntity<?> deleteUser(@PathVariable String id) {
         service.deleteUser(id);
         return ResponseEntity.ok("User deleted successfully.");
     }
}
