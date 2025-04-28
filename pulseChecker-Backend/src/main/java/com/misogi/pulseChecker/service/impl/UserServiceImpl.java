package com.misogi.pulseChecker.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.misogi.pulseChecker.api.request.UserSignUpRequest;
import com.misogi.pulseChecker.api.response.JwtAuthenticationResponse;
import com.misogi.pulseChecker.api.response.UserDetailedResponse;
import com.misogi.pulseChecker.common.DateTimeUtil;
import com.misogi.pulseChecker.common.JwtTokenUtil;
import com.misogi.pulseChecker.exception.BadRequestException;
import com.misogi.pulseChecker.model.Role;
import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.TeamUser;
import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.ITeamRepository;
import com.misogi.pulseChecker.repository.ITeamUserRepository;
import com.misogi.pulseChecker.repository.IUserRepository;
import com.misogi.pulseChecker.service.IContextService;
import com.misogi.pulseChecker.service.IUserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService{
	
    private final IUserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    
    private final ITeamUserRepository teamUserRepository;
    
    private final IContextService contextService;
    
    private final JwtTokenUtil jwtTokenUtil;
    
    private final ITeamRepository teamRepository;
	
    @Override
	public JwtAuthenticationResponse createUser(UserSignUpRequest userRequest) {
    	LocalDateTime currentDateTime = DateTimeUtil.getCurrentLocalDateTime();

    	if (userRepository.existsByEmailAndIsDeletedFalse(userRequest.getEmail())) {
    	    throw new BadRequestException("User Email Already Exists.");
    	}
		
    	User user = new User();
    	user.setFirstName(userRequest.getFirstName());
    	user.setLastName(userRequest.getLastName());
    	user.setEmail(userRequest.getEmail());
    	user.setRole(Role.ROLE_USER);
    	user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
    	user.setEnabled(true);
    	user.setFirstLogin(true);
    	user.setCreatedAt(currentDateTime);
    	user.setUpdatedAt(currentDateTime);
    	userRepository.save(user);
    	 return new
                 JwtAuthenticationResponse(user.getId(),jwtTokenUtil.generateToken(user),true);	
    	 
    }
    
    @Override
    public List<UserDetailedResponse> getAllDetails(){
    	User user = contextService.getCurrentUser();
    	List<TeamUser> teamUserList = teamUserRepository.findAllByUser(user);
    	List<UserDetailedResponse> userDetailsResponseList = new ArrayList<>();
    	for(TeamUser teamUser:teamUserList) {
    		UserDetailedResponse userDetailedResponse = new UserDetailedResponse();
    		Team team = teamUser.getTeam();
    		userDetailedResponse.setCreator(teamUser.isCreator());
    		userDetailedResponse.setTeamDescription(team.getDescription());
    		userDetailedResponse.setTeamId(team.getId());
    		userDetailedResponse.setTeamName(team.getName());
    		userDetailsResponseList.add(userDetailedResponse);
    	}
    	return userDetailsResponseList;
    }
    
    @Override
    public String removeUser(Long teamId,String email) {
    	User user = contextService.getCurrentUser();
    	Team team = teamRepository.findById(teamId).get();
    	TeamUser teamUser = teamUserRepository.findByUserAndTeam(user,team);
    	User removeUser = userRepository.findByEmail(email);
    	if(teamUser != null && teamUser.isCreator() && teamUserRepository.existsByUserAndTeam(removeUser, team)) {
    		teamUserRepository.deleteUserIdAndTeamId(removeUser.getId(),team.getId());
    		return "User Removed Successfully.";
    	}
		return "User Cannot Removed.";

    }

}
