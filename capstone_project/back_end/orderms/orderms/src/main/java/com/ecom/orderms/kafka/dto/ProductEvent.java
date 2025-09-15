package com.ecom.orderms.kafka.dto;

import java.util.List;

public class ProductEvent {    
	 private Long productId;
	    private int quantityDelta;
	    private String eventType;

	    // getters & setters
	    public Long getProductId() { return productId; }
	    public void setProductId(Long productId) { this.productId = productId; }

	    public int getQuantityDelta() { return quantityDelta; }
	    public void setQuantityDelta(int quantityDelta) { this.quantityDelta = quantityDelta; }

	    public String getEventType() { return eventType; }
	    public void setEventType(String eventType) { this.eventType = eventType; }
	}
