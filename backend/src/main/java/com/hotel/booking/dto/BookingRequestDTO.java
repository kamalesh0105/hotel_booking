package com.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    private UUID userId;
    private UUID roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
}
