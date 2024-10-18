package com.example.demo.data;

import com.example.demo.model.RequestedItem;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class RequestedItemDB {

    private List<RequestedItem> requestedItems;

    // Constructor to initialize with some sample data
    public RequestedItemDB() {
        requestedItems = new ArrayList<>();

        // Adding some sample requested item objects
        requestedItems.add(new RequestedItem(1, 1001, 101, "10", "PENDING", "NOT_DELIVERED", "2024-10-20"));
        requestedItems.add(new RequestedItem(2, 1002, 102, "20", "APPROVED", "DELIVERED", "2024-10-15"));
        requestedItems.add(new RequestedItem(3, 1003, 103, "30", "REJECTED", "NOT_DELIVERED", "2024-10-18"));
        requestedItems.add(new RequestedItem(4, 1004, 104, "40", "PENDING", "NOT_DELIVERED", "2024-10-25"));
        requestedItems.add(new RequestedItem(5, 1005, 105, "50", "APPROVED", "DELIVERED", "2024-10-22"));
    }

    // Method to return all requested items
    public List<RequestedItem> getAllRequestedItems() {
        return requestedItems;
    }

    // Method to add a new requested item
    public RequestedItem addRequestedItem(RequestedItem requestedItem) {
        requestedItems.add(requestedItem);
        return requestedItem;
    }

    // Method to find a requested item by id
    public Optional<RequestedItem> getRequestedItemById(int id) {
        return requestedItems.stream().filter(item -> item.getId() == id).findFirst();
    }

    // Method to find a requested item by id and request status
    public Optional<RequestedItem> getRequestedItemByIdAndStatus(int id, String status) {
        return requestedItems.stream()
                .filter(item -> item.getId() == id && status.equals(item.getRequestStatus()))
                .findFirst();
    }

    // Method to update an existing requested item by id
    public RequestedItem updateRequestedItem(int id, RequestedItem updatedItem) {
        Optional<RequestedItem> existingItemOpt = getRequestedItemById(id);

        if (existingItemOpt.isPresent()) {
            RequestedItem existingItem = existingItemOpt.get();
            existingItem.setProductId(updatedItem.getProductId());
            existingItem.setVendorId(updatedItem.getVendorId());
            existingItem.setQuantity(updatedItem.getQuantity());
            existingItem.setRequestStatus(updatedItem.getRequestStatus());
            existingItem.setDeliveryStatus(updatedItem.getDeliveryStatus());
            existingItem.setDeliveryDate(updatedItem.getDeliveryDate());

            return existingItem;
        } else {
            return null;  // Handle this case appropriately
        }
    }

    // Method to delete a requested item by id
    public boolean deleteRequestedItem(int id) {
        return requestedItems.removeIf(item -> item.getId() == id);
    }
}

