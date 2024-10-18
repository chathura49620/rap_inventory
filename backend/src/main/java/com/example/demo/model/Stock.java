package com.example.demo.model;

public class Stock {
    private static int idCounter = 0; // Static counter for auto-increment
    private int id;
    private String name;
    private String brand;
    private String type;
    private String color;
    private int quantity;
    private double price;
    private String vendorId;

    public Stock() {}

    public Stock(Integer id, String name, String brand, String type, String color, int quantity, double price, String vendorId) {
        if (id == null) {
            this.id = ++idCounter;
        } else {
            this.id = id;
            idCounter = Math.max(idCounter, id);
        }
        this.name = name;
        this.brand = brand;
        this.type = type;
        this.color = color;
        this.quantity = quantity;
        this.price = price;
        this.vendorId = vendorId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
        idCounter = Math.max(idCounter, id);
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
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
