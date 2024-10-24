package com.example.demo.data;

import com.example.demo.model.Customer;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class CustomerDB extends AbstractDB<Customer> {
    private final List<Customer> customers;

    public CustomerDB() {
        customers = new ArrayList<>();
        // Initialize with some sample data
        customers.add(new Customer(1, "John", "Doe", "123 Main St", "456 Elm St", "john@example.com"));
        customers.add(new Customer(2, "Jane", "Smith", "789 Maple St", "987 Elm St", "jane@example.com"));
        customers.add(new Customer(3, "Alice", "Johnson", "456 Oak St", "789 Pine St", "alice@example.com"));
    }

    public List<Customer> getAllCustomers() {
        return customers;
    }

    public Optional<Customer> getCustomerById(int id) {
        return customers.stream().filter(c -> c.getId() == id).findFirst();
    }

    public void addCustomer(Customer customer) {
        customer.setId(customers.size() + 1);
        customers.add(customer);
    }

    public Customer updateCustomer(int id, Customer updatedCustomer) {
        Optional<Customer> existingCustomerOpt = getCustomerById(id);
        if (existingCustomerOpt.isPresent()) {
            Customer existingCustomer = existingCustomerOpt.get();
            existingCustomer.setFirst_name(updatedCustomer.getFirst_name());
            existingCustomer.setLast_name(updatedCustomer.getLast_name());
            existingCustomer.setBilling_address(updatedCustomer.getBilling_address());
            existingCustomer.setShipping_address(updatedCustomer.getShipping_address());
            existingCustomer.setEmail(updatedCustomer.getEmail());
            return existingCustomer;
        } else {
            return null;
        }
    }

    public boolean deleteCustomer(int id) {
        return customers.removeIf(c -> c.getId() == id);
    }

    @Override
    public Optional<Customer> getById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }
}
