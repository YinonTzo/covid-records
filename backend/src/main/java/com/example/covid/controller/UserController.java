package com.example.covid.controller;

import com.example.covid.DTO.UserDTO;
import com.example.covid.entity.User;
import com.example.covid.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping()
    public ResponseEntity<User> addUser(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.addUser(userDTO), HttpStatus.CREATED);
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/betweenDates")
    public ResponseEntity<List<UserDTO>> getUsersBetweenDates(@RequestParam LocalDate startDate,
                                                           @RequestParam LocalDate endDate) {
        return new ResponseEntity<>(userService.getUsersBetweenDates(startDate, endDate), HttpStatus.OK);
    }

    @GetMapping("/byCity/{city}")
    public ResponseEntity<List<UserDTO>> getUsersByCity(@PathVariable("city") String city) {
        return new ResponseEntity<>(userService.getUsersByCity(city), HttpStatus.OK);
    }
}
