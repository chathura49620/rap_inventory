package com.example.demo.controller;

import com.example.demo.model.RequestVendor;
import com.example.demo.service.DeliveryItemsListService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/delivery-items")
public class DeliveryItemsListController implements CrudController<RequestVendor> {

    @Autowired
    private DeliveryItemsListService deliveryItemsListService;

    @Override
    public ResponseEntity<?> create(@RequestBody RequestVendor requestVendor) {
        return deliveryItemsListService.create(requestVendor);
    }

    @Override
    public ResponseEntity<?> findAll() {
        return deliveryItemsListService.findAll();
    }

    @Override
    public ResponseEntity<?> update(@RequestBody RequestVendor requestVendor) {
        return deliveryItemsListService.update(requestVendor);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable int id) {
        return deliveryItemsListService.delete(id);
    }

    @Override
    public Optional<RequestVendor> findOne(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'findOne'");
    }
}
