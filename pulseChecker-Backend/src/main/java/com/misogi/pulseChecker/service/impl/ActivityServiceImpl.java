package com.misogi.pulseChecker.service.impl;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.misogi.pulseChecker.api.request.ActivityRequest;
import com.misogi.pulseChecker.api.response.ActivityResponse;
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
    public ActivityResponse addActivity(ActivityRequest request) {
        Team team = teamRepository.findById(request.getTeamId())
            .orElseThrow(() -> new BadRequestException("Team not found"));
        
        // Validate user exists if provided
        User user = contextService.getCurrentUser();
        LocalDateTime currentDateTime = DateTimeUtil.getCurrentLocalDateTime();
     
            if (!teamUserRepository.existsByUserAndTeam(user, team)) {
                throw new BadRequestException("User does not belong to the specified team");
            }
      
        
        // Create and save activity
        Activity activity = Activity.builder()
            .type(request.getType())
            .description(request.getDescription())
            .team(team)
            .user(user)
            .timestamp(currentDateTime)
            .build();
            
        activity = activityRepository.save(activity);
        return activityResponseMapper(activity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ActivityResponse> getTeamActivities(Long teamId, String startDate, String endDate) {
        Team team = teamRepository.findById(teamId)
            .orElseThrow(() -> new BadRequestException("Team not found"));
        LocalDateTime startDateTime = DateTimeUtil.getLocalDate(startDate).atStartOfDay();
        LocalDateTime endDateTime = DateTimeUtil.getLocalDate(endDate).atTime(LocalTime.MAX);

        List<Activity> activityList= activityRepository.findByTeamAndTimestampBetween(team, startDateTime, endDateTime);
        List<ActivityResponse> activityResponseList = new ArrayList<>();
        for(Activity activity:activityList) {
        
        	activityResponseList.add(activityResponseMapper(activity));
        }
        return activityResponseList;
    }
    
    private ActivityResponse activityResponseMapper(Activity activity) {
    	ActivityResponse activityResponse = new ActivityResponse();
    	activityResponse.setDescription(activity.getDescription());
    	activityResponse.setTeamName(activity.getTeam().getName());
    	activityResponse.setType(activity.getType());
    	activityResponse.setId(activity.getId());
    	activityResponse.setTimestamp(DateTimeUtil.getDateTimeString(activity.getTimestamp()));
    	activityResponse.setEmail(activity.getUser().getEmail());
    	activityResponse.setFirstName(activity.getUser().getFirstName());
    	activityResponse.setLastName(activity.getUser().getLastName());
    	return activityResponse;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ActivityResponse> getUserActivities(Long userId, String startDate, String endDate) {
    	 User user = null;
    	if(userId == null)
    		user = contextService.getCurrentUser();
    	else
    		user = userRepository.findById(userId).get();
        LocalDateTime startDateTime = DateTimeUtil.getLocalDate(startDate).atStartOfDay();
        LocalDateTime endDateTime = DateTimeUtil.getLocalDate(endDate).atTime(LocalTime.MAX);  
        List<Activity> activityList=  activityRepository.findByUserAndTimestampBetween(user, startDateTime, endDateTime);
        List<ActivityResponse> activityResponseList = new ArrayList<>();
        for(Activity activity:activityList) {
        
        	activityResponseList.add(activityResponseMapper(activity));
        }
        return activityResponseList;
    }
}
