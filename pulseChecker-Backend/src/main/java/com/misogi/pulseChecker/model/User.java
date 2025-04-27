package com.misogi.pulseChecker.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    
    @Column(columnDefinition = "boolean default true ")
    private boolean enabled;

    @Column(columnDefinition = "boolean default false ")
    private boolean isDeleted;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    @Column(columnDefinition = "boolean default true ")
    private boolean firstLogin;

    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
