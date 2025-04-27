package com.misogi.pulseChecker.common;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.misogi.pulseChecker.model.User;
import com.misogi.pulseChecker.repository.IBlackListTokenRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {

    @Autowired
    private IBlackListTokenRepository blackListTokenRepository;

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    private static final long jwtExpirationMs = 1000;
    private static final String secret = "NyHnbBw84RGC6sO565pVriPWqNaw0dc4DVbzigpnoMBAFi6cbU/xsGniO1eLUjOJU9hA8wLzHsw1/gRmkIDHMlgnP7F+RQxMBt/6cawr3x+YvzAhn3ZFEWzcuD/3dV8aykV09qd99zQ3Z13uwUjlo8odhklvOK99aA5fMasBL1aJHfE3xhEwH27ytgHWm1LsBFGz8A7LJAWwKDQIShc4WnqJbhQ4URHZoqpDXm5orDOhO41vEkTWQrKSXcf3zr7Rmi1Buw7t0TeTaMpganpWtQQEM3iitKXEB/yLj4Z+NLvcA3PmLHbNColC4MOTHW2LrcKAfsN9uoq9BP4abjEA/IvKWihyydLPy1GcsemWO4I=";

    private String doGenerateToken(Map<String,Object> claims, String subject){
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * jwtExpirationMs))
                .setSubject(subject)
                .signWith(SignatureAlgorithm.HS512,secret)
                .compact();
    }


    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private Boolean isTokenExpiredOrLogout(String token,String userName) {
        final Date expiration = getExpirationDateFromToken(token);
        if(blackListTokenRepository.existsByUserNameAndToken(userName,token)){
            return true;
        };
        return expiration.before(new Date());
    }


    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpiredOrLogout(token,username));
    }


    public String generateToken(User user, String teamId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("teamId",teamId);
        claims.put("userId",user.getId());
        claims.put("role", user.getRole());
        return doGenerateToken(claims, user.getEmail());
    }
}
