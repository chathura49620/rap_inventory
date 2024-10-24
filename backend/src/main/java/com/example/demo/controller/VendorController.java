package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Vendor;
import com.example.demo.service.VendorService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/vendor")
public class VendorController implements CrudController<Vendor> {

    @Autowired
    private VendorService vendorService;

    @Override
    public ResponseEntity<?> create(@RequestBody Vendor vendor) {
        return vendorService.create(vendor);
    }

    @Override
    public ResponseEntity<?> findAll() {
        return vendorService.findAll();
    }

    @Override
    public ResponseEntity<?> update(@RequestBody Vendor updatedVendor) {
        return vendorService.update(updatedVendor);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable int id) {
        return vendorService.delete(id);
    }

    @Override
    public Optional<Vendor> findOne(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'findOne'");
    }
}
