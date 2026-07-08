package com.cinebook.profile_service.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ErrorInfo {
    private String errorMessage;
    private int statusCode;
    private LocalDateTime timestamp;
}
