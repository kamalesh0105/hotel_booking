package com.hotel.booking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequestDTO {
    private UUID hotelId;
    private String roomType;
    private BigDecimal pricePerNight;
    private Integer capacity;
    private Integer totalRooms;
}
