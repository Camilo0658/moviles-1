package com.techstore.controller;

import com.techstore.model.Product;
import com.techstore.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET - Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // GET - Obtener producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = productService.getProductById(id);
        
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        }
        
        return ResponseEntity.notFound().build();
    }

    // POST - Crear nuevo producto
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    // PUT - Actualizar producto existente
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @Valid @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        }
        
        return ResponseEntity.notFound().build();
    }

    // DELETE - Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        boolean deleted = productService.deleteProduct(id);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.notFound().build();
    }

    // GET - Buscar productos por nombre
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String nombre) {
        List<Product> products = productService.searchByName(nombre);
        return ResponseEntity.ok(products);
    }
}
