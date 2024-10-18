package com.example.demo.data;

import com.example.demo.model.RequestVendor;
import com.example.demo.model.Stock;
import com.example.demo.model.VendorProduct;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class StockDB {

    private List<Stock> stocks;

    public StockDB() {
        stocks = new ArrayList<>();
        stocks.add(new Stock(-1, "P001", "Laptop", "Dell", "Electronics", "Black", 50, 999.99, "J01"));
        stocks.add(new Stock(-1, "P002", "Phone", "Samsung", "Electronics", "White", 100, 799.99, "A02"));
        stocks.add(new Stock(-1, "P003", "Shoes", "Nike", "Footwear", "Red", 200, 119.99, "R01"));
        stocks.add(new Stock(-1, "P004", "Shirt", "Adidas", "Apparel", "Blue", 150, 49.99, "S04"));
        stocks.add(new Stock(-1, "P005", "Watch", "Apple", "Accessories", "Silver", 75, 399.99, "M01"));
    }

    public List<Stock> getAllStocks() {
        return stocks;
    }

    // Method to add a new stock
    public Stock addStock(Stock stock) {
        stock.setId(-1);
        stocks.add(stock);
        return stock;
    }

    public Optional<Stock> getStockById(int id) {
        return stocks.stream().filter(stock -> stock.getId() == id).findFirst();
    }

    public Stock updateStock(int id, Stock updatedStock) {
        Optional<Stock> existingStockOpt = getStockById(id);
        if (existingStockOpt.isPresent()) {
            Stock existingStock = existingStockOpt.get();
            existingStock.setName(updatedStock.getName());
            existingStock.setBrand(updatedStock.getBrand());
            existingStock.setType(updatedStock.getType());
            existingStock.setColor(updatedStock.getColor());
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setPrice(updatedStock.getPrice());
            existingStock.setVendorId(updatedStock.getVendorId());
            return existingStock;
        } else {
            return null;
        }
    }

    public boolean deleteStock(int id) {
        return stocks.removeIf(stock -> stock.getId() == id);
    }

    public Optional<Stock> getStockByProductId(String productId) {
        return stocks.stream().filter(stock -> stock.getProductId() == productId).findFirst();
    }

    public Stock addNewStockFromRequestedItem(RequestVendor requestedItem) {
        VendorProduct product = VendorProductDB.vendorProducts.stream()
            .filter(item -> item.getProductId().equals(requestedItem.getProductId()) && item.getVendorId().equals(requestedItem.getVendorId()))
            .findFirst()
            .orElse(null);

        if (product != null) {
            Stock newStock = new Stock(-1, product.getProductId(), product.getName(), product.getBrand(), product.getType(), product.getColor(), requestedItem.getQuantity(), product.getPrice(), product.getVendorId());

            stocks.add(newStock);
            return newStock;
        }
        return null;
    }
}
