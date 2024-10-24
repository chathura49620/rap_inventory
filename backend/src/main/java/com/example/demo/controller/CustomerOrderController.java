package com.example.demo.controller;

import com.example.demo.data.CustomerOrderDB;
import com.example.demo.data.StockDB;
import com.example.demo.model.CustomerOrder;
import com.example.demo.model.OrderItem;
import com.example.demo.model.Stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.demo.model.ReportRow;

@RestController
@RequestMapping("/api/v1/customer-order")
public class CustomerOrderController implements CrudController<CustomerOrder> {

    @Autowired
    private CustomerOrderDB customerOrderDB;

    private final StockDB stockDB = StockDB.getInstance(); // Singleton instance of StockDB

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
                orderItem.setStatus(item.getStatus());
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

            // Build the report data by joining orders with their items and stock information
            List<ReportRow> reportRows = orders.stream()
                    .flatMap(order -> order.getItems().stream()  // Flatten the order items
                            .map(item -> {
                                // Fetch the stock information using stockId from OrderItem
                                Optional<Stock> stockOpt = stockDB.getStockByProductId(item.getStockId());

                                if (stockOpt.isPresent()) {
                                    Stock stock = stockOpt.get();
                                    // Parse the order's createdAt timestamp
                                    LocalDateTime createdAt = LocalDateTime.parse(
                                            order.getCreatedAt(), DateTimeFormatter.ISO_DATE_TIME);

                                    // Create and return a ReportRow object with all necessary details
                                    return new ReportRow(
                                            stock.getName(),
                                            stock.getBrand(),
                                            stock.getType(),
                                            stock.getColor(),
                                            stock.getPrice(),
                                            item.getQuantity(),
                                            createdAt
                                    );
                                }
                                return null; // If stock not found, return null
                            }))
                    .filter(row -> row != null) // Remove null rows (if stock data is missing)
                    .collect(Collectors.toList());

            // Return the report data
            return ResponseEntity.ok(reportRows);
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

    @Override
    public Optional<CustomerOrder> findOne(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'findOne'");
    }

    @Override
    public ResponseEntity<?> update(CustomerOrder entity) {
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public ResponseEntity<?> delete(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
}
