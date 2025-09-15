package com.ecom.productservice.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.productservice.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoryIgnoreCase(String category);
}
