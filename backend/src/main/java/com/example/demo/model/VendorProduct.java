package com.example.demo.model;

public class VendorProduct extends Product {

    private static int idCounter = 1; // Static counter for auto-increment

    public VendorProduct() {}

    public VendorProduct(int id, String productId, String name, String brand, String type, String color, double price, String vendorId) {
        super((id != -1) ? id : idCounter++, productId, name, brand, type, color, price, vendorId);
    }

    @Override
    public void setId(int id) {
        super.setId((id != -1) ? id : idCounter++);
    }
}

