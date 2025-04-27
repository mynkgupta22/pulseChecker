package com.misogi.pulseChecker.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtAuthenticationResponse {
	private Long userId;
    private String token;
    private boolean firstLogin;

}
