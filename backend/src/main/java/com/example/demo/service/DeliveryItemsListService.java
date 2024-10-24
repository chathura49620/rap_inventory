package com.example.demo.service;

import com.example.demo.data.RequestVendorDB;
import com.example.demo.model.RequestVendor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryItemsListService {

    // StockDB is a singleton
    private RequestVendorDB requestVendorDB = RequestVendorDB.getInstance();

    public ResponseEntity<?> create(RequestVendor requestVendor) {
        if (requestVendor == null) {
            return ResponseEntity.badRequest().body("Stock data is empty");
        }
        requestVendorDB.addRequestedItem(requestVendor);
        return ResponseEntity.ok().body("Stock item created successfully");
    }

    public ResponseEntity<?> findAll() {
        List<RequestVendor> requestVendorItems = requestVendorDB.getAllRequestedItems();
        if (!requestVendorItems.isEmpty()) {
            return ResponseEntity.ok().body(requestVendorItems);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    public ResponseEntity<?> update(RequestVendor updatedRequestVendor) {
        if (updatedRequestVendor == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<RequestVendor> existingRequestVendorOptional = requestVendorDB.getById(updatedRequestVendor.getId());

        if (existingRequestVendorOptional.isPresent()) {
            RequestVendor exsitingRequestVendor = existingRequestVendorOptional.get();
            exsitingRequestVendor.setProductId(updatedRequestVendor.getProductId());
            exsitingRequestVendor.setProductName(updatedRequestVendor.getProductName());
            exsitingRequestVendor.setVendorId(updatedRequestVendor.getVendorId());
            exsitingRequestVendor.setQuantity(updatedRequestVendor.getQuantity());
            exsitingRequestVendor.setQuantity(updatedRequestVendor.getQuantity());
            exsitingRequestVendor.setRequestStatus(updatedRequestVendor.getRequestStatus());
            exsitingRequestVendor.setDeliveryDate(updatedRequestVendor.getDeliveryDate());

            requestVendorDB.updateRequestedItem(updatedRequestVendor.getId(), exsitingRequestVendor);
            return ResponseEntity.ok().body("Stock item was updated successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }

    public ResponseEntity<?> delete(int id) {
        boolean isDeleted = requestVendorDB.deleteRequestedItem(id);

        if (isDeleted) {
            return ResponseEntity.ok().body("Stock item was deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }
}
