package com.ecom.productservice.controller;


import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ecom.productservice.entity.Product;
import com.ecom.productservice.service.ProductService;
import com.ecom.productservice.util.AppConstants;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product")
public class ProductController {
	 private final ProductService service;
	    public ProductController(ProductService service) { this.service = service; }

	    @GetMapping public List<Product> list() { return service.listAll(); }
	    @GetMapping("/{id}") public Product get(@PathVariable Long id) { return service.get(id); }

	    @PostMapping @PreAuthorize("hasRole('ADMIN')")
	    public ResponseEntity<Product> create(@RequestBody Product p){ return ResponseEntity.status(HttpStatus.CREATED).body(service.create(p)); }

	    @PutMapping @PreAuthorize("hasRole('ADMIN')")
	    public Product update(@RequestBody Product p){ return service.update(p); }

	    @DeleteMapping @PreAuthorize("hasRole('ADMIN')")
	    public ResponseEntity<Void> delete(@RequestParam Long id){ service.delete(id); return ResponseEntity.ok().build(); }

	    @PutMapping("/internal/decrement")
	    public ResponseEntity<?> decrement(@RequestHeader(value="X-SERVICE-TOKEN", required=false) String token,
	                                       @RequestBody Map<String,Object> body){
	        if (token==null || !token.equals(AppConstants.INTERNAL_SERVICE_TOKEN))
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error","Forbidden"));

	        Long productId = ((Number)body.get("productId")).longValue();
	        int qty = ((Number)body.get("qty")).intValue();

	        // get product before decrement to read price
	        Product p = service.get(productId); // will throw if not found

	        try {
	            service.decrement(productId, qty); // reduces stock
	            // return price back to caller
	            return ResponseEntity.ok(Map.of("success", true, "price", p.getPrice()));
	        } catch(IllegalStateException e) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", AppConstants.INSUFFICIENT_STOCK));}
	        }
	    @PutMapping("/internal/increment")
	    public ResponseEntity<?> increment(@RequestHeader(value="X-SERVICE-TOKEN", required=false) String token,
	                                       @RequestBody Map<String,Object> body){
	        if (token==null || !token.equals(AppConstants.INTERNAL_SERVICE_TOKEN))
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden");
	        Long productId = ((Number)body.get("productId")).longValue();
	        int qty = ((Number)body.get("qty")).intValue();
	        service.increment(productId, qty);
	        return ResponseEntity.ok().build();
	    }
	    
	    
	    @GetMapping("/search")
	    public List<Product> searchProducts(@RequestParam String keyword) {
	        return service.searchByName(keyword);
	    }

	    @GetMapping("/category")
	    public List<Product> productsByCategory(@RequestParam String category) {
	        return service.searchByCategory(category);
	    }
}
