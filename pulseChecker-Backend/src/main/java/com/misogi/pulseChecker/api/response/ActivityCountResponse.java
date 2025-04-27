package com.misogi.pulseChecker.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityCountResponse {
	
	private String date;
	private String day;
	private int messageCount;
	private int commitCount;
	private int prCount;
	private int blockerCount;
	private int helpCount;
	

}
