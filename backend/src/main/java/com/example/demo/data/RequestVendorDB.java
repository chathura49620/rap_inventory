package com.example.demo.data;

import com.example.demo.model.RequestVendor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class RequestVendorDB {

    private List<RequestVendor> requestedItems;

    public RequestVendorDB() {
        requestedItems = new ArrayList<>();

        requestedItems.add(new RequestVendor(-1, "P001", "J01", 10, "PENDING", "NOT_DELIVERED", "2024-10-20"));
        requestedItems.add(new RequestVendor(-1, "P002", "A02", 20, "APPROVED", "DELIVERED", "2024-10-15"));
        requestedItems.add(new RequestVendor(-1, "P003", "R03", 30, "REJECTED", "NOT_DELIVERED", "2024-10-18"));
        requestedItems.add(new RequestVendor(-1, "P004", "S04", 40, "PENDING", "NOT_DELIVERED", "2024-10-25"));
        requestedItems.add(new RequestVendor(-1, "P005", "M05", 50, "APPROVED", "DELIVERED", "2024-10-22"));
    }

    public List<RequestVendor> getAllRequestedItems() {
        return requestedItems;
    }

    public RequestVendor addRequestedItem(RequestVendor requestedItem) {
        requestedItem.setId(-1);
        requestedItems.add(requestedItem);
        return requestedItem;
    }

    public Optional<RequestVendor> getRequestedItemById(int id) {
        return requestedItems.stream().filter(item -> item.getId() == id).findFirst();
    }

    public Optional<RequestVendor> getRequestedItemByIdAndStatus(int id, String status) {
        return requestedItems.stream()
                .filter(item -> item.getId() == id && status.equals(item.getRequestStatus()))
                .findFirst();
    }

    public RequestVendor updateRequestedItem(int id, RequestVendor updatedItem) {
        Optional<RequestVendor> existingItemOpt = getRequestedItemById(id);

        if (existingItemOpt.isPresent()) {
            RequestVendor existingItem = existingItemOpt.get();
            existingItem.setProductId(updatedItem.getProductId());
            existingItem.setVendorId(updatedItem.getVendorId());
            existingItem.setQuantity(updatedItem.getQuantity());
            existingItem.setRequestStatus(updatedItem.getRequestStatus());
            existingItem.setDeliveryStatus(updatedItem.getDeliveryStatus());
            existingItem.setDeliveryDate(updatedItem.getDeliveryDate());

            return existingItem;
        } else {
            return null;
        }
    }

    public boolean deleteRequestedItem(int id) {
        return requestedItems.removeIf(item -> item.getId() == id);
    }
}

