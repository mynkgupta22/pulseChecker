package com.misogi.pulseChecker.service;

import java.util.List;

import com.misogi.pulseChecker.api.request.ActivityRequest;
import com.misogi.pulseChecker.model.Activity;

public interface IActivityService {
    

    Activity addActivity(ActivityRequest request);
    
    List<Activity> getTeamActivities(Long teamId, String startDate, String endDate);
    
    List<Activity> getUserActivities(Long userId, String startDate, String endDate);
}
