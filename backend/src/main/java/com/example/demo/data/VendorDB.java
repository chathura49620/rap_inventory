package com.example.demo.data;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import com.example.demo.model.Vendor;

@Component
public class VendorDB extends AbstractDB<Vendor> {

    // Static instance for Singleton
    private static VendorDB instance;

    // Constructor to initialize with 5 vendor objects
    public VendorDB() {
        super();
        items.add(new Vendor("J01", "John", "Electronics vendor", "john@example.com"));
        items.add(new Vendor("A01", "Alice", "Footwear vendor", "alice@example.com"));
        items.add(new Vendor("R01", "Robert", "Apparel vendor", "robert@example.com"));
        items.add(new Vendor("S01", "Sophia", "Accessories vendor", "sophia@example.com"));
        items.add(new Vendor("M01", "Michael", "General vendor", "michael@example.com"));
    }

    // Public static method to provide access to the single instance
    public static VendorDB getInstance() {
        if (instance == null) {
            synchronized (VendorDB.class) {
                if (instance == null) {
                    instance = new VendorDB();
                }
            }
        }
        return instance;
    }

    // Method to return all vendors
    public List<Vendor> getAllVendors() {
        return items;
    }

    // Method to add a new vendor (assuming id is already provided from the controller)
    public Vendor addVendor(Vendor vendor) {
        items.add(vendor);
        return vendor;
    }

    // Method to update an existing vendor by id
    public Vendor updateVendor(Integer integer, Vendor updatedVendor) {
        Optional<Vendor> vendorOpt = items.stream().filter(v -> v.getId().equals(integer)).findFirst();

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
        return items.removeIf(vendor -> vendor.getId().equals(id));
    }

    @Override
    public Optional<Vendor> getById(int string) {
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }


}


