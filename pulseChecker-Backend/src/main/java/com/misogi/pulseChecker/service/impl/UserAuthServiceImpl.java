package com.misogi.pulseChecker.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.misogi.pulseChecker.api.request.JwtAuthenticationRequest;
import com.misogi.pulseChecker.api.response.JwtAuthenticationResponse;
import com.misogi.pulseChecker.common.JwtTokenUtil;
import com.misogi.pulseChecker.exception.BadRequestException;
import com.misogi.pulseChecker.model.BlackListToken;
import com.misogi.pulseChecker.model.Team;
import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.IBlackListTokenRepository;
import com.misogi.pulseChecker.repository.IUserRepository;
import com.misogi.pulseChecker.service.IContextService;
import com.misogi.pulseChecker.service.IUserAuthService;

@Service
public class UserAuthServiceImpl implements IUserAuthService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private IContextService contextService;

    @Autowired
    private IBlackListTokenRepository blackListTokenRepository;

    @Override
    public JwtAuthenticationResponse authenticate(JwtAuthenticationRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if(user == null) throw new BadRequestException("User Not Found!");
        if (!passwordEncoder.matches(request.getPassword(),user.getPassword())) {
            throw new BadRequestException("Incorrect UserName or Password");
        }
        return new
                JwtAuthenticationResponse(user.getId(),jwtTokenUtil.generateToken(user),user.isFirstLogin());

    }

    @Override
    public String logoutUser(){
        String token = contextService.getCurrentJwtToken();
        String userName = contextService.getCurrentEmailFromToken();
        BlackListToken blackListToken = new BlackListToken();
        blackListToken.setUserName(userName);
        blackListToken.setToken(token);
        blackListTokenRepository.save(blackListToken);
        return "Logout Successfully.";
    }


}

