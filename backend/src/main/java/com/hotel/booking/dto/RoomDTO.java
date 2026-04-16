package com.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Long id;
    private Long hotelId;
    private String roomType;
    private BigDecimal pricePerNight;
    private Integer capacity;
    private Integer totalRooms;
    private Integer availableRooms;
}
