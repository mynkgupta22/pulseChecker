package com.misogi.pulseChecker.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamRequest {
	
	private String name;
	private String description;

}
