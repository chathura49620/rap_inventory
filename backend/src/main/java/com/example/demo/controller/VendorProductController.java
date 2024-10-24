package com.example.demo.controller;

import com.example.demo.model.VendorProduct;
import com.example.demo.service.VendorProductService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/vendor-product")
public class VendorProductController implements CrudController<VendorProduct> {

    @Autowired
    private VendorProductService vendorProductService;  

     @Override
    public ResponseEntity<?> create(@RequestBody VendorProduct vendorProduct) {
        return vendorProductService.create(vendorProduct);
    }

    @Override
    public ResponseEntity<?> findAll() {
        return vendorProductService.findAll();
    }

    @Override
    public ResponseEntity<?> update(@RequestBody VendorProduct updatedVendorProduct) {
        return vendorProductService.update(updatedVendorProduct);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable int id) {
        return vendorProductService.delete(id);
    }

    @Override
    public Optional<VendorProduct> findOne(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'findOne'");
    }
}



