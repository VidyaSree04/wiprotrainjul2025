package com.wipro.com.order_service.cart.controller;

import com.wipro.com.order_service.cart.entity.CartItem;
import com.wipro.com.order_service.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // DTO for Add Product to Cart
    public static class AddToCartRequest {
        private Long userId;
        private Long productId;
        private int quantity;

        // Getters and Setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    // DTO for Update Quantity
    public static class UpdateCartRequest {
        private Long userId;
        private Long productId;
        private int newQuantity;

        // Getters and Setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public int getNewQuantity() { return newQuantity; }
        public void setNewQuantity(int newQuantity) { this.newQuantity = newQuantity; }
    }


    @PostMapping("/addProd")
    public ResponseEntity<CartItem> addProductToCart(@RequestBody AddToCartRequest request) {
        CartItem cartItem = cartService.addProductToCart(request.getUserId(), request.getProductId(), request.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteProd/{itemId}")
    public ResponseEntity<Void> deleteProductFromCart(@PathVariable Long itemId) {
        cartService.deleteProductFromCart(itemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(@RequestBody UpdateCartRequest request) {
        CartItem updatedCartItem = cartService.updateCartItemQuantity(request.getUserId(), request.getProductId(), request.getNewQuantity());
        if (updatedCartItem != null) {
            return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> viewCart(@PathVariable Long userId) {
        List<CartItem> cartItems = cartService.viewCart(userId);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }
}