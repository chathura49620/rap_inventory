package com.example.demo.controller;

import com.example.demo.data.OrderItemDB;
import com.example.demo.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/orderItem")
public class OrderItemController implements CrudController<OrderItem> {

    @Autowired
    private OrderItemDB orderItemDB;

    // Create and save a new order item
    @PostMapping
    public ResponseEntity<?> create(@RequestBody OrderItem orderItem) {
        if (orderItem == null) {
            return ResponseEntity.badRequest().body("Invalid data");
        }

        try {
            OrderItem savedItem = orderItemDB.addOrderItem(orderItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    // Retrieve and return all order items
    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            List<OrderItem> orderItems = orderItemDB.getAllOrderItems();
            if (!orderItems.isEmpty()) {
                return ResponseEntity.ok(orderItems);
            } else {
                return ResponseEntity.ok("No Data to Retrieve");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @Override
    public Optional<OrderItem> findOne(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findOne'");
    }

    @Override
    public ResponseEntity<?> update(OrderItem entity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public ResponseEntity<?> delete(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
}
