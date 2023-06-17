package com.example.covid.controller;

import com.example.covid.DTO.UserDTO;
import com.example.covid.entity.User;
import com.example.covid.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        objectMapper = new ObjectMapper();
    }

    @Test
    void addUser() throws Exception {
        // Arrange
        UserDTO userDTO = new UserDTO();
        User savedUser = new User();
        when(userService.addUser(userDTO)).thenReturn(savedUser);

        // Act & Assert
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists()); // Assuming User has an "id" field

        verify(userService, times(1)).addUser(userDTO);
    }

    @Test
    void getUserById() throws Exception {
        // Arrange
        Long userId = 1L;
        String testName = "testName";
        UserDTO userDTO = UserDTO.builder()
                .firstName(testName)
                .build();
        when(userService.getUserById(userId)).thenReturn(userDTO);

        // Act & Assert
        mockMvc.perform(get("/user/byId/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value(testName));

        verify(userService, times(1)).getUserById(userId);
    }

    @Test
    void getUsers() throws Exception {
        // Arrange
        UserDTO userDTO1 = new UserDTO();
        UserDTO userDTO2 = new UserDTO();
        List<UserDTO> userDTOs = Arrays.asList(userDTO1, userDTO2);
        when(userService.getUsers()).thenReturn(userDTOs);

        // Act & Assert
        mockMvc.perform(get("/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());

        verify(userService, times(1)).getUsers();
    }

    @Test
    void getUsersBetweenDates() throws Exception {
        // Arrange
        String startDate = "2023-01-01";
        String endDate = "2023-12-31";
        UserDTO userDTO1 = new UserDTO();
        UserDTO userDTO2 = new UserDTO();
        List<UserDTO> userDTOs = Arrays.asList(userDTO1, userDTO2);
        when(userService.getUsersBetweenDates(LocalDate.parse(startDate), LocalDate.parse(endDate))).thenReturn(userDTOs);

        // Act & Assert
        mockMvc.perform(get("/user/betweenDates")
                        .param("startDate", startDate)
                        .param("endDate", endDate))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());

        verify(userService, times(1)).getUsersBetweenDates(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @Test
    void getUsersByCity() throws Exception {
        // Arrange
        String city = "New York";
        UserDTO userDTO1 = new UserDTO();
        UserDTO userDTO2 = new UserDTO();
        List<UserDTO> userDTOs = Arrays.asList(userDTO1, userDTO2);
        when(userService.getUsersByCity(city)).thenReturn(userDTOs);

        // Act & Assert
        mockMvc.perform(get("/user/byCity/{city}", city))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());

        verify(userService, times(1)).getUsersByCity(city);
    }
}