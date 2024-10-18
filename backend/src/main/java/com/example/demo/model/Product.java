package com.example.demo.model;

public class Product {
    private int id;
    private String productId;
    private String name;
    private String brand;
    private String type;
    private String color;
    private double price;
    private String vendorId;

    public Product() {}

    public Product(int id, String productId, String name, String brand, String type, String color, double price, String vendorId) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.brand = brand;
        this.type = type;
        this.color = color;
        this.price = price;
        this.vendorId = vendorId;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }
}

