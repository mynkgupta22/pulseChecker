package com.misogi.pulseChecker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.misogi.pulseChecker.api.request.ActivityRequest;
import com.misogi.pulseChecker.api.response.ActivityCountResponse;
import com.misogi.pulseChecker.service.IActivityService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ActivityController {

    private final IActivityService activityService;

    @PostMapping("/add-activity")
    public ResponseEntity<?> addActivity(@Valid @RequestBody ActivityRequest request) {
        return new ResponseEntity<>(
            activityService.addActivity(request),
            HttpStatus.CREATED
        );
    }
    
    @GetMapping("/team/{teamId}/activities")
    public ResponseEntity<?> getTeamActivities(
        @PathVariable Long teamId,
        @RequestParam(required = true) String startDate,
        @RequestParam(required = true) String endDate
    ) {
        return ResponseEntity.ok(activityService.getTeamActivities(teamId, startDate, endDate));
    }
    
    @GetMapping("/activity/{teamId}/detailed-count")
    public ResponseEntity<?> getTeamDetaildCount(
        @PathVariable Long teamId,
        @RequestParam(required = false) Long userId,
        @RequestParam(required = true) String startDate,
        @RequestParam(required = true) String endDate
    ) {
        return ResponseEntity.ok(activityService.getActivityCountDetail(teamId, userId,startDate, endDate));
    }
    
    @GetMapping("/activity-day-wise/{id}/detailed-count")
    public ResponseEntity<?> getDetailedCount(@PathVariable("id") Long id, 
                                              @RequestParam(required = false) Long userId,
                                              @RequestParam("startDate") String startDate,
                                              @RequestParam("endDate") String endDate) {
        // Your service logic to return the detailed count
        return ResponseEntity.ok(activityService.getActivityCountDetailDayWise(id, userId, startDate, endDate));
    }


    @GetMapping("/user/activities")
    public ResponseEntity<?> getUserActivities(@RequestParam(required = false) Long userId,
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate
    ) {
        return ResponseEntity.ok(activityService.getUserActivities(userId, startDate, endDate));
    }
}
