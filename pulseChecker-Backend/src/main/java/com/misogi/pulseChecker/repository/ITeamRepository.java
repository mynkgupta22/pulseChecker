package com.misogi.pulseChecker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.misogi.pulseChecker.model.Team;

public interface ITeamRepository extends JpaRepository<Team, Long>{

	boolean existsByName(String teamName);

}
