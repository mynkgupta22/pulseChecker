package com.misogi.pulseChecker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.misogi.pulseChecker.model.InviteCode;

public interface IInviteCodeRepository extends JpaRepository<InviteCode, Long>{

	boolean existsByCodeAndInvitedEmail(String inviteCode, String email);

	InviteCode findByCodeAndInvitedEmail(String code, String email);

}
