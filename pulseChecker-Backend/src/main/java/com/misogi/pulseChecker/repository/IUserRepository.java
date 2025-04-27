package com.misogi.pulseChecker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.misogi.pulseChecker.model.User;

public interface IUserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);

}
