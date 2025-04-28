package com.misogi.pulseChecker.service;

import com.misogi.pulseChecker.api.request.InviteUsersRequest;

public interface IInviteCodeService {

	String joinTeam(String code);

	String inviteUsers(Long teamId, InviteUsersRequest inviteUserRequest);

}
