package com.misogi.pulseChecker.api.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDetailResponse {
	
	private List<TeamUserResponse> teamUserResponseList;
	private String teamName;
	private int totalUserCount;
	private Long teamId;

}
