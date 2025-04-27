package com.misogi.pulseChecker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.misogi.pulseChecker.api.request.UserSignUpRequest;
import com.misogi.pulseChecker.service.IUserService;

@RestController
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@PostMapping("/users/add-user")
	public ResponseEntity<?> authenticate(@RequestBody UserSignUpRequest userRequest){
	        return ResponseEntity.ok(userService.createUser(userRequest));
	}
	
	@GetMapping("/users/get-team-details")
	public ResponseEntity<?> getAllDetails(){
	        return ResponseEntity.ok(userService.getAllDetails());
	}
	
	@GetMapping("/users/delete-user/{userId}/{teamId}")
	public ResponseEntity<?> removeUser(@PathVariable Long userId,@PathVariable Long teamId){
	        return ResponseEntity.ok(userService.removeUser(userId,teamId));
	}

}
