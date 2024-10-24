package com.example.demo.data;

import com.example.demo.model.VendorInvoice;

import java.util.List;
import java.util.Optional;

public class VendorInvoiceDB extends AbstractDB<VendorInvoice> {

    // Static instance for Singleton
    private static VendorInvoiceDB instance;

    // Private constructor to prevent instantiation from other classes
    private VendorInvoiceDB() {
        super();
        items.add(new VendorInvoice(01,"Req 01","3500","2024-10-24","2024-10-31","SENT TO CLIENT")); 
        // items.add(new VendorInvoice());
        // items.add(new VendorInvoice());
        // items.add(new VendorInvoice());
        // items.add(new VendorInvoice());
    }

    // Public static method to provide access to the single instance
    public static VendorInvoiceDB getInstance() {
        if (instance == null) {
            synchronized (VendorInvoiceDB.class) {
                if (instance == null) {
                    instance = new VendorInvoiceDB();
                }
            }
        }
        return instance;
    }

    public List<VendorInvoice> getAllVendorInvoice() {
        return getAllItems();
    }

    public VendorInvoice addVendorInvoice(VendorInvoice vendorInvoice) {
        return addItem(vendorInvoice);
    }

    @Override
    public Optional<VendorInvoice> getById(int id) {
        return items.stream().filter(vendorInvoice -> vendorInvoice.getId() == id).findFirst();
    }

    public VendorInvoice updateVendorInvoice(int id, VendorInvoice updatedVendorInvoice) {
        Optional<VendorInvoice> existingVendorInvoiceOpt = getById(id);
        if (existingVendorInvoiceOpt.isPresent()) {
            VendorInvoice existingVendorInvoice = existingVendorInvoiceOpt.get();
            existingVendorInvoice.setRequestId(updatedVendorInvoice.getRequestId());
            existingVendorInvoice.setTotal(updatedVendorInvoice.getTotal());
            existingVendorInvoice.setInvoicedDate(updatedVendorInvoice.getInvoicedDate());
            existingVendorInvoice.setDueDate(updatedVendorInvoice.getDueDate());
            existingVendorInvoice.setStatus(updatedVendorInvoice.getStatus());
            return existingVendorInvoice;
        } else {
            return null;
        }
    }

    public boolean deleteVendorInvoice(int id) {
        return removeItemByCondition(vendorInvoice -> vendorInvoice.getId() == id);
    }

   
}