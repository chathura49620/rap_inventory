package com.example.demo.data;

import com.example.demo.model.RequestVendor;
import com.example.demo.model.Stock;
import com.example.demo.model.VendorProduct;

import java.util.List;
import java.util.Optional;

public class StockDB extends AbstractDB<Stock> {

    // Static instance for Singleton
    private static StockDB instance;
    // StockDB is a singleton
    private VendorProductDB vendorProDB = VendorProductDB.getInstance();

    // Private constructor to prevent instantiation from other classes
    private StockDB() {
        super();
        items.add(new Stock(-1, "P001", "Laptop", "Dell", "Electronics", "Black", 50, 999.99, "J01"));
        items.add(new Stock(-1, "P002", "Phone", "Samsung", "Electronics", "White", 100, 799.99, "A01"));
        items.add(new Stock(-1, "P003", "Shoes", "Nike", "Footwear", "Red", 200, 119.99, "R01"));
        items.add(new Stock(-1, "P004", "Shirt", "Adidas", "Apparel", "Blue", 150, 49.99, "S01"));
        items.add(new Stock(-1, "P005", "Watch", "Apple", "Accessories", "Silver", 75, 399.99, "M01"));
    }

    // Public static method to provide access to the single instance
    public static StockDB getInstance() {
        if (instance == null) {
            synchronized (StockDB.class) {
                if (instance == null) {
                    instance = new StockDB();
                }
            }
        }
        return instance;
    }

    public List<Stock> getAllStocks() {
        return getAllItems();
    }

    public Stock addStock(Stock stock) {
        stock.setId(-1);
        return addItem(stock);
    }

    @Override
    public Optional<Stock> getById(int id) {
        return items.stream().filter(stock -> stock.getId() == id).findFirst();
    }

    public Stock updateStock(int id, Stock updatedStock) {
        Optional<Stock> existingStockOpt = getById(id);
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
        return removeItemByCondition(stock -> stock.getId() == id);
    }

    public Optional<Stock> getStockByProductId(String productId) {
        return items.stream().filter(stock -> stock.getProductId().equals(productId)).findFirst();
    }

    public Stock addNewStockFromRequestedItem(RequestVendor requestedItem) {
        VendorProduct product = vendorProDB.getAllVendorProducts().stream()
                .filter(item -> item.getProductId().equals(requestedItem.getProductId())
                        && item.getVendorId().equals(requestedItem.getVendorId()))
                .findFirst()
                .orElse(null);

        if (product != null) {
            Stock newStock = new Stock(-1, product.getProductId(), product.getName(), product.getBrand(),
                    product.getType(), product.getColor(), requestedItem.getQuantity(), product.getPrice(),
                    product.getVendorId());

            items.add(newStock);
            return newStock;
        }
        return null;
    }
}