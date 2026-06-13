package com.techstore.service;

import com.techstore.model.Product;
import com.techstore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Obtener todos los productos
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Obtener producto por ID
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    // Crear nuevo producto
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Actualizar producto existente
    public Product updateProduct(String id, Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setNombre(productDetails.getNombre());
            product.setPrecio(productDetails.getPrecio());
            product.setDescripcion(productDetails.getDescripcion());
            product.setImagen(productDetails.getImagen());
            return productRepository.save(product);
        }
        
        return null;
    }

    // Eliminar producto
    public boolean deleteProduct(String id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        
        if (optionalProduct.isPresent()) {
            productRepository.deleteById(id);
            return true;
        }
        
        return false;
    }

    // Buscar productos por nombre
    public List<Product> searchByName(String nombre) {
        return productRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
