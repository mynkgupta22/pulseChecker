package com.misogi.pulseChecker.api.response;

import com.misogi.pulseChecker.model.Activity.ActivityType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponse {
	
	private String description;
    private Long id;
    private String timestamp;
    private ActivityType type;
    private String teamName;

}
