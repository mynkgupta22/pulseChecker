package com.misogi.pulseChecker.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.misogi.pulseChecker.common.JwtTokenUtil;
import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.ITeamRepository;
import com.misogi.pulseChecker.repository.IUserRepository;
import com.misogi.pulseChecker.service.IContextService;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ContextServiceImpl implements IContextService {

	  @Autowired
	  private IUserRepository userRepository;

	  @Autowired
	  private ITeamRepository teamRepository;

	  @Autowired
	  private JwtTokenUtil jwtTokenUtil;

	  @Override
	  public User getCurrentUser() {
	        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        String username = "";
	        if (principal instanceof UserDetails) {
	            username = ((UserDetails) principal).getUsername();
	        } else {
	            username = principal.toString();
	        }
	        return this.userRepository.findByEmailAndIsDeletedFalse(username);
	    }

//	  @Override
//	  public Team getCurrentTeam() {
//	        Object credentials = SecurityContextHolder.getContext().getAuthentication().getCredentials();
//	        String teamIid = "";
//
//	        if (credentials != null && ((String) credentials).trim().length() > 0) {
//	            Long teamId = Long.parseLong(credentials.toString());
//
//	            return teamRepository.findById(teamId).get();
//	        }
//	        return null;
//	    }

	  @Override
	  public String getCurrentJwtToken() {
	        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

	        return request.getHeader("Authorization");
	    }


	  @Override
	  public String getCurrentEmailFromToken() {
	        String token = getCurrentJwtToken();
	        return jwtTokenUtil.getUsernameFromToken(token);
	    }
}


