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

    public HotelDTO getHotelById(Long id) {
        return hotelRepository.findById(id)
                .map(this::mapToDTO)
                .orElse(null);
    }

    public List<HotelDTO> searchHotels(String location, Double minPrice, Double maxPrice, Integer capacity) {
        Specification<Hotel> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Hotel Location Filter
            if (location != null && !location.trim().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
            }

            // Room Properties Filters (via Subquery)
            if (minPrice != null || maxPrice != null || capacity != null) {
                jakarta.persistence.criteria.Subquery<com.hotel.booking.entity.Room> roomSubquery = query.subquery(com.hotel.booking.entity.Room.class);
                jakarta.persistence.criteria.Root<com.hotel.booking.entity.Room> roomRoot = roomSubquery.from(com.hotel.booking.entity.Room.class);
                roomSubquery.select(roomRoot);

                List<Predicate> roomPredicates = new ArrayList<>();
                roomPredicates.add(cb.equal(roomRoot.get("hotel"), root)); // Join condition connecting room to hotel

                if (minPrice != null) {
                    roomPredicates.add(cb.ge(roomRoot.get("pricePerNight"), minPrice));
                }
                if (maxPrice != null) {
                    roomPredicates.add(cb.le(roomRoot.get("pricePerNight"), maxPrice));
                }
                if (capacity != null) {
                    roomPredicates.add(cb.ge(roomRoot.get("capacity"), capacity));
                }

                roomSubquery.where(roomPredicates.toArray(new Predicate[0]));
                predicates.add(cb.exists(roomSubquery));
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
    public HotelDTO updateHotel(Long id, HotelDTO hotelDTO) {
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
    public boolean deleteHotel(Long id) {
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
