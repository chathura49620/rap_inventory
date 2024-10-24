package com.example.demo.model;

public class Vendor {
    private String id;
    private String firstName;
    private String description;
    private String email;

    public Vendor(String id, String firstName, String description, String email) {
        this.id = id;
        this.firstName = firstName;
        this.description = description;
        this.email = email;
    }
     
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
