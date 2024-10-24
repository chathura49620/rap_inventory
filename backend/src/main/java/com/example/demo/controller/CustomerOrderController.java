package com.example.demo.controller;

import com.example.demo.data.CustomerOrderDB;
import com.example.demo.model.CustomerOrder;
import com.example.demo.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/customer-order")
public class CustomerOrderController {

    @Autowired
    private CustomerOrderDB customerOrderDB;

    // Create and save a new customer order
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CustomerOrder data) {
        if (data == null) {
            return ResponseEntity.badRequest().body("Invalid data");
        }

        try {
            CustomerOrder savedOrder = customerOrderDB.addOrder(data);
            List<OrderItem> orderItems = data.getItems().stream().map(item -> {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrderId(savedOrder.getId());
                orderItem.setCreatedAt(savedOrder.getCreatedAt());
                orderItem.setStatus(savedOrder.getOrderStatus());
                orderItem.setStockId(item.getStockId());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setCustomerId(data.getCustomerId());
                return orderItem;
            }).toList();

            customerOrderDB.addOrderItems(orderItems);
            return ResponseEntity.ok(orderItems);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    // Retrieve all customer orders
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<CustomerOrder> orders = customerOrderDB.getAllOrders();
        if (!orders.isEmpty()) {
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.ok("No Data to Retrieve");
        }
    }

    // Track a specific order by ID
    @GetMapping("/track-order")
    public ResponseEntity<?> trackOrder(@RequestParam int id) {
        Optional<CustomerOrder> order = customerOrderDB.getOrderById(id);
        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        } else {
            return ResponseEntity.ok("No Data to Retrieve");
        }
    }

    // Get filtered orders based on status and date range
    @GetMapping("/filter")
    public ResponseEntity<?> getFilteredOrders(
            @RequestParam String orderStatus,
            @RequestParam String startDate,
            @RequestParam String endDate) {

        try {
            // Parse the input date strings to LocalDate
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);

            // Retrieve filtered orders from the DB
            List<CustomerOrder> orders = customerOrderDB.getFilteredOrders(orderStatus, start, end);

            if (!orders.isEmpty()) {
                return ResponseEntity.ok(orders);
            } else {
                return ResponseEntity.ok(orders);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    // Update order status
    @PutMapping("/update-status")
    public ResponseEntity<?> updateOrderStatus(@RequestParam int id, @RequestParam String status) {
        try {
            customerOrderDB.updateOrderStatus(id, status);
            return ResponseEntity.ok("Successfully updated");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
