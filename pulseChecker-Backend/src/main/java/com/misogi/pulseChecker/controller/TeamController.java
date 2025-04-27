package com.misogi.pulseChecker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.misogi.pulseChecker.api.request.TeamRequest;
import com.misogi.pulseChecker.api.response.TeamUserResponse;
import com.misogi.pulseChecker.service.ITeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TeamController {

    private final ITeamService teamService;

    @PostMapping("register-team")
    public ResponseEntity<?> createTeam(@RequestBody TeamRequest teamRequest){
        return new ResponseEntity<>(teamService.createTeam(teamRequest), HttpStatus.CREATED);
    }
    
    @PostMapping("update-team/{teamId}/{name}")
    public ResponseEntity<?> createTeam(@PathVariable Long teamId, @PathVariable String name){
        return new ResponseEntity<>(teamService.editTeam(teamId,name), HttpStatus.CREATED);
    }
    
    @GetMapping("/team/{teamId}/users")
    public ResponseEntity<List<TeamUserResponse>> getTeamUsers(@PathVariable Long teamId) {
        return ResponseEntity.ok(teamService.getTeamUsers(teamId));
    }
}
