package com.misogi.pulseChecker.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignUpRequest {
	
	private String firstName;
	private String lastName;
	private String email;
	private String password;

}
