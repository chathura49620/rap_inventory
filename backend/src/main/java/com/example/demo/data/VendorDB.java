package com.example.demo.data;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import com.example.demo.model.Vendor;

@Component
public class VendorDB {

    private List<Vendor> vendors;

    // Constructor to initialize with 5 vendor objects
    public VendorDB() {
        vendors = new ArrayList<>();

        // Adding 5 sample vendor objects
        vendors.add(new Vendor(1, "John", "Electronics vendor", "john@example.com"));
        vendors.add(new Vendor(2, "Alice", "Footwear vendor", "alice@example.com"));
        vendors.add(new Vendor(3, "Robert", "Apparel vendor", "robert@example.com"));
        vendors.add(new Vendor(4, "Sophia", "Accessories vendor", "sophia@example.com"));
        vendors.add(new Vendor(5, "Michael", "General vendor", "michael@example.com"));
    }

    // Method to return all vendors
    public List<Vendor> getAllVendors() {
        return vendors;
    }

    // Method to add a new vendor (assuming id is already provided from the controller)
    public Vendor addVendor(Vendor vendor) {
        vendors.add(vendor);
        return vendor;
    }

    // Method to update an existing vendor by id
    public Vendor updateVendor(int id, Vendor updatedVendor) {
        Optional<Vendor> vendorOpt = vendors.stream().filter(v -> v.getId() == id).findFirst();

        if (vendorOpt.isPresent()) {
            Vendor vendor = vendorOpt.get();
            vendor.setFirstName(updatedVendor.getFirstName());
            vendor.setDescription(updatedVendor.getDescription());
            vendor.setEmail(updatedVendor.getEmail());
            return vendor;
        } else {
            // If no vendor with the given id is found, return null or handle the case appropriately
            return null;
        }
    }

    // Method to delete a vendor by id
    public boolean deleteVendor(int id) {
        return vendors.removeIf(vendor -> vendor.getId() == id);
    }
}

