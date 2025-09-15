package com.ecom.orderms.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.ecom.orderms.dto.CartItem;
import com.ecom.orderms.entity.Order;
import com.ecom.orderms.repo.OrderRepository;
import com.ecom.orderms.util.AppConstants;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {
	private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;
    private final KafkaTemplate<String,Object> kafka;

    public OrderService(OrderRepository orderRepository, RestTemplate restTemplate, KafkaTemplate<String, Object> kafka) {
        this.orderRepository = orderRepository;
        this.restTemplate = restTemplate;
        this.kafka = kafka;
    }
    
    public Order cancelOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setStatus("CANCELLED");
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found with id " + orderId));
    }
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> placeMultipleOrders(Long userId, List<CartItem> items) {
        List<Order> saved = new ArrayList<>();
        if (items == null || items.isEmpty()) return saved;

        for (CartItem it : items) {
            String url = "http://PRODUCTSERVICE/product/internal/decrement";

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-SERVICE-TOKEN", AppConstants.INTERNAL_SERVICE_TOKEN);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> body = Map.of(
                "productId", it.getProductId(),
                "qty", it.getQuantity()
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            try {
                ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.PUT, request, Map.class);

                if (!response.getStatusCode().is2xxSuccessful() || response.getBody()==null) {
                    throw new IllegalStateException("Failed to decrement product " + it.getProductId());
                }

                Object priceObj = response.getBody().get("price");
                double price = (priceObj instanceof Number) ? ((Number)priceObj).doubleValue() : Double.parseDouble(priceObj.toString());

                double totalPrice = price * it.getQuantity();
                Order order = new Order(userId, it.getProductId(), it.getQuantity(), totalPrice, new Date());
                order.setStatus("PENDING");
                Order savedOrder = orderRepository.save(order);
                saved.add(savedOrder);

                // build a simple Map event payload (no DTO required)
                Map<String,Object> ev = Map.of(
                    "eventType", "CREATED",
                    "orderId", savedOrder.getId(),
                    "userId", savedOrder.getUserId(),
                    "items", List.of(Map.of("productId", savedOrder.getProductId(), "quantity", savedOrder.getQuantity()))
                );

                publishAfterCommit("orderevents", String.valueOf(savedOrder.getId()), ev);

            } catch (HttpClientErrorException e) {
                if (e.getStatusCode().is4xxClientError()) {
                    throw new IllegalStateException("Product service error: " + e.getStatusCode().toString() + " - " + e.getResponseBodyAsString());
                }
                throw e;
            } catch (Exception e) {
                throw new RuntimeException("OrderService error while processing product " + it.getProductId(), e);
            }
        }
        return saved;
    }

    public List<Order> getOrdersForUser(Long userId) { return orderRepository.findByUserId(userId); }

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
