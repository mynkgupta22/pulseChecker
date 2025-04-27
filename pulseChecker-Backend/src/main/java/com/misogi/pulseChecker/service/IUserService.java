package com.misogi.pulseChecker.service;

import java.util.List;

import com.misogi.pulseChecker.api.request.UserSignUpRequest;
import com.misogi.pulseChecker.api.response.UserDetailedResponse;

public interface IUserService {

	String createUser(UserSignUpRequest userRequest);

	List<UserDetailedResponse> getAllDetails();

}
