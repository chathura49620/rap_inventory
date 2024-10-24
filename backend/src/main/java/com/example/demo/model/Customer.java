package com.example.demo.model;

public class Customer {
    private static int idCounter = 1; // Static counter for auto-increment
    private int id;
    private String first_name;
    private String last_name;
    private String billing_address;
    private String shipping_address;
    private String email;

    // Default constructor
    public Customer() {}

    // Parameterized constructor with auto-increment ID logic
    public Customer(int id, String first_name, String last_name, String billing_address, String shipping_address, String email) {
        this.id = (id != -1) ? id : idCounter++;  // Auto-increment ID if not provided
        this.first_name = first_name;
        this.last_name = last_name;
        this.billing_address = billing_address;
        this.shipping_address = shipping_address;
        this.email = email;
    }

    // Override setId to maintain auto-increment logic
    public void setId(int id) {
        this.id = (id != -1) ? id : idCounter++;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getBilling_address() {
        return billing_address;
    }

    public void setBilling_address(String billing_address) {
        this.billing_address = billing_address;
    }

    public String getShipping_address() {
        return shipping_address;
    }

    public void setShipping_address(String shipping_address) {
        this.shipping_address = shipping_address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
