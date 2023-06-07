package com.example.covid.controller;

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
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping()
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/betweenDates")
    public ResponseEntity<List<User>> getUsersBetweenDates(@RequestParam LocalDate startDate,
                                                           @RequestParam LocalDate endDate) {
        return new ResponseEntity<>(userService.getUsersBetweenDates(startDate, endDate), HttpStatus.OK);
    }

    @GetMapping("/byCity/{city}")
    public ResponseEntity<List<User>> getUsersByCity(@PathVariable("city") String city) {
        return new ResponseEntity<>(userService.getUsersByCity(city), HttpStatus.OK);
    }
}
