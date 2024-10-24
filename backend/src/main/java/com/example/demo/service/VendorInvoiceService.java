package com.example.demo.service;

import com.example.demo.data.VendorInvoiceDB;
import com.example.demo.model.VendorInvoice;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorInvoiceService {

    // StockDB is a singleton
    private VendorInvoiceDB vendorInvoiceDB = VendorInvoiceDB.getInstance();

    public ResponseEntity<?> create(VendorInvoice vendorInvoice) {
        if (vendorInvoice == null) {
            return ResponseEntity.badRequest().body("Stock data is empty");
        }
        vendorInvoiceDB.addVendorInvoice(vendorInvoice);
        return ResponseEntity.ok().body("Stock item created successfully");
    }

    public ResponseEntity<?> findAll() {
        List<VendorInvoice> vendorInvoices = vendorInvoiceDB.getAllItems();
        if (!vendorInvoices.isEmpty()) {
            return ResponseEntity.ok().body(vendorInvoices);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    public ResponseEntity<?> update(VendorInvoice updatedVendorInvoice) {
        if (updatedVendorInvoice == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<VendorInvoice> existingVendorInvoicetOpt = vendorInvoiceDB.getById(updatedVendorInvoice.getId());

        if (existingVendorInvoicetOpt.isPresent()) {
            VendorInvoice existingVendorProduct = existingVendorInvoicetOpt.get();
            existingVendorProduct.setRequestId(updatedVendorInvoice.getRequestId());
            existingVendorProduct.setTotal(updatedVendorInvoice.getTotal());
            existingVendorProduct.setInvoicedDate(updatedVendorInvoice.getInvoicedDate());
            existingVendorProduct.setDueDate(updatedVendorInvoice.getDueDate());
            existingVendorProduct.setStatus(updatedVendorInvoice.getStatus());

            vendorInvoiceDB.updateVendorInvoice(updatedVendorInvoice.getId(), existingVendorProduct);
            return ResponseEntity.ok().body("Stock item was updated successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }

    public ResponseEntity<?> delete(int id) {
        boolean isDeleted = vendorInvoiceDB.deleteVendorInvoice(id);

        if (isDeleted) {
            return ResponseEntity.ok().body("Stock item was deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }
}
