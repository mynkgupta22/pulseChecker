package com.misogi.pulseChecker.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.misogi.pulseChecker.api.request.InviteUsersRequest;
import com.misogi.pulseChecker.common.DateTimeUtil;
import com.misogi.pulseChecker.exception.BadRequestException;
import com.misogi.pulseChecker.model.InviteCode;
import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.TeamUser;
import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.IInviteCodeRepository;
import com.misogi.pulseChecker.repository.ITeamRepository;
import com.misogi.pulseChecker.repository.ITeamUserRepository;
import com.misogi.pulseChecker.repository.IUserRepository;
import com.misogi.pulseChecker.service.IContextService;
import com.misogi.pulseChecker.service.IInviteCodeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InviteCodeServiceImpl implements IInviteCodeService{
	
	private final IInviteCodeRepository inviteCodeRepository;
	
	private final IContextService contextService;
	
	private final ITeamUserRepository teamUserRepository;
	
	private final IUserRepository userRepository;
	
	private final ITeamRepository teamRepository;
	
	@Override
	public String joinTeam(String code) {
		User user = contextService.getCurrentUser();
		LocalDateTime currentDateTime = DateTimeUtil.getCurrentLocalDateTime();
		if(!inviteCodeRepository.existsByCodeAndInvitedEmail(code,user.getEmail())){
			throw new BadRequestException("Invite Code Is Invalid.");
		}
		InviteCode inviteCode = inviteCodeRepository.findByCodeAndInvitedEmail(code,user.getEmail());
		if(inviteCode.getExpiresAt().isBefore(currentDateTime))
			throw new BadRequestException("Invite Code Is Expired.");
		TeamUser teamUser = new TeamUser();
    	teamUser.setCreator(false);
    	teamUser.setTeam(inviteCode.getTeam());
    	teamUser.setUser(user);
    	teamUserRepository.save(teamUser);
    	inviteCode.setUsed(true);
    	inviteCodeRepository.save(inviteCode);
    	if(user.isFirstLogin()) {
    		user.setFirstLogin(false);
    		userRepository.save(user);
    	}
    	return "Team Joined Successfully.";
	}
	
	@Override
	public String inviteUsers(Long teamId,InviteUsersRequest inviteUserRequest) {
		User user = contextService.getCurrentUser();
		Team team = teamRepository.findById(teamId).get();
		LocalDateTime currentDateTime = DateTimeUtil.getCurrentLocalDateTime();
		LocalDateTime expireTime = DateTimeUtil.getCurrentLocalDateTime().plusDays(30);
		if(!teamUserRepository.existsByUserAndIsCreatorTrueAndTeam(user,team))
			throw new BadRequestException("Only Creator Can Invite For The Team.");
		List<InviteCode> invitedCodeList = new ArrayList<>();
			for(String email:inviteUserRequest.getEmails()) {
				InviteCode inviteCode = new InviteCode();
				inviteCode.setUsed(false);
				inviteCode.setCode(UUID.randomUUID().toString());
				inviteCode.setTeam(team);
				inviteCode.setExpiresAt(expireTime);
				inviteCode.setCreatedAt(currentDateTime);
				inviteCode.setInvitedEmail(email);
				invitedCodeList.add(inviteCode);
			}
			inviteCodeRepository.saveAll(invitedCodeList);
			return "User Invited Successfully.";

		}
	}
	
	


