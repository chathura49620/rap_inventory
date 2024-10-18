package com.example.demo.controller;

import com.example.demo.data.RequestedItemDB;
import com.example.demo.data.StockDB;
import com.example.demo.model.RequestedItem;
import com.example.demo.model.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/requested-items")
public class RequestedItemController {

    @Autowired
    private RequestedItemDB requestedItemDB;

    @Autowired
    private StockDB stockDB;  // Assuming you have StockDB for stock management

    // Retrieve and return all requested items
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<RequestedItem> requestedItems = requestedItemDB.getAllRequestedItems();
        if (!requestedItems.isEmpty()) {
            return ResponseEntity.ok().body(requestedItems);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    // Create a new requested item
    @PostMapping
    public ResponseEntity<?> create(@RequestBody RequestedItem requestedItem) {
        if (requestedItem == null) {
            return ResponseEntity.badRequest().body("Request body is empty");
        }
        requestedItemDB.addRequestedItem(requestedItem);
        return ResponseEntity.ok().body("Requested item created successfully");
    }

    // Retrieve a single requested item by id with APPROVED status
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable int id) {
        Optional<RequestedItem> requestedItem = requestedItemDB.getRequestedItemByIdAndStatus(id, "APPROVED");
        if (requestedItem.isPresent()) {
            return ResponseEntity.ok().body(requestedItem.get());
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    // Update a requested item by id
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody RequestedItem updatedItem) {
        if (updatedItem == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<RequestedItem> existingItem = requestedItemDB.getRequestedItemById(id);

        if (existingItem.isPresent()) {
            RequestedItem itemToUpdate = existingItem.get();

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
                    stockItem.setQuantity(stockItem.getQuantity() + Integer.parseInt(updatedItem.getQuantity()));
                    stockDB.updateStock(stockItem.getId(), stockItem);
                    return ResponseEntity.ok().body("Requested item APPROVED and stock updated successfully.");
                } else {
                    // If stock item does not exist, add a new stock item
                    stockDB.addNewStockFromRequestedItem(updatedItem);
                    return ResponseEntity.ok().body("Requested item APPROVED and new stock item created.");
                }
            }

            requestedItemDB.updateRequestedItem(id, itemToUpdate);
            return ResponseEntity.ok().body("Requested item updated successfully.");
        } else {
            return ResponseEntity.status(404).body("Requested item not found");
        }
    }

    // Delete a requested item by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        boolean isDeleted = requestedItemDB.deleteRequestedItem(id);
        if (isDeleted) {
            return ResponseEntity.ok().body("Requested item deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Requested item not found");
        }
    }
}
