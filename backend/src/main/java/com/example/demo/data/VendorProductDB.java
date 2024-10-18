package com.example.demo.data;

import com.example.demo.model.VendorProduct;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class VendorProductDB {

    public static List<VendorProduct> vendorProducts;

    // Constructor to initialize with some sample data
    public VendorProductDB() {
        vendorProducts = new ArrayList<>();
        vendorProducts.add(new VendorProduct(-1, "P001", "Laptop", "Dell", "Electronics", "Black", 999.99, "J01"));
        vendorProducts.add(new VendorProduct(-1, "P002", "Phone", "Samsung", "Electronics", "White", 799.99, "A01"));
        vendorProducts.add(new VendorProduct(-1, "P003", "Shoes", "Nike", "Footwear", "Red", 119.99, "R01"));
        vendorProducts.add(new VendorProduct(-1, "P004", "Shirt", "Adidas", "Apparel", "Blue", 49.99, "S01"));
        vendorProducts.add(new VendorProduct(-1, "P005", "Watch", "Apple", "Accessories", "Silver", 399.99, "M01"));
    }

    // Add a new vendorProduct
    public VendorProduct addVendorProduct(VendorProduct vendorProduct) {
        vendorProduct.setId(-1);
        vendorProducts.add(vendorProduct);
        return vendorProduct;
    }

    // Retrieve a vendorProduct by id
    public Optional<VendorProduct> getVendorProductById(int id) {
        return vendorProducts.stream().filter(vendorProduct -> vendorProduct.getId() == id).findFirst();
    }

    // Update an existing vendorProduct by id
    public VendorProduct updateVendorProduct(int id, VendorProduct updatedVendorProduct) {
        Optional<VendorProduct> vendorProductOpt = getVendorProductById(id);
        if (vendorProductOpt.isPresent()) {
            VendorProduct vendorProduct = vendorProductOpt.get();
            vendorProduct.setProductId(updatedVendorProduct.getProductId());
            vendorProduct.setName(updatedVendorProduct.getName());
            vendorProduct.setBrand(updatedVendorProduct.getBrand());
            vendorProduct.setType(updatedVendorProduct.getType());
            vendorProduct.setColor(updatedVendorProduct.getColor());
            vendorProduct.setPrice(updatedVendorProduct.getPrice());
            vendorProduct.setVendorId(updatedVendorProduct.getVendorId());
            return vendorProduct;
        } else {
            return null;
        }
    }

    // Delete a vendorProduct by id
    public boolean deleteVendorProduct(int id) {
        return vendorProducts.removeIf(vendorProduct -> vendorProduct.getId() == id);
    }
}
