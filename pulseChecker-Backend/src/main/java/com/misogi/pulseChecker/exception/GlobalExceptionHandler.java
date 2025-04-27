package com.misogi.pulseChecker.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Object> handleBadRequestException(BadRequestException badReqException,
                                                            WebRequest webRequest) {
        MessageResponse msResponse = new MessageResponse();
        msResponse.setTimeStamp(new Date());

        msResponse.setStackTrace(getStackTrace(badReqException));

        msResponse.setMessage(badReqException.getMessage());

        msResponse.setStatus(HttpStatus.BAD_REQUEST.value());

        msResponse.setPath(webRequest.getDescription(false));

        return new ResponseEntity<>(msResponse, HttpStatus.BAD_REQUEST);
    }

    private String getStackTrace(Exception exception) {
        StringWriter stringWriter = new StringWriter();
        exception.printStackTrace(new PrintWriter(stringWriter));
        return stringWriter.toString();

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception exception, WebRequest webRequest) {
        MessageResponse msResponse = new MessageResponse();

        msResponse.setTimeStamp(new Date());

        msResponse.setStackTrace(getStackTrace(exception));

        msResponse.setMessage(exception.getMessage());

        msResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

        msResponse.setPath(webRequest.getDescription(false));

        return new ResponseEntity<>(msResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
