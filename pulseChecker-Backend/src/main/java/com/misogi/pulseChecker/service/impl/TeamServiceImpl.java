package com.misogi.pulseChecker.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.misogi.pulseChecker.api.request.TeamRequest;
import com.misogi.pulseChecker.api.response.TeamDetailResponse;
import com.misogi.pulseChecker.api.response.TeamUserResponse;
import com.misogi.pulseChecker.common.DateTimeUtil;
import com.misogi.pulseChecker.exception.BadRequestException;
import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.TeamUser;
import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.ITeamRepository;
import com.misogi.pulseChecker.repository.ITeamUserRepository;
import com.misogi.pulseChecker.repository.IUserRepository;
import com.misogi.pulseChecker.service.IContextService;
import com.misogi.pulseChecker.service.ITeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements ITeamService{

    private final ITeamRepository teamRepository;
    
    private final IContextService contextService;
    
    private final ITeamUserRepository teamUserRepository;
    
    private final IUserRepository userRepository;


    @Override
    @Transactional
    public String createTeam(TeamRequest teamRequest){
    	User user = contextService.getCurrentUser();
    	if (teamRepository.existsByName(teamRequest.getName())) {
    	    throw new BadRequestException("Team Name Already Exists.");
    	}

    	LocalDateTime currentDateTime = DateTimeUtil.getCurrentLocalDateTime();

    	Team team = new Team();
    	team.setName(teamRequest.getName());
    	team.setDescription(teamRequest.getDescription());
    	team.setCreatedAt(currentDateTime);
    	team.setUpdatedAt(currentDateTime);
    	team.setCreator(user);

    	team = teamRepository.save(team); // cascade must include persist to save user
    	TeamUser teamUser = new TeamUser();
    	teamUser.setCreator(true);
    	teamUser.setTeam(team);
    	teamUser.setUser(user);
    	teamUserRepository.save(teamUser);
    	if(user.isFirstLogin()) {
    		user.setFirstLogin(false);
    		userRepository.save(user);
    	}
    	return "Team created successfully.";
    }
    
    @Override
    @Transactional(readOnly = true)
    public TeamDetailResponse getTeamUsers(Long teamId) {
        Team team = teamRepository.findById(teamId)
            .orElseThrow(() -> new BadRequestException("Team not found"));
        List<TeamUser> teamUsers = teamUserRepository.findAllByTeam(team);
        int totalUserCount =teamUsers.size();
        TeamDetailResponse teamDetailResponse = new TeamDetailResponse();
        teamDetailResponse.setTeamId(team.getId());
        teamDetailResponse.setTeamName(team.getName());
        teamDetailResponse.setTotalUserCount(totalUserCount);
        List<TeamUserResponse> responseList = new ArrayList<>();

        for (TeamUser teamUser : teamUsers) {
            User user = teamUser.getUser();
            TeamUserResponse response = TeamUserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .userId(user.getId())
                .build();
            responseList.add(response);
        }

       teamDetailResponse.setTeamUserResponseList(responseList); 
       return teamDetailResponse;
    }
    
    @Override
    public String editTeam(Long teamId,String name){
    	User user = contextService.getCurrentUser();
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new BadRequestException("Team not found"));
    	if (!teamUserRepository.existsByUserAndIsCreatorTrueAndTeam(user, team)) {
    	    throw new BadRequestException("Only Creator Can Change The Team Name");
    	}
    	

    	LocalDateTime currentDateTime = DateTimeUtil.getCurrentLocalDateTime();

    	team.setName(name);
    	team.setUpdatedAt(currentDateTime);

    	team = teamRepository.save(team); // cascade must include persist to save user
    
    	return "Team Name Updated successfully.";
    }
}
