package com.example.demo.model;

import java.util.UUID;

public class RequestedItem {

    private int id;
    private int productId;
    private int vendorId;
    private String quantity;
    private String requestStatus;
    private String deliveryStatus;
    private String deliveryDate;

    // Constructor with parameters
    public RequestedItem(int id, int productId, int vendorId, String quantity, String requestStatus, String deliveryStatus, String deliveryDate) {
        this.id = id;
        this.productId = productId;
        this.vendorId = vendorId;
        this.quantity = quantity;
        this.requestStatus = requestStatus;
        this.deliveryStatus = deliveryStatus;
        this.deliveryDate = deliveryDate;
    }

    // Default constructor
    public RequestedItem() {}

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }

    public String getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(String deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}

