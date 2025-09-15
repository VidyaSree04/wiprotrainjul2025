package com.ecom.productservice.security;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ecom.productservice.util.AppConstants;

import io.jsonwebtoken.Claims;

@Component
public class JwtUtil {
	private Key key() {
        return Keys.hmacShaKeyFor(AppConstants.JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Long userId, String username, Set<String> roles) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("roles", roles);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + AppConstants.JWT_EXPIRATION_MS))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();
    }

    public String getUsername(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    @SuppressWarnings("unchecked")
    public Set<String> getRoles(String token) {
        Claims claims = getClaims(token);
        Object rolesObj = claims.get("roles");
        if (rolesObj instanceof Collection) {
            return ((Collection<?>) rolesObj).stream().map(Object::toString).collect(Collectors.toSet());
        }
        return Collections.emptySet();
    }

    public Long getUserId(String token) {
        Claims claims = getClaims(token);
        Object uid = claims.get("userId");
        if (uid instanceof Number) return ((Number) uid).longValue();
        if (uid instanceof String) {
            try { return Long.parseLong((String) uid); } catch (NumberFormatException e) { return null; }
        }
        return null;
    }
}
