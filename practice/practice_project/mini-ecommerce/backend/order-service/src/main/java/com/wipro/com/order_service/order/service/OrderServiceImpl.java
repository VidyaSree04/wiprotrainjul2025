package com.wipro.com.order_service.order.service;

import com.wipro.com.order_service.order.entity.Order;
import com.wipro.com.order_service.order.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
        this.restTemplate = new RestTemplate();
    }

    @Override
    public Order createOrderFromCart(int userId) {
        String cartUrl = "http://localhost:8083/cart/" + userId;
        CartResponse[] cartItems = restTemplate.getForObject(cartUrl, CartResponse[].class);

        if (cartItems == null || cartItems.length == 0) {
            throw new RuntimeException("Cart is empty for user " + userId);
        }

        Map<Integer, Integer> productQuantityMap = new HashMap<>();
        double totalAmount = 0.0;

        for (CartResponse item : cartItems) {
            int productId = item.getProductId();
            int quantity = item.getQuantity();

            productQuantityMap.put(productId,
                    productQuantityMap.getOrDefault(productId, 0) + quantity);

            String productUrl = "http://localhost:8082/product/" + productId;
            ProductResponse product = restTemplate.getForObject(productUrl, ProductResponse.class);

            if (product == null) {
                throw new RuntimeException("Product not found: " + productId);
            }

            totalAmount += product.getPrice() * quantity;
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setProductQuantityMap(productQuantityMap);
        order.setTotalAmount(totalAmount);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("CREATED");

        return orderRepository.save(order);
    }

    // 🔽 These were missing, so compiler complained

    @Override
    public Order cancelOrder(int orderId) {
        Order existing = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        existing.setOrderStatus("CANCELLED");
        return orderRepository.save(existing);
    }

    @Override
    public Order updateOrderStatus(int orderId, String status) {
        Order existing = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        existing.setOrderStatus(status);
        return orderRepository.save(existing);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrdersByUser(int userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order getOrderById(int orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
}
