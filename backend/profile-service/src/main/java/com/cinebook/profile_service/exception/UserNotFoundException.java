package com.cinebook.profile_service.exception;

public class UserNotFoundException extends CineBookException {
    public static final long serialVersionUID = 2L;

    public UserNotFoundException(String message) {
        super(message);
    }
}
