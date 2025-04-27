package com.misogi.pulseChecker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final String[] WHITE_LIST_URLS = {
        "/authenticate",
        "/swagger-ui/**",
        "/v3/api-docs/**",
        "/api-docs/**"
    };

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http,
                                                       BCryptPasswordEncoder bCryptPasswordEncoder,
                                                       UserDetailsServiceImpl userDetailsService) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                   .userDetailsService(userDetailsService)
                   .passwordEncoder(bCryptPasswordEncoder)
                   .and()
                   .build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   JwtRequestFilter jwtRequestFilter) throws Exception {
        http
          .csrf(csrf -> csrf.disable())
          .cors(Customizer.withDefaults())
          .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
          .authorizeRequests(auth -> auth
              // public endpoints
              .requestMatchers(WHITE_LIST_URLS).permitAll()
              .requestMatchers(HttpMethod.POST, "/users/add-user").permitAll()
              .requestMatchers("/error").permitAll()
              // everything else needs auth
              .anyRequest().authenticated()
          )
          // add the JWT filter
          .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
