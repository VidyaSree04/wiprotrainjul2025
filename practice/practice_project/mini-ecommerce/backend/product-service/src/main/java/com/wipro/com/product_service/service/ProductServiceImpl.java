package com.wipro.com.product_service.service;

import com.wipro.com.product_service.entity.Product;
import com.wipro.com.product_service.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repo;

    public ProductServiceImpl(ProductRepository repo) {
        this.repo = repo;
    }

    @Override
    public Product create(Product product) {
        return repo.save(product);
    }

    @Override
    public Product update(Product product) {
        return repo.save(product);
    }

    @Override
    public void delete(Long productId) {
        repo.deleteById(productId);
    }

    @Override
    public List<Product> getAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Product> getById(Long productId) {
        return repo.findById(productId);
    }
}
