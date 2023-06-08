package com.example.covid.service;

import com.example.covid.DTO.UserDTO;
import com.example.covid.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface UserService {

    User addUser(UserDTO userDTO);

    UserDTO getUserById(Long id);

    List<UserDTO> getUsers();

    List<UserDTO> getUsersBetweenDates(LocalDate startDate, LocalDate endDate);

    List<UserDTO> getUsersByCity(String city);
}
