package com.example.demo.controller;

import com.example.demo.model.RequestVendor;
import com.example.demo.service.RequestedVendorService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/request-vendor")
public class RequestVendorController implements CrudController<RequestVendor> {

    @Autowired
    private RequestedVendorService requestedVendorService;

    @Override
    public ResponseEntity<?> create(@RequestBody RequestVendor requestVendor) {
        return requestedVendorService.create(requestVendor);
    }

    @Override
    public ResponseEntity<?> findAll() {
        return requestedVendorService.findAll();
    }

    @Override
    public ResponseEntity<?> update(@RequestBody RequestVendor requestVendor) {
        return requestedVendorService.update(requestVendor);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable int id) {
        return requestedVendorService.delete(id);
    }

    @Override
    public Optional<RequestVendor> findOne(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'findOne'");
    }

}
