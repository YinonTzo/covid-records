package com.example.covid.service;

import com.example.covid.entity.User;
import com.example.covid.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User addUser(User user) {
        User saved = userRepository.save(user);
        log.info("Register new user: {}", saved);
        return saved;
    }

    @Override
    public User getUserById(Long id) {
        //TODO: change it when add exceptions.
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("There is no user"));
        log.info("Get user {}.", user);
        return user;
    }

    @Override
    public List<User> getUsers() {
        List<User> users =  userRepository.findAll();
        log.info("Get all users {}.", users);
        return users;
    }

    @Override
    public List<User> getUsersBetweenDates(LocalDate startDate, LocalDate endDate) {
        List<User> users = userRepository.findByBirthDateBetween(startDate, endDate);
        log.info("Get all users between {} to {}.", startDate, endDate);
        log.info("There are {} users. The users: {}.", users.size(), users);
        return users;
    }

    @Override
    public List<User> getUsersByCity(String city) {
        List<User> users = userRepository.findUserByCity(city);
        log.info("Get all users in city name {}. The users: {}.", city, users);
        return users;
    }
}
