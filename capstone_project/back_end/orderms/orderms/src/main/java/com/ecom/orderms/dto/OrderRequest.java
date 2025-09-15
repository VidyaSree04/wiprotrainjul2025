package com.ecom.orderms.dto;

import java.util.List;

public class OrderRequest {
	private List<CartItem> items;

    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }}
