package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingDTO;
import com.hotel.booking.dto.BookingStatusUpdateDTO;
import com.hotel.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
public class AdminBookingController {

    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(
            @PathVariable UUID id,
            @RequestBody BookingStatusUpdateDTO request) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, request.getStatus()));
    }
}
