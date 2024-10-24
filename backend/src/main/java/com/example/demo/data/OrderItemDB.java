package com.example.demo.data;

import com.example.demo.model.OrderItem;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class OrderItemDB extends AbstractDB<OrderItem> {
    private final List<OrderItem> orderItems = new ArrayList<>();

    // Add a new order item
    public OrderItem addOrderItem(OrderItem orderItem) {
        orderItem.setOrderId(orderItems.size() + 1); // Assign a unique ID
        orderItems.add(orderItem);
        return orderItem;
    }

    // Get all order items
    public List<OrderItem> getAllOrderItems() {
        return orderItems;
    }

    @Override
    public Optional<OrderItem> getById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }
}
