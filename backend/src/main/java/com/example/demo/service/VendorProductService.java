package com.example.demo.service;

import com.example.demo.data.VendorProductDB;
import com.example.demo.model.VendorProduct;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorProductService {

    // StockDB is a singleton
    private VendorProductDB vendorProductDB = VendorProductDB.getInstance();

    public ResponseEntity<?> create(VendorProduct vendorProduct) {
        if (vendorProduct == null) {
            return ResponseEntity.badRequest().body("Stock data is empty");
        }
        vendorProductDB.addVendorProduct(vendorProduct);
        return ResponseEntity.ok().body("Stock item created successfully");
    }

    public ResponseEntity<?> findAll() {
        List<VendorProduct> vendorProducts = vendorProductDB.getAllItems();
        if (!vendorProducts.isEmpty()) {
            return ResponseEntity.ok().body(vendorProducts);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    public ResponseEntity<?> update(VendorProduct updatedVendorProduct) {
        if (updatedVendorProduct == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<VendorProduct> existingVendorProductOpt = vendorProductDB.getById(updatedVendorProduct.getId());

        if (existingVendorProductOpt.isPresent()) {
            VendorProduct existingVendorProduct = existingVendorProductOpt.get();
            existingVendorProduct.setProductId(updatedVendorProduct.getProductId());
            existingVendorProduct.setName(updatedVendorProduct.getName());
            existingVendorProduct.setBrand(updatedVendorProduct.getBrand());
            existingVendorProduct.setType(updatedVendorProduct.getType());
            existingVendorProduct.setColor(updatedVendorProduct.getColor());
            existingVendorProduct.setPrice(updatedVendorProduct.getPrice());
            existingVendorProduct.setVendorId(updatedVendorProduct.getVendorId());

            vendorProductDB.updateVendorProduct(updatedVendorProduct.getId(), existingVendorProduct);
            return ResponseEntity.ok().body("Stock item was updated successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }

    public ResponseEntity<?> delete(int id) {
        boolean isDeleted = vendorProductDB.deleteVendorProduct(id);

        if (isDeleted) {
            return ResponseEntity.ok().body("Stock item was deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }
}
