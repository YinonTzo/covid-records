package com.example.covid.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserCustomException.class)
    public ResponseEntity<ErrorResponse> handleUserException(UserCustomException exception) {
        log.error(exception.getMessage());
        return new ResponseEntity<>(
                new ErrorResponse().builder()
                    .errorMessage(exception.getMessage())
                    .build(),
                exception.getHttpStatus());
    }
}
