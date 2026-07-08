package com.cinebook.profile_service.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.cinebook.profile_service.entity.Gender;
import com.cinebook.profile_service.entity.Role;
import com.cinebook.profile_service.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private Long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    private Role role;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private Gender gender;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String addressLine;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive = true;
    private String city;
    private String state;
    private int pincode;

    public User toEntity() {
        return new User(this.id, this.firstName, this.lastName, this.email, this.role, this.password, this.gender, this.phoneNumber, this.dateOfBirth, this.addressLine, this.createdAt, this.updatedAt, this.isActive, this.city, this.state, this.pincode);
    }
}
