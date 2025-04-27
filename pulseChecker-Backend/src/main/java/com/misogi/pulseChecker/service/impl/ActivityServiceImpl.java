package com.misogi.pulseChecker.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.misogi.pulseChecker.api.request.ActivityRequest;
import com.misogi.pulseChecker.common.DateTimeUtil;
import com.misogi.pulseChecker.exception.BadRequestException;
import com.misogi.pulseChecker.model.Activity;
import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.IActivityRepository;
import com.misogi.pulseChecker.repository.ITeamRepository;
import com.misogi.pulseChecker.repository.ITeamUserRepository;
import com.misogi.pulseChecker.repository.IUserRepository;
import com.misogi.pulseChecker.service.IActivityService;
import com.misogi.pulseChecker.service.IContextService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements IActivityService {

    private final IActivityRepository activityRepository;
    private final ITeamRepository teamRepository;
    private final IUserRepository userRepository;
    private final IContextService contextService;
    private final ITeamUserRepository teamUserRepository;

    @Override
    @Transactional
    public Activity addActivity(ActivityRequest request) {
        Team team = teamRepository.findById(request.getTeamId())
            .orElseThrow(() -> new BadRequestException("Team not found"));
        
        // Validate user exists if provided
        User user = contextService.getCurrentUser();
     
            if (!teamUserRepository.existsByUserAndTeam(user, team)) {
                throw new BadRequestException("User does not belong to the specified team");
            }
      
        
        // Create and save activity
        Activity activity = Activity.builder()
            .type(request.getType())
            .description(request.getDescription())
            .team(team)
            .user(user)
            .timestamp(LocalDateTime.now())
            .build();
            
        return activityRepository.save(activity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Activity> getTeamActivities(Long teamId, String startDate, String endDate) {
        Team team = teamRepository.findById(teamId)
            .orElseThrow(() -> new BadRequestException("Team not found"));
        LocalDateTime startDateTime = DateTimeUtil.getLocalDate(startDate).atStartOfDay();
        LocalDateTime endDateTime = DateTimeUtil.getLocalDate(endDate).atTime(LocalTime.MAX);

        return activityRepository.findByTeamAndTimestampBetween(team, startDateTime, endDateTime);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Activity> getUserActivities(Long userId, String startDate, String endDate) {
    	 User user = null;
    	if(userId == null)
    		contextService.getCurrentUser();
    	else
    		user = userRepository.findById(userId).get();
        LocalDateTime startDateTime = DateTimeUtil.getLocalDate(startDate).atStartOfDay();
        LocalDateTime endDateTime = DateTimeUtil.getLocalDate(endDate).atTime(LocalTime.MAX);  
        return activityRepository.findByUserAndTimestampBetween(user, startDateTime, endDateTime);
    }
}
