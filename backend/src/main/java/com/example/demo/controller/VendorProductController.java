package com.example.demo.controller;

import com.example.demo.data.VendorProductDB;
import com.example.demo.model.VendorProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vendor-product")
public class VendorProductController {

    @Autowired
    private VendorProductDB vendorProductDB;

    // Create and save new VendorProduct
    @PostMapping
    public ResponseEntity<?> create(@RequestBody VendorProduct vendorProduct) {
        if (vendorProduct == null) {
            return ResponseEntity.badRequest().body("VendorProduct data is empty");
        }
        vendorProductDB.addVendorProduct(vendorProduct);
        return ResponseEntity.ok().body("VendorProduct created successfully");
    }

    // Retrieve and return all vendorProducts
    @GetMapping
    public ResponseEntity<?> findAll() {
        if (!VendorProductDB.vendorProducts.isEmpty()) {
            return ResponseEntity.ok().body(VendorProductDB.vendorProducts);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    // Retrieve a single vendorProduct by id
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable int id) {
        Optional<VendorProduct> vendorProduct = vendorProductDB.getVendorProductById(id);
        if (vendorProduct.isPresent()) {
            return ResponseEntity.ok().body(vendorProduct.get());
        } else {
            return ResponseEntity.status(404).body("VendorProduct not found");
        }
    }

    // Update a vendorProduct by id
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody VendorProduct updatedProduct) {
        if (updatedProduct == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<VendorProduct> existingProductOpt = vendorProductDB.getVendorProductById(id);

        if (existingProductOpt.isPresent()) {
            VendorProduct existingProduct = existingProductOpt.get();
            existingProduct.setProductId(updatedProduct.getProductId());
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setBrand(updatedProduct.getBrand());
            existingProduct.setType(updatedProduct.getType());
            existingProduct.setColor(updatedProduct.getColor());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setVendorId(updatedProduct.getVendorId());

            vendorProductDB.updateVendorProduct(id, existingProduct);
            return ResponseEntity.ok().body("VendorProduct updated successfully");
        } else {
            return ResponseEntity.status(404).body("VendorProduct not found");
        }
    }

    // Delete a vendorProduct by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        boolean isDeleted = vendorProductDB.deleteVendorProduct(id);
        if (isDeleted) {
            return ResponseEntity.ok().body("VendorProduct deleted successfully");
        } else {
            return ResponseEntity.status(404).body("VendorProduct not found");
        }
    }
}
