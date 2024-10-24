package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.data.RequestVendorDB;
import com.example.demo.data.StockDB;
import com.example.demo.model.RequestVendor;
import com.example.demo.model.Stock;

@Service
public class RequestedVendorService {
     // StockDB is a singleton
    private RequestVendorDB requestVendorDB = RequestVendorDB.getInstance();
    private StockDB stockDB = StockDB.getInstance();

    public ResponseEntity<?> create(RequestVendor requestVendor) {
        if (requestVendor == null) {
            return ResponseEntity.badRequest().body("Stock data is empty");
        }
        requestVendorDB.addRequestedItem(requestVendor);
        return ResponseEntity.ok().body("Stock item created successfully");
    }

    public ResponseEntity<?> findAll() {
        List<RequestVendor> vendorProducts = requestVendorDB.getAllRequestedItems();
        if (!vendorProducts.isEmpty()) {
            return ResponseEntity.ok().body(vendorProducts);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

     public ResponseEntity<?> findOne(@PathVariable int id) {
        Optional<RequestVendor> requestedItem = requestVendorDB.getRequestedItemByIdAndStatus(id, "APPROVED");
        if (requestedItem.isPresent()) {
            return ResponseEntity.ok().body(requestedItem.get());
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    public ResponseEntity<?> update(RequestVendor updatedRequestVendor) {
        if (updatedRequestVendor == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<RequestVendor> existingRequestVendorOpt = requestVendorDB.getById(updatedRequestVendor.getId());

        if (existingRequestVendorOpt.isPresent()) {
            RequestVendor existingVendorProduct = existingRequestVendorOpt.get();
            existingVendorProduct.setProductId(updatedRequestVendor.getProductId());
            existingVendorProduct.setProductId(updatedRequestVendor.getProductId());
            existingVendorProduct.setVendorId(updatedRequestVendor.getVendorId());
            existingVendorProduct.setQuantity(updatedRequestVendor.getQuantity());
            existingVendorProduct.setRequestStatus(updatedRequestVendor.getRequestStatus());
            existingVendorProduct.setDeliveryStatus(updatedRequestVendor.getDeliveryStatus());
            existingVendorProduct.setDeliveryDate(updatedRequestVendor.getDeliveryDate());

            if ("APPROVED".equals(updatedRequestVendor.getRequestStatus())) {
                Optional<Stock> stockItemOpt = stockDB.getStockByProductId(updatedRequestVendor.getProductId());

                if (stockItemOpt.isPresent()) {
                    Stock stockItem = stockItemOpt.get();
                    stockItem.setQuantity(stockItem.getQuantity() + updatedRequestVendor.getQuantity());
                    stockDB.updateStock(stockItem.getId(), stockItem);
                    return ResponseEntity.ok().body("Requested item APPROVED and stock updated successfully.");
                } else {
                    // If stock item does not exist, add a new stock item
                    stockDB.addNewStockFromRequestedItem(updatedRequestVendor);
                    return ResponseEntity.ok().body("Requested item APPROVED and new stock item created.");
                }
            }

            requestVendorDB.updateRequestedItem(updatedRequestVendor.getId(), existingVendorProduct);
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
