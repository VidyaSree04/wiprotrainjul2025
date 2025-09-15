package com.ecom.productservice.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.ecom.productservice.kafka.dto.OrderEvent;

@Component
public class OrderEventsListener {
	 private static final Logger log = LoggerFactory.getLogger(OrderEventsListener.class);

	 @KafkaListener(
			    topics = "orderevents",
			    groupId = "productservice-group",
			    containerFactory = "orderEventListenerContainerFactory"
			)
			public void onOrderEvent(OrderEvent event) {
			    log.info("✅ ProductService consumed order-event: {}", event);
			}
}
