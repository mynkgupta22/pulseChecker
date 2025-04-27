package com.misogi.pulseChecker.service.impl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.misogi.pulseChecker.api.request.ActivityRequest;
import com.misogi.pulseChecker.api.response.ActivityCountResponse;
import com.misogi.pulseChecker.api.response.ActivityResponse;
import com.misogi.pulseChecker.common.DateTimeUtil;
import com.misogi.pulseChecker.exception.BadRequestException;
import com.misogi.pulseChecker.model.Activity;
import com.misogi.pulseChecker.model.Activity.ActivityType;
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
    
    @Override
    public ActivityCountResponse getActivityCountDetail(Long teamId,Long userId, String startDate,String endDate) {
    	int messageCount =0;
    	int commitCount =0;
   	 	int prCount =0;
   	 	int blockerCount =0;
   	 	int helpCount =0;
    	if(teamId != 0) {	
    	User user = null;
    	if(userId != null)
    		user = userRepository.findById(userId).get();
    	  LocalDateTime startDateTime = DateTimeUtil.getLocalDate(startDate).atStartOfDay();
          LocalDateTime endDateTime = DateTimeUtil.getLocalDate(endDate).atTime(LocalTime.MAX);  
          Team team = teamRepository.findById(teamId)
                  .orElseThrow(() -> new BadRequestException("Team not found"));
      	 
    	 List<Activity> activityList= new ArrayList<>();
    	 if(user == null) {
    		 activityList = activityRepository.findAllByTeamAndTimestampBetween(team, startDateTime, endDateTime);
    	 }else {
    		 activityList = activityRepository.findAllByUserAndTeamAndTimestampBetween(user,team, startDateTime, endDateTime);

    	 }
    	 for(Activity activity:activityList) {
    		 if(activity.getType().equals(ActivityType.SLACK_MESSAGE)) {
    			 messageCount++;
    		 }else if(activity.getType().equals(ActivityType.BLOCKER)) {
    			 blockerCount++;
    		 }else if(activity.getType().equals(ActivityType.HELP)) {
    			 helpCount++;
    		 }else if(activity.getType().equals(ActivityType.COMMIT)) {
    			 commitCount++;
    		 }else {
    			 prCount++; 
    		 }
    	 }
    	}
    	 ActivityCountResponse activityCountResponse = new ActivityCountResponse();
    	 activityCountResponse.setCommitCount(commitCount);
    	 activityCountResponse.setHelpCount(helpCount);
    	 activityCountResponse.setBlockerCount(blockerCount);
    	 activityCountResponse.setMessageCount(messageCount);
    	 activityCountResponse.setPrCount(prCount);
    	 return activityCountResponse;
    }
    

   
   @Override
    public List<ActivityCountResponse> getActivityCountDetailDayWise(Long teamId, Long userId, String startDate, String endDate) {
       List<ActivityCountResponse> responseList = new ArrayList<>();

	   if(teamId == 0) {
		   ActivityCountResponse activityCountResponse = new ActivityCountResponse();
		   LocalDate date = DateTimeUtil.getCurrentLocalDate();
           activityCountResponse.setDate(DateTimeUtil.getDateString(date));
           activityCountResponse.setDay(date.getDayOfWeek().toString());
           activityCountResponse.setCommitCount(0);
           activityCountResponse.setHelpCount(0);
           activityCountResponse.setBlockerCount(0);
           activityCountResponse.setMessageCount(0);
           activityCountResponse.setPrCount(0);

           // Add response object to list
           responseList.add(activityCountResponse);
           return responseList;
	   }
        User user = null;
        if (userId != null)
            user = userRepository.findById(userId).get();
        
        // Convert strings to LocalDateTime
        LocalDateTime startDateTime = DateTimeUtil.getLocalDate(startDate).atStartOfDay();
        LocalDateTime endDateTime = DateTimeUtil.getLocalDate(endDate).atTime(LocalTime.MAX);

        // Retrieve team or throw exception
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new BadRequestException("Team not found"));

        // Retrieve activities based on whether user is null or not
        List<Activity> activityList = new ArrayList<>();
        if (user == null) {
            activityList = activityRepository.findAllByTeamAndTimestampBetween(team, startDateTime, endDateTime);
        } else {
            activityList = activityRepository.findAllByUserAndTeamAndTimestampBetween(user, team, startDateTime, endDateTime);
        }

        // Response list and activity map for grouping by date
        Map<LocalDate, List<Activity>> activityMap = activityList.stream()
                .collect(Collectors.groupingBy(ac -> ac.getTimestamp().toLocalDate()));
        
        // Convert startDate and endDate to LocalDate
        LocalDate from = DateTimeUtil.getLocalDate(startDate);
        LocalDate to = DateTimeUtil.getLocalDate(endDate);

        // Loop through each day from startDate to endDate
        for (LocalDate date = from; !date.isAfter(to); date = date.plusDays(1)) {
            int messageCount = 0;
            int commitCount = 0;
            int prCount = 0;
            int blockerCount = 0;
            int helpCount = 0;
            
            // Get activities for the current date (if any)
            List<Activity> activities = activityMap.getOrDefault(date, new ArrayList<>());

            // Loop through activities and count each type
            for (Activity activity : activities) {
                if (activity.getType().equals(ActivityType.SLACK_MESSAGE)) {
                    messageCount++;
                } else if (activity.getType().equals(ActivityType.BLOCKER)) {
                    blockerCount++;
                } else if (activity.getType().equals(ActivityType.HELP)) {
                    helpCount++;
                } else if (activity.getType().equals(ActivityType.COMMIT)) {
                    commitCount++;
                } else {
                    prCount++;
                }
            }

            // Create and populate response object for the current date
            ActivityCountResponse activityCountResponse = new ActivityCountResponse();
            activityCountResponse.setDate(DateTimeUtil.getDateString(date));
            activityCountResponse.setDay(date.getDayOfWeek().toString());
            activityCountResponse.setCommitCount(commitCount);
            activityCountResponse.setHelpCount(helpCount);
            activityCountResponse.setBlockerCount(blockerCount);
            activityCountResponse.setMessageCount(messageCount);
            activityCountResponse.setPrCount(prCount);

            // Add response object to list
            responseList.add(activityCountResponse);
        }
	   
        return responseList;
    }

}
