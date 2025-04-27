package com.misogi.pulseChecker.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private Date timeStamp;

    private String message;

    private int Status;

    private String error;

    private String path;

    private String stackTrace;

}
