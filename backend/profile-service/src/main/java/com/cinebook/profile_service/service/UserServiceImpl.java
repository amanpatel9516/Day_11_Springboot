package com.cinebook.profile_service.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cinebook.profile_service.dto.AuthResponse;
import com.cinebook.profile_service.dto.LoginRequest;
import com.cinebook.profile_service.dto.UserDTO;
import com.cinebook.profile_service.entity.Role;
import com.cinebook.profile_service.entity.User;
import com.cinebook.profile_service.exception.CineBookException;
import com.cinebook.profile_service.exception.UserNotFoundException;
import com.cinebook.profile_service.repository.UserRepository;
import com.cinebook.profile_service.util.JwtUtil;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponse registerUser(UserDTO userDTO) {
        // Check if email already exists
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new CineBookException("A user with this email already exists");
        }

        // Check if phone number already exists (if provided)
        if (userDTO.getPhoneNumber() != null && !userDTO.getPhoneNumber().isBlank()
                && userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())) {
            throw new CineBookException("A user with this phone number already exists");
        }

        User user = userDTO.toEntity();
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setIsActive(true);

        // Default role to USER if not specified
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser);

        return new AuthResponse(token, savedUser.toDTO(), "User registered successfully");
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new CineBookException("Invalid email or password"));

        if (!user.getIsActive()) {
            throw new CineBookException("Account is deactivated. Please contact support.");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new CineBookException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token, user.toDTO(), "Login successful");
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return user.toDTO();
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(User::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        // Update only the fields that are provided
        if (userDTO.getFirstName() != null) {
            existingUser.setFirstName(userDTO.getFirstName());
        }
        if (userDTO.getLastName() != null) {
            existingUser.setLastName(userDTO.getLastName());
        }
        if (userDTO.getEmail() != null && !userDTO.getEmail().equals(existingUser.getEmail())) {
            // Check if new email is taken
            if (userRepository.existsByEmail(userDTO.getEmail())) {
                throw new CineBookException("A user with this email already exists");
            }
            existingUser.setEmail(userDTO.getEmail());
        }
        if (userDTO.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        }
        if (userDTO.getGender() != null) {
            existingUser.setGender(userDTO.getGender());
        }
        if (userDTO.getDateOfBirth() != null) {
            existingUser.setDateOfBirth(userDTO.getDateOfBirth());
        }
        if (userDTO.getAddressLine() != null) {
            existingUser.setAddressLine(userDTO.getAddressLine());
        }
        if (userDTO.getCity() != null) {
            existingUser.setCity(userDTO.getCity());
        }
        if (userDTO.getState() != null) {
            existingUser.setState(userDTO.getState());
        }
        if (userDTO.getPincode() != 0) {
            existingUser.setPincode(userDTO.getPincode());
        }
        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        existingUser.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(existingUser);
        return updatedUser.toDTO();
    }

    @Override
    public String deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        // Soft delete — deactivate the user
        user.setIsActive(false);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        return "User with id " + id + " has been deactivated successfully";
    }
}
