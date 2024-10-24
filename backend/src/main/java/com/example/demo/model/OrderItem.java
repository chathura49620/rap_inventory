package com.example.demo.model;

public class OrderItem {
    private int orderId;
    private String stockId;
    private int quantity;
    private String customerId;
    private String createdAt;
    private String status;

    // Default constructor
    public OrderItem() {}

    // Parameterized constructor
    public OrderItem(int orderId, String stockId, int quantity, String customerId, String createdAt, String status) {
        this.orderId = orderId;
        this.stockId = stockId;
        this.quantity = quantity;
        this.customerId = customerId;
        this.createdAt = createdAt;
        this.status = status;
    }

    // Getters and Setters
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
}
