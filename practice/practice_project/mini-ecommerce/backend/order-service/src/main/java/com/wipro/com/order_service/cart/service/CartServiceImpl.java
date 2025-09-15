package com.wipro.com.order_service.cart.service;

import com.wipro.com.order_service.cart.entity.CartItem;
import com.wipro.com.order_service.cart.repository.CartRepository;
import com.wipro.com.order_service.client.ProductServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductServiceClient productServiceClient;
    
    @Override
    public CartItem addProductToCart(Long userId, Long productId, int quantity) {
        // --- THIS IS THE CRUCIAL VALIDATION STEP ---
        try {
            productServiceClient.getProductDetails(productId);
        } catch (Exception e) {
            // Throw a meaningful exception if the product doesn't exist
            throw new IllegalArgumentException("Product with ID " + productId + " does not exist.");
        }
        
        // --- If validation succeeds, proceed as before ---
        Optional<CartItem> existingItem = cartRepository.findByUserIdAndProductId(userId, productId);
        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            return cartRepository.save(cartItem);
        } else {
            CartItem newItem = new CartItem();
            newItem.setUserId(userId);
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            return cartRepository.save(newItem);
        }
    }
    
    @Override
    public void deleteProductFromCart(Long itemId) {
        cartRepository.deleteById(itemId);
    }

    @Override
    public CartItem updateCartItemQuantity(Long userId, Long productId, int newQuantity) {
        Optional<CartItem> existingItem = cartRepository.findByUserIdAndProductId(userId, productId);
        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(newQuantity);
            return cartRepository.save(cartItem);
        } else {
            // Handle case where item doesn't exist, maybe throw an exception
            return null;
        }
    }

    @Override
    public List<CartItem> viewCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }
}