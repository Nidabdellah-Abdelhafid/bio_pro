package com.biomedicale.web.rest;

// ARIMAController.java
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.biomedicale.domain.ARIMAMessage;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ARIMAController {

    // Autowire RabbitTemplate for RabbitMQ operations
    @Autowired
    private AmqpTemplate rabbitTemplate;

    // Define the exchange name
    private static final String EXCHANGE_NAME = "prediction_exchangesa";

    // Define the queue name
    private static final String QUEUE_NAME = "arima-result-queue";

    // Define the routing key (empty string for fanout exchange)
    private static final String ROUTING_KEY = "";

    // Map to store ARIMA result
    private Map<String, Object> arimaResult;
    private final ObjectMapper objectMapper;

    public ARIMAController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
    @PostMapping("/arima/train-and-predict-rabbitmq")
    public ResponseEntity<String> trainAndPredictARIMARabbitMQ(
        @RequestParam("startDate") String startDate,
        @RequestParam("jsonDataList") String jsonDataList
    ) {
        try {
            // Convert JSON string to a List<Map<String, Object>>
            List<Map<String, Object>> temperatureData = objectMapper.readValue(jsonDataList, new TypeReference<List<Map<String, Object>>>(){});
            System.out.println(temperatureData);
            // Rest of your code
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, new ARIMAMessage(startDate, temperatureData).toJson());

            return ResponseEntity.ok("Data sent to RabbitMQ for processing");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }


    private void closeInputStream(InputStream inputStream) {
        try {
            if (inputStream != null) {
                inputStream.close();
            }
        } catch (IOException e) {
            // Handle exception or log if needed
        }
    }

    @RabbitListener(queues = QUEUE_NAME)
    public void receiveResult(String result) {
        System.out.println("Received ARIMA Result: " + result);

        // Try to parse the received JSON result
        try {
            arimaResult = new ObjectMapper().readValue(result, new TypeReference<Map<String, Object>>() {});
            System.out.println("Parsed ARIMA Result: " + arimaResult);

            Object predictionValue = arimaResult.get("prediction");

            if (predictionValue != null) {
                System.out.println("Prediction: " + predictionValue.toString());
            } else {
                System.out.println("Prediction is null");
            }
        } catch (IOException e) {
            System.out.println("Error parsing the received JSON result: " + e.getMessage());
        }
    }

    @GetMapping("/arima/result")
    public ResponseEntity<Map<String, Object>> getArimaResult() {
        int maxAttempts = 10;
        int attempt = 0;
        while (arimaResult == null && attempt < maxAttempts) {
            try {
                // Sleep for a short interval before checking again
                Thread.sleep(1000);
                attempt++;

                // You can adjust the sleep duration and maxAttempts based on your requirements

            } catch (InterruptedException e) {
                // Handle exception or log if needed
            }
        }

        if (arimaResult != null) {
            return ResponseEntity.ok(arimaResult);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "ARIMA result not available"));
        }
    }

}
