package com.hotel.booking.service;

import com.hotel.booking.dto.RoomDTO;
import com.hotel.booking.dto.RoomRequestDTO;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Room;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    @Transactional(readOnly = true)
    public List<RoomDTO> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return mapToDTO(room);
    }

    @Transactional
    public RoomDTO createRoom(RoomRequestDTO requestDTO) {
        Hotel hotel = hotelRepository.findById(requestDTO.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        Room room = Room.builder()
                .hotel(hotel)
                .roomType(requestDTO.getRoomType())
                .pricePerNight(requestDTO.getPricePerNight())
                .capacity(requestDTO.getCapacity())
                .totalRooms(requestDTO.getTotalRooms())
                .availableRooms(requestDTO.getTotalRooms()) // initially all are available
                .build();

        return mapToDTO(roomRepository.save(room));
    }

    @Transactional
    public RoomDTO updateRoom(Long id, RoomRequestDTO requestDTO) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        
        Hotel hotel = hotelRepository.findById(requestDTO.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        room.setHotel(hotel);
        room.setRoomType(requestDTO.getRoomType());
        room.setPricePerNight(requestDTO.getPricePerNight());
        room.setCapacity(requestDTO.getCapacity());
        room.setTotalRooms(requestDTO.getTotalRooms());
        // Note: availableRooms might need special handling if totalRooms changes, keeping simple for now

        return mapToDTO(roomRepository.save(room));
    }

    @Transactional
    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found");
        }
        roomRepository.deleteById(id);
    }

    @Transactional
    public RoomDTO updateAvailability(Long id, Integer availableRooms) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (availableRooms < 0 || availableRooms > room.getTotalRooms()) {
            throw new RuntimeException("Invalid available rooms value");
        }
        room.setAvailableRooms(availableRooms);

        return mapToDTO(roomRepository.save(room));
    }

    private RoomDTO mapToDTO(Room room) {
        return RoomDTO.builder()
                .id(room.getId())
                .hotelId(room.getHotel().getId())
                .roomType(room.getRoomType())
                .pricePerNight(room.getPricePerNight())
                .capacity(room.getCapacity())
                .totalRooms(room.getTotalRooms())
                .availableRooms(room.getAvailableRooms())
                .build();
    }
}
