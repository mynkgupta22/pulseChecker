package com.misogi.pulseChecker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.TeamUser;
import com.misogi.pulseChecker.model.User;

public interface ITeamUserRepository extends JpaRepository<TeamUser, Long>{

	boolean existsByUserAndIsCreatorTrueAndTeam(User user, Team team);

	List<TeamUser> findAllByUser(User user);

}
