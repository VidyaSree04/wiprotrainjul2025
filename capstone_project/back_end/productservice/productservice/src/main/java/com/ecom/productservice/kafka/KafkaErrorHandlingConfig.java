package com.ecom.productservice.kafka;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.util.backoff.FixedBackOff;

@Configuration
public class KafkaErrorHandlingConfig {
	@Bean
    public DefaultErrorHandler errorHandler() {
        return new DefaultErrorHandler(
            (ConsumerRecord<?, ?> record, Exception ex) -> {
                System.err.println("⚠️ Skipping bad record: " + record.value() + " due to: " + ex.getMessage());
            },
            new FixedBackOff(1000L, 2) // retry twice, then skip
        );
    }
}
