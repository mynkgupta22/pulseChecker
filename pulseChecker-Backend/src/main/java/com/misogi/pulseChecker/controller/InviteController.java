package com.misogi.pulseChecker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.misogi.pulseChecker.api.request.InviteUsersRequest;
import com.misogi.pulseChecker.service.IInviteCodeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class InviteController {
	
	private final IInviteCodeService inviteCodeService;

    @PostMapping("/join-team/{inviteCode}")
    public ResponseEntity<?> authenticate(@PathVariable String inviteCode){
        return ResponseEntity.ok(inviteCodeService.joinTeam(inviteCode));
    }
    
    @PostMapping("team/{teamId}/invite")
    public ResponseEntity<?> authenticate(@PathVariable Long teamId, @RequestBody InviteUsersRequest inviteUsersRequest){
        return ResponseEntity.ok(inviteCodeService.inviteUsers(teamId,inviteUsersRequest));
    }
}
