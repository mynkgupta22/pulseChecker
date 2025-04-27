package com.misogi.pulseChecker.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.misogi.pulseChecker.model.Activity;
import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.User;

public interface IActivityRepository extends JpaRepository<Activity, Long>{

	List<Activity> findByTeamAndTimestampBetween(Team team, LocalDateTime startDateTime, LocalDateTime endDateTime);

	List<Activity> findByUserAndTimestampBetween(User user, LocalDateTime startDateTime, LocalDateTime endDateTime);

}
