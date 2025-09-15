package com.wipro.com.product_service.controller;

import com.wipro.com.product_service.entity.Product;
import com.wipro.com.product_service.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return productService.create(product);
    }

    @PutMapping
    public Product update(@RequestBody Product product) {
        return productService.update(product);
    }

    @DeleteMapping("/{productId}")
    public void delete(@PathVariable Long productId) {
        productService.delete(productId);
    }

    @GetMapping
    public List<Product> list() {
        return productService.getAll();
    }

    @GetMapping("/{productId}")
    public Optional<Product> detail(@PathVariable Long productId) {
        return productService.getById(productId);
    }
}
