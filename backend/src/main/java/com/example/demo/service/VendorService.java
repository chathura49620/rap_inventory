package com.example.demo.service;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.data.VendorDB;
import com.example.demo.model.Vendor;
@Service
public class VendorService {

    // StockDB is a singleton
    private VendorDB vendorDB = VendorDB.getInstance();

    public ResponseEntity<?> create(Vendor vendor) {
        if (vendor == null) {
            return ResponseEntity.badRequest().body("Stock data is empty");
        }
        vendorDB.addVendor(vendor);
        return ResponseEntity.ok().body("Stock item created successfully");
    }

    public ResponseEntity<?> findAll() {
        List<Vendor> stockItems = vendorDB.getAllVendors();
        if (!stockItems.isEmpty()) {
            return ResponseEntity.ok().body(stockItems);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    public ResponseEntity<?> update(Vendor updatedVendor) {
        return null;
    }

    public ResponseEntity<?> delete(int id) {
        boolean isDeleted = vendorDB.deleteVendor(id);

        if (isDeleted) {
            return ResponseEntity.ok().body("Stock item was deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }
    
}
