package com.ecom.orderms.security;


import com.ecom.orderms.util.AppConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@Component
public class JwtUtil {
	 private Key key() {
	        return Keys.hmacShaKeyFor(AppConstants.JWT_SECRET.getBytes(StandardCharsets.UTF_8));
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

	    public Long getUserId(String token) {
	        Object uid = getClaims(token).get("userId");
	        return Long.parseLong(uid.toString());
	    }
}
 