package com.example.covid.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private long id;

    private String firstName;

    private String lastName;

    private LocalDate birthDate;

    private String address;

    private String city;

    private String landline;

    private String cellularPhone;

    private boolean infected = false;

    private String previousConditions;
}
