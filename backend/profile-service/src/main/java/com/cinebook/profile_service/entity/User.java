package com.cinebook.profile_service.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.cinebook.profile_service.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Email
    @Column(unique = true, nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String password;
    @Enumerated(EnumType.STRING)
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

    public UserDTO toDTO(){
        return new UserDTO(this.id, this.firstName, this.lastName, this.email, this.role, this.password, this.gender, this.phoneNumber, this.dateOfBirth, this.addressLine, this.createdAt, this.updatedAt, this.isActive, this.city, this.state, this.pincode);
    }
}
