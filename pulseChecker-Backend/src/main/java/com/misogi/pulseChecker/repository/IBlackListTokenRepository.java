package com.misogi.pulseChecker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.misogi.pulseChecker.model.BlackListToken;

@Repository
public interface IBlackListTokenRepository extends JpaRepository<BlackListToken, Long>{
	
    boolean existsByUserNameAndToken(String userName, String token);


}
