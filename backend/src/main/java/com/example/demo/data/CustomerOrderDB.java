package com.example.demo.data;

import com.example.demo.model.CustomerOrder;
import com.example.demo.model.OrderItem;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class CustomerOrderDB extends AbstractDB<CustomerOrder> {
    private final List<CustomerOrder> orders = new ArrayList<>();
    private final List<OrderItem> orderItems = new ArrayList<>();

    public CustomerOrder addOrder(CustomerOrder order) {
        order.setId(orders.size() + 1); // Auto-increment ID
        orders.add(order);
        return order;
    }

    public void addOrderItems(List<OrderItem> items) {
        orderItems.addAll(items);
    }

    public List<CustomerOrder> getAllOrders() {
        return orders;
    }

    public Optional<CustomerOrder> getOrderById(int id) {
        return orders.stream().filter(order -> order.getId() == id).findFirst();
    }

    public List<CustomerOrder> getFilteredOrders(String status, LocalDate start, LocalDate end) {
        // Define a formatter for the ISO 8601 timestamp format
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
    
        return orders.stream()
                .filter(order -> order.getOrderStatus().equalsIgnoreCase(status)
                        && !LocalDateTime.parse(order.getCreatedAt(), formatter)
                                .isBefore(start.atStartOfDay())
                        && !LocalDateTime.parse(order.getCreatedAt(), formatter)
                                .isAfter(end.atTime(23, 59, 59)))
                .collect(Collectors.toList());
    }

    public void updateOrderStatus(int id, String status) {
        getOrderById(id).ifPresent(order -> order.setOrderStatus(status));
    }

    @Override
    public Optional<CustomerOrder> getById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }
}
