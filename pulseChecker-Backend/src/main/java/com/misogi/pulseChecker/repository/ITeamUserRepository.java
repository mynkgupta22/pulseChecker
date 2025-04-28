package com.misogi.pulseChecker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.TeamUser;
import com.misogi.pulseChecker.model.User;

public interface ITeamUserRepository extends JpaRepository<TeamUser, Long>{

	boolean existsByUserAndIsCreatorTrueAndTeam(User user, Team team);

	List<TeamUser> findAllByUser(User user);

	boolean existsByUserAndTeam(User user, Team team);

	Optional<Team> findByTeam(Team team);

	List<TeamUser> findAllByTeam(Team team);

	TeamUser findByUserAndTeam(User user, Team team);

	void deleteByUserAndTeam(User removeUser, Team team);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM TeamUser tu WHERE tu.user.id = :userId AND tu.team.id = :teamId")
	void deleteUserIdAndTeamId(@Param("userId") Long userId, @Param("teamId") Long teamId);


}
