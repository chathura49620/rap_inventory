package com.example.demo.data;

import com.example.demo.model.RequestedItem;
import com.example.demo.model.Stock;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class StockDB {

    private List<Stock> stocks;
    private int currentId = 1005; // To handle auto-increment of stock IDs

    // Constructor to initialize with some sample stock data
    public StockDB() {
        stocks = new ArrayList<>();
        stocks.add(new Stock(1001, "Laptop", "Dell", "Electronics", "Black", 50, 999.99, 101));
        stocks.add(new Stock(1002, "Phone", "Samsung", "Electronics", "White", 100, 799.99, 102));
        stocks.add(new Stock(1003, "Shoes", "Nike", "Footwear", "Red", 200, 119.99, 103));
        stocks.add(new Stock(1004, "Shirt", "Adidas", "Apparel", "Blue", 150, 49.99, 104));
        stocks.add(new Stock(1005, "Watch", "Apple", "Accessories", "Silver", 75, 399.99, 105));
    }

    // Method to return all stocks
    public List<Stock> getAllStocks() {
        return stocks;
    }

    // Method to add a new stock
    public Stock addStock(Stock stock) {
        currentId++; // Increment ID for the new stock
        stock.setId(currentId); // Set the new stock's ID
        stocks.add(stock);
        return stock;
    }

    // Method to find a stock by id
    public Optional<Stock> getStockById(int id) {
        return stocks.stream().filter(stock -> stock.getId() == id).findFirst();
    }

    // Method to update an existing stock by id
    public Stock updateStock(int id, Stock updatedStock) {
        Optional<Stock> existingStockOpt = getStockById(id);
        if (existingStockOpt.isPresent()) {
            Stock existingStock = existingStockOpt.get();
            // Update the fields of the existing stock
            existingStock.setName(updatedStock.getName());
            existingStock.setBrand(updatedStock.getBrand());
            existingStock.setType(updatedStock.getType());
            existingStock.setColor(updatedStock.getColor());
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setPrice(updatedStock.getPrice());
            existingStock.setVendorId(updatedStock.getVendorId());
            return existingStock;
        } else {
            return null;  // Handle this case appropriately (e.g., return a 404 status in the controller)
        }
    }

    // Method to delete a stock by id
    public boolean deleteStock(int id) {
        return stocks.removeIf(stock -> stock.getId() == id);
    }

    // Method to find a stock by product id (assuming product_id is unique)
    public Optional<Stock> getStockByProductId(int productId) {
        return stocks.stream().filter(stock -> stock.getId() == productId).findFirst();
    }

    // Method to add a new stock from a requested item
    public Stock addNewStockFromRequestedItem(RequestedItem requestedItem) {
        Stock newStock = new Stock();
        newStock.setId(currentId++); // Increment and set new stock ID
        newStock.setName(""+requestedItem.getProductId()); // Example of setting the name, customize as needed
        newStock.setBrand("Default Brand"); // Example, customize as needed
        newStock.setType("Default Type"); // Example, customize as needed
        newStock.setColor("Default Color"); // Example, customize as needed
        newStock.setQuantity(Integer.parseInt(requestedItem.getQuantity()));
        newStock.setPrice(0.0); // Example, customize as needed
        newStock.setVendorId(requestedItem.getVendorId());

        stocks.add(newStock);
        return newStock;
    }
}
