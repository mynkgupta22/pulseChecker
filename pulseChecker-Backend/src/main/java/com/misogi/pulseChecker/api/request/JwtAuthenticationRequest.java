package com.misogi.pulseChecker.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtAuthenticationRequest {
    private String email;
    private String password;
}
