package com.example.demo.data;

import com.example.demo.model.RequestVendor;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class RequestVendorDB extends AbstractDB<RequestVendor> {

    // private List<RequestVendor> requestedItems;
    private static RequestVendorDB instance;

    private RequestVendorDB() {
        super();
        items.add(new RequestVendor(-1, "P001", "Laptop", "J01", 10, "PENDING", "NOT_DELIVERED", "2024-10-20"));
        items.add(new RequestVendor(-1, "P002","Phone", "A02", 20, "APPROVED", "DELIVERED", "2024-10-15"));
        items.add(new RequestVendor(-1, "P003","Shoes", "R03", 30, "REJECTED", "NOT_DELIVERED", "2024-10-18"));
        items.add(new RequestVendor(-1, "P004", "Shirt", "S04", 40, "PENDING", "NOT_DELIVERED", "2024-10-25"));
        items.add(new RequestVendor(-1, "P005","Watch", "M05", 50, "APPROVED", "DELIVERED", "2024-10-22"));
    }

    public static RequestVendorDB getInstance() {
        if (instance == null) {
            synchronized (RequestVendorDB.class) {
                if (instance == null) {
                    instance = new RequestVendorDB();
                }
            }
        }
        return instance;
    }

    public List<RequestVendor> getAllRequestedItems() {
        return items;
    }

    public RequestVendor addRequestedItem(RequestVendor requestedItem) {
        requestedItem.setId(-1);
        items.add(requestedItem);
        return requestedItem;
    }

    public Optional<RequestVendor> getRequestedItemById(int id) {
        return items.stream().filter(item -> item.getId() == id).findFirst();
    }

    public Optional<RequestVendor> getRequestedItemByIdAndStatus(int id, String status) {
        return items.stream()
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
        return items.removeIf(item -> item.getId() == id);
    }

    @Override
    public Optional<RequestVendor> getById(int id) {
        return items.stream().filter(requestVendor -> requestVendor.getId() == id).findFirst();
    }

}

