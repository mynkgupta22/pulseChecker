package com.misogi.pulseChecker.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.misogi.pulseChecker.model.Activity;
import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.User;

public interface IActivityRepository extends JpaRepository<Activity, Long>{

	List<Activity> findByTeamAndTimestampBetween(Team team, LocalDateTime startDateTime, LocalDateTime endDateTime);

	List<Activity> findByUserAndTimestampBetween(User user, LocalDateTime startDateTime, LocalDateTime endDateTime);

	List<Activity> findAllByTeamAndTimestampBetween(Team team, LocalDateTime startDateTime, LocalDateTime endDateTime);

	List<Activity> findAllByUserAndTeamAndTimestampBetween(User user, Team team, LocalDateTime startDateTime,
			LocalDateTime endDateTime);

	@Modifying
	@Transactional
	@Query("DELETE FROM Activity ac WHERE ac.user.id = :userId AND ac.team.id = :teamId")
	void deleteUserIdAndTeamId(@Param("userId") Long userId, @Param("teamId") Long teamId);

}
