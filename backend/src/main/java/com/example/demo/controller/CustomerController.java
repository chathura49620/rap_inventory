package com.example.demo.controller;

import com.example.demo.data.CustomerDB;
import com.example.demo.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {

    @Autowired
    private CustomerDB customerDB;

    // Create and save a new customer
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Customer customer) {
        if (customer == null) {
            return ResponseEntity.badRequest().body("Customer data is empty");
        }
        customerDB.addCustomer(customer);
        return ResponseEntity.ok().body("Customer created successfully");
    }

    // Retrieve and return all customers
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<Customer> customers = customerDB.getAllCustomers();
        if (!customers.isEmpty()) {
            return ResponseEntity.ok().body(customers);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    // Retrieve a specific customer by ID
    // PUT method JSON object
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable int id) {
        Optional<Customer> customer = customerDB.getCustomerById(id);
        if (customer.isPresent()) {
            return ResponseEntity.ok().body(customer.get());
        } else {
            return ResponseEntity.status(404).body("Customer not found");
        }
    }

    // Update an existing customer by id
    // GET Method JSON object
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Customer updatedCustomer) {
        if (updatedCustomer == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<Customer> existingCustomerOpt = customerDB.getCustomerById(id);

        if (existingCustomerOpt.isPresent()) {
            Customer existingCustomer = existingCustomerOpt.get();
            existingCustomer.setFirst_name(updatedCustomer.getFirst_name());
            existingCustomer.setLast_name(updatedCustomer.getLast_name());
            existingCustomer.setBilling_address(updatedCustomer.getBilling_address());
            existingCustomer.setShipping_address(updatedCustomer.getShipping_address());
            existingCustomer.setEmail(updatedCustomer.getEmail());

            customerDB.updateCustomer(id, existingCustomer);
            return ResponseEntity.ok().body("Customer was updated successfully");
        } else {
            return ResponseEntity.status(404).body("Customer not found");
        }
    }

    // Delete a customer by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        boolean isDeleted = customerDB.deleteCustomer(id);

        if (isDeleted) {
            return ResponseEntity.ok().body("Customer was deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Customer not found");
        }
    }
}
