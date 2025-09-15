package com.wipro.com.order_service.order.service;

import com.wipro.com.order_service.order.entity.Order;
import java.util.List;

public interface OrderService {
    
    // Create order from cart for a user
    Order createOrderFromCart(int userId);

    // Cancel an order
    Order cancelOrder(int orderId);

    // Update status of an order
    Order updateOrderStatus(int orderId, String status);

    // Get all orders
    List<Order> getAllOrders();

    // Get orders by user
    List<Order> getOrdersByUser(int userId);

    // Get order by orderId
    Order getOrderById(int orderId);
}
