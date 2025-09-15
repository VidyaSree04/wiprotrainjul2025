package com.ecom.productservice.service;


import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import com.ecom.productservice.entity.Product;
import com.ecom.productservice.repo.ProductRepository;

import java.util.List;
import java.util.Map;

@Service
public class ProductService {
	 private final ProductRepository repo;
	    private final KafkaTemplate<String, Object> kafka;

	    public ProductService(ProductRepository repo, KafkaTemplate<String, Object> kafka) {
	        this.repo = repo;
	        this.kafka = kafka;
	    }

	    public List<Product> searchByName(String keyword) {
	        return repo.findByNameContainingIgnoreCase(keyword);
	    }

	    public List<Product> searchByCategory(String category) {
	        return repo.findByCategoryIgnoreCase(category);
	    }

	    public List<Product> listAll() { return repo.findAll(); }

	    public Product get(Long id) {
	        return repo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
	    }

	    public Product create(Product p) {
	        Product saved = repo.save(p);
	        kafka.send("productevents", String.valueOf(saved.getId()),
	                Map.of("eventType", "CREATED", "productId", saved.getId()));
	        return saved;
	    }

	    public Product update(Product p) {
	        Product e = get(p.getId());
	        e.setName(p.getName());
	        e.setDescription(p.getDescription());
	        e.setCategory(p.getCategory());
	        e.setImageUrl(p.getImageUrl());
	        e.setPrice(p.getPrice());
	        e.setQuantity(p.getQuantity());
	        e.setActive(p.getActive());
	        Product saved = repo.save(e);

	        kafka.send("productevents", String.valueOf(saved.getId()),
	                Map.of("eventType", "UPDATED", "productId", saved.getId()));
	        return saved;
	    }

	    public void delete(Long id) {
	        Product toDelete = get(id);
	        repo.delete(toDelete);
	        kafka.send("productevents", String.valueOf(id),
	                Map.of("eventType", "DELETED", "productId", id));
	    }

	    @Transactional
	    public void decrement(Long productId, int qty) {
	        Product p = get(productId);
	        if (p.getQuantity() < qty) throw new IllegalStateException("Quantity not available");
	        p.setQuantity(p.getQuantity() - qty);
	        repo.save(p);

	        publishAfterCommit("productevents", String.valueOf(productId),
	                Map.of("eventType","QTY_ADJUSTED","productId",productId,"quantityDelta",-qty));
	    }

	    @Transactional
	    public void increment(Long productId, int qty) {
	        Product p = get(productId);
	        p.setQuantity(p.getQuantity() + qty);
	        repo.save(p);

	        publishAfterCommit("productevents", String.valueOf(productId),
	                Map.of("eventType","QTY_RESTORED","productId",productId,"quantityDelta",qty));
	    }

	    private void publishAfterCommit(String topic, String key, Map<String,Object> payload) {
	        if (TransactionSynchronizationManager.isSynchronizationActive()) {
	            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
	                @Override public void afterCommit() {
	                    kafka.send(topic, key, payload);
	                }
	            });
	        } else {
	            kafka.send(topic, key, payload);
	        }
	    }
}
