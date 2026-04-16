package com.hotel.booking.dto;

import com.hotel.booking.model.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private LocalDateTime createdAt;
}
