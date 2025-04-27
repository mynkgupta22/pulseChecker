package com.misogi.pulseChecker.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.misogi.pulseChecker.api.request.ActivityRequest;
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
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate
    ) {
        return ResponseEntity.ok(activityService.getTeamActivities(teamId, startDate, endDate));
    }
    
    @GetMapping("/user/activities")
    public ResponseEntity<?> getUserActivities(@RequestParam(required = false) Long userId,
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate
    ) {
        return ResponseEntity.ok(activityService.getUserActivities(userId, startDate, endDate));
    }
}
