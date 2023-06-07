package com.example.covid.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class UserCustomException extends RuntimeException {

    private final HttpStatus httpStatus;

    public UserCustomException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
