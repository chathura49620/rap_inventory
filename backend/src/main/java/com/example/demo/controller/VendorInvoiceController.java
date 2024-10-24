package com.example.demo.controller;

import com.example.demo.model.VendorInvoice;
import com.example.demo.service.VendorInvoiceService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/vendor-invoice")
public class VendorInvoiceController implements CrudController<VendorInvoice> {

    @Autowired
    private VendorInvoiceService vendorInvoiceService;

    @Override
    public ResponseEntity<?> create(@RequestBody VendorInvoice vendorInvoice) {
        return vendorInvoiceService.create(vendorInvoice);
    }

    @Override
    public ResponseEntity<?> findAll() {
        return vendorInvoiceService.findAll();
    }

    @Override
    public ResponseEntity<?> update(@RequestBody VendorInvoice vendorInvoice) {
        return vendorInvoiceService.update(vendorInvoice);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable int id) {
        return vendorInvoiceService.delete(id);
    }

    @Override
    public Optional<VendorInvoice> findOne(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'findOne'");
    }

}
