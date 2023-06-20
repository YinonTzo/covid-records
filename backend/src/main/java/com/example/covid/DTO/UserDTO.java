package com.example.covid.DTO;

import com.example.covid.entity.PreviousCondition;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private long id;

    private String firstName;

    private String lastName;

    private LocalDate dateOfBirth;

    private String address;

    private String city;

    private String landline;

    private String cellularPhone;

    private boolean infected;

    private String zipCode;

    private List<PreviousCondition> previousConditions = new ArrayList<>();
}
