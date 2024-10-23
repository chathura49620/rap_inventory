package com.example.demo.data;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public abstract class AbstractDB<T> {

    protected List<T> items = new ArrayList<>();

    public List<T> getAllItems() {
        return items;
    }

    public T addItem(T item) {
        items.add(item);
        return item;
    }

    public abstract Optional<T> getById(int id);

    public boolean removeItemByCondition(java.util.function.Predicate<T> condition) {
        return items.removeIf(condition);
    }
}
