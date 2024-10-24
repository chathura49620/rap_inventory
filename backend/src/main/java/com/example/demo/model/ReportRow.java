package com.example.demo.model;

import java.time.LocalDateTime;

public class ReportRow {

    private String itemName;
    private String brand;
    private String type;
    private String color;
    private double price;
    private int quantity;
    private LocalDateTime date;

    // Constructor with all parameters
    public ReportRow(String itemName, String brand, String type, String color,
                     double price, int quantity, LocalDateTime date) {
        this.itemName = itemName;
        this.brand = brand;
        this.type = type;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
        this.date = date;
    }

    // Getters and Setters
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
