package com.misogi.pulseChecker.config;


import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.misogi.pulseChecker.common.JwtTokenUtil;
import com.misogi.pulseChecker.exception.SessionExpiredException;
import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.IUserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private IUserRepository userRepository;

    private JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String jwt = null;
        String email = null;
        if(header != null && header.startsWith("Bearer ")){
            try{
                jwt = header.substring(7);
                email = jwtTokenUtil.getUsernameFromToken(jwt);
                User user = userRepository.findByEmail(email);
                if (user != null && !user.isEnabled() || user.isDeleted()) {
                    request.setAttribute("expired", "Session Expired");
                    throw new SessionExpiredException("Session Expired");
                }
            }catch (Exception e){
                e.printStackTrace();
            }
            if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
                if(jwtTokenUtil.validateToken(jwt,userDetails)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }
        filterChain.doFilter(request,response);
    }

}
