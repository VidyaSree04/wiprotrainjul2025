package com.ecom.orderms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecom.orderms.dto.OrderRequest;
import com.ecom.orderms.entity.Order;
import com.ecom.orderms.service.OrderService;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {
	 private final OrderService orderService;

	    public OrderController(OrderService orderService) {
	        this.orderService = orderService;
	    }

	    @GetMapping("/admin/all")
	    public List<Order> allOrders() {
	        return orderService.getAllOrders();
	    }

	    
	    @PutMapping("/{id}/status")
	    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
	        try {
	            Order updated = orderService.updateStatus(id, status);
	            return ResponseEntity.ok(updated);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
	        }
	    }
	    
	    @GetMapping("/myorders")
	    public ResponseEntity<List<Order>> getMyOrders(Principal principal) {
	        try {
	            Long userId = Long.parseLong(principal.getName()); // assuming JWT subject = userId
	            List<Order> orders = orderService.getOrdersByUserId(userId);
	            return ResponseEntity.ok(orders);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                                 .body(Collections.emptyList());
	        }
	    }

	    // Place order for ALL items in cart
	    @PostMapping("/place")
	    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest body, Principal principal) {
	        try {
	            Long userId = Long.parseLong(principal.getName());
	            List<Order> orders = orderService.placeMultipleOrders(userId, body.getItems());
	            return ResponseEntity.ok(orders);
	        } catch (NumberFormatException e) {
	            return ResponseEntity.badRequest().body(Map.of("error", "Principal is not numeric: " + principal.getName()));
	        } catch (IllegalStateException e) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
	        } catch (Exception e) {
	            e.printStackTrace(); // 👈 log full error
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
	        }
	    }
       
	    @PutMapping("/{orderId}/cancel")
	    public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId) {
	        try {
	            Order updated = orderService.cancelOrder(orderId);
	            return ResponseEntity.ok(updated);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                                 .body(null);
	        }
	    }
	     
	      
}
