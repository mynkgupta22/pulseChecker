package com.misogi.pulseChecker.config;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.IUserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {


    private final IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new UsernameNotFoundException("User Not Found.");
        }
//        Team team = user.getTeam();
//        Long teamId = team == null ? null:team.getId();
        if(user == null){
        	throw new UsernameNotFoundException(String.format("User with email %s not found", email));
        }
        return UserDetailsImpl.build(user);
    }
}
