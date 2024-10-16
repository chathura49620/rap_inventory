package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.demo.data.StockDB;
import com.example.demo.model.Stock;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/v1/stock")
public class StockController {

    @Autowired
    private StockDB stockDB;

    private int currentId = 5; // Initial ID value based on existing stock items

    // Get all stocks
    @GetMapping
    public List<Stock> getAllStocks() {
        return stockDB.getAllStocks();
    }

    // Add a new stock (auto-increment id)
    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        if (stock.getId() == 0) {
            currentId++; // Increment the id if no id is provided
            stock.setId(currentId);
        }
        return stockDB.addStock(stock);
    }

    // Update an existing stock
    @PutMapping("/{id}")
    public Stock updateStock(@PathVariable int id, @RequestBody Stock stock) {
        return stockDB.updateStock(id, stock);
    }

    // Delete a stock
    @DeleteMapping("/{id}")
    public boolean deleteStock(@PathVariable int id) {
        return stockDB.deleteStock(id);
    }
}
