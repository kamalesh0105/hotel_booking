package com.hotel.booking.controller;

import com.hotel.booking.dto.RoomAvailabilityUpdateDTO;
import com.hotel.booking.dto.RoomDTO;
import com.hotel.booking.dto.RoomRequestDTO;
import com.hotel.booking.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin/rooms")
@RequiredArgsConstructor
public class AdminRoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(@RequestBody RoomRequestDTO request) {
        return ResponseEntity.ok(roomService.createRoom(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomDTO> updateRoom(@PathVariable Long id, @RequestBody RoomRequestDTO request) {
        return ResponseEntity.ok(roomService.updateRoom(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/availability")
    public ResponseEntity<RoomDTO> updateAvailability(@PathVariable Long id, @RequestBody RoomAvailabilityUpdateDTO request) {
        return ResponseEntity.ok(roomService.updateAvailability(id, request.getAvailableRooms()));
    }
}
