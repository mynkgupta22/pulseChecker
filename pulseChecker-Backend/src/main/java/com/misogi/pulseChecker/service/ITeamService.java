package com.misogi.pulseChecker.service;

import com.misogi.pulseChecker.api.request.TeamRequest;
import com.misogi.pulseChecker.api.response.TeamDetailResponse;

public interface ITeamService {

	String createTeam(TeamRequest teamRequest);

	TeamDetailResponse getTeamUsers(Long teamId);

	String editTeam(Long teamId, String name);

}
