package com.hotel.booking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelDTO {
    private UUID id;
    private String name;
    private String location;
    private String address;
    private String description;
    private Double rating;
    private LocalDateTime createdAt;
}
