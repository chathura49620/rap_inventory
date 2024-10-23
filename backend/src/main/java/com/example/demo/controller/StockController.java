package com.example.demo.controller;

import com.example.demo.model.Stock;
import com.example.demo.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stock")
public class StockController implements CrudController<Stock> {

    @Autowired
    private StockService stockService;

    @Override
    public ResponseEntity<?> create(@RequestBody Stock stock) {
        return stockService.create(stock);
    }

    @Override
    public ResponseEntity<?> findAll() {
        return stockService.findAll();
    }

    @Override
    public ResponseEntity<?> update(@RequestBody Stock updatedStock) {
        return stockService.update(updatedStock);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable int id) {
        return stockService.delete(id);
    }
}
