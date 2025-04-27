package com.misogi.pulseChecker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.misogi.pulseChecker.api.request.JwtAuthenticationRequest;
import com.misogi.pulseChecker.service.IUserAuthService;

@RestController
public class UserAuthController {

    @Autowired
    private IUserAuthService userAuthService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody JwtAuthenticationRequest request){
        return ResponseEntity.ok(userAuthService.authenticate(request));
    }

    @PostMapping("/log-out")
    public ResponseEntity<?> logOutUser(){
        return ResponseEntity.ok(userAuthService.logoutUser());
    }
}
