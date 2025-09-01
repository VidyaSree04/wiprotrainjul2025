package com.wipro.com.order_service.order.controller;

import com.wipro.com.order_service.order.entity.Order;
import com.wipro.com.order_service.order.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody CreateOrderRequest req) {
        Order created = service.createOrderFromCart(req.getUserId());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{orderId}")
    public Order cancel(@PathVariable int orderId) {
        return service.cancelOrder(orderId);
    }

    @GetMapping
    public List<Order> all() {
        return service.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> byUser(@PathVariable int userId) {
        return service.getOrdersByUser(userId);
    }

    @GetMapping("/{orderId}")
    public Order details(@PathVariable int orderId) {
        return service.getOrderById(orderId);
    }

    @PutMapping("/{orderId}/status")
    public Order updateStatus(@PathVariable int orderId, @RequestParam String status) {
        return service.updateOrderStatus(orderId, status);
    }

    public static class CreateOrderRequest {
        private int userId;
        public int getUserId() { return userId; }
        public void setUserId(int userId) { this.userId = userId; }
    }
}
