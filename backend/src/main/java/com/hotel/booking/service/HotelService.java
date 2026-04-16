package com.hotel.booking.service;

import com.hotel.booking.dto.HotelDTO;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.criteria.Predicate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;

    public List<HotelDTO> getAllHotels() {
        return hotelRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public HotelDTO getHotelById(UUID id) {
        return hotelRepository.findById(id)
                .map(this::mapToDTO)
                .orElse(null);
    }

    public List<HotelDTO> searchHotels(String location, Double minPrice, Double maxPrice, Integer capacity) {
        // Price and capacity are ignored here as they require the Room entity
        // which is excluded as per the current requirements.
        Specification<Hotel> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (location != null && !location.trim().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return hotelRepository.findAll(spec).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public HotelDTO createHotel(HotelDTO hotelDTO) {
        Hotel hotel = mapToEntity(hotelDTO);
        hotel.setCreatedAt(LocalDateTime.now());
        Hotel savedHotel = hotelRepository.save(hotel);
        return mapToDTO(savedHotel);
    }

    @Transactional
    public HotelDTO updateHotel(UUID id, HotelDTO hotelDTO) {
        return hotelRepository.findById(id).map(existingHotel -> {
            existingHotel.setName(hotelDTO.getName());
            existingHotel.setLocation(hotelDTO.getLocation());
            existingHotel.setAddress(hotelDTO.getAddress());
            existingHotel.setDescription(hotelDTO.getDescription());
            existingHotel.setRating(hotelDTO.getRating());
            return mapToDTO(hotelRepository.save(existingHotel));
        }).orElse(null);
    }

    @Transactional
    public boolean deleteHotel(UUID id) {
        if (hotelRepository.existsById(id)) {
            hotelRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private HotelDTO mapToDTO(Hotel hotel) {
        return HotelDTO.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .location(hotel.getLocation())
                .address(hotel.getAddress())
                .description(hotel.getDescription())
                .rating(hotel.getRating())
                .createdAt(hotel.getCreatedAt())
                .build();
    }

    private Hotel mapToEntity(HotelDTO dto) {
        return Hotel.builder()
                .id(dto.getId())
                .name(dto.getName())
                .location(dto.getLocation())
                .address(dto.getAddress())
                .description(dto.getDescription())
                .rating(dto.getRating())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}
