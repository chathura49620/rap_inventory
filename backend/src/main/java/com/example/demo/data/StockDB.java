package com.example.demo.data;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import com.example.demo.model.Stock;

@Component
public class StockDB {

    private List<Stock> stocks;

    // Constructor to initialize with 5 stock objects
    public StockDB() {
        stocks = new ArrayList<>();

        // Adding 5 sample stock objects
        stocks.add(new Stock(1, "Laptop", "Dell", "Electronics", "Black", 50, 999.99, 101));
        stocks.add(new Stock(2, "Phone", "Samsung", "Electronics", "White", 100, 799.99, 102));
        stocks.add(new Stock(3, "Shoes", "Nike", "Footwear", "Red", 200, 119.99, 103));
        stocks.add(new Stock(4, "Shirt", "Adidas", "Apparel", "Blue", 150, 49.99, 104));
        stocks.add(new Stock(5, "Watch", "Apple", "Accessories", "Silver", 75, 399.99, 105));
    }

    // Method to return all stocks
    public List<Stock> getAllStocks() {
        return stocks;
    }

    // Method to add a new stock (assuming id is already provided from the controller)
    public Stock addStock(Stock stock) {
        stocks.add(stock);
        return stock;
    }

    // Method to update an existing stock by id
    public Stock updateStock(int id, Stock updatedStock) {
        Optional<Stock> stockOpt = stocks.stream().filter(s -> s.getId() == id).findFirst();

        if (stockOpt.isPresent()) {
            Stock stock = stockOpt.get();
            stock.setName(updatedStock.getName());
            stock.setBrand(updatedStock.getBrand());
            stock.setType(updatedStock.getType());
            stock.setColor(updatedStock.getColor());
            stock.setQuantity(updatedStock.getQuantity());
            stock.setPrice(updatedStock.getPrice());
            stock.setVendorId(updatedStock.getVendorId());
            return stock;
        } else {
            // If no stock with the given id is found, return null or handle the case appropriately
            return null;
        }
    }

    // Method to delete a stock by id
    public boolean deleteStock(int id) {
        return stocks.removeIf(stock -> stock.getId() == id);
    }
}
