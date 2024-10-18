package com.example.demo.model;

public class Stock extends Product {
    private static int idCounter = 1; // Static counter for auto-increment
    private int quantity;

    public Stock() {}

    public Stock(int id, String productId, String name, String brand, String type, String color, int quantity, double price, String vendorId) {
        super((id != -1) ? id : idCounter++, productId, name, brand, type, color, price, vendorId);
        this.quantity = quantity;
    }

    @Override
    public void setId(int id) {
        super.setId((id != -1) ? id : idCounter++);
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
