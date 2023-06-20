package com.example.covid.service;

import com.example.covid.DTO.UserDTO;
import com.example.covid.entity.User;
import com.example.covid.exception.UserCustomException;
import com.example.covid.repository.PreviousConditionRepository;
import com.example.covid.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PreviousConditionRepository previousConditionRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void addUser() {
        // Arrange
        UserDTO userDTO = new UserDTO();

        User user = new User();

        when(userRepository.save(user)).thenReturn(user);

        // Act
        User savedUser = userService.addUser(userDTO);

        // Assert
        verify(userRepository, times(1)).save(user);
        Assertions.assertEquals(user, savedUser);
    }

    @Test
    void getUserById_WhenUserExists_ShouldReturnUserDTO() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Act
        UserDTO userDTO = userService.getUserById(userId);

        // Assert
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void getUserById_WhenUserDoesNotExist_ShouldThrowException() {
        // Arrange
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act & Assert
        Assertions.assertThrows(UserCustomException.class, () -> userService.getUserById(userId));
    }

    @Test
    void getUsers() {
        // Arrange
        User user1 = new User();
        User user2 = new User();
        List<User> users = Arrays.asList(user1, user2);
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<UserDTO> userDTOS = userService.getUsers();

        // Assert
        verify(userRepository, times(1)).findAll();
        Assertions.assertEquals(2, userDTOS.size());
    }

    @Test
    void getUsersBetweenDates() {
        // Arrange
        LocalDate startDate = LocalDate.of(2023, 1, 1);
        LocalDate endDate = LocalDate.of(2023, 12, 31);
        User user1 = new User();
        User user2 = new User();
        List<User> users = Arrays.asList(user1, user2);
        when(userRepository.findByDateOfBirthBetween(startDate, endDate)).thenReturn(users);

        // Act
        List<UserDTO> userDTOS = userService.getUsersBetweenDates(startDate, endDate);

        // Assert
        verify(userRepository, times(1)).findByDateOfBirthBetween(startDate, endDate);
        Assertions.assertEquals(2, userDTOS.size());
    }

    @Test
    void getUsersByCity() {
        // Arrange
        String city = "New York";
        User user1 = User.builder()
                .city(city)
                .build();

        User user2 = User.builder()
                .city(city)
                .build();

        List<User> users = Arrays.asList(user1, user2);
        when(userRepository.findByCityContainingIgnoreCase(city)).thenReturn(users);

        // Act
        List<UserDTO> userDTOS = userService.getUsersByCity(city);

        // Assert
        verify(userRepository, times(1)).findByCityContainingIgnoreCase(city);
        Assertions.assertEquals(2, userDTOS.size());
    }
}