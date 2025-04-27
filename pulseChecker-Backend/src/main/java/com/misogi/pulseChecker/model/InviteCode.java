package com.misogi.pulseChecker.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InviteCode {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false, unique = true)
	    private String code;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "team_id")
	    private Team team;

	    @Column(nullable = false)
	    private String invitedEmail;

	    @Column(nullable = false)
	    private boolean used;

	    @Column(nullable = false)
	    private LocalDateTime createdAt;

	    @Column(nullable = false)
	    private LocalDateTime expiresAt;
	}
