package com.example.covid.service;

import com.example.covid.DTO.UserDTO;
import com.example.covid.entity.PreviousCondition;
import com.example.covid.entity.User;
import com.example.covid.exception.UserCustomException;
import com.example.covid.mappers.UserMapper;
import com.example.covid.repository.PreviousConditionRepository;
import com.example.covid.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    public static final String THERE_IS_NO_USER_ID = "There is no user id %s.";
    private final UserRepository userRepository;
    private final PreviousConditionRepository previousConditionRepository;

    @Override
    public User addUser(UserDTO userDTO) {
        User user = UserMapper.INSTANCE.userDtoToUser(userDTO);
        List<PreviousCondition> previousConditions =
                previousConditionRepository.saveAll(user.getPreviousConditions());
        User saved = userRepository.save(user);
        log.info("Register new user: {}", saved);
        return saved;
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserCustomException(
                        String.format(THERE_IS_NO_USER_ID, id),
                        HttpStatus.NOT_FOUND));

        UserDTO userDTO = UserMapper.INSTANCE.userToUserDto(user);

        log.info("Get user {}.", user);

        return userDTO;
    }

    @Override
    public List<UserDTO> getUsers() {
        List<User> users = userRepository.findAll();

        List<UserDTO> userDTOS = UserMapper.INSTANCE.userToUserDto(users);

        log.info("Get all users {}.", users);

        return userDTOS;
    }

    @Override
    public List<UserDTO> getUsersBetweenDates(LocalDate startDate, LocalDate endDate) {
        List<User> users = userRepository.findByBirthDateBetween(startDate, endDate);

        List<UserDTO> userDTOS = UserMapper.INSTANCE.userToUserDto(users);

        log.info("Get all users between {} to {}.", startDate, endDate);
        log.info("There are {} users. The users: {}.", users.size(), users);

        return userDTOS;
    }

    @Override
    public List<UserDTO> getUsersByCity(String city) {
        List<User> users = userRepository.findUserByCity(city);

        List<UserDTO> userDTOS = UserMapper.INSTANCE.userToUserDto(users);

        log.info("Get all users in city name {}. The users: {}.", city, users);

        return userDTOS;
    }
}
