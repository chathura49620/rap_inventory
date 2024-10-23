package com.example.demo.service;

import com.example.demo.data.StockDB;
import com.example.demo.model.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockDB stockDB;

    public ResponseEntity<?> create(Stock stock) {
        if (stock == null) {
            return ResponseEntity.badRequest().body("Stock data is empty");
        }
        stockDB.addStock(stock);
        return ResponseEntity.ok().body("Stock item created successfully");
    }

    public ResponseEntity<?> findAll() {
        List<Stock> stockItems = stockDB.getAllStocks();
        if (!stockItems.isEmpty()) {
            return ResponseEntity.ok().body(stockItems);
        } else {
            return ResponseEntity.ok().body("No Data to Retrieve");
        }
    }

    public ResponseEntity<?> update(Stock updatedStock) {
        if (updatedStock == null) {
            return ResponseEntity.badRequest().body("Data to update cannot be empty");
        }

        Optional<Stock> existingStockOpt = stockDB.getStockById(updatedStock.getId());

        if (existingStockOpt.isPresent()) {
            Stock existingStock = existingStockOpt.get();
            existingStock.setName(updatedStock.getName());
            existingStock.setBrand(updatedStock.getBrand());
            existingStock.setType(updatedStock.getType());
            existingStock.setColor(updatedStock.getColor());
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setPrice(updatedStock.getPrice());
            existingStock.setVendorId(updatedStock.getVendorId());

            stockDB.updateStock(updatedStock.getId(), existingStock);
            return ResponseEntity.ok().body("Stock item was updated successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }

    public ResponseEntity<?> delete(int id) {
        boolean isDeleted = stockDB.deleteStock(id);

        if (isDeleted) {
            return ResponseEntity.ok().body("Stock item was deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Stock item not found");
        }
    }
}
