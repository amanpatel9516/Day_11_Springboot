package com.cinebook.profile_service.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinebook.profile_service.entity.Role;
import com.cinebook.profile_service.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    java.util.List<User> findByRole(Role role);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

}
