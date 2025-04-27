package com.misogi.pulseChecker.service.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.misogi.pulseChecker.api.request.TeamRequest;
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
}
