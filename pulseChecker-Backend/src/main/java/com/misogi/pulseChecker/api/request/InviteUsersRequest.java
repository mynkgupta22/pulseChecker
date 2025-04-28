package com.misogi.pulseChecker.api.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InviteUsersRequest {
	
	private List<String> emails;

}
