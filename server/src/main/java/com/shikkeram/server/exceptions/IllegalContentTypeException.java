package com.shikkeram.server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "illegal content-type")
public class IllegalContentTypeException extends RuntimeException {

    public IllegalContentTypeException() {
    }

    public IllegalContentTypeException(String message) {
        super(message);
    }
}