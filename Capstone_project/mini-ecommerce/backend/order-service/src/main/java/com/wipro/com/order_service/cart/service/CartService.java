package com.wipro.com.order_service.cart.service;

import com.wipro.com.order_service.cart.entity.CartItem;
import java.util.List;

public interface CartService {

    CartItem addProductToCart(Long userId, Long productId, int quantity);

    void deleteProductFromCart(Long itemId);

    CartItem updateCartItemQuantity(Long userId, Long productId, int newQuantity);

    List<CartItem> viewCart(Long userId);
}