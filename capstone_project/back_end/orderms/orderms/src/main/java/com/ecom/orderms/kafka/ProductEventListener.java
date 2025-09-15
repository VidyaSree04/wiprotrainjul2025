package com.ecom.orderms.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.ecom.orderms.kafka.dto.ProductEvent;

@Component
public class ProductEventListener {
	private static final Logger log = LoggerFactory.getLogger(ProductEventListener.class);

	@KafkaListener(
		    topics = "productevents",
		    groupId = "orderms-group",
		    containerFactory = "productEventListenerContainerFactory"
		)
		public void onProductEvent(ProductEvent event) {
		    log.info("✅ OrderMS consumed product-event: {}", event);
		}
}
