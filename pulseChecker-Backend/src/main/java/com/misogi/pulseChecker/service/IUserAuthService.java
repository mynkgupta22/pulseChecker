package com.misogi.pulseChecker.service;

import com.misogi.pulseChecker.api.request.JwtAuthenticationRequest;
import com.misogi.pulseChecker.api.response.JwtAuthenticationResponse;

public interface IUserAuthService {

	String logoutUser();

	JwtAuthenticationResponse authenticate(JwtAuthenticationRequest request);

}
