package com.misogi.pulseChecker.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailedResponse {
	
	private Long teamId;
	private String teamName;
	private String teamDescription;
	private boolean isCreator;

}
