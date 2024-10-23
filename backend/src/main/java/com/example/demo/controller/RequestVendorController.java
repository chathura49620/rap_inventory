package com.example.demo.controller;

import com.example.demo.data.RequestVendorDB;
import com.example.demo.data.StockDB;
import com.example.demo.model.RequestVendor;
import com.example.demo.model.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/request-vendor")
public class RequestVendorController {

    @Autowired
    private RequestVendorDB requestedVendorDB;

    // StockDB is a singleton
    private StockDB stockDB = StockDB.getInstance();

    @GetMapping
    public ResponseEntity<?> findAll() {
        List<RequestVendor> requestedItems = requestedVendorDB.getAllRequestedItems();
        if (!requestedItems.isEmpty()) {
            return ResponseEntity.ok().body(requestedItems);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody RequestVendor requestedItem) {
        if (requestedItem == null) {
            return ResponseEntity.badRequest().body("Request body is empty");
        }
        requestedVendorDB.addRequestedItem(requestedItem);
        return ResponseEntity.ok().body("Requested item created successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable int id) {
        Optional<RequestVendor> requestedItem = requestedVendorDB.getRequestedItemByIdAndStatus(id, "APPROVED");
        if (requestedItem.isPresent()) {
            return ResponseEntity.ok().body(requestedItem.get());
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody RequestVendor updatedItem) {
        if (updatedItem == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<RequestVendor> existingItem = requestedVendorDB.getRequestedItemById(id);

        if (existingItem.isPresent()) {
            RequestVendor itemToUpdate = existingItem.get();

            // Update the existing item's details
            itemToUpdate.setProductId(updatedItem.getProductId());
            itemToUpdate.setVendorId(updatedItem.getVendorId());
            itemToUpdate.setQuantity(updatedItem.getQuantity());
            itemToUpdate.setRequestStatus(updatedItem.getRequestStatus());
            itemToUpdate.setDeliveryStatus(updatedItem.getDeliveryStatus());
            itemToUpdate.setDeliveryDate(updatedItem.getDeliveryDate());

            // Handle special case when request status is APPROVED
            if ("APPROVED".equals(updatedItem.getRequestStatus())) {
                Optional<Stock> stockItemOpt = stockDB.getStockByProductId(updatedItem.getProductId());

                if (stockItemOpt.isPresent()) {
                    Stock stockItem = stockItemOpt.get();
                    stockItem.setQuantity(stockItem.getQuantity() + updatedItem.getQuantity());
                    stockDB.updateStock(stockItem.getId(), stockItem);
                    return ResponseEntity.ok().body("Requested item APPROVED and stock updated successfully.");
                } else {
                    // If stock item does not exist, add a new stock item
                    stockDB.addNewStockFromRequestedItem(updatedItem);
                    return ResponseEntity.ok().body("Requested item APPROVED and new stock item created.");
                }
            }

            requestedVendorDB.updateRequestedItem(id, itemToUpdate);
            return ResponseEntity.ok().body("Requested item updated successfully.");
        } else {
            return ResponseEntity.status(404).body("Requested item not found");
        }
    }

    // Delete a requested item by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        boolean isDeleted = requestedVendorDB.deleteRequestedItem(id);
        if (isDeleted) {
            return ResponseEntity.ok().body("Requested item deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Requested item not found");
        }
    }
}
