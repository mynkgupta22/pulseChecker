package com.misogi.pulseChecker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.misogi.pulseChecker.model.BlackListToken;

public interface IBlackListTokenRepository extends JpaRepository<BlackListToken, Long>{
	
    boolean existsByUserNameAndToken(String userName, String token);


}
