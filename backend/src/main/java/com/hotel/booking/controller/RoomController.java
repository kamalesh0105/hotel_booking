package com.hotel.booking.controller;

import com.hotel.booking.dto.RoomDTO;
import com.hotel.booking.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/hotels/{hotelId}/rooms")
    public ResponseEntity<List<RoomDTO>> getRoomsByHotelId(@PathVariable UUID hotelId) {
        return ResponseEntity.ok(roomService.getRoomsByHotelId(hotelId));
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable UUID id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }
}
