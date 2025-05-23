package com.misogi.pulseChecker.service;

import java.util.List;

import com.misogi.pulseChecker.api.request.ActivityRequest;
import com.misogi.pulseChecker.api.response.ActivityCountResponse;
import com.misogi.pulseChecker.api.response.ActivityResponse;

public interface IActivityService {
    

	ActivityResponse addActivity(ActivityRequest request);
    
    List<ActivityResponse> getTeamActivities(Long teamId, String startDate, String endDate);
    
    List<ActivityResponse> getUserActivities(Long userId, String startDate, String endDate);

	ActivityCountResponse getActivityCountDetail(Long teamId, Long userId, String startDate, String endDate);

	List<ActivityCountResponse> getActivityCountDetailDayWise(Long teamId, Long userId, String startDate,
			String endDate);
}
