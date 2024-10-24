package com.example.demo.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface CrudController<T> {
    @PostMapping
    ResponseEntity<?> create(@RequestBody T entity);

    @GetMapping
    ResponseEntity<?> findAll();

    @GetMapping("/{id}")
    Optional<T> findOne(@PathVariable int id);

    @PutMapping
    ResponseEntity<?> update(@RequestBody T entity);

    @DeleteMapping("/{id}")
    ResponseEntity<?> delete(@PathVariable int id);
}
