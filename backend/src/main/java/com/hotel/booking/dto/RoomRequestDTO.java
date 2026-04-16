package com.hotel.booking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequestDTO {
    private Long hotelId;
    private String roomType;
    private BigDecimal pricePerNight;
    private Integer capacity;
    private Integer totalRooms;
}
