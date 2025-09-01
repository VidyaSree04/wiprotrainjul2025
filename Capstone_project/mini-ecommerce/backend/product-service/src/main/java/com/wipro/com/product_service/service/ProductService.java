package com.wipro.com.product_service.service;

import com.wipro.com.product_service.entity.Product;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    Product create(Product product);
    Product update(Product product);
    void delete(Long productId);
    List<Product> getAll();
    Optional<Product> getById(Long productId);
}
