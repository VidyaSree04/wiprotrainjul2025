package com.wipro.com.order_service.order.service;

public class CartResponse {
    private int id;
    private int productId;
    private int quantity;
    private int userId;

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
}
