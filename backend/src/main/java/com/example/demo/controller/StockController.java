package com.example.demo.controller;

import com.example.demo.data.StockDB;
import com.example.demo.model.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/stocks")
public class StockController {

    @Autowired
    private StockDB stockDB;

    // Create and save a new stock
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Stock stock) {
        if (stock == null) {
            return ResponseEntity.badRequest().body("Stock data is empty");
        }
        stockDB.addStock(stock);
        return ResponseEntity.ok().body("Stock item created successfully");
    }

    // Retrieve and return all stocks
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<Stock> stockItems = stockDB.getAllStocks();
        if (!stockItems.isEmpty()) {
            return ResponseEntity.ok().body(stockItems);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    // Update an existing stock by id
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Stock updatedStock) {
        if (updatedStock == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<Stock> existingStockOpt = stockDB.getStockById(id);

        if (existingStockOpt.isPresent()) {
            Stock existingStock = existingStockOpt.get();
            existingStock.setName(updatedStock.getName());
            existingStock.setBrand(updatedStock.getBrand());
            existingStock.setType(updatedStock.getType());
            existingStock.setColor(updatedStock.getColor());
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setPrice(updatedStock.getPrice());
            existingStock.setVendorId(updatedStock.getVendorId());

            stockDB.updateStock(id, existingStock);
            return ResponseEntity.ok().body("Stock item was updated successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }

    // Delete a stock by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        boolean isDeleted = stockDB.deleteStock(id);

        if (isDeleted) {
            return ResponseEntity.ok().body("Stock item was deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }
}
