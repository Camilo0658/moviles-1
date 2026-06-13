package com.techstore.repository;

import com.techstore.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    // Buscar productos por nombre (contiene, ignorando mayúsculas/minúsculas)
    List<Product> findByNombreContainingIgnoreCase(String nombre);
    
    // Buscar productos por rango de precio
    List<Product> findByPrecioBetween(Double precioMin, Double precioMax);
}
