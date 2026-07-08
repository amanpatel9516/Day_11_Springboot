package com.cinebook.profile_service.service;

import java.util.List;

import com.cinebook.profile_service.dto.AuthResponse;
import com.cinebook.profile_service.dto.LoginRequest;
import com.cinebook.profile_service.dto.UserDTO;

public interface UserService {

    AuthResponse registerUser(UserDTO userDTO);

    AuthResponse login(LoginRequest loginRequest);

    UserDTO getUserById(Long id);

    List<UserDTO> getAllUsers();

    UserDTO updateUser(Long id, UserDTO userDTO);

    String deleteUser(Long id);
}
