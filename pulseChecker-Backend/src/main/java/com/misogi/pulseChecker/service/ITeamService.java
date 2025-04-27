package com.misogi.pulseChecker.service;

import java.util.List;

import com.misogi.pulseChecker.api.request.TeamRequest;
import com.misogi.pulseChecker.api.response.TeamUserResponse;

public interface ITeamService {

	String createTeam(TeamRequest teamRequest);

	List<TeamUserResponse> getTeamUsers(Long teamId);

	String editTeam(Long teamId, String name);

}
