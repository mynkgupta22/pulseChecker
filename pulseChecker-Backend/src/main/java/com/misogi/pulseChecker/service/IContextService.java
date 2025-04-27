package com.misogi.pulseChecker.service;

import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.User;

public interface IContextService {

	User getCurrentUser();

//	Team getCurrentTeam();

	String getCurrentJwtToken();

	String getCurrentEmailFromToken();

}
