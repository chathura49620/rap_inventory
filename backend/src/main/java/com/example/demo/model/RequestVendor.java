package com.example.demo.model;

public class RequestVendor {

    private static int idCounter = 1; // Static counter for auto-increment

    private int id;
    private String productId;
    private String vendorId;
    private int quantity;
    private String requestStatus;
    private String deliveryStatus;
    private String deliveryDate;

    // Constructor with parameters
    public RequestVendor(int id, String productId, String vendorId, int quantity, String requestStatus, String deliveryStatus, String deliveryDate) {
        this.id = (id != -1) ? id : idCounter++;
        this.productId = productId;
        this.vendorId = vendorId;
        this.quantity = quantity;
        this.requestStatus = requestStatus;
        this.deliveryStatus = deliveryStatus;
        this.deliveryDate = deliveryDate;
    }

    // Default constructor
    public RequestVendor() {}

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = (id != -1) ? id : idCounter++;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
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

