package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.demo.data.VendorDB;
import com.example.demo.model.Vendor;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/vendor")
public class VendorController {

    @Autowired
    private VendorDB vendorDB;

    private int currentId = 5; // Initial ID value based on existing vendor items

    // Get all vendors
    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorDB.getAllVendors();
    }

    // Add a new vendor (auto-increment id)
    @PostMapping
    public Vendor addVendor(@RequestBody Vendor vendor) {
        if (vendor.getId() == 0) {
            currentId++; // Increment the id if no id is provided
            vendor.setId(currentId);
        }
        return vendorDB.addVendor(vendor);
    }

    // Update an existing vendor
    @PutMapping("/{id}")
    public Vendor updateVendor(@PathVariable int id, @RequestBody Vendor vendor) {
        return vendorDB.updateVendor(id, vendor);
    }

    // Delete a vendor
    @DeleteMapping("/{id}")
    public boolean deleteVendor(@PathVariable int id) {
        return vendorDB.deleteVendor(id);
    }
}
