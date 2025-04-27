package com.misogi.pulseChecker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.misogi.pulseChecker.model.User;

public interface IUserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);

	User findByEmailAndIsDeletedFalse(String username);

	boolean existsByEmailAndIsDeletedFalse(String email);

}
