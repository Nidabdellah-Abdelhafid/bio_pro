package com.biomedicale.domain;

// ARIMAMessage.java

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class ARIMAMessage implements Serializable {

    private String startDate;
    private List<Map<String, Object>> temperatureData;

    public ARIMAMessage(String startDate, List<Map<String, Object>> temperatureData) {
        this.startDate = startDate;
        this.temperatureData = temperatureData;
    }



    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public List<Map<String, Object>> getTemperatureData() {
        return temperatureData;
    }

    public void setTemperatureData(List<Map<String, Object>> temperatureData) {
        this.temperatureData = temperatureData;
    }

    @Override
    public String toString() {
        return "ARIMAMessage{" +
            "startDate='" + startDate + '\'' +
            ", temperatureData=" + temperatureData +
            '}';
    }

    // Add a method to convert the object to JSON
    public String toJson() {
        // Use a library like Jackson to convert the object to JSON
        // For simplicity, I'm using a simple manual conversion here
        return "{\"startDate\": \"" + startDate + "\", \"temperatureData\": " + convertListToJson(temperatureData) + "}";
    }

    private String convertListToJson(List<Map<String, Object>> list) {
        try {
            return new ObjectMapper().writeValueAsString(list);
        } catch (JsonProcessingException e) {
            // Handle exception or log if needed
            return "[]"; // Return an empty array in case of an error
        }
    }
}

