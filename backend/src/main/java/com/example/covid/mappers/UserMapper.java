package com.example.covid.mappers;

import com.example.covid.DTO.UserDTO;
import com.example.covid.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User userDtoToUser(UserDTO userDTO);

    UserDTO userToUserDto(User user);

    List<UserDTO> userToUserDto(List<User> users);
}
